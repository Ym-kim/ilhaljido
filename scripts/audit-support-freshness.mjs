import fs from 'node:fs'
import path from 'node:path'

const catalog = fs.readFileSync(path.join(process.cwd(), 'src/lib/support/catalog.ts'), 'utf8')
const profileSection = catalog.slice(catalog.indexOf('export const SUPPORT_PROFILES'), catalog.indexOf('const PROFILE_BY_ID'))
const asOfArg = process.argv.find((arg) => arg.startsWith('--as-of='))?.slice('--as-of='.length)
const asOf = asOfArg ?? new Date().toISOString().slice(0, 10)

if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || Number.isNaN(Date.parse(`${asOf}T00:00:00Z`))) {
  console.error(`invalid --as-of date: ${asOf}`)
  process.exit(1)
}

const profiles = profileSection
  .split(/\r?\n/)
  .map((line) => ({
    id: line.match(/\bid:\s*'([^']+)'/)?.[1],
    verifiedAt: line.match(/\bverifiedAt:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1],
  }))
  .filter((profile) => profile.id && profile.verifiedAt)
  .map((profile) => ({
    ...profile,
    ageDays: Math.max(0, Math.floor((Date.parse(`${asOf}T23:59:59+09:00`) - Date.parse(`${profile.verifiedAt}T23:59:59+09:00`)) / 86_400_000)),
  }))

const watch = profiles.filter((profile) => profile.ageDays > 30 && profile.ageDays <= 45)
const stale = profiles.filter((profile) => profile.ageDays > 45)
const future = profiles.filter((profile) => profile.verifiedAt > asOf)

console.log(`support freshness: ${profiles.length} profiles as of ${asOf}`)
console.log(`fresh ${profiles.length - watch.length - stale.length}, watch ${watch.length}, stale ${stale.length}`)
if (future.length) {
  console.error(`error: future verification date: ${future.map((profile) => `${profile.id}(${profile.verifiedAt})`).join(', ')}`)
  process.exit(1)
}
if (watch.length) console.warn(`warning: recheck soon: ${watch.map((profile) => `${profile.id}(${profile.ageDays}d)`).join(', ')}`)
if (stale.length) {
  console.error(`error: source re-verification required: ${stale.map((profile) => `${profile.id}(${profile.ageDays}d)`).join(', ')}`)
  process.exit(1)
}
console.log('support freshness audit passed')
