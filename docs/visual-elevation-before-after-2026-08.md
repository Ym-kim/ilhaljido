# Wakation visual elevation — Before / After

Baseline: Production `6252977`  
Branch: `feat/visual-content-elevation-v1`

## Capture directories

- Before mobile: `artifacts/visual-audit/before/mobile/`
- Before desktop: `artifacts/visual-audit/before/desktop/`
- After mobile: `artifacts/visual-audit/after/mobile/`
- After desktop: `artifacts/visual-audit/after/desktop/`

Both sets use the same route names and 390×844 / 1440×900 viewports.

## Changes

| Route | Before | Selected pattern | After | Mobile handling | CTA change |
| --- | --- | --- | --- | --- | --- |
| Home | Three equal service cards | Service ecosystem map | Direct operation, external partner and co-creation roles are separated | Stacked relationship rail | Each node opens its relevant route |
| Programs | Five equal program cards + twelve equal status cards | Featured portfolio + status roadmap | First recommendation and current availability are visible without reading every card | Featured image followed by compact routes; status columns stack | Status rows preserve inquiry and information destinations |
| Select | Four category cards | Preparation timeline | Categories are ordered by when the user normally prepares them | Vertical numbered rail | Each step opens its category and sends one analytics event |
| Collections | Twelve equal image cards | Featured story + comparison + compact index | One primary Trip Set, comparable Trip Sets and secondary themes have distinct hierarchy | Large featured story, then one-column decision cards and compact rows | Primary and comparison CTAs are explicit |
| Guide | Two generic area cards | Neighborhood rail | Area order and editorial differences scan faster without implying a fake map | Numbered vertical sequence | Existing stay, experience and flight CTAs unchanged |
| Wishlist | Large blank state | First-save journey | Users see how Trip Match, saved trips and preparation products connect | Two panels stack into one vertical journey | Primary CTA changes from product browsing to Trip Match |

## Quantitative snapshot

| Route | Before mobile cards | After mobile cards | Before mobile height | Final after mobile height |
| --- | ---: | ---: | ---: | ---: |
| Programs | 27 | 11 | 12,938 px | 9,922 px |
| Collections | 12 | 4 | 4,278 px | 4,514 px |
| Wishlist | 0 | 0 | 2,289 px | 2,515 px |

Collections becomes slightly taller because the featured journey receives deliberate editorial space; repeated full-size cards fall from twelve to four. Programs removes sixteen card surfaces and shortens the mobile page by roughly 3,000 px in the final render.

Responsive browser QA covered 19 representative routes at 360×800, 390×844, 430×932, 768×1024, 1024×768 and 1440×900: 114 route/viewport combinations, with zero horizontal-overflow failures and zero broken images inside the new visual modules. The QA pass also caught and fixed a Japanese 360 px learning-banner overflow and five remote collection thumbnails before final capture.

## Data and media

- Program portfolio images: existing local destination, brand-model and cruise assets.
- Trip Set featured image: existing generated editorial asset, visibly labelled.
- Neighborhood information: `src/lib/guides.ts`; no coordinate or distance claim added.
- Status roadmap: existing `SelectCategoryStatus`; no state inferred.
- Affiliate URLs, status and sponsored attributes were not modified.

## Known limits

- A neighborhood rail is not a map and intentionally omits distance.
- Preparation timing is editorial planning guidance, not a booking deadline.
- Empty-state content depends on client-side saved state and is verified after hydration.
