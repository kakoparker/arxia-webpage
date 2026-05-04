#!/usr/bin/env node
/**
 * generate-textures.js
 *
 * Procedurally generates the two canonical background textures used by the
 * Arxia website-image-standard composite pipeline:
 *
 *   public/textures/dark-blueprint-paper.webp   (#0D1520 + grain + grid + vignette)
 *   public/textures/light-paper.webp            (#F4F1EA + grain + pencil grid + vignette)
 *
 * These textures are deterministic (seeded RNG) so re-running this script
 * always produces byte-identical output. Composite-bg.js samples them to
 * replace background pixels in generated illustrations, giving every image
 * on the site the SAME paper background.
 *
 * Run: node scripts/generate-textures.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SIZE = 1600;          // Texture canvas — matches our max image width
const GRID_MINOR = 20;
const GRID_MAJOR = 100;

// Tiny seeded RNG so output is reproducible.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v) { return v < 0 ? 0 : v > 255 ? 255 : v; }

/**
 * Build a raw RGB texture buffer.
 *   base:        [r, g, b] base color
 *   grainAmp:    luminance ± per-pixel noise
 *   gridMinor:   delta added to base on minor grid lines
 *   gridMajor:   delta added to base on major grid lines
 *   vignette:    delta applied at the very corners (interpolated to 0 at center)
 *   seed:        RNG seed
 */
function buildTexture({ base, grainAmp, gridMinor, gridMajor, vignette, seed }) {
  const rng = mulberry32(seed);
  const buf = Buffer.alloc(SIZE * SIZE * 3);
  const cx = SIZE / 2, cy = SIZE / 2;
  const maxD = Math.hypot(cx, cy);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let r = base[0], g = base[1], b = base[2];

      // Per-pixel grain (uniform noise on luminance, applied to all channels)
      const noise = (rng() - 0.5) * 2 * grainAmp;
      r += noise; g += noise; b += noise;

      // Minor grid: 1px line every GRID_MINOR
      if (x % GRID_MINOR === 0 || y % GRID_MINOR === 0) {
        r += gridMinor; g += gridMinor; b += gridMinor;
      }
      // Major grid: 1px line every GRID_MAJOR (overrides/adds on top)
      if (x % GRID_MAJOR === 0 || y % GRID_MAJOR === 0) {
        r += gridMajor; g += gridMajor; b += gridMajor;
      }

      // Vignette — radial falloff, applied as a delta toward darker edges
      const d = Math.hypot(x - cx, y - cy) / maxD; // 0..~1
      const vAmt = Math.pow(d, 2.2) * vignette;     // bias toward edges
      r += vAmt; g += vAmt; b += vAmt;

      const i = (y * SIZE + x) * 3;
      buf[i]     = clamp(r);
      buf[i + 1] = clamp(g);
      buf[i + 2] = clamp(b);
    }
  }
  return buf;
}

async function writeTexture(outPath, buf) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(buf, { raw: { width: SIZE, height: SIZE, channels: 3 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(outPath);
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`${path.basename(outPath)}: ${SIZE}x${SIZE}, ${kb} KB`);
}

async function main() {
  const root = path.resolve(__dirname, "..");
  const outDir = path.join(root, "public", "textures");

  // Dark blueprint paper — #0D1520 base, brighter grid, slight darken at edges
  const dark = buildTexture({
    base: [13, 21, 32],
    grainAmp: 4,        // very subtle grain
    gridMinor: 6,       // faint minor lines
    gridMajor: 12,      // slightly stronger major lines
    vignette: -4,       // edges go a touch darker
    seed: 0xA3C1,
  });
  await writeTexture(path.join(outDir, "dark-blueprint-paper.webp"), dark);

  // Light paper — #F4F1EA base, darker pencil grid, warm vignette at edges
  const light = buildTexture({
    base: [244, 241, 234],
    grainAmp: 5,        // paper grain
    gridMinor: -8,      // pencil lines = darker than base
    gridMajor: -16,
    vignette: -10,      // warm corner vignette
    seed: 0x5E27,
  });
  await writeTexture(path.join(outDir, "light-paper.webp"), light);
}

main().catch((e) => { console.error(e); process.exit(1); });
