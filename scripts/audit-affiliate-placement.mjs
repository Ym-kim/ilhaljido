import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const files = {
  featured: readFileSync(join(root, 'src/lib/affiliate/featured.ts'), 'utf8'),
  items: readFileSync(join(root, 'src/lib/affiliate/items.ts'), 'utf8'),
  card: readFileSync(join(root, 'src/components/affiliate/AffiliateCard.tsx'), 'utf8'),
  learn: readFileSync(join(root, 'src/app/learn/page.tsx'), 'utf8'),
  localize: readFileSync(join(root, 'src/lib/affiliate/localize.ts'), 'utf8'),
}

const activeCourseIds = [
  'course-gpts-automation',
  'course-chatgpt-work',
  'course-instagram-marketing',
  'course-midjourney-class',
  'course-smartstore-keyword',
  'course-claude-vibecoding',
]

const checks = [
  ['Booking tracking', /aid=7854081/.test(files.featured + files.items)],
  ['Trip.com tracking', /Allianceid=9024807/.test(files.featured + files.items)],
  ['Busan cruise affiliate hub', /cruise-busan-departures[\s\S]*from-busan-253\/[?]Allianceid=9024807/.test(files.featured)],
  ['KKday tracking', /cid=25833/.test(files.featured + files.items)],
  ['Klook tracking', /aid=126848/.test(files.featured + files.items)],
  ['Airalo tracking', /7451946\/1268485\/15608/.test(files.featured + files.items)],
  ['Inflearn short links', /https:\/\/inf\.run\//.test(files.featured)],
  ['Sponsored rel', files.card.includes('sponsored noopener noreferrer')],
  ['Learn active-only filter', files.learn.includes("status === 'active_affiliate'")],
  ['Learn has no placeholder catalog import', !files.learn.includes('PROGRAMS_LEARN_ITEMS')],
  ['Active courses have EN and JP overlays', activeCourseIds.every((id) => files.localize.split(`'${id}'`).length - 1 >= 2)],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[affiliate-placement] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const activeCount = (files.featured + files.items).match(/status:\s*'active_affiliate'/g)?.length ?? 0
console.log(`[affiliate-placement] PASS — ${activeCount} active catalog entries; tracking and disclosure invariants present.`)
