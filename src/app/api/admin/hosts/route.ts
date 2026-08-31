import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  sendHostApprovedEmail,
  sendListingApprovedEmail,
  sendListingRejectedEmail,
} from '@/lib/email/hostNotifications'

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
    // 알림 메일용 — 상태가 실제로 바뀔 때만 발송(같은 상태 재저장 시 중복 발송 방지)
    const { data: prevHost } = await admin.from('hosts').select('status, contact_email, display_name').eq('id', id).single()
    const update: Record<string, unknown> = {}
    if (status !== undefined) update.status = status
    if (admin_memo !== undefined) update.admin_memo = String(admin_memo).slice(0, 2000)
    const { error } = await admin.from('hosts').update(update).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (status === 'approved' && prevHost && prevHost.status !== 'approved' && prevHost.contact_email) {
      await sendHostApprovedEmail(prevHost.contact_email, prevHost.display_name ?? '호스트')
    }
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

    // 알림 메일용 이전 상태 + 호스트 연락처 (상태 변경 시에만 발송)
    const { data: prevListing } = await admin
      .from('host_listings')
      .select('status, slug, city, title, host_id')
      .eq('id', id)
      .single()

    // 승인 시 슬러그 부여 — 없으면 city-title 기반 자동 생성 + 중복 시 숫자 접미
    if (status === 'approved') {
      const row = prevListing
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

    // 승인/반려 알림 — 상태가 실제로 바뀐 경우에만 (메일 실패는 검수 처리에 영향 없음, hostNotifications 내부 fail-open)
    if (prevListing && status !== undefined && prevListing.status !== status && (status === 'approved' || status === 'rejected')) {
      const { data: hostRow } = await admin.from('hosts').select('contact_email, display_name').eq('id', prevListing.host_id).single()
      if (hostRow?.contact_email) {
        if (status === 'approved') {
          const finalSlug = (update.slug as string | undefined) ?? prevListing.slug
          if (finalSlug) {
            await sendListingApprovedEmail(hostRow.contact_email, hostRow.display_name ?? '호스트', prevListing.title, finalSlug)
          }
        } else {
          await sendListingRejectedEmail(
            hostRow.contact_email,
            hostRow.display_name ?? '호스트',
            prevListing.title,
            admin_memo !== undefined ? String(admin_memo).slice(0, 2000) : undefined,
          )
        }
      }
    }
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
}
