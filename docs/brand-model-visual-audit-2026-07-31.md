# Wakation Brand Model Visual Audit

Date: 2026-07-31  
Branch: `feat/brand-model-visual-system-v1`  
Base: `origin/main@a70bd38`

## Decision

The supplied pack is an identity and mood reference library, not a production image library. None of the eight supplied PNG files is published directly. Six new editorial derivatives were produced with action, place and negative space taking priority over appearance. Every derivative is registered as `sourceType: generated`, `illustrative: true` and is forbidden from representing a real participant, stay, venue, product or program.

## Supplied asset audit

| Asset | Dimensions | Decision | Reason |
| --- | ---: | --- | --- |
| `model_a_close_portrait` | 1086×1448 | REFERENCE_ONLY | Close beauty portrait; face dominates and lacks travel action or safe copy space. |
| `model_b_fullbody_summer_city` | 1024×1536 | DO_NOT_PUBLISH | Body-led fashion pose, synthetic background lettering and insufficient workation context. |
| `model_c_fullbody_light_travel` | 1024×1536 | REFERENCE_ONLY | Full-body fashion framing and background lettering; identity/wardrobe reference only. |
| `model_d_fullbody_cafe_city` | 1024×1536 | REFERENCE_ONLY | Body-led fashion framing; identity reference only. |
| `model_a_lifestyle_reference_grid_01` | 1254×1254 | REFERENCE_ONLY | Multi-scene collage and visible third-party laptop mark. |
| `model_a_lifestyle_reference_grid_02` | 1254×1254 | REFERENCE_ONLY | Multi-scene collage and visible third-party laptop mark. |
| `model_e_lifestyle_reference_grid` | 1254×1254 | REFERENCE_ONLY | Multi-scene identity sheet; cannot be a customer-facing photograph. |
| `model_f_lifestyle_reference_grid` | 1254×1254 | REFERENCE_ONLY | Multi-scene collage and visible third-party laptop mark. |

Checks covered eyes, teeth, ears, hands, clothing continuity, body proportions, synthetic text, logos, venue ambiguity, editorial fit, focal point and likely mobile crop. Reference sheets remain outside `public/`.

## Brand model roles

| Model | Role | Production policy |
| --- | --- | --- |
| WAK-MODEL-A | Calm café work, island stays and coastal transitions | Generated derivatives only |
| WAK-MODEL-B | Bright summer city movement reference | Reference only until a safer action-led derivative is approved |
| WAK-MODEL-C | Domestic coast, light weekends and candid walks | Generated derivatives only |
| WAK-MODEL-D | Urban workation, gallery/café and Trip Match departure scenes | Generated derivatives only |

No model is assigned a real name or represented as staff, a customer, a reviewer or a program participant.

## Route and media audit

| Area | Before | Decision | Result |
| --- | --- | --- | --- |
| Home Hero | One legacy generated sea-window image reused elsewhere | REPLACE_WITH_MODEL | Separate desktop/mobile WAK-MODEL-A scenes; left copy safe area and independent focal points |
| Domestic onboarding: Seoul | Trip Set image reused | REPLACE_WITH_MODEL | WAK-MODEL-D note-taking scene |
| Domestic onboarding: Busan | Trip Set image reused | REPLACE_WITH_MODEL | WAK-MODEL-C coastal transition scene |
| Domestic onboarding: Jeju | Destination landscape reused | REPLACE_WITH_MODEL | WAK-MODEL-A slow-stay scene |
| Domestic onboarding: Fukuoka | Relevant existing Trip Set image | KEEP | Existing locale-appropriate editorial image retained |
| Trip Match intro | Home image reused and empty alt | REPLACE_WITH_MODEL | WAK-MODEL-D departure scene with localized alt |
| Trip Match results | Destination and Trip Set images match the result | KEEP | Place imagery remains the proof of destination fit |
| Hosted Hero | One-person legacy generated editorial image | SAFE_PLACEHOLDER | Explicit editorial alt and restriction; no fabricated group composite |
| Hosted proof/report | Real evidence is required | REAL_PHOTO_REQUIRED | Generated models remain prohibited |
| Hotels, activities and experience details | Product facts must be proven | REAL_PHOTO_REQUIRED | Keep owned/licensed/partner product imagery |
| Social/OG | Existing asset-specific system | KEEP / GENERATE_NEW | Do not add unverified model images without a dedicated safe-area export |

## Production assets added

