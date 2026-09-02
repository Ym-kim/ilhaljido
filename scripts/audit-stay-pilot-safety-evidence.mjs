import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const evidenceUrl = pathToFileURL(join(root, 'src/lib/stays/pilotSafetyEvidence.ts')).href
const {
  isHealthyProviderImageResponse,
  isSafeAgodaAffiliateUrl,
  parseStayPilotSafetyEvidence,
} = await import(evidenceUrl)

assert.equal(isSafeAgodaAffiliateUrl('https://www.agoda.com/hotel/example?cid=1968994', '1968994'), true)
assert.equal(isSafeAgodaAffiliateUrl('https://www.agoda.com/hotel/example?cid=wrong', '1968994'), false)
assert.equal(isSafeAgodaAffiliateUrl('http://www.agoda.com/hotel/example?cid=1968994', '1968994'), false)
assert.equal(isSafeAgodaAffiliateUrl('https://agoda.example/hotel/example?cid=1968994', '1968994'), false)
assert.equal(isHealthyProviderImageResponse(200, 'image/jpeg'), true)
assert.equal(isHealthyProviderImageResponse(206, 'image/webp'), true)
assert.equal(isHealthyProviderImageResponse(200, 'text/html'), false)
assert.equal(isHealthyProviderImageResponse(404, 'image/jpeg'), false)
assert.deepEqual(parseStayPilotSafetyEvidence({
  complete: true,
  affiliateSafetyFailures: 0,
  brokenImages: 0,
  ignoredUrls: ['https://example.invalid/must-not-be-retained'],
}), { affiliateSafetyFailures: 0, brokenImages: 0 })
assert.equal(parseStayPilotSafetyEvidence({ complete: false, affiliateSafetyFailures: 0, brokenImages: 0 }), null)

const route = read('src/app/api/health/stay-pilot/route.ts')
const measurement = read('src/lib/stays/pilotSafety.ts')
const reportScript = read('scripts/report-stay-pilot-operations.mjs')

assert.ok(route.includes("dynamic = 'force-static'"))
assert.ok(route.includes('revalidate = 3600'))
assert.ok(route.includes('measureStayPilotSafety()'))
assert.ok(measurement.includes("'japan-fukuoka'"))
assert.ok(measurement.includes("'korea-busan'"))
assert.ok(measurement.includes('AGODA_STAY_PROVIDER.publicTrackingId'))
assert.ok(measurement.includes("range: 'bytes=0-2047'"))
assert.ok(measurement.includes("response.headers.get('content-type')"))
assert.ok(measurement.includes('response.body?.cancel()'))
assert.ok(reportScript.includes("'https://www.wakation.kr/api/health/stay-pilot'"))
assert.ok(reportScript.includes('parseStayPilotSafetyEvidence'))

for (const forbidden of ['AGODA_API_KEY', 'Authorization', 'hotelName', 'landingURL', 'bookingHref']) {
  assert.ok(!route.includes(forbidden), `public safety route must not expose ${forbidden}`)
}

console.log('[stay-pilot-safety-evidence] PASS — aggregate affiliate and image checks are cached, strict and detail-free.')
