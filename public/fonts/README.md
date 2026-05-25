# /fonts — 品牌字型

實際提供的字型檔位置。CSS 透過 `@font-face` 從 `/fonts/` URL 載入。

## 目前的檔案

| 檔名 | 字重 | 用途 |
|---|---|---|
| `BELL.TTF` | Regular 400 | Display 英文(標題、大字、Wordmark) |
| `BELLB.TTF` | Bold 700 | 強調(罕用,品牌偏好用斜體強調而非粗體) |
| `BELLI.TTF` | Italic | 強調(主要的 emphasis 方式) |

## 如何更換 / 新增字型

1. 把新字型檔(.ttf / .woff / .woff2)放進此資料夾
2. 開啟 `src/styles/tokens.css`,找到 `@font-face` 區塊
3. 仿照現有寫法新增一條:
   ```css
   @font-face {
     font-family: "你的字型名稱";
     src: url("/fonts/你的檔名.ttf") format("truetype");
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   ```
4. 在 `--font-display-en` / `--font-body-en` 等變數裡把字型名稱排進 fallback stack

CJK(中文)字型不在這裡 — Noto Serif TC / Noto Sans TC 是從 Google Fonts CDN 載入,在 tokens.css 開頭的 `@import url(...)` 那行可看到。若要改成自托管,把 .otf / .ttf 放進這資料夾、寫 `@font-face`、把 import 移除即可。

## 命名規則

保持品牌原檔名(BELL.TTF 等)— 上游 BrandBook 換新檔時直接覆蓋即可,不必改 CSS。
自己加的字型用 kebab-case:`serenity-grotesk-medium.woff2`。
