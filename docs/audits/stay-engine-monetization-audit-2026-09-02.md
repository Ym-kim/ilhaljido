# Wakation Monetization / Stay Engine Audit v2

- 기준일: 2026-09-02 (KST)
- Repository: `Ym-kim/ilhaljido`
- Production: `https://www.wakation.kr`
- 기준 커밋: `3bffc425524ffb43c909aa441f8d05aaa4093396`
- 작업 브랜치: `feat/stay-engine-monetization-foundation-v2`
- 원칙: 비밀값은 확인·기록하지 않고 변수 존재와 공개 응답만 판정한다.

## A. Current Production Status

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| `origin/main` | 최신 | 로컬 HEAD와 `3bffc42` 일치 |
| Vercel Production | 정상 | GitHub commit status `success` |
| Affiliate health | 정상 | `/api/health/affiliates`: 70건, failures 0 |
| Agoda external redirect | 정상 | Agoda 홈·도쿄 도시 링크 HTTP 200 |
| Agoda Affiliate Lite API | 차단 | `/api/health/agoda`: HTTP 401, error 108 기록 |
| KO/EN/JA 문서 언어 | 정상 | Production `/`, `/en`, `/ja` 렌더 확인 |
| 모바일 overflow / broken image | 정상 | 주요 18개 경로에서 0건 |
| Working tree | clean에서 시작 | 외부 업데이트 fast-forward 후 감사 시작 |

최근 안정 태그는 `review-rail-grid-v1-20260902`다.

## B. External Update Delta

2026-08-13의 이전 기준선 `8b13eba` 이후 `3bffc42`까지 134개 파일, 약 6.8k LOC가 추가·정리됐다.

| 상태 | 변경 |
| --- | --- |
| NEW | Agoda 파트너 활성화(`cid=1968994`), 33개 도시 보조 링크, Affiliate Lite 서버 클라이언트·진단 라우트 |
| NEW | Host 등록·대시보드·관리자 검수·공개 stay 상세 기반, 호스트 알림 메일 테스트 라우트 |
| NEW | Traveler Notes / 회원 후기 인프라와 홈 Review Rail |
| NEW | EN/JA 크루즈 허브·상세, 인프런 2차 상품, 실제 제휴 카드 확장 |
| IMPROVED | 외부 링크 KO/EN/JA 로케일 매칭, 로고 locale 홈 링크, 스크롤 전환, Select 활동·강의 UI |
| IMPROVED | Agoda·Booking·Trip 세 숙박 파트너가 `/select/hotel`에 함께 노출 |
| PARTIAL | Agoda API 코드는 있으나 자격증명 쌍이 401/error 108로 거부됨 |
| PARTIAL | Host 직접재고 기반은 있으나 Marketplace/PMS/결제는 없고 이번 범위에서도 유지 |
| OUTDATED | 일부 프로그램 데이터에 `8월 예정`, `8월 초 예정` 문구가 9월에도 남아 있음 |
| REMOVED | Prisma 미사용 잔재 제거, 일부 낡은/중복 크루즈 페이지 구조 정리 |

## C. Site-wide Feature Audit

