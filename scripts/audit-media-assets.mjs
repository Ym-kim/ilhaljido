import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const cityDataPath = path.join(root, 'src', 'lib', 'cities.ts')
const guideDataPath = path.join(root, 'src', 'lib', 'guides.ts')
const manifestPath = path.join(root, 'src', 'lib', 'media', 'assets.ts')
const rosterPath = path.join(root, 'src', 'lib', 'media', 'brandModels.ts')
const destinationDirectory = path.join(root, 'public', 'media', 'destinations')
const brandModelDirectory = path.join(root, 'public', 'media', 'brand-models')
const cityIds = ['tokyo', 'osaka', 'fukuoka', 'bali', 'danang', 'chiangmai', 'cebu', 'sydney']
const expectedDestinationIds = [...cityIds, 'jeju', 'seoul', 'busan']
const expectedRosterIds = 'ABCDEFGHIJK'.split('').map((letter) => `WAK-MODEL-${letter}`)

const archivedV1Assets = [
  ['home-hero-model-a-coastal-work-desktop-v1', 'home-hero-model-a-coastal-work-desktop-v1.webp', 1536, 1024],
  ['home-hero-model-a-coastal-work-mobile-v1', 'home-hero-model-a-coastal-work-mobile-v1.webp', 960, 1280],
  ['domestic-seoul-model-d-urban-work-v1', 'domestic-seoul-model-d-urban-work-v1.webp', 1200, 900],
  ['domestic-busan-model-c-coastal-transition-v1', 'domestic-busan-model-c-coastal-transition-v1.webp', 1200, 900],
  ['domestic-jeju-model-a-slow-stay-v1', 'domestic-jeju-model-a-slow-stay-v1.webp', 1200, 900],
  ['trip-match-model-d-city-departure-v1', 'trip-match-model-d-city-departure-v1.webp', 1536, 1024],
].map(([id, file, width, height]) => ({ id, file, width, height, archived: true }))

const v2Assets = [
  { id: 'home-hero-model-a-coastal-work-desktop-v2', file: 'home-hero-model-a-coastal-work-desktop-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-A'] },
  { id: 'home-hero-model-a-coastal-work-mobile-v2', file: 'home-hero-model-a-coastal-work-mobile-v2.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-A'] },
  { id: 'domestic-seoul-model-j-city-noir-v2', file: 'domestic-seoul-model-j-city-noir-v2.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-J'] },
  { id: 'domestic-busan-model-e-coastal-city-v2', file: 'domestic-busan-model-e-coastal-city-v2.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-E'] },
  { id: 'domestic-jeju-model-g-slow-stay-v2', file: 'domestic-jeju-model-g-slow-stay-v2.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-G'] },
  { id: 'trip-match-model-d-itinerary-choice-v2', file: 'trip-match-model-d-itinerary-choice-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-D'] },
  { id: 'hosted-models-h-i-coastal-planning-v2', file: 'hosted-models-h-i-coastal-planning-v2.webp', width: 1440, height: 900, modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'hosted-models-h-i-coastal-planning-mobile-v2', file: 'hosted-models-h-i-coastal-planning-mobile-v2.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'select-model-i-travel-prep-v2', file: 'select-model-i-travel-prep-v2.webp', width: 1440, height: 810, modelIds: ['WAK-MODEL-I'] },
  { id: 'learn-model-k-creative-focus-desktop-v1', file: 'learn-model-k-creative-focus-desktop-v1.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-K'] },
  { id: 'learn-model-k-creative-focus-mobile-v1', file: 'learn-model-k-creative-focus-mobile-v1.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-K'] },
  { id: 'programs-model-k-stay-planning-desktop-v1', file: 'programs-model-k-stay-planning-desktop-v1.webp', width: 1440, height: 900, modelIds: ['WAK-MODEL-K'] },
  { id: 'programs-model-k-stay-planning-mobile-v1', file: 'programs-model-k-stay-planning-mobile-v1.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-K'] },
]

