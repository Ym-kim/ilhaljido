# Wakation Brand Model Visual System v2

기준일: 2026-08-08
공식 입력: `Wakation_Diverse_Model_Roster_v2_2.zip`, `모델10.zip`

2026-08-10 추가 규칙: 정체성 유지와 별개로 패션·헤어·활동·계절을 분화한다. 코드 기준은 `BRAND_MODEL_STYLING_RULES`, 제작·승인 기준은 `docs/model-styling-and-seasonality-rules.md`다.

## 운영 원칙

- v2.3의 A–K만 공식 모델 ID로 사용한다. 이전 H/I/J는 폐기하며 생성 참조와 공개 자산 모두에서 사용하지 않는다.
- identity anchor와 source reference는 생성 입력 전용이다. `public/`에 복사하거나 UI·OG·SNS에 직접 노출하지 않는다.
- 모델 이미지는 실제 참가자, 고객, 직원, 후기 작성자, 호텔 투숙객 또는 체험 이용자로 표현하지 않는다.
- 한 모델은 전체 모델 이미지 배치의 25%를 초과하지 않는다. 같은 모델을 한 viewport나 인접한 주요 카드에 반복하지 않는다.
- 사이트 전체 이미지의 절반 이상은 장소·공간·교통·음식·상품 중심으로 유지한다.
- 얼굴보다 행동과 장소를 먼저 설계한다. 모델은 여행·업무·이동·휴식·연결의 맥락을 설명할 때만 사용한다.
- 동일 모델이라도 같은 흰 상의·긴 생머리·정면 포즈를 반복하지 않는다. 8월에는 통기성 소재, 걷기·대화·이동 동작, 자연광 또는 실제 실내광을 우선한다.
- 신규 생성 모델 자산은 `climateMood`, `wardrobeTags`, `activityTags`, `travelContext`, `realismTarget`, `realismMethod`, `photorealReferenceUsed`를 manifest에 기록한다.

## v2.3 공식 로스터

| ID | 코드명 | 주 역할 | 시각 구분 | 우선 행동·장면 |
| --- | --- | --- | --- | --- |
| A | Coastal Calm | Home, 해안 업무, 차분한 체류 | 담백하고 안정적인 인상 | 노트북 정리, 창밖 보기, 해안 산책 |
| B | Soft Urban | 서울, 카페 업무, 소셜 발견 | 부드러운 도시 감성 | 메모, 이동 준비, 낮 카페 |
| C | Quiet Premium | 라운지, 프리미엄 체류 | 차분하고 정돈된 인상 | 라운지 업무, 체크인 전 대기 |
| D | Refined Editorial | Trip Match, 전시, 저녁 도시 | 사색적인 에디토리얼 | 일정 선택, 출발 준비, 전시 관람 |
| E | City Chic | 부산, 짧은 도시 여행 | 선명한 도시 패션 | 해안 이동, 주말 가방, 산책 |
| F | Warm Modern | 후쿠오카·오사카, 캠페인 | 따뜻한 갈색 헤어 | 카페, 시장, 낮의 도시 이동 |
| G | Clean Romantic | 제주, 느린 체류 | 가볍고 맑은 인상 | 기록, 돌담 산책, 바람 쐬기 |
| H | Soft Daylight | 로컬 카페, 입문 여행 | 둥근 얼굴, 커튼 뱅, 친근한 미소 | 대화, 일정 정리, 낮 카페 |
| I | Modern Grace | 비즈니스 여행, 장기 체류 | 성숙한 타원형 얼굴, 밤색 웨이브 | 협업, 라운지, 전시·출장 |
| J | City Noir | 서울·도시 야간, 전시 | 하트형 얼굴, 매끈한 검은 머리 | 퇴근 후 이동, 전시, 저녁 산책 |
| K | Creative Navigator | 학습, 성장, 체류 일정 설계 | 성인 29세, 밤색 긴 머리, 차분하고 실용적인 인상 | 여행 노트 정리, 학습 계획, 체류 일정 설계 |

