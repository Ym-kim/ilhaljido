import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const files = {
  cities: read('src/lib/affiliate/agodaCities.ts'),
  destinations: read('src/lib/stays/pilotDestinations.ts'),
  flag: read('src/lib/stays/pilotFlag.ts'),
  validation: read('src/lib/stays/pilotValidation.ts'),
  engine: read('src/lib/stays/liveSearch.ts'),
  adapter: read('src/lib/stays/providers/agodaLive.ts'),
  api: read('src/app/api/stays/search/route.ts'),
  entry: read('src/app/api/stays/entry/route.ts'),
  view: read('src/components/stays/StaySearchPilotView.tsx'),
  contextual: read('src/components/stays/ContextualStaySearch.tsx'),
  guide: read('src/components/guide/GuideView.tsx'),
  collection: read('src/components/affiliate/CollectionView.tsx'),
  initial: read('src/lib/stays/pilotInitialState.ts'),
  home: read('src/app/page.tsx'),
  booking: read('src/lib/affiliate/bookingSearch.ts'),
  bookingProvider: read('src/lib/stays/providers/booking.ts'),
  ko: read('src/app/select/hotel/pilot/page.tsx'),
  en: read('src/app/en/select/hotel/pilot/page.tsx'),
  ja: read('src/app/ja/select/hotel/pilot/page.tsx'),
}

const checks = [
  ['Fukuoka city ID comes from verified registry', files.cities.includes("'japan-fukuoka': 16527") && files.destinations.includes("AGODA_CITY_IDS['japan-fukuoka']")],
  ['Osaka city ID comes from verified registry', files.cities.includes("'japan-osaka': 9590") && files.destinations.includes("AGODA_CITY_IDS['japan-osaka']")],
  ['Tokyo city ID comes from verified registry', files.cities.includes("'japan-tokyo': 5085") && files.destinations.includes("AGODA_CITY_IDS['japan-tokyo']")],
  ['Production is feature-flag dark by default', files.flag.includes("process.env.VERCEL_ENV !== 'production'")],
  ['Dates and guests are bounded', files.validation.includes('nights > 30') && files.validation.includes('(adults as number) > 8') && files.validation.includes('(children as number) > 6')],
  ['Provider-neutral live adapter registry exists', files.engine.includes('LIVE_SEARCH_ADAPTERS') && files.engine.includes('Partial<Record<StayProviderId')],
  ['Agoda empty result falls back', files.adapter.includes("reason: 'empty_result'") && files.engine.includes("mode: 'fallback'")],
  ['Booking fallback preserves affiliate ID and guests', files.booking.includes("aid: '7854081'") && files.booking.includes('group_adults') && files.booking.includes('group_children')],
  ['Booking fallback preserves the active site language', files.bookingProvider.includes('localizeOutboundHref(href, request.locale)')],
  ['Landing URL remains provider-returned', files.adapter.includes('hotel.landingURL') && !files.adapter.includes('URLSearchParams')],
  ['No API secret enters public pilot modules', !/AGODA_API_KEY|Authorization/.test(`${files.api}\n${files.view}\n${files.destinations}`)],
  ['KO EN JA routes are noindex', [files.ko, files.en, files.ja].every((source) => source.includes('index: false') && source.includes('follow: false'))],
  ['Exact pilot events are emitted', ['stay_search', 'stay_result_view', 'stay_property_click', 'stay_booking_click'].every((event) => files.view.includes(`'${event}'`))],
  ['Affiliate CTA is safely marked', files.view.includes('sponsored noopener noreferrer') && files.view.includes("status: 'active_affiliate'")],
  ['Zero discounts and invalid strike-through rates stay hidden', files.view.includes('result.rate.discountPercentage > 0') && files.view.includes('result.rate.crossedOutAmount > result.rate.amount')],
  ['API reports internal latency and result count', files.api.includes('latencyMs') && files.api.includes('resultCount') && files.api.includes('Server-Timing')],
  ['Home entry is restricted to verified pilot destinations and complete dates', files.home.includes('buildStayPilotEntryHref') && files.destinations.includes('getStayPilotDestination(input.destinationId)') && files.destinations.includes('!input.checkin || !input.checkout')],
  ['Server entry route applies the private feature flag', files.entry.includes('isAgodaStayPilotEnabled()') && !files.home.includes('AGODA_STAY_PILOT')],
  ['Disabled pilot entry preserves Booking fallback', files.entry.includes('buildBookingStaySearchHref') && files.entry.includes('localizeOutboundHref')],
  ['Pilot query state is validated before automatic search', files.initial.includes('validateStayPilotRequest') && files.initial.includes('requestedAutoSearch') && files.view.includes('autoSearchStarted')],
  ['Home-attributed results remain distinguishable', files.initial.includes("'home_hero_stay_search'") && files.view.includes("'home_hero_stay_results'") && files.view.includes("'home_hero_stay_fallback'")],
  ['KO EN JA pilot pages accept sanitized initial state', [files.ko, files.en, files.ja].every((source) => source.includes('getStayPilotInitialState') && source.includes('searchParams'))],
  ['Pilot entry modules expose no Agoda secret', !/AGODA_API_KEY|Authorization/.test(`${files.entry}\n${files.initial}\n${files.home}`)],
  ['Guide and Trip Set entries use the reusable contextual search', files.guide.includes('<ContextualStaySearch') && files.guide.includes('source="guide"') && files.collection.includes('<ContextualStaySearch') && files.collection.includes('source="trip_set"')],
  ['Contextual entry keeps dates and bounded guest controls', files.contextual.includes('type="date"') && files.contextual.includes('min={1} max={8}') && files.contextual.includes('min={0} max={6}') && files.destinations.includes('adults: String(input.adults ?? 2)')],
  ['Contextual sources are allowlisted and attributed through results', files.destinations.includes("['home_hero', 'guide', 'trip_set']") && files.entry.includes('isStayPilotEntrySource(source)') && files.initial.includes("'guide_stay_search'") && files.initial.includes("'trip_set_stay_search'") && files.view.includes("'guide_stay_results'") && files.view.includes("'trip_set_stay_results'")],
  ['Contextual module exposes no provider credential', !/AGODA_API_KEY|Authorization/.test(files.contextual)],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length) {
  console.error('[stay-pilot] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[stay-pilot] PASS — ${checks.length} feature-flag, provider, fallback, tracking, locale and security checks.`)