// Desktop/mobile art-direction pairs are one visible placement, not separate model exposures.
const v2Placements = [
  { route: 'home', section: 'hero', models: ['WAK-MODEL-A'], assets: v2Assets.slice(0, 2).map((asset) => asset.id), source: 'src/app/page.tsx' },
  { route: 'home', section: 'domestic-seoul', models: ['WAK-MODEL-J'], assets: [v2Assets[2].id], source: 'src/components/home/DomesticOnboarding.tsx' },
  { route: 'home', section: 'domestic-busan', models: ['WAK-MODEL-E'], assets: [v2Assets[3].id], source: 'src/components/home/DomesticOnboarding.tsx' },
  { route: 'home', section: 'domestic-jeju', models: ['WAK-MODEL-G'], assets: [v2Assets[4].id], source: 'src/components/home/DomesticOnboarding.tsx' },
  { route: 'trip-match', section: 'intro', models: ['WAK-MODEL-D'], assets: [v2Assets[5].id], source: 'src/components/trip-match/TripMatchExperience.tsx' },
  { route: 'hosted', section: 'hero', models: ['WAK-MODEL-H', 'WAK-MODEL-I'], assets: v2Assets.slice(6, 8).map((asset) => asset.id), source: 'src/components/hosted/HostedLandingView.tsx' },
  { route: 'select', section: 'hero-editorial', models: ['WAK-MODEL-I'], assets: [v2Assets[8].id], source: 'src/components/select/SelectHubView.tsx' },
  { route: 'learn', section: 'hero', models: ['WAK-MODEL-K'], assets: v2Assets.slice(9, 11).map((asset) => asset.id), source: 'src/app/learn/page.tsx' },
  { route: 'programs', section: 'hero', models: ['WAK-MODEL-K'], assets: v2Assets.slice(11, 13).map((asset) => asset.id), source: 'src/components/programs/ProgramsHubView.tsx' },
]

const nonModelMajorSurfaces = [
  'src/components/home/MoodExplorer.tsx',
  'src/components/home/DurationExplorer.tsx',
  'src/components/home/CollectionsSection.tsx',
  'src/components/home/MomentRail.tsx',
  'src/components/affiliate/AffiliateCard.tsx',
  'src/components/guide/GuideView.tsx',
  'src/components/guide/GuideHubView.tsx',
  'src/components/affiliate/CollectionsHub.tsx',
  'src/app/growth/page.tsx',
  'src/components/programs/GlobalProgramsView.tsx',
]

const errors = []
const [cityData, guideData, manifest, roster] = await Promise.all([
  fs.readFile(cityDataPath, 'utf8'),
  fs.readFile(guideDataPath, 'utf8'),
  fs.readFile(manifestPath, 'utf8'),
  fs.readFile(rosterPath, 'utf8'),
])

if (/https?:\/\/images\.unsplash\.com/i.test(cityData)) errors.push('src/lib/cities.ts still contains an Unsplash hotlink')
if (/https?:\/\/images\.unsplash\.com/i.test(guideData)) errors.push('src/lib/guides.ts still contains an Unsplash hotlink')

if (!roster.includes("BRAND_MODEL_ROSTER_VERSION = '2.3'")) errors.push('Brand model roster is not pinned to v2.3')
for (const id of expectedRosterIds) {
  if (!roster.includes(`id: '${id}'`)) errors.push(`Roster entry missing: ${id}`)
}
for (const [id, nameCode, descriptor] of [
  ['WAK-MODEL-H', 'Soft Daylight', 'softly rounded face'],
  ['WAK-MODEL-I', 'Modern Grace', 'elegant oval face'],
  ['WAK-MODEL-J', 'City Noir', 'heart-shaped face'],
]) {
  const start = roster.indexOf(`id: '${id}'`)
  const next = roster.indexOf("\n  {", start + 1)
  const block = start === -1 ? '' : roster.slice(start, next === -1 ? undefined : next)
  if (!block.includes(`nameCode: '${nameCode}'`)) errors.push(`v2.2 replacement name missing for ${id}`)
  if (!block.includes(descriptor)) errors.push(`v2.2 identity descriptor missing for ${id}`)
  if (!block.includes('supersedes and invalidates every previous')) errors.push(`Replacement record missing for ${id}`)
  if (!block.includes('directPublish: false')) errors.push(`Reference-only directPublish rule missing for ${id}`)
}
{
  const start = roster.indexOf("id: 'WAK-MODEL-K'")
  const next = roster.indexOf("\n  {", start + 1)
  const block = start === -1 ? '' : roster.slice(start, next === -1 ? undefined : next)
  if (!block.includes("nameCode: 'Creative Navigator'")) errors.push('Model K name code is missing')
  if (!block.includes('age twenty-nine')) errors.push('Model K adult age descriptor is missing')
  if (!block.includes("productionUse: 'generated_derivatives_only'")) errors.push('Model K derivative-only rule is missing')
  if (!block.includes('directPublish: false')) errors.push('Model K reference-only directPublish rule is missing')
}

