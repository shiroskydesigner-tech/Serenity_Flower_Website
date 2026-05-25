#!/usr/bin/env node
// Optimize images for web. Generates responsive WebP+AVIF + LQIP + manifest.json.
// Usage: node optimize.mjs --src <dir> --out <dir> [--widths 480,960,1440,1920] [--formats webp,avif]
import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) out[a.slice(2)] = argv[++i];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.src || !args.out) {
  console.error('Usage: optimize.mjs --src <dir> --out <dir> [--widths 480,960,1440,1920] [--formats webp,avif]');
  process.exit(1);
}
if (args.src.replace(/\\/g, '/').toLowerCase().includes('ref_photo')) {
  if (args.out.replace(/\\/g, '/').toLowerCase().includes('ref_photo')) {
    console.error('Refusing to write into Ref_Photo/. Pick a different --out.');
    process.exit(1);
  }
}

const widths = (args.widths || '480,960,1440,1920').split(',').map(Number);
const formats = (args.formats || 'webp,avif').split(',');
const QUALITY = { webp: 82, avif: 60 };

await mkdir(args.out, { recursive: true });

const entries = await readdir(args.src, { withFileTypes: true });
const sources = entries.filter(e => e.isFile() && EXTS.has(extname(e.name).toLowerCase()));

const manifest = [];
let totalIn = 0, totalOut = 0, processed = 0;

for (const e of sources) {
  const srcPath = join(args.src, e.name);
  const stem = basename(e.name, extname(e.name)).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
  const srcStat = await stat(srcPath);
  totalIn += srcStat.size;

  const img = sharp(srcPath);
  const meta = await img.metadata();
  const origW = meta.width, origH = meta.height;
  const ratio = origH / origW;

  const variants = [];
  for (const w of widths) {
    if (w > origW) continue;
    const h = Math.round(w * ratio);
    for (const fmt of formats) {
      const outName = `${stem}-${w}.${fmt}`;
      const outPath = join(args.out, outName);
      if (existsSync(outPath)) {
        const oStat = await stat(outPath);
        if (oStat.mtimeMs >= srcStat.mtimeMs) {
          totalOut += oStat.size;
          variants.push({ src: outName, width: w, height: h, format: fmt });
          continue;
        }
      }
      const pipeline = sharp(srcPath).resize({ width: w });
      const buf = fmt === 'avif'
        ? await pipeline.avif({ quality: QUALITY.avif }).toBuffer()
        : await pipeline.webp({ quality: QUALITY.webp }).toBuffer();
      await writeFile(outPath, buf);
      totalOut += buf.length;
      variants.push({ src: outName, width: w, height: h, format: fmt });
    }
  }

  const lqipBuf = await sharp(srcPath).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;

  manifest.push({
    id: stem,
    source: e.name,
    width: origW,
    height: origH,
    aspectRatio: +(origW / origH).toFixed(4),
    lqip,
    variants,
  });

  processed++;
  if (processed % 25 === 0) console.log(`  …${processed}/${sources.length}`);
}

const manifestPath = join(args.out, 'manifest.json');
await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

const saved = totalIn > 0 ? (1 - totalOut / totalIn) * 100 : 0;
console.log(`\nProcessed: ${processed} source → ${manifest.reduce((a, m) => a + m.variants.length, 0)} variants`);
console.log(`Size: ${(totalIn / 1024 / 1024).toFixed(2)} MB → ${(totalOut / 1024 / 1024).toFixed(2)} MB  (${saved.toFixed(1)}% saved)`);
console.log(`Manifest: ${manifestPath}`);
