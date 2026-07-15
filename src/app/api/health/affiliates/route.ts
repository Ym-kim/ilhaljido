import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ─────────────────────────────────────────────────────────────────────────────
// 제휴 링크·페이지 일일 헬스체크 — Vercel Cron (매일 06:00 UTC = 15:00 KST)
//
// 검사 대상은 이 파일의 CHECKS 목록. 링크 추가/교체 시 여기도 갱신할 것.
// 실패 항목이 있을 때만 applications 테이블(job_type='헬스체크 경고')에 기록
// → /admin 신청 목록에서 확인. 성공 시엔 아무것도 쓰지 않음 (Vercel 로그만).
//
// 보호: CRON_SECRET env가 설정돼 있으면 Authorization: Bearer 일치 필수.
// 미설정 시 개방 — 고정 URL만 검사하는 읽기 전용이라 악용 여지 낮음.
// ─────────────────────────────────────────────────────────────────────────────

export const maxDuration = 60

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

type Check = {
  id: string
  url: string
  /** 최종 URL이 이 문자열을 포함해야 정상 (리다이렉트 하이재킹 감지) */
  finalMustInclude?: string
  /** 이 상태코드는 정상으로 간주 (봇 차단 403 등) */
  okStatuses?: number[]
}

const CHECKS: Check[] = [
  // 핵심 페이지
  { id: 'page:home', url: 'https://www.wakation.kr/' },
  { id: 'page:hotel', url: 'https://www.wakation.kr/select/hotel' },
  { id: 'page:activity', url: 'https://www.wakation.kr/select/activity' },
  { id: 'page:esim', url: 'https://www.wakation.kr/select/esim' },
  { id: 'page:learn', url: 'https://www.wakation.kr/select/learn' },
  { id: 'page:onsen', url: 'https://www.wakation.kr/programs/onsen' },
  { id: 'page:collections', url: 'https://www.wakation.kr/collections' },
  { id: 'page:support', url: 'https://www.wakation.kr/programs/support' },
  { id: 'page:business', url: 'https://www.wakation.kr/business' },

  // 대표 제휴 링크 패턴 — aid/Allianceid 유실·리다이렉트 감지 (봇챌린지 202/403은 생존)
  { id: 'booking:searchresults', url: 'https://www.booking.com/searchresults.html?aid=7854081&ss=Tokyo', okStatuses: [200, 202, 403] },
  { id: 'trip:city-tokyo', url: 'https://kr.trip.com/hotels/tokyo-hotels-list-228/?Allianceid=9024807', finalMustInclude: 'trip.com', okStatuses: [200, 202, 403] },

  // 인프런 파트너스 홍보 링크 — 해외 IP(Vercel)에선 /en/course/로 리다이렉트되므로
  // 경로 대신 partners= 추적 파라미터 생존을 기준으로 판정 (2026-07-16 오탐 수정)
  { id: 'inflearn:gpts', url: 'https://inf.run/zXusL', finalMustInclude: 'partners=' },
  { id: 'inflearn:chatgpt', url: 'https://inf.run/4j6xb', finalMustInclude: 'partners=' },
  { id: 'inflearn:instagram', url: 'https://inf.run/xTxcg', finalMustInclude: 'partners=' },
  { id: 'inflearn:midjourney', url: 'https://inf.run/F6yGE', finalMustInclude: 'partners=' },
  { id: 'inflearn:smartstore', url: 'https://inf.run/QhWQH', finalMustInclude: 'partners=' },

  // Airalo Impact 추적 딥링크
  {
    id: 'airalo:japan',
    url: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    finalMustInclude: 'airalo.com',
  },

  // 크루즈 제휴 링크 (Trip.com, 전량 Allianceid) — 봇 차단 202/403은 생존으로 간주
  {
    id: 'cruise:msc-world-europa',
    url: 'https://kr.trip.com/cruises/ship-msc-cruises-msc-world-europa-944?curr=KRW&Allianceid=9024807',
    finalMustInclude: 'trip.com',
    okStatuses: [200, 202, 403],
  },
  {
    id: 'cruise:msc-bellissima',
    url: 'https://kr.trip.com/cruises/ship-msc-mscbellissima-496?curr=KRW&Allianceid=9024807',
    finalMustInclude: 'trip.com',
    okStatuses: [200, 202, 403],
  },
  {
    id: 'cruise:costa-serena',
    url: 'https://kr.trip.com/cruises/ship-costa-costaserena-35?curr=KRW&Allianceid=9024807',
    finalMustInclude: 'trip.com',
    okStatuses: [200, 202, 403],
  },

  // 대표 숙소 상세 (Booking) — 봇 챌린지 202도 생존으로 간주
  { id: 'booking:lyf-bangkok', url: 'https://www.booking.com/hotel/th/lyf-sukhumvit-8-bangkok.html', okStatuses: [200, 202, 403] },

  // Klook/KKday — 봇 차단 403이 정상. 404/5xx만 이상
  { id: 'klook:teamlab', url: 'https://www.klook.com/ko/activity/25300-teamlab-planets-toyosu-tokyo-ticket/?aid=126848', okStatuses: [200, 403] },
  { id: 'kkday:oasis-spa', url: 'https://www.kkday.com/ko/product/123986?cid=25833', okStatuses: [200, 403] },
]

async function runCheck(c: Check): Promise<{ id: string; ok: boolean; detail: string }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)
  try {
    const res = await fetch(c.url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: 'text/html,*/*' },
      signal: controller.signal,
      cache: 'no-store',
    })
    const okStatuses = c.okStatuses ?? [200]
    if (!okStatuses.includes(res.status)) {
      return { id: c.id, ok: false, detail: `HTTP ${res.status}` }
    }
    if (c.finalMustInclude && !res.url.includes(c.finalMustInclude)) {
      return { id: c.id, ok: false, detail: `리다이렉트 이탈 → ${res.url.slice(0, 120)}` }
    }
    return { id: c.id, ok: true, detail: `HTTP ${res.status}` }
  } catch (e) {
    return { id: c.id, ok: false, detail: e instanceof Error ? e.message.slice(0, 100) : 'fetch error' }
  } finally {
    clearTimeout(timer)
  }
}

export async function GET(req: Request) {
  // CRON_SECRET 설정 시에만 인증 강제
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  const results = await Promise.all(CHECKS.map(runCheck))
  const failures = results.filter((r) => !r.ok)

  // 실패 있을 때만 admin에서 보이도록 applications에 경고 기록
  if (failures.length > 0) {
    try {
      const admin = createAdminClient()
      const summary = failures.map((f) => `${f.id}: ${f.detail}`).join('\n')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (admin as any).from('applications').insert({
        name: '헬스체크 봇',
        phone: '-',
        email: 'system@wakation.kr',
        job_type: '헬스체크 경고',
        message: `[자동 점검] 이상 ${failures.length}건\n${summary}`.slice(0, 1000),
        status: 'pending',
        interests: [],
        rest_preferences: [],
      })
    } catch (e) {
      console.error('healthcheck: failed to record warning', e)
    }
  }

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    total: results.length,
    failures: failures.length,
    results,
  })
}
