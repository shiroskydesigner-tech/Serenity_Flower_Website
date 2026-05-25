# SERENITY FLOWER · 靜謐花間
*Design System*

> "靜謐，不僅是視覺的留白，更是空間結構的精準重塑。"
> *Serenity is not merely visual negative space — it is the precise re-sculpting of spatial structure.*

---

## Brand context

**SERENITY FLOWER 靜謐花間** is a Taiwanese atelier operating at the intersection of **floristry, installation art, and architectural space-making**. It is positioned as a *high-end* studio — not a retail florist — whose work treats plant material as a geometric, structural medium rather than as decorative filler.

The studio offers three integrated service tracks:

| Service | 中文 | What it actually is |
|---|---|---|
| Installation Art | 裝置藝術 | Sculptural objects and spatial interventions; the visual anchor of a venue |
| Wedding Design | 婚禮佈置 | Architectural choreography of an event space — movement, voids, and balance |
| Seasonal Florals | 節慶花禮 | Object-scale gift work; the line and silhouette of a single stem treated as composition |

**The studio's design tension** is the deliberate refusal of two clichés:
1. Maximalist floral abundance (the wedding-industry default)
2. Generic line-drawn florals + scripted wordmarks (the "boutique florist" default)

In their place: **earth-tone restraint**, **architectural grid logic**, **geometric reduction of botanical form to silhouette and skeleton**, and **deliberate negative space**.

---

## Sources

This system was built from a single uploaded brief:
- `uploads/20260523_LOGO.pdf` — original logo concept + brand color palette (HEX, CMYK, Pantone)
- A written brief (in Traditional Chinese) outlining philosophy, service lines, and an explicit critique of the original logo's typographic and geometric weaknesses.

The original logo PDF was flagged by the brief itself as structurally flawed (uneven kerning along an elliptical baseline; uniform stroke weight with no hierarchy; generic clip-art tulip). **This design system therefore does not reproduce that source mark.** It builds a refined identity that satisfies the brief's stated principles: *geometric deconstruction, skeletal reconstruction, hierarchical line weight, architectural restraint.*

The five-color palette in the source PDF is preserved exactly — that part of the source was not flagged for revision.

---

## Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (Claude Code compatible)
colors_and_type.css        ← CSS variables: palette, type scale, semantic tokens
fonts/                     ← webfonts (Google Fonts mirrors + CJK)
assets/                    ← logo SVGs, monograms, motif marks
preview/                   ← design system cards (rendered in Design System tab)
ui_kits/
  website/                 ← marketing site UI kit: header, hero, service blocks, footer
```

See sections below for **Content Fundamentals**, **Visual Foundations**, and **Iconography**.

---

## CONTENT FUNDAMENTALS

### Voice
- **Declarative, never persuasive.** The copy asserts. It does not sell.
- **Architectural vocabulary** — "量體 (volume)", "骨架 (skeleton)", "動線 (circulation)", "留白 (negative space)", "張力 (tension)" — applied to floral subject matter. This collision is the brand's signature.
- **Refusal as a rhetorical move.** Sentences frequently say what the studio *does not* do ("捨棄常規的填鴨式裝飾" — *rejects the conventional force-fed ornament*). Negation is positioning.

### Casing & punctuation
- English headings: **ALL CAPS** for short marks (SERENITY FLOWER, INSTALLATION, ATELIER), **Title Case** for service titles and headings ≥ 3 words. Avoid sentence-case display.
- Chinese: **Traditional characters (繁體)**, not Simplified. No mixing.
- Punctuation: full-width punctuation in CJK runs (「」、，。), straight punctuation in Latin runs. Em-dashes ( — ) over hyphens.
- No exclamation marks. No question marks in marketing copy.

### Pronouns
- "我們 (we)" and "SERENITY FLOWER" in third position — never "I". Never directly address "you / 你" in marketing — the reader is an observer of the work, not its target.

### Emoji
- **Never.** Emoji break the architectural register. Use typographic dingbats (·, —, →) only.

### Examples (lifted directly from the brand brief)
- Mission: *"SERENITY FLOWER 拒絕繁冗的表象堆疊與無意義的材質氾濫。"*
- Service description: *"剝離物件的既有表象，重建幾何量體與空間骨架。"*
- Bilingual tagline: **STILLNESS, RESTRUCTURED · 靜謐，重構。**

### Bilingual pairing rules
- English line on top (smaller, tracked), Chinese line below (larger, tighter). Or stacked with a thin rule between.
- Never translate idiomatically — preserve the rhetorical weight even if the literal English feels stark.
- One language per text block when possible. Inline mixing is reserved for proper names and the wordmark.

---

## VISUAL FOUNDATIONS

### Palette
Five earth tones from the source brief, used in **strict hierarchy** (not as a "palette to pick from"):

| Token | Hex | Pantone | Role |
|---|---|---|---|
| `--ink` | `#3E2D21` | 412 C | Primary text, fine lines, the brand's "black" |
| `--bark` | `#89583A` | 7517 C | Secondary accents; service-line markers; underline rules |
| `--linen` ★ | `#D8BE99` | 466 C | **Main brand color** — primary surface, hero grounds, the dominant tone |
| `--white` ☆ | `#EEE5D6` | — | **Secondary brand color** — cream; soft fills, card surfaces, the most-used inset in design |

