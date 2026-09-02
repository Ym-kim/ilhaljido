import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'

const moduleUrl = pathToFileURL(join(process.cwd(), 'src/lib/stays/resultRefinement.ts')).href
const {
  EMPTY_STAY_RESULT_FILTERS,
  getStayResultFilterAvailability,
  refineStayResults,
} = await import(moduleUrl)

const results = [
  {
    provider: 'agoda', propertyId: 'one', name: 'One', bookingHref: 'https://www.agoda.com/one',
    rate: { amount: 180, currency: 'USD' }, reviewScore: 8.7,
    amenities: { freeWifi: true },
  },
  {
    provider: 'agoda', propertyId: 'two', name: 'Two', bookingHref: 'https://www.agoda.com/two',
    rate: { amount: 120, currency: 'USD' }, reviewScore: 7.4,
    amenities: { breakfastIncluded: true },
  },
  {
    provider: 'agoda', propertyId: 'three', name: 'Three', bookingHref: 'https://www.agoda.com/three',
    rate: { amount: 180, currency: 'USD' }, amenities: { freeWifi: true, breakfastIncluded: true },
  },
]

const originalOrder = results.map((result) => result.propertyId)
assert.deepEqual(refineStayResults(results, 'provider_order', EMPTY_STAY_RESULT_FILTERS).map((result) => result.propertyId), originalOrder)
assert.deepEqual(refineStayResults(results, 'rate_asc', EMPTY_STAY_RESULT_FILTERS).map((result) => result.propertyId), ['two', 'one', 'three'])
assert.deepEqual(refineStayResults(results, 'review_desc', EMPTY_STAY_RESULT_FILTERS).map((result) => result.propertyId), ['one', 'two', 'three'])
assert.deepEqual(refineStayResults(results, 'provider_order', { ...EMPTY_STAY_RESULT_FILTERS, freeWifi: true }).map((result) => result.propertyId), ['one', 'three'])
assert.deepEqual(refineStayResults(results, 'provider_order', { ...EMPTY_STAY_RESULT_FILTERS, breakfastIncluded: true }).map((result) => result.propertyId), ['two', 'three'])
assert.deepEqual(refineStayResults(results, 'provider_order', { ...EMPTY_STAY_RESULT_FILTERS, reviewEightPlus: true }).map((result) => result.propertyId), ['one'])
assert.deepEqual(results.map((result) => result.propertyId), originalOrder)
assert.deepEqual(getStayResultFilterAvailability(results), { freeWifi: true, breakfastIncluded: true, reviewEightPlus: true })

console.log('[stay-result-refinement] PASS — provider order, stable sorting, actual-field filters and immutability checks.')
