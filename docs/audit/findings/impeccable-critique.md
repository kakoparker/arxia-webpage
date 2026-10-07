# Impeccable critique — Assessment A (Design Review): arxia.global

Method: Assessment A only (design review sub-agent). The detector (Assessment B) was deliberately not run here; it runs separately.
Target: https://www.arxia.global (EN). Source: `C:/Users/carlo/AppData/Local/Temp/aud/main` (origin/main snapshot).
Modes: Persuade for `/` and the domain pages, Read for `/news/[slug]`, Experience for `/portfolio`.
Engine/viewports: Claude Browser pane (Chromium), emulated **desktop 1440x900** and **mobile preset 375x812** (touch, `hover:none`). The capture tool cropped mobile screenshots, so every mobile finding below comes from DOM measurements (`getBoundingClientRect`, computed styles), not from pictures. Desktop visual findings come from screenshots at 1440x900.
Scope: built pages only, per the user's update. Unbuilt or thin service sections are not penalized. Every internal link on `/`, `/interoperability`, `/portfolio` and `/news` was fetched: 34 unique links, **0 non-200**. No visitor-facing broken links found.
Pages covered: `/`, `/interoperability` (bespoke), `/e-procurement` (generic DomainPageView), `/portfolio`, `/news`, `/news/arxia-uganda-digital-public-services-kampala`, 404 (`/this-page-does-not-exist`). The contact form was never submitted.

---

## Design Specificity Verdict

**Split: the interior is authored, the front door is interchangeable.**

Authored for Arxia (no other company could use these unchanged):
- The domain plate on the home page (`src/components/sections/DomainsGrid.tsx:14-52`). Interoperability is a 2x2 Blueprint Blue anchor holding an exploded isometric L01/L02/L03 stack, with a red spine that drops through it. Six satellite plates sit around it. "Full-stack" is drawn as a literal stack. This is the strongest piece of the site.
- `/interoperability`: EIF-aligned three-layer model (Organizational/Legal, Semantic, Technical), `FIG. 00 · THE INTEROPERABILITY STACK · EIF-ALIGNED`, X-Road/Pub-Sub named, "no locked-in core", and an Assess/Design/Build/Sustain engagement map tagged per layer. The blueprint-paper isometric illustrations on the domain pages also belong to this world.
- The contact section's "What happens next" sequence and its voice ("we'll tell you straight whether we're the right partner for it"). The 404 line "This page is off the blueprint."

Category-interchangeable (any govtech or IT consultancy could ship these):
- **The hero** (`src/components/sections/Hero.tsx:93-149`): a centred bold headline ("Technology to transform nations"), three non-interactive mono chips, and a small red button on a dark grid. This is the stock "headline over subcopy and a button" pattern the Persuade rules call out. Nothing in the first viewport shows what only Arxia can prove: the stack, the 26 countries, or the World Bank/GIZ track record.
- An unlabeled grayscale logo marquee, a "100+ / 20+ / 25+" stat triad (`GlobalPresence.tsx:46,146-147`) repeated as "44 / 20+ / 8" on `/portfolio` (`PortfolioPageClient.tsx:126-128`), a uniform 3-column news card grid, and portfolio category blurbs carried over from the old generic copy ("connective tissue between systems", "seamless data exchange").

Net: the brief's world (blueprint grid, sharp corners, Inter + JetBrains Mono, registration marks, red accent lines) is applied consistently, which is a real achievement. But that world carries the page's structure only from section 3 onward. A minister who reads only the first viewport sees a generic vendor.

---

