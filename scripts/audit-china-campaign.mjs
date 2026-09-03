import fs from 'node:fs'
import path from 'node:path'
import {
  CHINA_CAMPAIGN_ID,
  CHINA_HOME_CAMPAIGN_WINDOW,
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
assert(Number.isFinite(Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.startAt)), 'campaign startAt must be valid')
assert(Number.isFinite(Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.endAt)), 'campaign endAt must be valid')
assert(Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.startAt) < Date.parse(CHINA_HOME_CAMPAIGN_WINDOW.endAt), 'campaign window must be ordered')
assert(isChinaHomeCampaignActive(new Date(CHINA_HOME_CAMPAIGN_WINDOW.startAt)), 'campaign must activate at startAt')
assert(!isChinaHomeCampaignActive(new Date(CHINA_HOME_CAMPAIGN_WINDOW.endAt)), 'campaign must fail closed at endAt')

const yiwu = CHINA_RESEARCH_VARIANTS.find((variant) => variant.id === 'yiwu')
const guangzhou = CHINA_RESEARCH_VARIANTS.find((variant) => variant.id === 'guangzhou')
assert(yiwu?.status === 'application_page_live' && yiwu.externalUrl?.startsWith('https://'), 'Yiwu requires a verified external application URL')
assert(guangzhou?.status === 'monitoring' && !guangzhou.externalUrl, 'Guangzhou must fail closed without an application URL')
assert(CHINA_RESEARCH_VARIANTS.every((variant) => /^\d{4}-\d{2}-\d{2}$/.test(variant.verifiedAt)), 'every variant requires verifiedAt')
assert(CHINA_RESEARCH_VARIANTS.every((variant) => variant.officialReferenceUrl.startsWith('https://')), 'every variant requires an HTTPS official source')

for (const event of ['campaign_view', 'campaign_click', 'program_variant_click', 'external_application_click']) {
  assert(view.includes(event) || home.includes(event), `missing analytics event: ${event}`)
}
assert(view.includes('rel="noopener noreferrer"'), 'external links must use noopener noreferrer')
assert(!view.includes('rel="sponsored'), 'non-affiliate application links must not be marked sponsored')
assert(sitemap.includes('/programs/china-market-research'), 'campaign route must be in sitemap')
assert(localePath.includes('/programs/china-market-research'), 'campaign route must be localizable')

if (failures.length) {
  console.error(`China campaign audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('China campaign audit PASS')
console.log(`campaign=${CHINA_CAMPAIGN_ID} variants=${CHINA_RESEARCH_VARIANTS.length} active_application_links=1`)
