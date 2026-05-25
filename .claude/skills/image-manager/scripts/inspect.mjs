#!/usr/bin/env node
// Inspect images in a folder. Usage: node inspect.mjs <folder> [--json]
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.gif']);

const [, , folder, ...flags] = process.argv;
if (!folder) {
  console.error('Usage: inspect.mjs <folder> [--json]');
  process.exit(1);
}
const asJson = flags.includes('--json');

function categorize(w, h) {
  const ratio = w / h;
  if (w < 600) return 'thumbnail';
  if (Math.abs(ratio - 1) < 0.05) return 'square';
  if (ratio < 0.9) return 'portrait';
  if (w >= 1920 && ratio > 1.4) return 'hero';
  return 'landscape';
}

const entries = await readdir(folder, { withFileTypes: true });
const results = [];
for (const e of entries) {
  if (!e.isFile()) continue;
  if (!EXTS.has(extname(e.name).toLowerCase())) continue;
  const full = join(folder, e.name);
  try {
    const [{ size }, meta] = await Promise.all([stat(full), sharp(full).metadata()]);
    results.push({
      file: e.name,
      width: meta.width,
      height: meta.height,
      format: meta.format,
      bytes: size,
      kb: +(size / 1024).toFixed(1),
      ratio: +(meta.width / meta.height).toFixed(3),
      category: categorize(meta.width, meta.height),
    });
  } catch (err) {
    results.push({ file: e.name, error: err.message });
  }
}

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log(`\n${results.length} images in ${folder}\n`);
  console.log('file'.padEnd(45), 'WxH'.padEnd(14), 'KB'.padStart(8), 'ratio'.padStart(7), 'category');
  console.log('-'.repeat(90));
  for (const r of results) {
    if (r.error) { console.log(r.file.padEnd(45), 'ERROR', r.error); continue; }
    console.log(
      r.file.padEnd(45),
      `${r.width}x${r.height}`.padEnd(14),
      String(r.kb).padStart(8),
      String(r.ratio).padStart(7),
      r.category,
    );
  }
  const total = results.reduce((a, r) => a + (r.bytes || 0), 0);
  console.log('-'.repeat(90));
  console.log(`Total: ${(total / 1024 / 1024).toFixed(2)} MB`);
}
