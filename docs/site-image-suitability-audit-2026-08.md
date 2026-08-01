# Wakation site image suitability audit

Date: 2026-08-01

## Local asset inventory

| Decision | Count | Meaning |
| --- | ---: | --- |
| `KEEP` | 17 | Functional brand/interface or registered destination asset |
| `KEEP_DERIVATIVE` | 32 | Dedicated social/share derivative, not a standard card image |
| `KEEP_SOURCE_RECORD` | 36 | Active editorial or product asset; preserve its source record |
| `KEEP_VERIFIED` | 4 | Previously verified photographic stay/city asset |
| `KEEP_WITH_DISCLOSURE` | 63 | Generated editorial image that must not imply a real product, venue or participant |
| `ARCHIVE_REVIEW` | 36 | No exact active source reference; remove only after rollback review |

All 188 local images have dimensions, byte size, SHA-256 identity and a deterministic decision in `docs/audits/full-site-image-suitability-2026-08.csv`.

Checks found:

- no byte-identical local image groups;
- no missing exact local references;
- no customer route with a broken image on Production;
- no image element missing an `alt` attribute;
- local total 24.45 MB, with the largest asset below 800 KB;
- one 192×192 application icon advisory, valid for its intended role.

## Suitability rules

- Destination and guide imagery must match the named place and retain its focal point.
- Named hotels, rooms, vehicles and affiliate experiences require owned, licensed or partner-authorized photography.
- Generated models remain editorial illustrations and never represent customers, reviewers, hosts or a real cohort.
- Real reports, testimonials and Hosted proof require consented documentary photography.
- Social and OG exports must not be loaded as normal card thumbnails.
- An inactive pastel or superseded cover is archived, not resurfaced simply because it exists in `public/`.

## External image sources

The audit found 175 Unsplash source occurrences, 122 distinct URLs, in 18 source files. Production loaded them successfully at audit time, but the local sandbox cannot fetch them through the Next image optimizer. The complete list is in `docs/audits/full-site-remote-image-sources-2026-08.csv`.

These sources are marked `MIGRATE_TO_VERIFIED_LOCAL_ASSET`, not blindly downloaded. A migration must record the source/license, verify the pictured place or generic editorial role, optimize to WebP/AVIF, register focal point and KO/EN/JA alt text, then compare mobile crops. Priority order:

1. `src/lib/i18n/data.ts` — 61 occurrences.
2. `src/lib/affiliate/destinations.ts` — 47 occurrences.
3. `src/lib/affiliate/featured.ts` — 21 occurrences.
4. `src/lib/affiliate/items.ts` — 15 occurrences.
5. Remaining 14 files — 31 occurrences.

## Image-generation decision

No new image was generated. The eight motion-priority groups already use suitable local photographic or disclosed editorial assets, and the audit found no blank or mismatched priority image that justified synthetic replacement. The correct next action is source-verified localization of active remote photographs, not additional AI imagery.
