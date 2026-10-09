# Arxia Webpage

## Main Page Structure

### 1. Hero Section
Animated headline: **Digital [rotating word]**

Rotating words (in sequence):
- Transformation
- Public Infrastructure
- Development
- Ecosystems
- Sovereignty
- Public Goods

### 2. Client Logo Carousel
Slow-scrolling horizontal carousel of client logos. Placeholders — to be populated with actual client logos.

### 3. Introduction
- **Headline:** Who We Are
- **Body:** Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and the ecosystems around them — while empowering local ecosystems through capacity building, consultancy, and co-building the building blocks of their digital independence.

### 4. Our Domains of Expertise

| Domain | Description | Button |
|--------|-------------|--------|
| **e-Government and Govtech** | We design and implement citizen-centric digital services that modernize public administration, improve transparency, and reduce bureaucratic friction — making government work better for everyone. | Explore e-Government → |
| **Interoperability and Standardization** | We build the connective tissue between systems — enabling seamless data exchange across institutions, borders, and platforms through open standards and robust integration frameworks. | Explore Interoperability → |
| **Artificial Intelligence** | We deploy AI solutions that augment public sector capabilities — from intelligent document processing to predictive analytics — always with transparency, ethics, and local ownership at the core. | Explore AI → |
| **e-Procurement** | We implement end-to-end electronic procurement systems that increase competition, reduce corruption, and deliver better value for public spending — from tender publication to contract management. | Explore e-Procurement → |
| **e-Invoicing** | We design and deploy electronic invoicing infrastructure that streamlines tax compliance, reduces fraud, and accelerates payment cycles for governments and businesses alike. | Explore e-Invoicing → |
| **Web Portals** | We create unified digital gateways — citizen portals, service directories, and institutional websites — that consolidate access to public services and information in one intuitive experience. | Explore Web Portals → |
| **Ecosystem Building** | We strengthen local tech ecosystems through knowledge transfer, training programs, and partnerships that ensure countries can build, maintain, and evolve their own digital infrastructure. | Explore Ecosystem Building → |

### 5. Our Global Presence
A world map showing Arxia's global presence.

### 6. Our Portfolio
- **Headline:** Our Portfolio
- **Subheadline:** Selected projects that define what we do
- 6 portfolio cases with lorem ipsum placeholders (Alpha through Zeta)
- Button: View Full Portfolio →

### 7. News Section
- **Headline:** Latest News
- 3 news articles with lorem ipsum placeholders
- Button: All News →

### 8. Footer
Standard footer with navigation, contact info, social links, legal pages.

---

## Design & Technical Specification

### Technology Stack
- **Framework:** Next.js 14+ (App Router) — SSR/SSG for SEO, image optimization, route-based code splitting
- **Styling:** Tailwind CSS 4 + CSS custom properties for brand tokens
- **Typography:** Google Fonts — Inter + JetBrains Mono (preconnect + display=swap)
- **Icons:** Lucide React (tree-shakeable, proven in corporate deck)
- **Animations:** CSS transitions + Intersection Observer (no heavy libraries)
- **Deployment:** Static export or Vercel Edge

### Design Tokens

```css
:root {
  /* Color */
  --blueprint-blue: #162036;
  --blueprint-dark: #0D1520;
  --accent-red: #ED1C24;
  --gray-dark: #4A5568;
  --gray-medium: #A0AEC0;
  --gray-light: #E2E8F0;
  --gray-lightest: #F7FAFC;
  --white: #FFFFFF;
  --body-text: #171616;

  /* Typography Scale */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --text-hero: clamp(36px, 5vw, 72px);
  --text-h1: clamp(28px, 3.5vw, 48px);
  --text-h2: clamp(26px, 3vw, 36px);
  --text-h3: clamp(18px, 2vw, 24px);
  --text-body: 16px;
  --text-small: 14px;
  --text-caption: 12px;
  --text-annotation: 11px;

  /* Spacing (8px base unit) */
  --space-1: 8px;   --space-2: 16px;  --space-3: 24px;
  --space-4: 32px;  --space-5: 48px;  --space-6: 64px;
  --space-7: 80px;  --space-8: 100px; --space-9: 120px;

  /* Layout */
  --content-max: 1200px;
  --content-narrow: 720px;
  --margin-page: max(10%, 24px);
  --grid-columns: 12;
  --grid-gap: 24px;

  /* Motion */
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-entrance: 700ms;

  /* Elevation */
  --shadow-card: 0 2px 12px rgba(22, 32, 54, 0.04);
  --shadow-card-hover: 0 4px 20px rgba(22, 32, 54, 0.08);

  /* Blueprint Grid */
  --grid-minor: 20px;
  --grid-major: 100px;
}
```

