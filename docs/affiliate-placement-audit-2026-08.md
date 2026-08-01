# Wakation 제휴 상품 배치 감사

- 감사일: 2026-08-01
- 활성 카탈로그 항목: 99개 (`active_affiliate` 선언 기준)
- 원칙: 활성 추적 링크만 주 CTA로 사용하고, 일반 외부 링크·placeholder·심사 중 공급자는 수익 발생 링크처럼 표현하지 않는다.

## 1. 공급자·추적 불변식

| 공급자 | 필수 추적 | 주요 역할 | 배치 원칙 |
| --- | --- | --- | --- |
| Booking.com | `aid=7854081` | 숙소 | 도시·Trip Set 문맥에서 1~2개, 최종 요금은 제휴사 확인 |
| Trip.com | `Allianceid=9024807` | 항공·교통 | 도시 ID와 도착지를 실물 확인한 링크만 사용 |
| KKday | `cid=25833` | 체험·티켓 | 실제 상품 상세로 연결하고 일정·가격 기준일을 분리 |
| Klook | redirect + `aid=126848` | 체험·eSIM·교통 | 공식 redirect 형식만 사용 |
| Airalo | Impact `7451946/1268485/15608` | eSIM | 목적지별 랜딩을 인코딩한 링크 사용 |
| 인프런 | 발급된 `inf.run/*` | 학습 | 단축링크를 조합하지 않고 발급 링크 그대로 사용 |
| AmazingTalker | `aff_c_code`, `aff_p_code` | 언어학습 | `/select/learn`에서만 현재 조건을 확인하도록 연결 |

`AffiliateCard`의 활성 외부 링크는 `rel="sponsored noopener noreferrer"`를 사용한다. 일반 외부 출처 링크에는 `sponsored`를 붙이지 않는다.

## 2. 고객 여정별 배치

| 고객 단계 | 적절한 상품 | 최대 밀도 | 주의 |
| --- | --- | ---: | --- |
| 발견 | Trip Set과 관련 체험 1개 | 1 | 첫 화면을 가격표로 만들지 않음 |
| 여행지 이해 | 해당 도시 숙소·체험 | 2~3 | 도시와 무관한 카탈로그 노출 금지 |
| 여행 준비 | 숙소·교통·eSIM·체험 | 3~6 | 한 카드당 주 CTA 1개 |
| 프로그램 상세 | 일정과 충돌하지 않는 준비 상품 | 2~3 | 지정 숙소 인정처럼 표현 금지 |
| 저장 | 사용자가 직접 저장한 상품 | 사용자 선택 | 브라우저 저장임을 명시 |
| 학습 | 활성 인프런·언어학습 | 6 이내 | 가상의 ‘예정 워크숍’과 혼합 금지 |

## 3. 이번 변경

- `/learn`의 가상 워크숍 4개와 메일 ‘사전 알림’을 제거했다.
- `FEATURED_COURSES`에서 `active_affiliate`인 항목만 가져와 최대 6개를 노출한다.
- 무료 placeholder 강의와 승인 대기 항목은 `/learn` 주 CTA에서 제외했다.
- 제휴 URL은 기존 카탈로그가 계속 소유하며 페이지에 중복 저장하지 않는다.
- `/about`, `/contact`, `/visa-ai`는 제휴 판매 페이지가 아니므로 불필요한 상품 CTA를 늘리지 않았다.

## 4. 위험과 후속 운영

- 일부 기존 카탈로그 이미지에는 외부 hotlink 또는 과거 AI 파일명이 남아 있다. 상품 이미지 권리·실물 일치 검증 없이 일괄 교체하지 않는다.
- 가격이 있는 항목은 `priceAsOf`가 필수다. 오래된 가격은 자동 갱신하지 않고 숨기거나 다시 확인한다.
- 활성 상태와 링크 생존성은 `/api/health/affiliates`와 기존 헬스체크를 함께 본다.
- 신규 공급자는 `application_required → approved_needs_deeplink → active_affiliate` 순서를 지킨다.
- `npm run audit:affiliate-placement`는 핵심 추적 파라미터, sponsored rel, `/learn` 활성-only 배치를 검사한다.

## 5. 수익화 우선순위

1. 목적지 Guide·Trip Set에 이미 검증된 체험 Editorial을 1개씩 연결
2. 숙소 카드의 실제 이미지 권리·목적지 일치 재검증
3. eSIM·교통을 출국 체크리스트 문맥에 배치
4. 지원 프로그램과 일반 숙소의 인정 조건 충돌 방지
5. 클릭 이벤트에서 provider·route·locale만 수집하고 개인정보는 수집하지 않음

