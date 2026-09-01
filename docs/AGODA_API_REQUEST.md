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
> Could you also confirm:
> - any **rate limit** on requests (the v2.0 guide does not state one), and
> - the **caching policy** — how long we may cache a returned rate before re-querying.
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

---

## 5. 키를 받은 뒤 우리가 할 일 (미리 정리)

1. `AGODA_API_KEY`를 **Vercel 환경변수로만** 등록 — 코드·커밋에 절대 넣지 않는다
2. 호출은 **서버 라우트에서만** (`/api/prices` 패턴). 브라우저에서 직접 호출하면 키가 노출된다
3. `src/lib/priceWatch.ts` PRICE_SOURCES 방식에 맞춰 일 1회 갱신 + 정적 폴백 유지
4. 표기는 기존 정직성 원칙 그대로 — **실측값 + 기준일(sourceNote) 필수**, "최저가" 같은 표현 금지
5. 응답의 `landingURL`에 우리 cid가 들어 있는지 **매번 확인** (누락 시 수수료가 끊긴다)
6. 헬스체크(`/api/health/affiliates`)에 API 응답 감시 1건 추가

---

## 6. 진행 상태

- [ ] 아고다 담당자에게 위 메시지 발송 — **운영자**
- [ ] apikey 수령
- [ ] HTTPS 엔드포인트 승인 확인
- [ ] rate limit·캐싱 규정 회신 확인
- [ ] (이후) 연동 브랜치 착수
