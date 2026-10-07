# Arxia (www.arxia.global): Content, E-E-A-T and AI-Search Readiness Audit

Methodology: claude-seo v2.4.2 (`seo-audit`, `seo-content`, `seo-geo`, `seo-agentic`, `seo-sxo`, `seo-cluster`, `seo-plan`; E-E-A-T framework and scoring guide; quality gates; 10-principle thinking framework).
Audit date: 2026-10-06. Mode: read-only. Pages were fetched with curl and the tags stripped using a small local parser. Source checked against the snapshot `aud/main` (origin/main).
Business type: B2G professional services (DPI and govtech consultancy). Not local, not e-commerce.
Scores are claude-seo heuristics, not Google-internal signals.

## Scope (per user instruction)

Only built pages are scored. Missing pages (About/Team, case-study detail pages for 43 of the 44 portfolio projects, a ProcessPlayer product page, any DPI pillar page) are **not findings and carry no deductions**. They appear under "Recommendations for upcoming pages" and "Content to create".

**Assumption to confirm.** `/interoperability` is treated as the finished reference vertical. The other six vertical pages (`/e-procurement`, `/e-invoicing`, `/data-governance`, `/agentic-state`, `/e-services`, `/web-portals`) run on the shared `DomainShared` template and are treated as still being built. Their thinness is not scored. If they are meant to be final, thin content becomes a High finding: e-Invoicing has about 180 body words, about 55% of them shared boilerplate.

Pages audited (EN unless noted): `/`, 7 vertical pages, `/portfolio`, `/portfolio/romania-ukrainian-interop`, `/news`, all 20 news articles, `/privacy`, `/terms`. Spot checks in /es and /fr: home, interoperability, e-procurement, e-invoicing, portfolio, case study, two news articles, privacy, terms. All 77 internal link targets returned 200, except `/process` (308 to `/e-services`).

---

## Scores

| Category | Score | Band |
|---|---|---|
| **Content Quality** | **62 / 100** | Moderate |
| **AI Search Readiness (GEO + agentic)** | **46 / 100** | Weak to moderate |
| E-E-A-T (sub-score, below) | 56 / 100 | Moderate (50-69) |

### E-E-A-T breakdown (built pages only)

| Factor | Score | Key evidence |
|---|---|---|
| Experience | 14 / 20 | 44 named projects with client, donor, country and year (`/portfolio`). One deep case study with video and process figures. 20 dated field reports with original photos (Kampala, Kigali, Phnom Penh, Kyiv). Gap: the case-study outcomes have no numbers, and "Recognised at EU level" has no source. |
| Expertise | 13 / 25 | Technically precise copy on `/interoperability`: EIF-aligned three-layer stack, X-Road, Pub/Sub, validators, registries. Named leadership with LinkedIn in the footer. Gaps: no bylines on 20 news articles (`author` is an Organization), no credentials on-site, no Person schema. Off-site sources (search snippets, unverified) show the CEO as GovStack CMS Working Group lead and Romania's representative at CEN; none of this appears on the site. |
| Authoritativeness | 12 / 25 | Client logos (World Bank, United Nations, OPCW, ICGLR, RISA, Government of Romania, Audi). Keynotes and panels (ICAC 2026, Govtech 4 Impact Madrid, TICON Africa). Gaps: 13 of 20 news articles have zero outbound citations. Existing press (economedia.ro, tvrinfo.ro) is not referenced. Organization `sameAs` is LinkedIn only. Brand entity is split across legacy domains. |
| Trustworthiness | 17 / 30 | HTTPS. Privacy and Terms name the legal entity "Arxia S.R.L." and Romanian law. HQ city and two offices are listed. The contact form carries a clear data-use note. Gaps: canonicals and schema URLs point to dead URLs (C1). Core numbers contradict each other (H2). Legal pages say "arxia.com". No registered address or registration numbers. The only email is a personal mailbox. ES/FR legal pages are in English. |

### AI Search Readiness breakdown (seo-geo weights)

