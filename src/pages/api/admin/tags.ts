/**
 * GET /api/admin/tags（提供標籤面板的標籤清單）
 * ─────────────────────────────────────────────────
 * 用途：admin 後台讀取可用標籤，顯示為可拖曳的「標籤面板」。
 *       僅 DEV 模式可用。
 *
 * 怎麼設定：
 *   ▸ 加/減/改標籤 → 改 src/content/tags.json
 *     格式：[{ group: "婚禮", tags: ["wedding", "bouquet-wedding", ...] }, ...]
 *   ▸ 標籤更名後，舊作品 .md 內的 tags 不會自動同步，需手動更新
 */
import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) return new Response('Not found', { status: 404 });
  const here = dirname(fileURLToPath(import.meta.url));
  const tagsPath = join(here, '..', '..', '..', 'content', 'tags.json');
  const data = await readFile(tagsPath, 'utf-8');
  return new Response(data, { headers: { 'Content-Type': 'application/json' } });
};
