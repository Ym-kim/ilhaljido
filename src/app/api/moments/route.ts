import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ApplicationInsert } from '@/types/database'

const SAFE_TEXT = /^[^<>\u0000-\u0008\u000B\u000C\u000E-\u001F]*$/u
const TRIP_TYPES = new Set(['solo', 'friends', 'couple', 'family', 'workation', 'long_stay'])

type MomentSubmission = {
  nickname: string
  destination: string
  visitedAt?: string
  tripType: string
  title: string
  summary: string
  story: string
  workTip?: string
  photoLink?: string
  photoRightsConfirmed: boolean
  privacyConsent: boolean
}

function cleanText(value: unknown, max: number, required = false) {
  if (typeof value !== 'string') return required ? null : ''
  const cleaned = value.trim()
  if ((required && !cleaned) || cleaned.length > max || !SAFE_TEXT.test(cleaned)) return null
  return cleaned
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ error: '로그인 후 작성할 수 있습니다.' }, { status: 401 })
  }

  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 })
  }

  const nickname = cleanText(raw.nickname, 40, true)
  const destination = cleanText(raw.destination, 50, true)
  const visitedAt = cleanText(raw.visitedAt, 7)
  const title = cleanText(raw.title, 70, true)
  const summary = cleanText(raw.summary, 180, true)
  const story = cleanText(raw.story, 520, true)
  const workTip = cleanText(raw.workTip, 180)
  const photoLink = cleanText(raw.photoLink, 500)
  const tripType = typeof raw.tripType === 'string' ? raw.tripType : ''
  const photoRightsConfirmed = raw.photoRightsConfirmed === true
  const privacyConsent = raw.privacyConsent === true

  if ([nickname, destination, title, summary, story].some((value) => value === null) || workTip === null || photoLink === null) {
    return NextResponse.json({ error: '입력값과 글자 수를 확인해주세요.' }, { status: 400 })
  }
  if (!TRIP_TYPES.has(tripType) || !privacyConsent) {
    return NextResponse.json({ error: '여행 방식과 필수 동의를 확인해주세요.' }, { status: 400 })
  }
  if (visitedAt && !/^\d{4}-(0[1-9]|1[0-2])$/.test(visitedAt)) {
    return NextResponse.json({ error: '여행 시기는 YYYY-MM 형식으로 입력해주세요.' }, { status: 400 })
  }
  if (photoLink) {
    try {
      const url = new URL(photoLink)
      if (!['http:', 'https:'].includes(url.protocol) || !photoRightsConfirmed) throw new Error('invalid photo')
    } catch {
      return NextResponse.json({ error: '사진 링크와 사용 권한 확인을 확인해주세요.' }, { status: 400 })
    }
  }

  const submission: MomentSubmission = {
    nickname: nickname!,
    destination: destination!,
    visitedAt: visitedAt || undefined,
    tripType,
    title: title!,
    summary: summary!,
    story: story!,
    workTip: workTip || undefined,
    photoLink: photoLink || undefined,
    photoRightsConfirmed,
    privacyConsent,
  }

  const admin = createAdminClient()
  const tenMinutesAgo = new Date(Date.now() - 10 * 60_000).toISOString()
  const { count } = await admin
    .from('applications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('job_type', 'traveler_note')
    .gte('created_at', tenMinutesAgo)
  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: '작성 요청이 많습니다. 잠시 후 다시 시도해주세요.' }, { status: 429 })
  }

  const message = `[TRAVELER_NOTE_V1]\n${JSON.stringify(submission)}`
  const applicationData: ApplicationInsert = {
    program_id: null,
    user_id: user.id,
    name: submission.nickname,
    phone: user.phone ?? 'member-account',
    email: user.email.toLowerCase(),
    job_type: 'traveler_note',
    work_style: null,
    interests: [submission.destination],
    rest_preferences: [],
    duration_preference: submission.visitedAt ?? null,
    budget_range: submission.tripType,
    message,
    status: 'pending',
    admin_memo: null,
  }

  const { data, error } = await admin
    .from('applications')
    .insert(applicationData)
    .select('id')
    .single()

  if (error) {
    console.error('traveler note submission error:', error)
    return NextResponse.json({ error: '여행 노트를 접수하지 못했습니다.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
