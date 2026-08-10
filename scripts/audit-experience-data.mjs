import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const data = read('src/lib/experiences/editorials.ts')
const items = read('src/lib/affiliate/items.ts')
const media = read('src/lib/media/assets.ts')
const sitemap = read('src/app/sitemap.ts')
const health = read('src/app/api/health/affiliates/route.ts')

const failures = []
const required = [
  ['editorial slug', "slug: 'itoshima-photo-bus-tour'", data],
  ['affiliate item reference', "affiliateItemId: 'act-klook-itoshima-photo-bus'", data],
  ['catalog item', "id: 'act-klook-itoshima-photo-bus'", items],
  ['active provider', "status: 'active_affiliate'", data],
  ['Klook redirect', 'https://affiliate.klook.com/redirect?aid=126848&k_site=', items],
  ['Klook product id', '115689-fukuoka-itoshima-half-day-bus-tour', items],
  ['review source', 'reviewSnapshot:', data],
  ['review verified date', "verifiedAt: '2026-07-30'", data],
  ['media manifest', "id: 'itoshima-coast-editorial-model-g-v2'", media],
  ['illustrative flag', 'illustrative: true', media],
  ['sitemap registration', 'EXPERIENCE_EDITORIALS', sitemap],
  ['health check', 'klook:itoshima-photo-bus', health],
  ['Busan editorial slug', "slug: 'busan-coastal-highlights-day-tour'", data],
  ['Busan affiliate item reference', "affiliateItemId: 'act-klook-busan-coastal-highlights'", data],
  ['Busan catalog item', "id: 'act-klook-busan-coastal-highlights'", items],
  ['Busan Klook product id', '74132-busan-oneday-tour-busan', items],
  ['Busan localized deep links', "JP: 'https://affiliate.klook.com/redirect?aid=126848", items],
  ['Busan media manifest', "id: 'domestic-busan-model-h-haeundae-v4'", media],
  ['Busan health check', 'klook:busan-coastal-highlights', health],
  ['Seoul editorial slug', "slug: 'hongdae-kpop-walk-dance'", data],
  ['Seoul affiliate item reference', "affiliateItemId: 'act-kkday-hongdae-kpop-walk'", data],
  ['Seoul catalog item', "id: 'act-kkday-hongdae-kpop-walk'", items],
  ['Seoul KKday tracking', 'product/105485?cid=25833', items],
  ['Seoul Japanese guide fact', "value: L('영어·일본어·중국어'", data],
  ['Seoul eligibility notice', '한국 국적 구매 제한', data],
  ['Seoul media manifest', "id: 'experience-seoul-model-i-kpop-studio-v2'", media],
  ['Seoul health check', 'kkday:hongdae-kpop-walk', health],
]

for (const [label, needle, source] of required) {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`)
}

const assets = [
  path.join(root, 'public/campaign/itoshima-coast-editorial-model-g-v2.webp'),
  path.join(root, 'public/media/brand-models/domestic-busan-model-h-haeundae-v4.webp'),
  path.join(root, 'public/media/brand-models/experience-seoul-model-i-kpop-studio-v2.webp'),
]
for (const asset of assets) {
  if (!fs.existsSync(asset) || fs.statSync(asset).size === 0) failures.push(`editorial image missing or empty: ${asset}`)
}

const slugs = [...data.matchAll(/slug: '([^']+)'/g)].map((match) => match[1])
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index)
if (duplicates.length) failures.push(`duplicate slugs: ${[...new Set(duplicates)].join(', ')}`)

if (failures.length) {
  console.error(`Experience data audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const totalBytes = assets.reduce((total, asset) => total + fs.statSync(asset).size, 0)
console.log(`Experience data audit passed: 3 editorials, ${totalBytes} total image bytes, Klook/KKday tracking and locale routes registered.`)

