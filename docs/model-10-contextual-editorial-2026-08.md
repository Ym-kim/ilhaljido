# Model 10 contextual editorial audit

- Audit date: 2026-08-08
- Source archive: `모델10.zip`
- Roster release: v2.3
- Production identity: `WAK-MODEL-K` / Creative Navigator
- Policy: source files are reference-only. No archive original is copied into `public/`.

## Decision

Model K is a fictional, clearly adult 29-year-old editorial identity used to connect learning, trip planning, and longer-stay program discovery. The canonical reference is `Gemini_Generated_Image_7a6e8x7a6e8x7a6e.png`; it is not a production asset and `directPublish` remains `false`.

The first production placements are deliberately limited to `/learn` and `/programs`. Growth uses the separate Model B identity; testimonials, Hosted proof, actual accommodation or activity products, staff profiles, and participant stories remain place-led or use verified photography. This prevents Model K from becoming a default face or being mistaken for a customer, participant, instructor, staff member, venue, or product.

## Source archive audit

| File | Dimensions | Decision | Reason |
| --- | ---: | --- | --- |
| `ChatGPT_Image_2026년_8월_5일_오후_04_11_00_(1).png` | 1122×1402 | Reference only | Beauty/fashion portrait; weak workation context |
| `ChatGPT_Image_2026년_8월_5일_오후_04_11_00_(2).png` | 1122×1402 | Reference only | Beauty/fashion portrait; not suitable as a travel proof image |
| `ChatGPT_Image_2026년_8월_5일_오후_04_11_00_(3).png` | 1122×1402 | Reference only | Close portrait and styling-first composition |
| `ChatGPT_Image_2026년_8월_5일_오후_04_11_00_(4).png` | 1122×1402 | Reference only | Close portrait and limited contextual crop flexibility |
| `ChatGPT_Image_2026년_8월_5일_오후_04_11_00_(5).png` | 1122×1402 | Reference only | Fashion-led image; no verified place or program context |
| `Gemini_Generated_Image_6dgpus6dgpus6dgp.png` | 1760×2420 | Do not use | Collage-like identity and composition ambiguity |
| `Gemini_Generated_Image_7a6e8x7a6e8x7a6e.png` | 1824×2360 | Canonical reference only | Most consistent adult identity and work-travel cues; still not publishable directly |
| `hf_20260804_142145_1e07b1f3-abf8-49ff-8b78-bd84300e3397.png` | 2048×1152 | Reference only | Different identity; professional portrait without a verified context |
| `hf_20260804_173555_7e8a165d-b145-4927-b1d6-e69a02005d01.png` | 1536×2048 | Do not publish | Selfie-like framing and identity inconsistency |
| `hf_20260804_173731_e262a296-3ca4-40af-afe1-58b7f3404e45.png` | 1536×2048 | Do not publish | Café portrait that could be mistaken for a real customer |
| `hf_20260804_181824_54aa6899-e95c-4b41-a210-937bcefff987.png` | 1536×2048 | Reference only | Different identity and portrait-first hierarchy |
| `KakaoTalk_20260624_232427019.jpg` | 1528×1490 | Hold for rights review | Potential real-person source; consent and usage rights are not recorded |
| `KakaoTalk_20260624_232427019_01.png` | 1254×1254 | Hold for rights review | Potential real-person source and near-duplicate; never feed into generation without verified consent |

## Production assets

| Asset | Route | Art direction | Size |
| --- | --- | --- | ---: |
| `learn-model-k-creative-focus-desktop-v1.webp` | `/learn` | Desktop, subject right, left copy-safe | 1536×1024 |
| `learn-model-k-creative-focus-mobile-v1.webp` | `/learn` | Mobile portrait, upper-left copy-safe | 960×1280 |
| `programs-model-k-stay-planning-desktop-v1.webp` | `/programs` | Desktop, subject right, deep-teal copy-safe | 1440×900 |
| `programs-model-k-stay-planning-mobile-v1.webp` | `/programs` | Mobile portrait, upper-left copy-safe | 960×1280 |

All production files are optimized WebP derivatives, registered in the media manifest, localized in KO/EN/JA, labelled as editorial images in UI, and measured through the existing `visual_asset_view` event.

## Final generation prompts

Generation mode: built-in ImageGen, photorealistic editorial generation with the canonical source passed only as an identity reference.

