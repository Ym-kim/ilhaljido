# AGODA LIVE STAY PRODUCTIZATION GAP REPORT

Date: 2026-09-03  
Baseline: `origin/main` at `db163bd`  
Implementation branch: `feat/agoda-live-stay-productization-v1`

## A. Current Agoda productization gap

- The provider-neutral `StaySearchResult` domain, Agoda live adapter, Booking.com redirect fallback, locale routes and PII-safe funnel events already exist.
- Production can return and render Agoda live inventory for Fukuoka, while Osaka and Tokyo currently fall back to Booking.com.
- A missing provider image is treated as if the whole property were unusable. The result is filtered once in the server adapter and again in the client view.
- The card supports price, crossed-out price, discount, guest score, provider property rating, Wi-Fi, breakfast and a verified Wakation research note, but has no zero-image presentation.
- The existing disclosure correctly leaves booking, payment, cancellation and refunds with the affiliate provider.

## B. Osaka/Tokyo zero-card root cause

The root cause is an overly strict display filter, not absence of hotel inventory:

1. `mapAgodaHotelToStayResult()` safely accepts a property without `imageURL` and maps it with `imageUrl: undefined`.
2. `searchAgodaStays()` then removes every mapped result without an image.
3. If no image-backed result remains, the adapter returns `empty_result`, which activates the Booking.com fallback.
4. The client applies the same image-only filter a second time.

Production evidence on 2026-09-03: Fukuoka rendered four image-backed results; Osaka rendered the Booking fallback. Agoda health and prior pilot evidence confirm live inventory exists for the pilot cities. The two image-only filters fully explain how valid inventory becomes zero visible cards.

## C. Image pipeline plan

1. Accept provider images only from Agoda-owned HTTPS hosts.
2. Normalize legacy Agoda-owned HTTP URLs to HTTPS; never rewrite the booking URL.
3. Render a fixed-ratio, branded neutral accommodation placeholder when the provider supplies no usable image.
4. Do not generate or imply a photograph of the actual hotel.
5. Keep native lazy loading for remote provider images so the frontend does not widen Next.js image hosts or proxy third-party media without confirmed terms.
6. Record image presence as bounded telemetry, without logging URLs.

## D. Current API field coverage

Mapped from the documented Affiliate Lite response when present:

- `hotelId`, `hotelName`, `imageURL`
- `starRating` as Agoda's provider property rating, not a guaranteed official local classification
- `reviewScore` on a 10-point scale
- `dailyRate`, `crossedOutRate`, `discountPercentage`, `currency`
- `freeWifi`, `includeBreakfast`
- provider-returned `landingURL`

The adapter validates HTTPS, Agoda host, CID, hotel ID, currency, dates, adults, children and room count without rebuilding or mutating the returned URL.

The reviewed Affiliate Lite document does not list a review-count field. No review count will be invented or displayed.

## E. Proposed Stay card

Desktop and mobile use the same semantic order:

1. Actual Agoda property image or clearly non-photographic Wakation Stay placeholder
2. Hotel name
3. Guest review score, separately labelled from Agoda property rating
4. Available Wi-Fi and breakfast facts
5. Crossed-out rate, live nightly rate and valid discount only when internally consistent
6. Verified Wakation research note only when a property-ID match exists
7. `객실·최종요금 확인` partner CTA and short final-price note

Cards keep a stable image ratio, visible focus states and a minimum 44px interactive target.

## F. Booking fallback rule

Booking fallback remains for Agoda configuration error, timeout, network/HTTP error, bad payload, no actual property result, malformed critical property data, or disabled/unavailable provider.

Booking fallback is not triggered only because image, discount, breakfast, Wi-Fi or Wakation research data is absent.

## G. Main Hotel controlled rollout

- Keep the existing `/select/hotel/pilot` route `noindex, nofollow`.
- Keep Agoda live search behind `AGODA_STAY_PILOT` and destination allowlisting.
- Retain the existing `/select/hotel` Beta entry, while keeping Booking.com search as the established secondary/fallback route.
- Do not make Agoda site-wide primary before the 7-day / 200-search / booking-click guardrail is reviewed.

## H. Analytics gap

Existing events: `stay_search`, `stay_result_view`, `stay_property_click`, `stay_booking_click`, `affiliate_redirect` in the shared taxonomy.

Required refinements:

- emit `affiliate_redirect` for an Agoda result CTA as well as the existing affiliate click event;
- add bounded `image_status`, `discount_present` and `wakation_note_present` properties to result-view and outbound events;
- preserve `fallback_reason`, result count, latency bucket, destination, provider, position, source and locale;
- never send names, free-form destinations, URLs, dates, credentials or personal guest data.

## I. Implementation plan

- P0: Remove the image-only result filters on the server and client.
- P1: Refine the provider-data hierarchy and CTA copy without changing the established visual system.
- P2: Add a neutral, accessible zero-image placeholder and image-status telemetry.
- P3: Clarify the controlled live-search Beta entry on `/select/hotel` while preserving Booking search.
- P4: Confirm the Select Stay path reaches the hotel page and supports destination-prefilled pilot entry.
- P5: Complete privacy-safe outbound/fallback telemetry and regression audits.
- P6: Run KO/EN/JA, 320/375/390/430px, TypeScript, lint, build, affiliate and Stay Engine QA before Preview.

Rollback is one feature-branch revert. No credentials, database migrations, payment logic, provider-primary switch or affiliate parameter changes are in scope.
