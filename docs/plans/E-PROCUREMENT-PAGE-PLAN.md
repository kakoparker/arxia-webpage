# /e-procurement: structure and content plan

**Status:** built on this branch (2026-10-07) after the owner decisions in §9. Where the build differs from the draft below, §9 and the code are authoritative.
**Branch:** `claude/e-procurement-subpage-b9af1d`, reset to `main` @ `5661d31`.
**Template:** `/interoperability`, which the audit names as the page to copy (`docs/audit/AUDIT-REPORT.md` §4.1 and §5).

---

## 1. The idea in one line

> Most governments buy an e-procurement platform first and fix the law, the procedures and the people afterwards. The platform then digitises the old paper process. Arxia does it in the other order: **reform, then people, then platform**, as one programme. ProcessPlayer is the platform at the end of that sequence, not the headline.

On `/interoperability` the stack (L03 → L01) is what the page is built around. On `/e-procurement` it's **the programme**: three tracks that start in sequence and then overlap.

| # | Track | What it settles | Kind of work |
|---|-------|-----------------|--------------|
| 01 | **Reform** | The rules and the process before the software | Consultancy |
| 02 | **People** | The officers, trainers and suppliers who will run it | Capacity building |
| 03 | **Platform** | The system that makes every step traceable | ProcessPlayer, implementation |

The numbering goes up (01 → 03) because this is a sequence over time, not a stack. Offers are numbered by their track (01.1, 01.2 … 03.4). That gives the page **one numbering system**, which fixes the audit's "two numbering systems on /interoperability" finding (§3.D) on this page.

---

## 2. What stays the same as /interoperability

These are the interop conventions this page has to keep, so all subpages look like one family:

- Every content section is `fitScreen`: one screen at 100% zoom, down to a viewport about 700px tall.
- Compact section header: mono annotation (never red), H2, a 48×3 red line, optional body. Today that's `InteropHeader`; I'll promote it to a shared component (§8).
- Drafting-style inline SVG figures: Blueprint Blue line work, white plates, red used only for nodes and the line that carries the meaning. They are `aria-hidden` because the cards beside them carry the content. Entrance motion reuses the `.domain-iso-*` and `.interop-fig-*` classes, and reduced motion resolves to the end state.
- Square cards with a 36px icon box, title, a mono figure number in the corner, and gray body text.
- A scroll progress rail, BreadcrumbList and Service JSON-LD, filtered featured cases, related domains, and the shared CTA.
- **No raster "blocks architecture" illustrations.** The three isometric WebP cards currently on this page (`eprocurement-strategy`, `eproc-implementation`, `processplayer` `-illustration-v2.webp`) are removed, and the figures are inline SVG instead.

---

## 3. Page structure

| # | Section | id / rail label | Mode | Figure |
|---|---------|-----------------|------|--------|
| 0 | Hero | (none) | dark | **Fig. 00** The programme |
| 1 | Why reform first | `approach` / Approach | light | Three tracks + red spine |
| 2 | Track 01 · Reform | `reform` / Reform | ultra-light | **Fig. 01** Process redesign swimlane |
| 3 | Track 02 · People | `people` / People | light | **Fig. 02** Training cascade |
| 4 | Track 03 · Platform | `platform` / Platform | ultra-light | **Fig. 03** Traceable lifecycle |
| 5 | ProcessPlayer in use | `in-use` / In use | light | Sourced metrics, sectors, logos, one testimonial |
| 6 | How we engage | `engage` / Engage | dark | Lifecycle rail with track chips |
| 7 | Key cases | `featured` / Cases | (shared) | (none) |
| 8 | Keep exploring | `keep-exploring` / Related | (shared) | (none) |
| 9 | Contact CTA | `contact` / Contact | (shared) | (none) |

Mode rhythm: dark → light → ultra-light → light → ultra-light → light → dark. There are no consecutive darks, as the brief requires.

---

## 4. Section-by-section content (EN, final copy for review)

### 0 · Hero (dark, corner marks, fitScreen)

The claim is on the left and Fig. 00 on the right, the same grid as `InteropHero` (5 / 7 columns).

- **Breadcrumb:** Home / e-Procurement
- **Annotation:** `03 · e-Procurement`
- **H1:** Public e-procurement, end to end.
- **Lede:** From procurement reform to a platform every officer trusts: one partner, the whole programme.
- **Body:** Procurement digitalised from the first purchase request to the last payment, with every step traceable and auditable. We start with the rules and the people, then deploy ProcessPlayer, our own platform.
- **Proof line** (mono, gray, one verifiable fact, audit §5): `ProcessPlayer · 50+ public organisations · in production since 2016`

**Fig. 00, "An e-procurement programme"**
Caption: `Fig. 00 · An e-procurement programme · reform, people, platform`