const hashes = new Map()
let totalBytes = 0

for (const id of expectedDestinationIds) {
  const relativePath = `/media/destinations/${id}-editorial-v1.webp`
  const filePath = path.join(destinationDirectory, `${id}-editorial-v1.webp`)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing destination asset: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > 500_000) errors.push(`Asset exceeds 500 KB: ${relativePath}`)
  if (cityIds.includes(id) && !cityData.includes(`photo: '${relativePath}'`)) errors.push(`City data does not use ${relativePath}`)
  if (!guideData.includes(`heroPhoto: '${relativePath}'`)) errors.push(`Guide data does not use ${relativePath}`)
  if (!manifest.includes(`id: 'destination-${id}-editorial-v1'`)) errors.push(`Manifest entry missing for ${id}`)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const duplicate = hashes.get(hash)
  if (duplicate) errors.push(`Duplicate destination assets: ${duplicate} and ${relativePath}`)
  hashes.set(hash, relativePath)
}

for (const asset of [...archivedV1Assets, ...v2Assets]) {
  const relativePath = `/media/brand-models/${asset.file}`
  const filePath = path.join(brandModelDirectory, asset.file)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing brand model asset: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > (asset.archived ? 500_000 : 250_000)) errors.push(`Asset exceeds size budget: ${relativePath}`)
  const metadata = await sharp(buffer).metadata()
  if (metadata.format !== 'webp') errors.push(`Brand model asset is not WebP: ${relativePath}`)
  if (metadata.width !== asset.width || metadata.height !== asset.height) {
    errors.push(`Unexpected dimensions for ${relativePath}: ${metadata.width}x${metadata.height}, expected ${asset.width}x${asset.height}`)
  }
  const entryStart = manifest.indexOf(`id: '${asset.id}'`)
  const nextEntry = entryStart === -1 ? -1 : manifest.indexOf("\n  {", entryStart + 1)
  const block = entryStart === -1 ? '' : manifest.slice(entryStart, nextEntry === -1 ? undefined : nextEntry)
  if (!block) errors.push(`Manifest entry missing for ${asset.id}`)
  if (!block.includes(`src: '${relativePath}'`)) errors.push(`Manifest source mismatch for ${asset.id}`)
  if (!block.includes("sourceType: 'generated'")) errors.push(`sourceType missing for ${asset.id}`)
  if (!block.includes('illustrative: true')) errors.push(`illustrative flag missing for ${asset.id}`)
  if (!block.includes(`width: ${asset.width}`) || !block.includes(`height: ${asset.height}`)) errors.push(`Manifest dimensions missing for ${asset.id}`)
  if (!block.includes("localeUsage: ['ko', 'en', 'ja']")) errors.push(`localeUsage missing for ${asset.id}`)
  for (const locale of ['KO', 'EN', 'JP']) if (!block.includes(`${locale}:`)) errors.push(`${locale} alt or restriction missing for ${asset.id}`)
  if (!block.includes('restriction:')) errors.push(`Usage restriction missing for ${asset.id}`)
  if (!asset.archived) {
    for (const modelId of asset.modelIds) if (!block.includes(`'${modelId}'`)) errors.push(`model ID ${modelId} missing for ${asset.id}`)
    for (const field of ['routeUsage:', 'sectionUsage:', 'generatedFromReferenceIds:', 'createdAt:', 'verifiedAt:']) {
      if (!block.includes(field)) errors.push(`${field.replace(':', '')} missing for ${asset.id}`)
    }
    if (!block.includes('focalPoint')) errors.push(`Focal point missing for ${asset.id}`)
  }
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const duplicate = hashes.get(hash)
  if (duplicate) errors.push(`Duplicate media assets: ${duplicate} and ${relativePath}`)
  hashes.set(hash, relativePath)
}

