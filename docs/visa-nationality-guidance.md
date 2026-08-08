# Visa guidance by passport nationality

## Product rule

- Visa guidance is calculated from the passport nationality explicitly confirmed by the user, destination, purpose and duration.
- `wakation_geo` is an approximate connection-country signal. It may suggest a passport option but never confirms nationality, skips the passport step or changes a result without user confirmation.
- The visitor can choose another supported passport or enter the country/territory printed on an unlisted passport.
- Unsupported passport–destination pairs return a clear official-confirmation fallback. They do not inherit Korean-passport copy.
- Signed-in AI analysis must prioritize the destination government or immigration authority and the selected passport issuer's foreign ministry or consular service. Unverified conditions are labelled as requiring official confirmation.

## Verified static coverage — 2026-08-08

| Passport | Destination coverage | Official basis |
| --- | --- | --- |
| Republic of Korea | Japan, Taiwan, United States, Canada, Australia, Vietnam; existing destination-specific long-stay notes remain Korean-passport gated | Destination immigration/foreign-ministry sources already registered in `research.ts`, Japan MOFA exemption list and the existing freshness registry |
| Japan | Korea, Taiwan, United States, Canada, Australia, Vietnam, Thailand, Indonesia, Philippines, Malaysia and the listed Schengen destinations | Japan MOFA overseas-safety immigration pages, Korea K-ETA, Taiwan BOCA and European Commission |
| Other passports | User-confirmed free text plus signed-in official-source analysis; no borrowed Korean/Japanese static conclusion | Safe fallback until an official pair-specific source is registered |

## Time-sensitive notes

- The current K-ETA temporary exemption is stated through 31 December 2026 and remains subject to the expiry audit.
- EES is operating. ETIAS is scheduled for Q4 2026, so the UI says to recheck before departure rather than claiming it is already required.
- Vietnam's Korean-passport 45-day exemption remains connected to the existing March 2028 expiry guard.

## Official sources added for passport pairs

- Japan MOFA short-stay visa exemption list: <https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html>
- Japan MOFA guidance for Japanese travellers to Korea: <https://www.anzen.mofa.go.jp/m/mbimmigration_003.html>
- Korea K-ETA exemption extension: <https://k-eta.go.kr/portal/board/viewboarddetail.do?bbsSn=299706&esntlPnotiMtYn=Y>
- Taiwan BOCA visa-exempt entry rules: <https://www.boca.gov.tw/fp-149-4486-7785a-1.html>
- Japan MOFA ESTA notice: <https://www.anzen.mofa.go.jp/c_info/ESTA.html>
- European Commission EES and ETIAS status: <https://home-affairs.ec.europa.eu/news/main-differences-between-ees-and-etias-what-travellers-need-know-2026-04-28_en>

This is editorial travel guidance, not legal advice. Entry permission is decided by the competent border authority.
