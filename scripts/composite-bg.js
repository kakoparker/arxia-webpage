#!/usr/bin/env node
/**
 * composite-bg.js
 *
 * Replaces background pixels in a generated illustration with the
 * corresponding pixels from a canonical paper texture. Linework and the red
 * accent are preserved (luminance-threshold mask, same logic as the previous
 * normalize-dark-bg.js).
 *
 * Two operating modes — picked by the texture you pass:
 *   - dark-blueprint-paper.webp  → for dark-mode illustrations
 *   - light-paper.webp           → for light-mode illustrations
 *
 * The point: every illustration on the site lands on the SAME paper
 * background, regardless of what Gemini drifted to during generation.
 *
 * Usage:
 *   node scripts/composite-bg.js <input> <output> --texture <path> [--mode dark|light]
 *     [--threshold N] [--quality N]
 *
 *   --mode dark  (default): replace dark pixels (lum < threshold) with texture
 *                Strokes (~165) and red accent (~91) survive when threshold is 80.
 *   --mode light:           replace bright pixels (lum > threshold) with texture
 *                Strokes (~50 in light) and red accent (~91) survive when threshold is 200.
 *
 * Defaults are tuned for the Arxia brand spec.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

function parseArgs(argv) {
  const positional = [];
  let texture = null;
  let mode = "dark";
  let threshold = null; // mode-dependent default
  let quality = 85;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--texture") texture = argv[++i];
    else if (a === "--mode") mode = argv[++i];
    else if (a === "--threshold") threshold = parseInt(argv[++i], 10);
    else if (a === "--quality") quality = parseInt(argv[++i], 10);
    else if (a.startsWith("--")) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional.length !== 2) {
    throw new Error("Usage: node scripts/composite-bg.js <input> <output> --texture <path> [--mode dark|light]");
  }
  if (!texture) throw new Error("--texture is required");
  if (mode !== "dark" && mode !== "light") throw new Error("--mode must be dark or light");
  if (threshold == null) threshold = mode === "dark" ? 80 : 200;
  return {
    input: positional[0], output: positional[1],
    texture, mode, threshold, quality,
  };
}

async function loadRaw(p) {
  const { data, info } = await sharp(p)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

async function composite({ input, output, texture, mode, threshold, quality }) {
  if (!fs.existsSync(input)) throw new Error(`Input not found: ${input}`);
  if (!fs.existsSync(texture)) throw new Error(`Texture not found: ${texture}`);

  const img = await loadRaw(input);
  const tex = await loadRaw(texture);

  const out = Buffer.from(img.data); // copy
  let replaced = 0;
  const total = img.w * img.h;

  for (let y = 0; y < img.h; y++) {
    for (let x = 0; x < img.w; x++) {
      const i = (y * img.w + x) * 3;
      const r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const isBg = mode === "dark" ? lum < threshold : lum > threshold;
      if (!isBg) continue;

      // Sample texture at the SAME coordinate (modulo for tiling).
      const tx = x % tex.w, ty = y % tex.h;
      const ti = (ty * tex.w + tx) * 3;
      out[i]     = tex.data[ti];
      out[i + 1] = tex.data[ti + 1];
      out[i + 2] = tex.data[ti + 2];
      replaced++;
    }
  }

  await sharp(out, { raw: { width: img.w, height: img.h, channels: 3 } })
    .webp({ quality, effort: 6 })
    .toFile(output);

  return {
    pixelsReplaced: replaced,
    pixelsTotal: total,
    percent: Math.round((100 * replaced) / total),
    sizeKb: Math.round(fs.statSync(output).size / 1024),
  };
}

if (require.main === module) {
  (async () => {
    try {
      const args = parseArgs(process.argv.slice(2));
      const r = await composite(args);
      console.log(
        `${path.basename(args.input)} -> ${path.basename(args.output)}: ` +
        `${r.percent}% bg pixels composited from ${path.basename(args.texture)}, ${r.sizeKb} KB`
      );
    } catch (e) {
      console.error("Error:", e.message);
      process.exit(1);
    }
  })();
}

module.exports = { composite };
