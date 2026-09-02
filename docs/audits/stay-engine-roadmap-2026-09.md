# Wakation Stay Engine — remaining phases (2026-09)

The order below preserves Booking.com fallback, keeps provider data separate from Wakation-owned research and uses production evidence as the gate for wider rollout.

| Phase | Scope | Status | Release gate |
| --- | --- | --- | --- |
| 1 | Agoda Authorization normalization and server-only security | Complete | Production HTTP 200 and real results |
| 2 | Provider-neutral Search Pilot for Fukuoka, Osaka and Tokyo | Complete | KO/EN/JA, mobile, redirect and fallback QA |
| 3 | Home → dated Stay Pilot entry | Complete | Production destination/date handoff |
| 4 | Guide and Trip Set → dated Stay Pilot entry | Complete | Production source attribution and affiliate QA |
| 5 | Result discovery controls | Complete | Actual-field-only filters, deterministic sorting, mobile accessibility |
| 6 | Verified Wakation Stay Intelligence | Complete | Original research source and `verifiedAt` required; no provider data repackaging |
| 7 | Conversion measurement and rollout decision | In progress | Search/result/click funnel sample, latency and fallback-rate review |
| 8 | Destination expansion readiness | In progress, not exposed | Verified Agoda city IDs, acceptable result quality and Phase 7 evidence |
| 9 | Multi-provider comparison | Conditional | A second live-search contract, comparable terms and tracking permission |
| 10 | Pilot graduation | Conditional | Stable QA, disclosure, performance and rollback evidence |

## Phase 5 boundary

- Sort only by provider order, actual nightly rate or actual review score.
- Filter only when Agoda returned the corresponding Wi-Fi, breakfast or review field.
- Do not invent a Wakation ranking, recommendation score, availability or discount.
- Preserve the provider-returned landing URL and Booking.com `aid=7854081` fallback.

## Deferred by design

- Price alerts, direct booking, payment, refund handling and database migrations.
- Site-wide Agoda primary placement before pilot evidence supports graduation.
- Provider comparison until a second provider has verified live-search data.

## Phase 6 boundary

- Join editorial notes only through explicit provider property ID and destination ID mappings.
- Require an official research source, localized copy and `verifiedAt` for every entry.
- Do not infer a match from a similar hotel name or populate notes from Agoda rate, rating, review or amenity fields.
- The note may be absent from a valid search result; absence is safer than an unverified claim.

## Phase 8 readiness boundary

- Seoul, Busan and Jeju may be prepared as candidates because each has a verified city ID, localized guide, Trip Set, active redirect and local destination media.
- Candidate data must remain disconnected from the public pilot selector and request validator until Phase 7 evidence passes operator review.
- Live result photo, property-name, rate and redirect quality is the final 20-point gate. A candidate at 80/100 is not ready for exposure.
