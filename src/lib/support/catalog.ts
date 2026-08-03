import { getSupportPrograms } from '@/lib/i18n/data'
import type { Lang } from '@/lib/i18n/types'

export type SupportDiscoveryStatus =
  | 'open'
  | 'closing_soon'
  | 'always_open'
  | 'upcoming'
  | 'closed'
  | 'ended'
  | 'needs_review'

export type SupportCategory = 'short_trip' | 'week_stay' | 'long_stay' | 'workation' | 'regional_project'
export type SupportDuration = 'short' | 'week' | 'long' | 'flexible'
export type SupportType =
  | 'cash_reimbursement'
  | 'local_currency'
  | 'accommodation'
  | 'transport'
  | 'meal'
  | 'activity'
  | 'workspace'

export type SupportRegion =
  | 'nationwide'
  | 'seoul_incheon_gyeonggi'
  | 'gangwon'
  | 'chungcheong'
  | 'jeolla'
  | 'gyeongsang'
  | 'jeju'

type SupportProfile = {
  id: string
  category: SupportCategory
  duration: SupportDuration
  regionGroup: SupportRegion
  supportTypes: SupportType[]
  verifiedAt: string
  applicationStart?: string
  applicationEnd?: string
  travelStart?: string
  travelEnd?: string
  stayNightsMin?: number
  stayNightsMax?: number
  participantMin?: number
  participantMax?: number
  selectionType?: 'first_come' | 'lottery' | 'review' | 'unknown'
  snsRequired?: boolean
  soloEligible?: boolean
  foreignerEligibility: 'eligible' | 'not_eligible' | 'unknown'
}

const PROFILE_DEFAULTS = {
  foreignerEligibility: 'unknown' as const,
  selectionType: 'unknown' as const,
}

