# /src/styles — 全站樣式與設計 token

整個網站的視覺基礎都在這裡。**改色、改字、改間距,都從這資料夾下手。**

## 檔案

| 檔案 | 用途 | 何時要改 |
|---|---|---|
| `tokens.css` | 設計 token(顏色、字型、間距、線條、動效) | 改品牌色、換字型、調尺寸時 |
| `global.css` | 全域元素預設樣式(h1、p、a、.btn、.eyebrow…) | 改某個 HTML 元素的預設長相 |

## 載入順序

`global.css` 在最上面 `@import './tokens.css'`,然後 `BaseLayout.astro` 在 `<head>` 載入 `global.css`,所以 token 全站可用。

## 換顏色 — 改這四行

打開 `tokens.css`,找到:

```css
--ink:    #3E2D21;
--bark:   #89583A;
--linen:  #D8BE99;
--white:  #EEE5D6;
```

把 hex 值改掉。**其他 CSS 完全不必動**,所有頁面同步換色。

## 換字型 — 兩種情境

### A. 換 Display 字型(目前是 Bell)
1. 把新字型 .ttf / .woff2 丟進 `public/fonts/`
2. `tokens.css` 開頭的 `@font-face` 區塊改 `url(...)` 與 `font-family`
3. 改 `--font-display-en` 變數的第一順位

### B. 換 CJK 字型(目前是 Noto Serif TC / Noto Sans TC,Google Fonts CDN)
1. `tokens.css` 開頭的 `@import url('https://fonts.googleapis.com/...')` 改新字型 URL
2. 改 `--font-display-tc` / `--font-body-tc`

## 改間距 / 尺寸

`tokens.css` 裡的 `--s-1` 到 `--s-10`(4px 為基底,翻倍)、`--fs-display-1` 到 `--fs-caption`(字級)。
建議盡量沿用既有 step,不要塞 17px、23px 這種「打破節奏」的數值。

## 命名規則

- token 變數一律用 `--kebab-case`
- 顏色 token 用語意(`--ink`、`--bark`),不用 hex 直接命名(避免 `--brown-700` 這種事後改色會誤導的命名)
- spacing 用 `--s-1` … `--s-10`,字級用 `--fs-*`

## 為什麼這套架構

設計 token 集中化讓「**改一處,全站變色**」成立。如果你發現某個畫面寫死 hex,那是 bug:把它改回 `var(--bark)` 之類。
