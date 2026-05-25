# /src/content — 內容資料(作品、標籤)

網站的「資料庫」,但其實只是 Markdown / JSON 檔案。透過 Astro Content Collections 自動驗證 schema 並注入頁面。

## 結構

| 路徑 | 用途 |
|---|---|
| `content.config.ts` | **不要刪** — 定義 collection schema(欄位、型別、必填) |
| `works/` | 每個作品一個 `.md` 檔。由 `/admin` 發佈時自動產出 |
| `tags.json` | 預設標籤庫(目前 16 個,4 個面向) |

## 作品 .md 格式

每個檔案的 frontmatter 是 YAML,符合 `content.config.ts` 裡的 schema:

```yaml
---
title: "蓉欣畢業花束"
subtitle: "第一束送給自己的花"
date: 2025-06-12
hero: img-01
status: draft               # draft | published
featured: false
tags:
  - bouquet-gift
  - graduation
images:
  - id: img-01
    alt: "純白鬱金香側面"
    order: 0
    width: 1920
    height: 2880
    lqip: "data:image/webp;base64,..."
    variants:
      - { src: /images/<slug>/img-01-480.webp,  width: 480,  height: 720, format: webp }
      - ...
---

（這裡是作品的故事 / 說明,支援 Markdown）
```

## 命名規則

- 檔名 = 作品 slug:`20250612-蓉欣畢業花束.md`(自動生成)
- 包含日期前綴方便排序與避免衝突
- 不要手動改檔名 — 改了會破壞 URL

## 怎麼新增作品

**正常**:用 `/admin` 介面操作,自動寫檔。
**手動**(極少需要):複製一個現有 `.md`、改 frontmatter、改 images 陣列、把圖放進 `public/images/<slug>/`。

## 怎麼改標籤庫

開啟 `tags.json`,新增 / 刪改條目:

```json
{
  "slug": "valentines",
  "name": "情人節",
  "group": "occasion",
  "description": "情人節"
}
```

`group` 有四個合法值:`form`(形式)、`scene`(場景)、`occasion`(節慶/場合)、`kind`(類型)。Admin palette 會自動依 group 分區顯示。

## status 流程

- `draft`:dev 模式首頁可看,正式部署不會顯示
- `published`:正式部署 + dev 模式都顯示

要把作品上線,手動把 `.md` 裡 `status: draft` 改成 `status: published`。Astro HMR 會自動 reload。
