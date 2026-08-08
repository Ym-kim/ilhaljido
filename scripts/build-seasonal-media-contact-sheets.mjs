import { mkdirSync, readdirSync } from 'node:fs'
import { basename, extname, join, relative } from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const outputRoot = join(root, 'artifacts', 'seasonal-visual-audit', 'contact-sheets')
const rasterExtensions = new Set(['.jpeg', '.jpg', '.png', '.webp'])

const groups = [
  ['brand-models', join(root, 'public', 'media', 'brand-models')],
  ['destinations', join(root, 'public', 'media', 'destinations')],
  ['product-editorial', join(root, 'public', 'media', 'product-editorial')],
  ['campaign', join(root, 'public', 'campaign')],
  ['covers', join(root, 'public', 'covers')],
]

function collect(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name)
    if (entry.isDirectory()) return collect(absolute)
    return rasterExtensions.has(extname(entry.name).toLowerCase()) ? [absolute] : []
  })
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

async function tile(file, width, imageHeight, labelHeight) {
  const image = await sharp(file)
    .rotate()
    .resize(width, imageHeight, { fit: 'cover', position: 'attention' })
    .webp({ quality: 74 })
    .toBuffer()
  const label = escapeXml(basename(file))
  const labelSvg = Buffer.from(`
    <svg width="${width}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f1e9"/>
      <text x="12" y="21" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#172733">${label.slice(0, 39)}</text>
      <text x="12" y="37" font-family="Arial, sans-serif" font-size="9" fill="#62717a">${label.slice(39, 85)}</text>
    </svg>
  `)
  return sharp({
    create: { width, height: imageHeight + labelHeight, channels: 3, background: '#f4f1e9' },
  }).composite([
    { input: image, top: 0, left: 0 },
    { input: labelSvg, top: imageHeight, left: 0 },
  ]).jpeg({ quality: 82 }).toBuffer()
}

mkdirSync(outputRoot, { recursive: true })

for (const [group, directory] of groups) {
  const files = collect(directory).sort()
  const columns = 4
  const perPage = 24
  const tileWidth = 300
  const imageHeight = 190
  const labelHeight = 48
  const gutter = 14
  const titleHeight = 64

  for (let page = 0; page < Math.ceil(files.length / perPage); page += 1) {
    const pageFiles = files.slice(page * perPage, (page + 1) * perPage)
    const rows = Math.ceil(pageFiles.length / columns)
    const pageWidth = gutter + columns * (tileWidth + gutter)
    const pageHeight = titleHeight + rows * (imageHeight + labelHeight + gutter)
    const title = Buffer.from(`
      <svg width="${pageWidth}" height="${titleHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0a1d28"/>
        <text x="18" y="29" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Wakation seasonal media audit · ${escapeXml(group)}</text>
        <text x="18" y="49" font-family="Arial, sans-serif" font-size="11" fill="#9fc7d4">Page ${page + 1} · ${pageFiles.length} assets · review season, mood, repetition, crop and realism</text>
      </svg>
    `)
    const tiles = await Promise.all(pageFiles.map((file) => tile(file, tileWidth, imageHeight, labelHeight)))
    const composites = [{ input: title, left: 0, top: 0 }]
    tiles.forEach((input, index) => {
      composites.push({
        input,
        left: gutter + (index % columns) * (tileWidth + gutter),
        top: titleHeight + Math.floor(index / columns) * (imageHeight + labelHeight + gutter),
      })
    })
    const out = join(outputRoot, `${group}-${String(page + 1).padStart(2, '0')}.jpg`)
    await sharp({ create: { width: pageWidth, height: pageHeight, channels: 3, background: '#e9e6de' } })
      .composite(composites)
      .jpeg({ quality: 84 })
      .toFile(out)
    console.log(`[seasonal-contact-sheet] ${relative(root, out)} (${pageFiles.length} assets)`)
  }
}
