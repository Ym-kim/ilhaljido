import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { createSocialLayout, FORMAT_SPECS, LAYOUT_VERSION, renderOverlaySvg, validateLayout } from './lib/trip-set-social-layout.mjs'

const root = process.cwd()
const data = JSON.parse(await fs.readFile(path.join(root, 'src/data/trip-set-campaigns.json'), 'utf8'))
const socialRoot = path.join(root, 'public/social/trip-sets')
const assets = []

function focalCrop(source, metadata, spec, focalPoint) {
  const sourceWidth = metadata.width
  const sourceHeight = metadata.height
  if (!sourceWidth || !sourceHeight) throw new Error('Campaign source image has no dimensions.')
  const targetRatio = spec.width / spec.height
  const sourceRatio = sourceWidth / sourceHeight
  const cropWidth = sourceRatio > targetRatio ? Math.round(sourceHeight * targetRatio) : sourceWidth
  const cropHeight = sourceRatio > targetRatio ? sourceHeight : Math.round(sourceWidth / targetRatio)
  const centerX = sourceWidth * ((focalPoint?.x ?? 50) / 100)
  const centerY = sourceHeight * ((focalPoint?.y ?? 50) / 100)
  const left = Math.round(Math.max(0, Math.min(sourceWidth - cropWidth, centerX - cropWidth / 2)))
  const top = Math.round(Math.max(0, Math.min(sourceHeight - cropHeight, centerY - cropHeight / 2)))
  return sharp(source).extract({ left, top, width: cropWidth, height: cropHeight }).resize(spec.width, spec.height)
}

for (const [slug, campaign] of Object.entries(data)) {
  const input = path.join(root, 'public', campaign.image.replace(/^\//, ''))
  const source = await fs.readFile(input)
  const metadata = await sharp(source).metadata()
  const outDir = path.join(socialRoot, slug)
  await fs.mkdir(outDir, { recursive: true })

  for (const locale of ['KO', 'JP']) {
    const copy = campaign.copy[locale]
    for (const [format, spec] of Object.entries(FORMAT_SPECS)) {
      const headline = format === 'story' ? copy.storyHeadline : copy.feedHeadline
      const subline = format === 'story' ? copy.storySubline : copy.shareDescription
      const layout = createSocialLayout({ headline, subline, locale, format })
      const layoutErrors = validateLayout(layout, locale)
      if (layoutErrors.length) throw new Error(`${slug}/${format}/${locale}: ${layoutErrors.join(', ')}`)

      const image = await focalCrop(source, metadata, spec, campaign.focalPoint)
        .composite([{ input: renderOverlaySvg({ layout, accent: campaign.accent, format }) }])
        .webp({ quality: 88, smartSubsample: true })
        .toBuffer()
      const localeCode = locale === 'JP' ? 'ja' : 'ko'
      const fileName = `${format}-${localeCode}.webp`
      const relativePath = `${slug}/${fileName}`
      await fs.writeFile(path.join(outDir, fileName), image)
      assets.push({
        slug,
        locale: localeCode,
        format,
        path: relativePath,
        width: spec.width,
        height: spec.height,
        mimeType: 'image/webp',
        bytes: image.length,
        sha256: crypto.createHash('sha256').update(image).digest('hex'),
        source: campaign.image,
        layout,
      })
    }
  }
}

const manifest = {
  version: LAYOUT_VERSION,
  generatedAt: Object.values(data).map((item) => item.createdAt).filter(Boolean).sort().at(-1) ?? '2026-07-30',
  count: assets.length,
  assets: assets.sort((a, b) => a.path.localeCompare(b.path)),
}
await fs.writeFile(path.join(socialRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Generated ${assets.length} social assets with layout manifest v${LAYOUT_VERSION}.`)