> *Aliased: `--paper` resolves to `var(--white)` for compatibility — paper and cream are one and the same.*

**Discipline:** Use no more than three tones in any single composition. The dominant move is `--ink` text on `--linen` ground, with `--white` (cream) as the inset card surface and at most one `--bark` accent. Saturated colors, gradients, and pure CSS white are forbidden.

### Typography
- **Display serif (Latin):** **Bell (Bell MT)** — the brand's licensed display face, uploaded as `fonts/BELL.TTF` (regular), `fonts/BELLB.TTF` (bold), `fonts/BELLI.TTF` (italic). Old-style serif with refined modulation; replaces the prior Cormorant Garamond placeholder. Display defaults to 400 weight (Bell has no thin); italic for emphasis.
- **Body / UI (Latin):** Manrope — geometric, neutral, modern. Pairs against Bell's classical contour without competing.
- **Display & body (CJK):** Noto Serif TC for headlines, Noto Sans TC for body. CJK is set heavier than Latin display by one weight step so the optical density matches.
- **No third typeface.** No mono. No script. No condensed.

### Spacing
A 4px base scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`. Layout uses an 8-column architectural grid at 80px column width, 32px gutter, on a 1440 design width. Margins are deliberately oversized; copy blocks rarely exceed 540px in width.

### Backgrounds
- The page background is `--linen` (the main brand color). Inset surfaces are `--white` (cream). Never CSS pure white.
- **No gradients.** Tonal washes are achieved by flat color blocks meeting at a hard rule.
- **No repeating patterns or textures.**
- Imagery, when present, is full-bleed but desaturated and warm-tinted toward `--bark`.

### Borders, lines, and rules
- **Hierarchical line weight** is the system's signature. A composition contains at most:
  - 1px hairline rules (`--ink`, 70% opacity) for body separations
  - 2px structural lines for service-block boundaries
  - 4px frame rules reserved for the wordmark frame
- No `border-radius` above **2px** on UI surfaces. Imagery and cards are **square corners only**.

### Shadows & elevation
- **No drop shadows.** Depth is encoded through line weight and color value, not blur.
- Elevation is signaled by an inset 1px `--bark` hairline at 40% opacity.

### Animation
- Motion is **slow** (400–700ms), eased with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Permitted: opacity crossfades, 8px vertical slide-ins, hairline rule reveal (scaleX 0→1).
- Forbidden: bounce, spring overshoot, parallax, scroll-jacking, anything ≤ 200ms.

### Hover / press states
- Links: underline reveal (a 1px `--ink` rule animating from 0 → 100% width over 320ms).
- Buttons: background shifts one tonal step warmer (e.g. `--ink` → `--bark`). No transform. No shadow.
- Press: opacity drops to 88%. No scale.

### Layout rules
- The wordmark sits **top-left**, not centered.
- Long-form text columns are **left-aligned**, never justified.
- Section headers use a vertical 2px `--bark` rule + small caps English over Traditional Chinese.
- A "skeleton column" of 96px is reserved on the right of every desktop page — empty, intentional. This is the brand's signature use of architectural negative space.

### Transparency & blur
- Transparency is used **only** to dim hairline rules (40–70%).
- Backdrop blur is forbidden. There are no glass surfaces, no frosted overlays.

### Imagery tone
- Imagery is **warm, low-contrast, slightly underexposed**. Highlights tinted `--linen`. Shadows tinted `--ink`.
- No high-saturation greens, no flash photography, no plant-on-white catalog shots.
- Subjects are cropped tightly or sit in deliberate negative space; never centered.

### Cards
- Cards are **flat rectangles**, 1px `--ink` hairline border at 60%, `--white` fill, square corners. No shadow, no gradient, no inner glow.

---

## ICONOGRAPHY

The brand has **no functional icon system** in the source brief — no icon font, no sprite, no Lucide-style nav glyphs. Imposing one would contradict the studio's "no ornament for ornament's sake" principle.

### What is used in place of icons

| Need | Solution |
|---|---|
| Section markers | Short 2 px `--bark` rules (`<span class="rule">`) preceding the eyebrow label |
| Directional cues | A typographic em-arrow `→` set in the same font as surrounding text |
| Bullet markers | Hairline dashes (`—`) or numerals (`01`, `02`, `03`); never `•` |
| Brand mark | The geometric **skeleton mark** (`assets/mark-skeleton.svg`) — used as a glyph, never as a decorative icon |
| Service iconography | None. Services are signaled by numerals + type, not pictograms. |
| Social, payment, etc. | If genuinely required (e.g. footer social), use **Lucide** (https://lucide.dev) at 1.25 px stroke weight, `--ink` color, 16 px size. Treat as a substitution and flag in copy. |

### Emoji
**Never.** Emoji break the architectural register completely.

### Unicode glyphs (permitted)
- `→` em-arrow for "more" links and pagination
- `—` em-dash for prose pauses, captions, metadata separators
- `·` middle dot for compact metadata strings ("Atelier · Est. 2019 · Taipei")
- `「 」` Chinese guillemets — only in CJK runs

### Brand marks inventory (`assets/`)

| File | Purpose |
|---|---|
| `wordmark.svg` | Primary bilingual lockup — top of every page |
| `wordmark-compact.svg` | Single-line variant for nav and tight contexts |
| `mark-skeleton.svg` | Geometric mark — the studio's "logo" in icon contexts (favicon, social avatar, embossing) |
| `monogram-sf.svg` | "SF" italic monogram — for tiny digital contexts (favicon @ 16/32 px) |
| `mark-hua.svg` | "花" character mark — CJK-only collateral, name stamps, packaging seals |

> **The original source logo from `uploads/20260523_LOGO.pdf` was deliberately not reproduced.** The brief itself critiques that mark for uneven kerning along an elliptical baseline, uniform stroke weight without hierarchy, and a generic clip-art tulip. The marks above are clean-room rebuilds that satisfy the brief's stated principles: geometric reduction, hierarchical line weight, and architectural rather than horticultural form.

---

## Font substitutions — confirmed for display

The brand display face is now **Bell (Bell MT)**, uploaded by the user. Three weights are wired in:

| File | Weight | CSS |
|---|---|---|
| `fonts/BELL.TTF` | Regular | `font-weight: 400` |
| `fonts/BELLB.TTF` | Bold | `font-weight: 700` |
| `fonts/BELLI.TTF` | Italic | `font-weight: 400; font-style: italic` |

The previous Cormorant Garamond is kept only as a fallback in the font stack. Sans-Latin and CJK substitutions remain open:

| Role | Chosen | Substitute if you have one |
|---|---|---|
| Display Latin ✓ | **Bell (Bell MT)** | — (locked in) |
| Body Latin | **Manrope** | *Söhne*, *GT America*, *Neue Haas Grotesk* |
| Display CJK | **Noto Serif TC** | *Lihsianti* (儷宋體), *Source Han Serif TC* |
| Body CJK | **Noto Sans TC** | *Source Han Sans TC*, *Iansui* |

---

## Index — manifest of this design system

```
README.md                                ← this file
SKILL.md                                 ← skill manifest (Claude Code compatible)
colors_and_type.css                      ← all design tokens
uploads/
  20260523_LOGO.pdf                      ← original brand brief (source of palette only)
