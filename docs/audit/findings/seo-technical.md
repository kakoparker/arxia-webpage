# Arxia: Technical SEO Audit (technical half)

- **Site audited:** https://www.arxia.global (Vercel, Next.js 16, next-intl, EN at `/`, plus `/es` and `/fr`)
- **Source checked:** origin/main snapshot at `C:/Users/carlo/AppData/Local/Temp/aud/main`
- **Date:** 2026-10-06
- **Method:** claude-seo (seo-audit, seo-technical, seo-schema, seo-sitemap, seo-hreflang, seo-images, seo-page). Read-only, using curl and Python requests.
- **Crawl:** 123 URLs, every one returned 200, at most 3 concurrent requests. Raw data is in `findings/crawl.json`.
- **Scope rule:** only built pages are scored. Unbuilt service pages are not penalised.

## Scores (the five categories this agent owns)

| Category | Weight | Score | Basis |
|---|---|---|---|
| Technical SEO | 22% | **42 / 100** | Measured |
| On-Page SEO | 20% | **58 / 100** | Measured |
| Schema / Structured Data | 10% | **55 / 100** | Measured |
| Performance (CWV) | 10% | **68 / 100 (provisional)** | Lab proxy only: the PSI API returned HTTP 429 (daily quota exceeded) and there is no CrUX key, so no field data was collected |
| Images | 5% | **78 / 100** | Measured |

**What drives the scores:** one root cause pulls Technical, On-Page and Schema down together. The code hard-codes `https://www.arxia.com` as the site URL in four places. That domain is an Apache server that 302s its homepage to arxia.global and returns **404 for every deep path**. As a result, every canonical, hreflang, sitemap `<loc>`, OG URL, schema URL, logo and article image points at a dead URL.

Fixing this one constant and the domain redirect would lift Technical to about 80 and Schema to about 75.

---

## What works

- **Server-side rendering.** All content is in the raw HTML: H1, body copy and JSON-LD for every page. A Googlebot-UA fetch of `/es/e-procurement` returned 101 KB of HTML with the H1. This holds in all three locales.
- **No locale trap for crawlers.** `localeDetection: false` (`src/i18n/routing.ts:32`) works as intended:
  - `Accept-Language: es` or `fr` with a Googlebot UA gets 200 English at `/`.
  - The cookie `NEXT_LOCALE=es` does not redirect either.
- **Correct 404 handling.**
  - Unknown paths in every locale return a real **404** with `noindex`: `/zz-not-real-123`, `/es/…`, `/fr/…`, `/news/not-a-real-article`, `/portfolio/not-real`, `/de`, `/index.html`.
  - There are no soft-404s.
  - The `[...rest]` catch-all calls `notFound()` correctly (`src/app/[locale]/[...rest]/page.tsx:10`).
- **Clean redirects.**
  - http→https, apex→www and trailing slash→none are all single-hop **308s** on arxia.global.
  - The legacy `/govtech`, `/data`, `/domains/*` and `/digital-transformation` URLs 308 straight to their final targets with no chains (`next.config.mjs` redirects).
- **No broken internal links.** Across 123 crawled URLs, nothing returns 4xx or 5xx, and there are no `#` or javascript links. Nav and footer only link to built pages.
- **Correct hreflang structure in the code.** The sets are self-referencing, reciprocal, include x-default, use valid ISO 639-1 codes, and are identical in HTML and sitemap (`src/i18n/metadata.ts:62-75`). The only problem is the host they point at.
- **Clean headings.** Exactly one H1 on all 99 canonical pages, and `lang` matches the locale.
- **Correct robots directives.** `index, follow, max-image-preview:large, max-snippet:-1`. `/api/` is disallowed and nothing important is blocked.
- **Filtered portfolio URLs are handled.** `?domain=` filter URLs canonicalize to `/portfolio`.
- **Images.**
  - 612 `<img>` tags, **0 missing alt**. The 57 empty-alt images are decorative.
  - All images are served as WebP through next/image with srcset and explicit dimensions.
  - Below-the-fold images are lazy-loaded.
- **Security headers.** Present on arxia.global:
  - HSTS `max-age=63072000`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
  - `poweredByHeader: false`
  - No mixed content.
- **Fast server.** HTML TTFB was 0.07–0.45 s (Vercel edge HIT). The homepage HTML is 26 KB with Brotli.
- **Supporting files are valid.** The manifest is valid, `/opengraph-image` renders a 1200×630 PNG, and the HTML size cap is not a concern (largest page 225 KB, well under 2 MB).

