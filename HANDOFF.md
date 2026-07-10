# BF Franchise Eco System — Session Handoff
**Date:** July 8, 2026 · **Author:** Claude (Cowork session with Joshua)
**Live page:** https://billiard-factory-brand-hub.netlify.app/franchise/
**Source of record:** `~/Desktop/BF_PROJECTS/BF ECO SYSTEM/franchise/index.html` (single self-contained file)

---

## What this is
The Billiard Factory franchise recruitment site (BoConcept-style), built for the Franchise
Eco System that will eventually live at bfspringdashboard.netlify.app/franchise/. Currently
deployed on the brand hub Netlify site as the review URL. Internal draft, ribbon v3.

## Where things live
- **Repo:** `BF_PROJECTS/BF ECO SYSTEM/` — franchise page at `franchise/index.html`,
  images at `franchise/assets/` and `assets/brands/`, SSOT at `shared/brand-data.json` (v4.1.0).
- **Deploys:** via Netlify MCP to site `billiard-factory-brand-hub`
  (siteId `fc6abca4-6b04-49e3-9b4d-8b0e9372e655`). Deploy = assemble repo copy, run the
  `deploy-site` operation, execute the returned npx command from that folder.
- **IMPORTANT:** `bfspringdashboard.netlify.app` is NOT on the Untold.works Netlify team this
  session could reach. To publish there: connect that account, or drag the `franchise/` folder
  into that site's deploys manually.
- **CORS:** hub `netlify.toml` now serves `/shared/*` and `/assets/*` with
  `Access-Control-Allow-Origin: *` so satellite sites can consume the SSOT cross-origin.

## Design system (v4, from brand-data.json + DESIGN.md)
- Cream `#FAF8F3` / Mist `#EAEEEC` surfaces (~60%), Heritage Green `#185F43` as accent only
  (hero photo, stat band, labels — Joshua explicitly asked to PULL BACK GREEN, keep it white).
- Helvetica Neue display, Vollkorn editorial serif. Signal Orange `#F0560C` = CTAs only (2–3 max).
- Bans honored: no em dashes in copy, no eyebrow kickers as section grammar (one hero kicker only),
  no numbered section markers (only the real 6-step process), no identical card grids, no side-stripe
  borders, no #000/#fff. Voice: warm, family-rooted; banned words include "man cave, cheap,
  clearance, seamless, elevate, robust." Verified against the impeccable skill's detector
  (github.com/pbakaus/impeccable) — keep runs clean.
- All contrast pairs verified WCAG AA. Reduced-motion supported. Form has real error/success states.

## Page structure (top to bottom)
Draft ribbon → nav → hero (golden-hour storefront image) → stat band (1975/50/13/5/0) →
qualification strip ($500K liquid · $485K–$785K est · 7–8K sq ft) → Why (4 ledger rows) →
The House (We Make/Curate/Sell + 5 owned-brand cards + rolling logo strip) →
Showroom (9 categories) → Revenue lanes (6) → Economics table → Path to opening (6 steps) →
Conversion band (2007 Billiards & Barstools proof) → Who we award territories to (+ owners photo,
**Joshua unhappy with the final state of this — revisit first**) → Support → Fifty-year timeline →
Ryan quote (draft, pending approval) → FAQ (13) → FDD form (routes to Ryan) → footer with legal.

## Ryan's approved economics (v3, all "estimates pending FDD")
- Franchise route confirmed (not license); franchise attorney engaged.
- Fee $35,000 · Royalty 2% · Marketing fund 2% · Min liquid capital $500,000.
- Build-out $200K–$400K · Inventory $250K–$350K (~$250K floor stock) · Total est $485K–$785K.
- Revenue estimate $2,000,000/showroom — flagged "Est · Item 19 pending" (LEGAL: must match
  FDD Item 19 before any public use; keep the caveat language).
- Showroom 7,000–8,000 sq ft · Territory = radius (final terms TBD) · billiardfactory.com
  orders inside a territory = shared revenue (model in progress).
- Delivery/install/re-felt: pre-approved third-party installers certified to house standard.
- Trade/designer program: yes, leads routed by territory.
- Conversions: YES — independents are prime targets (2007 DFW conversion is the proof story).
- First markets: Salt Lake City, El Paso, Greenville NC, Knoxville, Nashville. Goal: 90 stores in 5 years.
- Named contact: Ryan (form promises 2-business-day response).

## Assets (in repo)
- `franchise/assets/hero-golden.jpg` — Higgsfield golden-hour storefront (live hero).
- `franchise/assets/owners-dayone.jpg` — two-owners shot, currently in "Who we award" (REVISIT).
- `assets/brands/brand-{billiard-factory, cl-bailey, level-best, velocity, golden-west}.jpg` —
  the five owned-brand card images, wired through brand-data.json v4.1.0 (SSOT drives the cards;
  page fallback matches). Rolling logo strip in The House is Joshua's own embed code, self-contained.
- Unplaced in BF_PROJECTS: `hf_..._175242` (wide storefront gen), `DJI_0130.jpg` (aerial,
  candidate for "Your Territory" concept), `IMG_9080.JPG`, `4O5B1069.jpg`, design-center photo
  (rep + customer with swatches — Higgsfield cleanup prompt was written but keeper not yet produced).

## Open items / next steps
1. **Fix whatever disappointed Joshua in the last change (owners photo section)** — ask him
   what he wanted; revert = delete the `.owner-photo` figure + its CSS block.
2. Remove draft ribbon + "Est" flags only when the FDD publishes; Item 19 governs the $2M figure.
3. Timeline durations for the 6-step path still TBD.
4. Ryan quote needs his sign-off (or a 90-second video).
5. FDD form is a demo handler — wire to CRM/Netlify Forms and Ryan's inbox.
6. Available Markets page/map; microsite split (UPS Store model) when FDD exists.
7. Deploy to bfspringdashboard.netlify.app/franchise/ once that Netlify account is reachable.
8. Design-center image for the Billiard Factory card or a future Design & Trade section.

## Process notes that worked
- Every change: edit → banned-words/em-dash grep → impeccable detector → headless Chrome
  screenshots (desktop + 390px mobile, overflow check) → SendUserFile → device_commit_files
  to repo → sync deploy folder → Netlify deploy → live verify.
- Joshua's style: spar first, be surgical, build fast, keep him in the creative-director seat.
