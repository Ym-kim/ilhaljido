import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const analytics = read('src/lib/stays/analytics.ts')
const telemetry = read('src/lib/stays/operationalTelemetry.ts')
const route = read('src/app/api/stays/search/route.ts')
const view = read('src/components/stays/StaySearchPilotView.tsx')
const roadmap = read('docs/audits/stay-engine-roadmap-2026-09.md')
const moduleUrl = pathToFileURL(join(root, 'src/lib/stays/rolloutDecision.ts')).href
const { evaluateStayPilotRollout } = await import(moduleUrl)

for (const key of ['latency_bucket', 'failure_reason', 'result_count_band']) assert.ok(analytics.includes(key), `missing analytics field ${key}`)
assert.ok(route.includes('logStaySearchExecution'), 'search route must emit operational outcome')
assert.ok(view.includes('latencyMs: payload.meta.latencyMs'), 'result event must include provider latency')
assert.ok(view.includes('failureReason: payload.reason'), 'fallback event must include an allowlisted reason')
assert.ok(telemetry.includes("event: 'stay_search_execution'"), 'structured server event missing')
assert.ok(telemetry.includes('destination_id') && telemetry.includes('result_count') && telemetry.includes('latency_ms'))
for (const forbidden of ['Authorization', 'AGODA_API_KEY', 'bookingHref', 'redirect.href', 'checkin', 'checkout', 'adults', 'children', 'email', 'phone']) {
  assert.ok(!telemetry.includes(forbidden), `operational log must not accept or emit ${forbidden}`)
}
assert.ok(roadmap.includes('| 6 | Verified Wakation Stay Intelligence | Complete |'))
assert.ok(roadmap.includes('| 7 | Conversion measurement and rollout decision | In progress |'))

const collecting = evaluateStayPilotRollout({
  observationDays: 2, searches: 40, successfulResultViews: 38, fallbackViews: 2,
  unavailableViews: 0, bookingClicks: 6, p75LatencyMs: 900, affiliateSafetyFailures: 0, brokenImages: 0,
})
assert.equal(collecting.status, 'collecting')

const earlySafetyFailure = evaluateStayPilotRollout({
  observationDays: 2, searches: 40, successfulResultViews: 38, fallbackViews: 2,
  unavailableViews: 0, bookingClicks: 6, p75LatencyMs: 900, affiliateSafetyFailures: 1, brokenImages: 0,
})
assert.equal(earlySafetyFailure.status, 'hold', 'affiliate safety failures must stop rollout before the sample matures')

const eligible = evaluateStayPilotRollout({
  observationDays: 7, searches: 200, successfulResultViews: 190, fallbackViews: 10,
  unavailableViews: 0, bookingClicks: 24, p75LatencyMs: 1_300, affiliateSafetyFailures: 0, brokenImages: 0,
})
assert.equal(eligible.status, 'eligible_for_operator_review')
assert.deepEqual(eligible.blockers, [])

const hold = evaluateStayPilotRollout({
  observationDays: 7, searches: 200, successfulResultViews: 160, fallbackViews: 40,
  unavailableViews: 0, bookingClicks: 12, p75LatencyMs: 3_100, affiliateSafetyFailures: 1, brokenImages: 0,
})
assert.equal(hold.status, 'hold')
assert.ok(hold.blockers.includes('fallback_rate_above_guardrail'))
assert.ok(hold.blockers.includes('latency_above_guardrail'))
assert.ok(hold.blockers.includes('affiliate_safety_failure'))

console.log('[stay-pilot-measurement] PASS — bounded funnel fields, server reliability telemetry, rollout guardrails and fail-safe decision states.')
