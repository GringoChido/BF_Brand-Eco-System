---
target: "franchise/index.html (live: billiard-factory-brand-hub.netlify.app/franchise/)"
total_score: 25
p0_count: 1
p1_count: 2
timestamp: 2026-07-10T02-08-44Z
slug: franchise-index-html
---
Method: dual-agent (A: design review sub-agent · B: detector + browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good form states and draft ribbon; no active state on nav anchors over a 16,600px page |
| 2 | Match System / Real World | 2 | "Request the FDD" is the primary CTA before the acronym is expanded anywhere in body copy |
| 3 | User Control and Freedom | 3 | Anchor nav works; no back-to-top on a 27,600px mobile page (sticky nav CTA mitigates) |
| 4 | Consistency and Standards | 1 | `.section-pad` shorthand zeroes horizontal gutters on 4 sections; global `footer` selector paints a cream band through the pull quote |
| 5 | Error Prevention | 2 | "Liquid capital" select defaults to "Under $500k", the disqualifying answer |
| 6 | Recognition Rather Than Recall | 3 | Qualify strip surfaces gate numbers early; econ table repeats them |
| 7 | Flexibility and Efficiency | 3 | Skip link, sticky nav, anchors; conversion candidates have no shortcut past 10,000px of catalog |
| 8 | Aesthetic and Minimalist Design | 3 | Handsome system; stat band says "1975" and "50 years" (same fact); 14-card mid-page stack on mobile |
| 9 | Error Recovery | 2 | Form failure says "email us directly" but no email exists anywhere on the page |
| 10 | Help and Documentation | 3 | Strong 13-item FAQ and legal framing; all timing answers are TBD |
| **Total** | | **25/40** | **Acceptable — one CSS regression and trust gaps drag a good system down** |

## Anti-Patterns Verdict
**LLM assessment:** Not AI-slop, but "AI-assisted" scent remains: metronomic section rhythm (headline + serif lede + grid ×10), sentence-parallelism tic ("We own X. You inherit Y." pattern overused), 11+ dashed TBD chips reading as scaffolding, third-level copy collapsing into comma-separated feature lists.
**Deterministic scan:** 2 findings. (1) `em-dash-overuse` (28) — VERIFIED FALSE POSITIVE: all 28 are `--rv-d` CSS custom properties in inline styles; grep confirms 0 literal em dashes in copy. (2) `numbered-section-markers` 01–06 — real: the mobile menu carries mono index numbers 01–08, banned outside the earned 6-step process.
**Browser evidence:** No overlapping sibling elements, no vertical gaps >200px, no horizontal overflow at 390px, 0 broken images (37 checked). The perceived "overlap and extra space" is the P0 gutter collapse + P1 quote band + P1 apply-section imbalance below.

## Priority Issues

- **[P0] Four sections lose all horizontal padding.** `.section-pad{ padding:clamp(88px,10vw,136px) 0; }` (line 151) is declared after `.wrap{ padding:0 24px; }` at equal specificity, so every `class="wrap section-pad"` element (#house, #economics, #quote, #apply) renders with 0px gutters — edge-to-edge econ table, quote, and FDD form on mobile; 40px left-edge wobble on desktop. Verified via computed-style probe on the live site (paddingLeft: 0px on all four). Fix: `padding-block:clamp(88px,10vw,136px)`.
- **[P1] Global `footer` selector styles the blockquote attribution.** `footer{ background:var(--cream); border-top:1px solid var(--hairline); }` matches `<footer class="attr">` inside #quote, painting a full-width cream strip with hairline through the Mist quote section. Fix: scope to `body > footer`.
- **[P1] #apply desktop split imbalance.** Left column runs ~700px taller than the form card; the aerial territory photo sits alone against empty Mist. Fix: move the figure full-width below both columns as a wide closing band.
- **[P2] 14-card dead zone on mobile.** Five brand cards + nine category cards stack full-width (~9,000px of near-identical scroll). Fix: 2-up compact category grid ≤640px.
- **[P2] Identical card grids** (.owned .brand vs .cats .cat are the same component), violating the system's own ban. Deferred: recast owned brands in the ledger language (larger change, SSOT-rendered).
- **[P3] Trust leaks:** capital select defaults to the disqualifying option; error message promises a nonexistent email; six identical "TBD · timing" chips; consent checkbox is a fourth Signal Orange use; "Greenville (NC)" vs "Greenville, NC" inconsistency; stat band duplicates the 1975/50-years fact.

## Copy Critique
Headlines are strong ("Own the room where families gather", "We own the house. You inherit the margin.", "0 Middlemen"). Third-level copy (support items, layer blurbs, lane blurbs) collapses into feature-listing. Flattest lines: We Curate layer (repeats the lede verbatim), Technology support item (a POS parts list), Store design ("proven concept" is brochure filler), Commercial lane (inventory of building types), 1980s timeline (logistics report). Rewrites applied in the same pass.

## Persona Red Flags
**Jordan (first-time researcher):** FDD acronym unexpanded before the primary CTA; $500k gate at 700px with no soft path; 11 TBD chips read as "not real yet."
**Casey (mobile, distracted):** 27,600px scroll; first screen mostly empty dark green (300px hero padding); the P0 makes the form look broken — broken-looking forms don't get filled.
**Independent store owner (conversion candidate):** the one section written for them sits at 60% depth with no front-door link; the 2007 Billiards & Barstools proof is buried in a paragraph.

## Emotional Journey
Hook (hero) → trust peak (stats + qualify) → peak (Why ledger) → valley (brand cards + logo strip + 9 categories = catalog energy) → recovery (lanes) → peak (economics candor) → deflation (6 TBD chips) → emotional peak at 65% depth (Day one band) → plateau → rational close. Peak-end problem: the page's last feeling is paperwork.

## Minor Observations
Stat band redundancy; mobile menu numbered indexes (detector-confirmed ban); logo-strip visual weight unevenness (owner's own embed, untouched); lazy-load placeholder blocks on slow connections; hero alt text is excellent — favor real photography over AI-staged interiors elsewhere.

## Questions to Consider
1. Should conversions be a second front door (nav item or hero sub-link) instead of a band at 60% depth?
2. Does the page end on the wrong emotion — should Ryan's handshake line live inside the form card?
3. Is the chip-flagged $2,000,000 figure building more doubt than excitement while Item 19 is pending?
