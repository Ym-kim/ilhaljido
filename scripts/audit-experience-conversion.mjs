import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const data = read('src/lib/experiences/editorials.ts')
const items = read('src/lib/affiliate/items.ts')
const featured = read('src/lib/affiliate/featured.ts')
const view = read('src/components/experiences/ExperienceEditorialView.tsx')
const card = read('src/components/experiences/ExperiencePreparationCard.tsx')
const koRoute = read('src/app/experiences/[slug]/page.tsx')

const requiredItems = [
  ['feat-fukuoka-hotel', 'aid=7854081'],
  ['feat-flight-tripcom', 'Allianceid=9024807'],
  ['esim-klook-japan', 'aid=126848'],
]

const busanRequiredItems = [
  ['stay-uh-busan', 'aid=7854081'],
  ['cruise-panstar-miracle', 'aid=126848'],
  ['feat-transfer-klook', 'aid=126848'],
]

const seoulRequiredItems = [
  ['stay-fraser-seoul', 'aid=7854081'],
  ['esim-airalo-korea', '7451946'],
  ['feat-transfer-klook', 'aid=126848'],
]

const checks = [
  ['preparation model', data.includes('preparationItems: ExperiencePreparationItem[]')],
  ['three itinerary-led preparation items', requiredItems.every(([id]) => data.includes(`itemId: '${id}'`))],
  ['three Busan itinerary-led preparation items', busanRequiredItems.every(([id]) => data.includes(`itemId: '${id}'`))],
  ['three Seoul itinerary-led preparation items', seoulRequiredItems.every(([id]) => data.includes(`itemId: '${id}'`))],
  ['KO/EN/JA reasons', (data.match(/reason: L\(/g)?.length ?? 0) >= 3],
  ['Fukuoka flight deep link', items.includes('seoul-to-fukuoka/airfares-sel-fuk/?Allianceid=9024807')],
  ['preparation section', view.includes('id="prepare"') && view.includes('ExperiencePreparationCard')],
  ['affiliate attribution', card.includes("sourceSection: 'experience_preparation'")],
  ['sponsored rel', card.includes('rel="sponsored noopener noreferrer"')],
  ['wishlist reuse', card.includes('useWishlist') && card.includes("content_type: 'experience_preparation'")],
  ['recently viewed reuse', card.includes('recordRecentlyViewed(item.id)')],
  ['KO route locale lock', koRoute.includes('forceLang="KO"')],
  ['no separate Ready UI', !view.includes('Wakation Ready') && !card.includes('Wakation Ready')],
  ...requiredItems.map(([id, tracking]) => [
    `${id} active with tracking`,
    (items + featured).includes(`id: '${id}'`)
      && (items + featured).includes(tracking)
      && (items + featured).includes("status: 'active_affiliate'"),
  ]),
  ...busanRequiredItems.map(([id, tracking]) => [
    `${id} active with tracking`,
    (items + featured).includes(`id: '${id}'`)
      && (items + featured).includes(tracking)
      && (items + featured).includes("status: 'active_affiliate'"),
  ]),
  ...seoulRequiredItems.map(([id, tracking]) => [
    `${id} active with tracking`,
    (items + featured).includes(`id: '${id}'`)
      && (items + featured).includes(tracking)
      && (items + featured).includes("status: 'active_affiliate'"),
  ]),
]

const failures = checks.filter(([, passed]) => !passed).map(([label]) => label)
if (failures.length) {
  console.error(`[experience-conversion] FAIL (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('[experience-conversion] PASS — Fukuoka, Busan and Seoul preparation flows, localized rationale, attribution, save and disclosure invariants present.')
