# Stay contextual money path v1 — 2026-09

## Decision

| Candidate | Revenue | Difference | KO/JP fit | Efficiency | Scale | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Guide / Trip Set → dated Stay Engine | 20 | 18 | 18 | 18 | 18 | 92 |
| Stay result filters and sorting | 18 | 17 | 18 | 17 | 17 | 87 |
| Expand live search beyond three cities | 16 | 14 | 16 | 16 | 17 | 79 |

The first option removes a repeated-search step at the highest-intent content surfaces while reusing the verified Pilot, dates, guests, tracking and fallback contracts.

## Scope

- Add one reusable, localized date-and-guest search module to Fukuoka, Osaka and Tokyo Guides and Trip Sets.
- Route only allowlisted destinations and sources through the server-gated Pilot entry.
- Preserve the curated stay link on Guides and the existing preparation cards on Trip Sets.
- Attribute Guide and Trip Set searches, results and fallback clicks separately without sending free-form text or personal information.

## Safety and rollback

- `AGODA_STAY_PILOT` stays server-only; no provider secret is introduced into the client bundle.
- Agoda failures retain the existing Booking.com redirect with `aid=7854081` and the active site language.
- Dates and guest counts are validated both in the UI and at the server entry boundary.
- Rollback removes the two contextual placements and their allowlisted source values. Existing Guide, Trip Set, Home, Select and Booking flows remain available without migrations.
