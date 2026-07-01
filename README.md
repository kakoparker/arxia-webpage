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

## Deployment (Vercel)

The site is a standard Next.js 16 App Router app and deploys to **Vercel with zero
configuration** — no `vercel.json`, no `Dockerfile`. Vercel detects Next.js, runs
`next build`, and serves the App Router automatically: static pages on the CDN,
`/api/contact` and the locale middleware as serverless/edge functions.

### One-time setup

1. **Import the repo** into Vercel (New Project → import `kakoparker/arxia-webpage`).
   Framework preset **Next.js**; build/output/install commands are auto-detected —
   leave them at the defaults.
2. **Set environment variables** (Project → Settings → Environment Variables) for the
   **Production** (and Preview) environments — see the table above:

   | Variable | Value |
   | --- | --- |
   | `RESEND_API_KEY` | Resend API key (create at resend.com) |
   | `RESEND_FROM` | `Arxia <contact@arxia.com>` |
   | `CONTACT_RECIPIENTS` | *(optional)* comma-separated override; defaults to the two Arxia inboxes |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `arxia.com` *(omit to skip analytics)* |

   `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is read at **build time** — redeploy after changing
   it. The `RESEND_*` values are read at request time.
3. **Add the domain** `www.arxia.com` (with `arxia.com` redirecting to `www`) under
   Project → Settings → Domains and point DNS at Vercel per its instructions. TLS is
   issued automatically.

Every push to `main` triggers a production deploy; every PR gets a preview URL. A
failing `next build` blocks the deploy, and the repo's
[CI workflow](./.github/workflows/ci.yml) runs the same `build + typecheck` gate on
pushes and PRs.

### Email & analytics DNS

1. Verify `arxia.com` in Resend and add the SPF / DKIM / DMARC records it provides to
   DNS, so `RESEND_FROM` can send from an `@arxia.com` address. Step-by-step records and
   gotchas: **[`docs/DNS-SETUP.md`](./docs/DNS-SETUP.md)**.
2. Register `arxia.com` in Plausible and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to match.

> The canonical site URL `https://www.arxia.com` is hardcoded in
> [`sitemap.ts`](./src/app/sitemap.ts), [`robots.ts`](./src/app/robots.ts), and
> [`layout.tsx`](./src/app/[locale]/layout.tsx) — update those three if the canonical
> domain ever changes.

## Project structure

```
src/
  app/
    [locale]/             # Locale-scoped app tree (en at root; /es, /fr prefixed)
      govtech/[domain]/   # /govtech/{data,process,intelligence}
      industries/[domain]/# /industries/{data,process,intelligence}
      news/               # News index + per-article routes
      portfolio/
      privacy/  terms/    # Legal pages (GDPR-aware copy — see note below)
      layout.tsx          # Locale layout (Inter + JetBrains Mono, OG, Plausible)
      error.tsx           # Branded 500
      not-found.tsx       # Branded 404
    api/contact/          # Resend-backed contact form endpoint
    opengraph-image.tsx   # Default OG image (1200×630, on-brand)
    manifest.ts           # PWA web manifest
    robots.ts  sitemap.ts # Static SEO routes
  i18n/                   # next-intl routing, request config, nav helpers
  middleware.ts           # Locale middleware
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
| `/privacy` · `/terms`               | Legal pages (GDPR-aware copy; recommend counsel review) |
| `/api/contact`                      | POST endpoint for the contact form                    |
| `/sitemap.xml` · `/robots.txt`      | Generated from `src/app/sitemap.ts` & `robots.ts`     |
| `/opengraph-image`                  | Default social-share image (1200×630, on-brand)       |

## Editing content

- **Domain page content** lives in [`src/data/domain-pages.ts`](./src/data/domain-pages.ts). Each of the six domain pages is one entry; categories (Consultancy / Services / Trainings / Products) and items are typed.
- **News articles** live in [`src/data/news.ts`](./src/data/news.ts) with cover images under `public/images/news/<slug>/`.
- **Portfolio cases** live in [`src/data/portfolio.ts`](./src/data/portfolio.ts).
- **Client logos** for the homepage carousel live in [`src/data/clients.ts`](./src/data/clients.ts) and assets under `public/logos/clients/`.

## Pre-launch checklist

Operational items to complete on the hosting/DNS side (none block the code from deploying):

- [ ] Counsel review of `/privacy` and `/terms` — copy is complete and GDPR-aware, but confirm the legal entity (Arxia S.R.L.), registered address, and governing law before relying on it.
- [ ] Resend domain verification for `arxia.com` + DNS records (SPF, DKIM, DMARC).
- [ ] `RESEND_API_KEY` + `RESEND_FROM` set in Vercel → Project → Settings → Environment Variables.
- [ ] Plausible domain registered + `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set in Vercel.
- [ ] `www.arxia.com` added under Vercel → Domains with DNS pointed at Vercel.
- [ ] Confirm the canonical URL in the SEO metadata files matches the final domain.
