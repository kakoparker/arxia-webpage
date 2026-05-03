#!/usr/bin/env node
/**
 * normalize-dark-bg.js
 *
 * Post-processor for Arxia website dark-mode illustrations. Walks every
 * pixel of an input image and replaces anything below a luminance
 * threshold with the brand-spec target colour. Strokes (luminance ~165)
 * and red accents (luminance ~91) survive untouched; only the dark
 * background varies, and only the dark background gets normalized.
 *
 * Why we need this: text-to-image models (Nano-Banana / Gemini 2.5
 * Flash Image, Imagen, Midjourney, etc.) do not honour exact hex
 * values. A "Blueprint Dark #0D1520" prompt can come back with a
 * background anywhere from #0D1520 to #1A2A3F. Side-by-side on the
 * page, the inconsistency reads as bad craft. This script eliminates
 * the variance deterministically.
 *
 * Specification: see the website-image-standard skill (SKILL.md § 6).
 *
 * Usage:
 *   node scripts/normalize-dark-bg.js <input> <output>
 *   node scripts/normalize-dark-bg.js <input> <output> --threshold 80 --target 0D1520
 *
 *   <input>:   path to source PNG or WebP
 *   <output>:  path to destination WebP (use -v2 suffix to avoid
 *              file-locking issues on Windows when Next.js dev server
 *              is running)
 *
 * Defaults are tuned for the Arxia brand spec.
 *
 * Requires: `sharp` (already a dependency of next/image).
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const DEFAULT_TARGET = [13, 21, 32]; // #0D1520 Blueprint Dark
const DEFAULT_LUMINANCE_THRESHOLD = 80;
const DEFAULT_QUALITY = 85;
const DEFAULT_EFFORT = 6;

function parseArgs(argv) {
  const positional = [];
  let target = DEFAULT_TARGET;
  let threshold = DEFAULT_LUMINANCE_THRESHOLD;
  let quality = DEFAULT_QUALITY;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--target") {
      const hex = argv[++i].replace(/^#/, "");
      target = [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    } else if (arg === "--threshold") {
      threshold = parseInt(argv[++i], 10);
    } else if (arg === "--quality") {
      quality = parseInt(argv[++i], 10);
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown flag: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length !== 2) {
    throw new Error(
      "Usage: node scripts/normalize-dark-bg.js <input> <output> " +
        "[--target HEX] [--threshold 80] [--quality 85]"
    );
  }
  return {
    input: positional[0],
    output: positional[1],
    target,
    threshold,
    quality,
  };
}

async function normalize({ input, output, target, threshold, quality }) {
  if (!fs.existsSync(input)) {
    throw new Error(`Input not found: ${input}`);
  }

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let replaced = 0;
  const total = width * height;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum < threshold) {
      data[i] = target[0];
      data[i + 1] = target[1];
      data[i + 2] = target[2];
      replaced++;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality, effort: DEFAULT_EFFORT })
    .toFile(output);

  return {
    width,
    height,
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
      const result = await normalize(args);
      console.log(
        `${path.basename(args.input)} -> ${path.basename(args.output)}: ` +
          `${result.percent}% pixels normalized to ` +
          `rgb(${args.target.join(", ")}), ${result.sizeKb} KB`
      );
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
  })();
}

module.exports = { normalize };
