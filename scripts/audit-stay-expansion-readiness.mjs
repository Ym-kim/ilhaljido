import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const registry = read('src/lib/affiliate/agodaCities.ts')
const destinations = read('src/lib/affiliate/destinations.ts')
const guides = read('src/lib/guides.ts')
const tripSets = read('src/lib/affiliate/collections.ts')
const publicPilot = read('src/lib/stays/pilotDestinations.ts')
const readinessPath = join(root, 'src/lib/stays/expansionReadiness.ts')
const { STAY_EXPANSION_CANDIDATES, scoreStayExpansionCandidate, isStayExpansionCandidateReady } = await import(pathToFileURL(readinessPath).href)

assert.equal(STAY_EXPANSION_CANDIDATES.length, 3)
assert.equal(new Set(STAY_EXPANSION_CANDIDATES.map((candidate) => candidate.id)).size, 3)

for (const candidate of STAY_EXPANSION_CANDIDATES) {
  assert.ok(registry.includes(`'${candidate.id}': ${candidate.cityId}`), `${candidate.id}: city ID registry mismatch`)
  assert.ok(guides.includes(`slug: '${candidate.guideSlug}'`), `${candidate.id}: guide missing`)
  assert.ok(tripSets.includes(`slug: '${candidate.tripSetSlug}'`), `${candidate.id}: Trip Set missing`)
  assert.ok(destinations.includes(`id: '${candidate.affiliateDestinationId}'`), `${candidate.id}: affiliate destination missing`)
  assert.ok(destinations.includes('cid=1968994'), 'active Agoda CID missing')
  assert.ok(existsSync(join(root, 'public', candidate.mediaPath.slice(1))), `${candidate.id}: local media missing`)
  assert.equal(scoreStayExpansionCandidate(candidate), 100, `${candidate.id}: verified live QA must complete the score`)
  assert.equal(isStayExpansionCandidateReady(candidate), true, `${candidate.id}: verified candidate should be release-ready`)
  assert.equal(candidate.rolloutStatus, 'qa_verified_not_enabled', `${candidate.id}: rollout status must remain disabled`)
  assert.ok(candidate.liveQualityEvidence.resultCount >= 3, `${candidate.id}: live result evidence is insufficient`)
  assert.ok(candidate.liveQualityEvidence.displayableResultCount >= 3, `${candidate.id}: product-card evidence is insufficient`)
  assert.ok(candidate.liveQualityEvidence.providerImageResultCount >= 0, `${candidate.id}: provider image evidence is malformed`)
}

assert.ok(publicPilot.includes('NEXT_PUBLIC_STAY_KOREA_PILOT'), 'Korea rollout flag missing')
assert.ok(publicPilot.includes('isKoreaStayPilotRolloutEnabled() ? KOREA_STAY_PILOT_DESTINATIONS : []'), 'Korea destinations are not flag-gated')

assert.ok(destinations.includes("id: 'korea-jeju'") && destinations.includes("photo: '/media/destinations/jeju-editorial-v1.webp'"))
assert.ok(!destinations.includes("photo: '/covers/dest-jeju-ai.jpeg'"), 'legacy Jeju AI cover remains')

console.log('[stay-expansion-readiness] PASS — 3 candidates score 100/100 and remain behind the default-off Korea rollout flag.')