// Existing verified SUPPORT_PROGRAMS remains the source of public copy and URLs.
// This layer only adds machine-readable discovery metadata; unknown facts stay unknown.
export const SUPPORT_PROFILES: SupportProfile[] = [
  { ...PROFILE_DEFAULTS, id: 'jeju-voucher', category: 'workation', duration: 'short', regionGroup: 'jeju', supportTypes: ['accommodation', 'workspace'], verifiedAt: '2026-07-18', stayNightsMin: 3 },
  { ...PROFILE_DEFAULTS, id: 'busan-workation', category: 'workation', duration: 'flexible', regionGroup: 'gyeongsang', supportTypes: ['workspace', 'activity'], verifiedAt: '2026-07-18' },
  { ...PROFILE_DEFAULTS, id: 'gangwon-workation', category: 'workation', duration: 'short', regionGroup: 'gangwon', supportTypes: ['accommodation', 'workspace', 'activity'], verifiedAt: '2026-07-18', stayNightsMin: 3, stayNightsMax: 3 },
  { ...PROFILE_DEFAULTS, id: 'muan-jeonnam', category: 'long_stay', duration: 'long', regionGroup: 'jeolla', supportTypes: ['accommodation'], verifiedAt: '2026-07-18', stayNightsMax: 90 },
  { ...PROFILE_DEFAULTS, id: 'rural-living', category: 'long_stay', duration: 'long', regionGroup: 'nationwide', supportTypes: ['accommodation', 'cash_reimbursement'], verifiedAt: '2026-07-18', snsRequired: true },
  { ...PROFILE_DEFAULTS, id: 'chungnam-month', category: 'long_stay', duration: 'long', regionGroup: 'chungcheong', supportTypes: ['accommodation', 'transport', 'meal', 'activity'], verifiedAt: '2026-07-26', travelStart: '2026-09-01', travelEnd: '2026-12-12', stayNightsMin: 6, stayNightsMax: 29 },
  { ...PROFILE_DEFAULTS, id: 'ulsan-ucation', category: 'workation', duration: 'short', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'activity', 'workspace'], verifiedAt: '2026-07-18' },
  { ...PROFILE_DEFAULTS, id: 'incheon-workation', category: 'workation', duration: 'short', regionGroup: 'seoul_incheon_gyeonggi', supportTypes: ['accommodation', 'workspace', 'activity'], verifiedAt: '2026-07-18', stayNightsMin: 2, soloEligible: true },
  { ...PROFILE_DEFAULTS, id: 'eochon-workation', category: 'workation', duration: 'flexible', regionGroup: 'nationwide', supportTypes: ['accommodation', 'workspace', 'meal', 'activity'], verifiedAt: '2026-07-18', soloEligible: true },
  { ...PROFILE_DEFAULTS, id: 'jeonbuk-worcation', category: 'workation', duration: 'short', regionGroup: 'jeolla', supportTypes: ['accommodation', 'workspace'], verifiedAt: '2026-07-18', stayNightsMin: 2, stayNightsMax: 2 },
  { ...PROFILE_DEFAULTS, id: 'jeonnam-blue-worcation', category: 'workation', duration: 'flexible', regionGroup: 'jeolla', supportTypes: ['accommodation', 'workspace', 'activity', 'transport'], verifiedAt: '2026-07-18' },
  { ...PROFILE_DEFAULTS, id: 'gyeongbuk-worcation', category: 'workation', duration: 'short', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'transport', 'activity'], verifiedAt: '2026-07-19', stayNightsMin: 2 },
  { ...PROFILE_DEFAULTS, id: 'gyeonggi-healing-worcation', category: 'workation', duration: 'short', regionGroup: 'seoul_incheon_gyeonggi', supportTypes: ['accommodation', 'workspace'], verifiedAt: '2026-07-19', stayNightsMin: 2, stayNightsMax: 4 },
  { ...PROFILE_DEFAULTS, id: 'gyeongnam-namhae', category: 'long_stay', duration: 'long', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'activity'], verifiedAt: '2026-08-03', applicationStart: '2026-07-27', applicationEnd: '2026-08-07', travelStart: '2026-09-01', travelEnd: '2026-10-31', stayNightsMin: 4, stayNightsMax: 29, participantMin: 1, participantMax: 2, snsRequired: true, selectionType: 'review' },
  { ...PROFILE_DEFAULTS, id: 'gyeongnam-hamyang', category: 'long_stay', duration: 'long', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'activity'], verifiedAt: '2026-07-26', stayNightsMax: 29, participantMin: 1, participantMax: 2, snsRequired: true, selectionType: 'review' },
  { ...PROFILE_DEFAULTS, id: 'gyeongnam-tongyeong', category: 'long_stay', duration: 'long', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'activity'], verifiedAt: '2026-08-03', stayNightsMin: 6, stayNightsMax: 29, participantMin: 1, participantMax: 2, snsRequired: true, selectionType: 'review' },
  { ...PROFILE_DEFAULTS, id: 'gyeongnam-gimhae', category: 'long_stay', duration: 'long', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'activity'], verifiedAt: '2026-07-26', stayNightsMin: 5, stayNightsMax: 29, participantMin: 1, participantMax: 2, snsRequired: true, selectionType: 'review' },
  { ...PROFILE_DEFAULTS, id: 'yeongdeok-worcation', category: 'workation', duration: 'short', regionGroup: 'gyeongsang', supportTypes: ['accommodation', 'workspace', 'activity'], verifiedAt: '2026-07-28', travelEnd: '2026-11-27', stayNightsMin: 3, stayNightsMax: 3, soloEligible: true },
  { ...PROFILE_DEFAULTS, id: 'gangjin-fuso', category: 'long_stay', duration: 'long', regionGroup: 'jeolla', supportTypes: ['accommodation', 'activity'], verifiedAt: '2026-07-28', applicationStart: '2026-07-10', applicationEnd: '2026-08-24', stayNightsMin: 6, stayNightsMax: 29, snsRequired: true, selectionType: 'review' },
  { ...PROFILE_DEFAULTS, id: 'cheongju-miwon-forest', category: 'workation', duration: 'short', regionGroup: 'chungcheong', supportTypes: ['workspace'], verifiedAt: '2026-07-28', stayNightsMax: 3, soloEligible: true },
]

