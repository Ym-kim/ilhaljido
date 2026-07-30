import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const criticalFiles = [
  'src/components/affiliate/AffiliateCard.tsx',
  'src/components/affiliate/CollectionsHub.tsx',
  'src/components/affiliate/DestinationCard.tsx',
  'src/components/home/CityShowcase.tsx',
  'src/components/home/MoodExplorer.tsx',
  'src/components/home/MoreExplore.tsx',
  'src/components/programs/ProgramsHubView.tsx',
  'src/components/editorial/StoriesHubView.tsx',
]

const errors = []
const warnings = []
let cardMarkers = 0
let gridMarkers = 0

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

if (cardMarkers < 7) errors.push(`Expected at least 7 card variant markers; found ${cardMarkers}`)
if (gridMarkers < 5) errors.push(`Expected at least 5 grid markers; found ${gridMarkers}`)

const assetFile = path.join(root, 'public/campaign/programs-editorial-coastal-work-v1.webp')
try {
  const info = await stat(assetFile)
  if (info.size === 0) errors.push('Generated Programs hero is empty')
  if (info.size > 1_000_000) warnings.push(`Programs hero is ${(info.size / 1_000_000).toFixed(2)} MB`)
} catch {
  errors.push('Generated Programs hero is missing')
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
