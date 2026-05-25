# /src/pages — 站點路由

Astro 把這資料夾的 `.astro` 檔案直接對應到 URL。檔名 = 路徑。

## 路由對照

| 檔案 / 資料夾 | URL | 內容 |
|---|---|---|
| `index.astro` | `/` | 首頁(Hero + 作品集 grid) |
| `works/index.astro` | `/works` | 作品集索引(所有作品) |
| `works/[slug].astro` | `/works/<slug>` | 單一作品詳情 |
| `atelier/index.astro` | `/atelier` | 工作室介紹 |
| `installation/index.astro` | `/installation` | 服務:裝置藝術 |
| `wedding/index.astro` | `/wedding` | 服務:婚禮佈置 |
| `seasonal/index.astro` | `/seasonal` | 服務:節慶花禮 |
| `enquiry/index.astro` | `/enquiry` | 預約 / 聯絡表單 |
| `shop/index.astro` | `/shop` | **電商區(暫不開放)** — 由 `PUBLIC_SHOP_ENABLED` 控制 |
| `admin/index.astro` | `/admin` | **後台策展介面(僅 dev 模式)** |
| `api/admin/*.ts` | `/api/admin/*` | admin 用的 API endpoints(僅 dev) |

## 命名規則

- 一般頁面用 `<section>/index.astro`(對應 `/section`)
- 動態路由用方括號:`[slug].astro` 對應 `/works/<任何 slug>`
- API endpoint 用 `.ts`,不是 `.astro`

## 哪些頁面要加 server-only prerender flag

預設 Astro `output: 'static'` 全部頁面靜態化。需要伺服器端動態行為的(POST、讀檔)在 frontmatter 加:
```ts
export const prerender = Boolean(0);
```

目前以下檔案需要這個:
- `admin/index.astro`(dev-only,讀外部資料夾)
- `api/admin/*.ts`(全部)

## 何時新增路由

- 新增一個服務分類 → 在 `pages/` 下新增資料夾 + `index.astro`
- 新增一篇日誌 / 文章 → 用 content collection,不是直接寫 page
- 內容性質的資料 → 寫進 `src/content/`,不是寫進 page

## 電商怎麼開啟

`PUBLIC_SHOP_ENABLED` 環境變數設成 `true`(在 `.env`)。預設 `false`,`/shop` 路由會 404 或重導。
