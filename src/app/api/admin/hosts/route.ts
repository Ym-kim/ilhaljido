import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트·리스팅 검수 API (P2, 2026-08-13) — /api/admin/applications 와 동일 가드 패턴
// GET: hosts + host_listings 전체 / PATCH: 호스트 승인·중지, 리스팅 승인(슬러그 부여)·반려
// 승인·반려는 service role로만 가능(RLS상 호스트는 자기 status를 approved로 못 바꿈)
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email || !ADMIN_EMAILS.includes(user.email)) return null
  return user
}

export async function GET() {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const admin = createAdminClient()
  const [hosts, listings] = await Promise.all([
    admin.from('hosts').select('*').order('created_at', { ascending: false }),
    admin.from('host_listings').select('*').order('created_at', { ascending: false }),
  ])
  if (hosts.error) return NextResponse.json({ error: hosts.error.message }, { status: 500 })
  if (listings.error) return NextResponse.json({ error: listings.error.message }, { status: 500 })
  return NextResponse.json({ hosts: hosts.data, listings: listings.data })
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

export async function PATCH(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await req.json()
  const { kind, id, status, admin_memo, slug } = body as {
    kind?: string
    id?: string
    status?: string
    admin_memo?: string
    slug?: string
  }
  if (!id || typeof id !== 'string' || !kind) {
    return NextResponse.json({ error: 'Missing kind/id' }, { status: 400 })
  }

  const admin = createAdminClient()

  if (kind === 'host') {
    const valid = ['pending', 'approved', 'suspended']
    if (status !== undefined && !valid.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }
    const update: Record<string, unknown> = {}
    if (status !== undefined) update.status = status
    if (admin_memo !== undefined) update.admin_memo = String(admin_memo).slice(0, 2000)
    const { error } = await admin.from('hosts').update(update).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  if (kind === 'listing') {
    const valid = ['draft', 'submitted', 'approved', 'rejected']
    if (status !== undefined && !valid.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }
    const update: Record<string, unknown> = {}
    if (status !== undefined) update.status = status
    if (admin_memo !== undefined) update.admin_memo = String(admin_memo).slice(0, 2000)

    // 승인 시 슬러그 부여 — 없으면 city-title 기반 자동 생성 + 중복 시 숫자 접미
    if (status === 'approved') {
      const { data: row } = await admin.from('host_listings').select('slug, city, title').eq('id', id).single()
      if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      if (!row.slug) {
        let base = slug && typeof slug === 'string' ? slugify(slug) : slugify(`${row.city}-${row.title}`)
        if (!base) base = `stay-${id.slice(0, 8)}`
        let candidate = base
        for (let i = 2; i < 20; i++) {
          const { data: exists } = await admin.from('host_listings').select('id').eq('slug', candidate).maybeSingle()
          if (!exists) break
          candidate = `${base}-${i}`
        }
        update.slug = candidate
      }
    }

    const { error } = await admin.from('host_listings').update(update).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
}