| Dimension (weight) | Score | Basis |
|---|---|---|
| Citability (25%) | 45 | Some quotable facts: "350+ sites" (Rwanda), "12 member states" (ICGLR), "36 Life Events" (Romania EGOV), "over 100 public institutions" (e-procurement). No "X is..." definitions, no sourced statistics, and claims are unattributed. |
| Structural readability (20%) | 65 | Clean H1-H3, numbered layers, lists and figures. Headings are labels, not questions. No FAQ blocks. |
| Multi-modal (15%) | 70 | Case-study video with VideoObject schema, SVG stack figures, real event photos with descriptive alt text. |
| Authority and brand (20%) | 30 | Weak, collision-prone entity (H1 and H3): no Wikidata or Crunchbase entity found. Name collisions: Arxada (Basel), "Arxia" luxury AI consultancy (Seoul, 2026), ARX, Araxi. Legacy domains carry the old "TYPO3 web agency" positioning. |
| Technical accessibility (20%) | 35 | Server-rendered (content present in raw HTML), real 404s, robots allows all bots. But canonical, hreflang, sitemap and schema URLs resolve to 404 (C1). |

Weighted total: about 48. Adjusted to **46** for the agentic gaps below. llms.txt carries no weight, per methodology.

### Agentic readiness (seo-agentic)
- **Lighthouse Agentic Browsing X/N: not tested.** No PSI run was made, and no scripts from the cloned repo were executed (instruction). Run `npx lighthouse@latest https://www.arxia.global --only-categories=agentic-browsing` to get the fraction.
- **Agent-UX heuristic: partial, from HTML only.** Server-rendered: pass. Landmarks `nav`/`main`/`footer`/`article`: pass, except the portfolio page (no `<main>`; see M4). Form inputs have `<label for>`. Named icon links (LinkedIn `aria-label`s). Logo link has `alt="Arxia"`. Unknown URLs return a real 404. P0 failures measured: 0. P1 issues: honeypot trap (M8) and the missing skip target (M4).
- **Access policy (robots.txt is `User-Agent: *` / `Allow: /` / `Disallow: /api/`):**
  - Training (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended): allowed implicitly. No deliberate decision is declared.
  - Search (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot): allowed. But the declared `Sitemap:` is `https://www.arxia.com/sitemap.xml`, which returns 404 (C1).
  - User-triggered (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent): allowed. No private paths beyond `/api/`.
- Discovery files: `/llms.txt` 404, `.well-known/ai-catalog.json` 404, `Accept: text/markdown` returns HTML, `.md` URLs 404. All of these are opportunities, not defects. Content-Signal, ai-catalog and WebMCP are drafts or proposals as of 2026-09-23 (vendor-matrix date). Their absence is informational.

---

## What works

- **`/interoperability` is the strongest page on the site:** about 700 unique words, an EIF-aligned three-layer model, and 12 named capabilities. It covers an engagement lifecycle (Assess, Design, Build, Sustain), named sectors, a capacity-building workshop, three featured cases, and Service/OfferCatalog schema. It clearly targets "full-stack interoperability" and supports "X-Road deployment and integration".
- **Portfolio as experience evidence:** 44 projects, each with donor and client attribution ("GIZ / Rwanda Mining Board (RMB)", "World Bank / Chancellery of the Prime Minister of Romania"), country and year. This is the evidence procurement officers look for.
- **Case study `/portfolio/romania-ukrainian-interop`:** problem, approach, result and impact in sequence, plus a reusable "gateway pattern" section. It has a video with a VideoObject, Article and Breadcrumb schema.
- **News is a genuine first-hand activity log:** 20 dated articles with NewsArticle schema, real places and named people ("Daniel Homorodean and Grace Labong discussed…", TICON Africa). It is fresh: newest October 2026.
- **ES/FR body copy is truly translated,** not machine-left English. Headings, case study and news are localized, `lang` is set per locale, and `inLanguage` in schema matches.
- **Clean semantics for agents:** skip link, named landmarks, labelled form, descriptive alt text on logos and photos, no broken internal links.
- **Brand voice is specific and non-generic** ("The technical layer is the easy part; we cover the rest too."). None of the low-quality AI content markers apply to the built pages.

---

## Findings

### Critical