const PROFILE_BY_ID = new Map(SUPPORT_PROFILES.map((profile) => [profile.id, profile]))

export const SUPPORT_VERIFICATION_WARN_DAYS = 30
export const SUPPORT_VERIFICATION_STALE_DAYS = 45

function endOfKoreaDay(date: string) {
  return new Date(`${date}T23:59:59+09:00`)
}

export function getDaysUntil(date: string, now = new Date()) {
  return Math.max(0, Math.ceil((endOfKoreaDay(date).getTime() - now.getTime()) / 86_400_000))
}

export function getVerificationAgeDays(verifiedAt: string, now = new Date()) {
  return Math.max(0, Math.floor((now.getTime() - new Date(`${verifiedAt}T23:59:59+09:00`).getTime()) / 86_400_000))
}

function resolveStatus(
  rawStatus: ReturnType<typeof getSupportPrograms>[number]['status'],
  profile: SupportProfile,
  now = new Date(),
): SupportDiscoveryStatus {
  if (profile.travelEnd && endOfKoreaDay(profile.travelEnd).getTime() < now.getTime()) return 'ended'
  if (profile.applicationEnd) {
    const remaining = endOfKoreaDay(profile.applicationEnd).getTime() - now.getTime()
    if (remaining < 0) return 'closed'
    if (remaining <= 14 * 86_400_000) return 'closing_soon'
  }
  // 모집·상시·예정 상태는 45일 이상 재검증되지 않으면 공개 확정 표현을 낮춘다.
  // 프로그램을 삭제하지 않고 공식 공고 확인 상태로 유지해 오래된 정보의 오인을 막는다.
  if (getVerificationAgeDays(profile.verifiedAt, now) > SUPPORT_VERIFICATION_STALE_DAYS) return 'needs_review'
  if (rawStatus === 'open') return 'open'
  if (rawStatus === 'always') return 'always_open'
  if (rawStatus === 'upcoming') return 'upcoming'
  return 'needs_review'
}

export function getSupportCatalog(lang: Lang, now = new Date()) {
  return getSupportPrograms(lang).map((program) => {
    const profile = PROFILE_BY_ID.get(program.id)
    if (!profile) throw new Error(`Missing support profile: ${program.id}`)
    return {
      ...program,
      ...profile,
      slug: profile.id,
      officialSourceUrl: program.href,
      status: resolveStatus(program.status, profile, now),
      daysUntil: profile.applicationEnd ? getDaysUntil(profile.applicationEnd, now) : undefined,
    }
  })
}

export type SupportCatalogItem = ReturnType<typeof getSupportCatalog>[number]

export function getSupportProgram(slug: string, lang: Lang, now = new Date()) {
  return getSupportCatalog(lang, now).find((program) => program.slug === slug)
}

export type SupportCalendarEventKind = 'application_open' | 'application_close' | 'stay_start' | 'stay_end'

export type SupportCalendarEvent = {
  id: string
  date: string
  kind: SupportCalendarEventKind
  label: string
  programSlug: string
  programName: string
  region: string
  status: SupportDiscoveryStatus
  verifiedAt: string
  officialSourceUrl: string
}

export const SUPPORT_CALENDAR_LABELS: Record<SupportCalendarEventKind, Record<Lang, string>> = {
  application_open: { KO: '접수 시작', EN: 'Applications open', JP: '受付開始' },
  application_close: { KO: '접수 마감', EN: 'Applications close', JP: '受付締切' },
  stay_start: { KO: '여행·운영 시작', EN: 'Stay or program starts', JP: '旅行・運営開始' },
  stay_end: { KO: '여행·운영 종료', EN: 'Stay or program ends', JP: '旅行・運営終了' },
}

