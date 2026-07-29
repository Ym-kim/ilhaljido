import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { FORMAT_SPECS, validateLayout } from './lib/trip-set-social-layout.mjs'

const root = process.cwd()
const data = JSON.parse(await fs.readFile(path.join(root, 'src/data/trip-set-campaigns.json'), 'utf8'))
const socialRoot = path.join(root, 'public/social/trip-sets')
const manifest = JSON.parse(await fs.readFile(path.join(socialRoot, 'manifest.json'), 'utf8'))
const errors = []
const expected = []

for (const [slug, campaign] of Object.entries(data)) {
  if (campaign.id !== slug) errors.push(`${slug}: campaign id mismatch`)
  if (campaign.sourceType !== 'generated') errors.push(`${slug}: sourceType must be generated`)
  if (campaign.usage !== 'editorial') errors.push(`${slug}: generated campaign media must be editorial`)
  if (campaign.illustrative !== true) errors.push(`${slug}: generated campaign media must be illustrative`)
  if (!campaign.source || !campaign.license || !campaign.createdAt) errors.push(`${slug}: source, license and createdAt are required`)
  for (const locale of ['ko', 'ja']) {
    for (const format of Object.keys(FORMAT_SPECS)) expected.push(`${slug}/${format}-${locale}.webp`)
  }
}

const manifestByPath = new Map(manifest.assets.map((asset) => [asset.path, asset]))
const hashes = new Map()
let totalBytes = 0

for (const relativePath of expected) {
  const filePath = path.join(socialRoot, relativePath)
  let bytes
  try {
    bytes = await fs.readFile(filePath)
  } catch {
    errors.push(`${relativePath}: missing file`)
    continue
  }
  if (bytes.length === 0) errors.push(`${relativePath}: zero-byte file`)
  if (bytes.length > 400 * 1024) errors.push(`${relativePath}: file exceeds 400KB`)
  totalBytes += bytes.length

  const [formatLocale] = path.basename(relativePath).split('.webp')
  const format = formatLocale.replace(/-(ko|ja)$/u, '')
  const spec = FORMAT_SPECS[format]
  const metadata = await sharp(bytes).metadata()
  if (metadata.format !== 'webp') errors.push(`${relativePath}: expected WebP, got ${metadata.format}`)
  if (metadata.width !== spec.width || metadata.height !== spec.height) {
    errors.push(`${relativePath}: expected ${spec.width}x${spec.height}, got ${metadata.width}x${metadata.height}`)
  }

  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex')
  if (hashes.has(sha256)) errors.push(`${relativePath}: duplicate hash with ${hashes.get(sha256)}`)
  hashes.set(sha256, relativePath)

  const asset = manifestByPath.get(relativePath)
  if (!asset) {
    errors.push(`${relativePath}: missing manifest entry`)
    continue
  }
  if (asset.sha256 !== sha256 || asset.bytes !== bytes.length) errors.push(`${relativePath}: manifest hash or size mismatch`)
  if (asset.width !== spec.width || asset.height !== spec.height || asset.mimeType !== 'image/webp') errors.push(`${relativePath}: manifest media metadata mismatch`)
  const locale = relativePath.endsWith('-ja.webp') ? 'JP' : 'KO'
  for (const error of validateLayout(asset.layout, locale)) errors.push(`${relativePath}: ${error}`)
}

const actual = []
for (const slug of Object.keys(data)) {
  for (const fileName of await fs.readdir(path.join(socialRoot, slug))) {
    if (fileName.endsWith('.webp')) actual.push(`${slug}/${fileName}`)
  }
}
for (const extra of actual.filter((item) => !expected.includes(item))) errors.push(`${extra}: unexpected asset`)
if (manifest.count !== expected.length || manifest.assets.length !== expected.length) errors.push('manifest count must be 32')

if (errors.length) {
  console.error(`Social asset validation failed (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  const largest = Math.max(...manifest.assets.map((asset) => asset.bytes))
  console.log(`Validated ${expected.length} WebP assets (${totalBytes} bytes total, largest ${largest} bytes).`)
  console.log('Dimensions, hashes, manifest entries, duplicates and text safe areas are valid.')
}
