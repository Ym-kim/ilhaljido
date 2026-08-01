# Card media photoreal audit v1

Date: 2026-08-01  
Branch: `feat/photoreal-card-media-refresh-v1`

## Decision standard

- Replace pastel illustrations, abstract device graphics and low-salience icon scenes with photographic editorial scenes.
- Keep verified destination, accommodation and activity photography unchanged.
- Never present generated imagery as an exact hotel, tour, provider vehicle, program venue, participant or cruise vessel.
- Mark every generated card asset as `illustrative: true` and surface a localized editorial-image disclosure.
- Deliver all replacements as 1200×900 WebP with a fixed 4:3 crop.

## Replaced assets

| Area | Retired reference | New asset | Scene brief |
| --- | --- | --- | --- |
| Support | `support-namhae-ai.jpeg` | `support-namhae-photo-v2.webp` | Namhae-inspired terraced coast and bay |
| Support | `support-hamyang-ai.jpeg` | `support-hamyang-photo-v2.webp` | Misty Hamyang mountain village |
| Support | `support-tongyeong-ai.jpeg` | `support-tongyeong-photo-v2.webp` | Tongyeong-inspired island harbor |
| Support | `support-gimhae-ai.jpeg` | `support-gimhae-photo-v2.webp` | Gimhae-inspired riverside cycle path and fields |
| Support | `support-yeongdeok-ai.jpeg` | `support-yeongdeok-photo-v2.webp` | Yeongdeok-inspired east-coast fishing village |
| Support | `support-gangjin-ai.jpeg` | `support-gangjin-photo-v2.webp` | Gangjin-inspired rice fields and traditional rooflines |
| Support | `support-cheongju-ai.jpeg` | `support-cheongju-photo-v2.webp` | Forest-edge work-retreat atmosphere near Cheongju |
| Connectivity | `esim-japan-ai.jpeg` | `esim-japan-photo-v2.webp` | Smartphone, travel map and café table for Japan travel |
| Connectivity | `esim-asia-ai.jpeg` | `esim-asia-photo-v2.webp` | Smartphone and travel essentials in an airport lounge |
| Connectivity | `wifi-klook-japan-ai.jpeg` | `wifi-japan-photo-v2.webp` | Generic pocket Wi-Fi on an intercity train table |
| Connectivity | `wifi-klook-taiwan-ai.jpeg` | `wifi-taiwan-photo-v2.webp` | Generic pocket Wi-Fi overlooking a rainy Taiwanese street |
| Connectivity | `wifi-klook-thailand-ai.jpeg` | `wifi-thailand-photo-v2.webp` | Generic pocket Wi-Fi and laptop in a tropical café |
| Transport | `carhire-tripcom-ai.jpeg` | `carhire-editorial-photo-v2.webp` | Unbranded rental car at a coastal overlook |
| Transport | `transfer-klook-ai.jpeg` | `airport-transfer-editorial-photo-v2.webp` | Traveler approaching an unbranded airport-transfer van |
| Transport | `taxi-booking-ai.jpeg` | `airport-taxi-editorial-photo-v2.webp` | Unbranded sedan at an airport pickup lane |
| Transport | `lounge-klook-ai.jpeg` | `airport-lounge-editorial-photo-v2.webp` | Generic premium airport lounge overlooking a runway |
| Learning | `course-midjourney-ai.jpeg` | `course-midjourney-photo-v2.webp` | Designer building an abstract visual moodboard |
| Learning | `course-smartstore-ai.jpeg` | `course-smartstore-photo-v2.webp` | Small seller photographing and packing an unbranded product |
| Learning | `course-claude-ai.jpeg` | `course-claude-photo-v2.webp` | Developer planning an unlabeled automation workflow |
| Learning | `course-notion-ai.jpeg` | `course-notion-photo-v2.webp` | Remote worker organizing a project with blank grid UI |
| Learning | `course-excel-ai.jpeg` | `course-excel-photo-v2.webp` | Analyst reviewing an unlabeled spreadsheet-like grid |
| Learning | `course-python-ai.jpeg` | `course-python-photo-v2.webp` | Beginner learning code with unreadable abstract screen content |
| Cruise | `cruise-msc-world-europa-ai.jpeg` | `cruise-caribbean-editorial-photo-v2.webp` | Generic unbranded cruise ship in a Caribbean harbor |
| Cruise | `cruise-costa-serena-ai.jpeg` | `cruise-transatlantic-editorial-photo-v2.webp` | Generic long-voyage cruise departure at sunset |

## Image-generation prompt system

Built-in OpenAI image generation was used once per distinct asset. Each prompt combined the scene brief above with these controls:

> Photorealistic natural-light editorial travel photography, 4:3 landscape, refined travel-magazine color grading, realistic materials and proportions, no text, logos, watermark, illustration, pastel drawing or 3D render. Do not depict or imply an exact product, provider, program venue, official participant scene or named vessel. Product screens and documents contain no readable information. Generic editorial scene only.

People shown in learning and transfer scenes were directed as East Asian working-age travelers or professionals in natural, non-promotional postures. Generated people do not represent real Wakation participants, customers, instructors or partner staff.

## Rights and disclosure

- Source type: generated.
- License record: Wakation-owned generated editorial asset.
- Customer disclosure: `편집 이미지` / `Editorial image` / `編集イメージ`; support imagery uses the more explicit regional variant.
- Media metadata: `src/lib/media/cardMedia.ts`.
- Automated checks: `npm run audit:card-media`.

The retired files remain in the repository for safe rollback but are no longer referenced by application source code.
