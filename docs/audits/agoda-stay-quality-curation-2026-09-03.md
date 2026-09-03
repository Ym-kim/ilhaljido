# Agoda Stay Quality Curation — 2026-09-03

## Scope

The Agoda pilot remains provider-neutral and behind the existing rollout controls. Booking.com fallback and `aid=7854081` are unchanged. This phase changes only how valid Agoda candidates are selected and presented.

## Confirmed Affiliate Lite fields

Source: Agoda, *Affiliate Long Tail Search API / Affiliate Lite API V2.0*, 2018-02-07.

- City Search supports `maxResult` from 1 to 30 and defaults to `Recommended` sorting.
- The response schema includes `reviewScore` (0–10), `reviewCount`, `starRating` (0–5), price, image, Wi-Fi, breakfast and `landingURL`.
- Wakation requests 30 candidates, validates the provider response, excludes review scores below 8.0 and displays at most 12.

## Selection order

1. Reject invalid price, property identity or affiliate landing data.
2. Require a real Agoda guest review score of at least 8.0; 8.5+ is preferred.
3. Add bounded confidence for 100+ reviews, then 30+ reviews.
4. Add bounded signals for a real provider image, free Wi-Fi, breakfast and Agoda property rating.
5. Preserve a useful value / mid-range / premium spread only among qualified candidates.
6. Return no internal Wakation numeric score to the browser or UI.

If fewer than 12 qualified stays are available, the page shows fewer than 12 rather than filling the grid with lower-quality stays.

## Accommodation Data File status

The public Agoda affiliate FAQ confirms multilingual data feeds exist, but the repository contains no downloaded Accommodation Data File, current schema, licence addendum or refresh instructions. The open browser session does not contain an authenticated Partner Dashboard tab, so dashboard availability and download terms are **not confirmed**.

Operator handoff if the dashboard exposes **Accommodation Data File**:

1. Download the current English master file and KO/JA variants only if separately offered.
2. Also download the accompanying schema/readme and current content/image usage terms.
3. Provide the files through the approved project handoff; do not provide API keys, passwords or Authorization headers.
4. Wakation will inspect only documented fields such as hotel ID, city ID, localized name, property rating, facilities, geodata, image URL and update timestamp. It will not assume Content API access.

No provider image is downloaded, permanently cached or replaced with an AI-generated hotel image in this phase.
