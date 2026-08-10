# Tokyo teamLab editorial — verification and media record

기준일: 2026-08-10

## 구현 범위

- 공개 경로: `/experiences/teamlab-planets-tokyo-evening`
- 정적 로케일: `/en/experiences/teamlab-planets-tokyo-evening`, `/ja/experiences/teamlab-planets-tokyo-evening`
- 연결 위치: `/select/activity`, `/guide/tokyo`, `/collections/tokyo-allinone`
- 주 제휴 상품: `act-klook-teamlab-tokyo`
- 제휴 링크: Klook 공식 redirect 형식과 `aid=126848` 유지

## 검증한 사실

| 항목 | 반영 값 | 출처 | 확인일 |
| --- | --- | --- | --- |
| 위치 | 도쿄 도요스 | teamLab Planets 공식 가이드 | 2026-08-10 |
| 접근 | 신토요스역 도보 약 1분 | teamLab Planets 공식 가이드 | 2026-08-10 |
| 관람 준비 | 맨발 관람, 성인 무릎 높이까지 젖을 수 있는 구역 | teamLab Planets 공식 이용 안내 | 2026-08-10 |
| 보관 | 무료 사물함 23 × 34 × 37cm, 대형 짐 별도 보관소 없음 | teamLab Planets 공식 이용 안내 | 2026-08-10 |
| 권장 소요 | 1–3시간 | Klook 상품 페이지 | 2026-08-10 |
| 후기 지표 | 4.7 / 20,941건 | Klook 상품 페이지 | 2026-08-06 |
| 입장권 기준가 | JPY 3,600~ | teamLab Planets 공식 티켓 안내 | 2026-08-10 |

출처:

- https://teamlabplanets.dmm.com/en/guide
- https://teamlabplanets.dmm.com/en/group/ticket
- https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/

운영시간, 판매 시간대, 휴관일, 취소·환불 가능 여부는 변경 가능성이 있어 고정 보장하지 않는다. 사용자가 선택한 Klook 패키지 화면에서 최종 확인하도록 안내한다.

## 미디어 출처와 사용 제한

- 파일: `public/media/brand-models/experience-tokyo-model-d-immersive-gallery-v1.webp`
- 규격: 1536 × 1024 WebP, 67,712 bytes
- 생성 방식: OpenAI 내장 ImageGen, identity-preserve 모드
- 모델 ID: `WAK-MODEL-D`
- 계절: 여름 / 늦여름
- 용도: 도쿄 몰입형 미디어아트 저녁 일정의 일반적인 편집 장면
- 제한: 실제 teamLab 작품, 실제 전시장, 실제 관람객, Klook 상품 사진이 아님
- 코드 표시: `sourceType: generated`, `illustrative: true`

## 최종 생성 프롬프트

```text
Use case: identity-preserve
Asset type: wide editorial website hero for a Tokyo immersive-art evening guide
Primary request: create a new photorealistic editorial travel scene using the same fictional adult East Asian woman from the reference, now visiting a contemporary immersive digital-art gallery in Tokyo after work. This is a general editorial atmosphere and must not reproduce any identifiable teamLab artwork, venue room, logo, installation, or copyrighted composition.
Input image: reference image is identity and face reference only; do not preserve its station setting, pose, clothes, laptop, suitcase, or table.
Scene/backdrop: sophisticated dark gallery with large abstract fields of indigo, cyan and warm amber light, subtle reflected light on a polished floor, spacious and believable museum architecture; no recognizable landmark.
Subject: same fictional woman, late twenties to early thirties, shown in a natural three-quarter full-body candid pose walking slowly and looking toward the light installation. Summer-appropriate refined outfit: muted slate-blue short-sleeve blouse, high-waisted charcoal wide-leg trousers, comfortable low-profile shoes, small crossbody bag. Elegant realistic proportions, natural anatomy.
Style/medium: premium East Asian travel-magazine photography, photorealistic, real skin texture, realistic fabric, restrained color grading, subtle film grain.
Composition/framing: 3:2 wide landscape. Place the woman in the right third with head, hands, bag and full lower-body context visible. Preserve generous dark negative space across the left 45% for white headline copy. Keep the subject safely inside a centered mobile crop; do not crop head, hands or legs.
Lighting/mood: quiet blue-hour interior, luminous but not oversaturated, reflective and inspiring rather than nightclub-like.
Constraints: no text, no logo, no watermark, no readable signage, no branded art, no exact teamLab room, no other prominent people, no beauty-ad close-up, no winter clothing, no blazer, no coat, no knitwear, no exposed midriff, no distorted hands, no duplicated limbs.
```

참조 이미지는 `public/media/brand-models/trip-match-model-d-itinerary-choice-v3.webp`이며 얼굴 정체성에만 사용했다.
