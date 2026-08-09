import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const files = {
  track: read('src/lib/track.ts'),
  view: read('src/components/affiliate/CollectionView.tsx'),
  card: read('src/components/affiliate/TripSetPreparationCard.tsx'),
  copy: read('src/lib/affiliate/collections.ts'),
}

const checks = [
  ['session click journey', files.track.includes('AFFILIATE_JOURNEY_KEY') && files.track.includes('affiliate_click_number')],
  ['second affiliate event', files.track.includes("emitEvent('second_affiliate_click', payload)")],
  ['cross-category event', files.track.includes("emitEvent('cross_category_click', payload)") && files.track.includes('previous_category')],
  ['editorial preparation order', (files.copy.match(/preparationOrder:\s*[1-4]/g) ?? []).length === 16],
  ['stable ordered Trip Set items', files.view.includes('a.entry.preparationOrder - b.entry.preparationOrder') && files.view.includes('sourceIndex - b.sourceIndex')],
  ['per-Trip-Set progress storage', files.view.includes('wakation_trip_preparation:') && files.view.includes('sessionStorage.setItem(preparationStorageKey')],
  ['next-action hierarchy', files.card.includes('data-preparation-state') && files.card.includes('isNext') && files.card.includes('hasViewedAny')],
  ['category-specific CTA', files.card.includes('CATEGORY_CTA') && files.card.includes('Check stay options') && files.card.includes('Check activity details')],
  ['localized progress copy', files.copy.includes('ts_order_hint:') && files.copy.includes('ts_viewed:')],
  ['localized comfort source', files.view.includes('localizeComfortSource') && files.view.includes('Guide sources checked') && files.view.includes('Busan City release')],
  ['affiliate tracking remains centralized', files.card.includes('trackAffiliateClick({') && files.card.includes("sourceSection: 'trip_set_preparation'")],
  ['sponsored rel preserved', files.card.includes('rel="sponsored noopener noreferrer"')],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[trip-set-funnel] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[trip-set-funnel] PASS — ${checks.length} ordering, progress and funnel instrumentation checks.`)
