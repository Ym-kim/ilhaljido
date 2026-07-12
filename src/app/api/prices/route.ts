import { NextResponse } from 'next/server'
import { PRICE_SOURCES, parsePrice } from '@/lib/priceWatch'

// ─────────────────────────────────────────────────────────────────────────────
// 일일 가격 갱신 API — GET /api/prices
//
// force-static + revalidate 86400 = Vercel이 하루 1회 재생성(1일 1회 조회).
// 응답: { prices: { [id]: "₩365,766~" }, checkedAt }
// 파싱 실패 항목은 prices에서 빠짐 → 클라이언트는 정적 priceFrom 폴백.
// 새 감시 대상은 src/lib/priceWatch.ts PRICE_SOURCES에만 추가.
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-static'
export const revalidate = 86400
export const maxDuration = 60

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

async function fetchPrice(source: (typeof PRICE_SOURCES)[number]): Promise<[string, string] | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12_000)
  try {
    // cache 옵션 없음 — force-static 세그먼트의 revalidate(86400)를 따라 하루 1회만 실조회
    const res = await fetch(source.url, {
      headers: { 'user-agent': UA, accept: 'text/html,*/*' },
      signal: controller.signal,
    })
    if (!res.ok) return null
    const html = await res.text()
    const price = parsePrice(source.kind, html)
    return price ? [source.id, price] : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function GET() {
  const results = await Promise.all(PRICE_SOURCES.map(fetchPrice))
  const prices = Object.fromEntries(results.filter((r): r is [string, string] => r !== null))

  return NextResponse.json({
    prices,
    checkedAt: new Date().toISOString(),
  })
}
