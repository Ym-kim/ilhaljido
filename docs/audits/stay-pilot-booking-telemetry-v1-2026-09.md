# Stay Pilot booking telemetry v1 — 2026-09

## Why this phase exists

The 2026-09-02 Production report had seven searches, seven successful result views, no fallback and p75 latency of 91 ms. It was still blocked by a one-day observation window, a seven-search sample and missing operational booking-click evidence.

Client analytics already emits `stay_booking_click`, but the privacy-safe Vercel log report could not count those browser events. Pilot graduation must not treat missing click evidence as successful monetization.

## Implementation

- The Agoda result CTA and Booking.com fallback remain direct affiliate links.
- A best-effort same-origin POST records only destination ID, locale, provider and whether the click came from results or fallback.
- The endpoint is feature-flag gated, same-origin checked, limited to 512-byte requests and rejects unknown fields.
- No property ID, property name, URL, check-in/out date, guest count, cookie, email, phone or user identifier is accepted or logged.
- Telemetry failure is swallowed and never delays or blocks the provider redirect.
- The operational report parses and deduplicates only allowlisted Production booking-click records.

## Graduation guardrail

A mature seven-day / 200-search sample with zero observed booking clicks is now `hold`, not eligible for operator review. One click is only evidence that the money path is functioning; it is not a claim of booking completion or revenue.

The pilot still cannot graduate automatically. Affiliate safety, broken-image evidence and explicit operator release approval remain separate requirements.

## Rollback

Revert this feature commit. The Agoda and Booking.com links remain unchanged because the telemetry request is independent from navigation.