const publicBrandFiles = await fs.readdir(brandModelDirectory)
for (const file of publicBrandFiles) {
  if (/reference|anchor|contact|grid|sheet|source/i.test(file)) errors.push(`Reference-only file is present in public assets: ${file}`)
  if (![...archivedV1Assets, ...v2Assets].some((asset) => asset.file === file)) errors.push(`Unregistered brand model asset: ${file}`)
}

const placementSources = new Map()
for (const placement of v2Placements) {
  const source = placementSources.get(placement.source) ?? await fs.readFile(path.join(root, placement.source), 'utf8')
  placementSources.set(placement.source, source)
  for (const assetId of placement.assets) if (!source.includes(assetId)) errors.push(`${placement.source} does not use ${assetId}`)
  if (/home-workation-editorial-v1-legacy|domestic-(?:seoul|busan|jeju)-model-[acd].*-v1|trip-match-model-d-city-departure-v1/.test(source)) {
    errors.push(`Legacy v1 model placement still exposed by ${placement.source}`)
  }
}

const exposedModels = new Set(v2Placements.flatMap((placement) => placement.models))
if (exposedModels.size < 5) errors.push(`Only ${exposedModels.size} distinct models are exposed; at least 5 are required`)
const identityExposure = v2Placements.flatMap((placement) => placement.models)
let maximumIdentityShare = 0
for (const modelId of exposedModels) {
  const count = identityExposure.filter((id) => id === modelId).length
  const share = count / identityExposure.length
  maximumIdentityShare = Math.max(maximumIdentityShare, share)
  if (share > 0.25) errors.push(`${modelId} exceeds 25% of visible model placements: ${(share * 100).toFixed(1)}%`)
}
const domesticModels = v2Placements.filter((placement) => placement.section.startsWith('domestic-')).flatMap((placement) => placement.models)
if (new Set(domesticModels).size !== domesticModels.length) errors.push('The same model appears in adjacent domestic onboarding cards')

for (const relativePath of nonModelMajorSurfaces) {
  const content = await fs.readFile(path.join(root, relativePath), 'utf8')
  if (content.includes('/media/brand-models/')) errors.push(`Place/product-led surface unexpectedly uses a brand model: ${relativePath}`)
}
const declaredNonModelShare = nonModelMajorSurfaces.length / (nonModelMajorSurfaces.length + v2Placements.length)
if (declaredNonModelShare < 0.5) errors.push(`Declared non-model major surface share is below 50%: ${(declaredNonModelShare * 100).toFixed(1)}%`)

async function collectSourceFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectSourceFiles(fullPath))
    else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) files.push(fullPath)
  }
  return files
}

for (const filePath of await collectSourceFiles(path.join(root, 'src'))) {
  const relativePath = path.relative(root, filePath).replaceAll('\\', '/')
  const content = await fs.readFile(filePath, 'utf8')
  if (/wak-model-h-(?!soft-daylight)|wak-model-i-(?!modern-grace)|wak-model-j-(?!city-noir)/i.test(content)) {
    errors.push(`Rejected pre-v2.2 H/I/J identity reference in ${relativePath}`)
  }
  if (/reference[_-](?:grid|sheet)|contact[_-]sheet|identity[_-]anchor\.jpg/i.test(content)) errors.push(`Reference-only input exposed by ${relativePath}`)
  if (!content.includes('/media/brand-models/')) continue
  if (/(?:reviews?|testimonials?|participant-proof|hotel-product|experience-product)/i.test(relativePath)) {
    errors.push(`Generated brand model asset used in a proof-sensitive area: ${relativePath}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const v2Bytes = await Promise.all(v2Assets.map(async (asset) => (await fs.stat(path.join(brandModelDirectory, asset.file))).size))
console.log(`Media audit passed: ${expectedDestinationIds.length} destinations, ${expectedRosterIds.length} v2.3 models, ${v2Assets.length} production assets (${v2Bytes.reduce((sum, size) => sum + size, 0).toLocaleString()} bytes)`)
console.log(`Visible identity mix: ${[...exposedModels].join(', ')}; actual max share ${(maximumIdentityShare * 100).toFixed(1)}% (cap 25%); non-model major surfaces ${(declaredNonModelShare * 100).toFixed(1)}%`)
console.log(`Total audited media bytes: ${totalBytes.toLocaleString()}`)