**C1. Every canonical, hreflang, sitemap URL and schema URL points to `www.arxia.com/*`, and every one of those (except the root) returns 404.**
- Evidence: `/interoperability` has `<link rel="canonical" href="https://www.arxia.com/interoperability">`, and `curl https://www.arxia.com/interoperability` returns **404** (a legacy Apache host). The same holds for `/portfolio`, `/news`, `/privacy`, `/es` and the news slugs. Only `https://www.arxia.com/` returns 302 to arxia.global. robots.txt declares `Sitemap: https://www.arxia.com/sitemap.xml`, which returns **404**. Organization JSON-LD has `"url":"https://www.arxia.com"`. News `mainEntityOfPage`, `image` and `logo` also point to arxia.com paths.
- Content/GEO effect: AI engines and Google read the canonical as the preferred URL. Here that URL is a 404 on another host, so arxia.global pages may be dropped or never consolidated. Indicative: brand searches (Bing-based tool, 2026-10-06) returned only legacy `arxia.com`, `new.arxia.com` and `acceptance.arxia.com` pages and no arxia.global URL. Google index status is **unverified** because GSC was not available.
- Fix: set one constant `SITE_URL = "https://www.arxia.global"`, ideally from an env var shared by all files, in `src/app/[locale]/layout.tsx:23`, `src/app/sitemap.ts:6` and `src/app/robots.ts:3`. Check any other `SITE_URL` copies (news/[slug] and portfolio/[slug] pages use it for JSON-LD). The technical-SEO agent owns this; it is listed here because it gates every content and GEO gain below.

### High

**H1. Legacy Arxia sites are still live, indexable, and they define the brand in search and in third-party data.**
- Evidence: `https://www.arxia.com/about-us.html` returns 200, self-canonical, title "Arxia: About Us | Arxia Development". `https://www.arxia.com/products/processplayer-public-procurement.html` returns 200 and ranks for "ProcessPlayer e-procurement". `https://www.new.arxia.com/interoperability.html` returns 200 with no robots meta. `acceptance.arxia.com` now has `noindex, nofollow` but still appears in results. Third-party profiles (craft.co, cbinsights, zoominfo) echo the old positioning as a software and TYPO3 outsourcing firm.
- Fix: map each legacy `.html` URL with a 301 to its new equivalent: `/about-us.html` to `/` (later to `/about`), `/products/processplayer-public-procurement.html` to `/e-procurement`, `/interoperability*.html` to `/interoperability`. This goes either on the arxia.com Apache host or, once arxia.com DNS points to Vercel, in `next.config.mjs` `redirects()`. That file has three legacy generations mapped but no `.html` rules. Put `new.` and `acceptance.` behind auth or return 410. Then file profile updates on craft.co, cbinsights and zoominfo.

**H2. Core company facts contradict each other across pages and schema.**
- Years: homepage stat "25+ Years" (`src/components/sections/GlobalPresence.tsx:46`). Organization schema "more than 20 years" (`src/app/[locale]/layout.tsx:27`). Portfolio "Two decades of digital government work" (`messages/en.json:44,46` plus es/fr). The public registry and search snippets show ARXIA SRL founded 1996, which is 30 years (unverified against the official register).
- Scale: ProcessPlayer "50+ organizations" (`src/data/domain-pages.ts:345`) versus the own-product e-procurement platform "Implemented by over 100 public institutions" (`src/data/portfolio.ts:262`). The site does not say whether these are the same product.
- People: Grace Labong is "Africa Manager" in a news image alt and "Business Development, Africa" in the footer.
- Why High: evaluators and AI answer engines cross-check. A contradiction gets either dropped or quoted wrong. Fix: choose one canonical fact sheet (founding year, years, countries, organizations, institutions per product) and reference it from one data file.

