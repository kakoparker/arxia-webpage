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
- **Body:** Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and strategic industries — while empowering local ecosystems through capacity building, consultancy, and co-building the building blocks of their digital independence.

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
Used for: accent lines (48×3px), connection dots (6–8px), bullet markers, map indicators.
Never for: backgrounds, body text, buttons, large fills, card borders.

#### WCAG 2.1 AA Contrast
| Combination | Ratio | Rating |
|-------------|-------|--------|
| Blueprint Blue on White | 15.7:1 | AAA |
| White on Blueprint Dark | 18.1:1 | AAA |
| Body Text on White | 16.3:1 | AAA |
| Gray Dark on White | 5.9:1 | AA |
| Gray Medium on White | 3.0:1 | Large text only |
| Red on White | 4.0:1 | Large text/icons only |

Red and Gray Medium are never used for body text.

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
- **Primary CTA:** Blueprint Blue bg, white text, Inter Semi 15px, 14px 36px padding, no border-radius. Hover: darken + translateY(-1px). Focus: 2px outline. Min 48px height.
- **Secondary/Ghost:** 1px Blueprint Blue border, transparent bg, Blueprint Blue text. Hover: 5% fill.
- **Text Link (dark):** JetBrains Mono 11px, Accent Red 85% opacity → 100% hover.

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
| JS bundle | < 150KB gzipped |

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
- **Current phase:** Design and technical specification approved. Next step: implementation.
