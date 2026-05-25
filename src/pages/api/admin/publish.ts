/**
 * POST /api/admin/publish（將一組照片發佈為新作品）
 * ─────────────────────────────────────────────────
 * 用途：admin 後台點「發佈」時呼叫；也被 scripts/batch-publish-*.mjs 使用。
 *       功能：讀原檔 → sharp 處理成多尺寸 webp/avif → 寫入 .md frontmatter。
 *
 * 怎麼調整圖片輸出規格：
 *   ▸ WIDTHS  → 輸出哪些寬度（px），會產生對應的 srcset
 *   ▸ FORMATS → 同時輸出哪些格式（webp 相容性好、avif 體積小）
 *   ▸ QUALITY → 壓縮品質（0-100，越高越大張）
 *
 * 輸入：POST JSON，欄位見下方 PublishPayload 型別
 * 輸出：JSON { ok, slug, imageCount, variantCount }
 *
 * 安全性：prerender=false → 僅 SSR 端執行；正式環境部署時應加 auth/IP 限制。
 */
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const prerender = false;

// 圖片變體規格 — 這 3 個常數控制全站作品圖的尺寸/格式/品質
const WIDTHS = [480, 960, 1440, 1920];                   // 響應式寬度
const FORMATS = ['webp', 'avif'] as const;               // 輸出格式
const QUALITY = { webp: 82, avif: 60 } as const;         // 壓縮品質

type PublishPayload = {
  title: string;
  subtitle?: string;
  story?: string;
  folderName?: string;
  date?: string;
  tags?: string[];
  heroIndex?: number;
  images: Array<{ sourcePath: string; name?: string; alt?: string; tags?: string[] }>;
};

const projectRoot = fileURLToPath(new URL('../../../../', import.meta.url));

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function buildSlug(title: string, folderName: string | undefined, date: string): string {
  // Date prefix
  const datePart = date.replaceAll('-', '');
  // Title part: keep CJK + word chars, replace whitespace and punctuation with -
  const titlePart = title.trim()
    .replace(/[\s\/\\:|]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return titlePart ? `${datePart}-${titlePart}` : `${datePart}-${(folderName || 'work').slice(0, 20)}`;
}

function pickDate(folderName: string | undefined, override: string | undefined): string {
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  const m = folderName?.match(/^(\d{4})(\d{2})(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return new Date().toISOString().slice(0, 10);
}

// Minimal YAML emitter for our known frontmatter shape.
function yamlScalar(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  return JSON.stringify(String(v));            // double-quote everything (safe)
}
function toYaml(obj: Record<string, unknown>, indent = 0): string {
  let s = '';
  const pad = ' '.repeat(indent);
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) { s += `${pad}${k}: []\n`; continue; }
      s += `${pad}${k}:\n`;
      for (const item of v) {
        if (item && typeof item === 'object') {
          const inner = toYaml(item as Record<string, unknown>, indent + 4);
          const lines = inner.split('\n').filter(Boolean);
          if (lines.length === 0) continue;
          s += `${pad}  - ${lines[0].slice(indent + 4)}\n`;
          for (const line of lines.slice(1)) s += `${line}\n`;
        } else {
          s += `${pad}  - ${yamlScalar(item)}\n`;
        }
      }
    } else if (v && typeof v === 'object') {
      s += `${pad}${k}:\n${toYaml(v as Record<string, unknown>, indent + 2)}`;
    } else {
      s += `${pad}${k}: ${yamlScalar(v)}\n`;
    }
  }
  return s;
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response('Not found', { status: 404 });

  let payload: PublishPayload;
  try { payload = await request.json(); }
  catch { return json({ error: 'invalid JSON body' }, 400); }

  if (!payload.title?.trim()) return json({ error: 'title required' }, 400);
  if (!Array.isArray(payload.images) || payload.images.length === 0) {
    return json({ error: 'at least one image required' }, 400);
  }

  const date = pickDate(payload.folderName, payload.date);
  const slug = buildSlug(payload.title, payload.folderName, date);
  const outDir = join(projectRoot, 'public', 'images', slug);
  await mkdir(outDir, { recursive: true });

  const manifest: Array<Record<string, unknown>> = [];
  const heroIdx = Math.max(0, Math.min(payload.heroIndex ?? 0, payload.images.length - 1));

  for (let i = 0; i < payload.images.length; i++) {
    const img = payload.images[i];
    if (!img?.sourcePath) return json({ error: `image ${i} missing sourcePath` }, 400);

    const id = `img-${String(i + 1).padStart(2, '0')}`;
    let meta;
    try { meta = await sharp(img.sourcePath).rotate().metadata(); }
    catch (e) { return json({ error: `cannot read ${img.sourcePath}: ${(e as Error).message}` }, 500); }
    if (!meta.width || !meta.height) return json({ error: `bad metadata for ${img.sourcePath}` }, 500);

    const ratio = meta.height / meta.width;
    const variants: Array<Record<string, unknown>> = [];

    for (const w of WIDTHS) {
      if (w > meta.width) continue;
      const h = Math.round(w * ratio);
      for (const fmt of FORMATS) {
        const outName = `${id}-${w}.${fmt}`;
        const outPath = join(outDir, outName);
        const pipe = sharp(img.sourcePath).rotate().resize({ width: w });
        const buf = fmt === 'avif'
          ? await pipe.avif({ quality: QUALITY.avif }).toBuffer()
          : await pipe.webp({ quality: QUALITY.webp }).toBuffer();
        await writeFile(outPath, buf);
        variants.push({ src: `/images/${slug}/${outName}`, width: w, height: h, format: fmt });
      }
    }

    const lqipBuf = await sharp(img.sourcePath).rotate().resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
    const lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;

    manifest.push({
      id,
      alt: (img.alt && img.alt.trim()) || payload.title.trim(),
      order: i,
      width: meta.width,
      height: meta.height,
      lqip,
      variants,
    });
  }

  // Merge per-image tags into work-level tags
  const tagSet = new Set<string>(payload.tags || []);
  for (const img of payload.images) if (img.tags) for (const t of img.tags) tagSet.add(t);

  const frontmatter: Record<string, unknown> = {
    title: payload.title.trim(),
    subtitle: payload.subtitle?.trim() || undefined,
    date,
    hero: manifest[heroIdx]?.id,
    status: 'draft',
    featured: false,
    tags: Array.from(tagSet),
    images: manifest,
  };

  const md = `---\n${toYaml(frontmatter)}---\n\n${payload.story || ''}\n`;
  const mdPath = join(projectRoot, 'src', 'content', 'works', `${slug}.md`);
  await writeFile(mdPath, md, 'utf-8');

  return json({
    ok: true,
    slug,
    imageCount: manifest.length,
    variantCount: manifest.reduce((a, m) => a + (m.variants as unknown[]).length, 0),
    mdPath,
    outDir,
  });
};
