import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: '호스트 대시보드',
  robots: { index: false, follow: false },
}

// ─────────────────────────────────────────────────────────────────────────────
// 서버 가드 (2026-08-13 host-self-service-p2 — mypage 가드와 동일 패턴)
// 비로그인자에게 대시보드 UI 셸을 서빙하지 않는다. 화이트리스트 없음(로그인 전원 통과).
// 데이터 접근 자체는 RLS가 강제(본인 행만) — 이 가드는 UI 셸 노출 차단용.
// ─────────────────────────────────────────────────────────────────────────────

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/host/dashboard')

  return <>{children}</>
}
