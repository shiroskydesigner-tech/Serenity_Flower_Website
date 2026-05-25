/**
 * POST /api/admin/folder（讀取某資料夾內所有照片清單）
 * ─────────────────────────────────────────────────
 * 用途：admin 後台選定資料夾後，呼叫此 API 取得照片清單（含縮圖路徑）。
 *       用 POST + JSON body，避免中文資料夾名 URL encode 問題。
 *       僅 DEV 模式可用。
 *
 * 怎麼設定：
 *   ▸ 換來源路徑 → 環境變數 ADMIN_SOURCE_ROOT
 *   ▸ 支援更多圖片格式 → 改 IMG_EXTS
 *   ▸ 縮圖存放位置 → public/_contact_sheets/<資料夾名>/thumbs/
 *
 * 輸入：POST JSON { name: "資料夾名" }
 * 輸出：JSON [{ rel, abs, thumbUrl }, ...]
 */
import type { APIRoute } from 'astro';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const prerender = false;

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic']);
const SOURCE_ROOT = process.env.ADMIN_SOURCE_ROOT || 'D:/SynologyDrive/02_靜謐花間_0A/02_作品照片區';
// Thumbs now live inside the project at public/_contact_sheets/ — served by Vite as static files.
const PROJECT_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
const THUMBS_ROOT = join(PROJECT_ROOT, 'public', '_contact_sheets');

async function listImagesRecursive(dir: string, rel = ''): Promise<{ rel: string; abs: string }[]> {
  const out: { rel: string; abs: string }[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const abs = join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isFile() && IMG_EXTS.has(extname(e.name).toLowerCase())) out.push({ rel: r, abs });
    else if (e.isDirectory()) out.push(...await listImagesRecursive(abs, r));
  }
  return out;
}

// POST with JSON body { name: string } — sidesteps URL-encoding issues with CJK folder names.
export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response('Not found', { status: 404 });

  let body: { name?: string };
  try { body = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'bad json' }), { status: 400 }); }

  const name = body.name;
  if (!name || name.includes('..') || name.includes('/') || name.includes('\\')) {
    return new Response(JSON.stringify({ error: 'bad name' }), { status: 400 });
  }

  const folderPath = join(SOURCE_ROOT, name);
  const thumbsDir = join(THUMBS_ROOT, name, 'thumbs');
  try { await stat(folderPath); }
  catch { return new Response(JSON.stringify({ error: 'folder not found' }), { status: 404 }); }

  const images = await listImagesRecursive(folderPath);
  const result = await Promise.all(images.map(async ({ rel, abs }) => {
    const stem = basename(rel, extname(rel));
    const thumbAbs = join(thumbsDir, `${stem}.webp`);
    let thumbUrl: string | null = null;
    try {
      await stat(thumbAbs);
      // Public-relative URL (Vite serves /public as web root).
      thumbUrl = `/_contact_sheets/${encodeURIComponent(name)}/thumbs/${encodeURIComponent(stem)}.webp`;
    } catch {
      thumbUrl = `/api/admin/thumb?folder=${encodeURIComponent(name)}&rel=${encodeURIComponent(rel)}`;
    }
    return { name: rel, sourcePath: abs, thumbUrl };
  }));

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
};