### Layout System

- **Grid:** 12-column CSS Grid, `var(--grid-gap)` gutters, max-width 1200px centered
- **Page margins:** `max(10%, 24px)` on each side
- **Narrow content:** 720px max-width for introductions and CTAs
- **All spacing follows 8px base unit**

#### Vertical Spacing Rules
| Between | Spacing |
|---------|---------|
| Sections | 100–120px |
| Section label → heading | 16px |
| Heading → accent line | 16px |
| Accent line → body | 24px |
| Body paragraphs | 16px |
| Component groups | 48–64px |
| Cards internal padding | 24–32px |

#### Responsive Breakpoints
| Name | Width | Columns | Behavior |
|------|-------|---------|----------|
| Mobile | < 640px | 4 | Single-column, hamburger nav |
| Tablet | 640–1024px | 8 | 2-column grids, condensed nav |
| Desktop | 1024–1440px | 12 | Full layout |
| Wide | > 1440px | 12 (capped) | Content max-width holds, margins expand |

### Typography System

| Role | Font | Weight | Size | Line-Height | Letter-Spacing | Color |
|------|------|--------|------|-------------|----------------|-------|
| Hero headline | Inter | 300 | `--text-hero` | 1.1 | -1.5px | White (on dark) |
| Section heading | Inter | 700 | `--text-h2` | 1.2 | -0.5px | Blueprint Blue |
| Subsection heading | Inter | 600 | `--text-h3` | 1.3 | -0.3px | Blueprint Blue |
| Body text | Inter | 400 | `--text-body` | 1.7 | 0 | `#171616` |
| Body (on dark) | Inter | 400 | 18px | 1.8 | 0 | Gray Medium |
| Section annotation | JetBrains Mono | 400 | `--text-annotation` | 1.2 | 2.5px, uppercase | Gray Medium |
| Accent annotation | JetBrains Mono | 500 | `--text-annotation` | 1.2 | 2.5px, uppercase | Accent Red |
| Card title | Inter | 600 | 15–16px | 1.3 | 0 | Blueprint Blue |
| Card body | Inter | 400 | `--text-small` | 1.6 | 0 | Gray Dark |
| Tags / metadata | JetBrains Mono | 400 | 9–10px | 1.2 | 1–1.5px, uppercase | Gray Dark |
| Nav links | JetBrains Mono | 400 | 10px | 1 | 2px, uppercase | Gray Medium → White hover |
| CTA button | Inter | 600 | 15px | 1 | 0.3px | White |

- Max line length: 640px (light bg), 720px (dark bg)
- Never center-align body text longer than 3 lines
- Body text never shrinks below 16px

### Color Application Rules

#### Background Alternation
| Mode | Background | Grid Opacity | Text |
|------|-----------|-------------|------|
| Dark | `#0D1520` | White 2.5%/5% | White headings, Gray Medium body |
| Light | `#FFFFFF` | Gray Medium 12%/25% | Blueprint Blue headings, Body Text body |
| Ultra-light | `#F7FAFC` | Gray Medium 10%/20% | Blueprint Blue headings, Body Text body |

Alternation rhythm: Dark → Light → Ultra-light → Light → Dark (no consecutive darks)

#### Blueprint Grid (mandatory on every section)
Minor grid: every 20px (very subtle). Major grid: every 100px (slightly more visible).

#### Red Accent Budget: 3–8% maximum per viewport
Red is the **signature mark**, never the call to action.
Used for: accent lines (48×3px), connection dots (6–8px), bullet markers, map indicators, play glyphs, small mono annotations (via the text-safe tokens below).
Never for: backgrounds, body text, buttons or CTA fills, glows/shadows, large fills, card borders.

