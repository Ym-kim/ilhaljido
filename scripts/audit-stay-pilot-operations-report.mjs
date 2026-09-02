import assert from 'node:assert/strict'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const moduleUrl = pathToFileURL(join(root, 'src/lib/stays/pilotOperationsReport.ts')).href
const {
  buildStayPilotOperationalReport,
  parseStayPilotOperationalJsonLines,
  parseStayPilotOperationalLine,
} = await import(moduleUrl)

function vercelLine({
  id,
  timestamp,
  destinationId,
  locale = 'ko',
  mode = 'results',
  provider = mode === 'results' ? 'agoda' : 'booking',
  failureReason = mode === 'results' ? 'none' : 'timeout',
  latencyMs = 120,
  resultCount = mode === 'results' ? 8 : 0,
  environment = 'production',
}) {
  return JSON.stringify({
    id,
    timestamp,
    environment,
    message: `[stay-pilot] ${JSON.stringify({
      event: 'stay_search_execution',
      pilot: 'agoda_stay_v1',
      destination_id: destinationId,
      locale,
      mode,
      provider,
      fallback_from: mode === 'fallback' ? 'agoda' : 'none',
      failure_reason: failureReason,
      latency_ms: latencyMs,
      result_count: resultCount,
      ignored_free_form_url: 'https://example.invalid/?utm=discarded',
    })}`,
  })
}

const now = Date.UTC(2026, 8, 2, 10, 0, 0)
const japanResult = vercelLine({ id: 'japan-1', timestamp: now, destinationId: 'japan-fukuoka', latencyMs: 100 })
const koreaResult = vercelLine({ id: 'korea-1', timestamp: now + 1, destinationId: 'korea-busan', locale: 'ja', latencyMs: 300, resultCount: 7 })
const koreaFallback = vercelLine({ id: 'korea-2', timestamp: now + 2, destinationId: 'korea-seoul', mode: 'fallback', latencyMs: 2_000 })
const duplicate = koreaResult
const preview = vercelLine({ id: 'preview-1', timestamp: now + 3, destinationId: 'korea-jeju', environment: 'preview' })
const unknownDestination = vercelLine({ id: 'unknown-1', timestamp: now + 4, destinationId: 'custom-input' })
const invalidProvider = vercelLine({ id: 'invalid-1', timestamp: now + 5, destinationId: 'japan-osaka', provider: 'booking' })

assert.equal(parseStayPilotOperationalLine('not json'), null)
assert.equal(parseStayPilotOperationalLine(preview), null)
assert.equal(parseStayPilotOperationalLine(unknownDestination), null)
assert.equal(parseStayPilotOperationalLine(invalidProvider), null)

const records = parseStayPilotOperationalJsonLines([
  'Retrieving project…',
  japanResult,
  koreaResult,
  koreaFallback,
  duplicate,
  preview,
  unknownDestination,
].join('\n'))
assert.equal(records.length, 3, 'only unique, production, allowlisted events should remain')
assert.equal(JSON.stringify(records).includes('example.invalid'), false, 'free-form provider data must be discarded')

const collecting = buildStayPilotOperationalReport(records, { observationDays: 1 })
assert.equal(collecting.cohorts.japan.searches, 1)
assert.equal(collecting.cohorts.korea.searches, 2)
assert.equal(collecting.cohorts.korea.fallbackViews, 1)
assert.equal(collecting.cohorts.korea.p75LatencyMs, 2_000)
assert.equal(collecting.rollout.status, 'collecting')
assert.deepEqual(collecting.rollout.missingEvidence, ['booking_clicks', 'affiliate_link_safety', 'broken_images'])

const matureRecords = Array.from({ length: 200 }, (_, index) => {
  const fallback = index >= 190
  const line = vercelLine({
    id: `mature-${index}`,
    timestamp: now + index,
    destinationId: index % 2 === 0 ? 'japan-tokyo' : 'korea-jeju',
    mode: fallback ? 'fallback' : 'results',
    latencyMs: fallback ? 1_400 : 280 + (index % 5) * 40,
  })
  return parseStayPilotOperationalLine(line)
})
assert.ok(matureRecords.every(Boolean))

const eligible = buildStayPilotOperationalReport(matureRecords, {
  observationDays: 7,
  bookingClicks: { japan: 12, korea: 12 },
  affiliateSafetyFailures: 0,
  brokenImages: 0,
})
assert.equal(eligible.rollout.status, 'eligible_for_operator_review')
assert.deepEqual(eligible.rollout.blockers, [])
assert.deepEqual(eligible.rollout.missingEvidence, [])
assert.equal(eligible.cohorts.japan.bookingClicks, 12)
assert.equal(eligible.cohorts.korea.bookingClicks, 12)
assert.equal(eligible.overall.searchToBookingRate, 0.12)

const missingEvidence = buildStayPilotOperationalReport(matureRecords, { observationDays: 7 })
assert.equal(missingEvidence.rollout.status, 'collecting', 'missing evidence must prevent automatic eligibility')

const unsafe = buildStayPilotOperationalReport(matureRecords, {
  observationDays: 7,
  bookingClicks: { japan: 12, korea: 12 },
  affiliateSafetyFailures: 1,
  brokenImages: 0,
})
assert.equal(unsafe.rollout.status, 'hold')
assert.ok(unsafe.rollout.blockers.includes('affiliate_safety_failure'))

console.log('[stay-pilot-operations-report] PASS — strict Production parsing, cohort metrics, deduplication and evidence-gated rollout decisions.')
