# Verified local destination media migration

Date: 2026-08-02  
Branch: `feat/verified-local-media-migration-v1`

## Outcome

- Migrated every Unsplash reference in `src/lib/affiliate/destinations.ts` to a local, optimized WebP.
- Reused ten established destination editorial assets for Tokyo, Osaka, Fukuoka, Da Nang, Bali, Chiang Mai, Cebu, Busan, Sydney, and Seoul.
- Downloaded and visually reviewed 34 licensed photographs for the remaining destination, activity, eSIM, and learning cards.
- Reduced full-site remote media references from 175 to 128 without changing affiliate URLs or tracking parameters.
- Added a source manifest with original image URLs, license, verification date, dimensions, bytes, and SHA-256 identity.

## Corrected mismatches

Three destination cards were replaced before migration because the previous images were not specific enough for the named city.

| Destination | Previous visual | Replacement | Source verification |
| --- | --- | --- | --- |
| Melbourne | Generic office interior | Melbourne skyline and Yarra River | Harsil Patel, Swan Street Bridge, Unsplash License |
| Shanghai | Generic office towers | Shanghai skyline viewed from the Bund | Bide Cui, Shanghai, Unsplash License |
| Kobe | Generic neon street | Kobe Port Tower and Harborland waterfront | PJH, Kobe Harborland, Unsplash License |

The source pages, photographer names, and locations for these replacements are stored in `src/lib/media/verifiedRemoteSources.json`.

## Verification

- Contact-sheet review: 34/34 passed for intended card context.
- Asset integrity: WebP only, minimum width 1,000px, maximum 800KB each.
- Total migrated payload: 6,646,976 bytes.
- Manifest and asset directory have an exact one-to-one file count.
- Missing referenced images: 0.
- Destination catalog remote Unsplash references: 0.
- Desktop 1440×900: hotel and activity destination grids passed without horizontal overflow.
- Mobile 390×844: KO and JA hotel grids passed with no migrated-image failures or horizontal overflow.
- Activity and eSIM destination cards loaded the local optimized variants successfully.
- Browser console errors and warnings on the final checked route: 0.

Run:

```bash
npm run audit:verified-media
npm run audit:verified-media:contact-sheet
npm run audit:motion-visual
```

## Deliberately excluded from automatic migration

`src/lib/i18n/data.ts`, `src/lib/affiliate/featured.ts`, and `src/lib/affiliate/items.ts` remain outside this batch. Their current stock images are reused across unrelated contexts, and several cards describe real products or accommodations. Automatically localizing those files would preserve or formalize misleading matches.

Examples found during review include a Taj Mahal image under a Japan-related context, a tropical island image under Yeosu, an alpine mountain image under Jeju, and a tropical resort image under a Gyeonggi workation context. These should be corrected card-by-card with either verified location photography or clearly disclosed editorial imagery.

Recommended follow-up branch: `feat/program-product-media-truth-v1`.
