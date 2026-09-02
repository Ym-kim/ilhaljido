import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const files = {
  track: read('src/lib/track.ts'),
  campaignPlacement: read('src/components/campaign/CampaignPlacement.tsx'),
  product: read('src/components/affiliate/AffiliateCard.tsx'),
  tripSet: read('src/components/affiliate/TripSetPreparationCard.tsx'),
  search: read('src/components/affiliate/DestinationSearch.tsx'),
  wishlist: read('src/hooks/useWishlist.ts'),
  business: read('src/app/business/page.tsx'),
  auth: read('src/context/AuthContext.tsx'),
}

const requiredAffiliateFields = [
  'partner',
  'category',
  'item_id',
  'item_name',
  'destination',
  'source_page',
  'source_section',
  'cta_label',
  'cta_position',
  'locale',
  'trip_set',
  'campaign',
  'campaign_source',
  'campaign_content',
  'is_logged_in',
  'status',
  'affiliate_click_number',
  'previous_category',
  'cross_category',
]

const checks = [
  ...requiredAffiliateFields.map((field) => [
    `affiliate payload field: ${field}`,
    new RegExp(`\\b${field}:`).test(files.track),
  ]),
  ['affiliate event emitted once through centralized helper', files.track.includes("emitEvent('affiliate_click', payload)")],
  ['short duplicate-click guard', files.track.includes('DUPLICATE_WINDOW_MS') && files.track.includes('lastAffiliateFingerprint')],
  ['campaign context persists in session', files.track.includes('CAMPAIGN_CONTEXT_KEY') && files.track.includes('sessionStorage.setItem(CAMPAIGN_CONTEXT_KEY')],
  ['second category event', files.track.includes("emitEvent('second_category_click', payload)")],
  ['second affiliate click event', files.track.includes("emitEvent('second_affiliate_click', payload)")],
  ['cross-category transition event', files.track.includes("emitEvent('cross_category_click', payload)")],
  ['affiliate journey persists in session', files.track.includes('AFFILIATE_JOURNEY_KEY') && files.track.includes('lastCategory: category')],
  ['debug mode is opt-in', files.track.includes("search.get('analytics_debug') !== '1'")],
  ['debug capture is isolated from analytics transport failures', files.track.indexOf('writeDebugEvent(name, payload)') < files.track.indexOf('track(name, payload)')],
  ['debug payload exposes a hidden Preview-only DOM probe', files.track.includes("output.id = 'wakation-analytics-debug'") && files.track.includes('output.hidden = true')],
  ['static campaign placement uses affiliate schema', files.campaignPlacement.includes('sourceSection: sectionId') && files.campaignPlacement.includes('trackAffiliateClick')],
  ['product card attribution', files.product.includes("sourceSection: 'affiliate_card_visual'") && files.product.includes("sourceSection: 'affiliate_card'")],
  ['Trip Set money-path attribution', files.tripSet.includes("sourceSection: 'trip_set_preparation'")],
  ['destination search attribution', files.search.includes("sourceSection: 'destination_search'")],
  ['wishlist save/remove event', files.wishlist.includes("trackEvent('save'") && files.wishlist.includes("action: added ? 'save' : 'remove'")],
  ['B2B landing view event', files.business.includes("trackEvent('business_view'")],
  ['B2B inquiry start event', files.business.includes("trackEvent('business_inquiry_start'")],
  ['B2B inquiry submit event', files.business.includes("trackEvent('business_inquiry_submit'")],
  ['B2B analytics excludes form values', !/trackEvent\([\s\S]{0,250}(form\.|email:|phone:|name:)/.test(files.business)],
  ['auth attribution is non-identifying', files.auth.includes('__WAKATION_AUTH_STATE__') && !files.auth.includes('__WAKATION_USER_ID__')],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[monetization-tracking] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[monetization-tracking] PASS — ${requiredAffiliateFields.length} required fields, dedupe, campaign, save and B2B funnel checks.`)