Text-safe red tokens (brand red `#ED1C24` itself fails AA as small text):
| Token | Hex | Use | Ratio |
|-------|-----|-----|-------|
| `accent-red` | `#ED1C24` | Graphic marks only (lines, dots, stripes) | n/a |
| `accent-red-bright` | `#F2585D` | Red text on dark surfaces | 5.53:1 on Blueprint Dark, 4.89:1 on Blueprint Blue |
| `accent-red-deep` | `#C8161D` | Red text on light surfaces | 5.85:1 on White, 5.58:1 on `#F7FAFC` |

Never apply opacity (`/85`) to red text: it drops below AA.

#### WCAG 2.1 AA Contrast (measured, WCAG relative luminance)
| Combination | Ratio | Rating |
|-------------|-------|--------|
| Blueprint Blue on White | 15.7:1 | AAA |
| White on Blueprint Dark | 18.1:1 | AAA |
| Body Text on White | 16.3:1 | AAA |
| Gray Dark on White | 7.53:1 | AAA |
| Gray Medium on Blueprint Dark | 8.13:1 | AAA |
| Gray Medium on White | **2.26:1** | **Fails — never use on light surfaces; use Gray Dark** |
| Brand Red on Blueprint Dark | 4.18:1 | Fails for small text — use `accent-red-bright` |
| Brand Red on White | 4.0:1 | Fails for small text — use `accent-red-deep` |
| White on Brand Red | 4.38:1 | Fails — no red button fills |

Red and Gray Medium are never used for body text. Gray Medium is for dark surfaces only.

### Component Library

#### Navigation Bar
- Fixed top, ~56px height, Blueprint Dark 92% opacity + backdrop-filter blur(12px)
- Logo: left, SVG 28px height. Links: right, JetBrains Mono 10px uppercase, 28px gap
- Mobile (< 768px): hamburger menu, full-screen overlay panel
- States: Gray Medium → White on hover, 200ms transition

#### Section Container
- `padding: var(--space-8) var(--margin-page)` (100px vertical, 10%+ horizontal)
- Blueprint grid background always present
- `min-height: 100vh` for hero sections, `auto` for content sections

#### Corner Registration Marks
- L-shaped, 24×24px, 1px Gray Medium at 30% opacity, 24px inset
- Used on hero, statement, and CTA sections only (not every section)

#### Section Header Pattern (every content section)
```
[annotation]    ← JetBrains Mono 11px uppercase, 2.5px tracking
[heading]       ← Inter Bold, Blueprint Blue
[accent-line]   ← 48px × 3px, Digital Red
[body]          ← Inter Regular 16px, max-width 640px
```
Left-aligned default. Center-aligned for statement sections on dark backgrounds.

#### Cards
- White bg, 1px `--gray-light` border, NO border-radius (sharp = architectural)
- Padding: 24–28px
- Hover: border darkens + shadow, 300ms
- Optional: 3px left-border accent in red or blue

#### Metric Cards (stacked)
- Blueprint Blue bg, Inter Bold 42px white number, JetBrains Mono 11px label
- Stack vertically, 1px white-opacity border between, red dot connectors
- First card: top-rounded 6px; last card: bottom-rounded 6px

#### Buttons
One CTA system, implemented in `src/components/ui/Button.tsx` — use it, don't hand-roll buttons.
- **Primary CTA (light surface):** Blueprint Blue bg, white text, Inter Semi 15px, 14px 36px padding, no border-radius. Hover: darken + translateY(-1px). Focus: 2px Blueprint Blue outline. Min 48px height.
- **Primary CTA (dark surface, `<Button dark>`):** White bg, Blueprint Dark text; hover Gray Light. A Blueprint Blue fill on Blueprint Dark all but vanishes — never use it there.
- **Secondary/Ghost:** 1px Blueprint Blue border (white/60 on dark), transparent bg. Hover: 5% fill.
- **Text Link:** JetBrains Mono 11px, `accent-red-bright` on dark / `accent-red-deep` on light; hover to white / Blueprint Blue.

#### Tags/Pills
- JetBrains Mono 9px uppercase, 1px tracking, 3px 8px padding
- `--gray-lightest` bg, 1px `--gray-light` border, `--gray-dark` text, no radius

