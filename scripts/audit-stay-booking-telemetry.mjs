import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const reportUrl = pathToFileURL(join(root, 'src/lib/stays/pilotOperationsReport.ts')).href
const decisionUrl = pathToFileURL(join(root, 'src/lib/stays/rolloutDecision.ts')).href
const { parseStayPilotBookingClickJsonLines, parseStayPilotBookingClickLine } = await import(reportUrl)
const { evaluateStayPilotRollout } = await import(decisionUrl)

function clickLine({
  id,
  timestamp,
  destinationId,
  locale = 'ko',
  mode = 'results',
  provider = mode === 'results' ? 'agoda' : 'booking',
  environment = 'production',
}) {
  return JSON.stringify({
    id,
    timestamp,
    environment,
    message: `[stay-pilot-booking] ${JSON.stringify({
      event: 'stay_booking_click',
      pilot: 'agoda_stay_v1',
      destination_id: destinationId,
      locale,
      provider,
      mode,
      ignored_property_url: 'https://example.invalid/private-value',
    })}`,
  })
}

const now = Date.UTC(2026, 8, 2, 13, 0, 0)
const resultClick = clickLine({ id: 'click-japan', timestamp: now, destinationId: 'japan-fukuoka' })
const fallbackClick = clickLine({ id: 'click-korea', timestamp: now + 1, destinationId: 'korea-busan', mode: 'fallback' })
const previewClick = clickLine({ id: 'click-preview', timestamp: now + 2, destinationId: 'japan-osaka', environment: 'preview' })
const invalidPair = clickLine({ id: 'click-invalid', timestamp: now + 3, destinationId: 'japan-tokyo', provider: 'booking' })
const unknownDestination = clickLine({ id: 'click-unknown', timestamp: now + 4, destinationId: 'custom-city' })

assert.equal(parseStayPilotBookingClickLine('not json'), null)
assert.equal(parseStayPilotBookingClickLine(previewClick), null)
assert.equal(parseStayPilotBookingClickLine(invalidPair), null)
assert.equal(parseStayPilotBookingClickLine(unknownDestination), null)

const clicks = parseStayPilotBookingClickJsonLines([
  resultClick,
  fallbackClick,
  resultClick,
  previewClick,
  invalidPair,
  unknownDestination,
].join('\n'))
assert.equal(clicks.length, 2)
assert.equal(clicks[0].cohort, 'japan')
assert.equal(clicks[1].cohort, 'korea')
assert.equal(JSON.stringify(clicks).includes('example.invalid'), false)

const zeroClickMatureSample = evaluateStayPilotRollout({
  observationDays: 7,
  searches: 200,
  successfulResultViews: 190,
  fallbackViews: 10,
  unavailableViews: 0,
  bookingClicks: 0,
  p75LatencyMs: 1_300,
  affiliateSafetyFailures: 0,
  brokenImages: 0,
})
assert.equal(zeroClickMatureSample.status, 'hold')
assert.ok(zeroClickMatureSample.blockers.includes('no_booking_click_evidence'))

const route = read('src/app/api/stays/booking-click/route.ts')
const client = read('src/lib/stays/bookingTelemetry.ts')
const view = read('src/components/stays/StaySearchPilotView.tsx')
const telemetry = read('src/lib/stays/operationalTelemetry.ts')
const reportScript = read('scripts/report-stay-pilot-operations.mjs')

assert.ok(route.includes('isSameOrigin(request)'))
assert.ok(route.includes("fetchSite === 'same-origin'"))
assert.ok(route.includes('contentLength > 512'))
assert.ok(route.includes('new TextEncoder().encode(rawPayload).byteLength > 512'))
assert.ok(route.includes('ALLOWED_KEYS'))
assert.ok(route.includes('getStayPilotDestination(destinationId)'))
assert.ok(route.includes('isAgodaStayPilotEnabled()'))
assert.ok(client.includes('keepalive: true'))
assert.ok(client.includes("credentials: 'same-origin'"))
assert.ok(view.includes('href={result.bookingHref}'), 'provider link must remain direct')
assert.ok(view.includes("provider: 'agoda',\n      mode: 'results'"))
assert.ok(view.includes("provider: 'booking',\n      mode: 'fallback'"))
assert.ok(telemetry.includes("event: 'stay_booking_click'"))
assert.ok(reportScript.includes("'--query', 'stay-pilot'"))
assert.ok(reportScript.includes('parseStayPilotBookingClickJsonLines'))

for (const forbidden of ['hotelId', 'propertyId', 'bookingHref', 'landingURL', 'checkin', 'checkout', 'adults', 'children', 'email', 'phone', 'userId']) {
  assert.ok(!route.includes(forbidden), `booking-click route must not accept ${forbidden}`)
  assert.ok(!client.includes(forbidden), `booking-click client must not send ${forbidden}`)
}

console.log('[stay-booking-telemetry] PASS — same-origin, allowlisted, PII-free click evidence with direct affiliate redirects preserved.')