**H3. Entity definition is too thin for a name that collides with others.**
- Evidence: Organization JSON-LD has `name`, `url` (dead, see C1), `logo` and `description`, with `"sameAs":["https://www.linkedin.com/company/arxia/"]` only. It has no `legalName` ("Arxia S.R.L." appears only in `/privacy`), no `foundingDate`, `address`, `areaServed`, `founder`/`employee`, `knowsAbout`, or `subOrganization`/offices. Brand SERP collisions: Arxada (Basel), "Arxia" luxury AI consultancy (Seoul, 2026), ARX, Araxi. No Wikidata item was found.
- Fix: extend the Organization JSON-LD in `src/app/[locale]/layout.tsx`. Add `legalName`, `foundingDate`, a PostalAddress for the Cluj-Napoca HQ, `location` for Santiago and Kampala, `knowsAbout` (Digital Public Infrastructure, X-Road, GovStack, e-procurement, e-invoicing), `founder`/`employee` Person nodes for the three named leaders, and `sameAs` (LinkedIn, plus Wikidata and Crunchbase once created, plus the GovStack and TYPO3 Association member listings). Create a Wikidata item that cites independent sources (economedia.ro, tvrinfo.ro).

**H4. 20 news articles have no named author and no credentials, so the expertise the site already has is invisible.**
- Evidence: `src/app/[locale]/news/[slug]/page.tsx:68` sets `author: { "@type": "Organization", name: "Arxia" }`. There is no visible byline. The Cambodia article credits "Arxia CEO Daniel Homorodean" in the body but has no bio or link. GovStack working-group and CEN standards roles appear off-site only (unverified).
- Fix: add an `author` field (slug, name, role, LinkedIn) to `src/data/news.ts`. Render a byline and a 2-line bio box. Emit a Person author with `sameAs` LinkedIn and `jobTitle`.

### Medium

**M1. The case study states outcomes without numbers and recognition without a source.**
- Evidence (`/portfolio/romania-ukrainian-interop`): impact cards "Lower administrative burden" and "Faster route to entitlements" have no figure. "Recognised at EU level" and "Cited as a crisis response reference" have no link to the EU document.
- Fix in `src/data/case-studies.ts`: add the citing EU or World Bank document as an outbound link, plus at least two numbers (people served, institutions connected, processing time before and after). Sourced figures are the main lever for AI citation.

**M2. News is isolated from portfolio and services, and rarely cites sources.**
- Evidence: in 13 of 20 articles the only outbound link is the LinkedIn footer. Each article's single contextual internal link is "Explore Arxia's work in interoperability →". The Cambodia article does not link the Cambodia portfolio entry. The ICGLR adoption article does not link the ICGLR projects. Neither links to GovStack specs, NIIS/X-Road or the NSPC. `/news/arxia-rwanda-national-dpi-guidelines-kigali` has 132 main-content words.
- Fix in `src/data/news.ts`: add `relatedProjects[]` and `relatedNews[]`, rendered as a "Related work" block. Add 1-3 outbound citations per article (event page, partner institution, standard). Expand the Rwanda DPI article with scope, institutions involved and Arxia's deliverables.

**M3. The homepage does not say in words what Arxia is or for whom.**
- Evidence: H1 "Technology to transform nations". The "Who we are" paragraph exists only in meta and JSON-LD; `content/site-content.md` has it, but the page does not render it. Main content is about 472 words, mostly card labels, against a 500-word homepage floor. The rotating words ("Digital Public Infrastructure", "Interoperability") are decorative rather than a sentence an engine can quote.
- Fix in `src/components/sections/Hero.tsx` / `Positioning.tsx` plus `messages/*.json`: add one 60-100-word self-contained paragraph under the H1. Name it "a Digital Public Infrastructure and interoperability consultancy", give the founding year, countries and named donors, and say who you serve. That paragraph is what AI answers will quote for "who is Arxia".

**M4. The portfolio page has no `<main>` landmark, so the "Skip to content" link targets nothing.**
- Evidence: `/portfolio` and `/es/portfolio` have 0 `<main>` elements and 0 `id="main"`, while the skip link `href="#main"` is present. A keyboard user or an agent hitting "skip" goes nowhere. This is a visible break on a built page.
- Fix: wrap the content in `<main id="main">` in `src/app/[locale]/portfolio/page.tsx` / `PortfolioPageClient.tsx`.

