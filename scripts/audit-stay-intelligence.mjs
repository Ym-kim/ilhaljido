import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const intelligencePath = join(root, 'src/lib/stays/intelligence.ts')
const moduleUrl = pathToFileURL(intelligencePath).href
const source = readFileSync(intelligencePath, 'utf8')
const { VERIFIED_STAY_INTELLIGENCE, getVerifiedStayIntelligence } = await import(moduleUrl)

assert.equal(VERIFIED_STAY_INTELLIGENCE.length, 3)
assert.equal(new Set(VERIFIED_STAY_INTELLIGENCE.map((item) => `${item.provider}:${item.propertyId}`)).size, VERIFIED_STAY_INTELLIGENCE.length)
assert.ok(VERIFIED_STAY_INTELLIGENCE.every((item) => item.provider === 'agoda'))
assert.ok(VERIFIED_STAY_INTELLIGENCE.every((item) => /^\d+$/.test(item.propertyId)))
assert.ok(VERIFIED_STAY_INTELLIGENCE.every((item) => /^https:\/\//.test(item.sourceUrl)))
assert.ok(VERIFIED_STAY_INTELLIGENCE.every((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt)))
assert.ok(VERIFIED_STAY_INTELLIGENCE.every((item) => ['KO', 'EN', 'JP'].every((locale) => item.workNote[locale] && item.sourceLabel[locale])))
assert.ok(!/toLowerCase|localeCompare|includes\(|startsWith\(|levenshtein|hotelName/.test(source), 'Fuzzy or name-based matching is forbidden')

const fukuoka = getVerifiedStayIntelligence({
  provider: 'agoda', propertyId: '2429693', destinationId: 'japan-fukuoka', locale: 'KO',
})
assert.equal(fukuoka?.sourceItemId, 'stay-webase-hakata')
assert.equal(getVerifiedStayIntelligence({
  provider: 'agoda', propertyId: '2429693', destinationId: 'japan-osaka', locale: 'KO',
}), undefined, 'Destination mismatch must fail closed')
assert.equal(getVerifiedStayIntelligence({
  provider: 'agoda', propertyId: 'unknown', destinationId: 'japan-fukuoka', locale: 'KO',
}), undefined, 'Unknown property IDs must not receive Wakation notes')

console.log('[stay-intelligence] PASS — explicit IDs, source evidence, localization and fail-closed matching checks.')
