import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const MANIFEST_PATH = path.join(ROOT, 'src', 'lib', 'media', 'verifiedRemoteSources.json')
const ASSET_DIR = path.join(ROOT, 'public', 'media', 'verified', 'unsplash')
const SOURCE_FILES = [
  'src/lib/affiliate/destinations.ts',
  'src/lib/affiliate/featured.ts',
  'src/lib/affiliate/items.ts',
  'src/lib/i18n/data.ts',
]

const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'))
const failures = []
const keys = new Set()
const srcs = new Set()
let totalBytes = 0

for (const entry of manifest) {
  if (keys.has(entry.key)) failures.push(`duplicate key: ${entry.key}`)
  if (srcs.has(entry.src)) failures.push(`duplicate src: ${entry.src}`)
  keys.add(entry.key)
  srcs.add(entry.src)
  if (entry.sourceType !== 'licensed') failures.push(`${entry.key}: sourceType`)
  if (entry.license !== 'https://unsplash.com/license') failures.push(`${entry.key}: license`)
  if (entry.visualStatus !== 'verified') failures.push(`${entry.key}: visualStatus`)
  if (!entry.verifiedAt) failures.push(`${entry.key}: verifiedAt`)
  if (!entry.sourceUrls?.length) failures.push(`${entry.key}: sourceUrls`)

  try {
    const absolute = path.join(ROOT, 'public', entry.src.replace(/^\//, ''))
    const data = await fs.readFile(absolute)
    const metadata = await sharp(data).metadata()
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    totalBytes += data.byteLength
    if (metadata.format !== 'webp') failures.push(`${entry.key}: format ${metadata.format}`)
    if ((metadata.width ?? 0) < 1000) failures.push(`${entry.key}: width ${metadata.width}`)
    if (data.byteLength > 800_000) failures.push(`${entry.key}: ${data.byteLength} bytes`)
    if (entry.width !== metadata.width || entry.height !== metadata.height) failures.push(`${entry.key}: dimensions`)
    if (entry.bytes !== data.byteLength || entry.sha256 !== hash) failures.push(`${entry.key}: identity`)
  } catch (error) {
    failures.push(`${entry.key}: ${error.message}`)
  }
}

for (const file of SOURCE_FILES) {
  const source = await fs.readFile(path.join(ROOT, file), 'utf8')
  if (source.includes('https://images.unsplash.com/')) failures.push(`${file}: remote Unsplash URL remains`)
}

const assetFiles = (await fs.readdir(ASSET_DIR)).filter((file) => file.endsWith('.webp'))
const manifestFiles = new Set(manifest.map((entry) => path.basename(entry.src)))
for (const file of assetFiles) {
  if (!manifestFiles.has(file)) failures.push(`untracked local asset: ${file}`)
}
if (assetFiles.length !== manifest.length) failures.push(`asset count ${assetFiles.length}, manifest count ${manifest.length}`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Verified media audit passed: ${manifest.length} WebP assets, ${totalBytes.toLocaleString()} bytes`)
