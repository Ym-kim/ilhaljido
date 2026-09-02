# WAKATION COMPLETION GAP REPORT

Date: 2026-09-03  
Production: https://www.wakation.kr  
Production baseline commit: `cda5836610a807ba1d5195f143d04e9db37327ff`  
Finish branch: `feat/design-refresh-finish-sprint-v1`

Status vocabulary: `VERIFIED DONE`, `PARTIAL`, `NOT DONE`, `NOT REQUIRED`, `BLOCKED`.

## A. PREVIOUSLY CLAIMED DONE ITEMS

| Item | Status | Evidence |
| --- | --- | --- |
| Agoda Affiliate Lite authentication | VERIFIED DONE | Production Search API previously returned HTTP 200 and five results; normalized server-only auth remains in `src/lib/affiliate/agodaAuthCore.ts`. |
| Provider-neutral Stay Engine | VERIFIED DONE | Agoda search, Booking fallback and provider-neutral UI remain separated; the Production Pilot route loads normally. |
| Agoda Pilot six-city scope | VERIFIED DONE | Production form exposes Fukuoka, Osaka, Tokyo, Busan, Jeju and Seoul. |
| Pilot rating semantics | VERIFIED DONE | Pilot labels provider property class and guest review score separately and omits zero property class. |
| Home density reduction | NOT DONE | Production Home has 18 sections, about 15,091 px document height and three forms. |
| Moving promotion removal | NOT DONE | Production renders `.animate-ticker`; eleven items are cloned into a second track. |
| Select six-stage IA | NOT DONE | Production exposes only four preparation stages. |
| Hotel Pilot controlled entry | NOT DONE | Production `/select/hotel` contains no link to `/select/hotel/pilot`. |
| September model/season refresh | PARTIAL | Late-summer/early-autumn copy is live, but August-named rotation placement and monthly edit remain active. |
| Monthly model rotation | PARTIAL | Deterministic exposure logic and a manifest exist; a September slot plan and active BOMI mapping do not. |

## B. EXTERNAL PRODUCTION GAPS

1. Home first-view hierarchy is diluted by a moving commerce rail and overlapping intent shortcuts.
2. Home repeats lead capture in Hosted and Yangyang proof sections.
3. The general hotel page renders a star glyph beside a 0–10 guest score, which can be mistaken for hotel class.
4. Select does not express MOVE and WORK as first-class preparation stages; CONNECT is reduced to eSIM.
5. The safe real-time stay Pilot is discoverable only by direct URL.
6. Stale `AI 크리에이터`, `강원 속초`, `8월 예정` records remain in source data.

## C. HOME STRUCTURE

Production evidence: 18 sections, 3 forms, 52 images, no broken image request in the inspected desktop render, and no horizontal overflow at 1280 px. The intended hierarchy is partially present, but Mood, Duration, Traveler Notes, More Explore, service map and two proof/lead surfaces make the page read as a directory rather than a focused landing page.

Finish action:

- Keep Hero, Trip Match, one static featured module, domestic discovery, stays, Trip Sets, preparation, Hosted, operating proof, support and a compact brand/FAQ close.
- Move Mood/Duration and Traveler Notes discovery to their dedicated routes instead of repeating them on Home.
- Retain Yangyang proof but remove its duplicate signup form; link to the one Hosted signup.
- Remove the large service-map block from Home while preserving its destinations elsewhere.

## D. PROMOTION SYSTEM

Status: `NOT DONE` in Production. The current ticker is visually prominent, moves continuously, contains eleven offers and duplicates its DOM for animation.

Finish action: replace it with a reusable static campaign placement supporting `announcement`, `featured` and `context` variants. Home will show four deliberate choices at most. Affiliate parameters, sponsored rel and click tracking must remain unchanged. No BigPie campaign is published.

## E. SELECT IA

Status: `NOT DONE` for the promised six-stage model. Current top IA is Hotel / Activity / eSIM / Learn.

Finish action: implement localized STAY / MOVE / CONNECT / EXPERIENCE / WORK / LEARN cards using existing routes and anchors. This changes navigation framing, not the underlying product catalog.

## F. AGODA PILOT

Status: `VERIFIED DONE` for authentication, six-city form, provider-neutral mapping, Booking fallback and Pilot-only rollout. `PARTIAL` for user discovery and accumulated live evidence.

Finish action: add a controlled Beta entry from `/select/hotel` while preserving Booking search as the established primary flow. Do not switch Agoda site-wide. The unmerged safety-evidence branch `feat/stay-pilot-safety-evidence-v1` remains isolated from this finish branch.

## G. MODEL SYSTEM

Status: `PARTIAL`.

- Roster v2.2 A–J, identity anchors, placement manifest, safe framing, pose/camera/silhouette diversity rules and a 50% exposure ceiling exist.
- TEMI is used on `/infrastructure` as an operator-provided custom Soul identity, intentionally excluded from the A–J exposure calculation.
- BOMI has no verified Production asset or placement in the repository, so no identity claim is made.
- Generated models remain editorial only and are prohibited as participant, review, hotel or product proof.

Finish action: record a September A–E slot plan against active route placements without inventing BOMI evidence. New image generation is deferred unless visual QA identifies a concrete failing asset.

## H. TYPOGRAPHY

Status: `PARTIAL`. Shared `wak-*` typography utilities exist, but Home and Select still mix arbitrary Tailwind sizes and weights. The finish sprint will normalize touched surfaces and protect 320–430 px wrapping; a full-site type migration is not safe in the same patch.

