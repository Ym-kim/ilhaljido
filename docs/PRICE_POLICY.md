# Wakation 가격 표시 정책 (v1, 2026-07-27)

제휴 상품의 가격 표시에 대한 단일 기준. 목적: **사용자 신뢰(실측·기준일·변동 안내)와 상품성(가격의 전환력)을 동시에 지키고**, 근거 없는 가격·보증 표현의 재유입을 구조적으로 차단한다.

## 1. 표시 조건 — 4가지를 모두 충족할 때만 가격을 표시한다
1. **출처**: 제휴사가 공개한 가격을 실측한 값만. 추정·환산·타 사이트 인용 금지.
   - 실측 경로는 파트너별로 고정: Booking=평점/리뷰만(날짜변동가라 가격 미표기) / KKday=상품페이지 price 위젯 / Klook=검색 리스팅 또는 meta price / 인프런=JSON-LD / Trip=상품 페이지·priceWatch
2. **기준일**: `priceAsOf`(YYYY-MM-DD) 필수 — **타입 레벨 강제**(`types.ts`의 `PricedFields` 유니온: priceFrom이 있는데 priceAsOf가 없으면 컴파일 에러).
3. **갱신**:
   - 자동군(Trip 크루즈·Airalo): `priceWatch.ts`가 일 1회 실조회, 화면은 라이브 값+당일 기준일로 덮어씀(실패 시 정적값 폴백)
   - 수동군(Klook·KKday·인프런 등): 실브라우저 실측으로 갱신. **STALE 기준 30일** — 헬스체크 크론(`policy:price-stale`)이 초과 항목을 매일 감시해 /admin에 경고
4. **변동 안내**: 페이지 공통 disclosure 3줄("요금과 상품 조건은 제휴사 사이트에서 최종 확인됩니다") + **카드 가격 옆 기준일 마이크로카피**(`7.26 기준` / `as of 7/26` / `7.26基準`) 상시 노출.

## 2. 미충족 시 — 가격 대신 CTA 폴백
조건을 하나라도 못 채우면 priceFrom을 넣지 않는다. 카드는 자동으로 CTA로 폴백된다(`{item.priceFrom ?? item.cta}`).
권장 CTA: 실시간 요금 확인 · 오늘의 조건 보기 · 상품 옵션 확인 · 제휴사에서 가격 확인.

## 3. 표면별 규칙
| 표면 | 규칙 |
|---|---|
| AffiliateCard (visual) | priceFrom+기준일 병기 (유일한 가격 본표시 지점) |
| PromoTicker | 카드와 동일 상품만 가격 허용 — **카드의 priceAsOf를 준용**(티커 자체 표기는 과밀로 생략). 카드 재실측 시 티커도 함께 갱신 |
| destinations 태그(Airalo US$) | 분기 실측 + 코드 주석에 기준일. 구조화 이관은 백로그 |
| 아티클 본문 | 가격 언급 시 본문에 기준일 문장 명시("2026년 7월 26일 실측 기준") — bellissima 전례 |

## 4. 금지 (affiliate-price-claim-risk-v1 계승)
최저가 · 가격 보장 · 확정 가격 · 무조건 저렴 · 근거 없는 할인율/정가 병기 · 허위 긴급성. "정가 병기"는 판매처가 정가를 함께 표기한 경우만(미라클호 전례).

## 5. 운영 루프
- 재실측 트리거: ①헬스체크 `policy:price-stale` 경고 ②분기 점검 ③운영자 대시보드 가격 전달
- 재실측 시 갱신 대상: `priceFrom` + `priceAsOf` + `sourceNote`(경로·근거) 세 필드 동시
- 신규 가격 추가 절차: 실측 → priceFrom+priceAsOf+sourceNote 등록 → (해당 시) priceWatch PRICE_SOURCES 등록
