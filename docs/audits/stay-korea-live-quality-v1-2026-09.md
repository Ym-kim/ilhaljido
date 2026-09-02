# Stay Korea Pilot live-quality evidence

Checked on 2026-09-02 through the Preview-only aggregate measurement route. The request used two adults, one night starting 21 days ahead, KRW and a maximum of eight results. No hotel names, property IDs, booking URLs or credentials were recorded.

| Candidate | Agoda city ID | Results | Valid | With actual image | Review metric | Property class | CID-preserved links | Latency | Result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Busan | 17172 | 8 | 8 | 8 | 8 | 8 | 8 | 257 ms | Pass |
| Jeju | 16901 | 8 | 8 | 7 | 8 | 8 | 8 | 42 ms | Pass |
| Seoul | 14690 | 8 | 8 | 8 | 8 | 8 | 8 | 35 ms | Pass |

## Release boundary

- Each city now satisfies all five readiness criteria and scores 100/100.
- Readiness does not equal public exposure. `NEXT_PUBLIC_STAY_KOREA_PILOT` is default-off and must be explicitly enabled in a reviewed deployment.
- The existing Fukuoka, Osaka and Tokyo pilot remains the only Production scope while the flag is unset.
- Booking.com fallback and `aid=7854081` remain unchanged.
- Agoda landing URLs remain provider-owned; Wakation checks only that the active `cid=1968994` attribution is present.

## Measurement route

- `/api/stays/expansion-readiness` is available only when `VERCEL_ENV=preview`.
- Production and local requests fail closed with 404.
- The route is cached for one hour to limit Affiliate Lite quota use.
- The response contains aggregate quality metrics only.
