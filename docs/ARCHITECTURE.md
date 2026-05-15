# Architecture & onboarding

A practical map of how this site fits together and how to make the changes
you'll most often be asked for. Read this once before your first change.

For brand tokens, typography, colour rules, and the section-by-section content
spec, see [`../CLAUDE.md`](../CLAUDE.md). For artwork, see
[`IMAGE-PIPELINE.md`](./IMAGE-PIPELINE.md).

---

## Stack

| Concern        | Choice                                                            |
| -------------- | ----------------------------------------------------------------- |
| Framework      | Next.js 16, App Router, React 19, TypeScript                      |
| Styling        | Tailwind CSS 4 + CSS custom properties (brand tokens in CLAUDE.md) |
| Animation      | GSAP + ScrollTrigger, wrapped in hooks under `src/hooks/`         |
| Icons          | `lucide-react`                                                    |
| Globe          | `cobe` (homepage / presence section)                              |
| Contact email  | Resend SDK, Node-runtime route at `/api/contact`                  |
| Analytics      | Plausible (script injected only when env var set)                 |
| Hosting        | Any Node host; mostly SSG with one dynamic API route              |

## The one idea that explains the whole site

**Content is data, not JSX.** The marketing pages do not hardcode copy. Six
domain landing pages, the portfolio, the news section, the nav, and the client
carousel are all rendered from typed data files in `src/data/`. To change what
the site _says_, you almost always edit `src/data/*` — not a component.

```
src/data/
  domain-pages.ts      ← THE big one: all 6 /{govtech,industries}/{domain} pages
  domains.ts           ← the 2×3 vertical × domain matrix (cards, icons, blurbs)
  portfolio.ts         ← portfolio case studies
  portfolio-domains.ts ← portfolio filter taxonomy
  news.ts              ← news articles (body is structured blocks, not raw HTML)
  clients.ts           ← homepage logo carousel
  navigation.ts        ← navbar + footer link structure
```

A page component's job is layout + animation; it reads a data entry and renders
it. Keep that boundary — don't inline marketing copy into components.

## Routing

App Router, file-based. The two domain verticals share one dynamic segment each:

```
src/app/
  govtech/[domain]/page.tsx       → /govtech/{data,process,intelligence}
  industries/[domain]/page.tsx    → /industries/{data,process,intelligence}
  news/[slug]/page.tsx            → /news/<article-slug>
  api/contact/route.ts            → POST /api/contact (Node runtime)
  sitemap.ts robots.ts            → /sitemap.xml /robots.txt
  opengraph-image.tsx             → default social card
  error.tsx not-found.tsx         → branded 500 / 404
```

`[domain]` pages call `generateStaticParams` from the data, so all six are
statically generated at build. Adding a domain entry to `domain-pages.ts` is
enough to produce a new static route — no routing code to touch.

## Common tasks

### Edit copy on a domain page
Open `src/data/domain-pages.ts`. Each of the six pages is one object: hero text,
SEO metadata, and `categories[]` (Consultancy / Services / Trainings / Products),
each with `items[]`. Item shape: `{ slug, title, description, image?, isRoadmap? }`.
Section background mode (light/dark) is decided by category order — see
`src/components/domain/DomainPageView.tsx`.

### Add an illustration to a card
Generate it through the image pipeline, drop the `*-illustration.webp` under
`public/images/services/<vertical>-<domain>/`, and set the item's `image:` field
to that path. Full procedure: [`IMAGE-PIPELINE.md`](./IMAGE-PIPELINE.md).

### Add a news article
Append an entry to `src/data/news.ts` (the body is an array of typed blocks —
heading / paragraph / image / cta — not raw HTML) and put cover/inline images
under `public/images/news/<slug>/`. The index and `/news/[slug]` route pick it
up automatically.

### Add a portfolio case
Add to `src/data/portfolio.ts`; tag it with values from
`src/data/portfolio-domains.ts` so the filters work.

### Touch an animation
Don't call GSAP ad hoc. The reusable behaviour lives in `src/hooks/`:

| Hook                      | Use for                                              |
| ------------------------- | ---------------------------------------------------- |
| `useGsapScrollTrigger`    | Pinned / scroll-driven section timelines             |
| `useScrollAnimation`      | One-shot reveal-on-enter (IntersectionObserver)      |
| `useAnimationFrame`       | rAF loop (globe, continuous motion)                  |
| `useOdometer`             | Animated number count-ups                            |
| `useTextScramble`         | Decode/scramble text effect                          |
| `useMousePosition`        | Pointer-reactive elements                            |

Respect `prefers-reduced-motion` — the hooks and CLAUDE.md spec require it.

## Components

```
src/components/
  layout/    Navbar, Footer, LegalPage shell
  sections/  Home/vertical sections (Hero, Introduction, VerticalInMotion, …)
  domain/    Domain-page building blocks (DomainPageView, DomainCategorySection,
             DomainCTA) — the renderer for src/data/domain-pages.ts
  portfolio/ Portfolio grid + filters
  ui/        Primitives: SectionContainer, Button, CornerMarks, …
```

`src/lib/utils.ts` is shared helpers; `src/app/sandbox/*` is internal visual
experimentation, `noindex` via `robots.ts` — not production surface.

## Build, checks, CI

`npm run build` runs the TypeScript check as part of the Next build;
`npm run typecheck` is the standalone `tsc --noEmit`. CI
(`.github/workflows/ci.yml`) runs typecheck + build on every PR and push to
`main`, pinned to the Node version in `.nvmrc`. There is no test suite yet —
typecheck + build is the safety net, so keep the build green.

## Gotchas

- **AVIF is disabled on purpose.** `next.config.mjs` forces
  `images.formats: ["image/webp"]`. AVIF's encoder denoises the subtle
  blueprint grid out of the illustration backgrounds. Do not re-enable AVIF.
  See [`IMAGE-PIPELINE.md`](./IMAGE-PIPELINE.md).
- **Canonical URL is hardcoded** as `https://www.arxia.com` in `sitemap.ts`,
  `robots.ts`, and `layout.tsx`. Change all three together if the domain changes.
- **`sharp` is required by the image scripts** and declared in
  `devDependencies`. It is not used by the app at runtime.
- **Legal pages are placeholders.** `/privacy` and `/terms` contain `[TODO]`
  markers pending counsel — see the README pre-launch checklist.
