# 首頁輪播資料夾 · public/news/

此資料夾控制 **首頁 Hero 區** 的 5 張輪播幻燈片。

## 📁 你需要放的檔案

```
public/news/
├── README.md      ← 本檔（說明）
├── news.md        ← 文字內容（編輯這個改文字）
├── 01.jpg         ← 第 1 張圖
├── 02.jpg         ← 第 2 張圖
├── 03.jpg         ← 第 3 張圖
├── 04.jpg         ← 第 4 張圖
└── 05.jpg         ← 第 5 張圖
```

## 📐 圖片建議規格

- **比例**：建議 4:5（直幅）或 1:1（正方）— 與 hero 區右側欄位比例匹配
- **尺寸**：寬度 ≥ 1200px（高解析手機螢幕用），建議 1600×2000
- **格式**：JPG（推薦，檔小）／ PNG（透明背景用）／ WEBP（最省流量）
- **檔名**：固定 `01.jpg` ~ `05.jpg`，或在 `news.md` 改 `image:` 欄位指定其他檔名
- **大小**：建議單張 < 500KB（用 [TinyPNG](https://tinypng.com/) 壓縮）

## ✏️ 改文字

開啟 [news.md](news.md) 編輯。每張幻燈片含：

| 欄位 | 說明 | 範例 |
|---|---|---|
| `image` | 圖檔名 | `01.jpg` |
| `title` | 英文標題（大字）| `Spring Bouquet` |
| `titleTc` | 中文標題 | `春之捧花` |
| `subtitle` | 上方小標 | `二〇二六 · 三月` |
| `imageAlt` | 圖片無障礙描述 | `春日捧花特寫` |
| `cta` | 按鈕文字（選填）| `預約洽談` |
| `ctaHref` | 按鈕連結 | `/enquiry` |
| 內文 | 欄位後空一行，自由文字 | `用櫻花與尤加利做了一束捧花。` |

## ⏱ 輪播設定

- 自動切換間隔：**5 秒**
- 動畫節奏（序列式：先滑出、再滑進）：
  - **Phase 1（0–500ms）**：舊內容滑出 — 文字向右、圖片向左
  - **Phase 2（500–1000ms）**：新內容滑入 — 文字從左、圖片從右
  - **Idle（1000–5000ms）**：靜止顯示 4 秒，讓使用者閱讀
- 兩個 phase **不重疊**，視覺乾淨無干擾
- 動畫時長 500ms（單向），使用品牌緩動 `--ease-stately`
- 滑鼠移上 hero 區會 **自動暫停** 輪播
- 系統開啟「減少動態」時 **停止位移動畫**，只剩淡入淡出（無障礙）
- 底部小圓點可點擊跳轉指定張
- 鍵盤左右鍵也可切換

## 🔄 修改後

- 開發伺服器（`npm run dev` 已開啟）→ **存檔即更新**
- 若沒看到變化：瀏覽器按 `Ctrl + Shift + R` 強制重整

## 🛠 進階調整

| 想改什麼 | 改哪裡 |
|---|---|
| 輪播間隔（預設 5 秒）| `src/pages/index.astro` 找 `INTERVAL_MS = 5000` |
| 單向動畫時長（預設 500ms）| `src/pages/index.astro` 4 處 `0.5s var(--ease-stately) forwards` + JS 內 `ANIM_MS = 500`，請**同步改**（總動畫 = ANIM_MS × 2）|
| 動畫位移距離（預設 40px）| `src/pages/index.astro` 4 個 `@keyframes sf-slide-*` 內的 `translateX(±40px)` |
| 反轉動畫方向 | 將 4 個 @keyframes 的 `translateX` 正負互換（文字變右進左出、圖片變左進右出）|
| 改回同步動畫（不要序列式）| `go()` 函式內把「Phase 2 setTimeout」拆掉，把新 slide 的 `setAttribute('data-state', 'active')` 移到 Phase 1 同時 |
| Hero 高度 / 圖片比例 | `src/pages/index.astro` 的 `.hero__image { aspect-ratio }` |
