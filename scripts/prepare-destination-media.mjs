import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const inputDirectory = process.argv[2]
const selectedIds = process.argv[3]?.split(',').filter(Boolean)

if (!inputDirectory) {
  console.error('Usage: node scripts/prepare-destination-media.mjs <input-directory> [comma-separated-ids]')
  process.exit(1)
}

const root = process.cwd()
const outputDirectory = path.join(root, 'public', 'media', 'destinations')
const assets = [
  { id: 'tokyo', position: 'centre' },
  { id: 'osaka', position: 'centre' },
  { id: 'fukuoka', position: 'south' },
  { id: 'bali', position: 'centre' },
  { id: 'danang', position: 'centre' },
  { id: 'chiangmai', position: 'centre', quality: 76 },
  { id: 'cebu', position: 'centre' },
  { id: 'sydney', position: 'centre' },
  { id: 'jeju', position: 'centre' },
  { id: 'seoul', position: 'centre' },
  { id: 'busan', position: 'centre' },
]

await fs.mkdir(outputDirectory, { recursive: true })

for (const asset of assets.filter(({ id }) => !selectedIds || selectedIds.includes(id))) {
  const input = path.resolve(inputDirectory, `${asset.id}.jpg`)
  const output = path.join(outputDirectory, `${asset.id}-editorial-v1.webp`)

  await sharp(input)
    .rotate()
    .resize({
      width: 1600,
      height: 1067,
      fit: 'cover',
      position: asset.position,
      withoutEnlargement: false,
    })
    .webp({ quality: asset.quality ?? 82, effort: 5, smartSubsample: true })
    .toFile(output)

  const metadata = await sharp(output).metadata()
  const { size } = await fs.stat(output)
  console.log(`${path.relative(root, output)} ${metadata.width}x${metadata.height} ${size} bytes`)
}
