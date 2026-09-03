import fs from 'node:fs'
import path from 'node:path'
import {
  CHINA_CAMPAIGN_ID,
  CHINA_APPLICATION_URL,
  CHINA_CAMPAIGN_CONFIG,
  CHINA_RESEARCH_VARIANTS,
  isChinaHomeCampaignActive,
} from '../src/lib/campaigns/chinaMarketResearch.ts'

const root = process.cwd()
const view = fs.readFileSync(path.join(root, 'src/components/campaign/ChinaMarketResearchView.tsx'), 'utf8')
const home = fs.readFileSync(path.join(root, 'src/components/campaign/ChinaCampaignHomePlacement.tsx'), 'utf8')
const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8')
const localePath = fs.readFileSync(path.join(root, 'src/lib/i18n/localePath.ts'), 'utf8')

const failures = []
const assert = (condition, label) => {
  if (!condition) failures.push(label)
}

assert(Boolean(CHINA_CAMPAIGN_ID), 'campaign id is required')
assert(CHINA_RESEARCH_VARIANTS.length === 2, 'exactly two comparison variants are required')
assert(new Set(CHINA_RESEARCH_VARIANTS.map((variant) => variant.id)).size === CHINA_RESEARCH_VARIANTS.length, 'variant ids must be unique')
assert(CHINA_CAMPAIGN_CONFIG.active === true, 'campaign active flag must be explicit')
assert(Number.isFinite(Date.parse(CHINA_CAMPAIGN_CONFIG.startAt)), 'campaign startAt must be valid')
assert(Number.isFinite(Date.parse(CHINA_CAMPAIGN_CONFIG.endAt)), 'campaign endAt must be valid')
assert(Date.parse(CHINA_CAMPAIGN_CONFIG.startAt) < Date.parse(CHINA_CAMPAIGN_CONFIG.endAt), 'campaign window must be ordered')
assert(isChinaHomeCampaignActive(new Date(CHINA_CAMPAIGN_CONFIG.startAt)), 'campaign must activate at startAt')
assert(!isChinaHomeCampaignActive(new Date(CHINA_CAMPAIGN_CONFIG.endAt)), 'campaign must fail closed at endAt')

const yiwu = CHINA_RESEARCH_VARIANTS.find((variant) => variant.id === 'yiwu')
const guangzhou = CHINA_RESEARCH_VARIANTS.find((variant) => variant.id === 'guangzhou')
assert(yiwu?.status === 'external_application_page' && yiwu.externalUrl === CHINA_APPLICATION_URL, 'Yiwu requires the verified October application URL')
assert(guangzhou?.status === 'external_application_page' && guangzhou.externalUrl === CHINA_APPLICATION_URL, 'Guangzhou requires the verified October application URL')
assert(yiwu?.facts.some((fact) => fact.value.KO.includes('2026. 10. 8') && fact.value.KO.includes('10. 12')), 'Yiwu October dates must match Group 126')
assert(guangzhou?.facts.some((fact) => fact.value.KO.includes('2026. 10. 16') && fact.value.KO.includes('10. 20')), 'Guangzhou October dates must match Group 127')
assert(CHINA_RESEARCH_VARIANTS.every((variant) => /^\d{4}-\d{2}-\d{2}$/.test(variant.verifiedAt)), 'every variant requires verifiedAt')
assert(CHINA_RESEARCH_VARIANTS.every((variant) => variant.officialReferenceUrl.startsWith('https://')), 'every variant requires an HTTPS official source')

for (const event of ['campaign_view', 'campaign_click', 'program_variant_click', 'external_application_click']) {
  assert(view.includes(event) || home.includes(event), `missing analytics event: ${event}`)
}
assert(view.includes('rel="noopener noreferrer"'), 'external links must use noopener noreferrer')
assert(!view.includes('rel="sponsored'), 'non-affiliate application links must not be marked sponsored')
assert(sitemap.includes('/programs/china-market-research'), 'campaign route must be in sitemap')
assert(localePath.includes('/programs/china-market-research'), 'campaign route must be localizable')
assert(home.includes('OCTOBER · CHINA BUSINESS'), 'Home must use the October campaign label')

const customerFacingChinaSource = `${view}\n${home}\n${CHINA_RESEARCH_VARIANTS.map((variant) => JSON.stringify(variant)).join('\n')}`
for (const stale of ['SEPTEMBER FIELD NOTE', '125차', '2026. 9. 9', 'Sep 9–13, 2026', '2026年9月9日']) {
  assert(!customerFacingChinaSource.includes(stale), `stale September campaign reference: ${stale}`)
}

if (failures.length) {
  console.error(`China campaign audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('China campaign audit PASS')
console.log(`campaign=${CHINA_CAMPAIGN_ID} variants=${CHINA_RESEARCH_VARIANTS.length} active_application_links=2`)
