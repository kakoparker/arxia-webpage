# Security Audit: www.arxia.global

**Date:** 2026-10-07 · **Audited revision:** `main` @ `5661d31` · **Branch with fixes:** `claude/security-audit`
**Scope:** Next.js site and `/api/contact` route, HTTP/TLS configuration, the public GitHub repository and its CI, the Vercel project, and DNS/email for `arxia.global` and `arxia.com`.
**Out of scope (passive look only):** the legacy Apache/TYPO3/cPanel host at `172.104.235.38`.

## 1. Summary

The site is small and static. It has one input: the contact form. Its baseline was good: strict security headers, TLS 1.2/1.3 only, no secrets anywhere in git history, sandboxed SVG handling, escaped email HTML, a honeypot, and Vercel's adaptive bot and DDoS mitigation.

The audit found **one High, three Medium and several Low issues in code**. All of them are fixed on `claude/security-audit` and retested. It also found **four Medium issues in settings**: GitHub, DNS, and the legacy host. These need an owner action and are listed in §4.

| Severity | Found | Fixed in branch | Needs owner action |
|---|---|---|---|
| High | 1 | 1 | — |
| Medium | 5 | 1 | 4 |
| Low | 10 | 6 | 4 |
| Info | 7 | 2 | 5 (accept, or your decision) |

The most important finding: **`next@16.2.9` carried 12 published advisories (CVSS up to 9.5)**, and nothing alerted us, because Dependabot alerts are disabled on the repository. The dependency fix is in the branch. The process fix (S-11) needs one settings toggle.

## 2. Method and standards

- **Standards:** OWASP ASVS 5.0 (L1, plus L2 for the API, headers and supply chain), OWASP Top 10 2025 (categories below), OWASP WSTG for testing. Severity is CVSS-based, adjusted for how this deployment is actually exposed.
- **Supply chain:** `npm audit`, osv-scanner v2.0.3 (148 packages), gitleaks v8.24.3 over all 107 commits on all refs.
- **Static analysis:** Semgrep 1.130 (`p/nextjs`, `p/react`, `p/typescript`, `p/javascript`, `p/owasp-top-ten`, `p/secrets`, `p/github-actions`) across 118 files, plus a manual review of every input path.
- **Dynamic testing:** OWASP ZAP 2.16.1 baseline against a local production build (`next build && next start`). Hand-written tests against `/api/contact` used an invalid Resend key and an `.invalid` recipient, so no email could be sent.
- **Production (passive):** response headers, testssl.sh 3.2, redirect behaviour, DNS/SPF/DKIM/DMARC/CAA, subdomain resolution. Seven deliberately invalid POSTs were sent to check the firewall; no email is possible from those.
- **Platform:** Vercel project, env-var and domain configuration (read-only, via the Vercel connector); GitHub repo settings (read-only, via `gh api`).

## 3. Findings fixed in `claude/security-audit`

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

## 4. Findings that need an owner action

### S-11 · Medium · Dependabot alerts and security updates are disabled
This is the root cause of S-01 going unnoticed.

**Action:** in GitHub, go to Settings → Code security and enable *Dependabot alerts* and *Dependabot security updates*. Optionally enable *CodeQL default setup*, which is free for public repos. (I can do this via `gh api` on your OK.)

### S-12 · Medium · `main` is unprotected, and a push deploys to production
There are no branch protection rules or rulesets, so a force-push or a mistaken commit goes live immediately.

**Action:** add a ruleset on `main`:
- Require a pull request (0 approvals is fine for a solo maintainer).
- Require the `Build & typecheck` status check.
- Block force-pushes and deletion.

(I can do this via `gh api` on your OK.)

### S-13 · Medium · DMARC is `p=none` on arxia.com and arxia.global
Anyone can send mail as `@arxia.com` or `@arxia.global`, and receivers are told to deliver it. For a firm that bids to the World Bank, UN and governments, look-alike invoice and bid phishing is a realistic threat. No reporting address (`rua`) is set either.

**Action:**
1. Add `rua=mailto:<reports inbox>` and watch the reports for 2–4 weeks.
2. Confirm every legitimate sender: Google Workspace, Resend (the `send.` subdomain plus the `resend._domainkey` DKIM key), Campaign Monitor, and the IPs in the SPF record.
3. Move to `p=quarantine`, then `p=reject`.

Also review the `arxia.com` SPF record. It lists `188.26.113.114`, `199.230.53.150–155` and `_spf.createsend.com`; remove any that are no longer used.

### S-14 · Medium · Legacy host 172.104.235.38 (out of scope, flagged)
This host serves:
- `www.arxia.com`, `new.arxia.com` and `www.new.arxia.com` (Apache, TYPO3).
- cPanel and Roundcube webmail (`webmail.arxia.global`, `hosting.arxia.com`, port 2095).
- **The MX for arxia.global** (`mail.arxia.global`).

It is an internet-facing CMS and webmail carrying the Arxia brand, and this audit could not confirm its patch level.

**Action:**
- Commission a separate, authorised assessment of that host: TYPO3, PHP and cPanel versions, plus the admin surface.
- Plan to decommission it when arxia.com moves to Vercel.
- Decide where arxia.global mail should live.

### S-15 · Low · No CAA records
Any CA can issue certificates for either domain.

**Action:** publish CAA records. Vercel uses Let's Encrypt. Google Workspace and the legacy host's certificate authority also need to be allowed while they are in use: `0 issue "letsencrypt.org"`, plus `iodef` to a security inbox.

### S-16 · Low · HSTS lacks `includeSubDomains` and `preload`
This was a deliberate choice (see `next.config.mjs`). `mail.` and `webmail.arxia.global` do answer over HTTPS today.

**Action:** once every arxia.global subdomain is confirmed HTTPS-only, send `max-age=63072000; includeSubDomains; preload` and submit the domain to hstspreload.org.

### S-17 · Low · Preview deployments use the production Resend key and recipients
`RESEND_API_KEY` and `RESEND_FROM` target both Production and Preview, and `CONTACT_RECIPIENTS` isn't set. A test submission on any preview therefore emails Carlos and Daniel. Previews sit behind Vercel SSO, so only team members can reach them.

**Action:** set `CONTACT_RECIPIENTS` for the Preview environment only, pointing at a test inbox.

### S-18 · Low · Firewall rate-limit rule couldn't be confirmed by testing
The Vercel API still returns 404 for the firewall config, and production answered every scripted request with a JS challenge (`X-Vercel-Mitigated: challenge`). That is good protection, but it means the 5-per-10-minute contact rule never got a chance to fire.

**Action:** in the Vercel dashboard, go to Firewall and confirm *Contact form rate limit* is active and shows hits.

### S-19 · Info · Decisions and accepted risks
- **`'unsafe-inline'` in `script-src`:** accepted. A nonce-based CSP would force dynamic rendering of every page; the rest of the policy is strict. *Accept.*
- **Recipient addresses hard-coded in public source:** they can be scraped for phishing. Option: set `CONTACT_RECIPIENTS` in Production and drop the default list. *Your call.*
- **`NEXT_LOCALE` cookie without `Secure`/`HttpOnly`:** a non-sensitive language preference set by next-intl, and HSTS applies. **`Access-Control-Allow-Origin: *`** on static pages: public content, no credentials. *Accept.*
- **`dangerouslyAllowSVG`:** correctly sandboxed (`CSP sandbox` + `Content-Disposition: attachment`, verified). Only 3 client logos are SVG; converting them to WebP would remove this code path entirely. *Optional.*
- **GitHub account 2FA:** not readable with the current token scope. Confirm it's on for `kakoparker` and for all Vercel ARXIA team members.

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
