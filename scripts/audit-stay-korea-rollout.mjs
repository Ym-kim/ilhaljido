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

assert.ok(destinations.includes("process.env.NEXT_PUBLIC_VERCEL_ENV"), 'Vercel Preview fallback is missing')
assert.ok(destinations.includes("if (value === '0' || value === 'false') return false"), 'Explicit rollout kill-switch is missing')
assert.ok(destinations.includes("environment.vercelEnvironment?.trim().toLowerCase() === 'preview'"), 'Korea pilot must default on only in Preview')
assert.ok(destinations.includes('...(isKoreaStayPilotRolloutEnabled() ? KOREA_STAY_PILOT_DESTINATIONS : [])'), 'Korea list is not gated')

for (const id of ['korea-busan', 'korea-jeju', 'korea-seoul']) {
  assert.ok(destinations.includes(`id: '${id}'`), `${id}: pilot definition missing`)
  assert.ok(view.includes(`'${id}': '/media/destinations/`), `${id}: verified local visual missing`)
}

for (const page of [koPage, enPage, jaPage]) {
  assert.ok(page.includes('isKoreaStayPilotRolloutEnabled()'), 'Localized metadata does not follow rollout scope')
}

assert.ok(view.includes('includesKoreaPilot ? c.introExpanded : c.intro'), 'Localized scope copy does not follow rollout flag')

console.log('[stay-korea-rollout] PASS — Korea candidates are localized, image-backed, Preview-on and Production-off behind one provider-neutral flag.')