## Design Health Score (Nielsen)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | The form has pending/success/error states (`CallToAction.tsx:10-13,192`), domain pages have breadcrumbs, and the home page has a scroll rail. But "News" never shows as active: the nav compares `pathname === "/#news"` (`Navbar.tsx:78`, `navigation.ts:9`), so `/news` has no current-location cue. |
| 2 | Match System / Real World | 3 | Buyer vocabulary is right: GovStack, X-Road, EIF layers, funder/client attribution. But home and `/portfolio` use two different taxonomies (7 practices vs 8 differently named categories), and "Agentic state" goes undefined until you hover its plate. |
| 3 | User Control and Freedom | 3 | The 404 offers 3 ways out, articles have "← All news", portfolio filters are reversible, and scroll-snap is `proximity` and turns off under reduced motion (`globals.css:114-125`). The logo marquee has no pause control. |
| 4 | Consistency and Standards | 2 | The primary CTA is red in the hero and the form, but Blueprint Blue on Blueprint Dark (nearly invisible) on domain pages. The hero h1 is bold while the 404 h1 is light. Nav mixes page links and anchors. Dates appear as "OCTOBER 2026" and "SEPTEMBER 24, 2026". One project has two titles. `/portfolio` uses `// ` code-comment annotations that no other page uses. |
| 5 | Error Prevention | 2 | The form is `noValidate` (`CallToAction.tsx:214`) with no client-side checks. You only learn about one error at a time, after a server round trip. |
| 6 | Recognition Rather Than Recall | 3 | Domain plates show names at rest. But to move between domain pages you must go back home or to the footer (the nav has only a "Domains" anchor), and plate descriptions appear only on hover on desktop. |
| 7 | Flexibility and Efficiency | n/a | Persuade/Experience surface. There is no repeat-use task to accelerate. |
| 8 | Aesthetic and Minimalist Design | 3 | Coherent and restrained, with the grid and type system held tightly. Points off for the stock hero, two hero-metric triads, red spread across fills, a glow, dots and a step box, and decorative blur glows in the hero (`Hero.tsx:68-90`). |
| 9 | Error Recovery | 3 | The 404 is plain-language and on-brand. Form errors use `role="alert"`. But server messages are hardcoded English and shown verbatim on /es and /fr, and one leaks ops state: "Email delivery is not configured." (`api/contact/route.ts:88`). |
| 10 | Help and Documentation | n/a | Marketing surface. "What happens next" covers the one place help is needed. |
| **Total** | | **22/32 (69%)** | **Acceptable, one point short of Good.** n/a: H7, H10. Applicable max is 32. |

---

## Cognitive Load

Checklist: 3 of 8 fail, so load is **moderate**.
- **Fail, minimal choices:** several decision points show more than 4 options (listed below).
- **Fail, working memory:** home teaches 7 practices (Interoperability, Data governance, e-Procurement, e-Invoicing, Government web portals, Agentic state, e-Services). `/portfolio` then files 44 projects under 8 different categories (Digital Government, Interoperability and Standardization, Public Procurement, Web Development, Artificial Intelligence, Electronic Invoicing, Data Governance, Business Strategy & Consulting) and states "8 DOMAINS" (`PortfolioPageClient.tsx:128`). The visitor has to map "Agentic state" and "e-Services" onto "Artificial Intelligence" from memory.
- **Fail, chunking:** Global Presence lists 26 countries across 7 region groups beside a globe with about 26 red dots. It works as a wall of evidence but not as a chunk.
- Passes: single focus per section (snap sections), visual hierarchy, grouping, progressive disclosure (plate hover reveal, open by default on touch through `@media (hover:none)`, `globals.css:383-390`), one thing at a time.

Decision points with more than 4 visible options:
| Where | Options | Note |
|---|---|---|
| Home domain plate (`#expertise`) | 7 | Mitigated by the 1+6 anchor hierarchy. This is the right way to show 7. |
| `/portfolio` side nav / mobile chip row | 8 categories + 44 cards | The counts help. Contrast hurts (see minor observations). |
| Footer "Services" | 7 | Acceptable in a footer. |
| `/news` index | ~20 equal cards | No lead story, no grouping by year or theme. Every card has the same weight. |
| `/interoperability` | 3 layers x 4 offers + 4 engagement phases + 4 sectors + 3 cases + 3 related | Dense, but chunked by layer. It also runs two numbering systems in parallel: layers L03/L02/L01, offers 02.x/03.x/04.x. |

---

## Emotional Journey (government buyer)

- **Opening (valley).** On load the hero h1 sits at `opacity:0` until hydration plus an IntersectionObserver add `.visible` (`Hero.tsx:97-100`, `globals.css:268-278`). On mobile, 3 s after reload, the headline was still fading in over an empty dark grid. When it lands, it is a generic slogan. The first emotion is "wait", then "seen this before".
- **First lift.** The logo band (UN, World Bank, OPCW, ITC...) is reassurance, but it has no label to say what the logos mean (clients? funders? partners?). Commercial brands (Audi, Falabella, Philips) sit beside multilaterals with no context.
- **Peak.** The domain plate with the assembling iso stack, then the refugee case study with video and outcome metrics ("1 account, reused across agencies"). This is where a CTO leans in. On `/interoperability` the peak is sustained.
- **Valley (trust).** A procurement reader looking for "who is the legal entity, where are they registered, what's the email?" finds none of it. The footer offers LinkedIn profiles and "Get in touch via the contact form" (`Footer.tsx:45-49`). Years of experience read 25+ on home and "two decades" on portfolio.
- **End (strong but single-channel).** The contact section is the best-written moment on the site: three steps, "goes straight to our leadership team, not a ticket queue". The peak-end rule favours it. But the form is the only exit, so a buyer whose institution blocks web forms, or who needs a formal email trail, ends on a wall.

