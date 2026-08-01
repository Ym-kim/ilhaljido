import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const outputDirectory = path.join(root, 'public', 'media', 'product-editorial')
const assets = [
  {
    source: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/20240727%20Jeonju%20Hanok%20Village%20001.jpg',
    filename: 'program-jeonju-hanok-licensed-v1.webp',
    width: 1200,
    height: 900,
  },
  {
    source: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Korea-Yeosu-Harbor-01.jpg',
    filename: 'program-yeosu-harbor-licensed-v1.webp',
    width: 1200,
    height: 675,
  },
]

await fs.mkdir(outputDirectory, { recursive: true })

for (const asset of assets) {
  const response = await fetch(asset.source, { headers: { 'User-Agent': 'Wakation media verification/1.0' }, redirect: 'follow' })
  if (!response.ok) throw new Error(`${asset.filename}: HTTP ${response.status}`)
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.startsWith('image/')) throw new Error(`${asset.filename}: unexpected ${contentType}`)
  const input = Buffer.from(await response.arrayBuffer())
  await sharp(input)
    .rotate()
    .resize(asset.width, asset.height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputDirectory, asset.filename))
}

console.log(`Prepared ${assets.length} licensed program assets`)
