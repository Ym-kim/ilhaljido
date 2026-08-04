# 2026 추석 시즌 종료 롤백 체크리스트 (실행일: 2026-09-27 이후)

> 추석 자산이 5개 표면에 흩어져 있어 종료 처리가 전부 수동임 — 누락 방지용 단일 체크리스트.
> (2026-08-04 감사에서 "9/27 롤백 절차가 코드 주석 3곳에 분산"으로 지적 → 본 문서로 일원화)

## 대상 연휴
2026 추석 연휴 = **9/24(목)~9/27(일)**, 대체공휴일 없음. 연휴 종료 다음 날부터 아래 순서로 처리.

## 롤백 절차 (순서 준수)

### 1. `src/lib/affiliate/collections.ts` — chuseok-short-haul
- [ ] `spotlight: true` 플래그 제거 → 홈 스포트라이트 와이드 카드 자동 소멸 (CollectionsSection이 플래그 기준)
- [ ] `spotlightNote`(앰버 시즌 칩 문구) 제거
- [ ] Trip Set 확장 필드(duration·audience·dayFlow·comfortFacts) 제거 여부 판단 —
      컬렉션 자체는 상시 에디토리얼로 후퇴 유지 가능 (배열 위치를 선두에서 뒤로 이동)
- [ ] 배열 선두 배치 후퇴 (선두 = 홈 상위 노출 규약)

### 2. `src/lib/stories.ts` — chuseok-4days
- [ ] STORIES 배열 최상단의 chuseok-4days 엔트리를 하단으로 후퇴 (제거 아님 — 아카이브 가치 유지)

### 3. `src/components/home/PromoTicker.tsx`
- [ ] `ticker-chuseok` 항목 제거 (2026-08-04에 /campaign/chuseok-4days로 배선된 항목)

### 4. `src/lib/campaigns.ts`
- [ ] `chuseok-4days-2026` 캠페인 `active: false` 복귀 (8월 말 활성화했던 경우)
      — 항목 자체는 2027 추석 재사용 가능하므로 삭제 대신 비활성 보관

### 5. `/campaign/chuseok-4days` 라우트·sitemap
- [ ] 페이지 유지 여부 판단: 유지 시 상단에 "2026 연휴 종료" 안내 추가, 제거 시
      `src/app/sitemap.ts`의 캠페인 URL 하드코딩 배열에서 제거 + 라우트 삭제(`rm -rf .next` 캐시 주의)
- [ ] 아티클 내부의 "9/24~9/27" 팩트스트립·항공 조언 문구가 과거형이 되므로 유지 시 문구 점검

### 6. 검증
- [ ] tsc 단독 실행 · lint 0/0 · build
- [ ] 홈에서 추석 노출 0 확인 (스포트라이트·티커·배너)
- [ ] 헬스체크 `page:chuseok-4days` — 라우트 제거 시 CHECKS에서도 제거
- [ ] 프로덕션 스모크 후 태그 `chuseok-teardown-2026-YYYYMMDD`

## 참고 — 시즌 활성화 절차 (8월 말, 운영자 승인 후)
- `src/lib/campaigns.ts` `chuseok-4days-2026`의 `active: false → true` 토글 1줄
- HouseBanner는 `getActiveCampaigns()[0]` 단일 노출 — 배열 선두라 토글 즉시 추석 배너로 교체됨