```
          months →
 01 REFORM    ████████████░░░░░░░░░░░░░░░░░░░░░░
 02 PEOPLE         ░░░████████████████████████████
 03 PLATFORM              ░░░████████████████████●   ← red node: "the institution runs it"
              ┆           ┆                 ┆
           diagnose     go-live          handover
```

- This is a drafting-style Gantt. Three plates start in sequence and overlap, and the time axis is dimensioned in mono.
- Each track label sits level with its bar and links to that track's section, like the interop hero's layer labels. Hovering or focusing a label lights its bar.
- The one red mark is the node at the end of the Platform bar. Everything else is blue and white.
- On mobile the labels sit under the bars instead of beside them.

### 1 · Why reform first (light)

Text is on the left. On the right are the three tracks as rows with a dashed red spine through them, bracketed "One programme". This is the same pattern as `InteropApproach`, with "Full stack" swapped for "One programme".

- **Annotation:** The approach
- **H2:** Why reform comes first.
- **Lead:** A platform only digitalises the process you already have.
- **Body 1:** Most e-procurement programmes start by buying software. The law, the procedures and the people are left for later, so the system automates paper habits and officers work around it.
- **Body 2:** Arxia runs it the other way round: reform the rules and the process, prepare the people who will run it, then deploy the platform. It is delivered as one programme, so nothing falls between contracts.
- **Rows:** `01 Reform · Consultancy`, `02 People · Capacity building`, `03 Platform · ProcessPlayer`. Each row has a one-line keyword strip and links to its section.

### 2 · Track 01 · Reform (ultra-light)

