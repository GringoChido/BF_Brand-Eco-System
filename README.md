# Billiard Factory — Living HTML Ecosystem

Two interconnected sites that share **one source of truth**. Update the JSON once and both sites re-skin in real time.

```
BF ECO SYSTEM/
├── shared/
│   └── brand-data.json          ← THE SSOT: tokens + brand copy + data
├── site-a-creative-hub/
│   └── index.html               ← Site A · the internal "Brain"
└── site-b-franchise/
    └── index.html               ← Site B · the external "Salesman"
```

## How the live link works
1. `shared/brand-data.json` holds every color token, the type scale, and all owned/partner brand data.
2. **Site A** (Creative Hub) reads it, applies tokens to CSS variables, and renders the design-system swatches + House of Brands sheet.
3. **Site B** (Franchise site) `fetch()`es the *same file*, writes the tokens into its own CSS variables, and renders the Manufacturing Moat, demand-engine steps, and brand grids from it.
4. Change a hex value or a line of brand copy in the JSON → reload either site → both update. No rebuild.

> In production, point Site B's `SSOT_URL` to an absolute URL on the hub
> (e.g. `https://hub.billiardfactory.com/brand-data.json`).

## Run it
Cross-folder `fetch()` needs an HTTP server (opening via `file://` falls back to inline tokens). From this folder:

```bash
python3 -m http.server 8099
```
Then open:
- Site A → http://localhost:8099/site-a-creative-hub/
- Site B → http://localhost:8099/site-b-franchise/

## Brand foundations (from BF STYLE GUIDE)
- **Editorial serif:** Vollkorn (the heritage BF body face, elevated to display)
- **Geometric sans:** Jost (subheads, UI, data)
- **Heritage tokens preserved:** Heritage Green `#185F43`, Signal Orange `#F0560C` — reserved for "since 1975" provenance + urgent CTAs
- **New luxury palette:** Architectural Charcoal, Polished Walnut, Muted Linen, Antique Brass

All logos and lifestyle photography are SVG placeholders pending art direction.
