# Arxia Webpage

The arxia.com marketing site — Next.js 16 app router, TypeScript, Tailwind CSS 4, GSAP for the pinned-scroll animations, Resend for the contact form, Plausible for analytics.

## Documentation map

New to this repo? Read in this order:

| Doc | What it covers |
| --- | --- |
| **This README** | Setup, scripts, env vars, deployment, content editing, pre-launch checklist |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | How it fits together: the data-driven content model, routing, animation hooks, and "how do I add X" recipes. **Start here for your first code change.** |
| [`docs/IMAGE-PIPELINE.md`](./docs/IMAGE-PIPELINE.md) | How every illustration is generated and post-processed. Required reading before touching `scripts/` or adding/regenerating card artwork. |
| [`CLAUDE.md`](./CLAUDE.md) | The brand system: design tokens, colour rules, typography, and the section-by-section content spec. The authoritative design reference (despite the filename). |

---

## Prerequisites

- **Node.js 20+** (see [.nvmrc](./.nvmrc) — use `nvm use` if you have nvm)
- **npm** (the lockfile is `package-lock.json`)

## Local development

```bash
nvm use                 # picks up Node 20 from .nvmrc
npm install
cp .env.example .env.local
npm run dev             # → http://localhost:3000
```

Edit values in `.env.local` if you want the contact form / analytics to work locally. The site renders without them — the form will surface a "not configured" error and analytics will silently skip.

## Scripts

| Command            | What it does                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start dev server with Turbopack (port 3000)   |
| `npm run build`    | Production build (also runs TypeScript check) |
| `npm run start`    | Serve the production build                    |
| `npm run lint`     | Next.js lint                                  |
| `npm run typecheck`| Standalone `tsc --noEmit`                     |

## Environment variables

All variables are documented in [.env.example](./.env.example). Summary:

| Variable                       | Required? | Purpose                                                                                                  |
| ------------------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`               | Yes (prod)| Resend API key for the contact-form pipeline (`/api/contact`).                                           |
| `RESEND_FROM`                  | Yes (prod)| Verified sender, e.g. `"Arxia <contact@arxia.com>"`. Requires DKIM/SPF for `arxia.com` set up in Resend. |
| `CONTACT_RECIPIENTS`           | No        | Comma-separated override. Defaults to `carlos.parker@arxia.com,daniel.homorodean@arxia.com`.             |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No        | The domain registered at plausible.io (e.g. `arxia.com`). When unset, the script is not injected.        |

Server-only variables (no `NEXT_PUBLIC_` prefix) are never exposed to the client.

## Deployment

The site is a standard Next.js 16 app. The production build emits a runnable Node server.

```bash
npm ci                  # clean install from lockfile
npm run build           # → .next/
npm run start           # serves on $PORT (default 3000)
```

Notes for whoever runs this in prod:

- **Node 20+** is required. The `engines` field in `package.json` declares this.
- **`/api/contact`** is a Node-runtime route (uses the Resend SDK). It must run on a Node server, not a pure-static host. The rest of the site is statically generated at build time.
- Static assets are emitted under `.next/static/` and image files under `public/`. Put `public/` and `.next/` behind your reverse proxy / CDN as you would any Next.js app.
- The build produces 25 routes — see the build output for the static / SSG / dynamic breakdown.
- The contact form, OG image generation, and 404 handling all work without any third-party config; they degrade gracefully if env vars are missing.

If your deploy target prefers a minimized bundle, you can opt into Next's standalone output by adding `output: "standalone"` to [`next.config.mjs`](./next.config.mjs). Not enabled by default because it changes the on-disk layout in ways some platforms don't expect.

### Domain & DNS

When you point `arxia.com` at the server:

1. Verify the domain in Resend (or whichever email provider) and copy the SPF / DKIM / DMARC records into DNS.
2. Register the domain in Plausible (or your analytics tool) and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to match.
3. The canonical site URL `https://www.arxia.com` is hardcoded in [`sitemap.ts`](./src/app/sitemap.ts), [`robots.ts`](./src/app/robots.ts), and [`layout.tsx`](./src/app/layout.tsx) — update those if the canonical changes.

## Project structure

