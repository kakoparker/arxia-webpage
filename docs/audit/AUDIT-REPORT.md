# Arxia Website Audit — Design, Technical & SEO

**Date:** 2026-10-06
**Target:** live site **https://www.arxia.global**, built from `origin/main` @ `bfb5017` (Next.js 16 / next-intl, EN · ES · FR)
**Methods:** [impeccable](https://github.com/pbakaus/impeccable) (`audit` + `critique`) and [claude-seo](https://github.com/AgricIDaniel/claude-seo) (`seo-audit` with technical, content, schema, sitemap, hreflang, images, performance, GEO, agentic, SXO specialists)
**Scope:** built pages only. Unbuilt service sections are out of scope and not penalised. Anything a visitor or crawler hits on the built site today *is* in scope.
**Status:** report only. Nothing in the codebase has been changed.

---

## 1. Scorecard

| Framework | Score | Band |
|---|---|---|
| **impeccable audit** (technical quality) | **12 / 20** | Acceptable: significant work needed |
| **impeccable critique** (Nielsen heuristics; H7 and H10 n/a for a marketing surface) | **22 / 32** (69%) | Acceptable, one point short of Good |
| **claude-seo** SEO Health Score (weighted) | **56 / 100** | Needs work. Dragged down by a single domain bug |

<details><summary>Score breakdowns</summary>

**impeccable audit**

| Dimension | Score | Key finding |
|---|---|---|
| Accessibility | 2 | Digital Red fails AA as text and as a button fill; gray-medium on white is 2.26:1; the logo marquee can't be paused |
| Performance | 2 | 297 KB gz JS (budget 150 KB); hero H1 hidden until JS runs; globe renders every frame off-screen |
| Responsive | 2 | **Mobile menu collapses to 0 px**; hero CTA about 31–34 px tall (brief says 48 px) |
| Theming | 3 | Colour tokens used well; typography tokens defined but used 0 times |
| Implementation integrity | 3 | **Pass.** Coherent, brief-faithful system with almost no generic AI patterns |

**claude-seo** (weights from the seo-audit skill)

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 42 |
| Content Quality | 23% | 62 |
| On-Page SEO | 20% | 58 |
| Schema | 10% | 55 |
| Performance (CWV) | 10% | 68 *(provisional, no field or lab data)* |
| AI Search Readiness | 10% | 46 |
| Images | 5% | 78 |
| **Weighted total** | | **56** |

E-E-A-T sub-score: 56/100. Experience 14/20, Expertise 13/25, Authoritativeness 12/25, Trust 17/30.

**impeccable critique** (Nielsen heuristics)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | "News" nav item is never shown as active |
| 2 | Match with the real world | 3 | Home shows 7 practices; portfolio shows 8 differently named categories |
| 3 | User control and freedom | 3 | The logo marquee can't be paused |
| 4 | Consistency and standards | 2 | Primary button is red in some places, near-invisible navy in others; mixed date formats |
| 5 | Error prevention | 2 | The form has no checks in the browser (`noValidate`) |
| 6 | Recognition rather than recall | 3 | No way to move between domain pages from the top nav |
| 7 | Flexibility and efficiency | n/a | Marketing surface |
| 8 | Aesthetic and minimalist design | 3 | Coherent, but the hero, stat rows and red use are generic |
| 9 | Error recovery | 3 | Server errors are English-only, and one reveals server state |
| 10 | Help and documentation | n/a | Marketing surface |

</details>

**Bottom line.** The interior of the site is genuinely good. `/interoperability`, the building-blocks domain plate, the portfolio's funder attribution and the reduced-motion handling are authored work that only Arxia could ship. Three things hold the scores down, and all three are cheap to fix:

1. **The site tells Google its real address is a dead domain** (Critical SEO).
2. **The mobile menu is broken on every phone** (P0 UX).
3. **The trust layer is missing or contradictory.** There's no legal entity or contact details, and the years and scale figures disagree from page to page.

Fixing those three alone would likely move SEO into the 70s and the audit to about 15/20.

---

## 2. Top 12 actions (deduplicated across all four audits, in priority order)

| # | Sev | Action | Where | Effort |
|---|---|---|---|---|
| 1 | **Critical** | Point every canonical, hreflang, sitemap, robots and schema URL at the live domain. Today they all say `https://www.arxia.com/…`, which **returns 404** for every path except `/`. Use one shared `SITE_URL` constant or env var. | `src/i18n/metadata.ts:3`, `src/app/[locale]/layout.tsx:23`, `src/app/sitemap.ts:6`, `src/app/robots.ts:3` | XS |
| 2 | **Critical** | Decide the canonical brand domain, then make the other one a **301 that keeps the path**. Today arxia.com sends a temporary 302 to the homepage only, and deep paths 404. Map the old TYPO3 `.html` URLs that still rank (e.g. `/about-us.html`, `/products/processplayer-public-procurement.html`) to their new pages, and lock `www.new.arxia.com`. | Apache on arxia.com, plus `next.config.mjs` redirects | S |
| 3 | **P0** | **Fix the mobile menu.** The nav's `backdrop-blur` makes it the containing block for its `position:fixed` overlay, so the overlay renders 0 px tall: "Domains" is off-screen at y=−59 and the other links float over the hero. Move the overlay out of `<nav>`, or put the blur on a child layer. Verified on live at 375×812 ([evidence](evidence/mobile-menu-collapsed-375px.jpg)). | `src/components/layout/Navbar.tsx:58, 110-129` | XS |
| 4 | **P1 / High** | **One source of truth for company facts.** The site says 25+ years (`GlobalPresence.tsx:46`), more than 20 years (`layout.tsx:27`) and two decades (`messages/*.json:44,46`). ProcessPlayer is used by 50+ organisations (`domain-pages.ts:345`) or by over 100 institutions (`portfolio.ts:262`). Portfolio says "8 domains" while home shows 7. Tunisia is listed under West Africa (`GlobalPresence.tsx:30`). One person appears with two different titles. Put all of these in one `company-facts.ts` and import it everywhere. | `src/data/*`, `messages/*` | S |
| 5 | **P1 / High** | **Add a trust layer.** Show the legal entity (Arxia S.R.L.), registration number, registered address, a role email and ideally a phone number in the footer and legal pages. Privacy and Terms still say "arxia.com" and give a personal email. Today the form is the *only* contact channel. | `Footer.tsx:45-49`, privacy/terms pages | S |
| 6 | **P1** | **Fix brand-colour contrast, and correct the brief that caused it.** Digital Red as 11 px text on Blueprint Dark is 4.18:1 (lower at the brief's 85% opacity), and 3.70:1 on Blueprint Blue. White on a red button is 4.38:1. Gray-medium on white is **2.26:1**, not the 3.0:1 the brief claims. Use a lighter red for text on dark (about `#F2585D`, 5.5:1), a darker red for fills (about `#D8141C`, 5.2:1), and gray-dark for small text on light. | `globals.css` tokens, `CLAUDE.md` contrast table, `PortfolioSideNav.tsx:83-93`, `PortfolioFilter` | S |
| 7 | **P1** | **Hero: make it visible on first paint and give it something only Arxia can show.** The H1 ships at `opacity:0` and waits on about 297 KB of JS, so LCP is likely over 2.5 s on mobile. The CTA is red-filled and about 34 px tall, against the brief (no red buttons, 48 px minimum), and the headline weight is 700 where the brief says 300. | `Hero.tsx:93-149`, `globals.css:268` | M |
| 8 | **P1** | **Make the logo marquee pausable and announce it once.** Hover only slows it (WCAG 2.2.2, Level A). Screen readers hear every logo twice because of the loop duplicate (mark the copy `aria-hidden`). Add a label saying what the logos are: clients, funders or partners. | `LogoCarousel.tsx:7`, `LogoCarouselTrack.tsx` | S |
| 9 | **High** | **Social previews and metadata.** 60 of 99 pages have no `og:image`, because `opengraph-image.tsx` sits outside `[locale]` and is never referenced. 54 pages share the homepage's OG URL and title. The Twitter title is the same English string on all 120 pages. Add one shared metadata helper. | `src/app/opengraph-image.tsx`, `layout.tsx:50-65` | S |
| 10 | **High** | **Conflicting hreflang.** The next-intl `Link` header lists arxia.global while the page head and sitemap list arxia.com. Set `alternateLinks: false` so the page head is the only source. Use real `lastmod` values in the sitemap; today every entry gets the build time. | `src/i18n/routing.ts`, `sitemap.ts:39` | XS |
| 11 | **High** | **Strengthen the Organization entity.** Today `sameAs` is LinkedIn only. Add `legalName`, `foundingDate`, `address`, `founder`/`employee` people, and wider `sameAs` links. Remove the invalid `inLanguage`. Give news articles a named person author with a byline. The brand name collides with Arxada, a Seoul firm called Arxia, and ARX, and old directory profiles still describe Arxia as a TYPO3 agency. | `layout.tsx` schema, `news/[slug]/page.tsx:68` | S |
| 12 | **P2** | **Fix the small navigation breaks.** `/portfolio` has no `<main id="main">`, so the skip link goes nowhere. The skip link text is hard-coded English. "News" is never shown as active (`Navbar.tsx:78`). The Ukraine article links to `/process`, which redirects (`news.ts:685`). "View Full Portfolio" nests a `<button>` inside an `<a>`. Domain-page "Contact Us" loses which domain the visitor came from. | various | S |

Effort: XS = under 1 h, S = half a day, M = 1–2 days.

---

## 3. Findings by theme

### A. Domain and indexation (Critical)
- **Dead canonical domain** (verified). `/interoperability` declares `<link rel="canonical" href="https://www.arxia.com/interoperability">`, and that URL returns 404. robots.txt on arxia.global says `Host: https://www.arxia.com` and `Sitemap: https://www.arxia.com/sitemap.xml`; that sitemap also returns 404. The real sitemap on arxia.global lists 95 URLs, all on the dead host. The likely result is that Google treats your new pages as duplicates pointing at missing pages and indexes almost nothing from arxia.global. Brand searches currently surface only legacy arxia.com pages.
- **The legacy site still defines the brand.** Old `.html` pages return 200 and rank. `www.new.arxia.com` is indexable. arxia.com still serves the TYPO3 robots.txt.
- **What already works:** every page is SSR'd in all three locales, including for a Googlebot request. There are no Accept-Language or cookie redirects that hide locales. Unknown URLs return a real 404 with noindex in every locale. http→https, apex→www and trailing slashes each take a single permanent hop. All 123 crawled URLs return 200 and there are 0 broken internal links. The sitemap contains no unbuilt or stub pages.
- **Minor:** uppercase URL variants return 200 instead of redirecting. `/en` redirects with a 307 instead of a 308. HSTS lacks `includeSubDomains`/`preload`. There is no CSP header.

### B. Mobile and accessibility
- **P0: mobile menu collapse** (see action #3). The menu does manage focus and close on Escape correctly; only its layout is broken.
- **Touch targets under 44 px** (measured at 375 px): hero CTA 113×34, menu button 40×40, mobile menu links 20 px tall, language switch 14 px, footer links 20–27 px.
- **Contrast:** see action #6. These hit every section annotation, every footer heading, every red button and the portfolio filters.
- **Headings:** every page has exactly one H1 and the correct `lang`, but `/news` jumps from H1 to H3.
- **Reduced motion is a strength.** The global 0.01 ms rule is paired with explicit end states (`globals.css:740-800`), so nothing stays hidden. Content is readable without JS. The one gap: the cobe WebGL globe keeps rendering every frame off-screen, even with reduced motion on.

### C. Trust, credibility and E-E-A-T
- **Experience is strong.** There are 44 portfolio projects, each with donor, lead firm, country and year (e.g. "GIZ (consortium led by GOPA)"), a refugee-services case study with video, and 20 dated first-hand news reports.
- **Expertise and authority are weak.** There's no About/Team page, no named authors, and no visible credentials. The CEO's GovStack working-group and CEN standards roles appear only on other sites. The case study has no outcome metrics, and "Recognised at EU level" is unsourced.
- **Trust signals are missing or contradictory.** See actions #4 and #5. A World Bank procurement officer cannot verify the entity from the site.

### D. First impression and design consistency (impeccable critique)
- **Design-specificity verdict: the interior is authored, the front door is generic.**
  - Authored: the domain plate (`DomainsGrid.tsx:14-52`, a 2×2 Interoperability anchor with an isometric L01–L03 stack), the EIF layers on `/interoperability`, "FIG. 00", the "What happens next" contact copy, and the 404 line "off the blueprint".
  - Category-interchangeable: a centred-slogan hero with inert chips, an unlabelled logo marquee, two big-number stat rows, and a uniform news card grid.
- **The primary button has no single look:** red fill in the hero, red with a glow on the contact submit (`CallToAction.tsx:292`), and navy on near-black on domain pages (`DomainCTA.tsx:40`, `Button.tsx:24`), where it nearly disappears.
- **Red is overloaded.** It does duty as signature mark, CTA, accent line and glow, which makes the brief's 8% budget hard to hold.
- **Cognitive load:**
  - 7 domain plates vs 8 portfolio categories with different names.
  - 26 countries in 7 groups on Global Presence.
  - Two numbering systems on `/interoperability` (layers L03–L01, offers 02.x–04.x).
  - Pages run about 10,200 px (home) and about 16,300 px (`/portfolio`) on mobile.
- **Reading:** article measure is about 88 characters (a 780 px column, `news/[slug]/page.tsx:100`), above the brief's 720 px. Cover images are upscaled from 649 to 780 px.

### E. Performance (provisional: the PageSpeed API quota was exhausted, so there's no field or lab CWV)
- Homepage JS is **297 KB gzipped**, about twice the brief's 150 KB budget. Contributors:
  - GSAP and ScrollTrigger (about 48 KB gz), loaded only to read scroll velocity for the marquee. The ScrollTrigger instance is never killed, so each home visit adds another.
  - ES and FR message bundles shipped inside the EN homepage bundle.
  - A broad `"use client"` surface.
- The hero H1 starts at `opacity:0` and waits for hydration, which hurts LCP.
- Images are fine: all 612 are WebP via next/image with sizes set and lazy-loaded, and 0 are missing alt text.

### F. On-page metadata
- News `<title>`s run 84–149 characters and descriptions 189–298 (targets are about 60 and about 155).
- Service-page titles are 18–23 characters and thin. "e-Procurement", "e-Invoicing" and "e-Services" are the same in all three languages, but buyers search "contratación pública electrónica" or "marchés publics électroniques".
- The homepage H1, "Technology to transform nations", has no "who we are" paragraph near it. Search engines and AI engines get no entity definition above the fold.

### G. Internationalisation
- **Message files are complete:** 260 keys in each of en, es and fr, and the body copy is genuinely translated.
- **English leaks into /es and /fr:**
  - The skip link (`layout.tsx:158`) and "Domains" (`PortfolioSideNav.tsx:74`) are hard-coded English.
  - Portfolio client and country fields aren't translated.
  - Contact form errors come straight from the API in English.
  - The ES and FR legal pages are English text under `lang="es"`/`"fr"`.
- Spanish copy mixes informal *tú* and formal *usted*. B2G copy should use *usted*.

### H. Contact form and security
- **Good:** inputs are escaped, length-capped and protected by a honeypot.
- **Gaps:**
  - The rate limit lives in per-instance memory, so it doesn't hold across Vercel instances.
  - There's no browser-side validation (`noValidate`), and errors aren't tied to fields.
  - The error "Email delivery is not configured." reveals server state to visitors.
  - The honeypot field is labelled "Website", and the server reports success when it's filled. An autofill tool or an AI agent filling the form for a real person could trip it, and the enquiry would vanish without an error. Rename it to something nobody would fill in.
- No CSP header.

### I. AI search and agent readiness (GEO)
- robots.txt doesn't distinguish AI *training* bots (GPTBot, Google-Extended, CCBot) from AI *search* bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot). Which to allow is a policy decision for you.
- There's no `/llms.txt`. It's optional and Google ignores it, but it's cheap to add.
- Citability is limited: there are few self-contained factual passages with sources, and 13 of 20 news articles have no outbound citations and no link to the related portfolio project.
- The semantic HTML is good for agents: clean landmarks except on `/portfolio`, labelled form fields. Whole-card links do produce very long accessible names.

### Deterministic detector (impeccable rules applied manually; the binary was not executed)
- **No hard failures in shipped code.**
  - The single bounce easing is a deliberate overshoot.
  - The layout-transition and gradient-text hits are in unused CSS or components. They could be deleted as dead code.
- **Brief-sanctioned, not defects:** the blueprint grid background, Inter, the mono annotations, the 3 px red accents and the logo marquee.
- **Real but minor:**
  - One "world-class" (`news.ts:344`).
  - Em-dash density in `portfolio-domains.ts`.
  - The red glow behind the contact form.
  - A 2 px red error stripe.

---

## 4. What's working (keep and replicate)
1. **`/interoperability` is the template to copy.** It has a domain-specific figure, offers grouped by a real model (EIF layers), "How we engage", filtered featured cases, related domains, Service schema and about 700 unique words.
2. **The domain plate on the homepage** is the most Arxia-specific idea on the site.
3. **The copy voice is plain and specific** ("we'll tell you straight"), with funder and lead-firm attribution on every case.
4. **The engineering is solid:** full SSR in three locales, real 404s, clean redirects, one H1 per page, complete message files, WebP images with alt text, a mobile menu with focus management, and reduced motion that resolves to end states instead of hiding content.

---

## 5. Playbook for the upcoming service pages
Use this as acceptance criteria when building the next phases.

**Do**
- Start from the `/interoperability` structure: a domain figure, a real model, "How we engage", featured cases filtered to the domain, related domains, and Service plus BreadcrumbList schema.
- Put **one verifiable proof point** (funder or client, country, year) in each hero, pulled from the shared `company-facts.ts` and `portfolio.ts`. Never hard-code numbers.
- Target the buyer's query in the `<title>` (50–60 chars) and the H1, with locale-native terms in ES and FR. Write a 140–155-character description per locale.
- Aim for at least 600 words of copy unique to the page. Keep shared boilerplate under about 30%.
- Include `<main id="main">`, strict H1→H2→H3 order, long-form text no wider than 720 px, touch targets of at least 44 px, and the fixed red tokens.
- Generate per-page OG images and metadata through the shared helper, with canonical and hreflang from the single `SITE_URL`.
- Have the "Contact" CTA carry the domain, e.g. `/#contact?topic=e-procurement`, to pre-fill the form.
- Link each service page to its portfolio cases and news, and each case back to its service.

**Don't**
- Use red-filled buttons, glows, or headlines that start hidden and wait for JS.
- Use big-number stat rows without a source, code-comment style labels (`// PORTFOLIO`), truncated headlines, or hard-coded English strings.
- Ship thin template pages to the sitemap. Keep a page `noindex` and out of `sitemap.ts` until its content is final.

---

## 6. Decisions only you can make
1. **Canonical domain:** arxia.global or arxia.com? Either works. Pick one, and the other gets a path-preserving 301. arxia.com carries 20+ years of backlinks, which argues for it if it's technically feasible.
2. **AI crawler policy:** allow AI search bots but block training bots, allow all, or block all?
3. **Where red belongs:** signature mark *or* CTA? The critique recommends red as mark only, with the CTA in the white or outline system on dark.
4. **A DPI pillar page:** "Digital public infrastructure consultancy" search results are definition-led service pages. Building one means un-redirecting `/digital-transformation` (it currently goes to the homepage).
5. **Correct the brief:** update the contrast table and red usage rules in `CLAUDE.md` so future pages don't repeat the colour failures.

---

## 7. Suggested fix phases
| Phase | Contents | Expected outcome |
|---|---|---|
| **1. Hotfix** (≈1 day) | Actions #1, #2 (once the domain is decided), #3, #10, and the `/process` link | Site becomes indexable; mobile nav works |
| **2. Trust and accessibility** (≈2–3 days) | #4, #5, #6, #8, #12, i18n leaks, form hardening | Passes WCAG AA on core pages; procurement officers can verify the entity |
| **3. First impression and performance** (≈3–5 days) | #7 hero redesign (`impeccable shape` → `bolder`), GSAP removal or lazy loading, globe render gating, per-locale message splitting, consistent button system (`polish`) | LCP under 2.5 s; critique 26+/32 |
| **4. Authority and content** (ongoing) | #9, #11, About/Team page, case studies with outcome metrics, ProcessPlayer product page, X-Road/GovStack sub-pages, bylined method articles, native ES landing pages for LatAm | E-E-A-T and AI-search scores up; brand entity disambiguated |

---

## 8. Limits of this audit
- **Not run:** the impeccable detector binary (its rules were applied manually from source instead) and the claude-seo Python scripts.
- **No Core Web Vitals data:** the PageSpeed Insights API refused requests (daily quota exceeded), so performance is judged from payload size and code.
- **Not verified:** Google/Bing index status (no Search Console access), backlinks to old TYPO3 URLs, whether Vercel preview URLs are protected from indexing, and that the live deployment matches `bfb5017` exactly.
- **This worktree's branch** (`claude/webpage-audit-report-c7c955`) is based on an archived pre-i18n snapshot (`bf0b914`), not `main`. The audit used `origin/main` and the live site. Fixes should be made on a branch cut from `main`.

## Appendix: detailed reports
- [findings/impeccable-audit.md](findings/impeccable-audit.md): technical audit with the full detector rule table (31 findings)
- [findings/impeccable-critique.md](findings/impeccable-critique.md): design critique, personas, cognitive load
- [findings/seo-technical.md](findings/seo-technical.md): crawl of 123 URLs, schema, hreflang, sitemap, performance
- [findings/seo-content-geo.md](findings/seo-content-geo.md): E-E-A-T, content, AI search, content-to-create list
- [evidence/mobile-menu-collapsed-375px.jpg](evidence/mobile-menu-collapsed-375px.jpg): live P0 reproduction
