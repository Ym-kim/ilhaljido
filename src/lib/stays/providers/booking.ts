import { buildBookingStaySearchHref } from '@/lib/affiliate/bookingSearch'
import type { StayProviderDefinition, StaySearchRedirect, StaySearchRequest } from '@/lib/stays/domain'

const NOT_SUPPORTED = { status: 'not_supported' as const }

export const BOOKING_STAY_PROVIDER = {
  id: 'booking',
  label: 'Booking.com',
  affiliate: true,
  publicTrackingId: '7854081',
  capabilities: {
    search_redirect: { status: 'active' },
    live_search: {
      status: 'unavailable',
      reason: 'demand_api_access_not_confirmed',
      verifiedAt: '2026-09-02',
    },
    property_redirect: { status: 'active' },
    live_property: NOT_SUPPORTED,
    availability: NOT_SUPPORTED,
    booking: NOT_SUPPORTED,
  },
} satisfies StayProviderDefinition

export function buildBookingStayRedirect(request: StaySearchRequest): StaySearchRedirect {
  return {
    provider: BOOKING_STAY_PROVIDER.id,
    providerLabel: BOOKING_STAY_PROVIDER.label,
    href: buildBookingStaySearchHref({
      destination: request.destination,
      checkin: request.checkin,
      checkout: request.checkout,
    }),
    rel: 'sponsored noopener noreferrer',
  }
}

