# Late-summer model wardrobe audit — 2026-08-10

## Scope and decision rule

- Reviewed every still image registered in `EDITORIAL_MODEL_PLACEMENTS` against the current August/late-summer season.
- Judged clothing together with location, time of day and activity. Thin linen layers, rolled sleeves and light overshirts remain acceptable for sun protection, air-conditioned interiors and cooler coastal evenings.
- Rejected heavy blazers, dense outerwear and winter-weight styling where the scene reads as hot or humid.
- Generated people remain illustrative brand models. They are never presented as real customers, participants, hotels, tours or program evidence.

## Result

- 27 active still-image files reviewed.
- 8 distinct scenes required wardrobe correction.
- 11 responsive production files replaced with new versioned WebP assets.
- 19 files retained because their lightweight styling already matched the scene.

| Placement | Models | Wardrobe correction | Active asset |
| --- | --- | --- | --- |
| Seoul editorial | J | Heavy outer layer replaced by a white short-sleeve blouse and light scarf | `domestic-seoul-model-j-city-noir-v3` |
| Busan waterfront | H | Dark blazer replaced by a sky-blue short-sleeve linen blouse | `domestic-busan-model-h-haeundae-v4` |
| Trip Match | D | Layered jacket styling replaced by a slate-blue short-sleeve knit top | `trip-match-model-d-itinerary-choice-v3` |
| Hosted planning | H, I | Navy blazer removed; light linen and pale-blue short sleeves retained | `hosted-models-h-i-coastal-planning-v3` and mobile v3 |
| Select travel prep | I | Brown blazer replaced by an ivory cap-sleeve knit top | `select-model-i-travel-prep-v3` |
| Growth learning | B | Black blazer removed; pale-blue cap-sleeve blouse used | `growth-model-b-urban-learning-desktop-v2` and mobile v2 |
| Japan short-stay campaign | F | Tan blazer replaced by a rolled-sleeve beige linen blouse | `campaign-model-f-japan-choice-desktop-v2` and mobile v2 |
| August monthly editorial | G | Grey blazer replaced by a sage short-sleeve shirt over an ivory shell | `monthly-2026-08-model-g-coastal-book-cafe-v2` |

## Retained styling

The home seasonal film/posters, Jeju, Fukuoka, Itoshima, Seoul K-pop, Learn, Programs, Business team and the remaining August monthly editorial scenes were retained. Their sleeveless tops, short sleeves, breathable linen, rolled overshirts or light coastal layers are credible late-summer wardrobe for the depicted activity.

## Final image-edit prompt set

Every edit used the existing production asset as the identity and composition reference, with these shared constraints:

> Preserve the fictional adult model identity, face, hairstyle, body proportions, pose, hands, props, camera, background, lighting and composition. Change wardrobe only to polished Korean/Japanese late-summer travel styling suitable for August heat. Use breathable linen, cotton or fine knit; no heavy blazer, coat, sweater, winter layer, logos or text. Keep safe negative space and all itinerary, map, notebook, laptop or luggage props. Photorealistic editorial travel photography; generated illustrative brand image, not documentary proof.

Scene-specific direction:

1. Seoul: white short-sleeve blouse, charcoal trousers, optional light scarf; elegant city-gallery evening.
2. Busan: sky-blue short-sleeve linen blouse and ivory trousers; humid waterfront walk.
3. Trip Match: slate-blue short-sleeve fine-knit top and charcoal trousers; departure-lounge planning.
4. Hosted: ivory rolled-sleeve linen shirt plus pale-blue short-sleeve linen blouse; collaborative coastal planning.
5. Select: ivory cap-sleeve knit top and navy trousers; refined intercity travel preparation.
6. Growth: pale-blue cap-sleeve blouse and charcoal trousers; focused city-café learning.
7. Japan campaign: breathable beige linen blouse with sleeves rolled to the elbow; warm evening map reading.
8. Monthly G: sage short-sleeve overshirt over an ivory shell with dark straight trousers; coastal book-café departure.

## Provenance

- Generation/editing tool: OpenAI built-in image generation and image editing.
- Source type: user-controlled generated Wakation brand-model production assets.
- Created and verified: 2026-08-10.
- Public manifest: `src/lib/media/assets.ts`.
- Rotation registry: `src/lib/media/modelRotation.ts`.
