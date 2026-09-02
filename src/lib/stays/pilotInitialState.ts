import 'server-only'

import type { Lang } from '@/lib/i18n/types'
import { STAY_PILOT_DESTINATIONS } from '@/lib/stays/pilotDestinations'
import { getStayPilotDateDefaults } from '@/lib/stays/pilotFlag'
import { validateStayPilotRequest } from '@/lib/stays/pilotValidation'

export type StayPilotSourceSection =
  | 'stay_search_pilot_form'
  | 'home_hero_stay_search'
  | 'guide_stay_search'
  | 'trip_set_stay_search'
export type StayPilotPageSearchParams = Record<string, string | string[] | undefined>

export type StayPilotInitialState = {
  initialToday: string
  initialCheckin: string
  initialCheckout: string
  initialDestinationId: string
  initialAdults: number
  initialChildren: number
  autoSearch: boolean
  sourceSection: StayPilotSourceSection
}

function scalar(value: string | string[] | undefined): string {
  return typeof value === 'string' ? value : ''
}

function integer(value: string, fallback: number): number {
  if (!/^\d+$/.test(value)) return fallback
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) ? parsed : fallback
}

export function getStayPilotInitialState(
  searchParams: StayPilotPageSearchParams,
  locale: Lang,
): StayPilotInitialState {
  const defaults = getStayPilotDateDefaults()
  const fallbackDestination = STAY_PILOT_DESTINATIONS[0]
  const requestedAutoSearch = scalar(searchParams.auto) === '1'
  const requestedSource = scalar(searchParams.source)
  const sourceSection: StayPilotSourceSection = requestedSource === 'home_hero'
    ? 'home_hero_stay_search'
    : requestedSource === 'guide'
      ? 'guide_stay_search'
      : requestedSource === 'trip_set'
        ? 'trip_set_stay_search'
        : 'stay_search_pilot_form'
  const validated = validateStayPilotRequest({
    destinationId: scalar(searchParams.destination),
    checkin: scalar(searchParams.checkin),
    checkout: scalar(searchParams.checkout),
    adults: integer(scalar(searchParams.adults), 2),
    children: integer(scalar(searchParams.children), 0),
    locale,
  })

  if (!requestedAutoSearch || !validated.ok) {
    return {
      initialToday: defaults.today,
      initialCheckin: defaults.checkin,
      initialCheckout: defaults.checkout,
      initialDestinationId: fallbackDestination.id,
      initialAdults: 2,
      initialChildren: 0,
      autoSearch: false,
      sourceSection: 'stay_search_pilot_form',
    }
  }

  return {
    initialToday: defaults.today,
    initialCheckin: validated.value.checkin,
    initialCheckout: validated.value.checkout,
    initialDestinationId: validated.value.destinationId,
    initialAdults: validated.value.adults,
    initialChildren: validated.value.children,
    autoSearch: true,
    sourceSection,
  }
}
