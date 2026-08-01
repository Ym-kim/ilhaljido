# Wakation 디자인 완성도 감사

- 감사일: 2026-08-01
- 기준: 여행 매거진의 장면성 + 커머스의 정보 위계 + Wakation의 정직성
- 확인 viewport: Production 390×844, 구현 후 로컬/Preview 모바일·데스크톱

## 1. 평가 기준

| 기준 | 질문 |
| --- | --- |
| 첫인상 | 5초 안에 페이지 역할과 주 행동이 보이는가 |
| 정보 위계 | Hero → 관점 → 사실 → CTA 순서가 자연스러운가 |
| 이미지 | 장소·주제와 맞고 실제 상품으로 오인되지 않는가 |
| 카드 | 같은 grid의 높이·비율·CTA가 균형적인가 |
| 신뢰 | 출처·확인일·Hosted/외부 구분이 보이는가 |
| 현지화 | KO/EN/JA 줄바꿈과 표현이 자연스러운가 |
| 전환 | 한 화면에 주 CTA가 과도하지 않은가 |

## 2. 감사 결과

| 페이지군 | 기존 등급 | 핵심 진단 | 이번 목표 |
| --- | --- | --- | --- |
| Home·Navigation | A- | 이미 강한 발견 구조. 재설계 시 오히려 과밀 위험 | 유지 |
| Trip Match·Collections | A- | 기능과 에디토리얼 균형이 좋음 | 유지 |
| Destinations·Guide | A- | 도시 정보와 관련 상품 연결이 풍부 | 유지 |
| Select 상품군 | B+ | 카드 체계는 성숙, 이미지 권리·실물 일치 운영 필요 | 무회귀 |
| Support Programs | A | 검색·필터·공식 출처·저장이 명확 | 운영 freshness 유지 |
| Learn | C | 가상 예정 카드, 장식 아이콘, 외부 Hero hotlink | 활성 상품 중심 B+ 이상 |
| About | C | 근거 없는 숫자와 빨강/초록 비교가 신뢰를 깎음 | 브랜드 원칙 중심 A- |
| Stories | C+ | 내용은 있으나 텍스트 목록이라 매거진성이 약함 | 편집 이미지 3개만 사용한 B+ |
| Wishlist | B- | 빈 상태가 상품만 가리키고 저장 범위를 설명하지 못함 | 재방문 행동이 보이는 B+ |
| Visa guide | C | 정확해 보이는 수치가 출처 없이 과도함 | 공식 출처·확인일 중심 B+ |
| Contact | B- | H1 부재, 답변 시간 약속, 채널 명칭 불일치 | 역할 범위가 명확한 B+ |

## 3. 이번 시각 개선

### Learn

- 외부 Unsplash Hero를 로컬 브랜드 이미지로 교체했다.
- 의미 없는 카드별 아이콘을 제거하고 시간·행동·설명만 남겼다.
- ‘준비 중’ 4개 카드를 실제 학습 흐름 3개와 활성 강의 grid로 교체했다.
- 제휴 강의 CTA는 공통 `AffiliateCard`를 재사용해 높이와 고지를 유지한다.

### About

- 숫자 3개와 빨강 취소선 비교를 제거했다.
- 큰 여행 장면 아래에 고객 행동 4단계와 Hosted/외부 상품 두 구조를 배치했다.
- `programs-editorial-coastal-work-v1.webp`를 편집 Hero로 재사용해 신규 이미지 전송량을 만들지 않았다.

### Stories

- 실제로 이미지 근거가 있는 3개 Story만 이미지형으로 올렸다.
- 대표 1개는 큰 Editorial Card, 다음 2개는 16:10 카드, 나머지는 텍스트 목록으로 유지했다.
- 생성·편집 이미지는 화면에 ‘편집 이미지’라고 표시한다.
- 같은 이미지를 여러 Story에 반복하지 않는다.

### Wishlist·Contact·Visa

- 빈 상태에 장식 카드를 늘리지 않고 선이 있는 세 가지 행동 링크를 제공한다.
- Contact는 명확한 H1과 문의 책임 범위를 제공한다.
- Visa 결과에 공식 출처 목록을 별도 카드로 배치하되 `sponsored`로 오인하지 않게 한다.

## 4. 이미지 결정

이번 범위에서는 새 이미지를 생성하지 않았다. 이미 승인된 로컬 자산으로 주제와 품질을 충족했고, 불필요한 생성은 실제 장소·상품 오인 위험과 전송량을 늘리기 때문이다.

| 자산 | 사용 | 분류 |
| --- | --- | --- |
| `/media/brand-models/domestic-seoul-model-d-urban-work-v1.webp` | Learn Hero | 브랜드 편집 이미지 |
| `/campaign/programs-editorial-coastal-work-v1.webp` | About Hero | 브랜드 편집 이미지 |
| `/covers/cruise-caribbean-editorial-photo-v2.webp` | Story 대표 | 편집 이미지, 라벨 표시 |
| `/covers/cruise-transatlantic-editorial-photo-v2.webp` | Story 카드 | 편집 이미지, 라벨 표시 |
| `/covers/cruise-panstar-real-v2.jpeg` | Story 카드 | 기존 실제 선박 자산 |

## 5. 재발 방지

- `npm run audit:content-depth`: 우선 6개 라우트군의 가상 예정 상품, 외부 hotlink, 안전 가이드 연결을 검사한다.
- `npm run audit:ui`: heading, alt, 아이콘 label, 카드·미디어 정적 규칙을 검사한다.
- `npm run audit:media`와 `npm run audit:card-media`: 파일 크기·중복·manifest·카드 이미지 규칙을 계속 사용한다.
- 다크 섹션의 밝은 카드에서는 본문을 `<span>`으로 구성해 전역 `.dark-surface p` 규칙의 영향을 피한다.

