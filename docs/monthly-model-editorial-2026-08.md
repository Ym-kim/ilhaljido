# Monthly model editorial — 2026-08

## Outcome

- Route: `/about`
- Models: WAK-MODEL-E, WAK-MODEL-H, WAK-MODEL-J
- Output: three 4:5 editorial WebP images and one 15-second silent vertical MP4
- Generation mode: Codex built-in `imagegen`; original v2.2 identity anchors were used as private generation references only
- Video: Remotion 4.0.506, H.264, 1080×1920, 30 fps, 450 frames
- Disclosure: generated editorial imagery; not real customers, participants, venues or programs

## Asset map

| Asset | Role | Public use |
| --- | --- | --- |
| `monthly-2026-08-model-e-city-arrival-v2.webp` | summer city arrival | `/about` still + video source |
| `monthly-2026-08-model-h-coastal-reset-v1.webp` | coastal reset | `/about` still + video source |
| `monthly-2026-08-model-j-blue-hour-v2.webp` | summer after-work movement | `/about` still + video source |
| `monthly-model-edit-2026-08-v2.mp4` | season-corrected monthly motion edit | lazy-loaded `/about` film |

## Seasonal QA

| Scene | Intended season and place | Wardrobe and light | Result |
| --- | --- | --- | --- |
| WAK-MODEL-E city arrival | August, warm humid East Asian coastal city | Breathable short-sleeve ivory knit, lightweight navy trousers, bright late-summer afternoon | Pass — replaces the warm long-sleeve v1 styling |
| WAK-MODEL-H coastal reset | August, coastal café | Lightweight sage overshirt, ivory tee, open coastal daylight | Pass — original v1 remains seasonally credible |
| WAK-MODEL-J blue hour | August, humid East Asian riverside city | Sleeveless tailored shell, lightweight trousers, optional overshirt carried rather than worn | Pass — replaces the heavy coat and turtleneck in v1 |

## Final image prompts

### WAK-MODEL-E — summer city arrival v2

> Use case: identity-preserve. Asset type: Wakation August monthly editorial website still, vertical 4:5. Input image: edit target and identity/composition reference. Primary request: Keep the fictional adult woman's face, hair, age, expression, suitcase, itinerary, pose, body position, ferry-terminal architecture, crop and premium candid travel-magazine realism. Update the scene so it unmistakably feels like a warm, humid East Asian coastal-city afternoon in August. Wardrobe edit only: replace the ribbed long-sleeve knit with a refined breathable ivory short-sleeve summer knit top with sleeves ending above the elbow; keep elegant navy lightweight wide-leg trousers and clean white travel sneakers. Fabrics should have realistic summer drape and ventilation. Lighting/mood: bright late-summer golden daylight with open-air warmth, soft sea haze, clean skin texture, confident arrival energy. Body proportions: natural adult high-fashion fitting-model proportions, approximately 7.5–8 heads tall, balanced shoulders and hips, naturally long limbs, realistic hand and joint anatomy, correct lens perspective. Do not imitate any named celebrity or real person beyond preserving the fictional input identity. Do not lengthen legs unnaturally, shrink the head, narrow the waist excessively, or create an underweight appearance. Constraints: no readable text, logos, venue marks, glamour pose, sexualized styling, malformed anatomy, duplicated luggage, fake landmark, or real-customer/program implication. Preserve all other composition and identity invariants.

### WAK-MODEL-H — coastal reset

> Preserve the fictional adult WAK-MODEL-H identity from the supplied v2.2 identity anchor while creating a new environmental travel-work scene, not a beauty portrait. Show an unnamed sunlit coastal café terrace with timber, linen curtain and a distant soft sea horizon. The adult traveller closes an unbranded laptop and packs a blank notebook into a canvas tote before a walk. Vertical 4:5 waist-up three-quarter view, subject lower-right, quiet daylight above-left, natural visible hands. Premium candid travel editorial with realistic texture, sage overshirt and high-neck ivory tee. No readable text, logos, venue marks, other prominent people, glamour pose, malformed anatomy, duplicated devices or real guest/Hosted-program implication.

### WAK-MODEL-J — summer blue hour v2

> Use case: identity-preserve. Asset type: Wakation August monthly editorial website still, vertical 4:5. Input image: edit target and identity/composition reference. Primary request: Keep the fictional adult woman's face, hair, age, thoughtful expression, analog-watch gesture, tote with closed laptop, bridge setting, crop and premium candid urban travel realism. Update the wardrobe and atmosphere to a warm, humid East Asian August blue hour after work. Wardrobe edit only: replace the heavy black coat and turtleneck with a lightweight sleeveless charcoal tailored shell with a modest high neckline and fluid ink-navy high-waisted wide-leg summer trousers; add only a very light unstructured overshirt folded over the tote if needed, not worn. Exposed arms should look natural and practical, not posed or sexualized. Lighting/mood: luminous late-summer blue hour, warm city reflections and slight humid glow, brighter face separation, purposeful evening walk. Body proportions: natural adult fashion fitting-model proportions, approximately 7.5–8 heads tall, balanced torso and limbs, realistic hands, shoulders and camera perspective. Do not imitate any named celebrity. Do not stretch legs, shrink the head, exaggerate thinness or alter the fictional identity. Constraints: no readable text, logos, exact city or landmark, glamour pose, sexualized styling, malformed anatomy, duplicated watch/device, real participant or program implication. Preserve all other scene and identity invariants.

## Motion direction

The Remotion composition uses slow scale and vertical camera movement only. It does not synthesize lip movement, body movement, testimonials or a false on-location recording. Public video copy uses scene themes rather than internal model IDs, and the final slate reads `Wakation / STAY · WORK · GROW`.
