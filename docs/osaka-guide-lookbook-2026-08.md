# Osaka Guide Lookbook — 2026-08

## 목적

오사카 가이드의 실제 지역 Hero, 아침 미식 골목, 퇴근 후 전시와 도시 산책을 서로 다른 이미지 역할로 분리한다. 새 섹션은 특정 매장·전시·프로그램을 보증하지 않고 짧은 체류의 하루 리듬을 설명하는 편집 콘텐츠다.

## 적용 경로

- `/guide/osaka`
- `/en/guide/osaka`
- `/ja/guide/osaka`

## 신규 자산

### `osaka-morning-food-lane-v1`

- 공개 파일: `public/media/destinations/osaka-morning-food-lane-v1.webp`
- 최적화 보조 파일: `public/media/destinations/osaka-morning-food-lane-v1.avif`
- 제작 방식: OpenAI built-in ImageGen, 장소 중심 신규 생성
- 계절: 늦여름 아침
- 제한: 실제 오사카 시장·매장·영업 상태 또는 특정 장소 사진으로 표시하지 않는다.

최종 프롬프트 요약:

> 오사카를 연상시키되 특정 장소를 복제하지 않는 늦여름 아침의 작은 시장 골목. 장소가 주인공이며 매장명·간판·브랜드는 읽을 수 없게 하고, 업무 전 짧은 동네 산책의 현실적인 온도를 담는다.

### `osaka-model-j-after-work-gallery-v1`

- 공개 파일: `public/media/brand-models/osaka-model-j-after-work-gallery-v1.webp`
- 최적화 보조 파일: `public/media/brand-models/osaka-model-j-after-work-gallery-v1.avif`
- 제작 방식: OpenAI built-in ImageGen, 공식 WAK-MODEL-J v2.2 identity anchor 참조
- 계절·복장: 습한 늦여름 블루아워, 아이보리 반소매 블라우스와 차콜 발목 길이 스커트
- 보존 대상: 머리 여백, 얼굴, 양손, 지도, 토트백, 발
- 제한: 실제 오사카 전시장·프로그램·참가자 또는 고객 사진이 아니다.

최종 프롬프트 요약:

> 공식 J 모델이 늦여름 일본 도시의 전시 구역을 나와 글자 없는 지도를 살피며 걷는 자연스러운 35mm 편집 사진. 머리·양손·가방·발을 모두 보존하고, 특정 전시장·브랜드·고객 증거는 만들지 않는다.

## UI 원칙

- 기존 `GuideLookbook`을 재사용해 후쿠오카와 같은 정보 위계를 유지한다.
- 모바일에서는 3:2 카드가 한 열로 쌓이며 텍스트가 이미지 위를 가리지 않는다.
- 데스크톱에서는 장소 중심 아침 장면과 모델 중심 저녁 장면을 같은 높이로 배치한다.
- `unoptimized` WebP를 직접 제공해 과도한 재압축으로 인한 흐림을 막는다.
- 생성 사실과 제한은 media manifest에 기록하되 고객 화면에 `편집 이미지` 라벨을 반복하지 않는다.
