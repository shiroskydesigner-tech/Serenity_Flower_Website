/**
 * content.config.ts（作品資料結構定義）
 * ─────────────────────────────────────────────────
 * 用途：定義 src/content/works/*.md 檔案的「必填欄位」與「型別」。
 *       Astro 編譯時會驗證每個作品檔案，欄位缺漏或型別錯誤會編譯失敗。
 *
 * 一般使用者通常不需要改這支 — 除非：
 *   ▸ 想新增一個欄位（例如「客戶名稱」、「地點」）
 *     → 在 schema 加一行：customField: z.string().optional()
 *   ▸ 想新增可選的 tag 種類 → 直接在作品 .md 檔的 tags 陣列填新名稱，無需改這
 *   ▸ 想要求某欄位必填 → 移除 .default() 或 .optional()
 *   ▸ 想新增另一個 collection（例如「部落格」）→ 仿 works 加新區塊
 *
 * 欄位說明（schema 區）：
 *   title    作品標題（必填）
 *   subtitle 副標（選填）
 *   date     發佈日期（必填，格式 YYYY-MM-DD）
 *   hero     主視覺圖片 ID（必填，對應 images 陣列中某一張）
 *   images   圖片陣列（每張含 id, alt, 變體規格）
 *   tags     標籤陣列（用於分類過濾，例如 wedding, bouquet-gift）
 *   status   draft（草稿，僅 DEV 顯示）／ published（正式發佈）
 *   featured 是否為精選作品（保留欄位，目前未使用）
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageVariant = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.enum(['webp', 'avif']),
});

const workImage = z.object({
  id: z.string(),
  alt: z.string().min(1, 'alt text is required'),
  order: z.number().int().default(0),
  width: z.number(),
  height: z.number(),
  lqip: z.string().optional(),
  variants: z.array(imageVariant),
});

const works = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    hero: z.string(),                  // id of the image used as hero
    images: z.array(workImage),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('draft'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { works };
