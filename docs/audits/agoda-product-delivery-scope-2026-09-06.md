# Agoda product delivery scope

Date: 2026-09-06  
Branch: `feat/agoda-product-zh-cookie-v1`

## Applied in Wakation

- Server-only Affiliate Lite search retrieves Agoda hotel IDs, names, provider images, nightly and crossed-out rates, verified discount values, Agoda property rating, guest review score/count, Wi-Fi, breakfast and the provider-returned `landingURL` when those fields exist.
- Agoda-owned image URLs are validated before display. Missing or failed images use a clearly neutral placeholder and do not invent a hotel photo.
- The returned Agoda booking URL is validated for HTTPS Agoda ownership and expected CID, hotel, dates, guest count, room count and currency. Wakation does not rebuild or overwrite Agoda attribution parameters.
- The stay card now labels provider facts as live Agoda API data and says explicitly that the final room/rate check continues on Agoda.
- Booking.com remains the timeout, error and empty-result fallback. The existing `aid=7854081` flow is unchanged.
- Agoda remains a controlled six-destination pilot until the existing 7-day / 200-search / booking-click evidence guardrail is reviewed.

## Current booking boundary

Wakation can search, curate and display the available Affiliate Lite response and refer the visitor through Agoda's returned booking URL. Agoda completes availability confirmation, booking, payment, cancellation and refund handling.

An embedded Wakation checkout is not inferred from Affiliate Lite credentials. Agoda's current integration documentation separates online-affiliate Search API access from booking-capable integration models such as Agoda Fulfill Assisted, which require their own onboarding and certification. Wakation must not present an on-site payment flow until Agoda grants and certifies that product scope.

## Security and data truth

- API credentials and Authorization remain server-only.
- No provider field is generated when absent.
- Affiliate URLs are not exposed to server logs and secrets are not placed in analytics.
- Provider facts and Wakation editorial intelligence remain visually and structurally separate.

## Official references

- Agoda Affiliate Lite API V2.0: <https://partners.agoda.com/Content/Documents/AffiliateLiteApi/Affiliate_Lite_API_V2.0.pdf>
- Agoda affiliate FAQ: <https://partners.agoda.com/en-us/faq.html>
- Agoda Demand API integration models: <https://developer.agoda.com/demand/docs/getting-started>
