import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: '마이페이지',
  robots: { index: false, follow: false },
}

// ─────────────────────────────────────────────────────────────────────────────
// 서버 가드 (sec/mypage-layout-guard-v1, 2026-07-27 — admin 가드와 동일 패턴)
// 비로그인자에게 마이페이지 UI 셸을 서빙하지 않는다. admin과 달리 화이트리스트
// 검사 없음(로그인 사용자 전원 통과). 데이터는 기존대로 /api/my/applications가
// 서버에서 getUser+user_id 강제. page.tsx 클라이언트 가드는 이중 방어로 유지.
// ─────────────────────────────────────────────────────────────────────────────

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/mypage')

  return <>{children}</>
}