#### Icon System
- Lucide icons as inline SVG, 1.5px stroke, Blueprint Blue, no fill
- Container: square 36–44px, 1px gray-light border, icon 20–22px centered
- Always paired with text label

### Interaction Patterns

#### Scroll Animations
- Intersection Observer, threshold 0.15, trigger once
- Default: opacity 0→1, translateY(30→0), 700ms ease
- Stagger siblings by 100ms
- Accent line: width 0→48px (draw-in)
- **Never on above-the-fold content or the page's H1/LCP element.** The hero H1 renders at full opacity from the server HTML; hero supporting elements use the CSS-only `.hero-enter` entrance (no JS, no observer).

#### Motion that must be pausable
- Anything that moves for more than 5 seconds (logo marquee) needs a visible Pause control (WCAG 2.2.2), must stop under `prefers-reduced-motion`, and must not run off-screen or in a hidden tab.

#### Hover States (required on all interactive elements)
| Element | Effect | Duration |
|---------|--------|----------|
| Nav links | Gray Medium → White | 200ms |
| Cards | Border darken + shadow | 300ms |
| CTA button | Bg darken + translateY(-1px) | 200ms |
| Map dots | Radius increase | 300ms |

#### Focus States
- `:focus-visible` on all controls: 2px solid outline, 2px offset
- White outline on dark bg, Blueprint Blue on light bg

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Responsive Behavior

#### Grid Collapse
| Desktop | Tablet | Mobile |
|---------|--------|--------|
| 3-col card grids | 2-col | 1-col stacked |
| 2-col text+visual | 2-col narrow | Stacked, visual below |
| 4-phase horizontal | 2×2 grid | Vertical stack |
| Horizontal carousel | Narrower | Smaller logos |

#### Mobile-Specific
- Section padding: 60px vertical, 24px horizontal
- Cards go full-width with 16px margin
- Blueprint grid opacity reduces 30%
- Corner marks hidden (< 640px)
- Touch targets: 44×44px minimum

### Performance Targets
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 800KB first load |
| JS, framework baseline | ~165KB gzipped (React DOM + Next.js runtime; fixed cost) |
| JS, app code per page | < 90KB gzipped on top of the baseline (total ≈ 255KB) |

JS rules that keep app code inside budget:
- Client components never import localized data modules (`portfolio`, `case-studies`, `domain-pages`, `news`): server pages resolve one locale and pass props (see `getDomainPageProps`). Client-side helpers that need only slugs live in `case-study-links.ts`.
- No animation library for scroll effects; native IntersectionObserver / rAF.

#### Site-wide sources of truth
- Company facts (legal identity, founding year, headline figures): `src/data/company.ts` — never hard-code years or counts.
- Canonical origin: `SITE_URL` in `src/i18n/metadata.ts` (env `NEXT_PUBLIC_SITE_URL`).
- Per-page SEO/OG metadata: `pageMetadata()` in `src/i18n/metadata.ts`.

### Accessibility Requirements
- WCAG 2.1 AA contrast minimum (AAA preferred for body text)
- Full keyboard tab-through of all interactive elements
- Semantic HTML5, ARIA landmarks, alt text on all images
- `prefers-reduced-motion` fully respected
- Strict h1 → h2 → h3 heading hierarchy, one h1 per page
- `lang="en"` on `<html>`

### Section Completion Checklist
Before any section is done, verify:
1. Blueprint grid visible in background
2. Margins 10%+ on all sides
3. Only Inter + JetBrains Mono at approved weights
4. All colors match exact hex values
5. Red accent under 8% of viewport
6. Spacing follows 8px base unit
7. Annotations in JetBrains Mono uppercase
8. 48×3px red accent line under section headings
9. WCAG AA contrast on all text
10. No border-radius on cards or buttons (sharp = architectural)
11. Hover/focus states on all interactive elements
12. Content readable without JavaScript

---

## Status

- **Current phase:** Built and live. Next.js 16 App Router, internationalized
  (en at the root, `/es` and `/fr` prefixed), deployed on Vercel from `main`.

### Current information architecture (authoritative)

