# Labor Day 2026 → Brand Hub reconciliation

Ruled 2026-08-17 by Joshua. Hub `v5.2.1` → `v5.3.0`.

The Labor Day flight produced ~82 social pieces, 6 web assets, and three landing
pages. Several carried design decisions the hub either contradicted or had no
slot for. This is the audit, the rulings, and what changed.

---

## 1 · The audit

Compared `shared/brand-data.json` + `site-a-creative-hub/index.html` against the
five Labor Day creative packs in the dashboard repo's `docs/`, `banner-roles.json`,
and the three shipped pages in `site-rebuild/ghl/`.

| # | Finding | Severity |
|---|---|---|
| 1 | **Gold.** The mark spec said *"Never gold — there is no gold in this brand."* Every pack ran antique gold `#B08D3A` as its structural accent, and `labor-day-sale.html` shipped a full gold **field** with a three-stop ramp (`#B08D3B` / `#C5A455` / `#9C7B2E`). | Direct contradiction |
| 2 | **Green.** Pack law read *"NO GREEN anywhere."* The proportion law gives Heritage Green + photography 30%. | Apparent contradiction — see ruling |
| 3 | **Three creams, four darks.** House Cream is `#FAF8F3`; packs used `#F3EFE4` for type and `#FAF6EB` for the LP bunting. House Ink is `#1F2421` (cool); the flight field was `#16110E` (warm). | Drift |
| 4 | **Typography.** Hub gives headlines to Helvetica Neue. Every pack specified *"high-contrast display serif, heaviest cut, tracking −0.035em… do not substitute a grotesque"* — the inverse. The Americana pack went further, to a WPA-poster slab serif. **~80 pieces shipped in a face the hub does not name or license.** | Largest gap |
| 5 | **Imagery register.** Hub describes golden, directional, late-afternoon light. All six main-lane scenes are nocturne, driven by the ≥40% darkening floor needed for cream type at AA. | Missing slot |
| 6 | **Americana.** Stars, bunting, stripes, an engraved WPA forearm; a bunting SVG shipped on the LP. Promo law bans billiards kitsch but is silent on Americana. | Unruled |
| 7 | **Not drift:** `#C9A24B` in `designers.html` is Gameroom Furniture Partners' own identity for the Dallas Market band — a legitimate co-brand exception the hub did not document. | Documentation gap |

### What the flight got right

Several pack laws were *better* than the hub's wording and were already partly
absorbed into `campaigns.laws` (01–10): Signal Orange once per piece on the money
moment, `$1,000` with the comma, no end date on an evergreen offer, greenless
promo graphics, seasonal palettes convert rather than copy, story safe zones.

Law 04 already referred to *"the campaign accent"* — **a thing the hub named but
never defined.** That was the actual hole, and it is why the gold read as drift.

### The three art systems

Read their own specs: Ticket Ladder = *"the standing Sitewide Savings lane"*;
Photo Scrim = *"the Main lane's launch and peak pieces"*; Solid Field =
*"the tier table."* All three are Labor-Day/sitewide artifacts written in the
flight's private vocabulary, two built on the off-palette gold and warm black.
**The hub had published one campaign's working system as brand law.**

### To the trade

The section derived from the live `/designers` page rather than ratified canon,
and its own data admitted it four times — unratified program name, Ryan-owned
tier facts, unverified AHFA/NAHB proof points, and 11-vs-12 showrooms. The
Designer lane was the campaign's smallest (2 posts, story-exempt, no offer
language) carrying the hub's largest block of unratified claims.

---

## 2 · The rulings

| Question | Ruling |
|---|---|
| Gold | **Ratify a campaign-accent slot.** Bounded exception; Signal Orange stays the money moment. Retires the "never gold" line. |
| Display face | **Helvetica Neue holds.** Promo gets no face of its own. The packs were wrong; next flight unwinds it. |
| Art systems | **Split laws from flight kits.** Laws stay house-wide; the three devices become a dated kit. |
| Green | **Promo may go greenless; permanent surfaces never may.** Confirms standing law 04 and states the boundary law 04 lacked. |
| Night register | **Add it**, with the ≥40% contrast floor as its governing spec. |
| Americana | **Allowed, bounded** — engraved or geometric, in-palette, one motif per piece, never on the wordmark. |
| To the trade | **Keep verified, flag the rest.** |

### Removals (all five were unratified inventions)

1. `logo.mark` — the Rail Diamond. Never ratified; its own field asked for a symbol decision.
2. `logo.favicons` + `logo.og` — favicons are mark-derived. **The OG template was relocated to Applications · Templates**, being a wordmark-and-green asset independent of the mark.
3. `campaigns.workflow` — "How a piece gets made."
4. `motion.logoReveal` — animated the retired mark's inlay and sight ring.
5. `designerProgram.tiers` — never discussed; facts are Ryan's.

Two repairs: `logo.clearSpace` cited *"the rail-diamond inlay"* and now cites the
wordmark's divider ornament; the heading "One mark, six lockups." became
**"One wordmark, six lockups."**

Asset files were left on disk — only the published sections came out.

---

## 3 · What changed

**Colour** gains `tokens.campaignAccent` — the definition law 04 was missing,
6 rules, and a ratified accent log. First entry: Labor Day 2026.

**Typography** gains `tokens.typography.promoRule` — "Promo has no face of its
own," including the correction on the record.

**Imagery** gains `imagery.registers` — Daylight (default) and After dark (promo
only), plus the contrast floor as a measured spec.

**Campaigns** gains laws 11–14 (the dressing boundary, engraved seasonal motifs,
offer language confined to the offer lane, story-is-a-recomposition) and the
**Flight kits** shelf. `campaigns.systems` is retired into
`campaigns.flightKits[0]` — Labor Day 2026, with its colour, three devices,
phase-geometry table, and a **drift log** recording the display serif as
*unwind next flight* and the stray creams as *use the house value*.

**To the trade** loses the tiers and the unverified proof points; four
`needsJoshua` flags consolidate into one `openQuestions` list.

---

## 4 · Still open

- **Name the display face.** ~80 pieces shipped in it. Unwinding to Helvetica
  Neue Heavy is the ruling, but the existing pieces cannot be reproduced or
  corrected until someone identifies what was actually used.
- **`labor-day-sale.html`** still runs the gold field and the two stray creams.
  Now legal under the accent ruling, but the creams should go to house Cream.
- **The `sitewide` standing brief** still says the Ticket Ladder *is* the system.
  It should read that seasonal variants are permitted and the copy law is unchanged.
- The four `designerProgram.openQuestions` — Ryan and Joshua.
