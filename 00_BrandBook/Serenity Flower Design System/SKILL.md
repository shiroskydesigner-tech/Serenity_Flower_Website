---
name: serenity-flower-design
description: Use this skill to generate well-branded interfaces and assets for SERENITY FLOWER 靜謐花間 (a Taiwanese atelier of installation art, wedding design, and seasonal florals), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/website/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience? language? bilingual? service line? formal vs. quiet?), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Brand essentials to internalise before designing

- **Voice is architectural, not floral.** Use words like *volume, skeleton, circulation, void, restraint*. Use negation as a rhetorical move ("rejects", "捨棄", "no force-fed ornament"). Never sell — assert.
- **Bilingual by default.** English line on top (smaller, tracked), Chinese line below (heavier, tighter), separated by a 2 px bark rule. Use Traditional Chinese, never Simplified.
- **No emoji. No gradients. No drop shadows. No rounded corners above 2 px.**
- **Palette:** four earth tones — `--ink #3E2D21`, `--bark #89583A`, `--linen #D8BE99` ★ (**main**), `--white #EEE5D6` ☆ (**secondary / cream** — the most-used inset). `--paper` is kept as an alias of `--white` for backward compatibility. Use at most three in one composition.
- **Type:** **Bell (Bell MT)** for all display — the brand's uploaded TTF in `fonts/`. Manrope for body, Noto Serif TC / Noto Sans TC for CJK. Display defaults to 400 (Bell has no thin); italic for emphasis; bold sparingly.
- **Hierarchical line weight is signature:** 1 px hairline → 2 px rule → 4 px frame. Never uniform.
- **Layout reserves a 96 px "skeleton column" on the right.** It stays empty. That is the brand.
- **Imagery is warm, low-contrast, slightly underexposed.** When unavailable, use a flat `--white` (cream) block with the tulip mark from `assets/mark-skeleton.svg`.
