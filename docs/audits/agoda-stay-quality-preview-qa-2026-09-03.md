# Agoda Stay Quality Preview QA — 2026-09-03

Preview: `https://ilhaljido-git-feat-agoda-live-stay-p-6ff8a6-clark-kims-projects.vercel.app/select/hotel/pilot`

Test window: 2026-09-16 to 2026-09-18, two adults, no children, KO currency mapping.

| Destination | Candidate | Display | Avg guest rating | Min displayed | Avg review count | Provider image URLs | Placeholders | API latency |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Fukuoka | 30 | 12 | 8.8 | 8.6 | 11,574.3 | 12 | 0 | 568 ms |
| Osaka | 30 | 12 | 8.9 | 8.7 | 9,429.3 | 11 | 1 | 748 ms |
| Tokyo | 30 | 12 | 8.8 | 8.6 | 12,278.3 | 12 | 0 | 795 ms |
| Seoul | 30 | 12 | 8.8 | 8.5 | 7,589.7 | 12 | 0 | 556 ms |
| Busan | 30 | 12 | 8.9 | 8.6 | 7,290.8 | 12 | 0 | 462 ms |
| Jeju | 30 | 12 | 8.8 | 8.5 | 10,395.0 | 12 | 0 | 501 ms |

Average API latency: **605 ms**. All six destinations: **AGODA_READY**.

## Browser checks

- KO 320 px, EN 375 px, JA 390 px and KO 430 px: 12 cards, one column, no horizontal overflow.
- 1440 px: four cards per row, 12 cards in a complete 4 × 3 grid.
- Default sort is Recommended / 추천순 / おすすめ順; guest-rating sort is descending.
- Review counts render only from the provider field.
- Osaka's one missing provider image uses the neutral placeholder. A Fukuoka image that failed during one JA render also switched to the same placeholder without a broken-image icon.
- No console, hydration or horizontal-overflow error was observed in the checked viewports.
- The selected Agoda URL preserved CID `1968994`, hotel ID, check-in, check-out, adults, children and room count before redirect. The Agoda destination retained CID, dates, adults, children count and room count.
- Constrained inventory returned Booking.com fallback with `aid=7854081`, dates and guest counts preserved; `rel="sponsored noopener noreferrer"` remained intact.
- Client-facing modules contain no Agoda API credential or Authorization value.

The pilot remains Preview-only and is not the site-wide primary provider.
