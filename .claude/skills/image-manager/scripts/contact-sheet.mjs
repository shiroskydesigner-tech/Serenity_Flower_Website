#!/usr/bin/env node
// Generate HTML contact sheets for browsing/curating folders of images.
// Usage: node contact-sheet.mjs --src <folder> --out <folder> [--width 240] [--max 500] [--recurse]
//
// Behavior:
//   - If --src is a folder containing subfolders, generates one sheet per subfolder
//     (each subfolder with <=max images), plus a master index.html.
//   - If --src contains images directly (no subfolders), generates one sheet for it.
//   - Skips subfolders with > max images (reported in console + master index).
//   - Idempotent: skips existing thumbnails if newer than source.

import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic']);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) out[a.slice(2)] = true;
      else { out[a.slice(2)] = next; i++; }
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.src || !args.out) {
  console.error('Usage: contact-sheet.mjs --src <folder> --out <folder> [--width 240] [--max 500]');
  process.exit(1);
}
const WIDTH = Number(args.width || 240);
const MAX = Number(args.max || 500);

async function listImages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isFile() && EXTS.has(extname(e.name).toLowerCase())) out.push(e.name);
  }
  return out.sort();
}
async function listSubdirs(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(e.name);
  }
  return out.sort();
}

async function makeThumb(srcPath, outPath) {
  if (existsSync(outPath)) {
    const [s, o] = await Promise.all([stat(srcPath), stat(outPath)]);
    if (o.mtimeMs >= s.mtimeMs) return false;
  }
  await sharp(srcPath, { failOn: 'none' })
    .rotate()
    .resize({ width: WIDTH })
    .webp({ quality: 75 })
    .toFile(outPath);
  return true;
}

function htmlEscape(s) {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function sheetHtml({ title, items, parentLink }) {
  const grid = items.map(it => `
    <figure>
      <a href="${htmlEscape(it.full)}" target="_blank" title="${htmlEscape(it.name)}">
        <img src="thumbs/${htmlEscape(it.thumb)}" loading="lazy" alt="${htmlEscape(it.name)}">
      </a>
      <figcaption>${htmlEscape(it.name)}</figcaption>
    </figure>`).join('\n');
  return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8">
<title>${htmlEscape(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 13px/1.4 -apple-system,'Segoe UI',sans-serif; margin: 0; padding: 16px; background:#111; color:#eee; }
  header { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px; }
  h1 { font-size:18px; margin:0; font-weight:500; }
  .meta { color:#888; font-size:12px; }
  .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(${WIDTH}px, 1fr)); gap:12px; }
  figure { margin:0; }
  img { width:100%; height:auto; display:block; background:#222; border-radius:4px; cursor:zoom-in; }
  figcaption { font-size:11px; color:#888; margin-top:4px; word-break:break-all; }
  a { color:inherit; text-decoration:none; }
  .back { color:#7af; text-decoration:none; font-size:12px; }
</style>
<header>
  <h1>${htmlEscape(title)}</h1>
  <div class="meta">${items.length} images · click to open original${parentLink ? ` · <a class="back" href="${parentLink}">↑ back to index</a>` : ''}</div>
</header>
<div class="grid">${grid}</div>
`;
}

const srcSubs = await listSubdirs(args.src);
await mkdir(args.out, { recursive: true });

const summary = []; // { name, count, skipped, sheetPath }
const includeMode = srcSubs.length > 0;

if (includeMode) {
  for (const sub of srcSubs) {
    const subSrc = join(args.src, sub);
    const subOut = join(args.out, sub);
    const thumbsOut = join(subOut, 'thumbs');
    const imgs = await listImages(subSrc);
    if (imgs.length === 0) { summary.push({ name: sub, count: 0, skipped: 'empty' }); continue; }
    if (imgs.length > MAX) { summary.push({ name: sub, count: imgs.length, skipped: `too-large (>${MAX})` }); continue; }
    await mkdir(thumbsOut, { recursive: true });
    console.log(`[${sub}] ${imgs.length} images`);
    const items = [];
    let made = 0;
    for (let i = 0; i < imgs.length; i++) {
      const name = imgs[i];
      const srcPath = join(subSrc, name);
      const thumbName = basename(name, extname(name)) + '.webp';
      const thumbPath = join(thumbsOut, thumbName);
      try {
        const created = await makeThumb(srcPath, thumbPath);
        if (created) made++;
        items.push({ name, thumb: thumbName, full: pathToFileURL(srcPath).href });
      } catch (err) {
        console.warn(`  skip ${name}: ${err.message}`);
      }
      if ((i + 1) % 25 === 0) process.stdout.write(`  …${i + 1}/${imgs.length}\r`);
    }
    process.stdout.write(' '.repeat(40) + '\r');
    const sheetPath = join(subOut, 'index.html');
    await writeFile(sheetPath, sheetHtml({ title: sub, items, parentLink: '../index.html' }));
    summary.push({ name: sub, count: imgs.length, sheetPath: relative(args.out, sheetPath).split(sep).join('/'), made });
    console.log(`  → ${made} new thumbs, sheet: ${sheetPath}`);
  }
} else {
  const imgs = await listImages(args.src);
  const thumbsOut = join(args.out, 'thumbs');
  await mkdir(thumbsOut, { recursive: true });
  const items = [];
  for (const name of imgs) {
    const srcPath = join(args.src, name);
    const thumbName = basename(name, extname(name)) + '.webp';
    await makeThumb(srcPath, join(thumbsOut, thumbName));
    items.push({ name, thumb: thumbName, full: pathToFileURL(srcPath).href });
  }
  await writeFile(join(args.out, 'index.html'), sheetHtml({ title: basename(args.src), items }));
  summary.push({ name: basename(args.src), count: imgs.length, sheetPath: 'index.html' });
}

// Master index
const masterRows = summary.map(s => {
  if (s.skipped) return `<tr><td>${htmlEscape(s.name)}</td><td>${s.count}</td><td style="color:#a44">${s.skipped}</td></tr>`;
  return `<tr><td><a href="${htmlEscape(s.sheetPath)}">${htmlEscape(s.name)}</a></td><td>${s.count}</td><td style="color:#4a4">ready</td></tr>`;
}).join('\n');
const totalIncluded = summary.filter(s => !s.skipped).reduce((a, s) => a + s.count, 0);
const totalSkipped = summary.filter(s => s.skipped).length;
const masterHtml = `<!doctype html><html lang="zh-Hant"><meta charset="utf-8">
<title>Contact Sheets · ${htmlEscape(basename(args.src))}</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 14px/1.5 -apple-system,'Segoe UI',sans-serif; max-width:900px; margin:0 auto; padding:32px 16px; background:#111; color:#eee; }
  h1 { font-weight:500; }
  table { width:100%; border-collapse:collapse; }
  td, th { padding:8px 12px; border-bottom:1px solid #333; text-align:left; }
  a { color:#7af; }
  .summary { color:#888; font-size:13px; margin-bottom:24px; }
</style>
<h1>Contact Sheets</h1>
<div class="summary">${summary.length} folders · ${totalIncluded} images covered · ${totalSkipped} skipped</div>
<table>
  <thead><tr><th>Folder</th><th>Images</th><th>Status</th></tr></thead>
  <tbody>${masterRows}</tbody>
</table>
`;
await writeFile(join(args.out, 'index.html'), masterHtml);
console.log(`\nMaster index: ${join(args.out, 'index.html')}`);
console.log(`Covered: ${totalIncluded} images across ${summary.length - totalSkipped} folders`);
if (totalSkipped) console.log(`Skipped ${totalSkipped} folders (too large or empty)`);
