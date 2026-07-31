import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const cityDataPath = path.join(root, 'src', 'lib', 'cities.ts')
const guideDataPath = path.join(root, 'src', 'lib', 'guides.ts')
const manifestPath = path.join(root, 'src', 'lib', 'media', 'assets.ts')
const destinationDirectory = path.join(root, 'public', 'media', 'destinations')
const brandModelDirectory = path.join(root, 'public', 'media', 'brand-models')
const cityIds = ['tokyo', 'osaka', 'fukuoka', 'bali', 'danang', 'chiangmai', 'cebu', 'sydney']
const expectedIds = [...cityIds, 'jeju', 'seoul', 'busan']
const brandAssets = [
  { id: 'home-hero-model-a-coastal-work-desktop-v1', file: 'home-hero-model-a-coastal-work-desktop-v1.webp', modelId: 'WAK-MODEL-A', width: 1536, height: 1024 },
  { id: 'home-hero-model-a-coastal-work-mobile-v1', file: 'home-hero-model-a-coastal-work-mobile-v1.webp', modelId: 'WAK-MODEL-A', width: 960, height: 1280 },
  { id: 'domestic-seoul-model-d-urban-work-v1', file: 'domestic-seoul-model-d-urban-work-v1.webp', modelId: 'WAK-MODEL-D', width: 1200, height: 900 },
  { id: 'domestic-busan-model-c-coastal-transition-v1', file: 'domestic-busan-model-c-coastal-transition-v1.webp', modelId: 'WAK-MODEL-C', width: 1200, height: 900 },
  { id: 'domestic-jeju-model-a-slow-stay-v1', file: 'domestic-jeju-model-a-slow-stay-v1.webp', modelId: 'WAK-MODEL-A', width: 1200, height: 900 },
  { id: 'trip-match-model-d-city-departure-v1', file: 'trip-match-model-d-city-departure-v1.webp', modelId: 'WAK-MODEL-D', width: 1536, height: 1024 },
]
const errors = []

const [cityData, guideData, manifest] = await Promise.all([
  fs.readFile(cityDataPath, 'utf8'),
  fs.readFile(guideDataPath, 'utf8'),
  fs.readFile(manifestPath, 'utf8'),
])

if (/https?:\/\/images\.unsplash\.com/i.test(cityData)) {
  errors.push('src/lib/cities.ts still contains an Unsplash hotlink')
}
if (/https?:\/\/images\.unsplash\.com/i.test(guideData)) {
  errors.push('src/lib/guides.ts still contains an Unsplash hotlink')
}

const hashes = new Map()
let totalBytes = 0

for (const id of expectedIds) {
  const relativePath = `/media/destinations/${id}-editorial-v1.webp`
  const filePath = path.join(destinationDirectory, `${id}-editorial-v1.webp`)
  let buffer

  try {
    buffer = await fs.readFile(filePath)
  } catch {
    errors.push(`Missing destination asset: ${relativePath}`)
    continue
  }

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

const sourceFilesToAudit = [
  'src/app/page.tsx',
  'src/components/home/DomesticOnboarding.tsx',
  'src/components/hosted/HostedLandingView.tsx',
  'src/components/trip-match/TripMatchExperience.tsx',
]
const sourceEntries = await Promise.all(sourceFilesToAudit.map(async (relativePath) => ({
  relativePath,
  content: await fs.readFile(path.join(root, relativePath), 'utf8'),
})))

for (const { relativePath, content } of sourceEntries) {
  if (/https?:\/\/(?:images\.unsplash\.com|images\.pexels\.com|images\.booking\.com)/i.test(content)) {
    errors.push(`External image hotlink in ${relativePath}`)
  }
  if (/reference[_-](?:grid|sheet)/i.test(content)) errors.push(`Reference grid is exposed by ${relativePath}`)
}

for (const asset of brandAssets) {
  const relativePath = `/media/brand-models/${asset.file}`
  const filePath = path.join(brandModelDirectory, asset.file)
  let buffer

  try {
    buffer = await fs.readFile(filePath)
  } catch {
    errors.push(`Missing brand model asset: ${relativePath}`)
    continue
  }

  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > 500_000) errors.push(`Asset exceeds 500 KB: ${relativePath}`)

  const metadata = await sharp(buffer).metadata()
  if (metadata.width !== asset.width || metadata.height !== asset.height) {
    errors.push(`Unexpected dimensions for ${relativePath}: ${metadata.width}x${metadata.height}, expected ${asset.width}x${asset.height}`)
  }

  const expectedAspect = asset.width / asset.height
  const actualAspect = (metadata.width ?? 0) / (metadata.height ?? 1)
  if (Math.abs(expectedAspect - actualAspect) > 0.01) errors.push(`Unexpected aspect ratio for ${relativePath}`)

  const entryStart = manifest.indexOf(`id: '${asset.id}'`)
  const nextEntry = entryStart === -1 ? -1 : manifest.indexOf("\n  {", entryStart + 1)
  const block = entryStart === -1 ? '' : manifest.slice(entryStart, nextEntry === -1 ? undefined : nextEntry)
  if (!block) errors.push(`Manifest entry missing for ${asset.id}`)
  if (!block.includes(`src: '${relativePath}'`)) errors.push(`Manifest source mismatch for ${asset.id}`)
  if (!block.includes("sourceType: 'generated'")) errors.push(`sourceType missing for ${asset.id}`)
  if (!block.includes('illustrative: true')) errors.push(`illustrative flag missing for ${asset.id}`)
  if (!block.includes(`modelId: '${asset.modelId}'`)) errors.push(`modelId missing for ${asset.id}`)
  if (!block.includes(`width: ${asset.width}`) || !block.includes(`height: ${asset.height}`)) errors.push(`Manifest dimensions missing for ${asset.id}`)
  if (!block.includes("localeUsage: ['ko', 'en', 'ja']")) errors.push(`localeUsage missing for ${asset.id}`)
  for (const locale of ['KO', 'EN', 'JP']) {
    if (!block.includes(`${locale}:`)) errors.push(`${locale} alt or restriction missing for ${asset.id}`)
  }
  if (!block.includes('restriction:')) errors.push(`Usage restriction missing for ${asset.id}`)

  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const duplicate = hashes.get(hash)
  if (duplicate) errors.push(`Duplicate media assets: ${duplicate} and ${relativePath}`)
  hashes.set(hash, relativePath)
}

const publicBrandFiles = await fs.readdir(brandModelDirectory)
for (const file of publicBrandFiles) {
  if (/reference|grid|sheet/i.test(file)) errors.push(`Reference-only file is present in public assets: ${file}`)
  if (!brandAssets.some((asset) => asset.file === file)) errors.push(`Unregistered brand model asset: ${file}`)
}

const srcDirectory = path.join(root, 'src')
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

for (const filePath of await collectSourceFiles(srcDirectory)) {
  const relativePath = path.relative(root, filePath).replaceAll('\\', '/')
  if (relativePath === 'src/lib/media/assets.ts') continue
  const content = await fs.readFile(filePath, 'utf8')
  if (!content.includes('/media/brand-models/')) continue
  if (/(?:\/reviews?\/|\/testimonials?\/|\/report\/|\/hotel\/|\/experiences?\/)/i.test(relativePath)) {
    errors.push(`Generated brand model asset used in a proof-sensitive area: ${relativePath}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Media audit passed: ${expectedIds.length} destination assets + ${brandAssets.length} brand model assets, ${totalBytes.toLocaleString()} bytes total`)
