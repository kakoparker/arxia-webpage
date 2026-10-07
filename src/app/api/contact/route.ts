import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_HOST } from "@/i18n/metadata";

export const runtime = "nodejs";

// Per-IP rate limit, in memory. NOTE: on Vercel this is per function
// instance, so it only blunts bursts that hit one warm instance. The durable
// limit belongs in a Vercel Firewall rate-limit rule on POST /api/contact
// (or a shared store such as Upstash) if abuse ever appears.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  // Keep memory bounded: drop expired buckets once the map grows.
  if (buckets.size > 1000) {
    for (const [key, b] of buckets) if (b.resetAt < now) buckets.delete(key);
  }
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= MAX_PER_WINDOW) return false;
  existing.count += 1;
  return true;
}

// One plain address only: no separators, quotes or brackets, so the value
// used as Reply-To can't expand into an address list.
const EMAIL_RE = /^[^\s@,;:<>()[\]\\"]+@[^\s@,;:<>()[\]\\"]+\.[^\s@,;:<>()[\]\\"]+$/;

// The largest legitimate payload (5,000-character message of 4-byte chars
// plus name and email) is well under this. Anything bigger is rejected
// before it is buffered or parsed.
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Stable error codes. The client maps them to localized copy, so visitors on
 * /es and /fr never see English server strings, and nothing here reveals
 * server configuration.
 */
type ErrorCode =
  | "unavailable"
  | "invalid_request"
  | "name"
  | "email"
  | "comment"
  | "rate_limited"
  | "send_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

/** Strip control characters (incl. CR/LF) so user input can't shape headers. */
function headerSafe(s: string, max = 120) {
  return s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

/**
 * Browser requests from another site are refused (CSRF): otherwise any page
 * could make its visitors' browsers post here, each from a different IP,
 * past the per-IP limits. Browsers always send Sec-Fetch-Site and/or Origin
 * on a POST; non-browser clients that omit both are left to the firewall.
 */
function isCrossSite(req: Request) {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return true;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

/** Read the body as text, giving up once it exceeds `max` bytes. */
async function readBody(req: Request, max: number): Promise<string | null> {
  const declared = Number(req.headers.get("content-length"));
  if (declared > max) return null;
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/** Honeypot field name: deliberately meaningless so no autofill or agent fills it. */
const HONEYPOT_FIELD = "hp_extra";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailHtml(payload: { name: string; email: string; comment: string }) {
  const { name, email, comment } = payload;
  // Brand-aligned HTML: Inter via system fallback (email clients reliably render
  // Helvetica/Arial), Blueprint Blue heading, Digital Red accent line.
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:32px;background:#F7FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#171616;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;">
    <tr><td style="padding:32px 32px 8px;">
      <p style="margin:0 0 8px;font-family:'Courier New',Consolas,monospace;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#ED1C24;">New contact</p>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#162036;letter-spacing:-0.4px;">${SITE_HOST} — new message</h1>
      <div style="height:3px;width:48px;background:#ED1C24;margin:12px 0 20px;"></div>
    </td></tr>
    <tr><td style="padding:0 32px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="padding:8px 0;font-family:'Courier New',Consolas,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0AEC0;width:80px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;font-size:15px;color:#171616;">${escape(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:'Courier New',Consolas,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0AEC0;vertical-align:top;">Email</td>
          <td style="padding:8px 0;font-size:15px;color:#171616;"><a href="mailto:${escape(email)}" style="color:#162036;text-decoration:underline;">${escape(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:'Courier New',Consolas,monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#A0AEC0;vertical-align:top;">Message</td>
          <td style="padding:8px 0;font-size:15px;line-height:1.65;color:#171616;white-space:pre-wrap;">${escape(comment)}</td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding:16px 32px;border-top:1px solid #E2E8F0;font-family:'Courier New',Consolas,monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#A0AEC0;">
      Sent from ${SITE_HOST} contact form
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  // Recipients live in the environment, not in this (public) source, so the
  // inbox addresses can't be harvested from the repo. Set per environment in
  // Vercel: the real inboxes for Production, a test inbox for Preview.
  const recipients =
    process.env.CONTACT_RECIPIENTS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  if (!apiKey || !from || recipients.length === 0) {
    // Misconfigured environment: log it for us, tell the visitor nothing more.
    console.error("[contact] RESEND_API_KEY, RESEND_FROM or CONTACT_RECIPIENTS is not set");
    return fail("unavailable", 503);
  }

  if (isCrossSite(req)) return fail("invalid_request", 403);
  // JSON only: a cross-site page can send text/plain or form bodies without a
  // CORS preflight, but not application/json.
  const type = req.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("application/json")) {
    return fail("invalid_request", 415);
  }
  const raw = await readBody(req, MAX_BODY_BYTES);
  if (raw === null) return fail("invalid_request", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid_request", 400);
  }
  if (!body || typeof body !== "object") return fail("invalid_request", 400);

  // Honeypot: real users never see this field. Bots fill every input.
  // Silently 200 so bots don't learn to skip it.
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (!name || name.length > 200) return fail("name", 400);
  // Length first: EMAIL_RE backtracks quadratically on long dotted input,
  // so it must only ever see strings within the RFC 5321 limit.
  if (!email || email.length > 320 || !EMAIL_RE.test(email)) return fail("email", 400);
  if (!comment || comment.length > 5000) return fail("comment", 400);

  // Vercel sets x-real-ip to the connecting client and overwrites any value
  // the client sent; x-forwarded-for is only the fallback for other hosts.
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!rateLimit(ip)) return fail("rate_limited", 429);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: email,
    subject: `${SITE_HOST} — new message from ${headerSafe(name, 80)}`,
    html: emailHtml({ name, email, comment }),
    text: `New contact from ${SITE_HOST}\n\nName: ${name}\nEmail: ${email}\n\n${comment}\n`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return fail("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
