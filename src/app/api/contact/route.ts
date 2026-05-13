import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Both recipients confirmed by Carlos for v1. Override via CONTACT_RECIPIENTS
// (comma-separated) when staging or testing without spamming the real inboxes.
const DEFAULT_RECIPIENTS = [
  "carlos.parker@arxia.com",
  "daniel.homorodean@arxia.com",
];

// Simple per-IP rate limit. In-memory: resets on cold start, which is fine
// for a marketing-site contact form. Replace with Upstash / Redis if traffic
// ever justifies it.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= MAX_PER_WINDOW) return false;
  existing.count += 1;
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#162036;letter-spacing:-0.4px;">arxia.com — new message</h1>
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
      Sent from arxia.com contact form
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const recipients = (process.env.CONTACT_RECIPIENTS?.split(",").map((s) => s.trim()).filter(Boolean) ?? DEFAULT_RECIPIENTS);

  if (!apiKey || !from) {
    // Misconfigured environment — surface a clear server error, but don't leak which var.
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Bots fill every input.
  // Silently 200 so bots don't learn to skip it.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ ok: false, error: "Please provide your name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
  }
  if (!comment || comment.length > 5000) {
    return NextResponse.json({ ok: false, error: "Please include a short message." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: email,
    subject: `arxia.com — new message from ${name}`,
    html: emailHtml({ name, email, comment }),
    text: `New contact from arxia.com\n\nName: ${name}\nEmail: ${email}\n\n${comment}\n`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
