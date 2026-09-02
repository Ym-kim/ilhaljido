import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')
const destinations = read('src/lib/stays/pilotDestinations.ts')
const view = read('src/components/stays/StaySearchPilotView.tsx')
const koPage = read('src/app/select/hotel/pilot/page.tsx')
const enPage = read('src/app/en/select/hotel/pilot/page.tsx')
const jaPage = read('src/app/ja/select/hotel/pilot/page.tsx')

assert.ok(destinations.includes("return value === '1' || value === 'true'"), 'Rollout flag must default to off')
assert.ok(destinations.includes('...(isKoreaStayPilotRolloutEnabled() ? KOREA_STAY_PILOT_DESTINATIONS : [])'), 'Korea list is not gated')

for (const id of ['korea-busan', 'korea-jeju', 'korea-seoul']) {
  assert.ok(destinations.includes(`id: '${id}'`), `${id}: pilot definition missing`)
  assert.ok(view.includes(`'${id}': '/media/destinations/`), `${id}: verified local visual missing`)
}

for (const page of [koPage, enPage, jaPage]) {
  assert.ok(page.includes('isKoreaStayPilotRolloutEnabled()'), 'Localized metadata does not follow rollout scope')
}

assert.ok(view.includes('includesKoreaPilot ? c.introExpanded : c.intro'), 'Localized scope copy does not follow rollout flag')

console.log('[stay-korea-rollout] PASS — Korea candidates are localized, image-backed and default-off behind one provider-neutral flag.')
