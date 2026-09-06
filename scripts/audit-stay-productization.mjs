import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const files = {
  domain: read('src/lib/stays/domain.ts'),
  adapter: read('src/lib/stays/providers/agodaLive.ts'),
  destinations: read('src/lib/stays/pilotDestinations.ts'),
  analytics: read('src/lib/stays/analytics.ts'),
  view: read('src/components/stays/StaySearchPilotView.tsx'),
  hotel: read('src/components/select/HotelSelectView.tsx'),
  report: read('docs/audits/agoda-live-stay-productization-gap-report-2026-09-03.md'),
}

const checks = [
  ['Image-optional Stay domain is explicit', files.domain.includes("'provider_image' | 'neutral_placeholder'") && files.domain.includes('imageStatus: StayImageStatus')],
  ['Missing images do not discard valid properties', files.adapter.includes('.filter((hotel): hotel is StaySearchResult => hotel !== null)') && !files.adapter.includes('hotel !== null && Boolean(hotel.imageUrl)') && !files.view.includes('response.results.filter((result) => Boolean(result.imageUrl))')],
  ['Legacy provider images normalize only on Agoda-owned hosts', files.adapter.includes("trimmed.startsWith('//')") && files.adapter.includes("url.hostname.endsWith('.agoda.net')") && files.adapter.includes("url.hostname.endsWith('.agoda.com')") && files.adapter.includes("url.protocol = 'https:'")],
  ['Broken or absent provider images fall back to a neutral placeholder', files.view.includes('onError={() => setImageFailed(true)}') && files.view.includes('WAKATION STAY') && files.view.includes('숙소 사진은 Agoda에서 확인')],
  ['No destination or generated photo impersonates a hotel', !files.view.includes('destinationImages[index % destinationImages.length]') && !files.view.includes('TEMI') && !files.view.includes('BOMI')],
  ['Provider and Wakation facts are visually separated', files.view.includes('providerFacts') && files.view.includes('Wakation 조사 메모') && files.view.includes("result.intelligence && lang !== 'ZH'")],
  ['Guest score and provider property rating are separately labelled', files.view.includes("review: '숙박객 평점'") && files.view.includes("propertyClass: 'Agoda 숙소 등급'") && files.view.includes('국가별 공식 호텔 등급과 다를 수 있습니다')],
  ['Discount requires internally consistent live values', files.view.includes('getSafeDiscountPercentage') && files.view.includes('Math.abs(calculated - provided) <= 5')],
  ['Agoda CTA preserves sponsored external-link semantics', files.view.includes('rel="sponsored noopener noreferrer"') && files.view.includes('객실·최종요금 확인')],
  ['Provider landing URL is validated without affiliate rewriting', files.adapter.includes('safeAgodaLandingUrl') && files.adapter.includes('AGODA_STAY_PROVIDER.publicTrackingId') && files.adapter.includes('url.searchParams.get(key) === expectedValue') && !files.adapter.includes('url.searchParams.set(')],
  ['Outbound commerce emits affiliate redirect telemetry', files.view.includes("trackStayEvent('affiliate_redirect'")],
  ['Telemetry exposes bounded product signals only', files.analytics.includes('image_status:') && files.analytics.includes('discount_present:') && files.analytics.includes('wakation_note_present:') && !/(hotel_name|booking_url|checkin|checkout|email|phone)\s*:/.test(files.analytics)],
  ['Destination rollout supports ready, fallback and disabled states', files.destinations.includes("'AGODA_READY' | 'BOOKING_FALLBACK' | 'DISABLED'") && files.adapter.includes("destination.rolloutStatus !== 'AGODA_READY'")],
  ['Main hotel page retains a controlled live-search Beta entry', files.hotel.includes('WAKATION 실시간 숙소 찾기 · BETA') && files.hotel.includes("localizeHref('/select/hotel/pilot', lang)")],
  ['Gap report covers all requested first-deliverable sections', ['## A.', '## B.', '## C.', '## D.', '## E.', '## F.', '## G.', '## H.', '## I.'].every((heading) => files.report.includes(heading))],
  ['Client product modules do not reference Agoda credentials', !/AGODA_API_KEY|AGODA_SITE_ID|Authorization/.test(`${files.view}\n${files.hotel}\n${files.analytics}`)],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[stay-productization] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[stay-productization] PASS — ${checks.length} image, card, rollout, tracking, locale-copy and security checks.`)
