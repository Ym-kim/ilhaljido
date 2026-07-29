export const LAYOUT_VERSION = 2

export const FORMAT_SPECS = {
  feed: { width: 1080, height: 1350, margin: 70, headlineSize: 70, minHeadlineSize: 48, maxHeadlineLines: 2, topSafe: 54, bottomSafe: 36 },
  story: { width: 1080, height: 1920, margin: 70, headlineSize: 78, minHeadlineSize: 54, maxHeadlineLines: 3, topSafe: 80, bottomSafe: 230 },
  square: { width: 1080, height: 1080, margin: 70, headlineSize: 66, minHeadlineSize: 46, maxHeadlineLines: 2, topSafe: 54, bottomSafe: 36 },
  og: { width: 1200, height: 630, margin: 64, headlineSize: 58, minHeadlineSize: 42, maxHeadlineLines: 2, topSafe: 48, bottomSafe: 24 },
}

export const JA_LINE_START_PROHIBITED = new Set(Array.from('、。，．・：；？！ー）】」』〉》〕］｝〟’”ぁぃぅぇぉっゃゅょァィゥェォッャュョヵヶ'))
export const JA_LINE_END_PROHIBITED = new Set(Array.from('（【「『〈《〔［｛〝‘“'))

export function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function glyphWeight(char) {
  if (/\s/u.test(char)) return 0.32
  if (/[A-Za-z0-9]/u.test(char)) return 0.58
  if (/[.,:;!?·]/u.test(char)) return 0.34
  if (/[、。，．・：；？！]/u.test(char)) return 0.5
  return 1
}

export function estimateTextWidth(text, fontSize, letterSpacing = -1.2) {
  const glyphs = Array.from(text)
  const units = glyphs.reduce((sum, char) => sum + glyphWeight(char), 0)
  return Math.max(0, units * fontSize + Math.max(0, glyphs.length - 1) * letterSpacing)
}

function splitToken(token, maxWidth, fontSize, letterSpacing) {
  const parts = []
  let line = ''
  for (const char of Array.from(token)) {
    const candidate = line + char
    if (line && estimateTextWidth(candidate, fontSize, letterSpacing) > maxWidth) {
      parts.push(line)
      line = char
    } else {
      line = candidate
    }
  }
  if (line) parts.push(line)
  return parts
}

function wrapKorean(text, maxWidth, fontSize, letterSpacing) {
  const lines = []
  let line = ''
  const tokens = text.trim().replace(/(\d+박)\s+(\d+일)/gu, '$1§$2').split(/\s+/u).map((token) => token.replaceAll('§', ' '))
  for (const token of tokens) {
    const candidate = line ? `${line} ${token}` : token
    if (estimateTextWidth(candidate, fontSize, letterSpacing) <= maxWidth) {
      line = candidate
      continue
    }
    if (line) lines.push(line)
    if (estimateTextWidth(token, fontSize, letterSpacing) <= maxWidth) {
      line = token
      continue
    }
    const parts = splitToken(token, maxWidth, fontSize, letterSpacing)
    lines.push(...parts.slice(0, -1))
    line = parts.at(-1) ?? ''
  }
  if (line) lines.push(line)
  return lines
}

function japaneseAtoms(text) {
  const atoms = []
  let cursor = 0
  for (const match of text.matchAll(/\d+泊\d+日/gu)) {
    const index = match.index ?? 0
    atoms.push(...Array.from(text.slice(cursor, index)))
    atoms.push(match[0])
    cursor = index + match[0].length
  }
  atoms.push(...Array.from(text.slice(cursor)))
  return atoms
}

function wrapJapanese(text, maxWidth, fontSize, letterSpacing) {
  const lines = []
  let line = ''
  for (const char of japaneseAtoms(text.trim())) {
    const candidate = line + char
    if (!line || estimateTextWidth(candidate, fontSize, letterSpacing) <= maxWidth) {
      line = candidate
      continue
    }
    if (JA_LINE_START_PROHIBITED.has(char)) {
      line = candidate
      continue
    }
    const last = Array.from(line).at(-1)
    if (last && JA_LINE_END_PROHIBITED.has(last)) {
      line = Array.from(line).slice(0, -1).join('')
      if (line) lines.push(line)
      line = last + char
      continue
    }
    lines.push(line)
    line = char
  }
  if (line) lines.push(line)
  return lines
}

