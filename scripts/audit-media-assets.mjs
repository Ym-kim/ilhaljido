import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const cityDataPath = path.join(root, 'src', 'lib', 'cities.ts')
const guideDataPath = path.join(root, 'src', 'lib', 'guides.ts')
const manifestPath = path.join(root, 'src', 'lib', 'media', 'assets.ts')
const destinationDirectory = path.join(root, 'public', 'media', 'destinations')
const cityIds = ['tokyo', 'osaka', 'fukuoka', 'bali', 'danang', 'chiangmai', 'cebu', 'sydney']
const expectedIds = [...cityIds, 'jeju', 'seoul', 'busan']
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

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Media audit passed: ${expectedIds.length} destination assets, ${totalBytes.toLocaleString()} bytes total`)
