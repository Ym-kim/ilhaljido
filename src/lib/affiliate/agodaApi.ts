import 'server-only'

// ─────────────────────────────────────────────────────────────────────────────
// 아고다 Affiliate Lite (Long Tail Search) API 클라이언트 — 서버 전용
//
// 사양 출처: 아고다 공식 `Affiliate_Lite_API_V2.0.pdf` (v1.0, 2018-02-07) 원문 판독.
// 요청 정리는 docs/AGODA_API_REQUEST.md 참조.
//
// 🔐 보안 원칙 (바꾸지 말 것)
// - 'server-only' 임포트로 클라이언트 번들 유입을 빌드 단계에서 차단한다.
// - API 키는 절대 로그·응답·에러 메시지에 담지 않는다. 진단은 상태코드와 건수만 노출.
// - ⚠️ **HTTPS로만 호출한다.** 공식 문서의 기본 엔드포인트는 http:// 이고, HTTPS 사용은
//   "담당 매니저 문의" 사항이다. 평문 HTTP로 키를 보내면 키가 그대로 노출되므로,
//   HTTPS가 실패해도 **HTTP로 폴백하지 않는다.** 실패는 실패로 보고한다.
// ─────────────────────────────────────────────────────────────────────────────

const ENDPOINT = 'https://affiliateapi7643.agoda.com/affiliateservice/lt_v1'

/** 링크에 쓰는 cid와 동일한 값이 siteId다 (문서상 Authorization은 `siteid:apikey`) */
const SITE_ID = '1968994'

export type AgodaHotel = {
  hotelId: number
  hotelName: string
  /** 1박 요금 (요청한 currency 기준) */
  dailyRate: number
  /** 할인 전 요금 — 없을 수 있다 */
  crossedOutRate?: number
  discountPercentage?: number
  currency: string
  starRating?: number
  reviewScore?: number
  freeWifi?: boolean
  includeBreakfast?: boolean
  imageURL?: string
  /** 우리 cid가 박힌 예약 링크 — 직접 조립하지 말고 이 값을 그대로 쓸 것 */
  landingURL: string
}

export type AgodaSearchOutcome =
  | { ok: true; hotels: AgodaHotel[] }
  | { ok: false; reason: 'missing_key' | 'http_error' | 'bad_payload' | 'network'; status?: number }

type SearchInput = {
  cityId: number
  checkInDate: string   // YYYY-MM-DD
  checkOutDate: string  // YYYY-MM-DD
  /** 사이트 언어를 그대로 넘길 수 있다 — 문서상 ko-kr·en-us·ja-jp 전부 지원 */
  language?: 'ko-kr' | 'en-us' | 'ja-jp'
  currency?: string
  maxResult?: number
  adults?: number
  children?: number
}

/** 응답 1건이 우리가 쓸 수 있는 형태인지 검사 — 형태가 다르면 조용히 버린다(추정 금지) */
function toHotel(raw: unknown): AgodaHotel | null {
  if (typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  const hotelId = typeof r.hotelId === 'number' ? r.hotelId : null
  const dailyRate = typeof r.dailyRate === 'number' ? r.dailyRate : null
  const currency = typeof r.currency === 'string' ? r.currency : null
  const landingURL = typeof r.landingURL === 'string' ? r.landingURL : null
  const hotelName = typeof r.hotelName === 'string' ? r.hotelName : null
  if (hotelId === null || dailyRate === null || !currency || !landingURL || !hotelName) return null
  return {
    hotelId,
    hotelName,
    dailyRate,
    crossedOutRate: typeof r.crossedOutRate === 'number' ? r.crossedOutRate : undefined,
    discountPercentage: typeof r.discountPercentage === 'number' ? r.discountPercentage : undefined,
    currency,
    starRating: typeof r.starRating === 'number' ? r.starRating : undefined,
    reviewScore: typeof r.reviewScore === 'number' ? r.reviewScore : undefined,
    freeWifi: typeof r.freeWifi === 'boolean' ? r.freeWifi : undefined,
    includeBreakfast: typeof r.includeBreakfast === 'boolean' ? r.includeBreakfast : undefined,
    imageURL: typeof r.imageURL === 'string' ? r.imageURL : undefined,
    landingURL,
  }
}

export async function searchAgodaCity(input: SearchInput): Promise<AgodaSearchOutcome> {
  // 붙여넣기 과정에서 앞뒤 공백·줄바꿈이 딸려오는 일이 잦고, 그러면 인증이 조용히 실패한다
  const apiKey = process.env.AGODA_API_KEY?.trim()
  if (!apiKey) return { ok: false, reason: 'missing_key' }

  const body = {
    criteria: {
      additional: {
        currency: input.currency ?? 'KRW',
        discountOnly: false,
        language: input.language ?? 'ko-kr',
        maxResult: input.maxResult ?? 10,
        minimumReviewScore: 0,
        minimumStarRating: 0,
        occupancy: { numberOfAdult: input.adults ?? 2, numberOfChildren: input.children ?? 0 },
        sortBy: 'PriceAsc',
      },
      checkInDate: input.checkInDate,
      checkOutDate: input.checkOutDate,
      cityId: input.cityId,
    },
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12_000)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        // 문서: Authorization 헤더에 siteid와 apikey를 콜론으로 이어 넣는다
        authorization: `${SITE_ID}:${apiKey}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!res.ok) return { ok: false, reason: 'http_error', status: res.status }

    const payload: unknown = await res.json()
    const results =
      typeof payload === 'object' && payload !== null && Array.isArray((payload as { results?: unknown }).results)
        ? (payload as { results: unknown[] }).results
        : null
    if (!results) return { ok: false, reason: 'bad_payload', status: res.status }

    return { ok: true, hotels: results.map(toHotel).filter((h): h is AgodaHotel => h !== null) }
  } catch {
    // 에러 객체를 그대로 흘리지 않는다 — 요청 헤더가 로그에 섞일 여지를 없앤다
    return { ok: false, reason: 'network' }
  } finally {
    clearTimeout(timer)
  }
}

/** 오늘 기준 N일 뒤 1박 — 진단·시세 조회에 쓰는 고정 창 */
export function nightWindow(daysAhead: number): { checkInDate: string; checkOutDate: string } {
  const start = new Date(Date.now() + daysAhead * 86_400_000)
  const end = new Date(start.getTime() + 86_400_000)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)
  return { checkInDate: fmt(start), checkOutDate: fmt(end) }
}
