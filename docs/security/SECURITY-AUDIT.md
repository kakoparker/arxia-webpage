# Security Audit: www.arxia.global

**Date:** 2026-10-07 · **Audited revision:** `main` @ `5661d31` · **Branch with fixes:** `claude/security-audit`
**Scope:** Next.js site and `/api/contact` route, HTTP/TLS configuration, the public GitHub repository and its CI, the Vercel project, and DNS/email for `arxia.global` and `arxia.com`.
**Out of scope (passive look only):** the legacy Apache/TYPO3/cPanel host at `172.104.235.38`.
**Status legend:** ✅ fixed and verified · ⏳ open, needs DNS or legacy-host access (steps given) · ➖ accepted.

## 1. Summary

The site is small and static. It has one input: the contact form. Its baseline was good: strict security headers, TLS 1.2/1.3 only, no secrets anywhere in git history, sandboxed SVG handling, escaped email HTML, a honeypot, and Vercel's adaptive bot and DDoS mitigation.

Every issue in the site's code and in the GitHub/Vercel settings has been fixed (PR #11 plus settings changes made on 2026-10-07).

What's left lives on infrastructure the site doesn't control: **DNS at the `arxia.com` nameservers and the legacy server at 172.104.235.38**. Those need DNS or hosting access and are listed in §4 with exact steps.

| Severity | Found | Fixed | Not fixed |
|---|---|---|---|
| High | 2 | 1 | 1 (S-14) |
| Medium | 5 | 3 | 2 (S-13 DMARC, S-20 webmail cert) |
| Low | 10 | 7 | 3 (S-15 CAA, S-18 dashboard check; S-16 deliberately deferred) |
| Info | 7 | 5 | 2 (`unsafe-inline` accepted; 2FA to confirm) |

The most important code finding: **`next@16.2.9` carried 12 published advisories (CVSS up to 9.5)**, and nothing alerted us because Dependabot was off. Both are now fixed.

The most important open finding: **arxia.com does not redirect to arxia.global**. It still serves the old TYPO3 site, with its **admin login exposed at `/typo3/`** (S-14).

## 2. Method and standards

- **Standards:** OWASP ASVS 5.0 (L1, plus L2 for the API, headers and supply chain), OWASP Top 10 2025 (categories below), OWASP WSTG for testing. Severity is CVSS-based, adjusted for how this deployment is actually exposed.
- **Supply chain:** `npm audit`, osv-scanner v2.0.3 (148 packages), gitleaks v8.24.3 over all 107 commits on all refs.
- **Static analysis:** Semgrep 1.130 (`p/nextjs`, `p/react`, `p/typescript`, `p/javascript`, `p/owasp-top-ten`, `p/secrets`, `p/github-actions`) across 118 files, plus a manual review of every input path.
- **Dynamic testing:** OWASP ZAP 2.16.1 baseline against a local production build (`next build && next start`). Hand-written tests against `/api/contact` used an invalid Resend key and an `.invalid` recipient, so no email could be sent.
- **Production (passive):** response headers, testssl.sh 3.2, redirect behaviour, DNS/SPF/DKIM/DMARC/CAA, subdomain resolution. Seven deliberately invalid POSTs were sent to check the firewall; no email is possible from those.
- **Platform:** Vercel project, env-var and domain configuration (read-only, via the Vercel connector); GitHub repo settings (read-only, via `gh api`).

## 3. Fixed in code (PR #11) ✅

### S-01 · High · Vulnerable framework and build dependencies (A03 Software Supply Chain Failures)
`next@16.2.9` was affected by 12 advisories, including GHSA-2xp9-vwfh-vxw4 (RCE in the image optimiser, 9.5), GHSA-vcvr-r3jv-pc5j (RCE in `next/og`, 9.5), GHSA-p293-qw3h-jr36 (RCE on Windows hosts, 9.0), GHSA-6gpp-xcg3-4w24 (middleware bypass, 8.3) and GHSA-q8wf-6r8g-63ch (SVG image-optimiser DoS).

Other affected packages: `postcss@8.5.16` (2 advisories), `sharp@0.34.5` (libvips/libheif/librsvg), `nanoid`, `source-map-js` and `baseline-browser-mapping`.

*Exposure on this deployment is lower than the scores suggest:*
- No Server Actions are used.
- The OG image is static, with no user input.
- Vercel runs image optimisation on its own infrastructure.
- The middleware does no access control.

Even so, a public site on a framework with known critical CVEs is a scanning target, so this is rated High.