High-stakes reassurance missing at the moment of contact: no direct email, no response-time commitment, no data-handling link beside the form (only "No mailing lists"; Privacy Policy is in the footer).

---

## What's Working

1. **The domain plate and the interoperability page are a real visual argument, not decoration.** Interoperability is literally the anchor the six other practices route through, and the EIF-layer model carries from the home plate (`DomainsGrid.tsx`, `IsoStack.tsx`) into `/interoperability` with consistent L01-L03 labels and FIG. annotations. It makes Arxia's thesis ("the technical layer is the easy part") visible.
2. **The copy voice is specific and plain where it matters.** "The technical layer is the easy part; we cover the rest too", "Send us the problem and we'll tell you straight", "This page is off the blueprint." It avoids AI-consultancy buzzwords, and funder/prime attributions ("GIZ (consortium led by GOPA)") are honest, which procurement readers value.
3. **Motion and access fallbacks are engineered deliberately.** The reduced-motion block resolves every reveal layer to its finished state (`globals.css:740-800`). A `<noscript>` style makes scroll-reveal content visible without JS (`[locale]/layout.tsx:133-135`). Touch devices get plate descriptions open by default. The mobile menu traps focus and closes on Escape (`Navbar.tsx:18-54`). GSAP/rAF hooks check `prefers-reduced-motion` (`useAnimationFrame.ts:13`, `useGsapScrollTrigger.ts:45`).

---

## Priority Issues

### [P1] Credibility claims contradict each other across pages
- **What:** The verifiable numbers and facts disagree:
  - "25+ years" (`GlobalPresence.tsx:46`) vs "Two decades of digital government work" (`messages/en.json:44,46`, `/portfolio` hero) vs the brief's "more than 20 years".
  - The procurement product is "50+ organizations, 30,000+ references" on `/e-procurement` (`src/data/domain-pages.ts:345`), while the Arxia-owned e-procurement platform is "Implemented by over 100 public institutions" on `/portfolio` (`src/data/portfolio.ts:262`). If these are the same product, the numbers conflict.
  - Tunisia is listed under "West Africa" (`GlobalPresence.tsx:30`; it is North Africa).
  - "7 practices" on home vs "8 DOMAINS" with different names on `/portfolio` (`PortfolioPageClient.tsx:128`).
  - The flagship case is "Interoperable Refugee Services" in one place and "Interoperability Framework for Ukrainian Refugees Support – Romania" in another.
- **Where:** `/` (Global Presence), `/portfolio` hero, `/e-procurement` Products.
- **Why it matters:** Arxia's buyers (World Bank, GIZ, EU evaluators) cross-check claims for a living. One inconsistency is enough to discount the rest. A geography error on a "global presence" map undermines a firm selling to African governments.
- **Fix:** Create one source file for corporate facts (years, org count, countries, product stats) and import it everywhere. Reconcile the ProcessPlayer numbers. Move Tunisia into a "North Africa" group. Either align the portfolio categories to the 7 practices or label them "project categories" and drop the "8 DOMAINS" stat. Use one canonical title per case.
- **Suggested command:** `clarify`

### [P1] The hero is the category template, drifts from the brief, and first-paints empty
- **What:**
  - The headline is a generic slogan: centred, bold, over three plain `<li>` chips that look like buttons but do nothing, plus an undersized red CTA.
  - It drifts from the pinned brief. The brief says hero Inter **300**; the code uses `font-bold` (`Hero.tsx:100`). The brief says red is never for buttons and buttons are at least 48px tall; the CTA is forced to `!bg-accent-red !min-h-0 !py-1.5 !text-[13px]` (`Hero.tsx:144`), which measures 113x34 on mobile. The 404 h1 follows the brief (`not-found.tsx:35` `font-light`), so the inconsistency is visible.
  - The h1 is wrapped in `animate-on-scroll` (`Hero.tsx:97-100`), so the LCP element is invisible until JS runs.
