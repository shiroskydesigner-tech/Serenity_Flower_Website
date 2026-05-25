# /logo — 品牌 LOGO 與標記

所有 LOGO / 識別標記的存放位置。在 HTML / Astro 元件中以 `/logo/<filename>` 引用。

## 現有檔案(來自 BrandBook)

| 檔名 | 類型 | 使用情境 |
|---|---|---|
| `wordmark.svg` | 主 logotype(雙語) | 頁面 header 主要 wordmark |
| `wordmark-compact.svg` | 單行精簡版 | 較窄的 nav 列、footer |
| `mark-skeleton.svg` | 幾何骨架標記 | favicon、社群頭像、需要圖示而非文字時 |
| `mark-tulip.svg` | 鬱金香線稿 | Hero 區的圖像佔位、空白圖位的填充 |
| `mark-hua.svg` | 「花」字章 | CJK 包裝、印章式視覺 |
| `monogram-sf.svg` | SF 斜體字母標 | 16/32px 微縮 favicon、極小尺寸 |
| `logo-primary.png` | 主 logo 點陣版 | 不支援 SVG 的舊瀏覽器 fallback |
| `Logo_web-01.svg` 至 `Logo_web-08.svg` | 8 個 wordmark 變體 | BrandBook 上傳的多版本,供挑選 |

## 怎麼決定要用哪個

- **header**:`wordmark.svg`(主版),小螢幕切 `wordmark-compact.svg`
- **footer**:`wordmark.svg`(縮小)或 `mark-skeleton.svg`
- **favicon**(瀏覽器 tab 圖示):`monogram-sf.svg`(小)或 `mark-skeleton.svg`(中)
- **打開時的啟動畫面 / OG image**:`mark-skeleton.svg`

## 如何更換 LOGO

**方法 A — 直接覆蓋(最快)**
把新檔放在這資料夾,保持**同樣的檔名**,瀏覽器下次重新整理就生效。

**方法 B — 換成不同檔名**
1. 把新檔放進這資料夾
2. 開啟 `src/components/Wordmark.astro`(若有)或搜尋專案內所有 `/logo/wordmark.svg` 字串
3. 改成新檔名

## 命名規則

- SVG 檔用 kebab-case:`wordmark.svg`、`mark-skeleton.svg`
- 變體用後綴:`wordmark-light.svg`、`wordmark-on-dark.svg`
- 不要在檔名加日期(像 `wordmark-20260523.svg`)— 用 git history 追版本即可

## 顏色

所有 SVG 內部硬寫品牌色:
- 主 ink `#3E2D21`
- 主 accent `#89583A`(bark)
- 底色 `#D8BE99`(linen)或 `#EEE5D6`(cream)

若改了品牌色,SVG 內的色碼也要對應修改(或重新從 BrandBook 出檔)。
