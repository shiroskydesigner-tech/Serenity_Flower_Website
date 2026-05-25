# SERENITY FLOWER — Marketing Website UI Kit

A pixel-faithful recreation of the marketing site for **靜謐花間 SERENITY FLOWER**, built to the brand's visual foundations (architectural restraint, hierarchical line weight, earth-tone palette, bilingual display type).

This is a click-through prototype with cosmetic-only components — not production code. The aim is high-fidelity component coverage so designers can re-assemble pieces.

## Files
- `index.html` — entry. Stitches the components into a long-scroll marketing page.
- `Header.jsx` — top navigation with wordmark left, links right, bilingual.
- `Hero.jsx` — full-bleed hero with display headline + skeleton mark.
- `Manifesto.jsx` — typographic statement of philosophy.
- `Services.jsx` — three service cards (Installation / Wedding / Florals) in architectural grid.
- `Atelier.jsx` — split-block image + body copy on the studio.
- `Process.jsx` — numbered four-step process.
- `Enquiry.jsx` — contact form with underline inputs.
- `Footer.jsx` — wordmark + secondary nav + colophon.

## Notes
- Components are intentionally small and visual-only. State is fake (e.g. nav doesn't navigate).
- Imagery is rendered as cream (`var(--white)`) blocks with the tulip SVG mark — real photography would replace these placeholders.
- No real codebase / Figma was provided; this is constructed from the brand brief and design tokens. Visual choices follow the brief's stated principles literally.
