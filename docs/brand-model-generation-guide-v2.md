# Wakation Brand Model Generation Guide v2

## 입력 규칙

1. 공식 v2.2 A–J identity anchor를 내부 참조로 사용한다.
2. source reference와 contact sheet는 결과 파일에 포함하거나 공개 경로로 복사하지 않는다.
3. 기존 공개 자산은 구도·색상 맥락 참고만 하고 얼굴을 섞지 않는다.
4. 생성 전 route, CTA copy area, viewport, 계절, 기후, 행동, 필요한 소품을 확정한다.

## 기본 프롬프트 구조

```text
NEW photorealistic editorial travel photograph for Wakation.
Adult WAK-MODEL-{ID}; preserve identity from the official v2.2 anchor.
Route and action: {route}, {specific travel/work action}.
Season and climate: {season}, {climateMood}.
Wardrobe: breathable, modest, practical {wardrobeFamily}; list fabrics and items.
Composition: {desktop/mobile aspect}; {copy-safe area}; full head and required props visible.
Camera: natural 35mm editorial photography, restrained depth of field and color.
Realism: skin texture, asymmetry, flyaway hair, correct hands, fabric weave, optical imperfection.
No text, logos, real venue claims, proof implication or direct gaze unless the story requires it.
```

## 공통 negative prompt

```text
no text, logo, watermark, fake brand, extra person, duplicate limb, extra finger,
fused hand, distorted device, plastic skin, glossy beauty ad, doll face, anime,
illustration, pastel drawing, CGI, excessive smoothing, oversaturation,
winter clothing in summer, body-focused pose, identifiable hotel or participant proof
```

## 구도 기준

- Desktop hero: 카피 안전영역 40% 이상, 모델은 반대쪽 35–40%, 머리 6% 이상 여백.
- Mobile hero: 단순 desktop crop 금지. 머리 8% 이상, 얼굴·양손·행동 소품을 보존한다.
- Editorial card: 얼굴을 중앙에 크게 두기보다 장소와 행동을 함께 보여준다.
- 주요 소품은 실제 동작을 설명해야 한다. 장식용 빈 종이·불필요한 노트북 반복을 피한다.
- 손·발·머리·가방·기기를 프레임 경계에서 자르지 않는다.

## 실사 QA 22항목

1. 얼굴 정체성 일치
2. 성인 연령 인상
3. 피부 질감
4. 좌우 비대칭의 자연스러움
5. 눈동자와 시선
6. 치아와 입술
7. 머리카락 결
8. 손가락 수와 관절
9. 팔·어깨 연결
10. 신체 비율
11. 옷 주름과 원단
12. 계절 적합성
13. 기후 적합성
14. 신발과 이동성
15. 가방·기기 구조
16. 행동의 개연성
17. 공간 원근
18. 그림자 방향
19. 렌즈·심도 일관성
20. 가짜 글자·로고 부재
21. 머리와 핵심 소품 crop 안전성
22. 실제 고객·장소·상품 증거로 오인되지 않음

한 항목이라도 중대한 결함이면 `rejectedReason`을 기록하고 공개하지 않는다.

### 전신 비율 승인 게이트 — 2026-09-02

- 전신 모델은 기본적으로 실제 피팅 모델에 가까운 약 8등신의 시각적 균형을 목표로 한다. 정수리부터 턱까지의 머리 높이를 기준으로 전체 실루엣이 약 7.5~8배로 읽혀야 한다.
- 웅크린 포즈, 광각 왜곡, 높은 카메라, 낮은 허리선 또는 과도하게 긴 상의 때문에 다리가 짧아 보이면 해부 구조가 정상이어도 승인하지 않는다.
- 전신과 신발이 보이지 않거나 원근 때문에 비율을 판정할 수 없는 결과는 Hero용 전신 자산으로 승인하지 않는다.
- 1차 생성기가 정체성·손·전신 비율을 함께 유지하지 못하면 동일 결과를 반복 보정하지 않고 Higgsfield Soul 2.0 identity-preserving 생성으로 전환한다.
- 운영자 육안 검토가 자동 감사보다 우선한다. 거부된 파일은 `public/`, active manifest, rotation registry에 남기지 않는다.

## 2026-08-10 Home A v3 프롬프트 요약

- Desktop: 늦여름 해안 작업 공간에서 노트북을 닫고 캔버스 가방을 드는 장면, 오른쪽 모델·왼쪽 카피 여백, 35mm 자연광.
- Mobile: 동일 정체성과 상황을 세로로 재구성, 머리와 양손·노트북·가방·하체를 보존, 왼쪽 카피 여백 확보.
- 공통 금지: 로고·글자·실제 숙소 단정·겨울옷·광고형 피부·왜곡된 손과 기기.

## 출력

- 공개: 최적화한 WebP/AVIF만 `public/media/brand-models/`에 둔다.
- 원본 PNG와 앵커는 저장소에 커밋하지 않는다.
- manifest에 `season`, `climateMood`, `wardrobeFamily`, `wardrobeTags`, `hairDirection`, `activityMood`, `destinationMood`, `realismLevel`, `generationProvider`, `auditDisposition`을 기록한다.
# Scene-first diversity gate (2026-08-11)

Identity consistency does not permit repeated art direction. Before generating a model image, select all four fields below from `BRAND_MODEL_VISUAL_DIRECTIONS` and compare them with the adjacent major surface:

1. silhouette family — dress, skirt, shorts, layered set and trousers must rotate;
2. pose family — walking, sitting, crouching, reaching, making and group interaction must rotate;
3. camera family — overhead, low angle, side view, rear view, layered wide and environmental framing must rotate;
4. color story — every route gets a deliberate palette rather than another neutral linen scene.

Laptop, notebook, paper and maps are task props only. They may appear when the page actually explains planning or learning, but they must not be used as a generic sign for “workation.” A prompt is rejected when it repeats three of the following from the adjacent major surface: pose, silhouette, camera, primary action or color story.

Every six new major model surfaces must contain at least four pose families, four silhouette families, four color stories and three camera families. Dresses and skirts are part of the normal roster mix, alongside shorts and trousers; no single silhouette family may exceed 40% of active placements.

Run `npm run audit:model-diversity` before Preview. The active placement record is `src/lib/media/modelVisualDirection.json`.
