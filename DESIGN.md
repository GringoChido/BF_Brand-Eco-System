# DESIGN.md — Billiard Factory · Living HTML Ecosystem

> Generated from existing code (`site-a-creative-hub`, `site-b-franchise`) and the
> token set in `shared/brand-data.json`. Brand colours are fixed brand assets and
> documented as authored (hex/RGB/CMYK), not re-derived.

## Color
Strategy: **Committed** — Heritage Green carries identity on dark panels; Cream/Mist
hold the surface. Signal Orange is a rare accent only (CTAs), never decorative.

| Role | Name | Hex | Use |
|---|---|---|---|
| Primary | Heritage Green | `#185F43` | Brand colour, dark panels, "since 1975" |
| Deep | Pine | `#123E2D` | Deep surfaces, footers, felt panels |
| Secondary | Field Green | `#218C62` | Eyebrows, prices on photo |
| Muted | Sage | `#91AEA3` | Supporting text on dark |
| Warmth | Walnut | `#6E5039` | Wood tones pulled from product photography |
| Accent | Signal Orange | `#F0560C` | CTAs only, ≤5% of any surface |
| Surface | Cream `#FAF8F3` / Mist `#EAEEEC` | | Paper, breathing room |
| Ink | `#1F2421` | | Body text, dark surfaces (never `#000`) |

Proportion law: Cream/Mist 60 · Heritage Green + photography 30 · Walnut 7 · Orange 3.

## Typography
- **Display & UI:** Helvetica Neue (Helvetica, Arial fallback). Tight tracking
  (-.022 to -.03em) at display sizes.
- **Editorial:** Vollkorn. Story, pull quotes, taglines, value names.
- Modular scale: Display → Headline → Subhead → Editorial → Body → Eyebrow.
  Weight + scale contrast, never a flat scale. Body measure ≤ ~42em.

## Elevation & texture
- Layered soft shadows (`--sh-sm/md/lg`), tinted toward Heritage Green, not pure black.
- Paper-grain overlay (SVG `feTurbulence`, ~4–6% opacity) on every surface.
- "Felt" radial vignette on dark green/charcoal panels for depth.
- Hover lift: `translateY(-3px)` + shadow, ease-out, ~0.25s. Never animate layout.

## Components
- Numbered, hairline-separated guideline sections with a clickable TOC.
- Swatch cards (role label, name, hex/RGB/CMYK), click-to-copy.
- Logo wall + clear-space diagram + misuse list (full borders, no side stripes).
- Do/Don't columns use a **top** accent border only (side stripes are banned).

## Bans honoured
No `#000`/`#fff`, no em dashes in copy, no side-stripe accent borders, no gradient
text, no decorative glass, no single hero-metric template.
