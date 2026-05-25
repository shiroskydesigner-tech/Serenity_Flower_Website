/**
 * GET /api/admin/thumb（即時產生並回傳單張縮圖）
 * ─────────────────────────────────────────────────
 * 用途：admin 後台預覽照片時，若 contact sheet 縮圖尚未存在，
 *       此 API 會即時用 sharp 產生 webp 縮圖並回傳，同時快取到磁碟。
 *       下次同一張圖直接讀快取，避免重複處理。
 *       僅 DEV 模式可用。
 *
 * 怎麼設定：
 *   ▸ 縮圖快取目錄 → THUMBS_ROOT（預設 public/_contact_sheets/）
 *   ▸ 找不到圖時的佔位 SVG → placeholderSvg() 函式內的樣式
 *   ▸ 來源資料夾 → 環境變數 ADMIN_SOURCE_ROOT
 *
 * 安全防線：isSafeFolder / isSafeRelPath 阻擋 ../ 路徑穿越攻擊
 */
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const prerender = false;

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic']);
const SOURCE_ROOT = process.env.ADMIN_SOURCE_ROOT || 'D:/SynologyDrive/02_靜謐花間_0A/02_作品照片區';
const PROJECT_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
const THUMBS_ROOT = join(PROJECT_ROOT, 'public', '_contact_sheets');

function isSafeFolder(name: string) {
  return Boolean(name) && !name.includes('..') && !name.includes('/') && !name.includes('\\');
}

function isSafeRelPath(rel: string) {
  return Boolean(rel) && !rel.split('/').some(part => !part || part === '..') && !rel.includes('\\');
}

function safeThumbName(rel: string) {
  const stem = basename(rel, extname(rel)).replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').slice(0, 80) || 'thumb';
  const hash = createHash('sha1').update(rel).digest('hex').slice(0, 12);
  return `${stem}-${hash}.webp`;
}

function placeholderSvg(label: string) {
  const text = label.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360">
    <rect width="360" height="360" fill="#EEE5D6"/>
    <path d="M0 0h360v360H0z" fill="none" stroke="#3E2D21" stroke-opacity=".18"/>
    <text x="180" y="174" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#3E2D21">No preview</text>
    <text x="180" y="202" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3E2D21" fill-opacity=".62">${text}</text>
  </svg>`;
}

async function fileResponse(path: string) {
  const buffer = await readFile(path);
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'no-store',
    },
  });
}

export const GET: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response('Not found', { status: 404 });

  const url = new URL(request.url);
  const folder = url.searchParams.get('folder') || '';
  const rel = url.searchParams.get('rel') || '';
  const ext = extname(rel).toLowerCase();

  if (!isSafeFolder(folder) || !isSafeRelPath(rel) || !IMG_EXTS.has(ext)) {
    return new Response(placeholderSvg('bad source'), {
      status: 400,
      headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
    });
  }

  const sourcePath = join(SOURCE_ROOT, folder, rel);
  const thumbsDir = join(THUMBS_ROOT, folder, 'thumbs');
  const legacyThumbPath = join(thumbsDir, `${basename(rel, ext)}.webp`);
  const generatedThumbPath = join(thumbsDir, safeThumbName(rel));

  try {
    await stat(legacyThumbPath);
    return fileResponse(legacyThumbPath);
  } catch { /* generate or use hashed cache */ }

  try {
    await stat(generatedThumbPath);
    return fileResponse(generatedThumbPath);
  } catch { /* generate below */ }

  try {
    const buffer = await sharp(sourcePath, { failOn: 'none' })
      .rotate()
      .resize({ width: 360, height: 360, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 72 })
      .toBuffer();
    await mkdir(thumbsDir, { recursive: true });
    await writeFile(generatedThumbPath, buffer);
    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(placeholderSvg(ext.slice(1).toUpperCase()), {
      headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
    });
  }
};
