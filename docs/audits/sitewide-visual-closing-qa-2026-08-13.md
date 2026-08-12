# Sitewide visual closing QA — 2026-08-13

## Scope

- Baseline: `origin/main` production merge `81822f0`
- Branch: `feat/sitewide-visual-closing-qa-v1`
- Mobile viewport: 390×844
- Desktop viewport: 1440×900
- Mobile routes rendered: 32
- Desktop routes rendered: 14
- Local public image assets audited: 372

## Runtime findings

- Broken rendered images: 0
- Horizontal page overflow: 0
- Missing primary headings: 0
- KO/EN/JA document-language mismatch: 0
- Priority model-hero crop failures: 0
- Customer-facing remote image hotlinks: 0

The 13 remote image URLs found by the source audit are source or license references only. Customer-facing images are served from verified local assets.

## Priority visual review

The following routes were visually inspected at their primary viewport as well as checked by DOM metrics:

- Home KO/EN/JA
- Trip Match
- Collections hub and five Trip Set details
- Destinations hub and representative city details
- Guide hub
- Select hub, hotel, activity, eSIM and learning
- Programs hub, domestic, global, support and half-price guide
- Itoshima experience editorial detail
- Moments, Business and About

The current hero framing keeps the subject's head, intended action and key props visible on the reviewed routes. The existing tone, seasonal direction and model rotation were preserved.

## Regression guard added

`audit:motion-visual` now:

1. fails when a `next/image` component uses `fill` without an explicit responsive `sizes` value;
2. separates runtime remote image delivery from source/license provenance URLs;
3. excludes purpose-sized PWA icons from low-resolution editorial-image warnings.

Current result: 71 `fill` image usages, 0 missing `sizes`, 0 runtime remote image references, 0 missing local image references.
