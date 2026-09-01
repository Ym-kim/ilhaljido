import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const files = {
  domain: read('src/lib/stays/domain.ts'),
  registry: read('src/lib/stays/providerRegistry.ts'),
  booking: read('src/lib/stays/providers/booking.ts'),
  agoda: read('src/lib/stays/providers/agoda.ts'),
  analytics: read('src/lib/stays/analytics.ts'),
  search: read('src/components/affiliate/DestinationSearch.tsx'),
  home: read('src/app/page.tsx'),
  agodaApi: read('src/lib/affiliate/agodaApi.ts'),
}

const requiredEvents = [
  'stay_search',
  'stay_search_result_view',
  'stay_property_view',
  'stay_booking_click',
  'affiliate_redirect',
]

const requiredCapabilities = [
  'search_redirect',
  'live_search',
  'property_redirect',
  'live_property',
  'availability',
  'booking',
]

const checks = [
  ...requiredEvents.map((event) => [`stay event contract: ${event}`, files.analytics.includes(`'${event}'`)]),
  ...requiredCapabilities.map((capability) => [`stay capability contract: ${capability}`, files.domain.includes(`'${capability}'`)]),
  ['Booking affiliate ID preserved', files.booking.includes("publicTrackingId: '7854081'")],
  ['Agoda public CID preserved', files.agoda.includes("publicTrackingId: '1968994'")],
  ['Agoda live search is unavailable after 401', files.agoda.includes("reason: 'authentication_blocked_401'")],
  ['Agoda unavailable path falls back to Booking redirect', files.registry.includes("isStayCapabilityActive('booking', 'search_redirect')") && files.registry.includes('buildBookingStayRedirect(request)')],
  ['Agoda API remains server-only', files.agodaApi.startsWith("import 'server-only'")],
  ['search form emits PII-safe Stay events', files.search.includes("trackStayEvent('stay_search'") && files.search.includes("trackStayEvent('affiliate_redirect'")],
  ['home hero emits PII-safe Stay events', files.home.includes("trackStayEvent('stay_search'") && files.home.includes("trackStayEvent('affiliate_redirect'")],
  ['free-form destination is not a Stay analytics field', !files.analytics.includes('destination: input.') && !files.analytics.includes('destination_text')],
  ['Stay analytics excludes direct identifiers', !/(email|phone|full_name|user_id|destination_text)\s*:/.test(files.analytics)],
  ['client-facing Stay modules do not read secrets', !/process\.env|AGODA_API_KEY/.test(`${files.registry}\n${files.analytics}\n${files.search}\n${files.home}`)],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[stay-engine] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[stay-engine] PASS — ${requiredCapabilities.length} capabilities, ${requiredEvents.length} events, safe Agoda fallback and no PII fields.`)
