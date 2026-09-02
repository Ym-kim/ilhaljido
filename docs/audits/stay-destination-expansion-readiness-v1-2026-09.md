# Stay destination expansion readiness v1

- Assessed: 2026-09-02 KST
- Public pilot remains: Fukuoka, Osaka and Tokyo
- Prepared only: Seoul, Busan and Jeju
- Rollout rule: no public exposure before Phase 7 operator review

## Candidate scorecard

Each criterion is worth 20 points. A score below 100 is not release-ready.

| Candidate | Agoda city ID | Guide + Trip Set | Active affiliate | Verified local media | Live result quality | Score | Decision |
| --- | ---: | --- | --- | --- | --- | ---: | --- |
| Busan | 17172 | Verified | Verified | Verified | Pending | 80 | Prepared, not enabled |
| Jeju | 16901 | Verified | Verified | Verified | Pending | 80 | Prepared, not enabled |
| Seoul | 14690 | Verified | Verified | Verified | Pending | 80 | Prepared, not enabled |

The city IDs come from the existing Agoda city registry checked on 2026-09-01. They must still be compared with any official Agoda city list if the partner supplies one.

## Existing Wakation evidence

- Busan: `/guide/busan`, `/collections/busan-weekend`, active Agoda redirect and `busan-editorial-v1.webp`.
- Jeju: `/guide/jeju`, `/collections/jeju-solo-reset`, active Agoda redirect and `jeju-editorial-v1.webp`.
- Seoul: `/guide/seoul`, `/collections/seoul-3n4d`, active Agoda redirect and `seoul-editorial-v1.webp`.

The legacy Jeju Select-card cover was replaced with the existing locality-verified Jeju image. No Agoda result image, name, rate or availability is fabricated or cached.

## Final gate after Phase 7

For each city, run dated KO/EN/JA searches and record only aggregate QA evidence:

- HTTP status, latency and result count;
- percentage of results with usable provider photos;
- property-name legibility in each locale;
- positive, correctly formatted nightly rates;
- provider-returned landing URL and safe affiliate `rel`;
- Booking.com fallback on empty or invalid provider payload.

Only then may `live_result_quality` become `verified`. Public selector inclusion requires a separate main/Production approval.