## I. VIDEO HERO

Decision: `KEEP CONDITIONAL VIDEO`.

The Home hero uses an eager optimized poster as LCP candidate and schedules motion after idle/first paint, suppressing video for reduced-motion, data-saver and slow connections. Production showed zero video nodes within the first 800 ms, which is expected; delayed-load and transfer evidence will be rechecked. Do not force video as the LCP asset.

## J. SEASONAL

Status: `PARTIAL`. User-facing Home copy says late summer / early autumn in KO/EN/JA. Source data still contains passed August placeholders and active August-labelled monthly model placements. Time-sensitive Hosted dates will be replaced with truth-safe “next dates in preparation” copy unless a verified date exists.

## K. BIGPIE MODULE

Status: `NOT DONE` as a reusable small campaign system; `NOT REQUIRED` as a live campaign. Build reusable announcement/featured/context placements but do not publish BigPie content without campaign facts and approval.

## L. STALE CONTENT

Confirmed source strings:

- `AI 크리에이터 / AI Creator / AIクリエイター`
- `강원 속초 / Sokcho, Gangwon / 江原・束草`
- `8월 예정 / Aug (TBD) / 8月予定`

These are not visible in the initial Home slice because only the first three upcoming records render, but they remain reachable data and will be removed or rewritten with non-expired, non-claiming wording.

## M. CONTACT / BRAND HYGIENE

Status: `VERIFIED DONE` for the public address rule. Production exposes `wakation.sf@gmail.com`; no unverified domain inbox will replace it. `system@wakation.kr` is treated only as an internal sender identifier, not proof of a public mailbox. Contact ownership should remain centralized in legal/config data.

## N. IMPLEMENTATION PRIORITY

| Priority | Work | Acceptance |
| --- | --- | --- |
| P0 | stale dates/labels, hotel score semantics, duplicate signup | No expired month claim, explicit guest-score label, one Home lead form |
| P1 | static promotion, Home hierarchy, six-stage Select IA | no `.animate-ticker`, materially fewer Home sections, KO/EN/JA parity |
| P2 | controlled Hotel Pilot entry | Booking primary preserved; Pilot Beta link visible and localized |
| P3 | September slot/identity evidence | A–E plan documented; TEMI/BOMI truthfully distinguished |
| P4 | reusable campaign/connect readiness | reusable three-context component; no BigPie/NordVPN promotion |

## O. FINISH-SPRINT EVIDENCE

Implemented on `feat/design-refresh-finish-sprint-v1` without changing `main` or Production:

- Home now has 14 sections and two forms in the inspected render; only one is a lead-capture form. The moving ticker, duplicated discovery rails and large service-map block are absent.
- A static four-choice featured placement replaces the moving promotion rail. Its reusable component supports `announcement`, `featured` and `context`, caps item counts, and preserves sponsored link semantics and affiliate tracking.
- Select exposes six localized stages: STAY, MOVE, CONNECT, EXPERIENCE, WORK and LEARN.
- `/select/hotel` keeps Booking.com search first and adds one localized, controlled Agoda Pilot Beta entry.
- General hotel cards distinguish `guest score /10` from property class and no longer use an ambiguous star glyph.
- Expired AI creator, Sokcho and August/TBD records were removed or rewritten as non-claiming next-date copy.
- September monthly slot metadata covers Home, Hosted, Business, Growth and campaign contexts. TEMI remains a documented custom exception; BOMI is not claimed without a verified asset.
- At 320, 375 and 430 px, Home, Select and Hotel produced no horizontal overflow or broken images. The 375 px visual check confirmed the one-column six-stage timeline and Pilot panel hierarchy.
- KO, EN and JA Home/Select/Hotel routes render localized titles, four featured links, six Select steps and localized Pilot links with no stale copy.
- The conditional Home hero still uses the optimized poster first and defers video; reduced-motion, data-saver and slow-connection suppression remain intact.
- TypeScript, ESLint, Next production build, route/CTA, Stay Engine/Pilot/results, media/seasonal, model diversity, locale, Trip Set and UI audits passed. The local sandbox could not fetch optional dynamic Google-font subsets, so the build used its fallback path and still completed all 394 pages.

## Evidence still to collect

- `VERIFIED DONE` — Vercel Preview `dpl_3K8FHYg8cbemb4MBpZahFbnf8kcw` reached `READY` at `https://ilhaljido-5k74mdifv-clark-kims-projects.vercel.app`.
- `VERIFIED DONE` — Fukuoka Agoda Pilot searches returned six real cards in KO, EN and JA. Each result CTA used HTTPS plus `sponsored noopener noreferrer`; no landing URL was rewritten by Wakation.
- `VERIFIED DONE` — Preview Home, Select and Hotel had no horizontal overflow, broken images, stale copy or client console errors at the inspected mobile and desktop sizes.
- `VERIFIED DONE` — Warm desktop route navigations were about 0.95–1.06 seconds in the browser harness. The first Preview Home request was about 6.7 seconds and is treated as deployment cold-start evidence, not an LCP measurement.
- `VERIFIED DONE` — Home rendered the optimized poster with no video node at 700 ms; after six more seconds the one hero video was playing at ready state 4. This preserves the conditional-motion decision.
- `VERIFIED DONE` — `npm audit --omit=dev` reported zero Production dependency vulnerabilities. Vercel's install summary high-severity item is therefore confined to the non-Production dependency graph and was not auto-fixed in this sprint.

No change has been merged to `main`, promoted to Production or tagged. Production approval remains a separate gate.