---

## Findings

### CRITICAL

**C1. Every canonical, hreflang and schema URL points to `www.arxia.com`, where deep URLs return 404.**
- **Evidence:**
  - All 99 canonical pages use `<link rel="canonical" href="https://www.arxia.com/…">`. For example, `/es/agentic-state` declares a canonical of `https://www.arxia.com/es/agentic-state`.
  - `curl https://www.arxia.com/e-procurement` returns **404** from Apache. So do `/es`, `/news`, `/portfolio`, `/sitemap.xml` and `/logos/brand/arxia-logo-color.png`.
  - Only the arxia.com root redirects, with a **302** to `https://www.arxia.global/`.
  - Separately, `/e-procurement` on arxia.global is reachable at 200, and so is any case variant such as `/E-Procurement`. They all carry the same dead canonical.
- **Impact:**
  - Google is asked to index URLs that 404. It will usually ignore a canonical that points to a 404 and pick its own, but the signal is broken.
  - The hreflang clusters reference non-200 URLs, so hreflang is effectively invalid.
  - All schema URLs, the logo and article images are unreachable. This makes the pages ineligible for Article rich results and the Organization logo.
- **Fix:**
  1. Replace the four hard-coded constants with a single env-driven constant, e.g. `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arxia.global"`, and import it everywhere. The constants are in:
     - `src/i18n/metadata.ts:3`
     - `src/app/[locale]/layout.tsx:23`
     - `src/app/sitemap.ts:6`
     - `src/app/robots.ts:3`
  2. Set the env var in Vercel for Production only, so preview deployments do not emit production canonicals.

**C2. The sitemap declared in robots.txt is unreachable, and the sitemap lists only dead-domain URLs.**
- **Evidence:**
  - `https://www.arxia.global/robots.txt` contains `Sitemap: https://www.arxia.com/sitemap.xml`, which returns **404**.
  - `https://www.arxia.global/sitemap.xml` itself is valid XML: 95 URLs with the `xhtml` namespace.
  - However, all 95 `<loc>` values and all `xhtml:link` alternates are `https://www.arxia.com/…`. Every one of them 404s, except the root, which 302s.
- **Fix:**
  - Fixing C1 corrects both `src/app/robots.ts:14` and `src/app/sitemap.ts:6`.
  - Then submit `https://www.arxia.global/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
  - Whether arxia.global is verified in Search Console was not checked.

**C3. The brand-domain redirect is temporary and drops the path.**
- **Evidence:**
  - `https://www.arxia.com/` and `https://arxia.com/` return **302** to `https://www.arxia.global/`.
  - Every deep path on arxia.com returns 404 instead of redirecting.
  - arxia.com still serves the old TYPO3 `robots.txt` (`Disallow: /typo3/`).
- **Impact:**
  - A 302 tells Google the move is temporary, so it can keep the arxia.com root as canonical for the homepage.
  - Any backlinks or bookmarks to old arxia.com deep URLs land on a 404, so their link equity is lost.
- **Fix:** choose one canonical brand domain, then apply the matching redirect setup.
  - **(a) Keep arxia.global** (matches the live host):
    - Add arxia.com and www.arxia.com to the Vercel project as redirect domains (308, path-preserving) to `https://www.arxia.global`.
    - Or, on the Apache side, use `RedirectMatch 301 ^/(.*)$ https://www.arxia.global/$1`.
  - **(b) Make arxia.com canonical** (matches the email domain and the current code intent):
    - Move arxia.com DNS to Vercel as the primary domain.
    - 308 arxia.global to it.
    - Keep `SITE_URL = https://www.arxia.com`.
  - **Either way:**
    - Map the top legacy TYPO3 URLs with 301s. The old URL inventory was not checked; pull it from Search Console or a backlink tool.
    - Run a Change of Address in Search Console if the arxia.com property exists.

### HIGH

**H1. Two hreflang sets disagree: HTML and sitemap say arxia.com, the HTTP Link header says arxia.global.**
- **Evidence:**
  - On `/`, the response header is `Link: <https://www.arxia.global/>; rel="alternate"; hreflang="en", <https://www.arxia.global/es>…`. This comes from the next-intl middleware, which uses the request host.
  - The `<head>` of the same page lists `https://www.arxia.com/…`.
