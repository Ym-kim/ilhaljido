import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const criticalFiles = [
  'src/components/affiliate/AffiliateCard.tsx',
  'src/components/affiliate/CollectionsHub.tsx',
  'src/components/affiliate/CoupangGear.tsx',
  'src/components/affiliate/DestinationCard.tsx',
  'src/components/home/CollectionsSection.tsx',
  'src/components/home/DomesticOnboarding.tsx',
  'src/components/home/MoodExplorer.tsx',
  'src/components/home/MoreExplore.tsx',
  'src/components/programs/ProgramsHubView.tsx',
  'src/components/editorial/StoriesHubView.tsx',
]

const errors = []
const warnings = []
let cardMarkers = 0
let gridMarkers = 0

async function collectTsxFiles(folder) {
  const found = []
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const absolute = path.join(folder, entry.name)
    if (entry.isDirectory()) found.push(...await collectTsxFiles(absolute))
    else if (entry.isFile() && entry.name.endsWith('.tsx')) found.push(absolute)
  }
  return found
}

for (const relative of criticalFiles) {
  const source = await readFile(path.join(root, relative), 'utf8')
  cardMarkers += (source.match(/data-ui-card=/g) ?? []).length
  gridMarkers += (source.match(/data-ui-grid=/g) ?? []).length
  if (/images\.unsplash\.com/.test(source)) {
    errors.push(`${relative}: external hotlink remains in a critical card surface`)
  }
  if (/[🏨💻🌿✈️📚🛂📊🚢⛳🎓🧘♨️🎌]/u.test(source)) {
    errors.push(`${relative}: decorative emoji remains in a critical card surface`)
  }
}

const forbiddenCustomerLabels = /편집 이미지|에디토리얼 이미지|Editorial image|Regional editorial image|編集イメージ|編集画像|編集写真/u
for (const folder of ['src/app', 'src/components']) {
  for (const absolute of await collectTsxFiles(path.join(root, folder))) {
    const source = await readFile(absolute, 'utf8')
    if (forbiddenCustomerLabels.test(source)) {
      errors.push(`${path.relative(root, absolute)}: customer-facing generated-image label remains`)
    }
  }
}

const coupangGearSource = await readFile(path.join(root, 'src/components/affiliate/CoupangGear.tsx'), 'utf8')
for (const marker of ['data-coupang-gear-grid', 'data-coupang-gear-card', 'data-coupang-gear-title']) {
  if (!coupangGearSource.includes(marker)) {
    errors.push(`src/components/affiliate/CoupangGear.tsx: missing ${marker} mobile layout guard`)
  }
}

const cityCompareSource = await readFile(path.join(root, 'src/components/destinations/CompareView.tsx'), 'utf8')
for (const marker of ['data-city-compare-scroll', 'data-city-compare-swipe-hint', 'data-city-compare-next']) {
  if (!cityCompareSource.includes(marker)) {
    errors.push(`src/components/destinations/CompareView.tsx: missing ${marker} mobile discovery guard`)
  }
}

const homeTripSetSource = await readFile(path.join(root, 'src/components/home/CollectionsSection.tsx'), 'utf8')
for (const marker of ['data-trip-set-meta', 'data-trip-set-content', 'data-trip-set-accent']) {
  if (!homeTripSetSource.includes(marker)) {
    errors.push(`src/components/home/CollectionsSection.tsx: missing ${marker} mobile layout guard`)
  }
}

if (cardMarkers < 7) errors.push(`Expected at least 7 card variant markers; found ${cardMarkers}`)
if (gridMarkers < 5) errors.push(`Expected at least 5 grid markers; found ${gridMarkers}`)

for (const asset of [
  'public/media/brand-models/hosted-models-h-i-coastal-planning-v3.webp',
  'public/media/brand-models/hosted-models-h-i-coastal-planning-mobile-v3.webp',
]) {
  try {
    const info = await stat(path.join(root, asset))
    if (info.size === 0) errors.push(`${asset}: generated Programs hero is empty`)
    if (info.size > 250_000) warnings.push(`${asset}: Programs hero is ${(info.size / 1_000_000).toFixed(2)} MB`)
  } catch {
    errors.push(`${asset}: generated Programs hero is missing`)
  }
}

for (const folder of ['public/campaign', 'public/covers']) {
  const entries = await readdir(path.join(root, folder), { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) continue
    const info = await stat(path.join(root, folder, entry.name))
    if (info.size === 0) errors.push(`${folder}/${entry.name}: 0-byte image`)
    if (info.size > 2_500_000) warnings.push(`${folder}/${entry.name}: ${(info.size / 1_000_000).toFixed(2)} MB`)
  }
}

console.log(`UI audit: ${cardMarkers} card markers, ${gridMarkers} grid markers`)
for (const warning of warnings) console.warn(`WARN ${warning}`)
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`)
  process.exitCode = 1
} else {
  console.log('UI audit passed')
}
