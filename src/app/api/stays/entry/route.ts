import { NextResponse } from 'next/server'

import { buildBookingStaySearchHref } from '@/lib/affiliate/bookingSearch'
import { localizeOutboundHref } from '@/lib/affiliate/linkLocale'
import { localizeHref } from '@/lib/i18n/localePath'
import type { Lang } from '@/lib/i18n/types'
import { getStayPilotDestination } from '@/lib/stays/pilotDestinations'
import { isAgodaStayPilotEnabled } from '@/lib/stays/pilotFlag'
import { validateStayPilotRequest } from '@/lib/stays/pilotValidation'

export const dynamic = 'force-dynamic'

function isLang(value: string | null): value is Lang {
  return value === 'KO' || value === 'EN' || value === 'JP'
}

function integer(value: string | null, fallback: number): number {
  if (!value || !/^\d+$/.test(value)) return fallback
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) ? parsed : fallback
}

export function GET(request: Request) {
  const url = new URL(request.url)
  const localeValue = url.searchParams.get('locale')
  if (!isLang(localeValue)) {
    return NextResponse.json({ error: 'invalid_locale' }, { status: 400 })
  }

  const destinationId = url.searchParams.get('destination') ?? ''
  const destination = getStayPilotDestination(destinationId)
  const validated = validateStayPilotRequest({
    destinationId,
    checkin: url.searchParams.get('checkin') ?? '',
    checkout: url.searchParams.get('checkout') ?? '',
    adults: integer(url.searchParams.get('adults'), 2),
    children: integer(url.searchParams.get('children'), 0),
    locale: localeValue,
  })

  if (!destination || !validated.ok) {
    return NextResponse.json({ error: validated.ok ? 'invalid_destination' : validated.reason }, { status: 400 })
  }

  if (isAgodaStayPilotEnabled()) {
    const params = new URLSearchParams({
      destination: validated.value.destinationId,
      checkin: validated.value.checkin,
      checkout: validated.value.checkout,
      adults: String(validated.value.adults),
      children: String(validated.value.children),
      auto: '1',
      source: 'home_hero',
    })
    const pilotHref = `${localizeHref('/select/hotel/pilot', localeValue)}?${params.toString()}`
    return NextResponse.redirect(new URL(pilotHref, request.url), { status: 307 })
  }

  const bookingHref = buildBookingStaySearchHref({
    destination: destination.label[localeValue],
    checkin: validated.value.checkin,
    checkout: validated.value.checkout,
    adults: validated.value.adults,
    children: validated.value.children,
    rooms: 1,
  })
  return NextResponse.redirect(localizeOutboundHref(bookingHref, localeValue), { status: 307 })
}
