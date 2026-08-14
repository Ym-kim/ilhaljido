import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ─────────────────────────────────────────────────────────────────────────────
// 회원 탈퇴 (2026-08-13 mypage-account-settings)
// - getUser fail-closed로 본인 확인 후 service role로 auth 사용자 삭제
// - 연쇄 효과(DB 스키마에 정의됨): applications.user_id는 ON DELETE SET NULL
//   (신청 기록은 보존, 계정 연결만 해제 — 20260624_expand 마이그레이션 주석 참조),
//   hosts는 ON DELETE CASCADE → host_listings까지 함께 삭제
// - 클라이언트는 성공 후 signOut + 홈 이동
// ─────────────────────────────────────────────────────────────────────────────

export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { error } = await admin.auth.admin.deleteUser(user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
