import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const data = JSON.parse(await fs.readFile(path.join(root, 'src/data/trip-set-campaigns.json'), 'utf8'))

const formats = {
  feed: { width: 1080, height: 1350, headlineSize: 70, bottom: 150 },
  story: { width: 1080, height: 1920, headlineSize: 78, bottom: 210 },
  square: { width: 1080, height: 1080, headlineSize: 66, bottom: 120 },
  og: { width: 1200, height: 630, headlineSize: 58, bottom: 76 },
}

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function wrapText(text, maxChars) {
  const tokens = text.split(/(?<=[,.。、· ])|(?=[,.。、· ])/u).filter(Boolean)
  const lines = []
  let line = ''
  for (const token of tokens) {
    if ((line + token).trim().length > maxChars && line.trim()) {
      lines.push(line.trim())
      line = token
    } else {
      line += token
    }
  }
  if (line.trim()) lines.push(line.trim())
  return lines.slice(0, 3)
}

function textBlock(lines, x, y, size, lineHeight) {
  return `<text x="${x}" y="${y}" fill="#fff" font-family="Arial, 'Malgun Gothic', 'Yu Gothic', sans-serif" font-size="${size}" font-weight="800" letter-spacing="-1.5">${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join('')}</text>`
}

function overlaySvg({ width, height, headline, subline, accent, locale, format }) {
  const spec = formats[format]
  const margin = format === 'og' ? 64 : 70
  const maxChars = format === 'og' ? 24 : format === 'story' ? 15 : 17
  const headlineLines = wrapText(headline, maxChars)
  const headlineSize = locale === 'JP' ? spec.headlineSize - 4 : spec.headlineSize
  const lineHeight = Math.round(headlineSize * 1.16)
  const subY = height - spec.bottom
  const ctaY = height - (format === 'story' ? 74 : format === 'og' ? 34 : 46)
  const headlineY = subY - (headlineLines.length - 1) * lineHeight - (format === 'story' ? 92 : 76)
  const cta = locale === 'JP' ? 'セットを見る · wakation.kr' : '구성 보기 · wakation.kr'
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#04121f" stop-opacity="0.08"/>
          <stop offset="0.48" stop-color="#04121f" stop-opacity="0.08"/>
          <stop offset="1" stop-color="#04121f" stop-opacity="0.94"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shade)"/>
      <g transform="translate(${margin} ${format === 'story' ? 96 : 70})">
        <path d="M3.5 7.5C7.2 23.7 10.4 29 14.8 29c4.1 0 5.1-10.9 8.2-10.9S27 29 31.3 29c4.3 0 6.4-6.5 8.1-21.5" stroke="#fff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M6.2 26.2c8.2-3.4 20.2-3.4 29.4 0" stroke="#7dd3fc" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <circle cx="35.2" cy="4.3" r="2.6" fill="#fef3c7"/>
        <text x="54" y="24" fill="#fff" font-family="Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="-1">Wakation</text>
      </g>
      <rect x="${margin}" y="${headlineY - headlineSize - 54}" width="108" height="32" rx="16" fill="${accent}"/>
      <text x="${margin + 18}" y="${headlineY - headlineSize - 32}" fill="#fff" font-family="Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2">TRIP SET</text>
      ${textBlock(headlineLines, margin, headlineY, headlineSize, lineHeight)}
      <text x="${margin}" y="${subY}" fill="rgba(255,255,255,0.78)" font-family="Arial, 'Malgun Gothic', 'Yu Gothic', sans-serif" font-size="${format === 'og' ? 23 : 28}" font-weight="600">${escapeXml(subline)}</text>
      <text x="${width - margin}" y="${ctaY}" text-anchor="end" fill="#fff" font-family="Arial, 'Malgun Gothic', 'Yu Gothic', sans-serif" font-size="${format === 'og' ? 19 : 22}" font-weight="700">${escapeXml(cta)}</text>
    </svg>
  `)
}

for (const [slug, campaign] of Object.entries(data)) {
  const input = path.join(root, 'public', campaign.image.replace(/^\//, ''))
  const outDir = path.join(root, 'public/social/trip-sets', slug)
  await fs.mkdir(outDir, { recursive: true })
  for (const locale of ['KO', 'JP']) {
    const copy = campaign.copy[locale]
    for (const [format, spec] of Object.entries(formats)) {
      const headline = format === 'story' ? copy.storyHeadline : copy.feedHeadline
      const subline = format === 'story' ? copy.storySubline : copy.shareDescription
      const image = await sharp(input)
        .resize(spec.width, spec.height, { fit: 'cover', position: 'centre' })
        .composite([{ input: overlaySvg({ ...spec, headline, subline, accent: campaign.accent, locale, format }) }])
        .webp({ quality: 88, smartSubsample: true })
        .toBuffer()
      const localeCode = locale === 'JP' ? 'ja' : 'ko'
      await fs.writeFile(path.join(outDir, `${format}-${localeCode}.webp`), image)
    }
  }
}

console.log(`Generated ${Object.keys(data).length * 2 * Object.keys(formats).length} social assets.`)
