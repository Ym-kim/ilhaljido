# Stay Engine Phase 9 — provider comparison readiness

- Checked: 2026-09-02
- Customer UI change: none
- Current verified live-search provider: Agoda
- Current fallback: Booking.com search redirect with `aid=7854081`

## Decision

Multi-provider result comparison remains blocked. Wakation currently has one verified live-search provider, while a trustworthy comparison requires at least two providers with separately verified access, server adapters, result mappings and attribution-safe redirect URLs.

The existing Booking.com affiliate ID confirms redirect attribution only. It does not confirm Booking.com Demand API access.

## Booking.com official requirements

Booking.com states that Demand API access requires:

- registration as a Booking.com Managed Affiliate Partner;
- Partner Centre access supplied after the agreed contract;
- an API key token sent as a Bearer token;
- an `X-Affiliate-Id` associated with the API user;
- use of Booking.com location IDs and the documented accommodations search contract.

Official sources:

- https://developers.booking.com/demand/docs/getting-started/prerequisites
- https://developers.booking.com/demand/docs/development-guide/authentication
- https://developers.booking.com/demand/docs/accommodations/search-for-available-properties

Current Production environment-variable names do not include a Booking Demand token or Demand affiliate ID. Secret values were not read. Therefore Booking remains `fallback_redirect`, not a live comparison provider.

## Trip.com status

Wakation has active Trip.com redirect tracking through `Allianceid=9024807`. No official, Wakation-authorized hotel live-search API contract or credential setup was confirmed in the repository or current Production environment. Trip.com therefore remains an alternate redirect provider and is not eligible for a live result comparison.

## Activation gate

Before any comparison Preview is created, a second provider must have all of the following:

1. confirmed commercial/API access for Wakation;
2. server-only credentials with no browser exposure;
3. an implemented timeout and fail-closed live-search adapter;
4. verified destination-ID mapping;
5. actual image, property, rating, rate and amenity field mapping;
6. provider-returned attribution/landing URLs preserved without rewriting;
7. terms permitting the proposed display and comparison;
8. KO/EN/JA, mobile, affiliate and fallback QA.

The comparison readiness evaluator requires two fully verified providers. It does not create a customer feature flag, comparison card or provider switch while the gate is blocked.

## Operator action

1. Confirm whether the existing Booking.com account is a Managed Affiliate Partner account with Partner Centre Demand API access.
2. If eligible, generate the Demand API token in Partner Centre and keep it server-only.
3. Confirm the Demand-specific affiliate ID to send in `X-Affiliate-Id`; do not assume that `aid=7854081` alone proves API authorization.
4. Test Sandbox access before Production and record the allowed integration type.
5. Do not add credentials to chat, source code, screenshots or documents.

## Rollback

This phase changes only readiness metadata, audits and documentation. Reverting its feature commit removes the preparation layer. Agoda Pilot and Booking.com fallback behavior remain unchanged.

