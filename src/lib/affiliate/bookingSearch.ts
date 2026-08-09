const BOOKING_SEARCH_URL = 'https://www.booking.com/searchresults.html'

export type BookingStaySearch = {
  destination: string
  checkin?: string
  checkout?: string
}

export type StayDateRangeError = 'incomplete' | 'invalid' | null

export function getStayDateRangeError(checkin: string, checkout: string): StayDateRangeError {
  if ((checkin && !checkout) || (!checkin && checkout)) return 'incomplete'
  if (checkin && checkout && checkout <= checkin) return 'invalid'
  return null
}

export function buildBookingStaySearchHref({ destination, checkin, checkout }: BookingStaySearch): string {
  const params = new URLSearchParams({
    aid: '7854081',
    ss: destination.trim(),
    group_adults: '2',
    no_rooms: '1',
    group_children: '0',
  })

  if (checkin && checkout) {
    params.set('checkin', checkin)
    params.set('checkout', checkout)
  }

  return `${BOOKING_SEARCH_URL}?${params.toString()}`
}
