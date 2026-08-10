# Fukuoka Guide Lookbook — 2026-08

## 목적

후쿠오카 가이드의 실제 지역 Hero, 도시에서 일하는 장면, 퇴근 후 골목, 이토시마 근교 체험이 한 이미지 역할로 섞이지 않도록 분리한다. 새 섹션은 예약을 가장하는 판매 화면이 아니라 짧은 체류의 하루 리듬을 설명하는 편집 콘텐츠다.

## 적용 경로

- `/guide/fukuoka`
- `/en/guide/fukuoka`
- `/ja/guide/fukuoka`

## 신규 자산

### `fukuoka-model-h-cafe-work-v1`

- 공개 파일: `public/media/brand-models/fukuoka-model-h-cafe-work-v1.webp`
- 최적화 보조 파일: `public/media/brand-models/fukuoka-model-h-cafe-work-v1.avif`
- 제작 방식: OpenAI built-in ImageGen, 공식 WAK-MODEL-H v2.2 identity anchor 참조
- 계절·복장: 늦여름, 세이지 반소매 리넨 블라우스와 아이보리 와이드 팬츠
- 보존 대상: 머리 여백, 얼굴, 양손, 노트북, 종이 일정
- 제한: 실제 후쿠오카 카페·숙소·프로그램 또는 참가자 사진으로 표시하지 않는다.

최종 프롬프트 요약:

> 공식 H 모델이 늦여름 일본 도심 카페에서 노트북 옆 종이 일정을 확인하는 자연스러운 35mm 편집 사진. 화면 오른쪽에 인물을 두고 머리·양손·노트북·일정을 모두 보존하며, 특정 장소·브랜드·고객 증거는 만들지 않는다.

### `fukuoka-after-work-riverside-v1`

- 공개 파일: `public/media/destinations/fukuoka-after-work-riverside-v1.webp`
- 최적화 보조 파일: `public/media/destinations/fukuoka-after-work-riverside-v1.avif`
- 제작 방식: OpenAI built-in ImageGen, 장소 중심 신규 생성
- 계절: 늦여름 블루아워
- 제한: 특정 후쿠오카 포장마차·식당·영업 상태 또는 실제 장소 사진으로 표시하지 않는다.

최종 프롬프트 요약:

> 후쿠오카를 연상시키되 특정 장소를 복제하지 않는 강변 산책로와 작은 음식점의 늦여름 블루아워. 장소가 주인공이며 인물은 식별되지 않는 원거리 실루엣만 허용한다.

## UI 원칙

- 모바일에서는 3:2 카드가 한 열로 쌓이며 텍스트가 이미지 위를 가리지 않는다.
- 데스크톱에서는 두 장면을 같은 높이로 배치한다.
- `unoptimized` WebP를 직접 제공해 과도한 재압축으로 인한 흐림을 막는다.
- 생성 사실과 제한은 media manifest에 기록하되 고객 화면에 불필요한 `편집 이미지` 라벨을 반복하지 않는다.
- 근교 이토시마 장면은 기존 체험 Editorial 섹션에서 계속 담당하여 같은 사진을 lookbook에 중복 배치하지 않는다.
