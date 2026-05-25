# /src/components — 可重複使用的 UI 元件

每個檔案是一個 Astro 元件,可在頁面用 `import X from '../components/X.astro'` 引入。

## 規劃中的元件(陸續建立)

| 檔名 | 用途 | 用在哪裡 |
|---|---|---|
| `Wordmark.astro` | 載入品牌 wordmark SVG | Header、Footer |
| `Header.astro` | 頂部導覽列(雙語連結) | 所有公開頁的 BaseLayout |
| `Footer.astro` | 頁尾 | 所有公開頁的 BaseLayout |
| `EyebrowRule.astro` | 2px bark 短線 + 小寫英文+繁中標籤 | section 開頭的小標 |
| `Hero.astro` | 通用 Hero 區塊(可帶英文+中文+lead 段) | 首頁、各 service 頁 |
| `WorkCard.astro` | 作品集卡片(圖+標題+日期) | 首頁、works/index |
| `ImageFigure.astro` | 帶 LQIP + responsive srcset 的圖區塊 | 作品詳情頁 |

## 命名規則

- 檔名 **PascalCase**:`Header.astro`,不是 `header.astro`
- 元件名稱 = 檔名
- 若有 props,定義 TypeScript `interface Props` 在 frontmatter

## 範例:Eyebrow 用法

```astro
---
import EyebrowRule from '../components/EyebrowRule.astro';
---
<EyebrowRule en="Atelier" tc="工作室" />
```

## 樣式約定

- 元件內部可用 `<style>`(自動 scope)
- 顏色、字型、間距 **全部用 token**(`var(--ink)`、`var(--font-display-en)`),不要寫死
- 不要在元件內放整頁的 layout 寬度設定 — 那是 page 的責任
