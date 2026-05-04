#!/usr/bin/env node
/**
 * convert-to-webp.js
 *
 * Convert a generated PNG (typically from nano-banana / Gemini output)
 * to project-spec WebP: max width 1600, quality 82, preserves aspect.
 *
 * Usage: node scripts/convert-to-webp.js <input.png> <output.webp>
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function run() {
  const [, , input, output] = process.argv;
  if (!input || !output) {
    console.error("Usage: node scripts/convert-to-webp.js <input> <output>");
    process.exit(1);
  }
  if (!fs.existsSync(input)) {
    console.error(`Input not found: ${input}`);
    process.exit(1);
  }
  const meta = await sharp(input).metadata();
  const targetWidth = Math.min(meta.width || 1600, 1600);
  await sharp(input)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  const sizeKb = Math.round(fs.statSync(output).size / 1024);
  console.log(`${path.basename(input)} -> ${path.basename(output)}: ${targetWidth}px, ${sizeKb} KB`);
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