| Asset ID | Model | Size | Bytes | Placement |
| --- | --- | ---: | ---: | --- |
| `home-hero-model-a-coastal-work-desktop-v1` | A | 1536×1024 | 93,774 | Home desktop hero |
| `home-hero-model-a-coastal-work-mobile-v1` | A | 960×1280 | 70,492 | Home mobile hero |
| `domestic-seoul-model-d-urban-work-v1` | D | 1200×900 | 73,930 | Seoul onboarding card |
| `domestic-busan-model-c-coastal-transition-v1` | C | 1200×900 | 102,242 | Busan onboarding card |
| `domestic-jeju-model-a-slow-stay-v1` | A | 1200×900 | 81,640 | Jeju onboarding card |
| `trip-match-model-d-city-departure-v1` | D | 1536×1024 | 81,604 | Trip Match intro |

All files are WebP, metadata-stripped, below 500 KB and stored in `public/media/brand-models/`. The two Home assets use art direction rather than relying on one compromise crop. The legacy Hosted hero is registered separately with an explicit restriction because its original generation lineage is incomplete.

## Visual analytics

- Home emits `visual_asset_view` with asset, model, route, section, locale and placement.
- Existing Home CTA events now include the hero asset and model IDs.
- Domestic card events include the selected asset and model IDs.
- Trip Match start includes the intro asset and model IDs.
- Hosted landing view includes the legacy hero asset ID.
- No biometric data, face recognition or personal data is collected.

## Next asset production specifications

These ten assets are the next approved-size batch. They are specifications only and are not exposed to Production.

### 1. `hosted-interest-small-group-v1`

- Route/section: `/hosted`, interest Hero
- Models: two or three distinct brand-model derivatives; never cloned faces
- Scene/action/emotion: generic bright coworking lounge, quietly planning together, focused and warm
- Wardrobe/time/camera: modest neutral layers, late morning, environmental wide shot
- Ratio/resolution: desktop 16:10 at 1920×1200; mobile 3:4 at 1080×1440
- Focal/safe area: group on right 55%; left and lower-left clear for copy
- Source: generated editorial; not a real cohort, venue or confirmed program
- Alt KO/EN/JA: “함께 체류 일정을 살펴보는 소규모 여행자 그룹” / “A small group reviewing a stay plan together” / “滞在プランを一緒に確認する少人数の旅行者”

### 2. `home-hero-place-detail-coastal-reset-v1`

- Route/section: `/`, alternative Home Hero
- Model: none; place/detail-led
- Scene/action/emotion: notebook, closed unbranded laptop and coffee by an open coastal window; calm transition
- Wardrobe/time/camera: no visible person, soft morning, wide environmental still life
- Ratio/resolution: 16:10 1920×1200 and 3:4 1080×1440
- Focal/safe area: objects right; left 45% copy-safe
- Source: generated editorial; not a real café/hotel
- Alt KO/EN/JA: “바다를 바라보는 창가에 놓인 노트와 닫힌 노트북” / “A notebook and closed laptop by a coastal window” / “海を望む窓辺に置かれたノートと閉じたパソコン”

### 3. `domestic-yangyang-place-coastal-work-v1`

- Route/section: future Yangyang onboarding card only after a valid route is confirmed
- Model: C, distant/secondary
- Scene/action/emotion: seaside path, short laptop task at a public table, then walking; light restart
- Wardrobe/time/camera: windbreaker and trousers, early afternoon, place-led medium wide
- Ratio/resolution: 4:3 1600×1200
- Focal/safe area: person lower-right; top-left badge-safe
- Source: generated editorial; not an actual Yangyang cohort or venue
- Alt KO/EN/JA: “동해안을 연상시키는 공간에서 짧은 업무 후 산책을 준비하는 여행자” / “A traveler preparing for a walk after a short work session by an east-coast setting” / “東海岸をイメージした場所で短い仕事の後に散歩へ向かう旅行者”

### 4. `trip-match-model-c-sea-recovery-v1`

- Route/section: `/trip-match`, recovery result visual
- Model: C
- Scene/action/emotion: laptop fully packed away, quiet shoreline walk, relieved rather than posed
- Wardrobe/time/camera: light blue overshirt, golden hour, wide rear three-quarter view
- Ratio/resolution: 3:2 1800×1200
- Focal/safe area: person right third; left reason copy-safe
- Source: generated editorial; no named beach
- Alt KO/EN/JA: “업무를 마치고 조용한 해안 산책을 시작하는 여행자” / “A traveler beginning a quiet coastal walk after work” / “仕事を終えて静かな海辺を歩き始める旅行者”

