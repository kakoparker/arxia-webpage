# DNS setup for arxia.com

Two independent things need DNS records once the site goes live on Vercel:

1. **The website** — point `www.arxia.com` (and the apex `arxia.com`) at Vercel.
2. **The contact form email** — verify `arxia.com` in Resend so the form can send
   from `contact@arxia.com`.

Neither depends on the other. Do them in either order.

---

## 1. Website (Vercel)

In **Vercel → Project → Settings → Domains**, add `www.arxia.com` (primary) and
`arxia.com` (redirect to `www`). Vercel shows the exact records to add — typically:

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `cname.vercel-dns.com` |
| `A` | `@` (apex) | `76.76.21.21` *(use whatever Vercel shows — it can change)* |

Always copy the values Vercel displays for your project rather than hardcoding them.
TLS certificates are issued automatically once the records resolve.

---

## 2. Contact-form email (Resend)

The form sends **from** `contact@arxia.com` **to** `carlos.parker@arxia.com` and
`daniel.homorodean@arxia.com`. You do **not** need to create a `contact@arxia.com`
mailbox — Resend only needs the *domain* verified; the From address is just a label.

### Steps

1. **Resend → Domains → Add Domain** → `arxia.com`. Resend generates the records
   below for a `send.arxia.com` sending subdomain plus a DKIM key.
2. Add these 4 records at whoever hosts `arxia.com` DNS:

   | # | Type | Host / Name | Value | Notes |
   |---|------|-------------|-------|-------|
   | 1 | **MX** | `send.arxia.com` | `feedback-smtp.<region>.amazonses.com` (priority **10**) | `<region>` (e.g. `us-east-1`) is shown in Resend. Handles bounces. |
   | 2 | **TXT** (SPF) | `send.arxia.com` | `v=spf1 include:amazonses.com ~all` | |
   | 3 | **TXT** (DKIM) | `resend._domainkey.arxia.com` | `p=…` (long key from Resend — paste verbatim) | The one value you must copy exactly. |
   | 4 | **TXT** (DMARC) | `_dmarc.arxia.com` | `v=DMARC1; p=none; rua=mailto:carlos.parker@arxia.com` | Recommended. Start `p=none`, tighten later. |

3. Click **Verify** in Resend (propagation: minutes to a few hours).
4. In **Vercel → Settings → Environment Variables**, set:
   - `RESEND_API_KEY` — from Resend
   - `RESEND_FROM` — `Arxia <contact@arxia.com>`
   Then redeploy.
5. Submit the live form once and confirm it lands in **both** inboxes.

### Gotchas

- **Won't touch existing email.** Records 1–2 live on the `send.` subdomain, so they
  don't collide with any root-domain MX (Google Workspace / M365) used for real
  mailboxes.
- **Cloudflare DNS:** add all records as **"DNS only"** (grey cloud), not proxied.
- `contact@arxia.com` is send-only here — replies go to the visitor's address
  (`replyTo`). Optionally set `contact@arxia.com` as a forwarding **alias** to both of
  you if you also want direct emails to that address to reach you (that's inbound email,
  configured in your mail provider, not Resend).
- Leave TTL on Auto / 3600.

---

Recipients are hard-coded in [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts)
(`DEFAULT_RECIPIENTS`); `CONTACT_RECIPIENTS` is an optional comma-separated override for
staging/testing. See the [README](../README.md#deployment-vercel) for the full deploy flow.
