import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const files = {
  model: read('src/lib/verification.ts'),
  collections: read('src/lib/affiliate/collections.ts'),
  criteria: read('src/components/affiliate/SelectionCriteria.tsx'),
  tripSetCard: read('src/components/affiliate/TripSetPreparationCard.tsx'),
  productBrowser: read('src/components/affiliate/ProductBrowser.tsx'),
  strings: read('src/lib/i18n/strings.ts'),
  layout: read('src/app/layout.tsx'),
  business: read('src/app/business/page.tsx'),
  businessLayout: read('src/app/business/layout.tsx'),
}

const errors = []
const levels = ['research', 'partner', 'field', 'editorial']

for (const level of levels) {
  if (!files.model.includes(`${level}: {`)) errors.push(`verification copy missing for ${level}`)
}

if (!files.criteria.includes('VERIFICATION_LEVEL_COPY')) {
  errors.push('SelectionCriteria must use the shared verification-level copy')
}
if (!files.tripSetCard.includes('verificationLabel(verificationLevel, lang)')) {
  errors.push('Trip Set cards must expose the evidence level beside the checked date')
}

const conversionBlocks = [...files.collections.matchAll(/affiliateItemId:\s*'[^']+'[\s\S]*?verifiedAt:\s*'\d{4}-\d{2}-\d{2}'/g)]
if (conversionBlocks.length !== 16) {
  errors.push(`expected 16 Trip Set conversion records, found ${conversionBlocks.length}`)
}
for (const [index, match] of conversionBlocks.entries()) {
  if (!/verificationLevel:\s*'(research|partner|field|editorial)'/.test(match[0])) {
    errors.push(`Trip Set conversion record ${index + 1} is missing a valid verificationLevel`)
  }
}

const highRiskCopy = [
  ['blanket verified-only claim', /검증한 것만|verified before we show it/i],
  ['blanket partner verification claim', /검증된 (?:외부 )?파트너|verified (?:external )?partner products|検証済み(?:外部)?パートナー/],
  ['unsupported space guarantee', /모든 공간은 .*통과|Every space must pass|すべての空間は.*基準/],
  ['unsupported WiFi guarantee', /WiFi 실측 100Mbps\+|Work-grade speed guaranteed|業務用速度を保証/],
  ['blanket on-site listing claim', /직접 현장 방문 후 등록|after on-site visits|現地訪問後に登録/],
]

const customerCopy = [
  files.productBrowser,
  files.strings,
  files.layout,
  files.business,
  files.businessLayout,
]

for (const [name, pattern] of highRiskCopy) {
  if (customerCopy.some((source) => pattern.test(source))) errors.push(name)
}

if (errors.length > 0) {
  console.error('[verification-claims] FAIL')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('[verification-claims] PASS — four evidence levels, 16 dated Trip Set records and high-risk copy guardrails.')
