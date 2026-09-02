# Stay Pilot safety evidence v1 — 2026-09

## Purpose

Phase 7 and Phase 10 require current evidence that provider-returned booking links keep Wakation attribution and that the images shown in live stay results respond as images. Existing static audits protect source code and catalog links, but they do not inspect the current Affiliate Lite response.

## Probe boundary

- Once per cache hour, sample Fukuoka and Busan to represent the active Japan and Korea pilot cohorts.
- Use the same Agoda API client and response mapper as the customer search flow.
- Require HTTPS Agoda booking hosts and exact `cid=1968994` attribution.
- Request only the first bytes of displayable provider images, accept HTTP 200/206 with an `image/*` content type, then cancel the body.
- Return counts and status only. Never expose a hotel name, property ID, booking URL, image URL, stay date, guest data, credential or authorization header.
- An API failure, zero checked images or malformed health response remains missing evidence; it is never converted to a passing zero.

## Operational report

`npm run report:stay-pilot -- --since=24h` now reads the cached public aggregate endpoint by default. Explicit non-negative `--affiliate-safety-failures` and `--broken-images` values remain available for audited overrides.

The evidence can clear only the two safety evidence fields. It cannot waive the seven-day window, 200-search sample, booking-click evidence or operator release approval.

## Rollback

Revert this feature commit. Customer search, provider links and Booking.com fallback do not depend on the health probe or its report integration.