**M5. English strings leak on /es and /fr, and the legal pages are English under a Spanish/French `lang`.**
- Evidence: "Skip to content" is hard-coded in `src/app/[locale]/layout.tsx:158`, though `messages/en.json` already has `skipToContent`. "Domains" is hard-coded in `src/components/portfolio/PortfolioSideNav.tsx:74`. Portfolio client and country metadata are untranslated on /es ("GIZ (consortium led by GOPA)", "Subcontracted", "Ethiopia", "Central African Republic", "Romania · 2023") because `src/data/i18n/portfolio.{es,fr}.ts` overlays only title, description and category. `/es/privacy` and `/fr/terms` serve English text with `lang="es"` / `lang="fr"`; the canonical goes to EN, which is acceptable, but the lang attribute is wrong.
- Spanish register mixes informal tú ("Contáctanos", "Los bloques de tu independencia digital") with formal usted. For ministers and procurement officers, use usted consistently. "Bloques" also loses "building blocks"; consider "componentes" or "bloques de construcción".
- Fix: wire the existing message keys, add `client`/`location` to the i18n overlays, and set `lang="en"` on the legal content (or translate it).

**M6. Live vertical titles and ES/FR H1s miss the terms buyers search for.**
- Evidence: titles "e-Invoicing — Arxia" (19 chars), "e-Procurement — Arxia" (21) and "Data governance — Arxia" are below the 30-char minimum and carry no qualifier. On /es and /fr the H1 and title stay "e-Invoicing" / "e-Procurement". Spanish buyers search "facturación electrónica" and "contratación pública electrónica"; French buyers search "facturation électronique" and "dématérialisation des marchés publics". LatAm is a stated 2026 priority.
- Fix: use title patterns like "e-Invoicing systems for tax authorities | Arxia" and "Facturación electrónica para administraciones tributarias | Arxia". Set the localized term as the H1 with the English term as eyebrow, in `src/data/domain-pages.ts` and `src/data/i18n/domain-pages.{es,fr}.ts`. Fold this into the vertical build phases if those pages are still in progress.

**M7. Legal and trust details are incomplete or point to the wrong domain.**
- Evidence: `/privacy` reads "Arxia S.R.L. ... operates arxia.com", and `/terms` covers "the arxia.com website", while the site is arxia.global. Both contact lines use a personal mailbox. There is no registered office street address, Trade Register number or fiscal code (CUI) anywhere on the site. Romanian law on information-society services generally requires these; verify with counsel.
- Fix in `src/app/[locale]/privacy/page.tsx` and `terms/page.tsx`: correct the domain, use a role address (for example privacy@ / contact@), and add the full legal identification to the Footer (`src/components/layout/Footer.tsx`). This is a low-effort trust gain for donor due diligence.

**M8. Agent-facing honeypot can silently swallow enquiries.**
- Evidence: the hidden field is labelled "Website" (`name="website"`). The API returns `{ok:true}` without sending when it is filled (`src/app/api/contact/route.ts:102-104`). The container is `aria-hidden`, but DOM-parsing agents filling a form for a real person may complete a field labelled "Website" and get a false success. The lead is lost and no error shows.
- Fix: rename to a non-semantic name with a label like "Leave this field empty". Add a time-to-submit check. Optionally log honeypot hits instead of discarding them.

**M9. AI-crawler policy is undeclared.**
- Evidence: robots.txt has only a `*` group and no Content-Signal. Training and search bots are treated the same by default.
- Fix (`src/app/robots.ts`): make a decision with the user. For a firm that wants visibility, keep OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot and Bingbot allowed. Decide on GPTBot, ClaudeBot, CCBot and Google-Extended (training) separately. Optionally add `Content-Signal: search=yes, ai-input=yes, ai-train=<choice>` in every group (a Cloudflare proposal, no confirmed effect).

### Low

