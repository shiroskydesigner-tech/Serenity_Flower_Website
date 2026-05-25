# /src/content/works — 作品 Markdown 檔

每個 `.md` 檔 = 一個作品。由 `/admin` 介面發佈時自動產出,不要手動建檔(除非你知道你在做什麼)。

格式與發佈流程見 `../README.md`。

## 命名規則

`<YYYYMMDD>-<title-slug>.md`,例如 `20250930-鬱金香系列.md`。

slug 部分允許中文(URL 會自動編碼)。

## 想刪除一個作品?

1. 刪掉這裡的 `.md` 檔
2. 刪掉 `public/images/<slug>/` 整個資料夾
3. Astro HMR 自動更新
