# Brand model rotation and attribution

- 기준일: 2026-08-08
- 생성 방식: Codex built-in ImageGen, photorealistic editorial generation
- 입력 정책: 사용자 제공 v2.2 identity anchor는 정체성 참조에만 사용하고 공개 저장소에 복사하지 않는다.
- 운영 코드: `src/lib/media/modelRotation.ts`, `src/lib/media/editorialTracking.ts`

## 결정

모델은 매 렌더마다 무작위로 바꾸지 않는다. 사용자가 같은 페이지에서 일관된 브랜드 장면을 보고, 분석 이벤트가 실제 자산과 CTA를 정확히 연결할 수 있도록 route·section별 고정 배치를 사용한다. 다음 자산 제작 시에는 레지스트리의 노출 횟수를 계산해 해당 맥락에 적합하면서 가장 덜 노출된 모델을 우선한다.

현재 공개 편집 장면은 승인된 모델 로스터를 순환 사용하며, 2026-08-11부터 한 모델의 정체성 노출 상한을 50%로 운영한다. 상품·숙소·후기·참가자 증명 영역은 계속 제외하고, 인접한 주요 카드에서는 같은 모델을 반복하지 않는다.

`visual_asset_view`와 `visual_asset_cta_click`은 자산 ID, 모바일 자산 ID, 모델 ID, route, section, locale, CTA 목적지를 기록한다. 개인정보는 전송하지 않는다.

## 신규 배치

| 모델 | Route | 역할 | Desktop | Mobile |
| --- | --- | --- | --- | --- |
| B / Soft Urban | `/growth` | 도시에서 이어가는 성장·학습 | `growth-model-b-urban-learning-desktop-v1` | `growth-model-b-urban-learning-mobile-v1` |
| C / Quiet Premium | `/business` | 기업·팀 워케이션 기획 문의 | `business-model-c-team-planning-desktop-v1` | `business-model-c-team-planning-mobile-v1` |
| F / Warm Modern | `/campaign/japan-short-stay` | 일본 단기체류 선택 | `campaign-model-f-japan-choice-desktop-v1` | `campaign-model-f-japan-choice-mobile-v1` |

## 최종 생성 프롬프트

### Model B — Growth desktop

> Photorealistic-natural Wakation `/growth` desktop editorial hero, 3:2 landscape. Use the supplied WAK-MODEL-B anchor only to preserve the identity of one clearly adult East Asian woman in her late twenties; create a new environment-led scene and do not copy the beauty portrait pose or background. She is in an upper-floor city café and learning lounge, organizing a travel map, notebook and practical growth plan beside a closed unbranded laptop. Natural three-quarter view, subject on the right 43%, left 48% dark, calm and uncluttered for white copy. Charcoal blazer, high-neck soft-blue knit, understated styling. Premium travel-magazine realism, true skin texture, restrained color, subtle film grain. Fictional editorial model only—not a real learner, camper, customer, class, venue or program. No readable text, logos, signage, UI, glamour pose, cleavage, extra people, malformed hands or duplicated objects.

### Model B — Growth mobile

> Preserve the same fictional WAK-MODEL-B identity from the anchor and approved desktop frame. Rebuild the urban café learning scene as a 960×1280 portrait editorial photograph, not a crop. Keep the upper-left 38% dark and quiet for copy; place the adult woman, notebook, map and closed unbranded laptop in the lower-right. Maintain charcoal and soft-blue styling, natural hands, true skin texture and subtle film grain. Not a real learner, camper, customer, venue or program. No text, logos, signage, glamour pose, malformed anatomy or duplicated objects.

### Model C — Business desktop

> Photorealistic-natural Wakation `/business` editorial hero, 3:2 landscape. Use the WAK-MODEL-C anchor only for the identity of one clearly adult East Asian woman in her early thirties. Create a new premium city lounge scene where she reviews a completely blank matte-cream planning folio beside a closed unbranded laptop. Subject on the right 43%, left 48% deep ink blue and uncluttered for headline copy. Taupe blazer, high-neck cream knit, composed practical styling, warm wood and restrained hotel-lounge light. Environmental premium travel editorial rather than corporate stock or beauty advertising. Fictional editorial model only—not a real client, employee, consultant, cohort, company, venue or program. No readable text, diagrams, logos, marks, UI, glamour pose, cleavage, extra people, malformed hands or duplicated objects.

The first generation contained synthetic map-like marks on the folio and was rejected. A precise object edit replaced the sheet with a completely blank matte-cream folio while preserving the approved identity, pose, lighting and copy-safe composition.

### Model C — Business mobile

> Preserve WAK-MODEL-C from the anchor and corrected approved desktop frame. Rebuild the lounge scene as a 960×1280 portrait editorial photograph, not a crop. Keep the upper-left 38% deep ink blue and quiet for copy; place the adult woman and blank matte-cream folio in the lower-right with the closed unbranded laptop. Maintain taupe and cream wardrobe, premium restrained lighting, natural hands and true skin texture. Not a real client, employee, consultant, cohort, company, venue or program. No text, diagrams, logos, marks, glamour pose, malformed anatomy or duplicated objects.

### Model F — Japan campaign desktop

> Photorealistic-natural Wakation `/campaign/japan-short-stay` editorial hero, 3:2 landscape. Use the WAK-MODEL-F anchor only to preserve one clearly adult East Asian woman in her late twenties. Create an unnamed Japan-inspired riverside terrace at blue hour; no identifiable landmark or actual tour location. She is checking an unlabeled paper map as part of choosing a short stay, with a notebook and unbranded phone. Subject on the right 42%, left 50% darker city and river atmosphere for white copy. Camel jacket, high-neck cream knit, warm brown hair, understated travel styling. Premium travel-magazine realism with natural skin and restrained film grain. Fictional editorial model only—not a real tourist, customer, influencer, guide, tour or local. No readable text, logos, exact city marks, glamour pose, cleavage, extra people, malformed hands or duplicated objects.

### Model F — Japan campaign mobile

> Preserve the same fictional WAK-MODEL-F identity from the anchor and approved desktop frame. Rebuild the unnamed Japan-inspired blue-hour riverside scene as a 960×1280 portrait editorial photograph, not a crop. Keep the upper and central-left area dark, open and copy-safe; place the adult woman, unlabeled map and notebook in the lower-right. Maintain camel and cream wardrobe, warm lantern light, natural hands, true skin texture and restrained film grain. Not a real tourist, customer, influencer, guide, tour, city or landmark. No readable text, logos, signage, glamour pose, malformed anatomy or duplicated objects.

## 출판 QA

- 6개 결과물을 WebP로 최적화하고 desktop 1536×1024, mobile 960×1280으로 고정했다.
- 문구 여백, 모바일 별도 구도, 손·문서·지도·기기, 로고·워터마크·읽을 수 있는 텍스트 부재를 원본 크기로 확인했다.
- 모든 자산에 KO·EN·JA alt, `illustrative: true`, model ID, route·section, focal point, 생성일·검증일, 사용 제한을 등록했다.
- UI에는 현지화된 `편집 이미지 / Editorial image / 編集イメージ` 배지를 표시한다.
