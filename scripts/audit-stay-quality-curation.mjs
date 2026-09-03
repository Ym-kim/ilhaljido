import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'

const moduleUrl = pathToFileURL(join(process.cwd(), 'src/lib/stays/qualitySelection.ts')).href
const {
  curateStayResults,
  STAY_CANDIDATE_POOL_SIZE,
  STAY_DISPLAY_TARGET,
  STAY_MINIMUM_REVIEW_SCORE,
} = await import(moduleUrl)

const makeResult = (index, overrides = {}) => ({
  provider: 'agoda',
  propertyId: String(index + 1),
  name: `Stay ${index + 1}`,
  bookingHref: `https://www.agoda.com/stay-${index + 1}?cid=1968994`,
  imageUrl: index % 4 === 0 ? undefined : `https://pix.example/stay-${index + 1}.jpg`,
  imageStatus: index % 4 === 0 ? 'neutral_placeholder' : 'provider_image',
  starRating: 3 + (index % 5) * 0.5,
  reviewScore: 8 + (index % 8) * 0.2,
  reviewCount: index % 5 === 0 ? 25 : index % 3 === 0 ? 75 : 300 + index,
  rate: { amount: 80 + index * 30, currency: 'USD' },
  amenities: { freeWifi: index % 2 === 0, breakfastIncluded: index % 3 === 0 },
  ...overrides,
})

const source = Array.from({ length: STAY_CANDIDATE_POOL_SIZE }, (_, index) => makeResult(index))
source.push(makeResult(40, { propertyId: 'low-score', reviewScore: 7.9 }))
source.push(makeResult(41, { propertyId: 'bad-price', rate: { amount: 0, currency: 'USD' } }))
source.push(makeResult(42, { propertyId: '1', reviewScore: 10 }))
const originalIds = source.map((result) => result.propertyId)
const curated = curateStayResults(source)

assert.equal(curated.results.length, STAY_DISPLAY_TARGET)
assert.ok(curated.results.every((result) => result.reviewScore >= STAY_MINIMUM_REVIEW_SCORE))
assert.ok(curated.results.every((result) => result.rate.amount > 0))
assert.equal(new Set(curated.results.map((result) => result.propertyId)).size, curated.results.length)
assert.equal(curated.quality.displayCount, STAY_DISPLAY_TARGET)
assert.equal(curated.quality.candidateCount, STAY_CANDIDATE_POOL_SIZE + 1)
assert.equal(curated.quality.sortMode, 'recommended')
assert.equal(curated.quality.providerImageCount + curated.quality.placeholderCount, STAY_DISPLAY_TARGET)
assert.ok(curated.quality.minimumReviewScore >= STAY_MINIMUM_REVIEW_SCORE)
assert.ok(curated.quality.averageReviewCount > 0)
assert.deepEqual(source.map((result) => result.propertyId), originalIds)
assert.ok(!Object.hasOwn(curated.results[0], 'qualityScore'))

const rates = curated.results.map((result) => result.rate.amount)
assert.ok(Math.min(...rates) < 300, 'value-range candidates should remain represented')
assert.ok(Math.max(...rates) > 600, 'premium-range candidates should remain represented')

const sparse = curateStayResults([
  makeResult(1, { reviewScore: 8.7 }),
  makeResult(2, { reviewScore: 8.1 }),
  makeResult(3, { reviewScore: 7.8 }),
])
assert.equal(sparse.results.length, 2, 'low-quality stays must not be used to force the target count')

console.log('[stay-quality-curation] PASS — 30 candidate pool, quality floor, real-field ranking, price-range balance, 12-card cap and no exposed score.')
