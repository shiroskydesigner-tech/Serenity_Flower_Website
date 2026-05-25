---
name: image-manager
description: Read, inspect, categorize, and optimize images from any folder in this project. Use this skill whenever the user asks to scan an image folder, list image metadata (dimensions/size/format), sort or rename images, deduplicate, or convert/compress images into web-ready formats (WebP/AVIF) at multiple responsive sizes. Triggers on phrases like "讀取圖片", "處理圖片", "壓縮圖片", "分類照片", "做縮圖", "輸出 WebP", "scan images", "optimize images".
---

# Image Manager

A project-local skill for the Serenity Flower portfolio site. Handles the full pipeline from raw source photos → web-ready assets.

## When to use

- User points at a folder (e.g. `Ref_Photo/`, `assets/raw/`) and asks to:
  - **inspect** — list files, dimensions, file sizes, formats, EXIF
  - **categorize** — sort by orientation / aspect ratio / dominant color / EXIF date / filename pattern; move into subfolders or rename
  - **deduplicate** — find perceptual or hash duplicates
  - **optimize** — produce responsive `WebP` + `AVIF` variants (e.g. 480/960/1440/1920 widths) plus a low-quality placeholder (LQIP) and a manifest JSON the site can import
  - **process for upload** — when a new portfolio piece is added, run the full pipeline and emit the asset manifest

## Project conventions

- **Source images**: `Ref_Photo/` (raw, untouched) and any future `assets/raw/<work-slug>/`
- **Output**: `public/images/<work-slug>/` with naming `{basename}-{width}.{webp|avif}`
- **Manifest**: `public/images/<work-slug>/manifest.json` — array of `{ src, width, height, formats, lqip, alt }` consumed by the portfolio site
- **Default widths**: `[480, 960, 1440, 1920]`
- **Default formats**: `webp` (quality 82) + `avif` (quality 60)
- Never overwrite originals in `Ref_Photo/`. Treat that folder as read-only source-of-truth.

## How to operate

### 1. Inspect a folder
Use the `scripts/inspect.mjs` helper (sharp-based). It prints a table of every image with width × height, file size, format, aspect ratio, and a suggested category (`hero` if ≥1920w landscape, `portrait`, `square`, `thumbnail` if <600w).

```
node .claude/skills/image-manager/scripts/inspect.mjs <folder>
```

### 2. Optimize for web
Use `scripts/optimize.mjs`. It reads a source folder, writes responsive WebP+AVIF variants to the output folder, generates LQIP (base64 20px blur) and `manifest.json`.

```
node .claude/skills/image-manager/scripts/optimize.mjs \
  --src <source-folder> \
  --out <output-folder> \
  --widths 480,960,1440,1920 \
  --formats webp,avif
```

Skip already-processed files by comparing source mtime against existing variants (idempotent — safe to re-run).

### 3. Categorize / rename
For batch renaming or moving by EXIF date / aspect ratio, use `scripts/inspect.mjs --json` and then write a small one-off node script — do NOT add features to the standing scripts for one-off ops.

## Guardrails

- Always confirm the destination folder before writing — never write into `Ref_Photo/`.
- If `sharp` install via `npx -p` is slow on first run, mention it to the user (one-time ~30s).
- For very large batches (>200 images) report progress every 25 files.
- If the user wants a format the scripts don't support (e.g. JPEG-XL), say so rather than silently degrading.

## Output contract

After optimizing, always end your turn with:
1. Count of source → output files
2. Total size before / after (and % saved)
3. Path to the generated `manifest.json`
