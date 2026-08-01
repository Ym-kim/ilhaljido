import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const AUDIT_ROOT = path.join(ROOT, 'artifacts', 'full-site-audit')
const OUTPUT_ROOT = path.join(AUDIT_ROOT, 'contact-sheets')

const ROUTES = [
  ['Home · JA', 'ja.jpg'],
  ['Trip Match · JA', 'ja__trip-match.jpg'],
  ['Programs · JA', 'ja__programs.jpg'],
  ['Select · JA', 'ja__select.jpg'],
  ['Collections · JA', 'ja__collections.jpg'],
  ['Bali Guide · JA', 'ja__guide__bali.jpg'],
  ['Bali Destination · JA', 'ja__destinations__bali.jpg'],
  ['Itoshima Experience · JA', 'ja__experiences__itoshima-photo-bus-tour.jpg'],
]

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function labelSvg(width, height, label, x, y, size = 20) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .label { font-family: Arial, sans-serif; font-size: ${size}px; font-weight: 700; fill: #142431; }
        .meta { font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; fill: #66747d; letter-spacing: 1px; }
      </style>
      <text x="${x}" y="${y}" class="label">${escapeXml(label)}</text>
      <text x="${x}" y="${y + 23}" class="meta">BEFORE</text>
      <text x="${Math.round(width / 2) + 10}" y="${y + 23}" class="meta">AFTER</text>
    </svg>
  `)
}

async function buildSheet(viewport) {
  const isMobile = viewport === 'mobile'
  const tileWidth = isMobile ? 220 : 480
  const tileHeight = isMobile ? 476 : 300
  const gap = 20
  const top = 62
  const rowGap = 58
  const width = tileWidth * 2 + gap * 3
  const rowHeight = tileHeight + rowGap
  const height = top + ROUTES.length * rowHeight + gap
  const composites = []

  for (const [index, [label, filename]] of ROUTES.entries()) {
    const y = top + index * rowHeight + 36
    const beforePath = path.join(AUDIT_ROOT, 'before', viewport, filename)
    const afterPath = path.join(AUDIT_ROOT, 'after', viewport, filename)
    await Promise.all([fs.access(beforePath), fs.access(afterPath)])

    const [before, after] = await Promise.all([
      sharp(beforePath).resize(tileWidth, tileHeight, { fit: 'cover', position: 'top' }).jpeg({ quality: 78 }).toBuffer(),
      sharp(afterPath).resize(tileWidth, tileHeight, { fit: 'cover', position: 'top' }).jpeg({ quality: 78 }).toBuffer(),
    ])

    composites.push(
      { input: before, left: gap, top: y },
      { input: after, left: gap * 2 + tileWidth, top: y },
      { input: labelSvg(width, height, label, gap, y - 26, isMobile ? 17 : 20), left: 0, top: 0 },
    )
  }

  const heading = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>.title { font-family: Arial, sans-serif; font-size: 26px; font-weight: 800; fill: #142431; }</style>
      <text x="${gap}" y="38" class="title">Wakation motion / visual QA · ${viewport}</text>
    </svg>
  `)
  composites.unshift({ input: heading, left: 0, top: 0 })

  await sharp({
    create: { width, height, channels: 3, background: '#f5f3ed' },
  })
    .composite(composites)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUTPUT_ROOT, `${viewport}-before-after.jpg`))
}

await fs.mkdir(OUTPUT_ROOT, { recursive: true })
await buildSheet('desktop')
await buildSheet('mobile')

console.log(`Motion/visual contact sheets written to ${path.relative(ROOT, OUTPUT_ROOT)}`)
