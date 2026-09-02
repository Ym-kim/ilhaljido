import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import type { Lang } from '@/lib/i18n/types'

export type StayPilotDestination = {
  id: 'japan-fukuoka' | 'japan-osaka' | 'japan-tokyo'
  cityId: number
  label: Record<Lang, string>
}

export const STAY_PILOT_ENTRY_SOURCES = ['home_hero', 'guide', 'trip_set'] as const
export type StayPilotEntrySource = (typeof STAY_PILOT_ENTRY_SOURCES)[number]

export const STAY_PILOT_DESTINATIONS: readonly StayPilotDestination[] = [
  {
    id: 'japan-fukuoka',
    cityId: AGODA_CITY_IDS['japan-fukuoka'],
    label: { KO: '후쿠오카', EN: 'Fukuoka', JP: '福岡' },
  },
  {
    id: 'japan-osaka',
    cityId: AGODA_CITY_IDS['japan-osaka'],
    label: { KO: '오사카', EN: 'Osaka', JP: '大阪' },
  },
  {
    id: 'japan-tokyo',
    cityId: AGODA_CITY_IDS['japan-tokyo'],
    label: { KO: '도쿄', EN: 'Tokyo', JP: '東京' },
  },
] as const

export function getStayPilotDestination(id: string): StayPilotDestination | undefined {
  return STAY_PILOT_DESTINATIONS.find((destination) => destination.id === id)
}

export function getStayPilotDestinationByGuideSlug(slug: string): StayPilotDestination | undefined {
  return STAY_PILOT_DESTINATIONS.find((destination) => destination.id === `japan-${slug}`)
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