```
src/
  app/
    api/contact/          # Resend-backed contact form endpoint
    govtech/[domain]/     # /govtech/{data,process,intelligence}
    industries/[domain]/  # /industries/{data,process,intelligence}
    news/                 # News index + per-article routes
    portfolio/
    privacy/  terms/      # Legal page shells (placeholder copy)
    sandbox/              # Internal visual experiments — noindex via robots
    error.tsx             # Branded 500
    not-found.tsx         # Branded 404
    layout.tsx            # Root layout (Inter + JetBrains Mono, OG, Plausible)
    opengraph-image.tsx   # Default OG image (1200×630, on-brand)
    robots.ts  sitemap.ts # Static SEO routes
  components/
    layout/               # Navbar, Footer, LegalPage shell
    sections/             # Hero, Introduction, VerticalInMotion, ...
    domain/               # Domain-page building blocks
    ui/                   # SectionContainer, Button, CornerMarks, ...
  data/                   # Content is data, not JSX — see docs/ARCHITECTURE.md
    domain-pages.ts       # Source of truth for the 6 domain landing pages
    domains.ts            # 2×3 matrix (verticals × Data/Process/Intelligence)
    portfolio.ts          # Portfolio cases
    portfolio-domains.ts  # Portfolio filter taxonomy
    news.ts               # News articles (structured blocks, not raw HTML)
    clients.ts            # Homepage client-logo carousel
    navigation.ts         # Navbar + footer link structure
  hooks/                  # GSAP / scroll / motion hooks (see ARCHITECTURE.md)
  lib/utils.ts            # Shared helpers
scripts/                  # Illustration pipeline — see docs/IMAGE-PIPELINE.md
public/                   # Logos, illustrations, canonical paper textures
```

## Illustration / image pipeline

The service-card and domain illustrations are AI-generated line art,
deterministically composited onto a fixed "blueprint paper" surface so every
image matches. The tooling lives in `scripts/` (requires the `sharp`
devDependency) and the full procedure — including prompt templates, the
two surface modes, and the WebP-only delivery caveat — is documented in
[`docs/IMAGE-PIPELINE.md`](./docs/IMAGE-PIPELINE.md). Note:
`scripts/normalize-dark-bg.js` is **legacy** and superseded by
`scripts/composite-bg.js`; do not use it for new work.

## Key URLs

| Path                                | What                                                  |
| ----------------------------------- | ----------------------------------------------------- |
| `/`                                 | Home                                                  |
| `/govtech`                          | Govtech vertical landing                              |
| `/govtech/{data,process,intelligence}` | Domain pages (Govtech)                             |
| `/industries`                       | Industries vertical landing                           |
| `/industries/{data,process,intelligence}` | Domain pages (Industries)                       |
| `/portfolio`                        | Project portfolio with filters                        |
| `/news` · `/news/[slug]`            | News index + articles                                 |
| `/privacy` · `/terms`               | Legal pages (placeholder copy — legal review pending) |
| `/api/contact`                      | POST endpoint for the contact form                    |
| `/sitemap.xml` · `/robots.txt`      | Generated from `src/app/sitemap.ts` & `robots.ts`     |
| `/opengraph-image`                  | Default social-share image (1200×630, on-brand)       |

## Editing content

- **Domain page content** lives in [`src/data/domain-pages.ts`](./src/data/domain-pages.ts). Each of the six domain pages is one entry; categories (Consultancy / Services / Trainings / Products) and items are typed.
- **News articles** live in [`src/data/news.ts`](./src/data/news.ts) with cover images under `public/images/news/<slug>/`.
- **Portfolio cases** live in [`src/data/portfolio.ts`](./src/data/portfolio.ts).
- **Client logos** for the homepage carousel live in [`src/data/clients.ts`](./src/data/clients.ts) and assets under `public/logos/clients/`.

## Pre-launch checklist

Items that should land before public launch (none block this repo from being deployed; they're operational):

- [ ] Legal review of `/privacy` and `/terms` — current copy contains `[TODO]` markers for counsel.
- [ ] Resend domain verification for `arxia.com` + DNS records (SPF, DKIM, DMARC).
- [ ] `RESEND_API_KEY` + `RESEND_FROM` provisioned on the production environment.
- [ ] Plausible domain registered + `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set.
- [ ] Footer social icons: confirm or remove the Twitter/Email placeholders; confirm `Careers` strategy.
- [ ] Confirm the canonical URL in the SEO metadata files matches the final domain.
