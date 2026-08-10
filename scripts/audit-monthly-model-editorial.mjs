import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const month = '2026-08'
const expectedModels = ['WAK-MODEL-E', 'WAK-MODEL-G', 'WAK-MODEL-H', 'WAK-MODEL-J']
const imageFiles = [
  `monthly-${month}-model-e-city-arrival-v2.webp`,
  `monthly-${month}-model-g-coastal-book-cafe-v2.webp`,
  `monthly-${month}-model-h-coastal-reset-v1.webp`,
  `monthly-${month}-model-j-blue-hour-v2.webp`,
]
const videoFile = `monthly-model-edit-${month}-v2.mp4`
const mediaDirectory = path.join(root, 'public', 'media', 'brand-models')
const [manifest, rotation, component, remotion] = await Promise.all([
  fs.readFile(path.join(root, 'src', 'lib', 'media', 'assets.ts'), 'utf8'),
  fs.readFile(path.join(root, 'src', 'lib', 'media', 'modelRotation.ts'), 'utf8'),
  fs.readFile(path.join(root, 'src', 'components', 'media', 'MonthlyModelEditorial.tsx'), 'utf8'),
  fs.readFile(path.join(root, 'remotion', 'monthly-model-edit', 'MonthlyModelEdit.tsx'), 'utf8'),
])

const errors = []
const hashes = new Set()
for (const file of imageFiles) {
  const buffer = await fs.readFile(path.join(mediaDirectory, file)).catch(() => null)
  if (!buffer) { errors.push(`Missing monthly image: ${file}`); continue }
  const metadata = await sharp(buffer).metadata()
  if (metadata.format !== 'webp' || metadata.width !== 1200 || metadata.height !== 1500) {
    errors.push(`Unexpected monthly image format or dimensions: ${file}`)
  }
  if (buffer.byteLength > 300_000) errors.push(`Monthly image exceeds 300 KB: ${file}`)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  if (hashes.has(hash)) errors.push(`Duplicate monthly image: ${file}`)
  hashes.add(hash)
  if (!manifest.includes(`/media/brand-models/${file}`)) errors.push(`Manifest is missing ${file}`)
  if (!component.includes(`/media/brand-models/${file}`)) errors.push(`Monthly component is missing ${file}`)
}

const video = await fs.readFile(path.join(mediaDirectory, videoFile)).catch(() => null)
if (!video) errors.push(`Missing monthly video: ${videoFile}`)
else {
  if (video.subarray(4, 8).toString('ascii') !== 'ftyp') errors.push('Monthly video is not a valid MP4 container')
  if (video.byteLength > 2_200_000) errors.push(`Monthly video exceeds 2.2 MB: ${video.byteLength}`)
}

for (const model of expectedModels) {
  if (!rotation.includes(`'${model}'`)) errors.push(`Rotation registry is missing ${model}`)
}
for (const required of [
  `about-monthly-edit-${month}`,
  `monthly-model-edit-${month}-v2`,
  'prefers-reduced-motion: reduce',
  'preload="none"',
  'illustrative: true',
  '실제 고객, 참가자, 장소 또는 프로그램 현장',
]) {
  if (!(rotation + component + manifest).includes(required)) errors.push(`Monthly editorial contract is missing: ${required}`)
}
if (/note:\s*['"][^'"]*WAK-MODEL-/i.test(remotion)) errors.push('Internal model IDs are exposed in rendered video copy')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Monthly model editorial audit passed: ${month}, ${expectedModels.length} models, ${imageFiles.length} images, ${(video.byteLength / 1024 / 1024).toFixed(2)} MB video`)
