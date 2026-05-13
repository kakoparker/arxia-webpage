# /govtech/intelligence — illustration batch manifest

Generated to satisfy the website-image-standard skill's >8-image batch
ceiling. Each row is one card on the page. Resume from the first row
whose `status` is `pending`.

**Mode per section (DomainPageView alternating index):**
- Consultancy → index 0 → **light** template
- Services → index 1 → **dark** template
- Products → index 2 → **light** template (already done)

**Pipeline per row:**
1. `mcp__nano-banana__generate_image` with the prompt assembled from
   `subject` + the matching § 4 template.
2. `node scripts/convert-to-webp.js <png> <slug>-raw.webp`
3. `node scripts/composite-bg.js <slug>-raw.webp <slug>-illustration.webp
    --texture public/textures/{light,dark}-paper.webp --mode {light,dark}`
4. Update `image:` field for that slug in `src/data/domain-pages.ts`.
5. Mark this row `done`.

---

## Consultancy (light mode)

| slug | status | red accent | subject (axonometric cutaway) |
|---|---|---|---|
| `ai-readiness-gov` | done | red flag on the readiness chart | Classical assessment chamber: a review table with three diagnostic charts pinned to the back wall ("DATA", "SKILLS", "INFRA"), filing drawers along the right wall, a small server-rack silhouette through a cutaway window on the left. |
| `agentic-state-strategy` | done | red marker on the top-floor agent block | Exploded axonometric of a stacked agentic-state architecture: three layered platforms separated by exploded gaps, each labelled ("AGENTS", "CITIZEN OPS", "BACKEND"), thin connector pipes running between layers, fibre patch panel side-on. |
| `public-ai-governance` | done | red flag on the central rulebook | Classical governance chamber: a podium at the front, semicircle of benches, "AI ACT" and "ISO 42001" rulebook spines along the rear wall, a small monitor-screen kiosk to the side (diagonal-hatch screen). |
| `digital-maturity` | done | red lamp marking the highest score | Vertical diagnostic tower: cutaway showing five floors of maturity tiers ("OPTIMIZE", "MANAGE", "DEFINE", "REPEAT", "INITIAL") from top to bottom, a small monitor console on the ground floor, server-rack silhouette through a cutaway window. |
| `responsible-ai-policy` | done | red wax seal on the top contract | Procurement advisory office: a drafting table holding a contract bundle and a stack of policy briefs, document cabinets along the back wall, monitor screen on the side desk (diagonal-hatch), small rooftop antenna visible above the cutaway roof. |

## Services (dark mode)

| slug | status | red accent | subject (wireframe cutaway) |
|---|---|---|---|
| `ai-agents-public-services` | pending | red signal lamp on the central server | Multi-channel citizen-services hub: wireframe room with a central server rack, four kiosk-style touchpoint terminals around the edge labelled "WEB", "MOBILE", "USSD", "VOICE", dotted data-flow lines from each kiosk to the rack. |
| `inter-institutional-workflows` | pending | red lamp on the active routing junction | Switching / routing chamber: wireframe room with parallel cable trunks running across the ceiling, an operator desk in the center with a hatched monitor screen, three labelled door-panels ("AGENCY A", "AGENCY B", "AGENCY C") along the back wall. |
| `document-processing` | pending | red flag on the document leaving the OCR scanner | Document-processing facility: wireframe room with a conveyor running left-to-right through three labelled stations ("INTAKE", "EXTRACT", "CLASSIFY"), a server-rack silhouette behind the cutaway window, a few stacked file folders at the right end. |
| `low-code-eservices` | pending | red lamp on the active prototype on the workbench | Low-code platform assembly studio: wireframe room with a long workbench holding component modules being assembled, a hatched monitor on the back wall, fibre patch panel on the side wall, a small lattice comm tower visible through the cutaway window. |
| `ai-acceleration-gov` | pending | red flag at the finish-line milestone | 12-week acceleration program facility: wireframe room with a long table showing a timeline of weekly milestones (4-5 markers along the table), a chalk diagram on the back wall, a hatched monitor screen on a side wall. |
| `ai-ignite-gov` | pending | red signal lamp on the central facilitator's desk | Discovery workshop space: wireframe room with a horseshoe of workshop tables facing a chalk diagram on the back wall, a small facilitator's console with a hatched monitor, a few stacked workshop binders. |

---

## Already done

| slug | status | file |
|---|---|---|
| `ai-governance-platform-gov` | done | `ai-governance-platform-gov-illustration.webp` |
| `holonn` | done | `holonn-illustration.webp` |