export function getSupportCalendarEvents(lang: Lang, now = new Date()): SupportCalendarEvent[] {
  const events: SupportCalendarEvent[] = []

  for (const program of getSupportCatalog(lang, now)) {
    const dates: Array<[SupportCalendarEventKind, string | undefined]> = [
      ['application_open', program.applicationStart],
      ['application_close', program.applicationEnd],
      ['stay_start', program.travelStart],
      ['stay_end', program.travelEnd],
    ]

    for (const [kind, date] of dates) {
      if (!date) continue
      events.push({
        id: `${program.slug}-${kind}`,
        date,
        kind,
        label: SUPPORT_CALENDAR_LABELS[kind][lang],
        programSlug: program.slug,
        programName: program.name,
        region: program.region,
        status: program.status,
        verifiedAt: program.verifiedAt,
        officialSourceUrl: program.officialSourceUrl,
      })
    }
  }

  return events.sort((a, b) => a.date.localeCompare(b.date) || a.programName.localeCompare(b.programName))
}

export const SUPPORT_STATUS_ORDER: Record<SupportDiscoveryStatus, number> = {
  closing_soon: 0,
  open: 1,
  always_open: 2,
  upcoming: 3,
  needs_review: 4,
  closed: 5,
  ended: 6,
}

export const SUPPORT_LABELS = {
  status: {
    open: { KO: '모집 중', EN: 'Open', JP: '募集中' },
    closing_soon: { KO: '마감 임박', EN: 'Closing soon', JP: 'まもなく締切' },
    always_open: { KO: '상시 모집', EN: 'Rolling', JP: '随時募集' },
    upcoming: { KO: '모집 예정', EN: 'Upcoming', JP: '募集予定' },
    closed: { KO: '접수 종료', EN: 'Closed', JP: '受付終了' },
    ended: { KO: '운영 종료', EN: 'Ended', JP: '運営終了' },
    needs_review: { KO: '공고 확인', EN: 'Check notice', JP: '公告を確認' },
  },
  category: {
    short_trip: { KO: '짧게 떠나기', EN: 'Short trip', JP: '短い旅' },
    week_stay: { KO: '일주일 머물기', EN: 'One-week stay', JP: '1週間の滞在' },
    long_stay: { KO: '장기체류', EN: 'Long stay', JP: '長期滞在' },
    workation: { KO: '워케이션', EN: 'Workation', JP: 'ワーケーション' },
    regional_project: { KO: '지역 프로젝트', EN: 'Local project', JP: '地域プロジェクト' },
  },
  duration: {
    short: { KO: '4박 이하', EN: 'Up to 4 nights', JP: '4泊以下' },
    week: { KO: '5~9박', EN: '5–9 nights', JP: '5〜9泊' },
    long: { KO: '10박 이상', EN: '10+ nights', JP: '10泊以上' },
    flexible: { KO: '기간 확인', EN: 'Flexible', JP: '期間を確認' },
  },
  supportType: {
    cash_reimbursement: { KO: '실비 지원', EN: 'Reimbursement', JP: '実費支援' },
    local_currency: { KO: '지역화폐', EN: 'Local currency', JP: '地域通貨' },
    accommodation: { KO: '숙박 지원', EN: 'Stay support', JP: '宿泊支援' },
    transport: { KO: '교통 지원', EN: 'Transport', JP: '交通支援' },
    meal: { KO: '식비 지원', EN: 'Meals', JP: '食費支援' },
    activity: { KO: '체험 지원', EN: 'Activities', JP: '体験支援' },
    workspace: { KO: '업무 공간', EN: 'Workspace', JP: 'ワークスペース' },
  },
  region: {
    nationwide: { KO: '전국', EN: 'Nationwide', JP: '全国' },
    seoul_incheon_gyeonggi: { KO: '수도권', EN: 'Capital area', JP: '首都圏' },
    gangwon: { KO: '강원', EN: 'Gangwon', JP: '江原' },
    chungcheong: { KO: '충청', EN: 'Chungcheong', JP: '忠清' },
    jeolla: { KO: '전라', EN: 'Jeolla', JP: '全羅' },
    gyeongsang: { KO: '경상', EN: 'Gyeongsang', JP: '慶尚' },
    jeju: { KO: '제주', EN: 'Jeju', JP: '済州' },
  },
} satisfies Record<string, Record<string, Record<Lang, string>>>