- **Fix:**
  - C1 aligns the hosts.
  - Then keep exactly one hreflang method. Either:
    - drop the header by setting `alternateLinks: false` in `defineRouting` (`src/i18n/routing.ts:25`), or
    - keep HTML plus sitemap only.

**H2. Open Graph is wired wrong. 60 of 99 canonical pages have no `og:image`, and pages without their own OG block inherit the homepage's.**
- **Evidence:**
  - The homepage `/` emits only `og:title`, `og:description` and `og:type`. It has no og:image, og:url or og:site_name.
  - Domain, index and legal pages carry `og:title="Arxia — Digital Transformation & Digital Public Infrastructure"` and `og:url="https://www.arxia.com"`. Examples: `/agentic-state`, `/es/agentic-state`, `/news`, `/portfolio`.
  - In total, 54 pages declare the homepage as their og:url.
  - `/opengraph-image` exists and renders 1200×630, but no page references it. The file is `src/app/opengraph-image.tsx`, and there is no `app/layout.tsx`, so the convention does not attach to `[locale]` routes.
- **Causes:**
  - Next.js shallow-merges metadata. A page-level `openGraph` (homepage, news, portfolio case) replaces the layout's block entirely.
  - Pages without their own block inherit the layout's homepage values (`layout.tsx:50-59`).
- **Fix:**
  1. Move the OG image file to `src/app/[locale]/opengraph-image.tsx`, or add `images: ["/opengraph-image"]` explicitly.
  2. Create a `pageOpenGraph(locale, path, {title, description, image?})` helper in `src/i18n/metadata.ts`. It should always set `url`, `siteName`, `locale`, `images` and `type`.
  3. Call that helper from every `generateMetadata`. The domain pages to update are:
     - `src/app/[locale]/agentic-state/page.tsx:18-22`
     - `data-governance`, `e-invoicing`, `e-procurement`, `e-services`, `interoperability`, `web-portals` (same pattern in each)
     - `news/page.tsx`
     - `portfolio/page.tsx`

**H3. The Twitter card is the same generic English text on all 120 pages, including es/fr and news.**
- **Evidence:**
  - `twitter:title` is "Arxia — Digital Transformation & Digital Public Infrastructure" and `twitter:description` is the EN tagline everywhere.
  - On `/es` and `/news/arxia-supports-fawe-uganda-ai-acceleration`, the twitter title does not match the page.
  - Only the news pages get a `twitter:image`.
- **Fix:** set `twitter: {title, description, images}` from the same helper as H2. Remove the static block in `src/app/[locale]/layout.tsx:60-65`, or make it locale-aware through `getTranslations("Meta")`.

### MEDIUM

**M1. Sitemap `lastmod` is the build timestamp for all 95 URLs.**
- **Evidence:** every entry reads `<lastmod>2026-10-06T12:29:47.919Z</lastmod>`, which is the deploy time. It comes from `const now = new Date()` at `src/app/sitemap.ts:39`.
- **Impact:** Google learns to ignore lastmod when it is always "now".
- **Fix:**
  - For news, use `article.isoDate`.
  - For case studies, use `cs.publishedAt` (`src/data/case-studies.ts:87`).
  - For domain and index pages, use a static content-revision date per page (or the git commit date of the data file).
  - Drop `changefreq` and `priority`; Google ignores both (Info).

**M2. News titles and descriptions are far over the display limits.**
- **Evidence:**
  - All 57 news pages have titles of 84–149 characters, against a 30–60 target. Example: `/fr/news/arxia-cambodia-social-protection-interoperability-govstack` has a 149-character title.
  - Descriptions run 189–298 characters, against a 120–160 target.
  - The full headline is reused as `<title>` (`src/app/[locale]/news/[slug]/page.tsx:37`) and `metaDescription` is long (`src/data/news.ts:50-52`, `:104-106`, and the rest).
- **Fix:**
  - Add optional `seoTitle` (≤60 characters) and a tighter `metaDescription` (≤155 characters) to each article in `src/data/news.ts` and `src/data/i18n/news.{es,fr}.ts`.
  - Use `seoTitle ?? title` in generateMetadata. Keep the long headline as the H1 and in NewsArticle.headline (Google allows up to 110 characters there).

