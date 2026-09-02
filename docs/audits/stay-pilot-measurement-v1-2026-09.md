# Stay Pilot Phase 7 — measurement and rollout decision

- Started: 2026-09-02 KST
- Production baseline: `d1c541b`
- Pilot destinations: Fukuoka, Osaka and Tokyo
- Primary live provider: Agoda
- Safety fallback: Booking.com `aid=7854081`

## What is measured

Client funnel events use only bounded identifiers: locale, allowlisted destination ID, provider, source section, result-count band, latency band, failure reason, property ID and result position. Dates, guest counts, free-form destinations, provider URLs and personal information are excluded.

The server writes one structured `stay_search_execution` line per valid search. It contains destination ID, locale, result/fallback mode, provider, failure reason, latency and result count. The logger cannot accept dates, guest counts, property links or credentials.

The current result card has one external provider handoff CTA. `stay_property_click` and `stay_booking_click` therefore describe the same user action in Phase 7 and must not be treated as two independent funnel steps. The decision funnel is `stay_search → stay_result_view → stay_booking_click`.

## Operator evidence window

These are internal release guardrails, not market claims:

- at least 7 complete days and 200 valid searches;
- successful result rate at least 90%;
- fallback rate no more than 10%;
- provider-search p75 latency no more than 2.5 seconds;
- zero affiliate-link safety failures and zero broken result images.

Passing the guardrails does not automatically change the primary provider or expand destinations. It only makes the pilot eligible for an operator review. Booking-click rate is reported as an outcome metric; it receives no invented target until the first clean pilot baseline exists.

## Production baseline QA

- Fukuoka returned live Agoda results with actual provider photos.
- KO, EN and JA rendered without horizontal overflow or broken images.
- A valid request that produced an Agoda payload failure returned Booking.com fallback with `aid=7854081` and `sponsored noopener noreferrer`.
- QA probes are functional evidence, not organic conversion data.

## Rollback

Set the existing Production `AGODA_STAY_PILOT` flag to false and redeploy. The entry route then returns users to the existing Booking.com search. Do not delete Booking provider code, its affiliate ID or the server-only Agoda authentication normalization.
