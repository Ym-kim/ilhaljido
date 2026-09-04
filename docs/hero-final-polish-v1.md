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
| HERO CLEAN | No face-only inserts; medium/wide scenes | 10.75s | 1,701,700 B | 2,154,062 B | v3 AVIF/WebP | Recommended |
| HERO CLOSEUP | One contextual 1.25s shot | 12.00s | 1,892,544 B | 2,429,213 B | Same v3 AVIF/WebP | Comparison |

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
- Loop end is dissolved into the exact opening frame. Mean RGB seam difference after encoding: 0.822 / 0.982 on a 0–255 scale.
- Contact sheets at 0.5s intervals were visually reviewed; no flash close-up in CLEAN.
- `scripts/render-hero-final-polish.cjs` reproduces the edit from the originals; `scripts/verify-hero-final-polish.cjs` checks encoded media.
- Actual Chromium playback caught an intermediate WebM incompatibility despite successful FFmpeg decoding. The final exports normalize JPEG input to limited-range SDR BT.709 and set the default video track. All four exports now verify TV range / BT.709 matrix, primaries and transfer; both final WebMs play in the actual browser.

## Browser QA — local production build, not Vercel

The production build is served locally on port 3106. This is **not** a deployed Vercel Preview.

| Locale | 320 | 375 | 390 | 430 | 1024 | 1440 |
|---|---|---|---|---|---|---|
| KO | PASS | PASS | PASS | PASS | PASS | PASS |
| EN | PASS | PASS | PASS | PASS | PASS | PASS |
| JA | PASS | PASS | PASS | PASS | PASS | PASS |

- Each viewport was confirmed through the active tab's actual `innerWidth`; no page overflow or broken visible images in the 18-case matrix.
- Localized headline and search remain readable. Existing right 68% desktop panel and responsive structure are preserved.
- Poster is requested first. KO CLEAN / EN CLOSEUP / JA CLEAN were observed playing the final WebM with `readyState=4`, no media error, muted and inline.
- CLEAN loop observation: playback time 0.40 → 3.93 → 7.46 → 0.23 seconds, still playing across the seam. Pause and resume controls passed.
- The seaside table, notebook/materials and cup remain visible on the right, with no cut through the top of the head in the reviewed work shot.
- Mobile uses the dedicated AVIF poster; no video element and **0 observed video resources**, also checked six seconds after page load at 390px.
- CONTROL retains the existing static poster with **0 observed video resources** after six seconds at desktop size.
- Browser warn/error logs were empty during final observed Home and China checks; no observed hydration error. These are local observations, not a guarantee about production-only services.
- The existing local environment uses placeholder service configuration. Live Agoda credentials/results, analytics delivery and external application submission were not exercised or changed.

## Local regression evidence

- Hero audit, China campaign audit, Stay productization, Stay quality curation and media audit: PASS.
- Legacy `audit:stay-engine` and `audit:stay-pilot` each retain one pre-existing failure because they inspect `src/app/page.tsx` instead of the extracted `HomePage.tsx`.
- All **32 inputs** of those two audit scripts are byte-equivalent to main after line-ending normalization. Actual Home component still contains bounded Stay entry and search/redirect tracking. No Stay code or audit was changed.
- China date/CTA/tracking/expiration checks pass unchanged. Runtime Preview QA is required before any release approval.
- Local China browser check confirms Yiwu 126: 2026-10-08–12 and Guangzhou 127: 2026-10-16–20. Both city-specific application links retain the existing external landing page. Home still shows OCTOBER · CHINA BUSINESS.
- TypeScript, lint and production build: PASS (398 static pages). The build's existing missing GEMINI_API_KEY warning is unrelated to this media-only change; no environment variables were changed.

## Preview delivery blocker

- New feature branch is local; push did not complete and no Vercel Preview URL exists for this work.
- GitHub CLI credential helper cannot read `C:\Users\KYM\AppData\Roaming\GitHub CLI\config.yml` (Access is denied), including after the requested read grant. Windows Credential Manager is also unavailable in the current execution context.
- No authentication values were printed. No credentials, ACLs, environment variables or paid infrastructure were changed.
- Restore GitHub CLI login/config access on this machine, then push only `feat/hero-video-final-polish-v1`, let the existing Vercel integration create Preview, and rerun the same browser matrix on that URL before requesting release approval.
- Local comparison URLs: `http://localhost:3106/?hero=hero-clean`, `http://localhost:3106/?hero=hero-closeup`, `http://localhost:3106/?hero=control-static`.

## Rollback

Production remains at the existing main release. Rejecting this Preview requires no Production rollback.
Old v2 media remain available in Git/public for traceability, but are not selected by the updated media component.