- **L1.** `/llms.txt` is absent. It is optional and ignored by Google Search, so it carries no score weight. If added, list the 7 domains, the case study, the portfolio and the fact sheet (`src/app/llms.txt/route.ts`).
- **L2.** Internal link through a redirect: `src/data/news.ts:685` links `/process` (308 to `/e-services`). Point it at `/e-services`.
- **L3.** The `/news` index jumps from H1 straight to H3 card titles with no H2 (`src/app/[locale]/news/page.tsx`).
- **L4.** Whole-card links give agents and screen readers long concatenated names, for example "01 · COREFull-stack interoperabilityGovernance, standards…Explore→" (`src/components/sections/DomainsGrid.tsx`, portfolio and news cards). Add a concise `aria-label`, or keep the link on the title only.
- **L5.** Readability scores are low (Flesch-Kincaid about 15-48; `/interoperability` about 22). For an expert B2G audience this is acceptable and not a ranking factor, so no action is needed beyond the M3 plain-language summary.
- **L6.** Homepage portfolio cards for Senegal and Cambodia link to the generic `/portfolio`, not to the project. Not broken; revisit when detail pages exist.

---

## Quick wins (under a day each, highest leverage first)

1. Fix `SITE_URL` to arxia.global in layout, sitemap and robots (C1).
2. Unify founding year, years, countries and institution counts in one data file (H2).
3. Add `legalName`, `foundingDate`, `address`, `knowsAbout`, Person `founder`/`employee` and a wider `sameAs` to the Organization JSON-LD (H3).
4. Add `<main id="main">` to the portfolio page (M4).
5. Wire `skipToContent`, translate "Domains", and set `lang="en"` on the English legal body under /es and /fr (M5).
6. Correct "arxia.com" to arxia.global in privacy and terms, use a role email, and add CUI, registry number and registered address to the footer (M7).
7. Rename the "Website" honeypot (M8).
8. Add a byline and Person author to news (H4). The data change is one field per article.
9. Add a 60-100-word "who we are" paragraph under the homepage H1 (M3).
10. Change `/process` to `/e-services` in news.ts (L2).

---

## SXO notes (built pages vs. what the SERP rewards)