**M3. Domain-page titles are thin, and three are identical across EN/ES/FR.**
- **Evidence:**
  - Titles run 18–23 characters, e.g. "e-Services — Arxia", "Agentic state — Arxia", "e-Invoicing — Arxia".
  - "e-Procurement — Arxia", "e-Invoicing — Arxia" and "e-Services — Arxia" are the same in all three locales. They come from `name` in `src/data/i18n/expertise-domains.{es,fr}.ts:21-32` and the domain-pages data.
  - The H1 is also untranslated on those three pages.
- **Fix:**
  - Add a dedicated `metaTitle` per domain and locale that carries the search term and a qualifier. For example:
    - "e-Procurement Systems for Governments — Arxia"
    - "Contratación pública electrónica para gobiernos — Arxia"
    - "Marchés publics électroniques — Arxia"
  - Hreflang already tells Google these are translations, so this is not a duplicate-content risk. The gain is matching local-language queries.

**M4. The hero H1 is hidden until JavaScript runs, which is an LCP risk.**
- **Evidence:**
  - The homepage `<h1 class="animate-on-scroll …">` starts at `opacity:0; transform:translateY(30px)` (`src/app/globals.css:268-273`).
  - It only becomes visible after hydration and the IntersectionObserver add `.visible`, followed by a 700 ms transition (`src/components/sections/Hero.tsx:97-100`, and `:113`, `:122`, `:140`).
  - Chrome does not count opacity-0 elements as LCP candidates, so the hero text's LCP time is pushed to after the JS bundle runs.
- **Fix:** take the H1 and its above-the-fold siblings out of `.animate-on-scroll`. If motion is wanted, use a CSS-only `@keyframes` entrance that starts at `opacity:1` or applies `animation-delay:0`. Do not gate the first paint on JS. The same pattern should be checked on the domain-page heroes.

**M5. The JavaScript payload is about 2× the project's own budget.**
- **Evidence:**
  - The homepage loads 14 chunks: **297 KB Brotli** (909 KB decoded).
  - Interior pages load 13–17 chunks, about 737–934 KB decoded.
  - The largest chunks are react-dom (70 KB br) and GSAP + ScrollTrigger (48 KB br).
  - The homepage also carries 92 KB of inline script (RSC payload) and about 750 DOM elements; `/interoperability` has about 902.
  - The target in CLAUDE.md is "JS bundle < 150KB gzipped".
- **Fix:**
  - Lazy-load GSAP only in the components that animate, using `dynamic(() => import(...), {ssr:false})` inside a client island.
  - Replace simple fade-ins with CSS.
  - Audit with `next build` output plus `@next/bundle-analyzer`.

**M6. The Organization logo and article images fail validation because they sit on the 404 domain.**
- Covered by C1, but tracked separately for schema scoring.
- **Evidence:**
  - Organization.logo is `https://www.arxia.com/logos/brand/arxia-logo-color.png` (404). The same file on arxia.global returns 200, 500×500 PNG.
  - NewsArticle.image is `https://www.arxia.com/images/news/…/cover.jpg` (404).
- **Fix:** C1.

### LOW

- **L1. es/fr legal pages are English-only but send mixed signals.**
  - `/es/privacy`, `/es/terms`, `/fr/privacy` and `/fr/terms` return 200 with English body text, but `<html lang="es|fr">`.
  - They canonicalize to `/privacy` and `/terms` through the relative `alternates: { canonical: "/privacy" }` (`src/app/[locale]/privacy/page.tsx:8`, and the same in `terms/page.tsx`).
  - The middleware Link header still advertises `hreflang="es"` → `/es/privacy`, which conflicts with that canonical.
  - The description "…on arxia.com" also names the wrong domain.
  - **Fix:**
    - Either `notFound()` or redirect es/fr legal routes to EN until they are translated, or add `robots: {index:false}` for non-EN locales.
    - Update the copy domain.