**Fix:**
- `next` → 16.3.8, the latest patch on the 16.3 line. 16.4.0 was published only a day before the audit, so it was skipped for now.
- `postcss` → 8.5.28, with the override now tracking the direct dependency (`"$postcss"`).
- `sharp` → 0.35.5.
- Transitive packages updated.

`npm audit`: **0 vulnerabilities**.

### S-02 · Medium · Contact API accepted cross-site submissions (A01 Broken Access Control / CSRF)
`req.json()` parsed any body regardless of `Content-Type`, and the `Origin` header was never checked. Any web page could make its visitors' browsers submit `text/plain` POSTs to `/api/contact` without a CORS preflight. Each submission would come from a different visitor IP, which gets past the per-IP limits in both the code and the firewall. The result is a spam relay into the two recipients' inboxes.

*Verified:* a POST with `Content-Type: text/plain` and `Origin: https://evil.example` was processed all the way to the send step.

**Fix:** the route now rejects requests where `Sec-Fetch-Site` is anything other than `same-origin`, or where the `Origin` host doesn't match the request host (403). It also requires `application/json` (415). A cross-origin JSON POST forces a preflight, and that preflight fails.

### S-03 · Low · Request body buffered and parsed with no size limit (A10 Mishandling of Exceptional Conditions)
Vercel Functions accept bodies up to 100 MB. A 40 MB JSON body was fully parsed before the length checks rejected it, which wastes memory and CPU on every such request.

**Fix:** the body is streamed and capped at 32 KB (413). The largest legitimate payload, 5,000 four-byte characters, still passes.

### S-04 · Low · Contact details could end up in the URL (A02 Security Misconfiguration)
*Found by ZAP (alert 10024).* The `<form>` had no `method`. If someone submits before hydration finishes (slow connection, or a JS error), the browser falls back to a native GET. That puts name, email and message in the query string, and from there into browser history, logs and Referer headers.

**Fix:** `method="post"` on the form.

### S-05 · Low · Reply-To list injection through the email field (A05 Injection)
The email regex allowed `,` `<` `>` `"` and similar characters, so a value like `x,victim@evil.example` was accepted and used as `replyTo`. Replying would then go to an address chosen by the submitter.

**Fix:** the regex now accepts a single plain address only.

### S-06 · Low · Preview-only origins allowed in the production CSP (A02 Security Misconfiguration)
`vercel.live`, `vercel.com` and `wss://ws-us3.pusher.com` (the Vercel preview toolbar) were allowed in production. That widens script, frame and connect permissions for no benefit.

**Fix:** these origins are now added only when `VERCEL_ENV=preview`. Also added `Cross-Origin-Opener-Policy: same-origin` (ZAP 90004: site isolation).

### S-07 · Low · JSON-LD written unescaped in 2 of 4 places (A05 Injection, defence in depth)
`layout.tsx` and `news/[slug]/page.tsx` serialised schema data into `<script>` without escaping `<`. Today that data is static, but a future CMS-sourced headline containing `</script>` would become stored XSS.

**Fix:** both now escape `<` as `<`, matching `JsonLd` and the portfolio page.

### S-08 · Low · CI supply-chain hardening (A08 Software or Data Integrity Failures)
- Actions were pinned to mutable tags (Semgrep `github-actions-mutable-action-tag`).
- There was no `permissions:` block.
- Checkout persisted the token.
- There was no dependency gate and no Dependabot config.

**Fix:**
- `actions/checkout` and `actions/setup-node` are pinned to full commit SHAs (v4.4.0).
- `permissions: contents: read` and `persist-credentials: false`.
- New `npm audit --audit-level=high` step.
- New `.github/dependabot.yml` with weekly npm and Actions updates.

### S-09 · Info · Rate-limit key preferred `x-forwarded-for`
Not exploitable on Vercel, which overwrites the header, but the order was fragile.

**Fix:** `x-real-ip` is used first.

### S-10 · Info · Local tool state committed to a public repo
`.superpowers/` (brainstorm HTML and a server pid) and `.claude/settings.local.json` were tracked.

**Fix:** both are untracked and gitignored. They remain in history; nothing sensitive was found there.

## 4. Settings, infrastructure and owner items

### S-11 · Medium · Dependabot alerts and security updates were disabled ✅
This is the root cause of S-01 going unnoticed. It is free for every repository.

**Done 2026-10-07:**
- Dependabot alerts and Dependabot security updates enabled.
- CodeQL default setup enabled (free on public repos).
- `.github/dependabot.yml` adds weekly npm and Actions update PRs.

Two secret-scanning extras, *non-provider patterns* and *validity checks*, need the paid GitHub Secret Protection add-on. Optional: core secret scanning and push protection are already on.

