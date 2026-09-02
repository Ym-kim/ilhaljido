# Stay rating semantics v1 — 2026-09

## Source finding

The Agoda Affiliate Lite API V2.0 partner specification defines two separate response fields:

- `starRating`: `Double (0-5)`, described as `Star Rating`;
- `reviewScore`: `Double (0-10)`, described as `Review Score`.

The schema does not state that `starRating` is a government-certified or locally accredited hotel class. The Wakation UI must therefore not translate it into an unqualified official class such as `4성급`.

The live Preview response was also checked without recording property identifiers or booking URLs. It returned `starRating` values on the 0–5 scale separately from `reviewScore` values on the 0–10 scale.

## UI decision

- Remove the star glyph and `N성` / `Nつ星` / `N-star` rendering.
- Display `starRating` as a provider-attributed metric: `Agoda 숙소 등급 4.0/5`.
- Display `reviewScore` separately: `이용자 후기 평점 8.5/10`.
- Explain near the result heading that Agoda's 0–5 property rating may differ from an official local hotel classification.
- Keep a missing or zero `starRating` hidden rather than inferring a class.

## Safety

No API credential, Authorization header, provider landing URL, price field, fallback, feature flag or tracking parameter is changed by this clarification.
