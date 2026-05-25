# SERENITY FLOWER · 靜謐花間 — Website

花藝、裝置藝術、空間建構工作室的官方網站。

Astro 為基底,品牌設計系統內建,作品集透過 `/admin` 介面策展發佈。

---

## 🚀 快速開始

```bash
npm install         # 第一次或拉取後
npm run dev         # 啟動 dev server (http://localhost:4321)
npm run build       # 產出正式檔案到 dist/
npm run preview     # 預覽 build 結果
npm run check       # TypeScript / Astro 檢查
```

---

## 📁 專案結構地圖

```
00_Serenity_flower_Website/
│
├─ 00_BrandBook/                  ← 品牌手冊「來源」(設計系統權威來源)
│   └─ Serenity Flower Design System/
│       ├─ README.md              ← 品牌哲學、語調、視覺規則(必讀)
│       ├─ colors_and_type.css    ← 設計 token 的權威版本
│       ├─ assets/                ← 8 個 logo 變體 + mark
│       └─ ui_kits/website/       ← 參考用的純 HTML/JSX UI kit
│
├─ public/                        ← 直接以 URL 提供的靜態檔
│   ├─ fonts/                     ← Bell.TTF 等(改字型在這)
│   ├─ logo/                      ← 所有 LOGO SVG(換 logo 在這)
│   └─ images/                    ← admin 發佈時自動產出的作品圖
│
├─ src/
│   ├─ styles/
│   │   ├─ tokens.css             ← 顏色、字型、間距 token(改色在這)
│   │   └─ global.css             ← 全域元素預設樣式
│   ├─ layouts/BaseLayout.astro   ← 站點骨架(<html>/<head>)
│   ├─ components/                ← 可重複使用元件
│   │   ├─ Wordmark.astro
│   │   ├─ Header.astro
│   │   ├─ Footer.astro
│   │   ├─ EyebrowRule.astro
│   │   ├─ SitePage.astro         ← 標準公開頁面包覆器(含 Header/Footer/skeleton column)
│   │   ├─ ServiceHero.astro      ← service 頁面用的 hero
│   │   └─ WorkList.astro         ← 作品 grid(可依 tag 過濾)
│   ├─ pages/                     ← URL 路由
│   │   ├─ index.astro            ← /
│   │   ├─ works/                 ← /works, /works/<slug>
│   │   ├─ installation/          ← /installation 裝置藝術
│   │   ├─ wedding/               ← /wedding 婚禮佈置
│   │   ├─ seasonal/              ← /seasonal 節慶花禮
│   │   ├─ atelier/               ← /atelier 工作室介紹
│   │   ├─ enquiry/               ← /enquiry 預約
│   │   ├─ shop/                  ← /shop 商品(feature flag 控制)
│   │   ├─ admin/                 ← /admin 後台(僅 dev 模式)
│   │   └─ api/admin/             ← admin 用的 API endpoints
│   └─ content/
│       ├─ content.config.ts      ← collection schema
│       ├─ tags.json              ← 標籤庫
│       └─ works/                 ← 每個作品的 .md 檔
│
├─ .claude/skills/                ← 專案內 skill(image-manager 等)
├─ Ref_Photo/                     ← 草稿參考圖(不會進版控)
└─ astro.config.mjs / tsconfig.json / package.json
```

每個資料夾內都有 `README.md` 詳細說明命名規則與用途。

---

## 🎨 我要換 LOGO

把新 SVG 放到 [public/logo/](public/logo/),**保持相同檔名**(`wordmark.svg`、`mark-skeleton.svg` 等)瀏覽器重新整理就生效。

若要改用不同檔名,改 [src/components/Wordmark.astro](src/components/Wordmark.astro) 的 `src` 屬性。

詳細說明:[public/logo/README.md](public/logo/README.md)

---

## 🎨 我要換配色

打開 [src/styles/tokens.css](src/styles/tokens.css),改這四行:

```css
--ink:    #3E2D21;   /* 文字、細線 */
--bark:   #89583A;   /* 強調色 */
--linen:  #D8BE99;   /* 主要底色 */
--white:  #EEE5D6;   /* 卡片/inset 底色 */
```

其他 CSS 都用 `var(--token)` 引用,不必動。全站同步改色。

詳細說明:[src/styles/README.md](src/styles/README.md)

---

## 🔤 我要換字型

**Latin display 字型(目前 Bell)**
1. 把新 .ttf / .woff2 放進 [public/fonts/](public/fonts/)
2. 改 [src/styles/tokens.css](src/styles/tokens.css) 的 `@font-face` 區塊

**CJK 字型(目前 Noto Serif/Sans TC)**
- tokens.css 開頭的 `@import url('https://fonts.googleapis.com/...')` 改成新字型的 Google Fonts URL

詳細說明:[public/fonts/README.md](public/fonts/README.md)

---

## 🖼️ 我要新增作品

**正常流程**:打開 dev server 後到 http://localhost:4321/admin ,選圖、拖標籤、按發佈。

流程詳述:[src/content/README.md](src/content/README.md)

`admin` 介面會自動:
1. 從外部資料夾讀原檔
2. sharp 壓縮成 WebP+AVIF 多尺寸到 [public/images/<slug>/](public/images/)
3. 寫 [src/content/works/<slug>.md](src/content/works/)
4. Astro HMR 自動更新首頁

預設 `status: draft`,只有 dev 模式可看。要上線把該作品 `.md` 裡 `status` 改 `published`。

---

## 🛒 開啟電商區

複製 `.env.example` 為 `.env`,設定:

```
PUBLIC_SHOP_ENABLED=true
```

重啟 dev server。`/shop` 路由就會在正式環境可訪問,Header 也會出現「Shop · 商品」連結。

---

## 🎯 設計哲學備忘

(從 [00_BrandBook/Serenity Flower Design System/README.md](00_BrandBook/Serenity Flower Design System/README.md) 摘錄)

- **建築語彙,不是花的形容詞** —— 量體、骨架、動線、留白、張力
- **宣告語氣,不是推銷語氣** —— "我們拒絕…",不寫"請來訂購…"
- **雙語並置** —— 英文小、上;繁中大、下
- **最多 3 個色調共存於同一畫面**
- **絕對禁止**:陰影、漸層、emoji、圓角 >2px、玻璃擬態、SaaS 卡片格
- **96px 空白骨架欄**保留在每頁右側 —— 這是品牌簽名

---

## 🧩 想加新的內容類型?

例如「日誌 / Journal」這類部落格內容:

1. 在 [src/content/content.config.ts](src/content/content.config.ts) 新增一個 collection
2. 在 [src/content/](src/content/) 下開對應資料夾(例如 `journal/`)
3. 在 [src/pages/](src/pages/) 開頁(例如 `journal/index.astro` + `journal/[slug].astro`)

跟 `works` 的模式一樣。

---

## 🚧 還沒做的事

- [ ] 表單後端串接(`/enquiry` 表單目前只是 alert)
- [ ] 串接金流(`/shop` 目前是 placeholder)
- [ ] 部署設定(static export 已可運作,差一個 host)
- [ ] SEO meta + Open Graph 圖片自動產出
- [ ] sitemap.xml + robots.txt
- [ ] 把巨型資料夾(`01_花藝布置` 9000+ 張)的縮圖也做出來
