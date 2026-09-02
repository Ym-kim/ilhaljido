# Wakation Design & UX Refresh v2 — September pilot audit

Date: 2026-09-02  
Branch: `feat/design-ux-seasonal-refresh-v2`

## Guardrails

- Preserve the current navigation, typography, card, affiliate, Agoda pilot and Booking.com fallback systems.
- Treat the BOMI and TEMI archives as identity references only. Do not publish the source images as web assets.
- Treat the operator-designated airport model as a required custom identity reference. It is not assigned a `WAK-MODEL-*` roster ID.
- Generated model imagery is illustrative editorial media, not evidence of a real customer, hotel, program or participant.
- September direction is late summer moving into early autumn: muted coral, powder blue, teal, architectural gray, warm daylight and a light knit layer.

## Current-state audit

- Production home is visually rich but significantly longer and denser than the audited Airbnb, Booking.com and Trip.com entry pages. A later home phase should reduce first-view choices without rebuilding the established design system.
- The Stay Search Pilot already has a provider-neutral API/domain layer, verified Agoda city IDs, a feature flag, Booking.com fallback, partner-returned landing URLs and privacy-safe analytics.
- Agoda may omit hotel images. The current result UI correctly avoids inventing images or Wakation scores when the API does not provide them.
- The pilot displayed `-0%` when an API discount value was zero and could show a crossed-out price without a meaningful saving. This was a trust defect.
- The original pilot hero was visually safe but did not express the September seasonal model direction or the operator-designated identity.

## Implemented pilot scope

- Added one desktop and one native mobile hero crop generated from the operator-designated identity reference.
- Kept the model's complete head, hands, itinerary and luggage visible at reviewed desktop and mobile widths.
- Added route, section, locale, season, wardrobe, realism, focal-point, safe-framing, source and usage-restriction metadata to the existing media manifest.
- Registered the custom identity as a deterministic Stay Pilot placement while excluding it from the official roster exposure calculation.
- Moved the desktop search CTA into the primary search row and retained stacked, full-width mobile controls.
- Suppressed zero/negative discount claims and crossed-out rates that do not exceed the current rate.

## Production asset prompt record

Desktop direction: photoreal editorial departure scene using the operator-designated adult model identity; generalized transport concourse; muted coral sleeveless collared midi dress; powder-blue fine-knit layer; teal carry-on; itinerary and phone; model on the right with generous left copy space; complete head, natural hands and full luggage; warm September daylight; no airport logo, text or identifiable venue.

Mobile direction: native 4:5 recomposition of the same identity, wardrobe and action; complete head, hands and luggage; protected copy contrast; no simulated customer or booking proof.

Generation provider: OpenAI built-in ImageGen. Higgsfield Soul 2.0 was not required because the identity, anatomy, framing and seasonal art-direction checks were met.

## Monetization impact and risk

- Expected impact: a clearer search hierarchy and more credible rate presentation should improve confidence before Agoda or Booking.com outbound clicks.
- Primary risk: the pilot still depends on Agoda response latency and optional fields. Existing timeout, empty-result and 4xx/5xx fallback behavior remains unchanged.
- Rollback: revert the feature commit. No database migration, affiliate parameter, environment variable or provider-primary change is included.

## Next preview phase

Reduce Home first-view density and audit destination/collection modules against one dominant discovery action. This should be a separate preview because it changes a high-traffic surface and requires conversion comparison.
