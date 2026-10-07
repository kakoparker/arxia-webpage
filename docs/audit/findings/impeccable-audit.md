# Impeccable Audit (technical quality) + Assessment B detector pass: arxia.global

- **Source:** snapshot of `origin/main` at `C:/Users/carlo/AppData/Local/Temp/aud/main` (Next.js 16 App Router, React 19, Tailwind 4, GSAP, cobe)
- **Live:** https://www.arxia.global (Vercel), fetched 2026-10-06 with curl
- **Method:** `imp/skill/reference/audit.md` (plus craft-floor, harden, optimize). The detector rules from `imp/crates/detect/src/regex_matchers.rs` and `core/src/checks/css_scan.rs` were ported by hand to a Python scanner. The prebuilt Rust binary was **not** run. Every hit was checked in context.
- **Scope:** built pages only (home, 7 domain pages, /portfolio, 1 case study, /news + 19 articles, legal pages, in en/es/fr; 95 sitemap URLs crawled). Missing or unbuilt service pages are **not** penalized. A visitor-facing break is flagged wherever it occurs.
- **Evidence limits:** the shared browser pane was not used. One rendering claim (the mobile menu, P0) was confirmed with a minimal repro in headless Chrome: `findings/navrepro.html` and `findings/navrepro.png`. No Lighthouse or field data was collected, so LCP and INP are inferred from code and payload, not measured.

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **2** | Digital Red text/labels fail AA on every dark surface (3.25:1), gray-medium used for functional text on white (2.26:1), auto-scrolling carousel has no pause (WCAG 2.2.2 A) |
| 2 | Performance | **2** | 297 KB gz of JS on the homepage (budget 150 KB); hero `<h1>` is `opacity:0` until hydration, so LCP waits on JS; WebGL globe redraws at 60 fps forever |
| 3 | Responsive Design | **2** | **Mobile nav overlay collapses to 0 px height** (the parent's `backdrop-filter` becomes its containing block); primary hero CTA overrides the 48 px minimum to about 31 px |
| 4 | Theming | **3** | Colour tokens are used consistently through `@theme`; the typography tokens are defined but used 0 times (184 inline `style={{}}` objects); two different off-palette hover reds |
| 5 | Implementation Integrity | **3** | Coherent, brief-faithful system with very few slop tells; verified defects: canonical/sitemap point at `arxia.com` (302s to `.global`), cross-page `/#hash` links land on a stale saved scroll, about 1,250 lines of dead modules |
| **Total** | | **12/20** | **Acceptable (significant work needed)** |

Most of the deductions come from a few token-level decisions (the red as text colour, gray-medium on light surfaces) and one CSS containing-block bug. Fixing those few root causes would move the score into "Good".

---

## Implementation Integrity Verdict: PASS (coherent, product-specific system)

The build expresses a specific world: the Blueprint/drafting language. That means blueprint grid surfaces, registration marks, plates, set-out lines, isometric stack figures, and mono annotations. The same language is carried consistently from tokens (`globals.css:6-82`) through components (`SectionContainer`, `SectionHeader`, `DomainsGrid`, `ProjectCard`, `IsoStack`). It could not be swapped onto an unrelated product.

- **Detector result:** very little generic AI-slop. There is 1 bounce-easing hit (intentional), 1 layout transition (in dead CSS), and 4 side-stripe accents (all brief-sanctioned). Gradient text, AI palette, nested rounded-accent cards, monotonous spacing and broken images all scored 0.
- **Interchangeable patterns:** the "Inter + mono annotation + grid background" combination would be generic elsewhere, but here the brief mandates it.
- **What weakens integrity:**
  1. Wrong canonical domain (P1).
  2. A scroll-restoration utility that overrides navigation intent (P1).
  3. Contradictory claims: "25+ years" vs "more than 20 years" (P2).
  4. About 1,250 lines of unimported modules, plus stale comments describing behaviour that no longer exists (P3).
  5. The project's own brief (`CLAUDE.md`) carries a wrong contrast table, which seeded the colour failures below.

---

## Executive Summary

- **Audit Health Score: 12/20 (Acceptable)**
- **Issues: P0: 1 · P1: 6 · P2: 15 · P3: 9** (31 total)
- **Top issues:**
  1. **[P0] Mobile menu is broken.** Under 768 px the overlay renders with height 0 inside the 56 px nav. It has no background, the first link sits above the viewport, and white links spill over white page content. (Confirmed in Chromium via repro.)
  2. **[P1] Digital Red fails AA in both directions.** As 10-11 px annotation text on dark/blue it measures 3.25:1 and 3.70:1. As a background behind white button labels it measures 4.38:1. These appear on every page.
  3. **[P1] Gray-medium `#A0AEC0` on white is 2.26:1, not the 3.0:1 the brief claims.** It is used for the portfolio filter buttons, counts, client names and "Last updated".
  4. **[P1] LCP is gated on hydration.** The hero `<h1>` ships with `animate-on-scroll` (`opacity:0`) and becomes visible only after about 297 KB gz of JS executes and an IntersectionObserver fires.
  5. **[P1] Cross-page links to `/#contact`, `/#news` and `/#expertise` land on the wrong section.** `HomeScrollManager` restores the previously saved scroll position over the hash target.
- **Recommended next steps:** fix the nav containing block (1 line). Add two contrast tokens (a red for text on dark, a darker red for button fills) and swap gray-medium for gray-dark on light surfaces. Make the hero heading visible at rest. Make `HomeScrollManager` respect `location.hash`. Then pause the off-screen rAF/WebGL loops and drop GSAP.

---

## Detailed Findings by Severity

### P0: Blocking

**[P0] Mobile navigation overlay collapses to zero height**
- **Location:** `src/components/layout/Navbar.tsx:58` (nav has `backdrop-blur-[12px]`) and `:110-129` (overlay `fixed inset-0 top-14` rendered *inside* the nav)
- **Category:** Responsive / Accessibility
- **Impact:** A non-`none` `backdrop-filter` creates a containing block for `position:fixed` descendants (CSS Filter Effects 2). The overlay is therefore positioned against the 56 px nav, not the viewport. `top:56px; bottom:0` gives a 0 px box, and the centred link column overflows around y≈56.
  - In the repro (headless Chrome, 375×812, `findings/navrepro.png`) the measured overlay rect is `top=56 h=0`.
  - "Domains" is pushed above the viewport. "Portfolio", "News", "Contact" and the locale switcher render as white text directly over page content, with no backdrop.
  - Every visitor on a phone (<768 px) relies on this menu; it is the only navigation at that width.
- **Standard:** WCAG 1.4.3 (contrast of the spilled links), 2.4.5 (multiple ways, effectively removed on mobile)
- **Recommendation:** Move the overlay out of `<nav>` (render it as a sibling, or portal it to `body`). Alternatively, apply the blur to a child background layer, `<div class="absolute inset-0 backdrop-blur" aria-hidden>`, instead of the nav itself. Re-test on iOS Safari and Android Chrome.
- **Suggested command:** `/impeccable adapt`

### P1: Major

**[P1] Digital Red fails AA as small text on dark/blue surfaces and as a button fill under white text**
- **Location:**
  - Annotations: `src/components/ui/SectionHeader.tsx:242` (`text-accent-red/85`, 11 px); `src/components/layout/Footer.tsx:77,96,115` (footer column headings, 11 px); `src/app/[locale]/portfolio/PortfolioPageClient.tsx:82`; `src/app/[locale]/error.tsx:30`; `src/components/sections/CallToAction.tsx:92`; `src/components/sections/DomainsGrid.tsx:271` (red 10-11 px on Blueprint Blue); `DomainsGrid.tsx:73` (red 10 px on `#F7FAFC`)
  - Buttons: `CallToAction.tsx:292`, `Hero.tsx:144`, `case-study/PlayVideoButton.tsx:29`, `case-study/CaseStudyVideo.tsx:109`
- **Category:** Accessibility
- **Measured ratios (computed WCAG 2.x):**

| Pair | Ratio | Needed |
|---|---|---|
| `#ED1C24` @85% on `#0D1520` | **3.25:1** | 4.5:1 |
| `#ED1C24` on `#0D1520` | 4.18:1 | 4.5:1 |
| `#ED1C24` on `#162036` | **3.70:1** | 4.5:1 |
| `#ED1C24` on `#F7FAFC` | 4.18:1 | 4.5:1 |
| White on `#ED1C24` (13-15 px labels) | **4.38:1** | 4.5:1 |
| White on `#C8101A` (existing hover colour) | 5.92:1 | pass |

- **Impact:** Every section's annotation, every footer heading, and every red CTA label fails AA. Low-vision users lose the wayfinding labels. The brief permits red for "accent annotation", but the brief's own table under-reports the problem.
- **WCAG:** 1.4.3 Contrast (Minimum), AA
- **Recommendation:** Split the token in two.
  - `--accent-red-text-on-dark` ≈ `#F2585D`: 5.53:1 on Blueprint Dark, 4.89:1 on Blueprint Blue. Use it only for text on dark surfaces.
  - `--accent-red-fill` ≈ `#D8141C`: white on it is 5.2:1. Use it for button backgrounds.
  - Keep `#ED1C24` for lines, dots and fills, where the 3:1 non-text rule applies and it passes.
  - On light surfaces, small red annotation text needs `#D8141C` or darker (5.2:1 on white).
- **Suggested command:** `/impeccable colorize`

**[P1] Gray-medium `#A0AEC0` used for functional text on light surfaces (2.26:1)**
- **Location:**
  - `src/components/portfolio/PortfolioSideNav.tsx:66` (9 px "Domains" label), `:87` (inactive filter buttons, 12 px), `:92` (project counts)
  - `src/components/portfolio/PortfolioMobileNav.tsx:87` (inactive filter tabs, 10 px)
  - `src/components/portfolio/PortfolioCard.tsx:41` (client name, 11 px)
  - `src/components/portfolio/PortfolioSection.tsx:27` (section index)
  - `src/components/layout/LegalPage.tsx:55` ("Last updated")
  - `src/components/sections/DomainsGrid.tsx:194` (plate number, `aria-hidden`, lower priority)
  - All of these sit on `#FFFFFF` (portfolio catalogue = `SectionContainer mode="light"`) or `#F7FAFC`.
- **Category:** Accessibility
- **Impact:** These are the portfolio's primary filter controls, and they are nearly illegible: 2.26:1 on white, 2.15:1 on `#F7FAFC`. Note that `CLAUDE.md` states 3.0:1 (wrong), and `globals.css:593` already documents the problem for `.pf-card`, choosing gray-dark there. The rule simply wasn't applied to the side and mobile navs.
- **WCAG:** 1.4.3 AA
- **Recommendation:** On light surfaces, use `--gray-dark` `#4A5568` (7.53:1) for any text. Reserve gray-medium for dark surfaces, where it reaches 8.13:1, and for hairlines. Correct the contrast table in `CLAUDE.md`.
- **Suggested command:** `/impeccable colorize`

**[P1] Auto-scrolling client carousel has no pause/stop control, and every logo is announced twice**
- **Location:** `src/components/sections/LogoCarouselTrack.tsx:78-129`, `src/components/sections/LogoCarousel.tsx:7` (`[...clientLogos, ...clientLogos]`)
- **Category:** Accessibility
- **Impact:**
  - The carousel moves indefinitely. Hover only slows it to 0.05 px/frame and never stops it. There is no keyboard or touch pause.
  - Screen readers read all 13 client names twice: the live HTML has `alt="World Bank"` ×2, and so on.
  - Reduced-motion users are handled correctly: the loop is skipped.
- **WCAG:** 2.2.2 Pause, Stop, Hide (Level A); 1.3.1 (the duplicate set is presentational)
- **Recommendation:**
  - Add a visible pause/play toggle, and stop the loop on `focusin`.
  - Put `aria-hidden="true"` on the duplicated half (render it with `alt=""`).
  - Use a `<ul>` for the real list.
  - Localize the hard-coded `aria-label="Featured client logos"`.
- **Suggested command:** `/impeccable harden`

**[P1] Cross-page section links land on a stale saved scroll position**
- **Location:** `src/components/util/HomeScrollManager.tsx:171-243`. The trigger comes from the nav links `/#expertise`, `/#news` and `/#contact` (`src/data/navigation.ts:7-10`) and from `DomainCTA.tsx:40` `/#contact`.
- **Category:** Implementation Integrity / Responsive
- **Impact (code-traced, not browser-reproduced):**
  1. On unmount, the manager saves `scrollY` to `sessionStorage` (`:269`).
  2. When the visitor returns to `/` (e.g. Portfolio → nav "Contact" → `/#contact`), it polls up to 12×120 ms.
  3. It then calls `applyScroll(saved)` (`:231`), which overrides the browser/Next scroll to `#contact`.
  4. Result: the visitor clicks "Contact" and lands on whichever section they last left, such as Portfolio.
  - A first visit in a session is unaffected, because saved = 0.
- **Recommendation:** Skip the restore when `window.location.hash` is non-empty, and clear the saved value. Only restore on history traversal: check `performance.getEntriesByType("navigation")[0].type === "back_forward"` or track `popstate`. Since the file's own note says no pins remain, consider removing the `ScrollTrigger.refresh()` polling entirely.
- **Suggested command:** `/impeccable harden`

**[P1] Hero heading is invisible at rest, so LCP waits on hydration**
- **Location:** `src/components/sections/Hero.tsx:97-100` (`<h1 class="animate-on-scroll">` → `globals.css:268-273` `opacity:0`). Revealed by `useScrollAnimation` (`src/hooks/useScrollAnimation.ts`), which runs only after the client chunk executes.
- **Category:** Performance
- **Impact:** The largest above-the-fold text, "Technology to transform nations", is `opacity:0` in the server HTML. Chrome does not count an `opacity:0` element as an LCP candidate until it is painted visible. LCP therefore lands only after:
  - download and parse of about 297 KB gz of JS
  - hydration of the `Hero` client component
  - the IO callback
  - the 700 ms fade

  On mid-range mobile on 4G this plausibly pushes LCP past the brief's 2.5 s target. The `<noscript>` override (`layout.tsx:134`) helps only no-JS users. This was not measured.
- **Recommendation:** Render the hero heading, rule and CTA visible by default. Animate *from* a visible state with CSS only, e.g. a `@keyframes` rise that starts on first paint. Keep `animate-on-scroll` for below-the-fold content. (Matches craft-floor: "Exponential ease-out from an already-visible default.")
- **Suggested command:** `/impeccable optimize`

**[P1] Canonical, sitemap, robots and JSON-LD point at `www.arxia.com`, which 302-redirects to `www.arxia.global`**
- **Location:** `src/app/[locale]/layout.tsx:23`, `src/i18n/metadata.ts:3`, `src/app/sitemap.ts:6`, `src/app/robots.ts:3`. Also the copy in `src/app/api/contact/route.ts:54,74,136`, `privacy/page.tsx`, `terms/page.tsx` and `opengraph-image.tsx:106`.
- **Category:** Implementation Integrity (overlaps the SEO assessments)
- **Impact:**
  - Live `<link rel="canonical" href="https://www.arxia.com">`.
  - `robots.txt` has `Host: https://www.arxia.com` and `Sitemap: https://www.arxia.com/sitemap.xml`.
  - All 95 sitemap `<loc>` entries use `.com`.
  - Meanwhile the HTTP `Link: … hreflang` header emitted by next-intl uses `www.arxia.global`.
  - `curl -sI https://www.arxia.com` returns **302** (temporary) → `.global`.
  - Search engines get contradictory canonical signals that point at a redirecting host.
  - The contact form panel itself says `arxia.global` (`CallToAction.tsx:186`).
- **Recommendation:** Pick the canonical host once. Make it an env-driven `SITE_URL` (e.g. `NEXT_PUBLIC_SITE_URL`) imported everywhere instead of four hard-coded constants. If `.com` is meant to be primary, the redirect must be a 301 in the other direction.
- **Suggested command:** `/impeccable harden`

### P2: Minor

**[P2] JavaScript payload is about 2× the brief's budget, and GSAP ships for a single scroll-velocity read**
- **Location (live homepage):** 13 JS chunks = **296,850 B gzip / 931,694 B raw**. CSS is 13,103 B gz. The two preloaded fonts are 113 KB.
  - `1f83iujtjrfc4.js` (GSAP + ScrollTrigger, 47.7 KB gz) is used in live code only by `LogoCarouselTrack.tsx:63` (`getVelocity()`) and `HomeScrollManager.tsx:200-222` (`refresh()`). The file's own note at `:154-157` says this is now "belt-and-braces rather than load-bearing".
  - `page.tsx:12-27` `dynamic()` sections are still referenced as initial `<script>`s. With `ssr:true` they are split but not deferred.
  - The English homepage chunk `3dk038fq79qev.js` contains the Spanish and French domain overlays: "Interoperabilidad full-stack" and "Interopérabilité full-stack" are both present. This is because `DomainsGrid` (client) calls `getExpertiseDomains(locale)`, which imports every overlay.
  - `@gsap/react` is in `package.json` but imported nowhere.
- **Category:** Performance
- **Impact:** Slower TTI and INP on mobile. The brief's target (JS <150 KB gz) is missed by about 147 KB. The framework baseline (react-dom ≈71 KB gz + Next runtime) is a fixed floor, so the controllable share is the GSAP chunk, the inlined locale data and client-side page views.
- **Recommendation:**
  - Replace the GSAP velocity read with a passive scroll listener (the delta of `scrollY` per frame). Drop `gsap`, `@gsap/react` and `useGsapScrollTrigger`.
  - Resolve the locale overlay on the server and pass plain props into the client island.
  - Convert static views (`DomainsGrid`, `DomainPageView`, `InteroperabilityPageView`, `PortfolioPageClient`) to server components that wrap small client "reveal" islands. 44 files are currently `"use client"`.
- **Suggested command:** `/impeccable optimize`

**[P2] Three animation loops run for as long as the page is open, and none pause when off-screen**
- **Location:**
  - `src/components/ui/Globe.tsx:76-87`: `globe.update()` on every frame, forever, including under reduced motion, where rotation stops but redraws continue.
  - `src/components/sections/LogoCarouselTrack.tsx:78-112`: reads `track.scrollWidth` every frame.
  - `src/components/sections/Hero.tsx:28-34` with `useAnimationFrame.ts`: grid drift; pauses on `document.hidden` only.
- **Category:** Performance
- **Impact:** A WebGL globe re-rendering at 60 fps while the visitor reads Portfolio or News costs GPU time and battery on laptops and phones.
- **Recommendation:** Gate each loop with an IntersectionObserver: start on enter, `cancelAnimationFrame` on leave. In reduced motion, render the globe once and stop. Cache `scrollWidth` on resize instead of reading it every frame.
- **Suggested command:** `/impeccable optimize`

**[P2] ScrollTrigger is never killed in the logo carousel (leaks on every homepage visit)**
- **Location:** `src/components/sections/LogoCarouselTrack.tsx:62-75`. The `() => st.kill()` is returned from the `setTimeout` callback, where it is discarded. The effect cleanup only clears the timer.
- **Category:** Performance / Implementation Integrity
- **Impact:** Each client navigation back to `/` adds another document-level ScrollTrigger with an `onUpdate` that writes into a dead ref.
- **Recommendation:** Store `st` in a ref and kill it in the effect cleanup. This becomes moot if GSAP is removed, per the finding above.
- **Suggested command:** `/impeccable harden`

**[P2] `/portfolio` (and /es, /fr) has no `<main>` landmark, so the skip link targets nothing**
- **Location:** `src/app/[locale]/portfolio/PortfolioPageClient.tsx` (no `<main id="main">`). The skip link is in `layout.tsx:154-159`. The crawl found `main=0` on the three portfolio index URLs and `main=1` everywhere else.
- **Category:** Accessibility
- **WCAG:** 2.4.1 Bypass Blocks (A), 1.3.1
- **Recommendation:** Wrap the page body in `<main id="main" tabIndex={-1}>`, as `DomainPageView.tsx:67` does.
- **Suggested command:** `/impeccable harden`

**[P2] Nested interactive elements: `<a><button>` for "View Full Portfolio"**
- **Location:** `src/components/sections/Portfolio.tsx:94-96`. Confirmed in the live HTML: `<a href="/portfolio"><button …>`.
- **Category:** Accessibility
- **Impact:** Invalid HTML, two tab stops for one action, and an inconsistent screen-reader role.
- **WCAG:** 4.1.2
- **Recommendation:** Use `<Button variant="primary" href="/portfolio">`; the primitive already renders a Link.
- **Suggested command:** `/impeccable harden`

**[P2] Contact form error handling: English-only server messages, no field association, focus loss on success**
- **Location:** `src/components/sections/CallToAction.tsx:66-69` (shows `json.error` verbatim), `:278-285` (one generic alert), `:191-212` (form unmounts on success). `src/app/api/contact/route.ts:110-118,126` (English strings).
- **Category:** Accessibility / Implementation Integrity (i18n)
- **Impact:**
  - A Spanish visitor who leaves the email blank sees "Please provide a valid email."
  - Fields never get `aria-invalid` or `aria-describedby`, and with `noValidate` there is no inline validation at all.
  - On success the focused submit button is removed, so focus drops to `<body>`. The newly mounted `role="status"` may not be announced reliably.
- **WCAG:** 3.3.1 Error Identification (A), 3.3.3, 2.4.3
- **Recommendation:**
  - Return error *codes* (`name_required`, `email_invalid`, `rate_limited`) and map them to `ContactForm.*` messages.
  - Validate on the client per field, with `aria-invalid` plus an `aria-describedby` message under each input.
  - Keep a persistent live region mounted, and move focus to the success heading (`tabIndex={-1}`).
- **Suggested command:** `/impeccable harden`

**[P2] Contact API abuse resistance is weaker than it looks**
- **Location:** `src/app/api/contact/route.ts:16-31` (in-memory `Map`), `:120-123` (IP), `:136` (subject).
- **Category:** Implementation Integrity (security)
- **Impact:**
  - On Vercel serverless, each instance or region has its own `buckets` map, so 3 per 10 min is not a real ceiling. The map is also never pruned.
  - There is no `Origin`/`Referer` check, so scripted POSTs that skip the honeypot only hit the per-instance limiter.
  - `name` goes into the email subject without stripping CR/LF or control characters. Resend's JSON API makes header injection unlikely, but sanitizing is cheap.
- **Done well:** HTML escaping of all fields, length caps, an email regex, a honeypot answered with a silent 200, a 503 that does not leak which env var is missing, and server-side validation that does not trust the client.
- **Recommendation:**
  - Use a durable limiter: Upstash/Vercel KV, or the Vercel Firewall rate-limit rule on `/api/contact`.
  - Reject requests whose `Origin` is not the site host.
  - Strip `[\r\n\t\0-\x1F]` from `name` before building the subject.
- **Suggested command:** `/impeccable harden`

**[P2] No Content-Security-Policy**
- **Location:** `next.config.mjs:31-51`. Live headers have `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` and HSTS `max-age=63072000` (from Vercel), but no CSP.
- **Category:** Implementation Integrity (security)
- **Impact:** No defence in depth against injected script. The risk is low today (the only `dangerouslySetInnerHTML` is static JSON-LD), but the site embeds third-party scripts (Plausible) and remote images (ytimg).
- **Recommendation:** Ship a nonce-based CSP via middleware (`script-src 'self' 'nonce-…' https://plausible.io; img-src 'self' data: https://i.ytimg.com; frame-src https://www.youtube-nocookie.com …`). Start in `Content-Security-Policy-Report-Only`. Also update the stale comment at `next.config.mjs:32-35`, which still refers to the removed Caddy layer.
- **Suggested command:** `/impeccable harden`

**[P2] Localized legal pages serve English under `lang="es"` / `lang="fr"`**
- **Location:** `src/components/layout/LegalPage.tsx`, `src/app/[locale]/privacy/page.tsx`, `terms/page.tsx`. Live `/es/privacy` has `<html lang="es">` with the h1 "Privacy Policy". Footer links in es/fr point to these URLs.
- **Category:** Accessibility
- **Impact:** Screen readers read English legal text with Spanish or French pronunciation rules. (The legal copy being placeholder English is acknowledged and not penalized; this is only the language attribute.)
- **WCAG:** 3.1.2 Language of Parts (AA)
- **Recommendation:** Add `lang="en"` on the LegalPage content wrapper while the copy is English-only. Localize "Last updated" (`LegalPage.tsx:63`).
- **Suggested command:** `/impeccable harden`

**[P2] Mobile menu focus trap excludes its own close control; active state not exposed**
- **Location:** `src/components/layout/Navbar.tsx:33-47` (trap cycles only within the overlay; the X toggle at `:95-105` sits outside it), `:78-87` (active link styled but no `aria-current="page"`). Same pattern in `PortfolioSideNav.tsx:80-88` and `PortfolioMobileNav.tsx:81-90` (active filter has no `aria-pressed` or `aria-current`).
- **Category:** Accessibility
- **Impact:** Keyboard users can close the menu only with Escape. Screen readers can't tell which page or filter is active. Page scroll behind the `aria-modal` overlay is not locked.
- **WCAG:** 2.1.2 / 2.4.3, 4.1.2
- **Recommendation:**
  - Include the toggle in the focusable set, or render a close button inside the dialog.
  - Add `aria-current="page"` to active links, and `aria-pressed` (or `aria-current="true"`) to active filters.
  - Set `overflow:hidden` on `<html>` while the menu is open.
- **Suggested command:** `/impeccable harden`

**[P2] Hard-coded English strings bypass i18n**
- **Location:** `src/app/[locale]/layout.tsx:158` "Skip to content"; `LogoCarouselTrack.tsx:124` "Featured client logos"; `ui/Globe.tsx:136` globe `aria-label`; `PortfolioSideNav.tsx:74` "Domains"; `LegalPage.tsx:63` "Last updated"; the API error strings (see the contact form finding).
- **Category:** Implementation Integrity (i18n)
- **Impact:** es/fr screen-reader users hear English control names.
- **Note:** The message catalogues themselves are complete. `en`, `es` and `fr` have identical key sets (260 keys, 0 missing, 0 extra), and the values identical to English are legitimate cognates (country names, "Portfolio", "e-Procurement").
- **Recommendation:** Move these strings into `messages/*.json`.
- **Suggested command:** `/impeccable clarify`

**[P2] Touch targets and functional text below the brief's floor**
- **Location:**
  - `Hero.tsx:144`: the primary CTA overrides the Button primitive with `!px-5 !py-1.5 !min-h-0 !text-[13px]`, giving about 31 px height. The brief requires a 48 px minimum and 15 px text.
  - `LocaleSwitcher.tsx:31-48`: buttons with no padding, 10 px text (≈15×15 px; ≈20 px tall in the mobile overlay).
  - Mobile overlay links: 14 px text, no padding.
  - Footer links (`Footer.tsx:85,104`): about 24 px rows.
  - Form labels at 10 px (`CallToAction.tsx:236,261`).
  - Overall: **94 text instances at 9-11 px** across `src` (42×10px, 38×11px, 14×9px).
- **Category:** Responsive
- **Impact:** Misses on phones and hard-to-read labels. WCAG 2.5.8 (24 px, AA) is mostly met through spacing, but the brief's 44 px touch rule and "body never below 16px" are not.
- **Recommendation:** Restore `min-h-12` on the hero CTA, or add a deliberate `size="sm"` variant that keeps ≥44 px. Give LocaleSwitcher, footer and overlay links `py-2.5`-plus hit areas, using padding rather than font size. Raise form labels to 11-12 px.
- **Suggested command:** `/impeccable adapt`

**[P2] Contradictory "years of experience" claims**
- **Location:** `src/components/sections/GlobalPresence.tsx:199` (homepage odometer **"25+" Years**) vs `src/app/[locale]/layout.tsx:27` (meta description "more than **20** years") and `messages/en.json:44,46` ("**Two decades**").
- **Category:** Implementation Integrity (material honesty)
- **Impact:** Credibility. Government buyers and procurement reviewers notice inconsistent facts.
- **Recommendation:** Put company facts in a single `src/data/company.ts` (years, countries, projects; the "44" in `PortfolioPageClient.tsx:126` is also hard-coded, though currently correct at 44 entries) and reference it everywhere.
- **Suggested command:** `/impeccable clarify`

**[P2] JS smooth scrolling ignores `prefers-reduced-motion` in the portfolio navs**
- **Location:** `src/components/portfolio/PortfolioSideNav.tsx:56`, `PortfolioMobileNav.tsx:49,60` (`behavior: "smooth"` hard-coded). The global CSS `scroll-behavior:auto !important` does not override an explicit JS behaviour. Compare `ScrollProgressRail.tsx:84-88`, which does this correctly.
- **Category:** Accessibility
- **WCAG:** 2.3.3 (AAA) / the brief's reduced-motion requirement
- **Recommendation:** Reuse the `reduced ? "auto" : "smooth"` check.
- **Suggested command:** `/impeccable animate`

**[P2] Typography tokens defined but never used; styling lives in 184 inline style objects; two off-palette hover reds**
- **Location:**
  - `globals.css:21-28` defines `--text-hero/h1/h2/h3/annotation`: **0 uses**. The same clamps are re-typed inline (e.g. `SectionHeader.tsx:260` `clamp(26px, 3vw, 36px)` = `--text-h2`; `Hero.tsx:103` = `--text-hero`). There are about 17 bespoke display `clamp()` values and off-scale sizes 13 px, 13.5 px, 17 px and 22 px.
  - Hover reds `#C8101A` (`CallToAction.tsx:292`, `PlayVideoButton.tsx:29`, `CaseStudyVideo.tsx:109`) and `#c8161d` (`Hero.tsx:144`) are two different un-tokenized values.
  - Other hex literals: 30 in components, mostly SVG figure fills in `LayerFigures.tsx` and `CaseStudyFigures.tsx` that duplicate token values.
- **Category:** Theming
- **Impact:** Changing the type scale or the red (as the contrast finding requires) means editing dozens of files.
- **Recommendation:**
  - Expose the type scale through `@theme` (`--text-h2: …` gives `text-h2`) and replace the inline `style={{fontSize…}}`.
  - Add `--color-accent-red-hover` and `--color-accent-red-text`.
  - In SVG figures use `fill="var(--blueprint-blue)"` or `currentColor`.
- **Suggested command:** `/impeccable typeset`

### P3: Polish

- **[P3] Dead code, about 1,250 lines:**
  - Unimported modules: `components/ui/SplitPanel.tsx`, `ui/TextMaskReveal.tsx` (the repo's only gradient-text), `ui/WorldMap.tsx` + `ui/WorldMapPaths.tsx`, `sections/Positioning.tsx`, `domain/DomainPortfolio.tsx` (which also contains an untranslated "View All Projects →" inside `<Link><Button>`), `ui/IconBox.tsx`, `hooks/useTextScramble.ts`.
  - Dead CSS: `.accent-line-animate` (`globals.css:281-288`) and the matching selector in `layout.tsx:134`.
  - Stale comments: `domain-pages.ts:19-22` ("Learn more links are placeholder targets": no such links render, which was verified), `page.tsx:12` ("code-split for faster TTI"), `next.config.mjs:34` (Caddy/HSTS).
  - Category: Integrity. Fix: delete. Suggested command: `/impeccable distill`.
- **[P3] Likely duplicated `next/image` runtime chunk.**
  - `24bfdmyh9ctxh.js` and `0g47cej0z-_nj.js` are both 27,329 B (≈9.9 KB gz) with near-identical next/image runtime contents. Root cause unverified; it is probably split chunk groups under Turbopack.
  - Fix: check with `next build --debug` or the bundle analyzer. Suggested command: `/impeccable optimize`.
- **[P3] Invisible but expensive decoration.**
  - `Hero.tsx:69-90`: two `blur-[100-120px]` blobs at `rgba(22,32,54,.35)` on `#0D1520` and red at 3% alpha. They are essentially invisible yet force large blurred paint layers.
  - `CallToAction.tsx:163-172`: radial halo behind the form.
  - Colored offset glows on the red buttons (`shadow-[0_8px_28px_rgba(237,28,36,.3)]`).
  - Fix: remove the blobs and let the grid carry the surface. Suggested command: `/impeccable quieter`.
- **[P3] Odometer re-renders.** It re-renders the whole `GlobalPresence` section every frame (state lives in the parent, `GlobalPresence.tsx:197-199`) and lacks `tabular-nums`, so digits jitter while counting. Fix: move state into `Stat` and add `font-variant-numeric: tabular-nums`. Suggested command: `/impeccable animate`.
- **[P3] Dark color scheme declared site-wide.** `viewport.colorScheme: "dark"` (`layout.tsx:81`) on a site where half the surfaces are white, and `body` has no background colour. There is no `::selection`, `caret-color` or `scrollbar-color` theming (0 occurrences in the live CSS). Fix: either declare `light dark` scoped per surface or keep `dark` but set `html{background:var(--blueprint-dark)}`, and theme selection with Blueprint Blue / white (craft-floor "browser surfaces"). Suggested command: `/impeccable polish`.
- **[P3] The brief is out of date.**
  - `CLAUDE.md` lists Gray Medium on White as 3.0:1 (actual 2.26), Red on White as 4.0:1 (actual 4.38) and Gray Dark as 5.9:1 (actual 7.53).
  - It specifies a weight-300 rotating-word hero, but the build ships a bold static h1.
  - Future pages will inherit the wrong numbers. Fix: update the table. Suggested command: `/impeccable document`.
- **[P3] Redirect hop in an article link.** `src/data/news.ts:685` links to `/process`, which returns 308 to `/e-services`. Fix: link directly. Suggested command: `/impeccable polish`.
- **[P3] Globe drag gesture.** `Globe.tsx:133-149` has no `touch-action`, no `pointercancel`/`lostpointercapture` handling, and mixes pointer, mouse and touch events. The touch gesture was **not exercised** (no touch synthesis available); these are code tells only. Fix: switch to pointer events with `setPointerCapture`, `touch-action: pan-y`, and reset on cancel. Suggested command: `/impeccable adapt`.
- **[P3] Undisclosed locale cookie.** A `NEXT_LOCALE` cookie is set on every response although `localeDetection: false`, while the privacy page describes the site as cookieless. Fix: `localeCookie: false` in `routing.ts`, or disclose it. There is also no root `app/global-error.tsx`, so root-layout crashes fall back to the framework default. Suggested command: `/impeccable harden`.

---

## Assessment B: Deterministic Detector Pass (rules applied manually)

The rules were ported from `crates/detect/src/regex_matchers.rs` (line matchers and `REGEX_ANALYZERS`) and `crates/core/src/checks/css_scan.rs` (glow, halo, grid, marquee scanners). They were run over `src/**/*.{ts,tsx,css}` and `messages/*.json`. Rule semantics follow the source: for example, side-tab via Tailwind needs `border-[lrse]-N` with N≥4 (≥2 if rounded); bounce-easing fires when a cubic-bezier y1 or y2 is outside [-0.1, 1.1]; em-dash-overuse needs ≥8 dashes *and* ≥1 per 500 chars; marketing-buzzword uses the 29-phrase list. The `design-system-*` rules require a `DESIGN.md`, and the repo has none, so the real detector would emit **0**. They were emulated against the `CLAUDE.md` token set as a proxy.

| Rule | Count | Locations | Verdict |
|---|---|---|---|
| `side-tab` (Tailwind/CSS/JS border-left/right ≥3-4px) | 0 | none | clean |
| `side-tab` (stripe-child variant) | 4 | `FeaturedProjectCard.tsx:39`, `ProjectCard.tsx:45`, `DomainsGrid.tsx:187`, `DomainsGrid.tsx:266` (3 px red `left-0 inset-y-0` spans, hover-scaled) | **Brief-sanctioned** ("Optional: 3px left-border accent in red or blue"). Manual extras: `Card.tsx:15` `border-l-[3px]`, `PortfolioSideNav.tsx:86` (active indicator, legitimate), and `CallToAction.tsx:281` `border-l-2` on the error alert, which is a **real** craft-floor violation (stripes banned on callouts/alerts) at P3 |
| `border-accent-on-rounded` | 0 | none (no rounded cards; only `rounded-full` dots) | clean |
| `overused-font` | 0 deterministic (fonts load via `next/font` and `font-family: var(--font-primary)`, which the regex can't see) | Manual: Inter is the primary face (`layout.tsx:10`) | **Brief-sanctioned** (Inter + JetBrains Mono mandated) |
| `gradient-text` | 0 deterministic (the camelCase `backgroundClip` in JSX evades the CSS regex) | Manual: `TextMaskReveal.tsx:84-88` | Real pattern but **dead code**, not shipped |
| `gray-on-color` | 0 | none (no Tailwind gray scale; custom tokens only; gray-medium on Blueprint Blue is 7.2:1) | clean |
| `ai-color-palette` | 0 | none | clean |
| `bounce-easing` | 1 | `globals.css:431` `cubic-bezier(0.34, 1.36, 0.64, 1)` on `.domain-iso-plate` | Real (advisory). Intentional "settle" overshoot documented in the code; neutralized under reduced motion. Keep or soften to y1≤1.1 |
| `layout-transition` | 1 | `globals.css:283` `transition: width` | Real but in **dead CSS** (`.accent-line-animate` unused). Manual (missed by the detector because it skips `all`/`grid-template-rows`): `globals.css:362` `grid-template-rows` on domain plates (intentional, small, P3); `ScrollProgressRail.tsx:123` `transition-all` animating w/h of the active dot; `transition-all` on `Button.tsx:20`, `Card.tsx:13` and 4 others |
| `broken-image` | 0 | none; all 32 homepage `<img>` have src+alt; 31/32 lazy | clean |
| `dark-glow` | 0 deterministic (shadows are Tailwind arbitrary classes, not `box-shadow:` declarations) | Manual: red `rgba(237,28,36,.3-.35)` offset glows at `CallToAction.tsx:292`, `PlayVideoButton.tsx:29`, `CaseStudyVideo.tsx:109`, `FeaturedCaseCard.tsx:55` | Real but mild (offset, low alpha), P3 |
| `radial-halo` | 0 deterministic (TSX file has no dark root bg for the scanner) | Manual: `CallToAction.tsx:170` radial glow behind the form on a dark page | **Real** (P3). `Hero.tsx:56,58` are cursor `mask-image`s, a **false positive** |
| `marquee` | 0 deterministic (the motion is JS rAF, not CSS keyframes) | Manual: `LogoCarouselTrack.tsx` | **Brief-sanctioned** (logo carousel mandated); the WCAG 2.2.2 pause failure is a real separate P1 |
| `codex-grid-background` | 0 (6 near-misses: 4 hairlines each but no px `background-size` cell) | `globals.css:130,163,196,232,670,811` | **Brief-sanctioned** ("Blueprint grid mandatory on every section"); the subject world is literally a blueprint |
| `monotonous-spacing` | 0 | none | clean |
| `em-dash-overuse` | 2 files over threshold | `src/app/[locale]/page.tsx` (8 dashes): all inside code comments, a **false positive**. `src/data/portfolio-domains.ts` (7 visible in 5 descriptions, ≈1 per 450 chars of copy) | portfolio-domains: **real** (advisory); rewrite 3-4 as commas or periods. Below threshold: `news.ts` 36/67.9k chars, `DomainsGrid.tsx` 9 (comments), `messages/en.json` 1 |
| `marketing-buzzword` | 1 | `src/data/news.ts:344` "a **world-class** digital presence" (Burundi article lede) | Real, minor. Near-misses not on the list: "seamless", "robust" (`portfolio-domains.ts:20`), "empower" (news) |
| `aphoristic-cadence` | 0 (1 construction in `news.es.ts`, threshold 3) | none | clean |
| `design-system-font` (proxy vs CLAUDE.md) | 0 in UI | Courier New/Consolas only in the email template (`route.ts`), appropriate for email | clean |
| `design-system-color` (proxy) | 5 off-palette values | `#C8101A` ×3, `#c8161d` ×1, `#111b2b` (`CallToAction.tsx:174`), `#1A2D4A` (figures), `rgba(46,72,128,.45)` (halo) | Real drift (P2 theming) |
| `design-system-font-size` (proxy) | about 17 bespoke display clamps + off-scale 13, 13.5, 17, 22 px | see the typography-token finding | Real drift (P2) |
| `design-system-radius` (proxy) | 0 | `rounded-full` only on dots, rail markers and blurred blobs | clean / brief-sanctioned |

**Detector summary:** 0 hard slop failures in shipped code. The real hits are advisory or polish level. The brief-sanctioned patterns (grid background, Inter, mono annotations, red stripe accents, logo marquee) were checked and left as-is on purpose.

---

## Patterns & Systemic Issues

1. **The brief's contrast table is wrong, and the build trusted it.** Red as small text and gray-medium on light surfaces fail across about 25 call sites. One token correction fixes most of the a11y score.
2. **Content is hidden at rest and revealed by JS.** 14 `animate-on-scroll` elements on the homepage alone, including the hero h1. This gates LCP and creates a no-motion dependency on JS. The reduced-motion and noscript handling is careful, but the default should be visible.
3. **Client components wrap whole pages.** 44 `"use client"` files; page views and static sections hydrate in full, which drags locale data and GSAP into the bundle.
4. **Perpetual animation loops without viewport gating:** globe, carousel and hero grid.
5. **Typography is set inline instead of through tokens.** 184 `style={{}}` objects, 0 uses of the type tokens.
6. **Hard-coded site facts and hosts:** `SITE_URL` ×4, "44", "20+", "25+", and English control labels in five components.

## Positive Findings

- **Reduced motion handled more deliberately than most sites.** The global `0.01ms` kill (`globals.css:740-803`) is paired with explicit *resolved end states* for every motion layer, so content is never left at `opacity:0`. Impeccable normally flags a blanket kill, but here state and hierarchy are preserved. JS loops (hero grid, carousel, odometer, particles, GSAP triggers, scroll rail) each check `prefers-reduced-motion`, and `scroll-snap` is disabled under it.
- **No-JS readable:** the `<noscript>` override (`layout.tsx:133-135`), and the odometer rests at the real figure ("25+"), not "0+".
- **Semantic skeleton:** exactly one `<h1>` on all 95 crawled URLs; correct `lang` per locale (`en`/`es`/`fr`); skip link; `main` on 92/95; labelled `<nav>`s; `aria-hidden` on every decorative SVG, rule and dot; descriptive alt text on news covers; `alt=""` on decorative posters.
- **Hover-only content solved for touch:** `@media (hover: none)` opens the domain-plate descriptions (`globals.css:383-390`), and the description is "collapsed, not hidden" for screen readers.
- **i18n catalogue complete:** 260 keys, identical across en/es/fr, with an English deep-merge fallback (`i18n/request.ts`). No broken internal links across 105 unique hrefs; the only non-200 is a 308 hop. The 404 route is branded and returns a real 404.
- **Images:** `next/image` everywhere, WebP, lazy below the fold, `sizes` set, the logo preloaded, the globe DPR capped at 1 on mobile with `contain: layout paint size`.
- **Scroll work done right where it exists:** `ScrollProgressRail` uses a passive listener with rAF coalescing and reduced-motion-aware `scrollTo`.
- **Contact API basics:** escaping, length caps, honeypot with a silent 200, a non-leaky 503, and server-side validation.
- **Detector-clean craft:** no gradient text, glassmorphism-as-default, rounded-accent cards, AI palette or monotonous spacing in shipped code. Square corners are respected everywhere.

## Recommendations for upcoming pages

(For the domain and service pages still to be built; patterns taken from the built ones.)

- **Follow:**
  - The `DomainPageView` shell: `<main id="main" tabIndex={-1}>`, `SectionContainer` modes alternating dark → light → ultra-light, one `<h1>` in the hero, `SectionHeader as="h1"` where it leads.
  - Server-render the content and isolate motion in small client islands, instead of making the whole view a client component.
  - Pass already-localized data as props, resolved on the server, so no es/fr overlays reach English bundles.
- **Use the corrected colour roles from day one:**
  - gray-dark for any text on white or `#F7FAFC`
  - the new red-for-text-on-dark token for annotations
  - the darker red fill for buttons
- **Start visible:** no `animate-on-scroll` on the hero heading or above-the-fold copy.
- **Use the `Button` primitive's `href`,** never `<Link><Button>`. Keep `min-h-12`; add a sized variant rather than `!` overrides.
- **Any new "Learn more" offer links** (`domain-pages.ts` service slugs) must not render until their `/[domain]/[slug]` routes exist. Today they correctly don't render; keep it that way.
- **Gate every rAF, canvas or WebGL figure** with an IntersectionObserver and a reduced-motion single frame.
- **Put every user-facing string, including `aria-label`s and alt text, in `messages/*.json`.** Pull facts (years, counts) from one data module.

## Recommended Actions

1. **[P0] `/impeccable adapt`**: move the mobile overlay out of the `backdrop-filter` nav (or blur a child layer); re-test on iOS/Android.
2. **[P1] `/impeccable colorize`**: split Digital Red into text-on-dark (≈`#F2585D`) and fill (≈`#D8141C`) tokens; replace gray-medium with gray-dark on light surfaces; fix the `CLAUDE.md` contrast table.
3. **[P1] `/impeccable optimize`**: make the hero visible at rest. Then remove GSAP (velocity via passive scroll), server-resolve locale data, IO-gate the globe, carousel and hero loops, and investigate the duplicated next/image chunk.
4. **[P1] `/impeccable harden`**:
   - `HomeScrollManager` respects `location.hash`
   - carousel pause control and `aria-hidden` duplicates
   - a single env-driven `SITE_URL`
   - `<main>` on /portfolio
   - un-nest `<a><button>`
   - contact-form error codes, field errors and focus
   - durable rate limit plus Origin check
   - CSP (report-only first)
   - the ScrollTrigger leak
   - `lang="en"` on English legal copy
   - the mobile-nav close in the focus trap, plus `aria-current`
5. **[P2] `/impeccable adapt`**: restore the 48 px hero CTA and enlarge the locale, footer and overlay link hit areas.
6. **[P2] `/impeccable typeset`**: expose the type scale via `@theme`, retire inline font styles, tokenize the hover red.
7. **[P2] `/impeccable clarify`**: move hard-coded English labels into messages; reconcile "25+ / 20+ / two decades" via one facts module.
8. **[P2] `/impeccable animate`**: reduced-motion check in the portfolio smooth-scrolls; odometer `tabular-nums` with local state.
9. **[P3] `/impeccable distill`**: delete the about 1,250 lines of dead modules and CSS, and the stale comments.
10. **[P3] `/impeccable quieter`**: drop the invisible hero blur blobs and the form halo.
11. **[P3] `/impeccable document`**: bring `CLAUDE.md` in line with the shipped hero and the measured contrast.
12. **`/impeccable polish`**: final pass (browser-surface theming, the `/process` link, color-scheme declaration).

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable audit` after fixes to see your score improve.
