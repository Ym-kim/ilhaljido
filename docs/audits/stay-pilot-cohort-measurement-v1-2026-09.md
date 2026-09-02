# Stay Pilot — Japan/Korea cohort measurement

- Production rollout started: 2026-09-02 KST
- Rollout commit: `e88cfdb`
- Current Production QA commit: `7bedbc9`
- Primary live-search provider: Agoda Affiliate Lite
- Safety fallback: Booking.com `aid=7854081`
- Daily read-only monitor: `stay-pilot-7`

## Cohorts

- Japan: Fukuoka, Osaka and Tokyo
- Korea: Busan, Jeju and Seoul

The comparison uses the same provider-neutral Stay Engine, request validation, result card, disclosure and fallback contract. A cohort is a reporting dimension, not a ranking or user-facing claim.

## Reproducible operations report

Run `npm run report:stay-pilot -- --since=24h` from the linked Vercel project. The command requests only Production logs containing `stay_search_execution`, accepts only the six allowlisted destination IDs and outputs aggregate metrics.

Optional operator-supplied evidence may be added only after it has been checked in the corresponding analytics or QA surface:

```text
--japan-booking-clicks=<non-negative count>
--korea-booking-clicks=<non-negative count>
--affiliate-safety-failures=<non-negative count>
--broken-images=<non-negative count>
```

Missing evidence remains explicitly missing and prevents an `eligible_for_operator_review` result. It is never silently converted to zero.

## Data boundary

The report keeps only destination ID, Japan/Korea cohort, locale, result/fallback mode, provider, allowlisted failure reason, latency, result count and event timestamp. It discards dates, guest counts, property names, property URLs, free-form destinations, credentials and personal information.

Vercel runtime logs support reliability measurement. Conversion events remain in the existing Vercel Analytics and GA event paths. If those dashboards are unavailable, booking-click performance is reported as unavailable rather than inferred from result traffic.

Known automated QA requests are not organic conversion evidence. They may be retained as functional evidence but must be separated before commercial conclusions are made.

## Release gate

- at least 7 complete observation days;
- at least 200 valid searches;
- successful result rate at least 90%;
- Booking fallback rate no more than 10%;
- provider-search p75 latency no more than 2.5 seconds;
- zero affiliate-link safety failures;
- zero broken result images;
- booking-click evidence available for operator review.

Passing the gate does not automatically replace Booking.com or enable another provider. It only permits a separate operator decision.

## Rollback

Set `NEXT_PUBLIC_STAY_KOREA_PILOT` to false and redeploy to remove the Korea destinations from the controlled rollout. Keep Agoda authentication normalization, the provider-neutral engine and Booking.com fallback intact.
