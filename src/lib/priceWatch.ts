// ─────────────────────────────────────────────────────────────────────────────
// 일일 가격 감시 — /api/prices에서 사용 (서버 전용 파싱 로직)
//
// 대상: 서버에서 실제 가격이 HTML에 노출되는 파트너만
//   - Trip.com 크루즈: "price":123456 (내장 JSON) + "1,234,567원" 텍스트
//   - Airalo eSIM: "$11.50 USD" 텍스트
// Booking(봇챌린지 202)·Klook/KKday(403)는 서버 검증 불가 → 대상 제외,
// 운영자가 대시보드 가격을 주면 정적 priceFrom으로 반영하는 기존 루프 유지.
//
// 실패 시 null 반환 → 화면은 정적 priceFrom(마지막 실측값)으로 폴백.
// ─────────────────────────────────────────────────────────────────────────────

export type PriceKind = 'trip-krw' | 'airalo-usd'

export type PriceSource = {
  /** AffiliateItem.id 또는 DestinationEntry.id 와 일치해야 화면에 반영됨 */
  id: string
  url: string
  kind: PriceKind
}

export const PRICE_SOURCES: PriceSource[] = [
  // Trip.com 크루즈 (FEATURED_CRUISES)
  {
    id: 'cruise-rci-singapore',
    url: 'https://kr.trip.com/cruises/line-140351-singapore-greater-china-3night-navigator-of-the-seas-rci/?departure=2027-02-01&locale=ko-KR',
    kind: 'trip-krw',
  },
  {
    id: 'cruise-msc-world-europa',
    url: 'https://kr.trip.com/cruises/ship-msc-cruises-msc-world-europa-944?curr=KRW',
    kind: 'trip-krw',
  },
  {
    id: 'cruise-msc-bellissima',
    url: 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW',
    kind: 'trip-krw',
  },
  {
    id: 'cruise-costa-serena',
    url: 'https://kr.trip.com/cruises/ship-costa-costaserena-35?curr=KRW',
    kind: 'trip-krw',
  },
  // Airalo eSIM (ESIM_DESTINATIONS — 태그 첫 항목 교체)
  { id: 'esim-japan', url: 'https://www.airalo.com/japan-esim', kind: 'airalo-usd' },
  { id: 'esim-vietnam', url: 'https://www.airalo.com/vietnam-esim', kind: 'airalo-usd' },
  { id: 'esim-indonesia', url: 'https://www.airalo.com/indonesia-esim', kind: 'airalo-usd' },
  { id: 'esim-portugal', url: 'https://www.airalo.com/portugal-esim', kind: 'airalo-usd' },
  { id: 'esim-korea', url: 'https://www.airalo.com/south-korea-esim', kind: 'airalo-usd' },
]

/** HTML에서 최저가 추출 — 실패·비정상 범위는 null (화면은 정적값 폴백) */
export function parsePrice(kind: PriceKind, html: string): string | null {
  const nums: number[] = []

  if (kind === 'trip-krw') {
    // 내장 JSON: "price":362503
    for (const m of html.matchAll(/"price":(\d{5,9})(?!\d)/g)) {
      nums.push(Number(m[1]))
    }
    // 텍스트: 365,766원
    for (const m of html.matchAll(/([\d]{1,3}(?:,\d{3}){1,3})원/g)) {
      nums.push(Number(m[1].replace(/,/g, '')))
    }
    // 크루즈 요금으로 그럴듯한 범위만 (마일리지·건수 등 노이즈 제거)
    const valid = nums.filter((n) => n >= 50_000 && n <= 30_000_000)
    if (valid.length === 0) return null
    return `₩${Math.min(...valid).toLocaleString('ko-KR')}~`
  }

  // airalo-usd — 실제 선택 가능한 플랜 버튼만: aria-label="Select Unlimited - 3 days for $11.50 USD."
  // (페이지 상단 "from $4.00" 마케팅 문구·타국 추천가가 잡히는 오탐 방지 — 2026-07-13 확인)
  for (const m of html.matchAll(/aria-label="Select [^"]*?for \$(\d{1,3}(?:\.\d{1,2})?) USD/g)) {
    nums.push(Number(m[1]))
  }
  const valid = nums.filter((n) => n >= 1 && n <= 500)
  if (valid.length === 0) return null
  return `US$${Math.min(...valid).toFixed(2)}~`
}
