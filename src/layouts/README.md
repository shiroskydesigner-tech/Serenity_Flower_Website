# /src/layouts — 頁面骨架

包住每個 page 的最外層 wrapper。決定 `<html>`、`<head>`、`<body>`、全域 CSS 載入。

## 檔案

| 檔案 | 用途 |
|---|---|
| `BaseLayout.astro` | 所有公開頁面的基底:`<head>` meta、字型載入、全域 CSS、`<slot />` 給 page 內容 |

## 用法

每個 page 的開頭:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="頁面標題" description="這個頁的 meta description">
  <!-- 頁面內容 -->
</BaseLayout>
```

## Props

- `title` (必填):瀏覽器 tab 顯示的標題
- `description`(可選):meta description,SEO 與分享卡用

## 何時要加新 Layout

- 不要為每個 section 各做一個 layout
- 唯一合理的新 layout 是 admin(因為 admin 有自己的 chrome、不想載品牌主字型)
- 可以考慮:`AdminLayout.astro`(目前 admin 直接用 BaseLayout)

## 想改全站 header / footer?

不要動 BaseLayout 加 header — 應該:
1. 在 `src/components/Header.astro` 建好 Header 元件
2. 在 BaseLayout 引入它
3. 控制顯隱的條件(例如 admin 不顯示時用 conditional)

這樣 layout 保持骨架角色,內容歸元件。