export function fitText(text, { locale, maxWidth, preferredSize, minSize, maxLines, letterSpacing = -1.2 }) {
  for (let fontSize = preferredSize; fontSize >= minSize; fontSize -= 2) {
    const lines = locale === 'JP'
      ? wrapJapanese(text, maxWidth, fontSize, letterSpacing)
      : wrapKorean(text, maxWidth, fontSize, letterSpacing)
    const widths = lines.map((line) => estimateTextWidth(line, fontSize, letterSpacing))
    if (lines.length <= maxLines && widths.every((width) => width <= maxWidth + 0.5)) {
      return { lines, widths, fontSize, letterSpacing }
    }
  }
  throw new Error(`Text does not fit the safe area: ${text}`)
}

function box(x, y, width, height) {
  return { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) }
}

export function createSocialLayout({ headline, subline, locale, format }) {
  const spec = FORMAT_SPECS[format]
  if (!spec) throw new Error(`Unknown social format: ${format}`)

  const { width, height, margin } = spec
  const safeWidth = width - margin * 2
  const ctaFontSize = format === 'og' ? 19 : 22
  const sublinePreferredSize = format === 'og' ? 23 : 28
  const sublineMinSize = format === 'og' ? 18 : 21
  const cta = locale === 'JP' ? 'セットを見る · wakation.kr' : '구성 보기 · wakation.kr'
  const ctaBaseline = height - (format === 'story' ? 250 : format === 'og' ? 34 : 46)
  const sublineLastBaseline = ctaBaseline - (format === 'story' ? 120 : 68)

  const sublineFit = fitText(subline, {
    locale,
    maxWidth: safeWidth,
    preferredSize: sublinePreferredSize,
    minSize: sublineMinSize,
    maxLines: 2,
    letterSpacing: -0.5,
  })
  const sublineLineHeight = Math.round(sublineFit.fontSize * 1.32)
  const sublineFirstBaseline = sublineLastBaseline - (sublineFit.lines.length - 1) * sublineLineHeight

  const headlineFit = fitText(headline, {
    locale,
    maxWidth: safeWidth,
    preferredSize: spec.headlineSize,
    minSize: spec.minHeadlineSize,
    maxLines: spec.maxHeadlineLines,
    letterSpacing: -1.5,
  })
  const headlineLineHeight = Math.round(headlineFit.fontSize * 1.18)
  const headlineLastBaseline = sublineFirstBaseline - (format === 'story' ? 100 : 82)
  const headlineFirstBaseline = headlineLastBaseline - (headlineFit.lines.length - 1) * headlineLineHeight
  const headlineTop = headlineFirstBaseline - headlineFit.fontSize
  const badgeY = headlineTop - 54
  const ctaWidth = estimateTextWidth(cta, ctaFontSize, -0.2)

  const layout = {
    version: LAYOUT_VERSION,
    canvas: { width, height },
    safeArea: box(margin, spec.topSafe, safeWidth, height - spec.topSafe - spec.bottomSafe),
    logo: { x: margin, y: format === 'story' ? 96 : 70, width: 220, height: 34 },
    badge: { x: margin, y: badgeY, width: 108, height: 32 },
    headline: {
      x: margin,
      firstBaseline: Math.round(headlineFirstBaseline),
      lineHeight: headlineLineHeight,
      fontSize: headlineFit.fontSize,
      letterSpacing: headlineFit.letterSpacing,
      lines: headlineFit.lines,
      box: box(margin, headlineTop, Math.max(...headlineFit.widths), headlineFit.fontSize + (headlineFit.lines.length - 1) * headlineLineHeight + 8),
    },
    subline: {
      x: margin,
      firstBaseline: Math.round(sublineFirstBaseline),
      lineHeight: sublineLineHeight,
      fontSize: sublineFit.fontSize,
      letterSpacing: sublineFit.letterSpacing,
      lines: sublineFit.lines,
      box: box(margin, sublineFirstBaseline - sublineFit.fontSize, Math.max(...sublineFit.widths), sublineFit.fontSize + (sublineFit.lines.length - 1) * sublineLineHeight + 7),
    },
    cta: {
      text: cta,
      x: width - margin,
      baseline: Math.round(ctaBaseline),
      fontSize: ctaFontSize,
      box: box(width - margin - ctaWidth, ctaBaseline - ctaFontSize, ctaWidth, ctaFontSize + 6),
    },
  }

  return layout
}

