import { createHash } from 'node:crypto'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const expected = [
  'support-namhae-photo-v2.webp', 'support-hamyang-photo-v2.webp', 'support-tongyeong-photo-v2.webp',
  'support-gimhae-photo-v2.webp', 'support-yeongdeok-photo-v2.webp', 'support-gangjin-photo-v2.webp',
  'support-cheongju-photo-v2.webp', 'esim-japan-photo-v2.webp', 'esim-asia-photo-v2.webp',
  'wifi-japan-photo-v2.webp', 'wifi-taiwan-photo-v2.webp', 'wifi-thailand-photo-v2.webp',
  'carhire-editorial-photo-v2.webp', 'airport-transfer-editorial-photo-v2.webp',
  'airport-taxi-editorial-photo-v2.webp', 'airport-lounge-editorial-photo-v2.webp',
  'course-midjourney-photo-v2.webp', 'course-smartstore-photo-v2.webp', 'course-claude-photo-v2.webp',
  'course-notion-photo-v2.webp', 'course-excel-photo-v2.webp', 'course-python-photo-v2.webp',
  'cruise-caribbean-editorial-photo-v2.webp', 'cruise-transatlantic-editorial-photo-v2.webp',
]

const retired = [
  'support-namhae-ai.jpeg', 'support-hamyang-ai.jpeg', 'support-tongyeong-ai.jpeg', 'support-gimhae-ai.jpeg',
  'support-yeongdeok-ai.jpeg', 'support-gangjin-ai.jpeg', 'support-cheongju-ai.jpeg',
  'esim-japan-ai.jpeg', 'esim-asia-ai.jpeg', 'wifi-klook-japan-ai.jpeg', 'wifi-klook-taiwan-ai.jpeg',
  'wifi-klook-thailand-ai.jpeg', 'carhire-tripcom-ai.jpeg', 'transfer-klook-ai.jpeg', 'taxi-booking-ai.jpeg',
  'lounge-klook-ai.jpeg', 'course-midjourney-ai.jpeg', 'course-smartstore-ai.jpeg', 'course-claude-ai.jpeg',
  'course-notion-ai.jpeg', 'course-excel-ai.jpeg', 'course-python-ai.jpeg',
  'cruise-msc-world-europa-ai.jpeg', 'cruise-costa-serena-ai.jpeg',
]

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(absolute)
    return /\.(?:ts|tsx|css|md)$/.test(entry.name) ? [absolute] : []
  }))
  return nested.flat()
}

const failures = []
const hashes = new Map()
const manifest = await readFile(path.join(root, 'src/lib/media/cardMedia.ts'), 'utf8')
const sourceFiles = await collectSourceFiles(path.join(root, 'src'))
const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(file, 'utf8')))).join('\n')
const affiliateText = [
  await readFile(path.join(root, 'src/lib/affiliate/items.ts'), 'utf8'),
  await readFile(path.join(root, 'src/lib/affiliate/featured.ts'), 'utf8'),
  await readFile(path.join(root, 'src/lib/i18n/data.ts'), 'utf8'),
].join('\n')

for (const filename of expected) {
  const absolute = path.join(root, 'public/covers', filename)
  try {
    const info = await stat(absolute)
    const metadata = await sharp(absolute).metadata()
    if (metadata.format !== 'webp') failures.push(`${filename}: expected WebP, got ${metadata.format}`)
    if (metadata.width !== 1200 || metadata.height !== 900) failures.push(`${filename}: expected 1200x900, got ${metadata.width}x${metadata.height}`)
    if (info.size > 360 * 1024) failures.push(`${filename}: ${(info.size / 1024).toFixed(0)} KiB exceeds 360 KiB`)
    const digest = createHash('sha256').update(await readFile(absolute)).digest('hex')
    if (hashes.has(digest)) failures.push(`${filename}: duplicate of ${hashes.get(digest)}`)
    hashes.set(digest, filename)
    if (!manifest.includes(`/covers/${filename}`)) failures.push(`${filename}: missing media manifest entry`)
    const referenceIndex = affiliateText.indexOf(`/covers/${filename}`)
    if (referenceIndex < 0) failures.push(`${filename}: not referenced by product or support data`)
    else if (!affiliateText.slice(referenceIndex, referenceIndex + 260).includes('illustrative: true')) failures.push(`${filename}: reference is not marked illustrative`)
  } catch (error) {
    failures.push(`${filename}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

for (const filename of retired) {
  if (sourceText.includes(`/covers/${filename}`)) failures.push(`${filename}: retired low-visibility asset remains referenced in src`)
}

const cardComponent = await readFile(path.join(root, 'src/components/programs/SupportProgramCard.tsx'), 'utf8')
const detailComponent = await readFile(path.join(root, 'src/components/programs/SupportProgramDetailView.tsx'), 'utf8')
if (/(?:편집 이미지|illustrative image|イメージ画像)/i.test(`${cardComponent}\n${detailComponent}`)) {
  failures.push('support program UI still exposes an editorial-image label')
}

if (failures.length) {
  console.error(`Card media audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Card media audit passed: ${expected.length} photoreal editorial assets, 1200x900 WebP, unique and manifested with internal provenance`)
