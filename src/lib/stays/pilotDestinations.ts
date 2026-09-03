import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import type { Lang } from '@/lib/i18n/types'

export type StayPilotDestination = {
  id: 'japan-fukuoka' | 'japan-osaka' | 'japan-tokyo' | 'korea-busan' | 'korea-jeju' | 'korea-seoul'
  cityId: number
  label: Record<Lang, string>
  rolloutStatus: 'AGODA_READY' | 'BOOKING_FALLBACK' | 'DISABLED'
}

export const STAY_PILOT_ENTRY_SOURCES = ['home_hero', 'guide', 'trip_set'] as const
export type StayPilotEntrySource = (typeof STAY_PILOT_ENTRY_SOURCES)[number]

const CORE_STAY_PILOT_DESTINATIONS: readonly StayPilotDestination[] = [
  {
    id: 'japan-fukuoka',
    cityId: AGODA_CITY_IDS['japan-fukuoka'],
    label: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
    rolloutStatus: 'AGODA_READY',
  },
  {
    id: 'japan-osaka',
    cityId: AGODA_CITY_IDS['japan-osaka'],
    label: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
    rolloutStatus: 'AGODA_READY',
  },
  {
    id: 'japan-tokyo',
    cityId: AGODA_CITY_IDS['japan-tokyo'],
    label: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
    rolloutStatus: 'AGODA_READY',
  },
] as const

const KOREA_STAY_PILOT_DESTINATIONS: readonly StayPilotDestination[] = [
  {
    id: 'korea-busan',
    cityId: AGODA_CITY_IDS['korea-busan'],
    label: { KO: '부산', EN: 'Busan', JP: '釜山' },
    rolloutStatus: 'AGODA_READY',
  },
  {
    id: 'korea-jeju',
    cityId: AGODA_CITY_IDS['korea-jeju'],
    label: { KO: '제주', EN: 'Jeju', JP: '済州' },
    rolloutStatus: 'AGODA_READY',
  },
  {
    id: 'korea-seoul',
    cityId: AGODA_CITY_IDS['korea-seoul'],
    label: { KO: '서울', EN: 'Seoul', JP: 'ソウル' },
    rolloutStatus: 'AGODA_READY',
  },
] as const

type KoreaStayPilotEnvironment = {
  stayPilot?: string
  vercelEnvironment?: string
}

/**
 * Provider-neutral Korea rollout switch.
 *
 * The pilot is available by default only in Vercel Preview builds. Production
 * remains off unless it is explicitly enabled, and an explicit false is a
 * kill-switch in every environment.
 */
export function isKoreaStayPilotRolloutEnabled(
  environment: KoreaStayPilotEnvironment = {
    stayPilot: process.env.NEXT_PUBLIC_STAY_KOREA_PILOT,
    vercelEnvironment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
): boolean {
  const value = environment.stayPilot?.trim().toLowerCase()

  if (value === '1' || value === 'true') return true
  if (value === '0' || value === 'false') return false

  return environment.vercelEnvironment?.trim().toLowerCase() === 'preview'
}

export const STAY_PILOT_DESTINATIONS: readonly StayPilotDestination[] = [
  ...CORE_STAY_PILOT_DESTINATIONS,
  ...(isKoreaStayPilotRolloutEnabled() ? KOREA_STAY_PILOT_DESTINATIONS : []),
]

export function getStayPilotDestination(id: string): StayPilotDestination | undefined {
  return STAY_PILOT_DESTINATIONS.find((destination) => destination.id === id)
}

export function getStayPilotDestinationByGuideSlug(slug: string): StayPilotDestination | undefined {
  return STAY_PILOT_DESTINATIONS.find((destination) => destination.id.endsWith(`-${slug}`))
}

export function isStayPilotEntrySource(value: string | null): value is StayPilotEntrySource {
  return typeof value === 'string' && STAY_PILOT_ENTRY_SOURCES.some((source) => source === value)
}

export function buildStayPilotEntryHref(input: {
  destinationId?: string
  checkin?: string
  checkout?: string
  adults?: number
  children?: number
  locale: Lang
  source: StayPilotEntrySource
}): string | null {
  if (!input.destinationId || !getStayPilotDestination(input.destinationId)) return null
  if (!input.checkin || !input.checkout || input.checkout <= input.checkin) return null

  const params = new URLSearchParams({
    destination: input.destinationId,
    checkin: input.checkin,
    checkout: input.checkout,
    adults: String(input.adults ?? 2),
    children: String(input.children ?? 0),
    auto: '1',
    source: input.source,
    locale: input.locale,
  })

  return `/api/stays/entry?${params.toString()}`
}
