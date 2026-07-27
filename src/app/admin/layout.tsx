import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: '관리자',
  robots: { index: false, follow: false },
}

// ─────────────────────────────────────────────────────────────────────────────
// 서버 가드 (sec/admin-layout-guard-v1, 2026-07-27 — 보안 감사 미결 항목 해소)
// 비인증/비관리자에게 관리자 UI 셸(HTML) 자체를 서빙하지 않는다.
// 검증 경로는 /api/admin/applications의 checkAdmin과 동일(createClient+getUser
// fail-closed+ADMIN_EMAILS 서버 화이트리스트) — 신규 인증 로직 없음.
// page.tsx의 클라이언트 가드는 이중 방어로 유지.
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

// Admin은 일반 Navbar/Footer 없이 독립 레이아웃
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 비로그인(또는 세션 검증 실패 — fail-closed) → 로그인으로
  if (!user) redirect('/login?redirect=/admin')
  // 로그인했지만 관리자 화이트리스트 외 → 홈으로
  if (!user.email || !ADMIN_EMAILS.includes(user.email)) redirect('/')

  return <>{children}</>
}