### 5. `trip-match-model-a-cafe-focus-v1`

- Route/section: `/trip-match`, café-focus result visual
- Model: A
- Scene/action/emotion: 60-minute focused work session with timer and paper notes; composed
- Wardrobe/time/camera: white shirt, indirect daylight, over-shoulder environmental shot
- Ratio/resolution: 3:2 1800×1200
- Focal/safe area: model center-right; upper-left clear
- Source: generated editorial; unbranded devices, no named café
- Alt KO/EN/JA: “밝은 카페 공간에서 짧게 집중해 일하는 여행자” / “A traveler focusing on a short work session in a bright café setting” / “明るいカフェ空間で短時間集中して仕事をする旅行者”

### 6. `trip-match-friends-small-city-place-v1`

- Route/section: `/trip-match`, friends/small-city result
- Models: two distinct adults, faces secondary
- Scene/action/emotion: reading a local map and choosing a side street; curious and relaxed
- Wardrobe/time/camera: practical travel layers, late afternoon, wide street scene
- Ratio/resolution: 3:2 1800×1200
- Focal/safe area: pair lower-right; left title-safe
- Source: generated editorial; no fake landmark or readable map text
- Alt KO/EN/JA: “소도시 골목에서 다음 동선을 함께 고르는 두 여행자” / “Two travelers choosing their next route on a small-city street” / “小さな街の路地で次のルートを一緒に選ぶ二人の旅行者”

### 7. `hosted-real-cohort-documentary-v1`

- Route/section: `/hosted` proof section
- Model: none; real participants only with consent
- Scene/action/emotion: a real small-group session and an unposed break
- Wardrobe/time/camera: documentary, existing light, no staged uniforms
- Ratio/resolution: 3:2 minimum 3000×2000
- Focal/safe area: allow 10% edge crop; no copy over faces
- Source: owned real photo, release and date required; AI generation prohibited
- Alt KO/EN/JA: must identify only the verified program, date and activity

### 8. `yangyang-real-proof-sequence-v1`

- Route/section: `/report/yangyang`, evidence gallery
- Model: none; real event only
- Scene/action/emotion: location, work session, shared meal and closing moment
- Wardrobe/time/camera: documentary sequence, natural light
- Ratio/resolution: 4:3 minimum 2400×1800, four photographs
- Focal/safe area: documentary crop; captions below, never overlaid
- Source: owned/consented real photos; AI generation prohibited
- Alt KO/EN/JA: verified descriptive captions without participant names unless separately consented

### 9. `social-home-model-a-feed-v1`

- Route/section: Social Kit, Home campaign feed
- Model: A
- Scene/action/emotion: derivative of coastal work transition, candid and quiet
- Wardrobe/time/camera: light-blue shirt, morning, environmental medium wide
- Ratio/resolution: 4:5 1080×1350
- Focal/safe area: face inside central 60%; top/bottom 12% free of critical detail
- Source: generated editorial; not a real participant or hotel
- Alt KO/EN/JA: localized social description matching the campaign, not the model’s identity

### 10. `home-hero-coastal-transition-loop-v1`

- Route/section: `/`, optional Hero video after asset delivery
- Model: A
- Shot list: hands close unbranded laptop; look out the window; lift light bag; one step away from table
- Emotion/wardrobe/time/camera: calm anticipation, light-blue shirt, morning, locked-off wide shot
- Ratio/resolution/duration: 16:9 1280×720, 6–8 seconds, WebM plus MP4, muted/playsInline
- Focal/safe area: model right 40%; left copy-safe; first frame matches poster
- Source: generated/editorial video; no real venue claim, no face morphing
- Accessibility/performance: static poster on mobile and `prefers-reduced-motion`; target under 1.8 MB

## Real-photo requirements

- Hosted cohort, Yangyang report, testimonials, participant outcomes and community scale.
- Named hotel rooms, named cafés, transport vehicles, guides and specific affiliate activities.
- Any image used beside ratings, review counts, participant names or documentary claims.

## Video decision

No video file was supplied, so no empty player or artificial image animation was added. The shot list above is ready for a later opt-in implementation with poster fallback, muted autoplay, `playsInline` and reduced-motion handling.

## Approval boundary

This branch is Preview-only. It must not be merged to `main`, tagged as stable or deployed to Production until the model derivatives, next production list, merge and deployment are each approved.
