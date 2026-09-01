import 'server-only'

/**
 * Preview and local builds expose the dedicated pilot URL by default.
 * Production remains dark unless the operator explicitly enables it.
 */
export function isAgodaStayPilotEnabled(): boolean {
  const explicit = process.env.AGODA_STAY_PILOT?.trim().toLowerCase()
  if (explicit === '1' || explicit === 'true') return true
  if (explicit === '0' || explicit === 'false') return false
  return process.env.VERCEL_ENV !== 'production'
}

export function getStayPilotDateDefaults(daysAhead = 7): { today: string; checkin: string; checkout: string } {
  const checkinDate = new Date(Date.now() + daysAhead * 86_400_000)
  const checkoutDate = new Date(checkinDate.getTime() + 2 * 86_400_000)
  return {
    today: new Date().toISOString().slice(0, 10),
    checkin: checkinDate.toISOString().slice(0, 10),
    checkout: checkoutDate.toISOString().slice(0, 10),
  }
}