| 영역 | 상태 | 판단 |
| --- | --- | --- |
| Home | COMPLETE | 숙소 검색, Trip Match, 기획전, 프로그램, 후기 진입 존재 |
| Destinations / Guide | COMPLETE | 실제 장소 정보와 숙박·항공·체험 연결 존재 |
| Collections / Trip Sets | COMPLETE | 편집형 일정과 제휴 준비 상품 연결 존재 |
| Search | NEEDS MONETIZATION UPGRADE | 내부 결과가 없고 Booking으로 즉시 이탈 |
| Saved | PARTIAL | 브라우저 저장은 정상, 저장 후 live stay/prepare 행동은 약함 |
| Trip Match | PARTIAL | 추천은 완성됐지만 표준 stay funnel 이벤트와 내부 숙소 결과가 없음 |
| Select hub | NEEDS MONETIZATION UPGRADE | 상품군은 풍부하지만 provider별 링크 모음 인상이 남음 |
| Hotel | PARTIAL | Booking 검색 + Agoda/Trip 보조 링크는 있으나 내부 검색·상세·rate 없음 |
| Flight / Train | PARTIAL | Trip.com 링크는 있으나 독립 Select IA와 검색 경험은 제한적 |
| Activity | COMPLETE | Klook/KKday active 링크, editorial 상세, 고지 존재 |
| eSIM | COMPLETE | Airalo/Klook 연결과 준비 안내 존재 |
| Rental Car | MISSING | 전용 경험 없음. 이번 범위에서는 추가하지 않음 |
| Transfer | PARTIAL | 도시/가이드 내 Klook 링크는 있으나 독립 탐색은 없음 |
| Travel Products | COMPLETE | CoupangGear와 필수 고지 존재 |
| Education | COMPLETE | 인프런 12종과 검색 진입 존재 |
| Hosted | COMPLETE | 직접 운영 구분, 관심 등록, 확정 일정 전 결제 없음 |
| Programs / Growth | COMPLETE/PARTIAL | 포트폴리오는 완성, 일부 예정일 카피 갱신 필요 |
| Host / direct stay | PARTIAL | 등록·검수·공개 상세 기반은 존재, 실제 재고·예약·결제는 없음 |
| Traveler Notes / Moments | COMPLETE | 에디터 소개 + 회원 후기 구분, 공개 전 확인 안내 |
| Real Voices | PARTIAL | 수집 폼은 존재, 공개 사례 규모는 아직 제한적 |
| Business | COMPLETE | 유형·인원·일정·예산 범위 중심의 inquiry flow와 추적 존재 |
| Partnership / Contact | COMPLETE | 공식 공개 이메일과 문의 경로 존재 |

## D. Current Monetization Map

| Partner | Category | Link / tracking | 주요 위치 | 상태 |
| --- | --- | --- | --- | --- |
| Agoda | stay | `cid=1968994` 도시·홈 redirect | `/select/hotel`, 도시 카드 33곳 | redirect active, API auth blocked |
| Booking.com | stay | `aid=7854081` search/property deep link | 홈 검색, Hotel, Guide, Trip Set | active affiliate |
| Trip.com | hotel/flight/train/cruise | `Allianceid=9024807` | Guide, Cruise, 이동 CTA | active affiliate |
| Klook | experience/transport/eSIM | `aid=126848`, 공식 redirect 병행 | Activity, Experience, Trip Set | active affiliate |
| KKday | experience | `cid=25833` | Activity, Program, editorial | active affiliate |
| Airalo | connectivity | Impact `7451946` | eSIM, Guide, Trip Match | active affiliate |
| Coupang Partners | travel gear | 기존 `link.coupang.com/a/*` | 준비물 섹션 | active affiliate + disclosure |
| Inflearn | education | `utm_campaign=1771445` | Select Learn, 검색 | active partner links |

현재 `/api/health/affiliates`는 70개 공개 경로·제휴 URL을 검사하고 failures 0이다.

## E. Current Money Path

```text
Home stay search ───────────────→ Booking search (즉시 외부 이탈)
Destination / Guide ────────────→ Booking / Trip / Agoda / activity
Collection / Trip Set ──────────→ affiliate product cards
Trip Match ─────────────────────→ recommendation / Trip Set / affiliate
Hosted ─────────────────────────→ interest signup
Business ───────────────────────→ inquiry form
Host ───────────────────────────→ host registration / direct stay page foundation
```

핵심 병목:

1. `stay_search`와 결과 조회 사이에 Wakation이 소유하는 화면·데이터가 없다.
2. 숙박 검색 CTA는 `affiliate_click`만 남기고 stay 전용 단계·검색 ID를 남기지 않는다.
3. Booking property deep link, Agoda city link, Trip hotel link가 하나의 비교 가능한 provider schema를 공유하지 않는다.
4. API 실패 시 failover는 링크별로 존재하지만 Stay Engine 정책으로 명시되지 않았다.
5. Saved·Trip Match 이후 “이 여행 준비하기”의 cross-category 진행 상태가 숙박 단계와 연결되지 않는다.
6. `/stays/[slug]`는 host 직접재고 소개용이므로 OTA property result와 같은 모델로 취급하면 안 된다.

## F. Tracking Status

### 현재 측정 가능

- Vercel Analytics: Production script 활성 확인
- GA4: consent-gated 코드 존재. 현재 브라우저에서는 로딩 여부를 확정하지 못함
- `affiliate_click`, `second_affiliate_click`, `cross_category_click`, `second_category_click`
- Trip Match, Campaign, Experience, Hosted, Save, B2B inquiry 이벤트
- source page/section, CTA, provider, destination, locale, trip set, campaign context