function svgTextBlock(block, fill, weight) {
  return `<text x="${block.x}" y="${block.firstBaseline}" fill="${fill}" font-family="Arial, 'Malgun Gothic', 'Yu Gothic', sans-serif" font-size="${block.fontSize}" font-weight="${weight}" letter-spacing="${block.letterSpacing}">${block.lines.map((line, index) => `<tspan x="${block.x}" dy="${index === 0 ? 0 : block.lineHeight}">${escapeXml(line)}</tspan>`).join('')}</text>`
}

export function renderOverlaySvg({ layout, accent, format }) {
  const { width, height } = layout.canvas
  const margin = layout.safeArea.x
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
      <g transform="translate(${margin} ${layout.logo.y})">
        <path d="M3.5 7.5C7.2 23.7 10.4 29 14.8 29c4.1 0 5.1-10.9 8.2-10.9S27 29 31.3 29c4.3 0 6.4-6.5 8.1-21.5" stroke="#fff" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M6.2 26.2c8.2-3.4 20.2-3.4 29.4 0" stroke="#7dd3fc" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <circle cx="35.2" cy="4.3" r="2.6" fill="#fef3c7"/>
        <text x="54" y="24" fill="#fff" font-family="Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="-1">Wakation</text>
      </g>
      <rect x="${layout.badge.x}" y="${layout.badge.y}" width="${layout.badge.width}" height="${layout.badge.height}" rx="16" fill="${accent}"/>
      <text x="${layout.badge.x + 18}" y="${layout.badge.y + 22}" fill="#fff" font-family="Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2">TRIP SET</text>
      ${svgTextBlock(layout.headline, '#fff', 800)}
      ${svgTextBlock(layout.subline, 'rgba(255,255,255,0.82)', 600)}
      <text x="${layout.cta.x}" y="${layout.cta.baseline}" text-anchor="end" fill="#fff" font-family="Arial, 'Malgun Gothic', 'Yu Gothic', sans-serif" font-size="${layout.cta.fontSize}" font-weight="700">${escapeXml(layout.cta.text)}</text>
    </svg>
  `)
}

export function validateLayout(layout, locale) {
  const errors = []
  const { width, height } = layout.canvas
  const namedBoxes = [
    ['logo', layout.logo],
    ['badge', layout.badge],
    ['headline', layout.headline.box],
    ['subline', layout.subline.box],
    ['cta', layout.cta.box],
  ]
  for (const [name, value] of namedBoxes) {
    if (value.x < 0 || value.y < 0 || value.x + value.width > width || value.y + value.height > height) {
      errors.push(`${name} leaves the canvas`)
    }
  }
  for (const [name, value] of namedBoxes.filter(([name]) => name !== 'logo')) {
    const safe = layout.safeArea
    if (value.x < safe.x || value.x + value.width > safe.x + safe.width || value.y < safe.y || value.y + value.height > safe.y + safe.height) {
      errors.push(`${name} leaves the safe area`)
    }
  }
  if (layout.headline.lines.length > 3) errors.push('headline exceeds 3 lines')
  if (locale === 'JP') {
    for (const line of [...layout.headline.lines, ...layout.subline.lines]) {
      const chars = Array.from(line)
      if (JA_LINE_START_PROHIBITED.has(chars[0])) errors.push(`Japanese prohibited line start: ${line}`)
      if (JA_LINE_END_PROHIBITED.has(chars.at(-1))) errors.push(`Japanese prohibited line end: ${line}`)
    }
  }
  return errors
}
