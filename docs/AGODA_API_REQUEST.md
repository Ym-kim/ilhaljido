# 아고다 Affiliate Lite API — 키 발급 요청 가이드

> 작성 2026-09-01 · 근거: 아고다 공식 문서 `Affiliate_Lite_API_V2.0.pdf`
> (출처 `https://partners.agoda.com/Content/Documents/AffiliateLiteApi/Affiliate_Lite_API_V2.0.pdf`, 문서 v1.0 / 2018-02-07 원문 판독)
>
> **이 문서는 운영자가 아고다 담당자에게 보낼 요청 내용을 정리한 것이다.** 코드 변경은 키 수령 후 별도 진행.

---

## 1. 왜 필요한가 (한 줄)

지금 우리는 숙소 **가격을 화면에 못 쓴다.** 파트너 링크만 걸려 있어서, 사용자는 클릭해서 아고다로 넘어가야 가격을 본다.
이 API를 붙이면 **카드 위에 실시간 요금·평점·할인율을 직접 표시**할 수 있고, 그게 클릭률과 수익에 직결된다.

현재 우리 상태:
- 아고다 파트너 **승인 완료**, `cid=1968994`
- 도시 비교 링크 **33개 도시** 라이브 (2026-09-01 배포, https://www.wakation.kr/select/hotel)
- 크론으로 크루즈·eSIM 가격만 자동 갱신 중 — 숙소는 수단이 없어 미표기

---

## 2. 요청할 것 — 딱 2개

### ① Affiliate Lite API (Long Tail Search API) `apikey` 발급
- 공식 명칭: **Affiliate Long Tail Search API**
- 우리 `siteid`는 **1968994** (= 현재 링크에 쓰는 cid)
- 인증 형식: 헤더 `Authorization: {siteid}:{apikey}` — **apikey만 없으면 못 쓴다**

### ② HTTPS 엔드포인트 사용 승인 ⚠️ **중요**
- 문서상 기본 엔드포인트는 **HTTP**다: `http://affiliateapi7643.agoda.com/affiliateservice/lt_v1`
- 문서 원문: *"To utilize https, please contact your account manager for more information."*
- **HTTP로 쓰면 API 키가 평문으로 네트워크에 흐른다.** 우리 사이트는 전 구간 HTTPS이므로 이 상태로는 붙이면 안 된다.
- → **키 발급과 HTTPS 승인을 반드시 함께 요청**할 것. 둘 중 하나만 오면 도입 보류.

---

## 3. 보낼 메시지 (그대로 복사해서 쓰면 됨)

> Hello,
>
> We are Wakation (https://www.wakation.kr), an approved Agoda affiliate partner.
> Our site ID is **1968994**. We currently run Agoda city links across 33 destination pages.
>
> We would like to request the following:
>
> 1. **API key for the Affiliate Long Tail Search API (Lite API)** for site ID 1968994.
> 2. **Approval to use the HTTPS endpoint.** Our site is served entirely over HTTPS, so we cannot
>    send API credentials over the plain HTTP endpoint documented in the Affiliate Lite API guide.
>
> Intended use: displaying live nightly rates, review scores and star ratings on our destination
> pages, with all booking traffic sent to Agoda through our affiliate links.
>
> Could you also provide / confirm:
> - the **city ID mapping list** (the guide's City Search takes a numeric `cityId`, e.g. 9395,
>   and we currently only have Agoda city URL slugs),
> - any **rate limit** on requests (the v2.0 guide does not state one),
> - the **caching policy** — how long we may cache a returned rate before re-querying, and
> - whether a **newer version** of the Affiliate Lite API guide exists (ours is v1.0, 07 Feb 2018).
>
> Thank you.

---

## 4. 문서에서 확인된 기술 사양 (참고용 — 우리가 이미 아는 것)

| 항목 | 값 |
|---|---|
| 엔드포인트 | `http://affiliateapi7643.agoda.com/affiliateservice/lt_v1` |
| 인증 헤더 | `Authorization: {siteid}:{apikey}` — 본문 값과 일치해야 함 |
| 필수 헤더 | `Accept-Encoding: gzip,deflate` (문서상 필수) |
| 검색 종류 | **City Search** / **Hotel List Search** 2종 |
| 요청 파라미터 | checkInDate, checkOutDate, currency, language, dailyRate(min/max), occupancy(성인·아동), maxResult, sortBy, minimumStarRating, minimumReviewScore, discountOnly |
| 응답 필드 | `dailyRate`, `crossedOutRate`, `discountPercentage`, `currency`, `hotelId`, `hotelName`, `imageURL`, `reviewScore`, `starRating`, `freeWifi`, `includeBreakfast`, `landingURL`(cid 포함된 예약 링크) |

**문서에 없어서 담당자에게 물어봐야 하는 것 (위 메시지에 포함시켜 뒀다)**
- rate limit (호출 빈도 제한)
- 캐싱 허용 기간 — 가격을 얼마나 오래 저장해 두고 재사용해도 되는지
- apikey 발급 절차·자격 요건 자체가 문서에 없음

### 4-1. 문서 전문 재판독으로 추가 확인한 것 (2026-09-01)

**① 등록/가입 링크는 문서에 없다.** PDF 안의 URL을 전량 추출했으나 회원가입·API 신청 페이지·지원 이메일이 **하나도 없다.**
문서에 있는 URL은 API 엔드포인트, 예시 호텔 이미지, 예시 landingURL, 그리고 폰트·인증서 관련 마이크로소프트 URL뿐이다.
→ **키는 파트너 대시보드에서 받는다: https://partners.agoda.com/ (로그인 후 계정/도구 영역).**
   대시보드에 키가 이미 있다면 그게 이 API의 apikey다. 별도 신청 페이지는 존재하지 않고, 그 외 요청(HTTPS 등)은 담당 매니저 문의가 유일한 경로다.

**② 지원 언어에 우리 3개 언어가 전부 있다** — 요청 본문 `language` 필드에 넣는 값:
`ko-kr`(한국어) · `en-us`(영어) · `ja-jp`(일본어)
그 외: fr-fr, de-de, it-it, es-es, zh-hk, zh-cn, zh-tw, el-gr, ru-ru, pt-pt, nl-nl, en-gb, en-ca, en-in, en-au, en-sg, en-za
→ **사이트 언어 그대로 API에 넘길 수 있다.** 별도 매핑 테이블이 필요 없다.

**③ ⚠️ City Search는 슬러그가 아니라 숫자 `cityId`를 쓴다.**
문서 예시: `"cityId": 9395`
우리가 링크용으로 검증해 둔 33개 도시 **슬러그(`tokyo-jp` 등)는 API에 쓸 수 없다.**
→ **담당자에게 도시 ID 매핑 파일(city list / destination mapping)을 함께 요청해야 한다.** 이게 없으면 City Search를 못 쓰고 Hotel List Search(호텔 ID 기반)만 가능하다.

**④ 응답의 `landingURL` 형식** — 예약 링크는 이 형태로 돌아온다:
`https://www.agoda.com/partners/partnersearch.aspx?cid={우리cid}&hid={호텔ID}&currency=&checkin=&checkout=&NumberofAdults=&NumberofChildren=&Rooms=`
→ 우리 cid가 박혀서 오므로 **링크를 직접 조립하지 말고 응답값을 그대로 쓰는 것이 안전**하다(수수료 유실 방지).

**⑤ 문서 자체는 2018-02-07 v1.0**이다. 현행성 확인이 필요하며, 매니저에게 최신 버전 문서가 있는지 함께 물을 것.

---

## 5. 키를 받은 뒤 우리가 할 일 (미리 정리)

1. `AGODA_API_KEY`를 **Vercel 환경변수로만** 등록 — 코드·커밋에 절대 넣지 않는다
2. 호출은 **서버 라우트에서만** (`/api/prices` 패턴). 브라우저에서 직접 호출하면 키가 노출된다
3. `src/lib/priceWatch.ts` PRICE_SOURCES 방식에 맞춰 일 1회 갱신 + 정적 폴백 유지
4. 표기는 기존 정직성 원칙 그대로 — **실측값 + 기준일(sourceNote) 필수**, "최저가" 같은 표현 금지
5. 응답의 `landingURL`에 우리 cid가 들어 있는지 **매번 확인** (누락 시 수수료가 끊긴다)
6. 헬스체크(`/api/health/affiliates`)에 API 응답 감시 1건 추가

---

## 5-1. 실제 연동 시도 결과 (2026-09-01) — **401에서 막힘**

운영자가 대시보드에서 키를 찾아 Vercel에 등록한 뒤, Preview에서 실제로 호출해 봤다.
진단 라우트: `/api/health/agoda` (도쿄 cityId 5085, 1박, maxResult 5)

```json
{"ok":false,"reason":"http_error","status":401,
 "keyShape":{"present":true,"length":44,"hasSurroundingWhitespace":false,"looksLikeUuid":false}}
```

**이 결과로 확정된 것**

| 항목 | 판정 | 근거 |
|---|---|---|
| Vercel 환경변수 등록 | ✅ 정상 | 미설정이면 `missing_key`가 나온다 |
| **HTTPS 엔드포인트** | ✅ **열려 있다** | 막혀 있으면 `network`(연결 실패). **매니저 HTTPS 승인 요청은 불필요해졌다** |
| 값 오염(공백·줄바꿈) | ✅ 아님 | `hasSurroundingWhitespace: false` |
| 인증 | ❌ **거부(401)** | 서버 도달은 했고 자격증명만 거절됨 |

**키 형태**: 44자 · UUID 아님.
공식 문서(v1.0, 2018)의 apikey 예시는 UUID 36자다. 44자는 base64로 인코딩한 32바이트 토큰의 전형적인
길이라, **키 형식이 문서 이후에 바뀌었을 가능성**과 **API용 키가 아닐 가능성**이 둘 다 남는다.

**여기서 멈춘 이유**: 인증 형식을 추측으로 바꿔가며 재시도하면 계정에 401만 쌓인다.
문서에 `siteid`·`apikey`를 본문에도 넣으라는 문장이 있으나 **예시 본문에는 두 필드가 없어**
필드명·위치를 알 수 없다. 근거 없는 시도 대신 담당자 확인이 필요하다.

## 5-2. 원인 확정 (2026-09-01) — **error 108: Site ID 또는 API key가 유효하지 않음**

담당자 회신을 기다리지 않고 진행하라는 지시에 따라, **근거 있는 인증 변형 3종**을 시험했다.
(무작정 조합을 늘리면 계정에 401만 쌓이므로 3개로 제한)

| 변형 | 근거 | 결과 |
|---|---|---|
| documented | 문서 그대로 `Authorization: {siteid}:{apikey}` | **401** |
| basic | 콜론 형식은 HTTP Basic 자격증명 형태 → `Basic base64(...)` | **401** |
| body | 문서의 "본문 값과 일치" 문장 → 최상위에 siteId·apiKey 동봉 | **401** |

세 변형 모두 아고다가 **동일한 에러 본문**을 돌려줬다:

```
108: Site ID or API key is invalid or missing in the header
```

**이 메시지로 확정된 것**

- ❌ **헤더 형식 문제가 아니다.** 세 형식이 같은 에러 → 형식은 더 시험할 게 없다
- ⚠️ **IP 제한 여부는 이 응답만으로 배제할 수 없다.** 문서 응답표상 401은 "ApiKey not found
  **또는 IP 제한 위반**" 두 경우를 함께 다루며, error 108 문구만으로 둘을 구분할 수 없다.
- ✅ 남은 원인은 **자격증명·계정 권한·IP 정책**이다: `siteId=1968994`이 API용이 아니거나,
  대시보드의 키가 Affiliate Lite API용이 아니거나, 송신 IP가 허용되지 않았을 수 있다.

**→ 코드로 더 할 수 있는 일이 없다.** 여기서부터는 아고다가 올바른 (Site ID, API key) 쌍을 알려주거나
계정에 API 접근을 열어줘야 한다.

## 5-3. 최종 판정 (2026-09-01) — **코드로 할 수 있는 시도 종료**

대시보드 실물 확인 결과, `도구 > API`의 **'API 액세스 키 확인하기'는 CID별로 키를 발급**하고
CID 드롭다운에 **라벨·번호가 같은 항목이 2개**였다(`Approval Site (1968994)` x2).
라벨이 같아도 키가 다를 수 있어 **두 키를 각각 시험**했다.

| 시험 축 | 시도 | 결과 |
|---|---|---|
| 헤더 형식 | 문서형식 / HTTP Basic / 본문동봉 | 3종 전부 **401 · 108** |
| 키 후보 | 대시보드 항목 ①과 ② | 2개 전부 **401 · 108** |

전부 동일: `108: Site ID or API key is invalid or missing in the header`

**배제된 원인** — 문서 외 헤더 조합 필요 / 환경변수 미설정 / 값 앞뒤 공백 / HTTPS 차단
**남은 원인** — 계정에 **Affiliate Lite API 접근이 실제로 열려 있지 않음**, API용 Site ID·키 쌍이
다름, 또는 호출 원본 IP가 Agoda 허용목록 조건을 충족하지 않음.

🔑 강한 힌트: 대시보드가 주는 키는 **44자 non-UUID**인데, 공식 v2.0 가이드의 apikey 예시는
**UUID 36자**다. 키 체계 자체가 다를 가능성이 있다.

**→ 더 시험할 근거가 없다.** 아고다 문의가 유일한 경로이며, 창구는
`도구 > API` 화면 하단의 **'문의 사항 보내기'** 링크다(별도 이메일보다 이 경로가 정확하다).

### 담당자에게 보낼 후속 메시지 (그대로 복사)

> Hello,
>
> Following up on API access for site ID **1968994** (https://www.wakation.kr).
>
> We are calling `https://affiliateapi7643.agoda.com/affiliateservice/lt_v1` (City Search,
> cityId 5085) with the header `Authorization: 1968994:<our key>` as described in the
> Affiliate Lite API guide v2.0, and consistently receive **HTTP 401**.
>
> Note the HTTPS endpoint itself is reachable — only authentication fails.
>
> The Affiliate Lite API consistently returns **error 108 — "Site ID or API key is invalid or
> missing in the header"** for site ID **1968994**.
>
> We have already ruled out the obvious causes:
> - Three header forms tested (`{siteid}:{apikey}`, HTTP Basic, credentials also in the body) —
>   all return the same error 108, so this is not a header-format problem.
> - Both API keys listed under **Tools > API** were tested. The CID dropdown shows two entries with
>   the identical label `Approval Site (1968994)`; **both keys return error 108**.
> - The HTTPS endpoint is reachable, so this is not an IP or connectivity problem.
>
> Could you please provide or confirm:
> 1. The **correct Site ID and API key pair** for the Affiliate Lite API. Is the Site ID for API
>    calls the same as our affiliate **cid 1968994**, or is a separate API Site ID issued?
> 2. Whether the key shown in our partner dashboard is the **Affiliate Lite (Long Tail Search)
>    API key** at all. Ours is a 44-character non-UUID string, while the v2.0 guide shows a
>    UUID-format example.
> 3. Whether **API access is activated** for our account — and if not, please enable it.
>
> Thank you.

## 6. 진행 상태

- [x] apikey 수령 — 운영자가 대시보드에서 확보, Vercel 환경변수 `AGODA_API_KEY` 등록 완료
- [x] **HTTPS 엔드포인트 — 승인 요청 불필요.** 실호출로 열려 있음을 확인(2026-09-01)
- [x] 도시 ID 매핑 — **담당자 요청 불필요.** 도시 페이지에서 33곳 자체 수집(`src/lib/affiliate/agodaCities.ts`)
- [x] 연동 1단계 착수 — 서버 클라이언트 + 진단 라우트 (`feat/agoda-api-integration-v1`)
- [ ] ⛔ **401 해소 — 위 5-1의 후속 메시지 발송 필요(운영자)**. 이게 풀리기 전에는 다음 단계 불가
- [ ] rate limit·캐싱 규정 회신 확인
- [ ] (이후) 도시 카드 실시간 요금 렌더

## 7. Site ID 분리 후 재검증 (2026-09-02)

- Vercel Production과 Preview에 `AGODA_SITE_ID=1968994`를 별도 변수로 설정했다.
- 서버는 `AGODA_SITE_ID`와 `AGODA_API_KEY`만 읽고, 공식 형식
  `Authorization: <SITE_ID>:<API_KEY>`로 요청한다.
- `AGODA_API_KEY_2`는 Site ID로 사용하거나 다른 키와 조합하지 않는다.
- 새 Preview에서 도쿄 `cityId=5085`, 30일 뒤 1박, 최대 5건으로 실제 Search API를 호출했다.
- 결과: HTTP `401`, Agoda error `108`,
  `Site ID or API key is invalid or missing in the header`.
- Vercel 팀의 Secure Compute 네트워크 목록은 비어 있고, 프로젝트에도 Static IP 활성화 흔적이
  확인되지 않았다. Vercel 공식 문서상 기본 Functions 송신 IP는 동적 범위이므로 Agoda가 고정 IP
  허용목록을 요구하면 현재 구성은 그 조건을 안정적으로 충족할 수 없다.
- 유료 Static IP 또는 Secure Compute는 구매·활성화하지 않았다. Agoda 측에 API 접근 활성화 여부,
  API용 Site ID·키 쌍, 허용해야 할 송신 IP 정책을 먼저 확인한다.
- 인증과 prototype QA가 끝날 때까지 Booking.com 검색을 기본 경로로 유지한다.