### 현재 표준 이벤트 부재

- `stay_search`
- `stay_search_result_view`
- `stay_property_view`
- `stay_booking_click`
- `affiliate_redirect`

이벤트에 email/phone/name을 넣는 코드는 발견되지 않았다. 새 Stay 이벤트도 직접 식별자를 받지 않는 계약으로 고정해야 한다.

## G. Agoda API Capability

| Capability | 판정 |
| --- | --- |
| Credential env 존재 | 존재로 추론: `missing_key`가 아닌 401 응답 |
| HTTPS endpoint | reachable |
| Affiliate redirect | active |
| City Search | 코드 존재, 인증 실패로 사용 불가 |
| Hotel List Search | 문서상 후보이나 현재 권한 불명 |
| Property detail | 현재 승인·응답 근거 없음 |
| Availability / Rate | Search 응답 전 단계에서 차단 |
| Book API | 승인 근거 없음, 구현 금지 |
| Cache / rate limit | 공식 회신 전, 추측 금지 |

Production 응답: `{"ok":false,"reason":"http_error","status":401,...}`. 두 키 후보와 세 인증 형태가 모두 error 108을 반환한 기록이 있어 코드 재시도는 중단한다.

## H. Booking API Readiness

- `aid=7854081` affiliate 검색·property link는 active다.
- repository에 Demand API key, `X-Affiliate-Id`, Partner Centre API access 구현 흔적이 없다.
- 따라서 현재는 redirect provider만 가능하다.
- future `BookingProvider`는 Stay Engine adapter로 추가하되 승인 전 Search/Look/Book 호출을 구현하지 않는다.

## I. Agoda vs Booking vs Trip

| 기준 | Agoda | Booking.com | Trip.com |
| --- | --- | --- | --- |
| 현재 수익 경로 | redirect active | redirect active | redirect active |
| API | Lite 코드 있으나 401 | Demand 권한 없음 | 공개된 프로젝트 API 권한 없음 |
| Asia inventory | 강점 후보 | 폭넓음 | 이동·중국·크루즈 강점 |
| Global inventory | 보통~강점 | 강점 | 보완재 |
| 현재 UX | 도시 링크 | 날짜 포함 검색·property deep link | 카테고리별 외부 링크 |
| 전환 측정 | affiliate click만 | affiliate click만 | affiliate click만 |
| 복잡도/위험 | 인증·cache 규정 미해결 | API 승인 필요 | 숙박 primary로 확장 시 IA 혼선 |
| 권장 역할 | API 해소 후 stay pilot | 현재 stable fallback, future global adapter | move/flight/train/cruise + fallback |

commission은 계약 값이 코드에 없고 확인되지 않았으므로 비교 수치로 쓰지 않는다. 의사결정은 Revenue/1,000 sessions와 CTA conversion으로 한다.

## J. Recommended Provider Architecture

```text
Wakation Stay Engine
├─ domain: StaySearchRequest / StayResult / StayProperty / StayRedirect
├─ provider contract: search / property / redirect / capability
├─ AgodaProvider
│  ├─ redirect: active
│  └─ search: unavailable until error 108 resolved
├─ BookingProvider
│  ├─ redirect: active
│  └─ demand search: future, disabled without approved credentials
└─ DirectProvider
   └─ host listing presentation only; no live inventory or payment
```

Frontend는 provider 원본 schema, affiliate ID, secret을 이해하지 않는다. server adapter가 공통 domain model로 변환하고, capability가 없는 기능은 명시적 `unavailable`로 반환한다.

## K. Required Code Refactor

1. `src/lib/stays/domain.ts`: provider-neutral request/result/capability 타입
2. `src/lib/stays/providers/*`: Agoda redirect/search, Booking redirect, Direct listing adapter
3. `src/lib/stays/providerRegistry.ts`: 활성 capability 조회와 failover 정책
4. `src/lib/stays/analytics.ts`: PII 없는 Stay 이벤트 계약
5. 기존 `DestinationSearch`와 홈 검색에서 `stay_search` → 기존 affiliate click 순서로 측정
6. 정적 audit로 provider ID, tracking, PII 필드, unsupported capability 노출을 검증

## L. UX/UI Issues