### S-12 · Medium · `main` was unprotected, and a push deploys to production ✅
**Done 2026-10-07:** repository ruleset *Protect main* on the default branch:
- Changes go through a pull request (0 approvals, since there is a single maintainer).
- The `Build & typecheck` check must pass.
- Force-pushes and deletion are blocked.

### S-13 · Medium · DMARC is `p=none` on arxia.com and arxia.global ⏳ DNS
Anyone can send mail as `@arxia.com` or `@arxia.global`, and receivers are told to deliver it. For a firm that bids to the World Bank, UN and governments, look-alike invoice and bid phishing is a realistic threat. No reporting address (`rua`) is set either.

Both zones are served by `ns1–4.arxia.com` (the legacy host's DNS), so this needs DNS access.

**Steps:**
1. **Now:** set `_dmarc.arxia.com` and `_dmarc.arxia.global` to `v=DMARC1; p=none; rua=mailto:<reports inbox>; fo=1`. A free aggregator such as Postmark DMARC or dmarcian makes the reports readable.
2. **After 2–4 weeks of reports:** confirm every legitimate sender passes:
   - Google Workspace (arxia.com).
   - Resend (`send.arxia.com` plus the `resend._domainkey` DKIM key).
   - Campaign Monitor (`_spf.createsend.com`).
   - The cPanel mail server (arxia.global).

   Remove stale entries from the `arxia.com` SPF record: `188.26.113.114` and `199.230.53.150–155`, if no longer used.
3. Move to `p=quarantine; pct=100`, then to `p=reject`.

### S-14 · High · arxia.com still serves the legacy TYPO3 site, with its admin login exposed ⏳ DNS / legacy host
The plan is for arxia.com to redirect to arxia.global, but it doesn't today. Every public resolver (Google, Cloudflare, local) sends `arxia.com`, `www.arxia.com`, `new.arxia.com` and `www.new.arxia.com` to `172.104.235.38`. That server returns the old TYPO3 site ("Arxia: TYPO3 Development in Romania") and **the TYPO3 backend login at `https://www.arxia.com/typo3/`**.

An internet-facing CMS admin login on a legacy install whose patch level we can't confirm is a prime target for credential stuffing and known-CVE exploitation. A defacement or compromise there would be indistinguishable from the real Arxia.

The same host also runs cPanel and Roundcube webmail and is the **MX for arxia.global**.

**Steps, in this order:**
1. **Today (hosting panel):** block `/typo3/` from the internet. Allow-list office IPs in `.htaccess`, or disable the backend.
2. **Redirect arxia.com to the new site.** Two options:
   - **Preferred:** add `arxia.com` and `www.arxia.com` to the Vercel project as redirects to `www.arxia.global` (308, path kept). Then change their A/CNAME records (`A 216.198.79.1` for the apex, `CNAME cname.vercel-dns.com` for www), leaving the Google MX/TXT records untouched. The TYPO3-era `.html` redirects already in `next.config.mjs` then send old links to the right pages.
   - **Interim:** add a site-wide `RedirectMatch 301 ^/(.*)$ https://www.arxia.global/$1` on the Apache vhost.
3. Decide where arxia.global mail lives long-term, then decommission the TYPO3 site and, eventually, the host.
4. Until it is decommissioned, commission a separate authorised assessment: TYPO3, PHP and cPanel versions.

### S-20 · Medium · Webmail TLS certificate doesn't match its hostname ⏳ legacy host
`mail.arxia.global` and `webmail.arxia.global` present a Let's Encrypt certificate valid only for `autoconfig.arxia.global`, so every visit shows a certificate warning. Users who learn to click through warnings can't tell a real interception apart, and webmail passwords are the prize.

**Steps:** in cPanel, open **SSL/TLS Status**, select `mail.` and `webmail.arxia.global`, and click **Run AutoSSL**. Then confirm `curl https://webmail.arxia.global/` succeeds without `-k`.

### S-15 · Low · No CAA records ⏳ DNS
Any CA can issue certificates for either domain.

**Steps:**
- On `arxia.global`, add `0 issue "letsencrypt.org"` (Vercel and cPanel AutoSSL both use Let's Encrypt) and `0 iodef "mailto:<security inbox>"`.
- On `arxia.com`, add the same, plus `0 issue "pki.goog"` if Google-issued certificates are used, and the issuer of the current `www.arxia.com` certificate until it's retired.

### S-16 · Low · HSTS lacks `includeSubDomains` and `preload` ➖ deferred, deliberately
This must **not** be enabled yet. With the S-20 certificate mismatch, `includeSubDomains` would lock users out of webmail. The apex `arxia.global` is also a Vercel domain-level redirect, which sends Vercel's default HSTS and not the app's header.

Revisit after S-20 is fixed and the S-14 migration is done. Preload is effectively irreversible, so only submit to hstspreload.org once every subdomain is permanently HTTPS.

### S-17 · Low · Preview deployments used the production recipients ✅
**Done:** `CONTACT_RECIPIENTS` is set per environment in Vercel (sensitive). Production goes to both inboxes; Preview goes to Carlos only.

### S-18 · Low · Firewall rate-limit rule couldn't be confirmed by testing ⏳ 1-minute check
The Vercel API returns 404 for the firewall config, and production answers scripted requests with a JS challenge (`X-Vercel-Mitigated: challenge`). That is good protection, but it means the rule never got a chance to fire.

**Step:** in the Vercel dashboard (ARXIA → arxia-webpage → Firewall), confirm *Contact form rate limit* is active. The code-level controls from S-02/S-03 now hold regardless.

### S-19 · Info · Decisions and accepted risks
- **`'unsafe-inline'` in `script-src`** ➖ Accepted. A nonce-based CSP would force dynamic rendering of every page; the rest of the policy is strict.
- **Recipient addresses in public source** ✅ Removed from code and docs, and moved to Vercel env vars. They remain in git history.
- **`NEXT_LOCALE` cookie** ✅ No longer set (`localeCookie: false`, since detection was already off). The site now sets **no cookies**. **`Access-Control-Allow-Origin: *`** on static pages ➖ Public content, no credentials.
- **`dangerouslyAllowSVG`** ✅ Removed. The 3 SVG logos render `unoptimized`, and the optimiser now refuses SVG (400, verified).
- **Account 2FA** ⏳ Not readable with the current token scope. Confirm 2FA is on for GitHub `kakoparker` and every member of the Vercel ARXIA team.

## 5. Verification (after fixes)

| Test | Before | After |
|---|---|---|
| `npm audit` / osv-scanner | 6 packages, 21 advisories (1 critical) | 0 |
| Cross-site `text/plain` POST with evil `Origin` | processed (send step reached) | 403 |
| Evil `Origin`, no `Sec-Fetch-Site` | processed | 403 |
| `Sec-Fetch-Site: same-site` | processed | 403 |
| Same-origin `text/plain` / form-encoded | processed | 415 |
| 40 KB body (with length / chunked) | parsed | 413 / 413 |
| `x,victim@evil.example` as email | accepted as Reply-To | 400 `email` |
| Same-origin JSON, incl. 5,000 × 4-byte chars | ok | ok (reaches send step) |
| Rate limit (4th request from same client IP) | 429 | 429 |
| Honeypot | silent 200 | silent 200 |
| Real browser submit from the page | ok | ok; no CSP violations |
| Pre-hydration form submit | GET with details in the URL | `method="post"` |
| Production CSP origins | included preview toolbar | toolbar origins only on previews |
| Open redirects (`//evil`, `/\evil`, encoded) | none | none |
| Exposed files (`.env`, `.git`, source maps, config) | none | none |
| Cookies set by the site | `NEXT_LOCALE` on every page | none |
| SVG via `/_next/image` | served (sandboxed) | 400 refused; logos still render |
| Recipients missing from env | silent fallback to hard-coded inboxes | 503 `unavailable` + server log |
| `typecheck` + `build` | pass | pass (109 static pages) |

## 6. Controls already in place (keep)
- **Headers and TLS:** nosniff, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`, HSTS, `poweredByHeader: false`. TLS 1.2/1.3 only; testssl reports no known TLS vulnerabilities. BREACH is not applicable because pages carry no secrets.
- **Repository:** secret scanning and push protection are on, and no secrets were found in any commit. Default workflow token is read-only.
- **Vercel:** SSO protection on every non-custom-domain deployment, sensitive env vars, and adaptive challenge mitigation for scripted traffic.
- **Contact form:** escaped HTML email, CR/LF-stripped subject, honeypot, localised error codes that don't leak configuration.
- **Embeds and links:** cookieless Plausible, YouTube via `youtube-nocookie` behind a click-to-load facade, `rel="noopener noreferrer"` on every external link. Privacy policy covers Resend, Plausible, Vercel, transfers/SCCs, retention and cookies.

## 7. Re-audit triggers
Re-run this audit when:
- A new input or route handler is added.
- Auth or CMS content arrives.
- The domain moves to arxia.com.
- A Dependabot alert of High or above lands.

The CI audit gate and Dependabot cover regressions in between.