- **Where:** `/`, first viewport, desktop and mobile.
- **Why it matters:** The Persuade rule requires the opening to make the offer intelligible and to show something only this product can prove. Right now that proof (the stack, the 26 countries, the multilateral clients) starts in viewport 2 or 3. The invisible-until-JS h1 also risks LCP on the slow connections common in Arxia's markets.
- **Fix:**
  - Rewrite the headline around the actual offer (building blocks of digital public infrastructure, co-built with national teams).
  - Bring a piece of the domain-plate world into the hero: the iso stack, or a one-line proof row naming funders and the country count.
  - Make the chips real links to the three pillars, or style them unmistakably as labels.
  - Set the h1 to Inter 300 per the brief, render it visible by default, and animate only secondary elements.
  - Use a full-size (at least 48px) dark-surface primary button that isn't red.
- **Suggested command:** `shape` (then `bolder`)

### [P1] No verifiable entity or direct contact channel for institutional buyers
- **What:** The site has no email address, phone, legal entity name, registration or VAT number, or postal address. The footer has city names, LinkedIn profiles and "Get in touch via the contact form" (`src/components/layout/Footer.tsx:45-49,180`). The only way to reach Arxia is the form.
- **Where:** Every page footer; `/#contact`.
- **Why it matters:** Procurement and due-diligence officers need a named legal entity and a formal channel to log in a vendor register. Some government networks block third-party forms. The best-written moment on the site (the contact section) ends in a single point of failure.
- **Fix:** Add the legal entity, registered address (Cluj-Napoca), company registration number and a monitored mailbox in the footer, plus "or email us at ..." under the form. Next to the form, add a response-time line and a link to the privacy policy.
- **Suggested command:** `clarify`

