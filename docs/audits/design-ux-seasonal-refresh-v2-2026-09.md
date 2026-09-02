# Wakation Design & UX Refresh v2 — September pilot audit

Date: 2026-09-02  
Branch: `feat/design-ux-seasonal-refresh-v2`

## Guardrails

- Preserve the current navigation, typography, card, affiliate, Agoda pilot and Booking.com fallback systems.
- Treat the BOMI and TEMI archives as identity references only. Do not publish the source images as web assets.
- Treat the operator-designated airport model as a required custom identity reference. It is not assigned a `WAK-MODEL-*` roster ID, but its first generated Stay Pilot variant was rejected and is not shipped.
- Generated model imagery is illustrative editorial media, not evidence of a real customer, hotel, program or participant.
- September direction is late summer moving into early autumn: muted coral, powder blue, teal, architectural gray, warm daylight and a light knit layer.
- Full-body model output must read as a believable eight-head fashion-model balance. If perspective, pose or garment line makes the legs look short, the output is rejected; identity-preserving regeneration escalates to Higgsfield Soul 2.0 when the primary generator cannot pass this gate.

## Current-state audit

- Production home is visually rich but significantly longer and denser than the audited Airbnb, Booking.com and Trip.com entry pages. A later home phase should reduce first-view choices without rebuilding the established design system.
- The Stay Search Pilot already has a provider-neutral API/domain layer, verified Agoda city IDs, a feature flag, Booking.com fallback, partner-returned landing URLs and privacy-safe analytics.
- Agoda may omit hotel images. The current result UI correctly avoids inventing images or Wakation scores when the API does not provide them.
- The pilot displayed `-0%` when an API discount value was zero and could show a crossed-out price without a meaningful saving. This was a trust defect.
- The original pilot hero is visually safe and remains the active baseline until a proportion-correct identity-preserving replacement is approved.

## Implemented pilot scope

- Moved the desktop search CTA into the primary search row and retained stacked, full-width mobile controls.
- Suppressed zero/negative discount claims and crossed-out rates that do not exceed the current rate.
- Restored the original non-model Stay Pilot hero after operator review rejected the generated model's body balance. The rejected files, manifest entries and route placement were removed from the deliverable.

## Rejected asset record

The discarded desktop/mobile pair used a generalized transport concourse, muted coral travel dress, powder-blue fine-knit layer, teal carry-on, itinerary and phone. Although the files passed basic anatomy and crop checks, the standing figure read shorter than the required fashion-model proportion. Operator review overrules the earlier automated disposition.

Disposition: `REJECTED_PROPORTION`; not present in `public/`, the media manifest, rotation registry or active route. A later retry must use a full-body proportion gate and Higgsfield Soul 2.0 if the primary generator cannot preserve identity and a believable eight-head balance together.

## Monetization impact and risk

- Expected impact: a clearer search hierarchy and more credible rate presentation should improve confidence before Agoda or Booking.com outbound clicks.
- Primary risk: the pilot still depends on Agoda response latency and optional fields. Existing timeout, empty-result and 4xx/5xx fallback behavior remains unchanged.
- Rollback: revert the feature commit. No database migration, affiliate parameter, environment variable or provider-primary change is included.

## Next preview phase

Reduce Home first-view density and audit destination/collection modules against one dominant discovery action. This should be a separate preview because it changes a high-traffic surface and requires conversion comparison.
