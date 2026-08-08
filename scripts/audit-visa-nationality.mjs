import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const [content, nationality, page, api, guidance] = await Promise.all([
  fs.readFile(path.join(root, 'src/lib/i18n/content.ts'), 'utf8'),
  fs.readFile(path.join(root, 'src/lib/content/visaNationality.ts'), 'utf8'),
  fs.readFile(path.join(root, 'src/app/visa-ai/page.tsx'), 'utf8'),
  fs.readFile(path.join(root, 'src/app/api/visa/route.ts'), 'utf8'),
  fs.readFile(path.join(root, 'src/lib/content/visaGuidance.ts'), 'utf8'),
])

const errors = []
for (const passport of ['KR', 'JP', 'US', 'CA', 'AU', 'GB', 'TW']) {
  if (!content.includes(`value: '${passport}'`)) errors.push(`Missing passport option: ${passport}`)
}
if (!content.includes("value: 'korea'")) errors.push('Korea is missing from visa destinations')
for (const pair of ['KR:japan', 'JP:korea', 'JP:taiwan', 'JP:usa', 'JP:schengen']) {
  if (!nationality.includes(`'${pair}'`)) errors.push(`Missing verified passport-destination source pair: ${pair}`)
}
for (const contract of ['useGeoCountry', 'getSuggestedPassportFromGeo', 'passportCode', 'passportCountry', 'getNationalityVisaSources']) {
  if (!(page + api).includes(contract)) errors.push(`Visa nationality flow is missing: ${contract}`)
}
if (!guidance.includes("passport === 'KR'")) errors.push('Korean-only destination guidance is not passport-gated')
if (api.includes('한국 여권 소지자 기준으로 답변합니다')) errors.push('Visa API is still hard-coded to Korean passports')
if (!api.includes('접속 국가를 국적으로 추정하지 마세요')) errors.push('Visa API lacks the geo-versus-nationality safety rule')

const sourceUrls = [...nationality.matchAll(/sourceUrl:\s*'([^']+)'/g)].map((match) => match[1])
if (sourceUrls.length < 5) errors.push(`Too few nationality-specific official sources: ${sourceUrls.length}`)
for (const url of sourceUrls) {
  if (!url.startsWith('https://')) errors.push(`Non-HTTPS visa source: ${url}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Visa nationality audit passed: ${sourceUrls.length} official pair-source entries, geo used only as a suggestion`)