- **Annotation:** `01 · Consultancy`
- **H2:** Reform
- **Promise:** Fix the rules and the process before a line of code is written.
- **Corner marker** (replaces interop's "Layer n of 3"): a mini Fig. 00 with this track's bar lit, labelled `Track 1 of 3`.

**Fig. 01, process redesign.** A BPMN-style swimlane with three lanes: Requesting unit · Procurement · Finance. On the left, the as-is path loops back twice (paper approvals). On the right, the to-be path runs straight through, and the one red gateway is the approval that is now digital and signed. This is Arxia's real BPMN practice, drawn simply.

| # | Offer | Card copy |
|---|-------|-----------|
| 01.1 | Procurement system assessment | A diagnosis of your legal framework, institutions, processes and systems, so the reform starts with what to fix first. |
| 01.2 | e-Procurement strategy and roadmap | A national or institutional strategy with a phased plan and costing, like the digital transformation strategy we prepared for Uganda's PPDA. |
| 01.3 | Regulatory and standards alignment | Secondary legislation, procedures and data standards aligned with EU directives and international practice, so the platform has firm rules to implement. |
| 01.4 | Process redesign | Procurement processes mapped and redesigned in BPMN, from purchase request to payment, before they are configured in any system. |

### 3 · Track 02 · People (light)

- **Annotation:** `02 · Capacity building`
- **H2:** People
- **Promise:** Prepare the people who will run the system, before it goes live.

**Fig. 02, training cascade.** A train-the-trainer tree. At the top is one plate for master trainers. It branches to three trainer plates, and those fan out to a row of small officer plates. A separate branch on the right goes to supplier plates. A red node marks the top plate, where knowledge stays in-country. A mono dimension on the left reads `Reach`.

| # | Offer | Card copy |
|---|-------|-----------|
| 02.1 | Training for procurement officers | Practical training on the reformed procedures and the platform, built around the officers' real files. |
| 02.2 | Train-the-trainer programmes | National trainers prepared to teach the next cohorts, so capacity keeps growing after we leave. |
| 02.3 | Supplier onboarding | Guidance and outreach that bring suppliers, small firms included, onto electronic procedures. |
| 02.4 | Change management and practitioner community | Leadership engagement, help desks and a peer community of practitioners, like the public-procurement experts' group Arxia supports in Romania. |

### 4 · Track 03 · Platform (ultra-light)

- **Annotation:** `03 · ProcessPlayer`
- **H2:** Platform
- **Promise:** Every step digital, every document justified, every value traceable.
- **One sentence under the promise:** ProcessPlayer is Arxia's own procurement management platform. It covers the operational process that national e-tendering portals leave out, from the purchase request to the contract and the payment.

**Fig. 03, the traceable lifecycle.**

```
 [Request] → [Plan] → ┆ Tender · Award ┆ → [Contract] → [Order] → [Payment]
                      ┆ national portal┆
 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ audit trail ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ●
```

- The platform's stages are solid plates. Tender and award are a dashed plate labelled "national e-tendering portal". This states honestly where ProcessPlayer stops and why it complements national portals.
- A red dashed audit trail runs under every plate, and a red packet travels along it (reusing the `interop-bus-packet` animation).

| # | Offer | Card copy |
|---|-------|-----------|
| 03.1 | Digital purchase requests | Requests raised, justified and approved online with qualified electronic signatures. No more paper files. |
| 03.2 | Procurement plan and budget tracking | Quantities and values tracked against the annual procurement plan and budget commitments, in real time. |
| 03.3 | Contracts, framework agreements and suppliers | Contracts, framework agreements, orders and supplier performance followed through to the last payment. |
| 03.4 | Audit reporting, SaaS or on-premise | Reports for managers and auditors at every level. It runs as SaaS or on your own infrastructure, configured to your procedures. |

### 5 · ProcessPlayer in use (light)

This is the page's evidence screen. It answers audit §3.C ("Expertise and authority are weak"). Every number has a source line, so it's not an unsourced stat row (audit §5 "Don't").

- **Annotation:** In production
- **H2:** ProcessPlayer in use.
- **Body:** Built and proven under EU procurement rules in Romania, where public institutions of every kind run their procurement on it.
- **Metrics:** four plain mono-labelled figures in one row, not a hero stat band:
  `50+` public organisations · `30,000+` purchase requests · `17,000+` procurement plan lines · `8,000+` supplier orders
  Source line: `Source: ProcessPlayer production data, processplayer.eu, October 2026`
- **Sectors** (chips): City halls · Universities · Hospitals and public health · Airports · Cultural institutions
- **Client logo strip:** greyscale at rest, colour on hover, with each organisation's name as alt text. All ten client logos from processplayer.eu, trimmed and normalised to WebP in `public/logos/processplayer/`.
- **Testimonials:** all three from processplayer.eu (UMFST Târgu Mureș, Sibiu International Airport, Sibiu psychiatric hospital), translated from Romanian, with name, role and organisation, and labelled "Translated from Romanian".
- **Link out:** "Visit processplayer.eu ↗", in the header line of the client logos, opening in a new tab with `rel="noopener"` and a screen-reader note.

### 6 · How we engage (dark)

This is the same rail as `InteropEngage`, ending on the one red node. The chips show which tracks each step works on.

- **Annotation:** How we engage
- **H2:** One programme, or the track you need.
- **Body:** Engage Arxia from diagnosis to handover, or bring us in where you need depth: a reform, a training programme, or a platform rollout.

| Step | Title | Body | Chips |
|------|-------|------|-------|
| 01 | Assess | System assessment and current-state diagnosis: what the law allows, what the process does, what comes first. | `01` |
| 02 | Reform | Strategy, regulation and redesigned processes, agreed before anything is configured. | `01` `02` |
| 03 | Deploy | Officers trained, suppliers onboarded and ProcessPlayer configured and live, institution by institution. | `02` `03` |
| 04 | Sustain (red node) | Trainers, help desk and platform support, so the institution runs it. | `02` `03` |

Below the rail are two blocks:

- **Who we work with:** Procurement regulators and authorities · Central and local government · Universities and hospitals · Airports and state-owned enterprises · Development-partner programmes
- **Delivery:** SaaS or on-premise · configured to national procedures · EU procurement rules (to confirm: languages; see §9)

### 7–9 · Shared sections

- **Key cases:** `uganda-ppda` (GIZ / PPDA, 2023), `romania-public-procurement` (EU / Cluj IT Cluster, 2022), `romania-eprocurement-platform` (own product, 2016). These open `/portfolio?domain=public-procurement`.
- **Keep exploring:** `e-invoicing` (procure-to-pay continues there), `interoperability` (the platform exchanges data with registries and treasury), `data-governance` (procurement data and open contracting). This replaces `web-portals` and is a recommendation.
- **CTA:** the shared `DomainCTA`, which already pre-fills the form via `/?topic=e-Procurement#contact`.

**Unique copy:** about 750 words in EN, against the audit's target of at least 600.

---

## 5. SEO and GEO (audit §5 playbook)

| Item | EN | ES | FR |
|------|----|----|----|
| `<title>` (with " — Arxia") | Public e-Procurement Systems: Strategy to Platform — Arxia (58) | Contratación pública electrónica para gobiernos — Arxia (55) | Dématérialisation des marchés publics — Arxia (45) |
| Meta description | Public e-procurement end to end: procurement reform, training for procurement officers and ProcessPlayer, the platform used by 50+ public bodies. (145) | Contratación pública electrónica de principio a fin: reforma, formación de compradores públicos y ProcessPlayer, la plataforma de 50+ entidades públicas. (153) | Dématérialisation des marchés publics de bout en bout : réforme, formation des acheteurs publics et ProcessPlayer, plateforme de 50+ organismes publics. (152) |
| H1 | Public e-procurement, end to end. | Contratación pública electrónica, de principio a fin. | Marchés publics électroniques, de bout en bout. |

- The FR title uses *dématérialisation des marchés publics*, which is the term French buyers search for. ES uses *contratación pública electrónica* and formal *usted* throughout (audit §3.G).
- **Structured data:**
  - `BreadcrumbList`, already shared.
  - `Service` with an `OfferCatalog` of three sub-catalogues (one per track) with four offers each, mirroring interop.
  - New: a `SoftwareApplication` node for ProcessPlayer (`applicationCategory: BusinessApplication`, `operatingSystem: Web`, `publisher` → Arxia `#organization`, `url: https://processplayer.eu`). It has **no ratings or reviews**, because we don't publish ones we can't substantiate.
- **Canonical and hreflang** come from the shared `pageMetadata` and `SITE_URL`. There are no changes there.
- **Sitemap:** the route is already listed. The page stays indexed because the current version is live; the redesign replaces it in place.
- **Citability (GEO, audit §3.I):** the hero body, the Track 03 lead sentence and the "in use" body each work as a factual passage on their own. The metrics have a dated source line, and the page links to its three portfolio cases.
- **Optional:** a per-page OG image (`e-procurement/opengraph-image.tsx`) showing Fig. 00. The playbook asks for it, but interop doesn't have one yet, so I'd add it to both pages in a follow-up.

## 6. Accessibility and impeccable checks

These apply the rules the audit used (`docs/audit/findings/impeccable-*.md`):

- One H1 and strict H1 → H2 → H3 order: section titles are H2, card titles H3.
- No red text, no red buttons and no glows. Red appears only as accent lines, figure nodes, the spine and the audit trail.
- The H1 is not hidden behind hydration. Hero text renders visible and only the figure animates (audit §3.E LCP).
- Touch targets are at least 44px, including the hero track labels and the rail. The focus ring is white on dark and Blueprint Blue on light.
- Figures are `aria-hidden`. Hero track labels are a labelled `<nav>`. The external link to processplayer.eu announces that it opens a new tab.
- All copy comes from `messages/*.json` and `domain-pages.*`, with no hard-coded English (audit §3.G).
- `prefers-reduced-motion`: figures render in their end state and the audit-trail packet doesn't move.
- No em-dash clusters, no "world-class", no unsourced superlatives.

## 7. Content fixes this page will also make

- **"30,000+ references" is a mistranslation.** ProcessPlayer's figure is 30,000+ *referate*, which are purchase requests. This needs correcting in `domain-pages.ts` (and its ES/FR copies).
- **50+ vs "over 100 public institutions".** `content/portfolio-cases.md` says 100+, while the site and processplayer.eu say 50+. I'll use 50+ unless you confirm otherwise.
- `processplayer` description: drop "framework agreements" only if it's not true (processplayer.eu doesn't mention it, but the company presentation does).

