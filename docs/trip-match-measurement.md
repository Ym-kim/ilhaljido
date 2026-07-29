# Trip Match 전환 측정

Trip Match는 개인정보 없이 정해진 선택 코드와 캠페인 문맥만 전송한다. Vercel Analytics와, 사용자가 분석 쿠키에 동의한 경우의 GA4 `gtag`에 같은 이벤트를 보낸다.

| 단계 | 이벤트 | 주요 필드 | 구현 상태 | GA4 확인 방법 |
| --- | --- | --- | --- | --- |
| 캠페인 진입 | `campaign_landing_view` | `campaign`, `locale`, `source`, `content` | 기존 유지 | DebugView에서 캠페인 URL 진입 직후 확인 |
| 캠페인→Match | `campaign_trip_match_click` | `campaign`, `locale`, `source`, `content` | 신규 | 캠페인 CTA 클릭 후 DebugView 확인 |
| Trip Match 시작 | `trip_match_start` | `locale`, `source`, `campaign` | 신규 | 시작 CTA 1회 클릭 |
| 질문 완료 | `trip_match_answer` | `locale`, `question`, `answer`, `source`, `campaign` | 신규 | 각 단계의 다음 버튼에서 질문당 1회 |
| Trip Match 완료 | `trip_match_complete` | `locale`, `duration`, `mood`, `companion`, `result_slug`, `source`, `campaign` | 신규 | 세 번째 질문 완료 직후 확인 |
| 결과 진입 | `trip_match_result_open` | 완료 이벤트 공통 필드 | 신규 | 결과 URL 렌더링당 1회 |
| 결과 저장 | `trip_match_save` | 완료 이벤트 공통 필드, `action` | 신규 | 저장·저장 해제 각각 확인 |
| 결과 공유 | `trip_match_share` | 완료 이벤트 공통 필드, `method` | 신규 | OS 공유 완료 또는 clipboard fallback 확인 |
| 기존 공유 | `share_click` | `content_type=result`, `slug`, `locale`, `method` | 기존 재사용 | `trip_match_share`와 같은 시점에 확인 |
| Match→Trip Set | `trip_match_trip_set_click` | 완료 이벤트 공통 필드, `destination`, `position` | 신규 | 주 추천·대안 CTA 각각 확인 |
| Trip Set 진입 | `trip_set_open` | `slug`, `destination`, `duration`, `locale`, `source` | 기존 유지 | `source=trip_match` 확인 |
| Trip Set→제휴 | `affiliate_click` | `id`, `provider`, `status`, `campaign`, `destination`, `locale`, `source`, `content` | 기존 재사용 | 제휴 카드 클릭 직전 DebugView 확인 |
| Match→Hosted | `trip_match_hosted_click` | 완료 이벤트 공통 필드 | 신규 | 장기체류·업무 병행 결과에서만 확인 |
| Hosted 관심 등록 | `program_alert_submitted` | 기존 Hosted lead의 `source` | 기존 유지 | 기존 알림 폼 제출 후 확인 |

## Attribution 흐름

1. 허용된 `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`만 URL에서 읽는다.
2. Campaign → Trip Match → Result → Trip Set 내부 링크에 UTM을 유지한다.
3. 결과와 Trip Set 진입 시 `wakation_campaign_context` 세션 문맥을 갱신한다.
4. 기존 `affiliate_click`이 이 문맥을 함께 보내므로 SNS 자산부터 제휴 클릭까지 연결할 수 있다.
5. 파트너 URL의 기존 추적 파라미터는 수정하지 않는다.

## DebugView 검증 순서

분석 쿠키 동의 후 UTM이 포함된 캠페인 URL로 진입한다. 캠페인 CTA, 세 질문, 결과 저장·공유, Trip Set, 제휴 카드 순으로 진행하며 위 이벤트의 순서와 `result_slug`, `source`, `campaign` 값을 확인한다. GA4 API 또는 관리 권한이 없는 환경에서는 DebugView에 이벤트가 도착하는 지점까지를 검증 범위로 한다.
