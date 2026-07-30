# Media hotlink and destination image audit — 2026-07-30

## Scope and outcome

The repository contained 182 source lines referencing `images.unsplash.com` before this pass. The first remediation slice targets the highest-visibility, reusable destination source of truth rather than blindly downloading every remote image.

- Localized the eight destination images used by `/destinations`.
- Reused the same verified local assets for eight matching city guides.
- Corrected four clear place mismatches: Osaka used a hotel interior, Fukuoka used a hotel room, Chiang Mai used a Bangkok-like skyline, and Cebu used a Bali-like landscape.
- Converted all eight files to 1600 × 1067 WebP with a 500 KB per-file ceiling.
- Recorded KO/EN/JP alt text, source, license, focal point, and provenance in `src/lib/media/assets.ts`.
- Added `npm run audit:media` to catch missing, duplicate, oversized, remote, or unregistered destination assets.

## Source and license register

| Asset | Source | License | Local file | Notes |
| --- | --- | --- | --- | --- |
| Tokyo | `photo-1540959733332-eab4deabeeaf` | Unsplash License | `/media/destinations/tokyo-editorial-v1.webp` | Existing verified Tokyo street image, localized |
| Osaka | [Nomadic Julien](https://unsplash.com/photos/uBfK5i6j1B8) | Unsplash License | `/media/destinations/osaka-editorial-v1.webp` | Shinsekai and Tsutenkaku; replaces unrelated hotel image |
| Fukuoka | [Aibolat Askhar](https://unsplash.com/photos/OxkZ2A9KoT0) | Unsplash License | `/media/destinations/fukuoka-editorial-v1.webp` | Fukuoka lakeside city scene; replaces unrelated room image |
| Bali | `photo-1537996194471-e657df975ab4` | Unsplash License | `/media/destinations/bali-editorial-v1.webp` | Existing verified Balinese temple image, localized |
| Da Nang | `photo-1559592413-7cec4d0cae2b` | Unsplash License | `/media/destinations/danang-editorial-v1.webp` | Existing verified Golden Bridge image, localized |
| Chiang Mai | [Peter Borter](https://unsplash.com/photos/F07KhNovxRk) | Unsplash License | `/media/destinations/chiangmai-editorial-v1.webp` | Chiang Mai temple; replaces Bangkok-like city image |
| Cebu | [Zany Jadraque](https://unsplash.com/photos/ply-6rPZKSA) | Unsplash License | `/media/destinations/cebu-editorial-v1.webp` | Cebu City skyline; replaces Bali-like landscape |
| Sydney | `photo-1506973035872-a4ec16b8e8d9` | Unsplash License | `/media/destinations/sydney-editorial-v1.webp` | Existing verified Sydney Harbour image, localized |

## Editorial versus product imagery

These files are licensed destination/editorial photographs and are not marked as generated or illustrative. No generated image is presented as an actual hotel, room, tour, participant, venue, or partner product.

Affiliate product imagery is deliberately excluded from bulk replacement. A generic generated image must not be substituted for a real hotel or tour. Those remaining images require partner-page matching and per-item verification before localization.

## Browser QA

Actual Chromium rendering was checked after the replacement.

- `/destinations`, 1440 × 1400: eight local destination images loaded, zero broken images, zero remote Unsplash images.
- `/ja/destinations`, 390 × 844: `innerWidth` 390, `scrollWidth` 390, zero broken images, Japanese heading wrapped naturally.
- `/guide/osaka`, 1440 × 900: local Osaka hero rendered with Tsutenkaku as the focal subject.
- `/guide/cebu`, 390 × 844: local Cebu skyline hero rendered without horizontal overflow.

One unrelated remote affiliate hotel thumbnail did not load inside the network-restricted local sandbox. It was not replaced because product imagery must first be matched to the live partner listing; this does not affect the new destination assets.

## Residual hotlinks and next slices

Residual remote images are classified for later work:

1. Affiliate products and hotels: verify against the live partner listing before any replacement.
2. Korean destination guides (Jeju, Seoul, Busan): source actual place photography and add the same manifest fields.
3. Generic editorial pages and programs: localize verified existing photographs or generate only clearly illustrative, non-documentary imagery.
4. Long-tail topic cards: remove duplicate sources and consolidate by a defined editorial/product/story variant.

The current branch intentionally avoids a high-risk bulk rewrite that would make image provenance harder to review.