## 8. Implementation outline (after approval)

1. **Data:** add `tracks?: ServiceTrack[]` to `DomainPageContent` (the same shape as `StackLayer`, typed `T01 | T02 | T03`) and fill it for `e-procurement` in `domain-pages.ts` + `i18n/domain-pages.{es,fr}.ts`. Drop the `image` fields. Fix the copy in §7.
2. **Messages:** add an `Eproc` namespace to `messages/{en,es,fr}.json` with hero, approach, fig labels, in-use, engage and rail. Set the `DomainSeoTitle` and `DomainSeoDescription` values for `e-procurement` in all three locales.
3. **Components** in `src/components/domain/eproc/`: `EprocPageView`, `EprocHero` (Fig. 00), `EprocApproach`, `EprocTrack`, `TrackFigures` (Figs. 01–03), `EprocInUse`, `EprocEngage`. Promote `InteropHeader` to a shared `domain/CompactSectionHeader.tsx` used by both pages, with no visual change to interop.
4. **Route:** `app/[locale]/e-procurement/page.tsx` renders `EprocPageView`.
5. **Assets:** convert the confirmed client logos to WebP via the image pipeline (`docs/IMAGE-PIPELINE.md`). Delete the e-procurement isometric illustrations if nothing else references them.
6. **Verify:**
   - `npm run build`, then a preview at 1440, 1024, 768 and 375 with screenshots of every section (one screen each).
   - Keyboard pass, contrast spot-checks, reduced-motion pass, ES and FR rendering, title and description lengths, JSON-LD validity.
   - HawkScan needs `HAWK_API_KEY`, which is not set. That item is still open from the audit.

## 9. Owner decisions (2026-10-07)

1. **Keep it general.** Offers describe what each track delivers, not specific methodologies or standards (no MAPS, OCDS or named directives). The capacity-building offers stay generic.
2. **Logos and testimonials** come from processplayer.eu, not from the `e-Procurement logos/` folder.
3. **ProcessPlayer can be set up anywhere.** The page says it can be set up in any country, configured to its procurement law and procedures, SaaS or on-premise.
4. **Related domains:** `web-portals` swapped for `data-governance`.
