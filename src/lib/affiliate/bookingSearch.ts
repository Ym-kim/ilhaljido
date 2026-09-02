const BOOKING_SEARCH_URL = 'https://www.booking.com/searchresults.html'

export type BookingStaySearch = {
  destination: string
  checkin?: string
  checkout?: string
  adults?: number
  rooms?: number
  children?: number
}

export type StayDateRangeError = 'incomplete' | 'invalid' | null

export function getStayDateRangeError(checkin: string, checkout: string): StayDateRangeError {
  if ((checkin && !checkout) || (!checkin && checkout)) return 'incomplete'
  if (checkin && checkout && checkout <= checkin) return 'invalid'
  return null
}

function boundedInteger(value: number | undefined, fallback: number, min: number, max: number): number {
  return Number.isInteger(value) ? Math.min(max, Math.max(min, value as number)) : fallback
}

export function buildBookingStaySearchHref({
  destination,
  checkin,
  checkout,
  adults,
  rooms,
  children,
}: BookingStaySearch): string {
  const params = new URLSearchParams({
    aid: '7854081',
    ss: destination.trim(),
    group_adults: String(boundedInteger(adults, 2, 1, 8)),
    no_rooms: String(boundedInteger(rooms, 1, 1, 4)),
    group_children: String(boundedInteger(children, 0, 0, 6)),
  })

  if (checkin && checkout) {
    params.set('checkin', checkin)
    params.set('checkout', checkout)
  }

  return `${BOOKING_SEARCH_URL}?${params.toString()}`
}
