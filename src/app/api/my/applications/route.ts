import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/my/applications — 로그인 사용자 본인의 신청 내역만 반환
// 서버에서 getUser()로 신원 확인 후 user_id 필터를 강제하므로,
// applications 테이블 RLS 적용 여부와 무관하게 타인 데이터가 새지 않는다.
// PII(전화·이메일 등)는 반환하지 않고 화면 표시에 필요한 컬럼만 select.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('applications')
    .select('id, program_id, programs(title), job_type, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('my applications error:', error)
    return NextResponse.json({ error: '신청 내역을 불러오지 못했습니다.' }, { status: 500 })
  }

  return NextResponse.json({ applications: data ?? [] })
}