- **L2. Duplicate titles and descriptions on legal pages.** "Privacy Policy — Arxia" and "Terms of Service — Arxia" each appear on 3 URLs. The terms description is 43 characters and the privacy description is 66. Resolved by L1, then lengthen the EN descriptions to 120–160 characters.
- **L3. An internal link goes through a redirect.** The Ukraine/Kyiv news article (all 3 locales) links to `/process`, which 308s to `/e-services`. **Fix:** `src/data/news.ts:685` → `href: "/e-services"`, and the same in `news.es.ts`/`news.fr.ts` if mirrored.
- **L4. URL case variants return 200.** `/E-Procurement` returns 200 instead of redirecting to lowercase. The canonical mitigates this once C1 is fixed. Optionally add a middleware lowercase 308.
- **L5. The default-locale prefix uses a temporary redirect.** `/en` and `/en/e-procurement` return 307 to the unprefixed URL (next-intl default). These URLs are not linked anywhere, so the impact is low. Optionally add permanent redirects in `next.config.mjs`.
- **L6. `Host:` directive in robots.txt.** `src/app/robots.ts:15` emits `Host: https://www.arxia.com`, which only Yandex reads and which names the wrong host. Remove the `host` field.
- **L7. HSTS and CSP gaps.**
  - HSTS has no `includeSubDomains` or `preload`.
  - There is no Content-Security-Policy. `next.config.mjs` notes it is deferred; the comment there also still refers to Caddy, which is stale since the move to Vercel.
  - Trust signals only, not ranking signals. Add CSP in report-only mode first.
- **L8. `inLanguage` on Organization.** This property is not defined for Organization (`src/app/[locale]/layout.tsx:140`). Keep it on WebSite only.
- **L9. The `NEXT_LOCALE` cookie is set on every HTML response,** even with locale detection off. It does not break the CDN cache (X-Vercel-Cache HIT), so no action is required.
- **L10. No IndexNow.** Optional for Bing and Yandex: add a key file and a ping on deploy.
- **Info.** No `/favicon.ico` (it 404s; `icon.png` is declared, so this is fine). No `security.txt`. `llms.txt` returns 404 and is left to the GEO agent.

---

## Schema detail

| Page type | Types found | Status |
|---|---|---|
| All pages | Organization, WebSite (nested array, `inLanguage`) | Valid syntax. All URLs and the logo are on the 404 domain. Missing `@id`, `contactPoint`, `address`, `foundingDate`, `areaServed`. sameAs has LinkedIn only. |
| Domain pages (7) | BreadcrumbList (`src/components/domain/DomainShared.tsx:73-105`) | Valid apart from the host. |
| `/interoperability` | + Service with OfferCatalog (`InteroperabilityPageView.tsx:58`) | Good. It is the only domain page with Service. |
| News articles (57) | NewsArticle + BreadcrumbList | Has headline, image, datePublished, author and publisher. Issues: image host is 404 (C1); covers are under 1200 px wide (FAWE 1080×810, BIDPA 800×1067 portrait); `dateModified` always equals `datePublished`; author is an Organization (a Person with a profile URL is preferred). |
| Portfolio case | Article + BreadcrumbList + VideoObject | VideoObject is complete (name, description, thumbnailUrl, uploadDate, duration, embedUrl, contentUrl). Article image is the YouTube thumbnail, which is acceptable. |
| `/news`, `/portfolio` indexes | Organization and WebSite only | Missing BreadcrumbList and CollectionPage/ItemList. |

**Opportunities, all on built pages:**
1. Add `Service` (and `provider: {"@id": ".../#organization"}`) to the other 6 domain pages, reusing the interoperability pattern.
2. Emit one `@graph` with `Organization` `@id` `…/#organization` and `WebSite` `@id` `…/#website`, and reference them from publisher, provider and author.
3. Add a `Person` for named team members on news pieces where they speak, e.g. TICON Africa.
4. Add a 1200×675 (16:9) crop of each news cover to `image[]`.

Do not add FAQPage or HowTo; Google has retired both.

## Performance detail (lab proxy, not field data)

- **PSI API:** HTTP 429, daily quota exceeded for the shared anonymous key.
- **Lighthouse CLI:** not installed, and nothing was installed per the read-only scope.
- **CrUX:** not checked (no key). The domain is new, so field data is probably sparse.

| Signal | `/` | `/interoperability` | News article |
|---|---|---|---|
| TTFB | 0.32–0.45 s | 0.09 s | 0.07 s |
| HTML (Brotli / decoded) | 26 KB / 199 KB | — / 151 KB | — / 95 KB |
| JS chunks (decoded) | 14 (909 KB; 297 KB br) | 17 (934 KB) | 13 (737 KB) |
| CSS | 1 file, 72 KB | 1 file, 72 KB | 1 file, 72 KB |
| Fonts | 2 preloaded woff2 (110 KB), `display: swap` | same | same |
| Images | 32 (all WebP, srcset, 31 lazy) | 2 | 4 (cover not lazy, preloaded) |
| DOM elements | ~750 | ~902 | ~223 |

