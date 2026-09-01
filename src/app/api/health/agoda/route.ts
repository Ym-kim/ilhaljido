import { NextResponse } from 'next/server'
import { searchAgodaCity, nightWindow } from '@/lib/affiliate/agodaApi'
import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'

// ─────────────────────────────────────────────────────────────────────────────
// 아고다 API 진단 — GET /api/health/agoda
//
// 목적: 발급받은 키가 실제로 동작하는지, HTTPS 엔드포인트가 열려 있는지 확인한다.
// 도쿄 1개 도시로 1박만 조회하고 **요약 지표만** 반환한다.
//
// 🔐 키·호텔 상세·landingURL을 응답에 담지 않는다(키 유출/무단 사용 방지).
// force-static + revalidate 900 = 요청이 몰려도 15분에 1회만 실조회 → 쿼터 남용 불가.
//
// 판정:
//   ok:true                → 키·엔드포인트 정상. 연동 진행 가능
//   missing_key            → Vercel 환경변수 AGODA_API_KEY 미설정(또는 배포 전)
//   http_error 401/403     → 키가 틀렸거나 이 사이트에 권한이 없음
//   network                → HTTPS 엔드포인트가 막힘 → 담당 매니저에게 HTTPS 승인 요청 필요
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-static'
export const revalidate = 900
export const maxDuration = 30

// 401이 났을 때 원인을 좁히기 위한 키 '모양' 진단.
// 🔐 키 값·앞뒤 일부 문자를 포함해 **내용은 일절 노출하지 않는다.** 길이와 형식 판정만 반환한다.
// 공식 문서의 apikey 예시는 UUID 형태(00000000-0000-0000-0000-000000000000)다.
function describeKeyShape() {
  const raw = process.env.AGODA_API_KEY
  if (!raw) return { present: false }
  const trimmed = raw.trim()
  return {
    present: true,
    length: trimmed.length,
    hasSurroundingWhitespace: raw !== trimmed,
    looksLikeUuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed),
  }
}

export async function GET() {
  const cityId = AGODA_CITY_IDS['japan-tokyo']
  const window = nightWindow(30)
  const outcome = await searchAgodaCity({ cityId, ...window, maxResult: 5 })
  const checkedAt = new Date().toISOString()

  if (!outcome.ok) {
    return NextResponse.json({
      ok: false,
      reason: outcome.reason,
      status: outcome.status ?? null,
      cityId,
      keyShape: describeKeyShape(),
      checkedAt,
    })
  }

  const rates = outcome.hotels.map((h) => h.dailyRate)
  return NextResponse.json({
    ok: true,
    cityId,
    resultCount: outcome.hotels.length,
    currency: outcome.hotels[0]?.currency ?? null,
    // 최저가만 노출 — 호텔명·링크는 담지 않는다
    lowestDailyRate: rates.length ? Math.min(...rates) : null,
    landingUrlHasCid: outcome.hotels.every((h) => h.landingURL.includes('cid=1968994')),
    checkedAt,
  })
}
