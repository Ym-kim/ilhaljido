import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

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
  const { data, error } = await admin
    .from('applications')
    .select('*, programs(title, location)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await req.json()
  const { id, status, admin_memo } = body

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const validStatuses = ['pending', 'contacted', 'confirmed', 'cancelled']
  if (status !== undefined && !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const update: Record<string, unknown> = {}
  if (status !== undefined) update.status = status
  if (admin_memo !== undefined) update.admin_memo = String(admin_memo).slice(0, 2000)

  const admin = createAdminClient()
  const { error } = await admin.from('applications').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