- **LCP:** TTFB is good. The risk is element render delay from M4 (hero gated on JS).
- **CLS:** low risk. Every image has width/height or fill, and fonts use swap with next/font size-adjust.
- **INP:** moderate risk from GSAP ScrollTrigger and DOM size.

**Re-run when the quota resets:** `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.arxia.global%2F&strategy=mobile` (with an API key).

## Images detail

- **Alt text:** 612 images, 0 missing alt.
- **Format:** WebP via next/image (`formats: ["image/webp"]`). Source JPEG covers are 116–126 KB, and optimizer output is at or under 188 KB at w=3840.
- **OG image:** `/opengraph-image` returns 200, PNG, **1200×630**, 60 KB. Correct, but not referenced by any page (H2).
- **News OG images:** point to arxia.com (404, C1). The source covers are not 1.91:1 (1080×810, 800×1067), so they get cropped unpredictably on LinkedIn and X. Add `coverOg` 1200×630 crops.
- **LCP image hints:** no `fetchpriority="high"` anywhere. The news cover uses `priority`, which emits a preload, so that is acceptable.

---

## Quick wins (under 1 day total)

1. **One constant fixes C1, C2 and M6:** `SITE_URL` → `https://www.arxia.global` (or the env var) in `src/i18n/metadata.ts:3`, `layout.tsx:23`, `sitemap.ts:6` and `robots.ts:3`. Remove `host` from `robots.ts:15`.
2. **Fix the brand-domain redirect (C3):** change the arxia.com redirect from 302 root-only to a 301/308 that keeps the path (Apache `RedirectMatch 301`, or add the domain to Vercel as a redirect).
3. **Submit the sitemap:** `https://www.arxia.global/sitemap.xml` in Search Console and Bing.
4. **OG image (part of H2):** move `src/app/opengraph-image.tsx` → `src/app/[locale]/opengraph-image.tsx`, and add a shared `pageOpenGraph` / `twitter` helper (H2, H3).
5. **One hreflang source (H1):** set `alternateLinks: false` in `src/i18n/routing.ts`.
6. **Honest lastmod (M1):** use real dates in `sitemap.ts` (`isoDate`, `publishedAt`).
7. **Fix the redirecting link (L3):** `src/data/news.ts:685` `/process` → `/e-services`.
8. **Noindex untranslated legal pages (L1):** apply to the es/fr locales.

## Recommendations for upcoming pages

New domain, service and vertical pages should:

- **Use the shared helpers.**
  - Get metadata from `alternatesFor()` plus the new `pageOpenGraph()` helper. Never hard-code a host.
  - Every page sets its own `openGraph.url`, `openGraph.images` and `twitter`.
- **Carry a real `metaTitle` per locale:** 45–60 characters, search term first, then "— Arxia". This should be separate from the display name or H1. Translate the term in es/fr; do not reuse English loanwords as the only title.
- **Write a description per locale:** 120–155 characters, specific to the page, without opening with the title.
- **Emit `BreadcrumbList` and `Service`** (with OfferCatalog where services are listed), using the `/interoperability` implementation as the template. `provider` should reference the Organization `@id`.
- **Keep the H1 and hero text out of `.animate-on-scroll`,** so first paint is not gated on JS (M4). Reserve GSAP for below-the-fold sections and load it lazily.
- **Get added to `sitemap.ts` only when the page is live and translated,** with a real `lastModified`.
- **Handle unbuilt pages correctly.** A page that is not ready should `notFound()` (404) rather than ship a 200 stub, and should stay out of the sitemap. Today no stub pages are exposed: all 95 sitemap URLs are built pages.
- **Never ship partially translated locales.** If es/fr copy is not ready, do not emit the `/es` or `/fr` route or its hreflang entry (see L1).
- **Images:** next/image with explicit sizes and descriptive alt. Provide a 1200×630 OG crop and a ≥1200 px-wide 16:9 image for Article/Service schema.

## Not verified

- Google and Bing index status of arxia.global versus arxia.com (no GSC or Bing access).
- CrUX field data and lab CWV (PSI was rate-limited).
- The legacy TYPO3 URL inventory on arxia.com and the backlinks pointing to it.
- Whether Vercel preview URLs (`*.vercel.app`) are protected from indexing.