Arxia is focused entirely on **Digital Public Infrastructure and the digital
transformation of government**. The site is organized around **seven domains of
expertise**, each with its own top-level page.

**"Digital Public Infrastructure & Digital Transformation" is the UMBRELLA, not
a domain.** It is what the seven add up to — never a plate, never a page, never
a footer link. It lives in the `#expertise` section annotation
(`Domains.annotation`). It was briefly modelled as domain 01; that was wrong,
which is why the numbering starts at interoperability. `/digital-transformation`
301s to `/#expertise`.

**Interoperability is the core** — the practice the other six route through —
and is treated as such visually and in the content, not as a peer.

| # | Route | Domain |
|---|-------|--------|
| 01 | `/interoperability` | **Full-stack interoperability** (core) |
| 02 | `/data-governance` | Data governance |
| 03 | `/e-procurement` | e-Procurement |
| 04 | `/e-invoicing` | e-Invoicing |
| 05 | `/web-portals` | Government web portals |
| 06 | `/agentic-state` | Agentic state |
| 07 | `/e-services` | e-Services |

**Homepage flow:** Hero → client carousel → `#expertise` domain plate → global
presence → portfolio → news → contact. There is deliberately **nothing between
the hero and the domains** — no "who we are" interlude.

**Hero (Oct 2026, after CEO review: "too sparse and grim, put more content
above the fold").** Server component (`Hero.tsx`) inside a client animation
shell (`HeroShell.tsx`). First screen carries: practice annotation, H1, a
claim line ("We are experts in Digital Transformation.") and its paragraph,
two CTAs (*Let's talk* → `#contact`, *View the portfolio*), the building-blocks
figure, and a figures bar (countries, organizations). Figures come from
`company.figures`, static, no odometer. H1
is semibold, not the spec's 300. Pattern reference: id30.org.

**Building-blocks figure** (`src/components/figures/BuildingBlocksFigure.tsx`):
an isometric tower of seven slabs drawn like an architectural elevation, each
practice lettered on its long wall (Interoperability at the base with the red
edge, Artificial intelligence on top). Digital public infrastructure labels
the ground axis, e-Governance the vertical axis. CSS-only build-up (`.bb-*` in
globals.css), plays once and ends inside 5s so it needs no pause control, and
is skipped under reduced motion. Hidden below `sm`.

**Copy rules (CEO, Oct 2026).**
- **No founding-year claims.** No "since 1996", "30 years", "working with
  governments since…". Incorporation is 1996 but there was no activity until
  2000 and today's business is much newer. `company.foundingDate` exists for
  schema.org only. The portfolio is the proof.
- **Neutral addressing.** Don't address "you/your" as if the reader were a
  government ("your digital independence"). Governments mostly can't hire
  Arxia directly. The audience is a range of actors who should come to trust
  Arxia and propose a partnership.
- **Don't narrow the audience.** No lists like "we work with governments,
  international organizations, donors…": a consultancy from Tanzania reads it
  and leaves. Name the kinds of enquiry (a project, a tender, a joint bid, an
  idea) instead of the kinds of client.
- **No semicolons in copy.** Rewrite them as two sentences or a comma.
- **Offices ≠ project countries.** `company.offices` (Cluj-Napoca HQ, Santiago,
  Kampala) is shown separately from the "countries with delivered projects"
  list in `GlobalPresence`. Never merge the two.

### One-screen section rhythm (supersedes the 100–120px rule above)

Every content section lands on **a single screen at 100% zoom**, and must keep
doing so on a short laptop viewport (~700px), not just on a 900px one. This
replaces the 100–120px section padding in the spec above.

- `SectionContainer` takes `fitScreen`: `min-h-svh`, content vertically
  centred, padding `clamp(40px, 7vh, 80px)` top / `clamp(32px, 6vh, 72px)`
  bottom. The vh term governs normal screens; the low floors stop a short
  viewport from spending a sixth of the screen on padding. `svh` so mobile
  browser chrome can't push content out of view; `min-height` so short
  viewports grow rather than clip.
- **Anything with a fixed aspect ratio must also be capped against `vh`**, or
  it decides on its own whether the section fits. This is the rule that gets
  forgotten: the globe (`min(460px,44vh)`), the anchor figure
  (`min(250px,27vh)`) and the news cover (`max-h-[20vh]`) are all capped this
  way. A width-driven `aspect-square` is pure vertical cost on a short screen.
- Internal rhythm inside a fitScreen section: header margin `mb-6`–`mb-8`,
  grid gaps `gap-4`–`gap-5`, card padding `p-5`–`p-6`.
- Teaser copy is **clamped**, not shortened at the source: portfolio blurbs
  clamp to 2 lines, news excerpts to 2. The full text lives on the destination
  page.
- **Never put `line-clamp` and `flex-1` on the same element.** The clamp sets
  `display:-webkit-box`; `flex-1` then grows the box past the clamp, so extra
  lines render and get cut as ragged half-lines. Clamp the text, grow a
  wrapper around it. This shipped as a visible bug on the portfolio cards.
- **Composition beats trimming.** `#presence` overflowed because it stacked
  header / [countries | globe] / stats — a 500px globe plus ~220px of chrome.
  Moving the header and stats INTO the left column, beside the globe, fixed it
  outright. Prefer that move over shaving pixels.
- One row of cards, not two: `#portfolio` shows four featured projects in a
  single row. Two rows cannot fit a one-screen section at ~760px once the
  header and CTA are counted.
- `Portfolio.tsx` predates `SectionContainer` and reproduces the fitScreen
  padding inline — **keep the two in step.**

Measured, every section at 1.00 screens: 1920×1080, 1920×900, 1536×864,
1536×760, 1280×1024. At the extreme 1536×700, `#expertise` is 1.01 and the
rest are 1.00. Since the Oct 2026 hero rework (EN measured 1.00 everywhere,
including 1366×700 and 1280×720), Spanish and French run long on short laptop
screens: the hero is 1.04–1.08 (three-line H1, longer lede) and `#expertise`
1.02–1.05 at ≤760px tall. Mobile is exempt by design — seven stacked plates cannot fit a
phone screen, and `min-height` correctly lets the section grow. Re-measure
after any section change; the useful probe is section height ÷ `innerHeight`.

**Domain plate design** (`DomainsGrid.tsx`): a 5×2 drafting grid. The anchor
(interoperability) holds the left two columns as a 2×2 Blueprint Blue plate
with a six-spoke node schematic — one spoke per surrounding domain. The six
white satellites read top-down: **number and icon, name, one-line
description, three keyword tags (`scope` in expertise-domains), and a
permanent "Read more" footer**. Names sit right under the header so they line
up across a row. Tags hide below 880px viewport height; the description clamps
to three lines below 800px, so every section still fits one screen.

**Opening a domain (Oct 2026).** Clicking a plate opens it into a Blueprint
Blue panel across four columns (introduction, up to four headline offers,
*Explore {domain}* and *See the projects*); the other six become compact tabs
in column 5. The section keeps its height. Layout is CSS
(`.domain-grid[data-open]` in globals.css); the move is a View Transition
(each `li` has its own `view-transition-name`), instant under reduced motion
or without the API. Below lg the open domain spans the full width in place.
Before hydration the plates are links to the domain pages. All seven panels
are in the server HTML (indexable: ~840 words in EN), each in a wrapper that
is `hidden` from the server and upgraded to `hidden="until-found"` after
hydration (React only knows `hidden` as a boolean), so the browser's
find-in-page can match their text; the wrapper's `beforematch` event opens
that domain without taking focus from the find bar. Intros live in
`src/data/domain-intros.ts` (en/es/fr, server-only); offers come from
`getDomainHighlights()` (layers or tracks where a page has them). The homepage
resolves both per locale and passes them as props, so no locale's copy ships
to the client. Measured: every domain fits one screen at ≥720px tall in EN;
FR runs up to 1.10 at 1366×700. Motion is three layers (construction set-out sweep → plates
materialise with registration marks → schematic draws itself, then the core
pulses), all keyed off `.visible` so `prefers-reduced-motion` is honoured by
the existing rules in globals.css.

**Data model.** `src/data/expertise-domains.ts` is the single source of truth
for domain identity (slug, plate number, name, description, icon, core flag),
localized via `src/data/i18n/expertise-domains.{es,fr}.ts`.
`src/data/domain-pages.ts` holds only what each page adds — the offer
catalogue, featured cases, and curated `relatedSlugs`. `getDomainPage()` merges
the two. Never duplicate name/description into domain-pages.

**Page structure.** Six domains share `DomainPageView`: hero + breadcrumb →
offer categories (Consultancy / Services / Products / Trainings) → key cases →
related domains (a curated three) → CTA.

**Key cases (every domain page).** `DomainFeaturedCases` shows the first
**three** of the page's curated `featuredCases`, as the homepage portfolio
plates (`src/components/portfolio/ProjectCard.tsx`), plus a "See more" that
opens `/portfolio?domain=<portfolioCategory>#projects`. Each domain-pages entry
names its `portfolioCategory` (e.g. e-procurement → `public-procurement`).
`/portfolio` reads `?domain=` after mount and narrows to that category (filter
bar + "show all"; the side/mobile navs switch the filter while one is set). It
is read client-side on purpose: the static HTML keeps every category for
crawlers and no-JS readers. Order `featuredCases` by weight — only three show.

**`/interoperability` has its own view** (`src/components/domain/interop/`),
because its pitch is the layer model, not a list of offer kinds: hero with the
labelled stack → why full-stack (the "seams" argument + EIF-aligned stack) →
L03 Strategy & Governance → L02 Standards & Semantics → L01 Exchange &
Integration → how we engage (Assess / Design / Build / Sustain, with the
layers each phase touches) → key cases → related → CTA. Every content section is `fitScreen`. Each layer section is header (with
a "you are here" stack marker) over figure | four offer cards. Its offers live
in the opt-in `layers` field of its `domain-pages.ts` entry (four per layer,
matching the 2026 capability brochure); the strategies workshop stays in
`categories` (Trainings) and is shown under Sustain. Shared pieces (breadcrumb, related, JSON-LD, CTA, rail) come from
`DomainShared.tsx`/`DomainCTA.tsx`, so neither view forks the other. The
L01–L03 isometric stack is one component, `src/components/figures/IsoStack.tsx`,
used by the homepage anchor plate, this hero and the per-layer markers.

Brochure claims deliberately **not** on the page, because no portfolio record
backs them yet: the CEN / European Commission "seat" and the EU eInvoicing /
eProcurement standards work (CEN/ASRO), a Senegal national/health
interoperability framework (2026), Health as an interoperability sector, the
"Regional Minerals DataVault" name (the portfolio has the 12-state platform's
architecture and requirements, not a live system), the Romania public-private
services platform, and "the only partner" superlative. Add the portfolio
record first, then the claim.

**Nav** carries a single `Domains` entry to `/#expertise`; the footer
enumerates all seven.

**History — do not reintroduce.** Three earlier models were retired:
1. A two-vertical brand split (*Arxia Govtech* | *Arxia Industries*) crossed
   with three domains — a 2×3 matrix at
   `/{govtech,industries}/{data,process,intelligence}`.
2. A three-division model (Data · Process · Intelligence) at `/data`,
   `/process`, `/intelligence`, which buried the individual offers.
3. An eight-domain set that wrongly included the DPI/Digital-Transformation
   umbrella as domain 01.
All of those URLs 301 to the current domain routes — see `next.config.mjs`,
which documents every generation. The "Main Page Structure" and "Our Domains of
Expertise" sections at the top of this file are the **original 2025 design
spec** describing a still-earlier seven-domain model; they are kept for
historical reference and no longer reflect the built site. The design-token and
component sections between them ARE current, except where this section
supersedes them.

**Known content gaps.** Offer counts per domain: interoperability 13 (12 layer
offers + the workshop), agentic-state 10 (gained inter-institutional-workflows
from interoperability), e-services 8, web-portals 4, data-governance 3,
e-procurement 3, e-invoicing 2. The last three are thin and want more per-offer
content. `ecosystem-capacity` ("Ecosystem Internationalization and Value
Proposition") currently sits under e-services Trainings and is the one offer
without a natural home now that ecosystem building is not a domain — worth a
decision. `src/data/portfolio.ts` also still carries the coarse
`data | process | intelligence` capability tag (`PortfolioCapability`);
retagging the 43 projects to the seven domains is a pending pass.
