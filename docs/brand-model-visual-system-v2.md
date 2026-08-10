# Wakation Brand Model Visual System v2

기준일: 2026-08-10
공식 입력: `Wakation_Diverse_Model_Roster_v2_2 (1).zip`

## 운영 기준

- 공식 로스터는 v2.2의 A–J 10명뿐이다. H/I/J는 v2.2 교체본만 유효하다.
- 기존 K 자산은 생성 이력 보존용 아카이브이며 active route, rotation, analytics identity로 사용하지 않는다.
- identity anchor와 source reference는 내부 생성 입력이다. `public/`, UI, OG, SNS에 직접 게시하지 않는다.
- 모델 이미지는 실제 고객·참가자·직원·후기 작성자·숙소·상품·프로그램 현장 증거로 사용하지 않는다.
- 한 모델은 active identity exposure의 50%를 넘지 않는다. 같은 viewport와 인접 주요 카드에서 같은 모델을 반복하지 않는다.
- 주요 화면의 50% 이상은 실제 장소·공간·교통·음식·사물 중심 이미지로 유지한다.
- 계절, 기후, 행동, 장소가 먼저이고 모델은 그 장면을 설명하는 보조 요소다.
- 생성 자산은 KO/EN/JA alt, model ID, route/section, focal point, 계절·복장·행동·실사 메타데이터와 제한 문구를 기록한다.

## 공식 로스터

| ID | 코드명 | 우선 역할 | 여름 스타일 방향 |
| --- | --- | --- | --- |
| A | Coastal Calm | Home, 해안 업무, 느린 체류 | 린넨·아이보리·바다색, 출발 준비 |
| B | Soft Urban | 도시 카페, 성장·학습 | 가벼운 블라우스·데님, 노트 정리 |
| C | Quiet Premium | Business, 조용한 라운지 | 얇은 린넨 셋업, 일정 검토 |
| D | Refined Editorial | Trip Match, 전시·도쿄 | 슬리브리스 니트·미디 스커트 |
| E | City Chic | 부산·해안 도시 | 밝은 블라우스·와이드 팬츠 |
| F | Warm Modern | 후쿠오카·오사카 | 롤업 린넨·도시 산책 |
| G | Clean Romantic | 제주·섬 체류 | 가벼운 드레스·세이지·아이보리 |
| H | Soft Daylight | Hosted·초행 여행 | 소프트 블루·친근한 협업 장면 |
| I | Modern Grace | Select·비즈니스 이동 | 아이보리·네이비·정돈된 이동 |
| J | City Noir | 서울·도시 야간 | 모노톤·가벼운 여름 셔츠 |

## 현재 active 배치

| Route | Section | Model | Asset |
| --- | --- | --- | --- |
| `/`, `/en`, `/ja` | Home hero | A | `home-hero-model-a-coastal-departure-*-v3` |
| `/trip-match`, `/ja/trip-match` | Intro | D | `trip-match-model-d-itinerary-choice-v3` |
| `/hosted`, locale routes | Hero | H + I | `hosted-models-h-i-coastal-planning-*-v3` |
| `/select`, locale routes | Editorial | I | `select-model-i-travel-prep-v3` |
| `/learn` | Hero | B | `growth-model-b-urban-learning-*-v2` |
| `/programs`, locale routes | Hero | H + I | `hosted-models-h-i-coastal-planning-*-v3` |
| `/growth` | Hero | B | `growth-model-b-urban-learning-*-v2` |
| `/business` | Hero | C | `business-model-c-team-planning-*-v1` |
| `/campaign/japan-short-stay` | Hero | F | `campaign-model-f-japan-choice-*-v2` |
| `/about` | Monthly editorial | E + G + H + J | monthly August assets |
| Experience editorials | Hero | D / G / I | route-specific editorial assets |

Home의 국내 8개 여행지는 위치 신뢰와 비모델 비율을 위해 실제 또는 라이선스 확인된 장소 이미지를 유지한다. 기존 서울·부산·제주 모델 컷은 active 카드가 아니라 재사용 후보 자산으로 관리한다.

## 2026-08-10 P0 교체

- Home desktop/mobile를 공식 A 기준의 늦여름 출발 장면 v3로 제작했다.
- 왼쪽 카피 안전영역, 머리 위 6–8% 여백, 얼굴·손·노트북·가방·발 보존을 적용했다.
- WebP와 AVIF를 별도로 최적화했다. desktop 1536×960, mobile 1080×1440이다.
- K가 포함된 이전 7초 홈 영상은 v2.2 영상이 준비될 때까지 비활성화했다. LCP는 정적 AVIF poster로 유지한다.
- Learn은 B, Programs는 H+I, Business는 C로 교체해 active K 노출을 제거했다.

## 공개와 검증

- 생성 모드: OpenAI built-in ImageGen.
- 앵커는 내부 참조로만 사용하며 저장소와 공개 경로에 복사하지 않는다.
- 실제 장소를 단정하지 않는 alt와 restriction을 사용한다.
- 자동 검증: `npm run audit:media`, `npm run audit:ui`, `npm run audit:seasonal-home-media`.
- 상세 프롬프트·거절 기준은 `docs/brand-model-generation-guide-v2.md`를 따른다.
- 전체 제작 우선순위는 `docs/brand-model-asset-production-list-v2.md`를 따른다.
