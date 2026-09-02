import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')

const home = read('src/app/page.tsx')
const tripMatch = read('src/components/trip-match/TripMatchHomeCta.tsx')
const featured = read('src/components/home/HomeFeaturedPromotions.tsx')
const campaignPlacement = read('src/components/campaign/CampaignPlacement.tsx')

const orderedMarkers = [
  '<GeoJapanBanner />',
  '<TripMatchHomeCta forceLang={forceLang} />',
  '<HomeFeaturedPromotions lang={lang} />',
  '<DomesticOnboarding lang={lang} />',
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
  ['static featured placement is labelled as post-intent', featured.includes('data-home-monetization-after-intent="true"')],
  ['intent sections precede the featured placement', intentBeforeMonetization],
  ['featured affiliate tracking remains intact', campaignPlacement.includes('trackAffiliateClick') && campaignPlacement.includes('sourceSection: sectionId')],
  ['moving ticker is not rendered on Home', !home.includes('<PromoTicker />') && !featured.includes('animate-ticker')],
  ['redundant mood and duration sections are not rendered on Home', !home.includes('<MoodExplorer') && !home.includes('<DurationExplorer')],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[home-discovery-focus] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[home-discovery-focus] PASS — ${checks.length} hierarchy, tracking and ordering checks.`)
