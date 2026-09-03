# Home Hero final polish — 2026-09-04

## Scope and release gate

- Base: main `fa629c1`; branch: `feat/hero-video-final-polish-v1`.
- Preview only. No main merge or Production deployment authorized for this phase.
- China Campaign, Stay/Agoda/Booking, tracking, locale routes, search and responsive structure are unchanged.
- Existing brand eyebrow is retained: “일하는 사람을 위한 체류 · 업무 · 여행”.

## Decision

Recommend **CLEAN**. It keeps the brand and destination context readable without interrupting search with a large face insert.

| Variant | Close-up policy | Duration | WebM | MP4 | Poster | Recommendation |
|---|---|---:|---:|---:|---|---|
| CONTROL | Existing still | — | — | — | Existing static brand poster | Baseline |
| HERO CLEAN | None | 10.75s | 2,029,714 B | 2,395,378 B | v3 AVIF/WebP | Recommended |
| HERO CLOSEUP | One contextual 1.25s shot | 12.00s | 2,246,073 B | 2,688,362 B | Same v3 AVIF/WebP | Comparison |

Preview selectors, identical for KO, EN and JA:

- `?hero=control-static`
- `?hero=hero-clean` (also the default)
- `?hero=hero-closeup`

The selectors stay inside the media component. Existing Home tracking attribution and server locale routes are not changed.

## Source review

All four user-provided originals were reviewed at native 24 fps.

| Original suffix | Used | Decision |
|---|---|---|
| 171842 / f8abd0cf | Yes | City departure, notebook review, coastal path and terrace. Contextual face shot only in CLOSEUP. |
| 174207 / ae5fe32a | Yes | Golden-hour wide shoreline for the ending. Both face close-ups excluded. |
| 174826 / b7f6c9ed | No | Fisheye architecture and isolated fashion close-ups weaken this Work / Travel story. |
| 021555 / 34a741b4 | Yes | Wide overhead coastline arrival only. Face inserts excluded. |

No new AI footage or model identity was generated. These are user-controlled generated editorial scenes, not verified real venues.

## Edit and safe framing

| CLEAN timeline | Scene | Duration |
|---|---|---:|
| 0–2.25 | City departure | 2.25s |
| 2.25–3.75 | Notebook / planning | 1.50s |
| 3.75–5.25 | Coastline arrival | 1.50s |
| 5.25–6.50 | Coastal path | 1.25s |
| 6.50–9.00 | Seaside table and planning materials | 2.50s |
| 9.00–10.75 | Wide sunset shoreline and loop dissolve | 1.75s |

CLOSEUP adds one 1.25s terrace reflection at 6.50s, before the wide terrace scene.
The two terrace shots are mirrored together so the table/notebook remain in the visible right side of the existing 68% panel.
The source depicts planning materials and a seaside workspace, **not an explicit laptop-working action**. No unsupported work claim is added.

The opening frame has headroom, bag and travel notes. Desktop poster and film use matching object-position to prevent a first-frame crop jump. Mobile uses a dedicated 900×1200 static crop.

Poster sizes:

- Desktop AVIF: 36,376 B; WebP: 55,296 B.
- Mobile AVIF: 33,177 B; WebP: 53,416 B.

Poster-first loading, deferred video, WebM then H.264, muted/loop/playsInline, no native controls, manual pause, reduced-motion and constrained-network fallbacks are preserved.

## Native-frame verification

The previous v2 edit retained short face inserts near embedded source cut boundaries. Approximate time trimming was not sufficient.

- Source ranges are now zero-indexed, end-exclusive **native-frame** selections in `scripts/hero-final-polish.edl.json`.
- Both formats decode to exactly 258 frames (CLEAN) / 288 frames (CLOSEUP), 24 fps, no audio.
- Every output WebM frame was checked against expected scene boundaries: **0 unexpected cuts**.
- Loop end is dissolved into the exact opening frame. Mean RGB seam difference after encoding: 0.685 / 0.847 on a 0–255 scale.
- Contact sheets at 0.5s intervals were visually reviewed; no flash close-up in CLEAN.
- `scripts/render-hero-final-polish.cjs` reproduces the edit from the originals; `scripts/verify-hero-final-polish.cjs` checks encoded media.

## Local regression evidence

- Hero audit, China campaign audit, Stay productization, Stay quality curation and media audit: PASS.
- Legacy `audit:stay-engine` and `audit:stay-pilot` each retain one pre-existing failure because they inspect `src/app/page.tsx` instead of the extracted `HomePage.tsx`.
- All **32 inputs** of those two audit scripts are byte-equivalent to main after line-ending normalization. Actual Home component still contains bounded Stay entry and search/redirect tracking. No Stay code or audit was changed.
- China date/CTA/tracking/expiration checks pass unchanged. Runtime Preview QA is required before any release approval.

## Rollback

Production remains at the existing main release. Rejecting this Preview requires no Production rollback.
Old v2 media remain available in Git/public for traceability, but are not selected by the updated media component.
