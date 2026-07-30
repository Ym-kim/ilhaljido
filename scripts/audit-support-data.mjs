import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalogPath = path.join(root, 'src/lib/support/catalog.ts')
const sourcePath = path.join(root, 'src/lib/i18n/data.ts')
const catalog = fs.readFileSync(catalogPath, 'utf8')
const source = fs.readFileSync(sourcePath, 'utf8')

const profileSection = catalog.slice(catalog.indexOf('export const SUPPORT_PROFILES'), catalog.indexOf('const PROFILE_BY_ID'))
const dataSection = source.slice(source.indexOf('const SUPPORT_PROGRAMS'), source.indexOf('export function getSupportPrograms'))

const profileIds = [...profileSection.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1])
const sourceIds = [...dataSection.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1])
const verifiedDates = [...profileSection.matchAll(/\bverifiedAt:\s*'(\d{4}-\d{2}-\d{2})'/g)].map((match) => match[1])
const applicationDates = [...profileSection.matchAll(/\bapplication(?:Start|End):\s*'([^']+)'/g)].map((match) => match[1])
const travelDates = [...profileSection.matchAll(/\btravel(?:Start|End):\s*'([^']+)'/g)].map((match) => match[1])
const sourceUrls = [...dataSection.matchAll(/\bhref:\s*'([^']+)'/g)].map((match) => match[1])

const errors = []
const warnings = []

function duplicates(items) {
  return [...new Set(items.filter((item, index) => items.indexOf(item) !== index))]
}

for (const id of duplicates(profileIds)) errors.push(`duplicate support profile id: ${id}`)
for (const id of duplicates(sourceIds)) errors.push(`duplicate SUPPORT_PROGRAMS id: ${id}`)
for (const id of sourceIds.filter((id) => !profileIds.includes(id))) errors.push(`missing discovery profile: ${id}`)
for (const id of profileIds.filter((id) => !sourceIds.includes(id))) errors.push(`orphan discovery profile: ${id}`)

if (verifiedDates.length !== profileIds.length) {
  errors.push(`verifiedAt count ${verifiedDates.length} does not match profile count ${profileIds.length}`)
}

for (const date of [...verifiedDates, ...applicationDates, ...travelDates]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) errors.push(`invalid ISO date: ${date}`)
}

for (const url of sourceUrls) {
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`unsupported source URL: ${url}`)
    if (parsed.protocol === 'http:') warnings.push(`official source still uses HTTP: ${url}`)
  } catch {
    errors.push(`invalid official source URL: ${url}`)
  }
}

if (sourceUrls.length !== sourceIds.length) errors.push(`official source count ${sourceUrls.length} does not match program count ${sourceIds.length}`)
if (/foreignerEligibility:\s*'eligible'/.test(profileSection)) warnings.push('foreigner eligible flag exists — verify supporting official language manually')
if (!catalog.includes("foreignerEligibility: 'unknown'")) errors.push('unknown foreigner eligibility fallback is missing')
if (!catalog.includes("'closing_soon'")) errors.push('closing-soon status is missing')
if (!catalog.includes('14 * 86_400_000')) errors.push('closing-soon calculation is missing')
if (!catalog.includes('getSupportCalendarEvents')) errors.push('support calendar event builder is missing')

const requiredPages = [
  'src/app/programs/support/[slug]/page.tsx',
  'src/app/en/programs/support/[slug]/page.tsx',
  'src/app/ja/programs/support/[slug]/page.tsx',
  'src/app/programs/support/half-price-travel/page.tsx',
  'src/app/en/programs/support/half-price-travel/page.tsx',
  'src/app/ja/programs/support/half-price-travel/page.tsx',
  'src/app/programs/support/calendar/page.tsx',
  'src/app/en/programs/support/calendar/page.tsx',
  'src/app/ja/programs/support/calendar/page.tsx',
]
for (const relative of requiredPages) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`missing public route: ${relative}`)
}

console.log(`support data: ${sourceIds.length} programs, ${profileIds.length} discovery profiles, ${sourceUrls.length} official URLs`)
for (const warning of warnings) console.warn(`warning: ${warning}`)
if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`)
  process.exit(1)
}
console.log('support data audit passed')

