import { AGODA_CITY_IDS } from '@/lib/affiliate/agodaCities'
import type { Lang } from '@/lib/i18n/types'

export type StayPilotDestination = {
  id: 'japan-fukuoka' | 'japan-osaka' | 'japan-tokyo'
  cityId: number
  label: Record<Lang, string>
}

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