SERP sample, 2026-10-06. Limitation: a WebSearch tool was used, not a Google SERP API, so there is no volume or PAA data.
- "digital public infrastructure consultancy firm" is dominated by **service pages** (Avasant's "Digital Public Infrastructure Consulting", MicroSave, Genesis Analytics). They open with a DPI definition, then scope, approach and cases. Arxia has no page of that type. The homepage is the closest and does not define DPI. **Mismatch: HIGH**, though it is a missing page and therefore input for the build phase, not a deduction.
- "X-Road implementation partner": Gofore, Cybernetica, Aktors and estdev tenders. The `/interoperability` page type is **aligned** (service page), but "X-Road" appears in only one H3. An X-Road spoke page would compete.
- "GovStack building blocks implementation": purely **informational** (specs.govstack.global, ITU). Arxia's credible angle is an experience-based guide (Senegal, Ethiopia, Rwanda, Cambodia, multi-country training), not a service page.
- "e-invoicing implementation for tax authorities": Big-4 service pages (KPMG, Deloitte, Forvis Mazars). `/e-invoicing` is the right page type but has one case.

Persona read of the built pages (qualitative):

| Persona | Relevance | Clarity | Trust | Action | Weakest point |
|---|---|---|---|---|---|
| Donor procurement officer verifying experience | High | Medium | Medium | Medium | No contract values, references or legal identifiers. Facts are inconsistent. |
| Government CTO evaluating an X-Road or interop partner | High (`/interoperability`) | High | Medium | Medium | No technical case detail beyond one study. No named architects. |
| Minister / DG (outcomes, sovereignty) | Medium | Medium | Medium | High (clear CTA) | Outcomes not quantified. |
| Lead firm seeking a consortium subcontractor (GOPA, EY, GIZ) | High (portfolio shows those roles) | High | Medium | Medium | No team or expertise detail for CVs. |

---

## Topic clusters (hypothesis; not SERP-overlap validated, no DataForSEO)

- **Pillar: Full-stack interoperability (exists).** Spokes: X-Road deployment and onboarding; GovStack building-block adoption; semantic data standards and validators; data-sharing policy for regional bodies (ICGLR); interoperability maturity assessment method.
- **Pillar: Digital Public Infrastructure (to create).** Spokes: the seven domains, DPI guidelines work (Rwanda), social protection platforms (Cambodia), registries and data exchange (Uganda).
- **Pillar: Agentic state / AI in government.** Spokes: AI readiness assessment, AI governance framework, the AI IGNITE and Acceleration programs (8 news posts already exist here, so this cluster is easy to interlink).
- Mandatory links: each news post links to its project and its domain; each domain links to the top 3 projects (already done) and the top 3 news posts (missing); each project links back to its news posts.

---

## Recommendations for upcoming pages (patterns to follow and to avoid)

Follow (seen working on the built pages):
- The `/interoperability` structure: a layered model figure, numbered capabilities with one-line outcomes, an engagement lifecycle, sectors, a training offer, three cases, related domains, and Service/OfferCatalog schema.
- The case-study shape: client, country, year and practice in the header, then problem, approach figure, result, impact and the reusable pattern, plus video with VideoObject.
- Donor and client attribution on every project card.

Add (missing on built pages, so new pages should include it from day one):
- A self-contained definition in the first 60 words ("X is…"), plus at least one sourced number per page.
- A named expert per page (byline or "Practice lead" card with Person schema).
- A "Related news" block next to "Featured cases".
- Localized buyer terms in ES/FR titles and H1s, and the usted register.
- A title pattern of "<service> for <buyer> | Arxia", 30-60 chars.

Avoid:
- Hard-coded English strings in components.
- Template pages where shared blocks exceed about 30% of body words (the current e-Invoicing template runs about 55% shared).
- Stats typed inline in components. Read them from the fact sheet.
- Internal links to redirected paths.
- Any new absolute URL built from a constant other than the single `SITE_URL`.

---

## Content to create (input for the build phases, ranked by expected impact for a B2G DPI consultancy)

1. **About and Team page:** leadership bios with credentials (GovStack working group, CEN standards, TYPO3 Association), legal entity, history since founding, offices, donors worked with. This lifts all four E-E-A-T factors and is what procurement evaluators open first.
2. **Case-study detail pages for the five strongest projects:** Cambodia DSPP (X-Road and Pub/Sub, GovStack); ICGLR Mining and Minerals Data Sharing Standard (12 states, adoption already covered in news); Rwanda multi-tenant government web platform (350+ sites); Romania EGOV (36 life events, 16 institutions); Mbaza chatbot (USSD and voice in local language). Use the Romania template, with numbers and sources.
3. **Digital Public Infrastructure pillar page:** definition, Arxia's seven building blocks, GovStack and Digital Public Goods alignment, cases. It targets the service-page SERP above. Note that `next.config.mjs` currently redirects `/digital-transformation` to `/#expertise` by design; a DPI pillar is a deliberate reversal for the user to decide.
4. **ProcessPlayer product page:** it would replace the legacy arxia.com page that still ranks (H1), with a clarified institution count.
5. **X-Road implementation and GovStack adoption spokes** under `/interoperability`.
6. **"Working with Arxia on donor-funded projects":** eligibility, consortium roles (lead, partner, subcontractor), donors (World Bank, GIZ, EU, ITU, UN), languages, references process. This fits the procurement-officer persona.
7. **Original-method insight pieces,** which are highly citable: interoperability maturity assessment method; data-sharing policy for regional bodies (ICGLR lessons); AI readiness assessment for government.
8. **Native ES landing pages for LatAm:** facturación electrónica, interoperabilidad gubernamental, IA en el sector público, using Chile and Peru cases (Caja Cusco, Chile BPO).

---

## Limitations
- No Lighthouse or PSI run, no GSC/GA4, no DataForSEO, no backlink data. Index status is inferred from a Bing-based search tool and marked unverified.
- Pages were parsed from raw server HTML, not a JS-rendered DOM. Content is server-rendered, so text coverage is complete, but layout and visual checks are left to the visual agent.
- Off-site credentials (GovStack WG lead, CEN representative) and registry data (founded 1996, CUI 8472530) come from third-party snippets and are not verified at source.
- Sources consulted: economedia.ro, tvrinfo.ro, seedig.net, craft.co, cbinsights.com, targetare.ro, zoominfo.com, avasant.com, specs.govstack.global, gofore.com, cyber.ee.