assets/
  wordmark.svg                           ← primary bilingual wordmark
  wordmark-compact.svg                   ← compact nav variant
  mark-skeleton.svg                      ← geometric mark
  monogram-sf.svg                        ← SF italic monogram
  mark-hua.svg                           ← 花 character mark
preview/
  _base.css                              ← shared base for preview cards
  brand-*.html                           ← Brand cards: wordmark, marks, clearspace
  colors-*.html                          ← Colors cards: palette, hierarchy, pairings
  type-*.html                            ← Type cards: display, body, CJK, scale, bilingual
  spacing-*.html                         ← Spacing cards: scale, grid, lines, elevation
  components-*.html                      ← Components cards: buttons, eyebrow, cards, form, links
ui_kits/
  website/
    README.md                            ← kit notes
    index.html                           ← stitched marketing page (open this)
    site.css                             ← all kit styles
    Header.jsx                           ← top nav with bilingual links
    Hero.jsx                             ← display hero with skeleton mark
    Manifesto.jsx                        ← typographic statement of philosophy
    Services.jsx                         ← three service cards
    Atelier.jsx                          ← split-block studio block
    Process.jsx                          ← four-step process
    Enquiry.jsx                          ← contact form
    Footer.jsx                           ← wordmark + secondary nav
```

**Where to start reading:** `colors_and_type.css` for tokens, then `ui_kits/website/index.html` for a real composition that exercises all of them.
