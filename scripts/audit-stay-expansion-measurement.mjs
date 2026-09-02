import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const route = read('src/app/api/stays/expansion-readiness/route.ts')
const measurement = read('src/lib/stays/expansionMeasurement.ts')
const adapter = read('src/lib/stays/providers/agodaLive.ts')

assert.ok(route.includes("process.env.VERCEL_ENV !== 'preview'"), 'Production boundary missing')
assert.ok(route.includes("{ error: 'not_found' }"), 'Non-Preview response must fail closed')
assert.ok(route.includes('revalidate = 3600'), 'Measurement route needs hourly quota protection')
assert.ok(measurement.includes('STAY_EXPANSION_CANDIDATES'), 'Candidate registry is not reused')
assert.ok(measurement.includes('mapAgodaHotelToStayResult'), 'Production response mapper is not reused')
assert.ok(measurement.includes('REQUIRED_DISPLAYABLE_RESULTS = 3'), 'Minimum image-backed result gate missing')
assert.ok(measurement.includes("bookingHref.includes('cid=1968994')"), 'Affiliate attribution gate missing')
assert.ok(adapter.includes('export function mapAgodaHotelToStayResult'), 'Shared Agoda mapper is not exported')

for (const forbidden of ['AGODA_API_KEY', 'Authorization', 'hotelName', 'landingURL', 'bookingHref']) {
  assert.ok(!route.includes(forbidden), `Preview route must not expose ${forbidden}`)
}

console.log('[stay-expansion-measurement] PASS — Preview-only aggregate measurement is fail-closed in Production.')
