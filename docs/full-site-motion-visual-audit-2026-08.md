# Wakation full-site motion and visual audit

Date: 2026-08-01  
Production baseline: `aabba0b`  
Branch: `feat/full-site-motion-visual-elevation-v1`
Preview: `https://ilhaljido-72n1s9xov-clark-kims-projects.vercel.app`

## Coverage

- 264 customer-accessible routes were rendered at 390×844 and 1440×900.
- 94 normalized route templates were identified.
- 170 template and dynamic-data variants were captured at each viewport for the Before archive.
- The source audit covered 124 customer page templates, 271 source sections, 188 local public images and every source reference to an external image origin.
- Admin/API/auth routes were excluded from the visual scorecard and retained in the normal security regression suite.

The complete per-route and per-image tables are checked in as:

- `docs/audits/full-site-route-scorecard-2026-08.csv`
- `docs/audits/full-site-image-suitability-2026-08.csv`
- `docs/audits/full-site-remote-image-sources-2026-08.csv`

The scorecard is a deterministic QA heuristic, not a claim that design quality can be reduced to one number. It deducts for render failure, horizontal overflow, broken or unlabelled images, simultaneous continuous animation, remote image dependency, repeated image placement and very long static journeys.

## Production baseline findings

| Check | Result |
| --- | ---: |
| Route render failures | 0 / 264 |
| Broken images | 0 |
| Images missing an `alt` attribute | 0 |
| Mobile overflow routes | 3 |
| Desktop overflow routes | 0 |
| Routes with continuous/infinite motion | 25 |
| Home simultaneous infinite animations | 5 |
| Local public images | 188 / 24,447,407 bytes |
| Byte-identical local image groups | 0 |
| Exact local image references missing | 0 |

The three mobile overflow failures were the Japanese Cebu, Fukuoka and Sydney destination details. Japanese FAQ sentences inherited Korean `word-break: keep-all`, so a long question enlarged the page even though the climate strip itself was correctly scrollable.

The lowest baseline group was Home because a Ken Burns hero, ticker and multiple pulse markers ran at the same time. Long editorial pages such as Programs, Select and Experience had strong static hierarchy but no paced reveal between major decisions.

## Priority implementation

| Route group | Before | Change | Result |
| --- | --- | --- | --- |
| Global | Scattered timing and partial reduced-motion handling | Motion tokens, one observer runtime and a global reduced-motion contract | Consistent timing without a third-party motion dependency |
| Home | Five simultaneous infinite animations; ticker could only pause on hover | Decorative pulses removed, hero zoom reduced from 8% to 3.5%, ticker play/pause control added | Calmer first impression and user-controlled continuous motion |
| Trip Match | Progress moved, but questions and results changed abruptly | One-shot reveal on intro, each question, result, preparation and Hosted continuation | State change is easier to follow without adding delay to input |
| Programs | Strong portfolio and roadmap but long static scan | Editorial reveal on portfolio and status roadmap | Clearer visual chapter change |
| Select | Preparation timeline appeared as one static block | Editorial reveal on preparation journey | Planning order receives focus before products |
| Collections | Featured, comparison and theme index shared one static rhythm | Separate editorial, standard and fade reveal patterns | Hierarchy is reinforced without animating every card |
| Guide / Destination | Static neighborhood rail; Japanese line overflow | Neighborhood reveal plus Japanese line-breaking correction | 0 mobile overflow failures |
| Saved / Experience | Empty-state journey and long experience sections appeared abruptly | One-shot journey and section reveals | Return and commerce flows gain pacing while CTAs remain immediate |

## After verification

The final Vercel Preview rendered all 264 routes at both required viewports with:

- 0 route failures;
- 0 horizontal-overflow failures;
- 0 broken images, including configured remote photographic sources;
- 0 missing `alt` attributes;
- Motion Runtime active on every route;
- 21 deliberate reveal targets across the eight priority route groups.

The local sandbox cannot fetch configured Unsplash origins, so local image-optimizer requests for those sources fail. Preview was therefore used as the authoritative final image check. The local security regression also returned 403 for unauthenticated `/api/admin/applications` and redirected unauthenticated `/admin` to `/login?redirect=/admin`.

## Remaining visual debt

There are 175 source occurrences representing 122 distinct Unsplash URLs across 18 files. They are real photographic sources rather than pastel placeholders, and Production rendered them successfully, but they remain a reliability and provenance-maintenance dependency. They were not copied into the repository because a local migration requires a deliberate source/license record and visual match check for each use.

The next recommended branch is `feat/verified-local-media-migration-v1`: migrate active customer-facing remote images in batches, starting with `src/lib/i18n/data.ts`, `src/lib/affiliate/destinations.ts`, `src/lib/affiliate/featured.ts` and `src/lib/affiliate/items.ts`. Inactive legacy assets marked `ARCHIVE_REVIEW` should be removed only after reference and rollback review.

No new generated image was necessary in this branch. The priority surfaces already had matching, high-resolution, disclosed editorial or verified photographic assets; generating replacements would add synthetic content without solving a demonstrated mismatch.
