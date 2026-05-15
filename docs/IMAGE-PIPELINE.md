# Illustration pipeline

Every service/product card and domain illustration on this site is a
hand-style **architectural cutaway** line drawing on a fixed "blueprint paper"
surface. They are AI-generated, then deterministically post-processed so every
image sits on the **exact same** background regardless of generation drift.

This document is the in-repo source of truth for producing and maintaining that
artwork. (It distils a longer internal standard; this file is authoritative for
anyone working in this repo.)

---

## What's on disk

```
public/textures/
  dark-blueprint-paper.webp   canonical DARK surface  (#0D1520 + grid + grain)
  light-paper.webp            canonical LIGHT surface (#F4F1EA + pencil grid)

public/images/services/<vertical>-<domain>/
  <slug>-raw.webp             keyed line art, pre-composite (keep it)
  <slug>-illustration.webp    final shipped image (referenced from data)
  BATCH-MANIFEST.md           per-folder log of each card's subject + status

scripts/
  convert-to-webp.js          PNG → 1600px WebP q82
  composite-bg.js             chroma-key line art onto a canonical texture
  generate-textures.js        regenerate the two canonical textures (rare)
  normalize-dark-bg.js        LEGACY luminance approach — superseded, do not use
```

`scripts/*` require **`sharp`** (declared in `devDependencies`).

## The visual rules (non-negotiable)

- **Concept:** 3/4 axonometric cutaway, straight cross-section, or exploded
  axonometric of a real institutional space (room, vault, hub, hall). Never an
  abstract flow diagram. Hairline strokes only, no fills, no shadows, sharp
  corners (architectural).
- **Two surfaces, decided by the card's section mode:**
  - Section rendered **dark** → dark surface, pale `#A0AEC0` strokes.
  - Section rendered **light / ultra-light** → light surface, `#162036` strokes.
  - Mode is set by category order in
    `src/components/domain/DomainPageView.tsx` (Consultancy 0 → light,
    Services 1 → dark, Products 2 → light, …). Match the image to the section.
- **Exactly one Digital Red (`#ED1C24`) accent** per image, ~1% of frame,
  always functional (a flagged drawer, a lit lamp), never decorative.
- **2–4 monospace uppercase labels** with lead lines; weave in 2–3 "technology"
  fixtures (server rack, patch panel, hatched monitor, antenna) so the space
  reads as a tech facility.
- The model renders on **pure white** (light) or **pure black** (dark) — never
  on the brand colour. The post-processor supplies the real background.

## The procedure (per image)

1. **Generate** with an image model (Nano-Banana / Gemini 2.5 Flash Image was
   used for the existing set). Prompt = the matching template below + a
   subject paragraph + the specific red-accent target. Output is a PNG on flat
   white or flat black.
2. **Convert:**
   ```bash
   node scripts/convert-to-webp.js <model-output.png> \
     public/images/services/<vertical>-<domain>/<slug>-raw.webp
   ```
3. **Composite onto the canonical surface:**
   ```bash
   # dark card
   node scripts/composite-bg.js \
     public/images/services/<v>-<d>/<slug>-raw.webp \
     public/images/services/<v>-<d>/<slug>-illustration.webp \
     --texture public/textures/dark-blueprint-paper.webp --mode dark

   # light card
   node scripts/composite-bg.js \
     public/images/services/<v>-<d>/<slug>-raw.webp \
     public/images/services/<v>-<d>/<slug>-illustration.webp \
     --texture public/textures/light-paper.webp --mode light
   ```
   It prints `<n>% bg pixels composited`. Healthy range is ~90–98%. A very low
   number on a dark image usually means the model filled solid surfaces
   (regenerate with a stronger "wireframe, see through everything" instruction).
4. **Wire it up:** set the item's `image:` field in
   `src/data/domain-pages.ts` to
   `/images/services/<vertical>-<domain>/<slug>-illustration.webp`.
5. **Log it:** flip the row to `done` in that folder's `BATCH-MANIFEST.md`
   (create the manifest if the folder is new — copy the format from an
   existing one). The manifest is how the next person knows what each card's
   scene and red accent are.
6. Commit **both** `-raw.webp` and `-illustration.webp`. The raw is needed to
   re-composite if the canonical texture ever changes.

## Prompt templates

Use verbatim; swap only the `[SUBJECT]` paragraph and `[RED ACCENT]` target.
The negative constraints are load-bearing — keep them.

**Dark:**
> A precise hand-drawn architectural cutaway illustration on a UNIFORM PURE
> BLACK background — exactly color #000000, perfectly flat, identical
> edge-to-edge, NO gradient, NO texture, NO grid. 16:9 wide landscape.
> Subject: [SUBJECT — a 3/4 axonometric cutaway in 2-3 sentences with 2-4
> monospace label tags in quotes; never the words "floor plan" or "top-down"].
> Rendering: ENTIRELY WIREFRAME — every object is a transparent outlined box,
> see through every surface, NO white/gray fills, NO filled silhouettes.
> Weave in 2-3 tech fixtures (server racks, patch panels, hatched monitor
> screens, antennas, dotted data-flow lines). Linework: pure 1px hairline in
> pale cool gray-white (#A0AEC0), no fills/shadows/shading, Choisy / patent
> illustration style. Four L-shaped corner registration marks (~12px inset).
> Single accent: [RED ACCENT] filled solid Digital Red (#ED1C24), the only
> colored element, ~1% of frame. Strictly NO photographic elements, NO
> 3D-render, NO gradients (background MUST be uniform pure black #000000), NO
> shading, NO texture, NO grid.

**Light:** identical, but `PURE WHITE #FFFFFF` background and linework in deep
Blueprint Blue (`#162036`); add `NO vignette, NO paper grain` to the negatives.

## Regenerating the canonical textures (rare)

`node scripts/generate-textures.js` rewrites both texture WebPs deterministically
(seeded RNG → byte-identical output). **If you do this, re-run step 3 for every
existing image** so the whole site stays on one surface — do not spot-update a
single card. Then verify dark cards still show the grid (see next section).

## Delivery caveat — WebP only, never AVIF

`next.config.mjs` pins `images.formats: ["image/webp"]`. Next/Image's AVIF
encoder treats the canonical paper's subtle blueprint grid as noise and
denoises it away, flattening every dark card — invisible in source pixels,
visible only on the rendered page. **Do not add `"image/avif"`.** If dark cards
ever look flat, check this config first.

## Adding a brand-new domain folder

1. Create `public/images/services/<vertical>-<domain>/`.
2. Add a `BATCH-MANIFEST.md` (copy an existing one's table format) listing each
   card slug, its mode, its subject, and its red accent **before** generating —
   so the work is resumable.
3. Run the per-image procedure for each row.
