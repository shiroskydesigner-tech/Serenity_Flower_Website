/**
 * GET /api/admin/sources（列出來源照片資料夾）
 * ─────────────────────────────────────────────────
 * 用途：admin 後台左側欄顯示「資料夾清單」，每個資料夾含照片數量與縮圖是否已產生。
 *       僅 DEV 模式可用，正式環境回 404。
 *
 * 怎麼設定：
 *   ▸ 換來源資料夾路徑 → 環境變數 ADMIN_SOURCE_ROOT，或改下方 SOURCE_ROOT 預設值
 *   ▸ 支援更多圖片格式 → 改 IMG_EXTS 加副檔名
 *   ▸ 縮圖存放位置 → 改 THUMBS_ROOT（預設 public/_contact_sheets/）
 *
 * 輸出：JSON [{ name, count, thumbsAvailable }, ...]，依照片數量由大到小排序
 */
import type { APIRoute } from 'astro';
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const prerender = false;

type SourceFolder = {
  name: string;                     // 資料夾名稱
  count: number;                    // 內含照片總數（遞迴計算）
  thumbsAvailable: boolean;         // 是否已產生 contact sheet 縮圖
};

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic']);
// 來源照片根目錄 — 環境變數可覆寫
const SOURCE_ROOT = process.env.ADMIN_SOURCE_ROOT || 'D:/SynologyDrive/02_靜謐花間_0A/02_作品照片區';
const PROJECT_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
const THUMBS_ROOT = join(PROJECT_ROOT, 'public', '_contact_sheets');

async function countImages(dir: string): Promise<number> {
  let n = 0;
  try {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isFile() && IMG_EXTS.has(extname(e.name).toLowerCase())) n++;
      else if (e.isDirectory()) n += await countImages(join(dir, e.name));
    }
  } catch { /* ignore */ }
  return n;
}

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) return new Response('Not found', { status: 404 });
  try {
    const entries = await readdir(SOURCE_ROOT, { withFileTypes: true });
    const folders: SourceFolder[] = await Promise.all(
      entries.filter(e => e.isDirectory()).map(async (e) => {
        const folderPath = join(SOURCE_ROOT, e.name);
        const count = await countImages(folderPath);
        let thumbsAvailable = false;
        try {
          await stat(join(THUMBS_ROOT, e.name, 'thumbs'));
          thumbsAvailable = true;
        } catch { /* no thumbs yet */ }
        return { name: e.name, count, thumbsAvailable };
      })
    );
    folders.sort((a, b) => b.count - a.count);
    return new Response(JSON.stringify(folders), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
};