### Learn desktop

> Use case: photorealistic-natural. Asset type: Wakation `/learn` desktop editorial hero, 3:2 landscape. Create a completely new environment-led editorial photograph using the supplied image only as the identity reference for one clearly adult 29-year-old East Asian woman. Preserve her warm chestnut-brown long hair, calm almond-shaped eyes, and composed approachable identity, but do not copy the source pose or background. Scene: a quiet contemporary design library and coworking lounge in an unnamed East Asian city, large window, subtle shelves, travel notebook, a few printed photos, and an unbranded laptop with a blank dark screen. She is organizing notes from a trip into a practical learning plan. One adult woman, seated at a shared table, natural three-quarter side view, hands clearly visible and anatomically correct, focused on the notebook rather than posing. Photorealistic editorial travel photography, true skin texture, understated grading, subtle film grain, premium travel magazine rather than beauty advertising. Environmental medium-wide 1536×1024 frame; subject and table on the right 45%, left 45% calm, darker and uncluttered for white copy. Soft late-afternoon light; ink navy, warm oak, stone and muted sky blue. Modest navy overshirt, high-neck ivory top and stone trousers. Fictional generated adult brand model, not a real student, customer, participant, teacher, venue, course or testimonial. No readable text, logos, brand marks, UI screens, watermarks, synthetic signage, glamour pose, cleavage, beauty close-up, exaggerated proportions, extra people, malformed hands or duplicated objects.

### Learn mobile

> Preserve the same fictional Model K identity from the canonical reference and the approved Learn desktop frame. Recompose the design-library and coworking scene as a 960×1280 portrait editorial photograph rather than cropping the desktop image. Keep the upper-left 35% calm and darker for mobile headline copy, place the adult woman and notebook in the lower-right, retain the modest navy and ivory styling, natural hands, unbranded blank-screen laptop, true skin texture and subtle film grain. Do not create a real student, customer, participant, teacher, course or testimonial. No text, logos, signage, beauty pose, cleavage, malformed anatomy or duplicated objects.

### Programs desktop

> Use case: photorealistic-natural. Asset type: Wakation `/programs` desktop editorial hero, 16:10 landscape. Use the supplied image only as the identity reference for the same clearly adult 29-year-old East Asian Model K and create a new environment-led scene. She is calmly planning a one-week work-and-stay program at an unnamed coastal shared workspace: paper map without readable labels, blank calendar sheet, compact weekender bag and closed unbranded laptop. Natural seated three-quarter view with anatomically correct visible hands; no camera pose. Premium travel-magazine realism, true skin texture, restrained film grain. Place subject and planning table on the right 48%; leave the left 42% deep teal, uncluttered and copy-safe. Soft morning window light, sea-blue, deep teal, sand and warm wood palette. Modest soft-blue overshirt over a high-neck neutral top. Fictional editorial brand model only—not a real program, participant, cohort, staff member, venue or testimonial. No readable text, logos, interface, program badge, false signage, glamour styling, cleavage, extra people, malformed hands or duplicated props.

### Programs mobile

> Preserve the same fictional Model K identity from the canonical reference and approved Programs desktop frame. Rebuild the unnamed coastal shared-workspace scene as a 960×1280 portrait photograph with the upper-left 35% deep teal and quiet for headline copy. Place the woman, paper map, blank calendar, compact weekender and closed unbranded laptop in the lower-right. Maintain soft morning light, modest soft-blue and neutral wardrobe, natural hands and premium travel-editorial realism. It must not imply a real Wakation program, participant, cohort, staff member, venue or testimonial. No readable text, logos, badges, glamour pose, cleavage, malformed anatomy or duplicated objects.

## Placement and disclosure rules

- Use the mobile derivative below the desktop breakpoint; do not rely on destructive center cropping.
- Use localized descriptive alt text that describes the editorial scene without naming an actual venue.
- Keep the visible `편집 이미지 / Editorial image / 編集イメージ` label.
- Do not use Model K on cards that claim proof, review, safety, popularity, availability, product accuracy, or Hosted participation.
- Do not publish or commit the archive originals, contact sheet, or unoptimized generation outputs.
- New placements require the same media-manifest fields: `sourceType`, `illustrative`, `modelIds`, `createdAt`, `verifiedAt`, localized alt, intended routes, restrictions, and focal point.
