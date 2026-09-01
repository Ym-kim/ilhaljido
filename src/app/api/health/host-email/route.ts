import { NextResponse } from 'next/server'
import {
  sendHostApprovedEmail,
  sendListingApprovedEmail,
  sendListingRejectedEmail,
} from '@/lib/email/hostNotifications'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트 알림 메일 발송 테스트 — GET /api/health/host-email
//
// 목적: **실제 호스트를 건드리지 않고** 메일 3종의 실발송을 확인한다.
// /admin/hosts에서 승인 토글로 QA하려면 실명 호스트를 '중지 → 재승인' 해야 하는데,
// 그러면 실제 사용자에게 메일이 나가고 잠시 중지 상태가 된다. 그래서 이 경로를 만들었다.
//
// 🔒 안전장치 (바꾸지 말 것)
//  1) **프로덕션에서는 동작하지 않는다** — VERCEL_ENV === 'production'이면 즉시 거부.
//     Preview/개발에서만 쓴다
//  2) **수신자는 우리 회사 주소로 하드코딩** — 외부 입력을 받지 않으므로 스팸 중계로 악용 불가
//  3) **DB를 전혀 건드리지 않는다** — hosts/host_listings 테이블 무관
//  4) force-dynamic — 빌드 중에 실행되어 메일이 나가는 일을 막는다
//  5) 60초 쿨다운 — 실수로 새로고침을 반복해도 메일이 쏟아지지 않는다
//
// 확인되는 것: Resend 인증(RESEND_API_KEY)·도메인 인증·템플릿 3종 실제 렌더
// 확인되지 않는 것: 관리자 토글 → 발송 연결 구간(그 부분은 route.ts 코드로 검증됨)
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic'
export const maxDuration = 30

/** 우리 회사 공개 주소 — 외부 입력을 받지 않는다 */
const TEST_RECIPIENT = 'wakation.sf@gmail.com'
const COOLDOWN_MS = 60_000

let lastRunAt = 0

export async function GET() {
  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.json(
      { ok: false, reason: 'disabled_in_production', hint: 'Preview 배포에서만 동작합니다' },
      { status: 403 },
    )
  }

  const now = Date.now()
  if (now - lastRunAt < COOLDOWN_MS) {
    return NextResponse.json({
      ok: false,
      reason: 'cooldown',
      retryAfterSeconds: Math.ceil((COOLDOWN_MS - (now - lastRunAt)) / 1000),
    })
  }
  lastRunAt = now

  // 실제 검수에서 쓰이는 함수를 그대로 호출한다(템플릿이 갈라지지 않도록)
  const hostApproved = await sendHostApprovedEmail(TEST_RECIPIENT, '테스트 호스트')
  const listingApproved = await sendListingApprovedEmail(
    TEST_RECIPIENT,
    '테스트 호스트',
    '테스트 리스팅 (발송 확인용)',
    'test-listing-qa',
  )
  const listingRejected = await sendListingRejectedEmail(
    TEST_RECIPIENT,
    '테스트 호스트',
    '테스트 리스팅 (발송 확인용)',
    '발송 테스트입니다. 실제 보완 요청이 아닙니다.',
  )

  const results = { hostApproved, listingApproved, listingRejected }
  const allOk = Object.values(results).every((r) => r.ok)

  return NextResponse.json({
    ok: allOk,
    recipient: TEST_RECIPIENT,
    results,
    note: allOk
      ? '3통 발송됨 — 수신함을 확인하세요'
      : 'skipped:true 면 RESEND_API_KEY 미설정, status 4xx면 Resend가 거부한 것',
    checkedAt: new Date().toISOString(),
  })
}
