import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')

const home = read('src/app/page.tsx')
const tripMatch = read('src/components/trip-match/TripMatchHomeCta.tsx')
const promo = read('src/components/home/PromoTicker.tsx')

const orderedMarkers = [
  '<GeoJapanBanner />',
  '<TripMatchHomeCta forceLang={forceLang} />',
  '<PromoTicker />',
  '<DomesticOnboarding lang={lang} />',
  '<MoodExplorer forceLang={forceLang} />',
]

const markerPositions = orderedMarkers.map((marker) => home.indexOf(marker))
const intentBeforeMonetization = markerPositions.every((position) => position >= 0)
  && markerPositions.every((position, index) => index === 0 || markerPositions[index - 1] < position)

const heroStart = home.indexOf('data-home-primary-action="stay-search"')
const heroEnd = home.indexOf('<GeoJapanBanner />')
const heroSource = heroStart >= 0 && heroEnd > heroStart ? home.slice(heroStart, heroEnd) : ''

const checks = [
  ['home hero declares stay search as the primary action', heroStart >= 0],
  ['hero retains provider-neutral stay search planning', heroSource.includes('submitHeroSearch') && home.includes('resolveStaySearchPlan')],
  ['hero keeps one search submit action', (heroSource.match(/type="submit"/g) ?? []).length === 1],
  ['hero removes competing stay/program CTA buttons', !heroSource.includes("cta: 'stay'") && !heroSource.includes("cta: 'programs'")],
  ['trip match is explicitly the secondary discovery action', tripMatch.includes('data-home-secondary-action="trip-match"')],
  ['monetization rail is labelled as post-intent', promo.includes('data-home-monetization-after-intent="true"')],
  ['intent sections precede the monetization rail', intentBeforeMonetization],
  ['promo affiliate tracking remains intact', promo.includes('trackAffiliateClick') && promo.includes("sourceSection: 'promo_ticker'")],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[home-discovery-focus] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[home-discovery-focus] PASS — ${checks.length} hierarchy, tracking and ordering checks.`)