- Home와 Hotel의 날짜 검색 UX는 좋지만 결과를 Wakation이 소유하지 못한다.
- Select는 숙소·체험·eSIM·강의 수량이 잘 보이지만 “Discover → Prepare → Book” 단계는 약하다.
- 숙박 provider 세 곳의 차이가 설명되지 않아 선택이 브랜드가 아니라 로고 기준이 된다.
- destination 카드의 Agoda 보조 링크는 새로운 수익 경로지만 search/result KPI가 없다.
- mobile broken image/overflow는 감사 경로에서 0건으로, 전면 디자인 교체 사유는 없다.

## M. Model Asset Audit

- 기존 `WAK-MODEL-A`~`K`와 scene/season/wardrobe/focal/safe framing metadata가 이미 풍부하다.
- TEMI: `infrastructure-model-temi-coastal-desk-v1.webp`가 Production에서 사용 중이나 canonical model roster ID/role manifest는 별도 정리가 필요하다.
- BOMI: repository에서 이름·자산·manifest를 찾지 못했다. 원본 전달 전 임의 생성·배치하지 않는다.
- 권장: `PLACE = actual place`, `EXPERIENCE = model editorial` 원칙을 유지하고 TEMI/BOMI는 기존 `MediaAsset` manifest의 alias/role metadata로 통합한다.
- Higgsfield용 대표 reference 선정은 원본 자산 확보 후 진행한다.

## N. Outdated Content / Brand Hygiene

- 공개 이메일은 `wakation.sf@gmail.com`으로 통일돼 있으며 금지 이메일 노출은 발견되지 않았다.
- `src/lib/i18n/data.ts`에 `8월 예정`, `8월 초 예정`, 2026년 하반기 TBD 항목이 남아 있다. 2026-09-02 기준 사실 재검증 후 `확인 필요/종료/새 일정 미정`으로 정리해야 한다.
- 일부 지원사업은 July/August verification date가 남아 있으나 health policy는 현재 20건 정상으로 판정한다.
- 도메인 이메일은 실제 생성 근거가 없으므로 임의 주소를 만들지 않는다.

## O. Implementation Plan

| Priority | 목적 | 변경 파일 | 재사용 | 난이도 | 예상 효과 | 위험 | Test | Rollback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P0 Measure | stay 단계·provider별 CTR 측정 | `track.ts`, 검색 컴포넌트, audit | 기존 Vercel/GA4 helper | 중 | Revenue/1,000 비교 기반 | 이벤트 중복 | analytics debug + audit | 이벤트 호출만 revert |
| P1 Foundation | provider-neutral domain/capability | `src/lib/stays/*` | bookingSearch/agodaApi | 중 | provider 교체 비용 감소 | 과설계 | tsc + unit-like audit | 신규 폴더 제거 |
| P1 Safety | Agoda 401 시 명시적 unavailable + Booking fallback | registry/providers | 기존 링크 보존 | 중 | 막힌 화면 방지 | accidental live call | credential 없는 build + production health | registry revert |
| P2 Prototype | Search result UI | API 정상화 후 | 공통 domain | 높음 | 외부 이탈 지연·CTR 증가 | stale rate/법적 표현 | Preview pilot | route disable |
| P3 Pilot | Fukuoka/Osaka/Tokyo | traffic 기준 | Guide/Trip Set | 높음 | high-intent 수익화 | latency/error | A/B-like event comparison | feature flag off |
| P4 Money Path | Guide/Trip Set → stay engine | 기존 CTA | affiliate journey | 중 | cross-category clicks | CTA 과밀 | mobile funnel QA | old href restore |
| P5 Select | Prepare taxonomy | 기존 Select | 카드 system | 중 | 이해·교차판매 | IA 회귀 | KO/EN/JA QA | old navigation restore |
| P6 Trust | evidence label 통합 | SelectionCriteria 등 | 기존 문구 | 중 | 신뢰 상승 | 과장 표현 | claim audit | label revert |
| P7 Models | TEMI/BOMI manifest | media assets | MediaAsset | 낮음~중 | 브랜드 운영 효율 | asset 오인 | media/model audits | manifest entries revert |

## P. Immediate Decision

가장 높은 병목은 **P0 Measure + P1 Foundation**이다. Agoda live search는 credential 문제가 해소되기 전 구현하지 않는다. 기존 Booking flow, Agoda 도시 redirect, Trip.com 링크는 그대로 유지한다.

코드 구현은 repository 규칙에 따라 운영자 승인 후 시작한다.
