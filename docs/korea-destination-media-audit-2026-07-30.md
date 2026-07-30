# Korea destination media audit — 2026-07-30

## Outcome

The remaining three city guides now use verified local media. `src/lib/guides.ts` no longer contains an Unsplash hotlink.

| Guide | Previous state | Decision | Local asset |
| --- | --- | --- | --- |
| Jeju | Generic tropical sunset beach with no identifiable Jeju context | Replaced with a photo explicitly located in Jeju, showing the island coast and mountain landscape | `/media/destinations/jeju-editorial-v1.webp` |
| Seoul | Actual Korean evening street, served as a remote hotlink | Visually verified and localized without changing the editorial scene | `/media/destinations/seoul-editorial-v1.webp` |
| Busan | Actual Haeundae and Marine City skyline, served as a remote hotlink | Visually verified and localized without changing the editorial scene | `/media/destinations/busan-editorial-v1.webp` |

## Source register

| Asset | Source | License | Output size |
| --- | --- | --- | ---: |
| Jeju | [Lux Park](https://unsplash.com/photos/EQ-QSQp283M) | Unsplash License | 155,244 bytes |
| Seoul | `photo-1517154421773-0529f29ea451` | Unsplash License | 238,362 bytes |
| Busan | `photo-1638591751482-1a7d27fcea15` | Unsplash License | 156,292 bytes |

All three outputs are 1600 × 1067 WebP files. Their KO/EN/JP alt text and focal points are registered in `src/lib/media/assets.ts` and consumed by the shared Guide hero.

No generated image was needed because suitable actual place photography was available. No hotel, activity, participant, review, or partner-product image was generated or altered.
