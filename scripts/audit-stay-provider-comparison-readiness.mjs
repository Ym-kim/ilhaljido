import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const modulePath = join(root, 'src/lib/stays/comparisonReadiness.ts')
const source = readFileSync(modulePath, 'utf8')
const {
  STAY_COMPARISON_CANDIDATES,
  evaluateStayProviderComparisonReadiness,
} = await import(pathToFileURL(modulePath).href)

const current = evaluateStayProviderComparisonReadiness()
assert.equal(current.status, 'blocked')
assert.deepEqual(current.eligibleProviders, ['agoda'])
assert.ok(current.blockers.includes('requires_two_verified_live_search_providers'))

const booking = STAY_COMPARISON_CANDIDATES.find((candidate) => candidate.provider === 'booking')
assert.ok(booking)
assert.equal(booking.currentRole, 'fallback_redirect')
assert.equal(booking.credentials, 'not_configured')
assert.equal(booking.commercialAccess, 'not_confirmed')
assert.ok(booking.requiredCredentialNames.includes('BOOKING_DEMAND_API_TOKEN'))
assert.ok(booking.requiredCredentialNames.includes('BOOKING_DEMAND_AFFILIATE_ID'))

const trip = STAY_COMPARISON_CANDIDATES.find((candidate) => candidate.provider === 'trip')
assert.ok(trip)
assert.equal(trip.liveSearchCapability, 'not_confirmed')
assert.equal(trip.sourceUrls.length, 0, 'unverified Trip live-search access must not cite an invented source')

const verifiedBooking = {
  ...booking,
  liveSearchCapability: 'verified',
  serverAdapter: 'verified',
  credentials: 'verified',
  commercialAccess: 'verified',
  resultContract: 'verified',
  liveAttribution: 'verified',
}
const futureEligible = evaluateStayProviderComparisonReadiness([
  STAY_COMPARISON_CANDIDATES[0],
  verifiedBooking,
  trip,
])
assert.equal(futureEligible.status, 'eligible_for_preview')
assert.deepEqual(futureEligible.eligibleProviders, ['agoda', 'booking'])

for (const forbidden of ['BOOKING_DEMAND_API_TOKEN=', 'Authorization:', 'Bearer ', 'AGODA_API_KEY=']) {
  assert.equal(source.includes(forbidden), false, `comparison readiness must not contain a credential value or header: ${forbidden}`)
}

console.log('[stay-provider-comparison-readiness] PASS — comparison stays blocked until two providers have verified access, credentials, adapters, mapping and attribution.')
