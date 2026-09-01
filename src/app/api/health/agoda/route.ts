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
//
// ⚠️ 2026-09-01: 키의 '모양'(길이·UUID 여부)을 반환하던 keyShape 필드를 제거했다.
//    Preview 디버깅용으로 넣었는데 프로덕션에 함께 올라가 공개 노출됐다. 키 값 자체는
//    담기지 않았지만, 진단용 정보를 공개 엔드포인트에 남길 이유가 없다.
//    다시 필요하면 Preview 브랜치에서만 임시로 넣고 머지하지 말 것.
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-static'
export const revalidate = 900
export const maxDuration = 30

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
