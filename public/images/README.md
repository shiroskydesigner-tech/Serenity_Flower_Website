# /images — 作品圖庫(由 admin 自動產出)

**這個資料夾是輸出區,不要手動編輯**。每次在 `/admin` 發佈一個作品,圖片會自動進這裡。

## 結構

```
public/images/
  <work-slug>/
    img-01-480.webp
    img-01-480.avif
    img-01-960.webp
    img-01-960.avif
    img-01-1440.webp
    img-01-1440.avif
    img-01-1920.webp
    img-01-1920.avif
    img-02-...
    ...
```

每張原圖會壓成 **4 個尺寸 × 2 個格式 = 8 個 variant**。Astro 在頁面上用 `<picture>` 配 `srcset` 自動挑最佳尺寸/格式。

## 命名規則

- 資料夾名 = 作品 slug,例如 `20250930-鬱金香系列`
- 檔名 = `img-{01..NN}-{width}.{webp|avif}`,固定 padding 兩位數
- slug 由 admin 自動生成:`YYYYMMDD-<sanitized-title>`

## 如何手動加圖(不透過 admin)

不建議。若一定要:
1. 把原圖塞進你選的 work slug 資料夾
2. 自己用 sharp 壓 8 個 variant(同上命名)
3. 更新對應 `src/content/works/<slug>.md` 的 `images` 陣列

正常流程都應該透過 `/admin` 走。

## 不會進版本控制

整個 `public/images/` 在 `.gitignore` 裡(除了這個 README)。圖檔很大、會膨脹 git,因此用「能從原始素材重壓還原」的策略。若部署需要這些圖,自己在 CI / 部署步驟把素材壓進去。
