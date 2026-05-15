# /industries/data — illustration batch manifest

DomainPageView alternating index after the recent edits:
- Consultancy → index 0 → **light** template
- Services → index 1 → **dark** template

Pipeline per row (same as govtech-intelligence batch):
1. `mcp__nano-banana__generate_image` with the prompt assembled from
   `subject` + the matching § 4 template.
2. `node scripts/convert-to-webp.js <png> <slug>-raw.webp`
3. `node scripts/composite-bg.js <slug>-raw.webp <slug>-illustration.webp
   --texture public/textures/{light-paper,dark-blueprint-paper}.webp --mode {light,dark}`
4. Update `image:` field for that slug in `src/data/domain-pages.ts`.
5. Mark this row `done`.

---

## Consultancy (light mode)

| slug | status | red accent | subject (axonometric cutaway) |
|---|---|---|---|
| `data-governance-strategy` | done | red wax seal on the central policy book | Classical governance chamber: a podium at the front, semicircle of benches, three rulebook spines along the rear wall labelled "POLICY", "ROLES", "RIGHTS", a small monitor-screen kiosk to one side (diagonal-hatch screen), a fibre patch panel grid mounted on the side wall. |
| `interoperability-standardization-strategy` | done | red marker on the central exchange junction | Cross-section view of three classical enterprise buildings in a row, linked underground by a bundled-fibre utility corridor. Three labelled junction boxes along the corridor: "CRM", "ERP", "BI". A small server-rack silhouette is visible through a basement cutaway window. |
| `industry-standards` | done | red flag on one of the open drawers | Natural-history-style specimen wall: a tall cabinet of glass-fronted drawers arranged in a grid along the back wall, each drawer labelled with a sector code in monospace caps ("MINE", "FIN", "LOG", "HEALTH"), a drafting table in front holding an open standards binder, a small monitor screen on a side desk (diagonal-hatch). |

## Services (dark mode)

| slug | status | red accent | subject (wireframe cutaway) |
|---|---|---|---|
| `governance-platform` | done | red signal lamp on the central rack | Central governance control room: wireframe room with one central server rack acting as the governance hub, four radial console desks around it each carrying a diagonal-hatch monitor labelled "POLICY", "AUDIT", "LINEAGE", "ACCESS". Thin dotted data-flow lines connect each console to the central rack. |
| `interoperability-standardization-implementation` | done | red lamp on the central transform fan-out | Underground integration backbone: wireframe cross-section showing two enterprise buildings above and a fibre conduit corridor between them, with three labelled fan-out points along the corridor in monospace caps: "CANONICAL", "VALIDATE", "TRANSFORM". A small junction-box cluster and a network-switch rack inside the corridor. |
| `catalog-lineage` | done | red marker on one active lineage thread | Cataloguing chamber: wireframe room with a back wall of labelled card-catalog drawers arranged in a grid, a central operator desk with a diagonal-hatch monitor screen, and thin dotted lineage threads tracing from a few drawers down through the desk and into a server-rack silhouette behind a cutaway window. |
| `pipelines` | done | red flag on the active TRANSFORM station | Pipeline / pumping facility: wireframe cross-section showing two pipeline runs converging through a central pumping station with three labelled stations in monospace caps along the run: "INGEST", "TRANSFORM", "SERVE". A fibre patch panel on the back wall and a server-rack silhouette through a cutaway window. |