H·I·J는 v2.2에서 교체된 정체성이고 K는 2026-08-08에 추가된 reference-only 정체성이다. 저장소의 공개 자산과 생성 프롬프트는 위 설명만 사용하며, 폐기된 정체성의 이미지·이름·경로와 `모델10.zip` 원본을 UI에서 참조하지 않는다.

## v2 첫 배치표

이 표는 이미지 생성보다 먼저 확정한 배치 기준이다.

| Route | Section | Model | 행동 | 장면 | 색·의상 | 출력 | 목적 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/`, `/en`, `/ja` | Home Hero | A | 노트북을 닫고 떠날 준비 | 이름을 특정하지 않는 해안 워크라운지 | 바다색 셔츠, 샌드·딥네이비 | desktop + mobile | 브랜드 첫인상 |
| `/` Home | 국내 입문·서울 | J | 퇴근 뒤 작은 가방을 들고 걷기 | 서울을 연상시키는 저녁 골목·전시 동선 | 차콜 재킷, 웜 앰버 | 4:3 | 도시형 3박 4일 |
| `/` Home | 국내 입문·부산 | E | 해안 산책을 시작 | 부산을 연상시키는 바다와 도시 경계 | 네이비 셔츠, 코럴 포인트 | 4:3 | 주말 이동감 |
| `/` Home | 국내 입문·제주 | G | 노트에 다음 일정을 적기 | 돌담·억새가 있는 일반적인 섬 풍경 | 세이지 니트, 아이보리 | 4:3 | 느린 체류 |
| `/trip-match` | Intro Hero | D | 종이 일정표와 노트북을 정리 | 이름 없는 역 라운지 | 토프 코트, 딥블루 | 3:2 | 선택과 출발 |
| `/hosted` | Hero | H + I | 테이블에서 함께 일정 검토 | 이름 없는 해안 공동 작업 공간 | H 샌드, I 네이비 | 16:10 | 연결·함께 머무름 |
| `/select` | Editorial banner | I | 기차 이동 전 가방·일정 확인 | 이름 없는 현대적 여행 라운지 | 브라운·크림 | 16:9 | 준비의 신뢰감 |
| `/learn` | Hero | K | 여행 사진과 학습 노트 정리 | 이름 없는 디자인 라이브러리 | 잉크 네이비·웜 오크 | desktop + mobile | 이동 중 학습의 구체성 |
| `/programs`, `/en/programs`, `/ja/programs` | Hero | K | 지도와 일정표로 체류 리듬 설계 | 이름 없는 해안 공동 작업 공간 | 소프트 블루·딥 틸 | desktop + mobile | 프로그램 탐색의 행동 맥락 |
| `/growth` | Hero | B | 지도와 노트로 성장 계획 정리 | 이름 없는 도시 카페 라운지 | 차콜·소프트 블루 | desktop + mobile | 성장 콘텐츠의 도시 맥락 |
| `/business` | Hero | C | 빈 기획 자료 검토 | 이름 없는 프리미엄 도시 라운지 | 잉크 블루·토프·크림 | desktop + mobile | 기업·팀 문의의 정돈된 첫인상 |
| `/campaign/japan-short-stay` | Hero | F | 지도에서 짧은 체류 선택 | 이름 없는 일본풍 강변 거리 | 카멜·크림·블루아워 | desktop + mobile | 일본 단기체류 발견과 선택 |

### 노출 비율

- 모델이 들어간 공개 배치: 12개 화면 배치, 11개 정체성(A–K 전체).
- Home desktop/mobile 파생본은 동일 Hero의 art direction으로 한 배치로 센다.
- Hosted의 2인 장면은 H와 I를 각각 한 정체성 노출로 센다.
- 실제 정체성 노출은 13회이며 최고 점유율은 I·K 각 2/13 = 15.4%, 나머지는 각 7.7%다.
- 화면 로드 때 모델을 무작위로 바꾸지 않는다. route·section별 고정 배치와 `modelRotation.ts` 노출 카운트를 사용해 다음 제작에서 덜 노출된 적합 모델부터 선택한다.
- Collections·Guide·상품 카드는 실제 장소·상품 이미지가 우선이며 모델 이미지로 대체하지 않는다.

## 생성·출판 규칙

- 프롬프트에 `fictional adult East Asian woman`과 해당 모델 ID를 명시하고 앵커는 얼굴·헤어 정체성 참조로만 사용한다.
- 로고, 워터마크, 읽을 수 있는 간판, 실제 제휴사 상표, 특정 숙소·교통편·행사장을 생성하지 않는다.
- 손·치아·눈·귀·반사·노트북·가방·의자 구조를 원본 크기로 검수한다.
- 생성 결과만 WebP로 최적화해 `public/media/brand-models/`에 저장한다.
- 모든 공개 자산에 KO·EN·JA alt, 모델 ID, route/section, focal point, 생성일, 제한 문구를 등록한다.

## 생성·적용 자산

생성 방식: Codex built-in `imagegen`, v2.2 identity anchor 및 Model K reference를 참조한 route별 신규 생성. 앵커와 소스 시트는 결과 파일에 포함하거나 공개 경로로 복사하지 않았다.

| assetId | 모델 | 공개 경로 | 크기 | 용량 | 프롬프트 요약 | QA |
| --- | --- | --- | ---: | ---: | --- | --- |
| `home-hero-model-a-coastal-work-desktop-v2` | A | `/media/brand-models/home-hero-model-a-coastal-work-desktop-v2.webp` | 1536×1024 | 74,012 B | 해안 라운지에서 노트북을 닫고 떠날 준비, 왼쪽 카피 여백 | 통과 |
| `home-hero-model-a-coastal-work-mobile-v2` | A | `/media/brand-models/home-hero-model-a-coastal-work-mobile-v2.webp` | 960×1280 | 73,092 B | 가방과 노트북을 챙기는 세로 장면, 왼쪽·하단 안전 영역 | 통과 |
| `domestic-seoul-model-j-city-noir-v2` | J | `/media/brand-models/domestic-seoul-model-j-city-noir-v2.webp` | 1200×900 | 66,238 B | 저녁 전시 골목을 걷는 도시형 짧은 체류 | 통과 |
| `domestic-busan-model-e-coastal-city-v2` | E | `/media/brand-models/domestic-busan-model-e-coastal-city-v2.webp` | 1200×900 | 133,464 B | 비 온 뒤 해안 도시 산책, 네이비·코럴 | 통과 |
| `domestic-jeju-model-g-slow-stay-v2` | G | `/media/brand-models/domestic-jeju-model-g-slow-stay-v2.webp` | 1200×900 | 142,892 B | 돌담·억새 길에서 일정을 기록하는 느린 체류 | 통과 |
| `trip-match-model-d-itinerary-choice-v2` | D | `/media/brand-models/trip-match-model-d-itinerary-choice-v2.webp` | 1536×1024 | 82,584 B | 출발 라운지에서 두 일정 중 선택, 왼쪽 CTA 여백 | 통과 |
| `hosted-models-h-i-coastal-planning-v2` | H·I | `/media/brand-models/hosted-models-h-i-coastal-planning-v2.webp` | 1440×900 | 90,190 B | 해안 공동 작업 공간에서 함께 체류 일정 검토 | 통과 |
| `hosted-models-h-i-coastal-planning-mobile-v2` | H·I | `/media/brand-models/hosted-models-h-i-coastal-planning-mobile-v2.webp` | 960×1280 | 61,204 B | H/I 얼굴을 분리한 세로 협업 장면, 하단 카피 영역 | 통과 |
| `select-model-i-travel-prep-v2` | I | `/media/brand-models/select-model-i-travel-prep-v2.webp` | 1440×810 | 61,530 B | 이동 전 일정표·휴대전화·가방을 점검하는 준비 장면 | 통과 |
| `learn-model-k-creative-focus-desktop-v1` | K | `/media/brand-models/learn-model-k-creative-focus-desktop-v1.webp` | 1536×1024 | 83,678 B | 디자인 라이브러리에서 여행 사진과 학습 노트 정리, 왼쪽 카피 여백 | 통과 |
| `learn-model-k-creative-focus-mobile-v1` | K | `/media/brand-models/learn-model-k-creative-focus-mobile-v1.webp` | 960×1280 | 65,100 B | 같은 학습 행동을 세로 환경 장면으로 재구성 | 통과 |
| `programs-model-k-stay-planning-desktop-v1` | K | `/media/brand-models/programs-model-k-stay-planning-desktop-v1.webp` | 1440×900 | 70,286 B | 해안 작업 공간에서 체류 일정과 가방 정리, 왼쪽 카피 여백 | 통과 |
| `programs-model-k-stay-planning-mobile-v1` | K | `/media/brand-models/programs-model-k-stay-planning-mobile-v1.webp` | 960×1280 | 68,128 B | 프로그램 준비 행동을 세로 환경 장면으로 재구성 | 통과 |
| `growth-model-b-urban-learning-desktop-v1` | B | `/media/brand-models/growth-model-b-urban-learning-desktop-v1.webp` | 1536×1024 | 68,860 B | 도시 카페에서 지도·학습 노트 정리, 왼쪽 카피 여백 | 통과 |
| `growth-model-b-urban-learning-mobile-v1` | B | `/media/brand-models/growth-model-b-urban-learning-mobile-v1.webp` | 960×1280 | 44,430 B | 같은 성장 계획 행동을 세로 환경 장면으로 재구성 | 통과 |
| `business-model-c-team-planning-desktop-v1` | C | `/media/brand-models/business-model-c-team-planning-desktop-v1.webp` | 1536×1024 | 73,264 B | 도시 라운지에서 무기명 기획 폴더 검토, 왼쪽 카피 여백 | 통과 |
| `business-model-c-team-planning-mobile-v1` | C | `/media/brand-models/business-model-c-team-planning-mobile-v1.webp` | 960×1280 | 50,638 B | 같은 기획 검토 행동을 세로 장면으로 재구성 | 통과 |
| `campaign-model-f-japan-choice-desktop-v1` | F | `/media/brand-models/campaign-model-f-japan-choice-desktop-v1.webp` | 1536×1024 | 85,452 B | 이름 없는 일본풍 강변에서 지도 확인, 왼쪽 카피 여백 | 통과 |
| `campaign-model-f-japan-choice-mobile-v1` | F | `/media/brand-models/campaign-model-f-japan-choice-mobile-v1.webp` | 960×1280 | 65,366 B | 블루아워 여행 선택 장면을 세로 구도로 재구성 | 통과 |

총 19개 WebP, 1,460,408 bytes. 생성 원본은 브랜드 저장소 밖의 Codex 생성 디렉터리에 보존하고, 사이트에는 최적화 결과만 등록했다.

### 수동 이미지 QA

- 얼굴: H의 둥근 얼굴·커튼 뱅, I의 타원형 얼굴·밤색 웨이브, J의 하트형 얼굴·검은 직모가 서로 구분됨.
- 손·기기·가방·지도·노트·난간·반사: 원본 크기와 실제 crop에서 이상 없음.
- 실제성: 로고·간판·워터마크·실제 제휴사·특정 숙소·교통사 표식 없음.
- desktop/mobile: Home과 Hosted는 별도 art direction을 사용하고, 나머지는 고정 비율과 focal point로 관리함.
- 오인 방지: 모든 모델 장면은 편집 이미지이며 실제 참가자·고객·후기·프로그램 현장이 아님을 manifest 제한 문구로 유지함.
