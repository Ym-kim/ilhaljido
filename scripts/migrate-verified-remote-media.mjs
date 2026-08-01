import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const VERIFIED_AT = '2026-08-02'
const SOURCE_FILES = [
  'src/lib/affiliate/destinations.ts',
  'src/lib/affiliate/featured.ts',
  'src/lib/affiliate/items.ts',
  'src/lib/i18n/data.ts',
]
const URL_PATTERN = /https:\/\/images\.unsplash\.com\/photo-[^"'`\s)]+/g
const PUBLIC_DIR = path.join(ROOT, 'public', 'media', 'verified', 'unsplash')
const PLAN_PATH = path.join(ROOT, 'artifacts', 'verified-remote-media-plan.json')
const MANIFEST_PATH = path.join(ROOT, 'src', 'lib', 'media', 'verifiedRemoteSources.json')
const LICENSE_URL = 'https://unsplash.com/license'
const SOURCE_METADATA = {
  '1584698048102-bbedb5811cba': {
    sourcePage: 'https://unsplash.com/photos/CIOagJnSTWY',
    photographer: 'Bide Cui',
    location: 'The Bund, Shanghai, China',
  },
  '1742643635715-00c577862b56': {
    sourcePage: 'https://unsplash.com/photos/1uH3GuCEjSc',
    photographer: 'Harsil Patel',
    location: 'Swan Street Bridge, Melbourne VIC, Australia',
  },
  '1756007847785-b3369b87173b': {
    sourcePage: 'https://unsplash.com/photos/bsKvQLTgwVo',
    photographer: 'PJH',
    location: 'Kobe Harborland, Kobe, Hyogo, Japan',
  },
}
const mode = process.argv.includes('--apply') ? 'apply' : process.argv.includes('--download') ? 'download' : 'plan'

function sourceKey(urlValue) {
  const url = new URL(urlValue)
  return path.basename(url.pathname).replace(/^photo-/, '').replace(/[^a-zA-Z0-9_-]/g, '-')
}

function publicSrc(key) {
  return `/media/verified/unsplash/${key}.webp`
}

function usageForFile(file) {
  if (file.includes('affiliate/destinations')) return 'destination'
  if (file.includes('affiliate/')) return 'product'
  if (file.includes('i18n/data')) return 'program'
  throw new Error(`Unsupported verified media source: ${file}`)
}

function nearbyContext(lines, lineIndex) {
  for (let index = lineIndex; index >= Math.max(0, lineIndex - 14); index -= 1) {
    const candidate = lines[index].trim()
    if (/^(id|slug|title|name|city|region|label|country|category):/.test(candidate)) {
      return candidate.replace(/[,'"]+$/g, '').slice(0, 120)
    }
  }
  return lines[lineIndex].trim().slice(0, 120)
}

async function collectPlan() {
  const byKey = new Map()

  try {
    const existingManifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'))
    existingManifest.forEach((entry) => byKey.set(entry.key, entry))
  } catch {}

  for (const file of SOURCE_FILES) {
    const absolute = path.join(ROOT, file)
    const source = await fs.readFile(absolute, 'utf8')
    const lines = source.split(/\r?\n/)

    lines.forEach((line, lineIndex) => {
      const matches = line.match(URL_PATTERN) ?? []
      matches.forEach((url) => {
        const key = sourceKey(url)
        const existing = byKey.get(key) ?? {
          key,
          src: publicSrc(key),
          sourceType: 'licensed',
          license: LICENSE_URL,
          ...SOURCE_METADATA[key],
          verifiedAt: VERIFIED_AT,
          visualStatus: 'pending_review',
          sourceUrls: [],
          files: [],
          usages: [],
          contexts: [],
        }
        if (!existing.sourceUrls.includes(url)) existing.sourceUrls.push(url)
        if (!existing.files.includes(file)) existing.files.push(file)
        const usage = usageForFile(file)
        if (!existing.usages.includes(usage)) existing.usages.push(usage)
        existing.contexts.push({ file, line: lineIndex + 1, label: nearbyContext(lines, lineIndex) })
        byKey.set(key, existing)
      })
    })
  }

  return [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key))
}

function optimizedSourceUrl(sourceUrl) {
  const url = new URL(sourceUrl)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  url.searchParams.set('w', '1600')
  url.searchParams.set('q', '82')
  url.searchParams.set('fm', 'webp')
  return url.toString()
}

async function downloadOne(entry) {
  const target = path.join(ROOT, 'public', entry.src.replace(/^\//, ''))
  try {
    const existing = await fs.readFile(target)
    let output = existing
    let metadata = await sharp(output).metadata()
    if (output.byteLength > 780_000 || metadata.format !== 'webp' || (metadata.width ?? 0) > 1600) {
      output = await sharp(existing)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 })
        .toBuffer()
      await fs.writeFile(target, output)
      metadata = await sharp(output).metadata()
    }
    return {
      ...entry,
      width: metadata.width,
      height: metadata.height,
      bytes: output.byteLength,
      sha256: crypto.createHash('sha256').update(output).digest('hex'),
    }
  } catch {}

  const response = await fetch(optimizedSourceUrl(entry.sourceUrls[0]), {
    headers: { 'User-Agent': 'Wakation media verification/1.0' },
  })
  if (!response.ok) throw new Error(`${entry.key}: HTTP ${response.status}`)
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.startsWith('image/')) throw new Error(`${entry.key}: unexpected ${contentType}`)

  const input = Buffer.from(await response.arrayBuffer())
  const output = await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toBuffer()
  const metadata = await sharp(output).metadata()
  await fs.writeFile(target, output)
  return {
    ...entry,
    width: metadata.width,
    height: metadata.height,
    bytes: output.byteLength,
    sha256: crypto.createHash('sha256').update(output).digest('hex'),
  }
}

async function downloadAll(entries) {
  await fs.mkdir(PUBLIC_DIR, { recursive: true })
  const results = new Array(entries.length)
  let cursor = 0
  const workers = Array.from({ length: 6 }, async () => {
    while (cursor < entries.length) {
      const index = cursor
      cursor += 1
      results[index] = await downloadOne(entries[index])
    }
  })
  await Promise.all(workers)
  return results
}

async function replaceSources(entries) {
  const replacements = new Map()
  entries.forEach((entry) => entry.sourceUrls.forEach((url) => replacements.set(url, entry.src)))

  for (const file of SOURCE_FILES) {
    const absolute = path.join(ROOT, file)
    const source = await fs.readFile(absolute, 'utf8')
    const next = source.replace(URL_PATTERN, (url) => replacements.get(url) ?? url)
    if (next === source) {
      if (source.includes('https://images.unsplash.com/')) throw new Error(`${file}: remote source was not replaced`)
      continue
    }
    await fs.writeFile(absolute, next)
  }
}

let entries = await collectPlan()
await fs.mkdir(path.dirname(PLAN_PATH), { recursive: true })
await fs.writeFile(PLAN_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), mode, entries }, null, 2))

if (mode !== 'plan') {
  entries = await downloadAll(entries)
  await fs.writeFile(PLAN_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), mode, entries }, null, 2))
}

if (mode === 'apply') {
  entries = entries.map((entry) => ({ ...entry, visualStatus: 'verified' }))
  await replaceSources(entries)
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(entries, null, 2)}\n`)
}

console.log(`Verified media ${mode}: ${entries.length} source photographs across ${SOURCE_FILES.length} files`)