### [P2] Primary action has no single visual definition; red spills into fills
- **What:**
  - Home hero CTA: red fill (`Hero.tsx:144`).
  - Contact submit: red fill plus a red glow `shadow-[0_8px_28px_rgba(237,28,36,0.3)]` (`CallToAction.tsx:292`). The success icon and the active step box are also red fills (`CallToAction.tsx:134,193`).
  - Domain-page CTA: the default primary (`Button.tsx:24`, Blueprint Blue #162036) on a Blueprint Dark section (#0D1520) (`DomainCTA.tsx:40`). The button barely separates from its background.
- **Where:** `/`, `/#contact`, every domain page's "Ready to discuss..." section.
- **Why it matters:** The brief caps red at 8% and bans it for buttons. More practically, visitors can't learn what "the action" looks like when it is red in one place and invisible-navy in another, and the brief's own primary variant fails on dark surfaces. That is probably why someone overrode it to red.
- **Fix:** Add a `dark` primary variant to `Button.tsx` (white fill with Blueprint Blue text, or blue with a 1px white/30 border, at least 48px, sharp corners) and use it in the hero, the contact submit and DomainCTA. Remove the red glow. Keep red for accent lines, nodes and active markers.
- **Suggested command:** `polish` (colour-system pass, `colorize` if re-balancing red)

### [P2] Navigation IA is inconsistent, and the skip link is dead on /portfolio
- **What:**
  - "News" points to `/#news`, a home-page anchor, while "Portfolio" points to a page (`src/data/navigation.ts:7-10`). From `/news` the nav therefore never shows "News" as current (`Navbar.tsx:78`).
  - "Domains" is only an anchor, so there is no way to switch between the 7 domain pages from the top bar.
  - `/portfolio` renders no `<main id="main">` (`PortfolioPageClient.tsx:71-75`; every other route has one). The global "Skip to content" link (`[locale]/layout.tsx:154-159`) points nowhere there, and the page has no main landmark. The skip-link text is also hardcoded English.
- **Where:** Top nav on all pages; `/portfolio`.
- **Why it matters:** A CTO comparing interoperability and data governance has to go back home each time. Keyboard and screen-reader users lose the landmark on the page that carries the most evidence.
- **Fix:**
  - Point "News" to `/news` and mark the active link with `pathname.startsWith`.
  - Turn "Domains" into a disclosure listing the 7 pages (the footer already has the list), keeping `/#expertise` as an "overview" entry.
  - Wrap the portfolio content in `<main id="main" tabIndex={-1}>` and localize the skip link.
- **Suggested command:** `layout` (IA), `harden` (landmark and i18n)

### [P2] The contact form validates only on the server, in English
- **What:**
  - The form is `noValidate` (`CallToAction.tsx:214`) with no client checks.
  - The API returns English strings (`src/app/api/contact/route.ts:88-144`), which the UI shows verbatim (`json.error ?? t("errorGeneric")`, `CallToAction.tsx:68`), so /es and /fr visitors get English errors.
  - Errors are not tied to fields (no `aria-invalid` or `aria-describedby`), and only one is reported per round trip.
  - "Email delivery is not configured." exposes server state to buyers.
- **Where:** `/#contact` (all locales).
- **Why it matters:** This is the site's single conversion point. A Latin American ministry visitor on /es who mistypes an email gets an English message after a network round trip.
- **Fix:**
  - Validate required fields and email format client-side, with per-field messages linked through `aria-describedby`.
  - Have the API return error codes (`name_required`, `email_invalid`, `rate_limited`, `unavailable`) that the client maps to `t()` keys.
  - Replace the "not configured" message with a generic "temporarily unavailable, email us at ..." (this ties into the P1 contact-channel fix).
- **Suggested command:** `harden`

---

## Persona Red Flags

**Government CTO evaluating a vendor ("Dr. Okello", ministry ICT director, desktop, technical, sceptical of lock-in)**
- Home domain plates show only number, icon and name at rest on desktop. "Agentic state" and "e-Services" mean nothing until hovered (`globals.css:357-366`).
- On `/interoperability`, the content is exactly right (EIF layers, X-Road, "no locked-in core"). But to compare with `/data-governance` she has to use "Related domains" or go home, because the nav has no domain list (`navigation.ts:7`).
- "Contact Us" on a domain page (`DomainCTA.tsx:40`) sends her to the home page form with no record of which domain she came from. She has to restate the context.
- The two numbering systems on `/interoperability` (layers L03/L02/L01 vs offers 02.1-04.4) cost a re-read.

**World Bank / GIZ procurement officer verifying credentials ("Mariana", desktop, checklist-driven)**
- Experience reads 25+ years on home and "two decades" on `/portfolio`. Procurement platform numbers disagree between `/e-procurement` and `/portfolio`. Tunisia sits under West Africa.
- She finds no legal entity, registration number, address or email anywhere. The footer offers LinkedIn profiles only.
- The logo band has no label saying whether these are clients, funders or partners, and it mixes multilaterals with Audi/Falabella/Philips. Screen readers hear every logo twice because the duplicated marquee set isn't `aria-hidden` (`LogoCarousel.tsx:7`), and the region's `aria-label` is English-only (`LogoCarouselTrack.tsx:89`).
- Positive: `/portfolio` names funder and prime on every project ("GIZ (consortium led by GOPA)"). This is exactly what she needs. Keep it.

**Casey, distracted first-time mobile visitor (375x812, touch; measured in DOM)**
- The first 3 s after load show an empty dark grid while the h1 fades in.
- Undersized touch targets:
  - Hero CTA 113x34.
  - Hamburger 40x40.
  - Mobile menu links 20px tall; locale switch EN/ES/FR 14px tall.
  - Home "View Full Portfolio →" 228x20.
  - Footer links 20-27px tall.
  - The brief requires at least 44x44.
- The home page is about 10,200px tall on mobile (every section is `min-h-svh` inside a snap wrapper). `/portfolio` is about 16,300px with 44 cards. The category chips help, but there is no "back to top" and no sticky filter.
- Contact is at the very bottom of a 10k-px page. The only shortcut is the 34px-tall hero button.

---

## Minor Observations

- **Article measure (Read mode):** the body column is 780px (`news/[slug]/page.tsx:100`), measured at about 88 characters per line at 17px. The brief caps measure at 640/720px, and the craft floor at 65-75ch. The cover image is upscaled from 649px natural to 780px rendered, so it is soft.
- **`/portfolio` side nav:** 12px Gray Medium (#A0AEC0) on white, about 2.2:1 contrast (`PortfolioSideNav.tsx:83-93`). The brief itself bans Gray Medium for small text. The "Domains" label is hardcoded English (`:75`), there is no `aria-current`/`aria-pressed`, and the `<nav>` is unlabeled.
- **Heading levels:** the `/news` index jumps from h1 to h3. `/portfolio` uses a mono uppercase annotation as an h2 ("FEATURED PROJECTS", `PortfolioPageClient.tsx:157`).
- **Truncated headlines and case copy:** home news headlines and summaries are `line-clamp-2` (`News.tsx:50,53`), cutting headlines mid-phrase. The home featured case body is also truncated ("One account, reused...").
- **Date formats are mixed:** "OCTOBER 2026" vs "SEPTEMBER 24, 2026" (`src/data/news.ts`). Pick one, or show "month year" whenever the day is unknown.
- **Code-comment annotations:** `// PORTFOLIO` and `// 01` appear on `/portfolio` (`PortfolioSection.tsx:35`). This is mono as costume and differs from the annotation style everywhere else.
- **Casing:** the template "Ready to discuss {title}?" (`en.json:239`) produces "Ready to discuss Full-stack interoperability?"
- **404 tab title:** observed flipping from "Page not found — Arxia" to the site default title after hydration (`not-found.tsx:8-9` vs layout metadata).
- **Logo marquee:** it moves continuously with no pause or stop control (WCAG 2.2.2). Logos are grayscale at 60% opacity (`LogoCarousel.tsx:27`), and hover-to-colour gives no feedback on touch.
- **Scroll rail:** visible from `lg` (1024px) up (`ScrollProgressRail.tsx:94`). Its active label sits to the left of the dots and nearly touched the portfolio cards at 1440. Between 1024 and 1280 it likely overlaps content. Hide labels below xl.
- **Hero-metric template:** "100+ / 20+ / 25+" and "44 / 20+ / 8" are the stock big-number triad. The brief's metric component is the stacked Blueprint Blue card, which neither uses.
- **Decorative blur glows** in the hero (`Hero.tsx:68-90`, `blur-[120px]` circles at 3-35% opacity) are effectively invisible and cost paint.
- **Instant jumps:** in the browser pane, jumping with an instant `scrollTo` to `#portfolio`/`#news` left those sections blank for over 4 s until a real wheel scroll fired. This may be a pane artifact, but verify the `/#news` and `/#contact` nav jumps in Safari and Firefox, since both depend on the 0.15-threshold IntersectionObserver (`useScrollAnimation.ts:15-31`).
- **Reduced motion (from code):** handled well in CSS and in the JS hooks. One gap: the `.animate-on-scroll` stagger still waits on JS to add `.visible`. That is fine under reduced motion, because the CSS forces `opacity:1`.

---

## Recommendations for upcoming pages

Patterns to follow (taken from the built pages that work):
- Use `/interoperability` as the template, not the generic `DomainPageView`: a product-specific figure in the hero, offers grouped by a real model of the domain, "How we engage" mapped to that model, featured cases linked with `/portfolio?domain=<slug>#projects`, and related domains.
- Put one piece of verifiable proof (funder or client, country, year) in each domain hero, so the first viewport shows something only Arxia can prove.
- Keep funder and prime attribution on every case card. It is a trust asset.
- Wrap content in `<main id="main" tabIndex={-1}>`, use one h1 and an h2 per section, and never skip heading levels.
- Long-form body text should stay at or under 720px (65-75ch).

Patterns to avoid (seen on built pages):
- No red-filled buttons and no glows. Use the single dark-surface primary variant (P2 above) on every dark CTA band.
- No headline inside `animate-on-scroll`. The h1 must be visible at first paint.
- No numbers typed inline in page data. Import years, counts and product stats from one corporate-facts file, and use the same 7-practice slug list for home plates, portfolio categories and the footer.
- No `// ` annotations, no big-number triads, no `line-clamp` on headlines, and no hardcoded English strings (skip link, aria-labels, side-nav labels, API errors).
- No CTA that drops context. Pass the domain to the contact form (for example `/?topic=e-procurement#contact`, prefilled into the comment field).
- Touch targets must be at least 44px, including footer and mobile-menu links.

---

## Questions to Consider

1. What if the hero *were* the building-blocks plate? The first thing a minister sees would be the stack Arxia co-builds, with the slogan demoted to a caption.
2. If a World Bank officer gave this site 90 seconds, which three verifiable facts should they leave with? Are those three facts on one screen, and do they agree with every other page?
3. Is red Arxia's signature mark (accent lines, nodes, the spine through the stack) or its call to act? It can't be both and stay under 8%. Which one does the brand need more?
