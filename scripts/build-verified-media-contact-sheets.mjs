import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PLAN_PATH = path.join(ROOT, 'artifacts', 'verified-remote-media-plan.json')
const OUTPUT_DIR = path.join(ROOT, 'artifacts', 'verified-remote-media-contact-sheets')
const { entries } = JSON.parse(await fs.readFile(PLAN_PATH, 'utf8'))
const columns = 4
const rows = 4
const pageSize = columns * rows
const tileWidth = 360
const imageHeight = 220
const labelHeight = 76
const tileHeight = imageHeight + labelHeight
const width = columns * tileWidth
const height = rows * tileHeight

function xml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

await fs.mkdir(OUTPUT_DIR, { recursive: true })

for (let page = 0; page * pageSize < entries.length; page += 1) {
  const slice = entries.slice(page * pageSize, (page + 1) * pageSize)
  const composites = []

  for (const [index, entry] of slice.entries()) {
    const left = (index % columns) * tileWidth
    const top = Math.floor(index / columns) * tileHeight
    const absolute = path.join(ROOT, 'public', entry.src.replace(/^\//, ''))
    const thumb = await sharp(absolute)
      .resize(tileWidth, imageHeight, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 78 })
      .toBuffer()
    const context = entry.contexts?.[0]
    const label = Buffer.from(`
      <svg width="${tileWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f6f3ec"/>
        <style>
          .id { font: 700 15px Arial, sans-serif; fill: #142431; }
          .meta { font: 12px Arial, sans-serif; fill: #61727b; }
        </style>
        <text x="12" y="23" class="id">${xml(entry.key.slice(0, 38))}</text>
        <text x="12" y="44" class="meta">${xml((context?.file ?? '').replace('src/lib/', '').slice(0, 48))}:${context?.line ?? ''}</text>
        <text x="12" y="63" class="meta">${xml((context?.label ?? '').slice(0, 52))}</text>
      </svg>
    `)
    composites.push({ input: thumb, left, top }, { input: label, left, top: top + imageHeight })
  }

  await sharp({ create: { width, height, channels: 3, background: '#ece8df' } })
    .composite(composites)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(OUTPUT_DIR, `verified-media-${String(page + 1).padStart(2, '0')}.jpg`))
}

console.log(`Verified media contact sheets: ${Math.ceil(entries.length / pageSize)} pages`)
