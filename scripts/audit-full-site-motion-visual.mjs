import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')
const PUBLIC = path.join(ROOT, 'public')
const OUT = path.join(ROOT, 'artifacts', 'full-site-audit')
const IMAGE_EXT = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i

async function walk(dir) {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else files.push(full)
  }
  return files
}

const sourceFiles = (await walk(SRC)).filter((file) => /\.(?:css|ts|tsx)$/.test(file))
const publicImages = (await walk(PUBLIC)).filter((file) => IMAGE_EXT.test(file))
const sourceRecords = await Promise.all(sourceFiles.map(async (file) => ({
  file,
  relative: path.relative(ROOT, file).replaceAll('\\', '/'),
  source: await readFile(file, 'utf8'),
})))
const combinedSource = sourceRecords.map((record) => record.source).join('\n')

const requiredMotionGroups = new Map([
  ['home', 'src/app/page.tsx'],
  ['trip-match', 'src/components/trip-match/TripMatchExperience.tsx'],
  ['programs', 'src/components/programs/ProgramsHubView.tsx'],
  ['select', 'src/components/select/SelectHubView.tsx'],
  ['collections', 'src/components/affiliate/CollectionsHub.tsx'],
  ['guide', 'src/components/guide/GuideView.tsx'],
  ['saved', 'src/components/affiliate/WishlistView.tsx'],
  ['experience', 'src/components/experiences/ExperienceEditorialView.tsx'],
])

const failures = []
const warnings = []
const motionGroups = []
for (const [group, file] of requiredMotionGroups) {
  const record = sourceRecords.find((entry) => entry.relative === file)
  const revealCount = (record?.source.match(/data-motion="reveal"/g) ?? []).length
  motionGroups.push({ group, file, revealCount })
  if (revealCount === 0) failures.push(`${group}: no data-motion reveal target`)
}

const globals = sourceRecords.find((record) => record.relative === 'src/app/globals.css')?.source ?? ''
for (const token of [
  '--wak-motion-micro',
  '--wak-motion-ui',
  '--wak-motion-reveal',
  '--wak-motion-editorial',
  '--wak-motion-ease-standard',
  '--wak-motion-ease-emphasis',
]) {
  if (!globals.includes(token)) failures.push(`globals.css: missing ${token}`)
}
if (!globals.includes('@media (prefers-reduced-motion: reduce)')) failures.push('globals.css: reduced-motion media query missing')
if (!/prefers-reduced-motion[\s\S]*?\.animate-rise[\s\S]*?opacity:\s*1/.test(globals)) failures.push('globals.css: animate-rise reduced-motion visibility reset missing')

const decorativePulse = sourceRecords.flatMap((record) => {
  const count = (record.source.match(/animate-pulse/g) ?? []).length
  return count ? [{ file: record.relative, count }] : []
})
const allowedPulseFiles = new Set(['src/components/guide/WorkOverlap.tsx'])
for (const item of decorativePulse) {
  if (!allowedPulseFiles.has(item.file)) failures.push(`${item.file}: decorative animate-pulse remains`)
}

const transitionAllCount = (combinedSource.match(/transition-all/g) ?? []).length
if (transitionAllCount > 180) warnings.push(`transition-all remains broad in ${transitionAllCount} places; migrate incrementally`)

const localReferences = new Map()
const remoteImageReferences = []
for (const record of sourceRecords) {
  for (const match of record.source.matchAll(/["'`](\/[^"'`?]+\.(?:avif|gif|jpe?g|png|svg|webp))(?:\?[^"'`]*)?["'`]/gi)) {
    const ref = match[1]
    if (!localReferences.has(ref)) localReferences.set(ref, new Set())
    localReferences.get(ref).add(record.relative)
  }
  for (const match of record.source.matchAll(/https?:\/\/(?:images\.unsplash\.com\/[^\s"'`)]+|[^\s"'`)]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^\s"'`)]*)?)/gi)) {
    if (!/^https:\/\/(?:www\.)?wakation\.kr\//.test(match[0])) {
      remoteImageReferences.push({ file: record.relative, url: match[0] })
    }
  }
}

const missingReferences = []
for (const [ref, files] of localReferences) {
  if (ref.includes('${')) continue
  try {
    await stat(path.join(PUBLIC, ref.slice(1)))
  } catch {
    try {
      await stat(path.join(SRC, 'app', ref.slice(1)))
    } catch {
      missingReferences.push({ ref, files: [...files] })
    }
  }
}
if (missingReferences.length) failures.push(`${missingReferences.length} local image references are missing`)
if (remoteImageReferences.length) warnings.push(`${remoteImageReferences.length} remote image URL references remain in source`)

const imageRecords = []
for (const file of publicImages) {
  const bytes = await readFile(file)
  const relative = `/${path.relative(PUBLIC, file).replaceAll('\\', '/')}`
  const hash = createHash('sha256').update(bytes).digest('hex')
  const record = { src: relative, bytes: bytes.length, hash, width: null, height: null, format: path.extname(file).slice(1).toLowerCase() }
  if (!file.toLowerCase().endsWith('.svg')) {
    const metadata = await sharp(bytes).metadata()
    record.width = metadata.width ?? null
    record.height = metadata.height ?? null
    record.format = metadata.format ?? record.format
    if ((metadata.width ?? 0) < 320 || (metadata.height ?? 0) < 180) {
      warnings.push(`${relative}: low raster dimensions ${metadata.width ?? 0}x${metadata.height ?? 0}`)
    }
  }
  if (bytes.length > 800_000) warnings.push(`${relative}: asset exceeds 800 KB`)
  imageRecords.push(record)
}

const imagesByHash = new Map()
for (const record of imageRecords) {
  imagesByHash.set(record.hash, [...(imagesByHash.get(record.hash) ?? []), record])
}
const duplicateGroups = [...imagesByHash.entries()]
  .filter(([, records]) => records.length > 1)
  .map(([hash, records]) => ({ hash, files: records.map((record) => record.src) }))
if (duplicateGroups.length) warnings.push(`${duplicateGroups.length} byte-identical image groups found`)

const imageSummary = {
  total: imageRecords.length,
  referenced: localReferences.size,
  unreferenced: imageRecords.filter((record) => !localReferences.has(record.src)).map((record) => record.src),
  totalBytes: imageRecords.reduce((sum, record) => sum + record.bytes, 0),
  largest: [...imageRecords].sort((a, b) => b.bytes - a.bytes).slice(0, 20),
  duplicateGroups,
  remoteImageReferences,
  missingReferences,
}

function imageDecision(record) {
  const referenced = localReferences.has(record.src)
  if (!referenced && !record.src.startsWith('/social/')) {
    return { role: 'inactive_or_derivative', decision: 'ARCHIVE_REVIEW', reason: 'No exact customer-facing source reference was found.' }
  }
  if (/^\/(?:icons\/|icon|apple-icon)|\.svg$/.test(record.src)) {
    return { role: 'interface', decision: 'KEEP', reason: 'Functional brand or interface asset.' }
  }
  if (record.src.startsWith('/social/') || record.src.includes('/og-')) {
    return { role: 'social_derivative', decision: 'KEEP_DERIVATIVE', reason: 'Dedicated social or sharing export; not loaded as a standard card image.' }
  }
  if (record.src.startsWith('/media/brand-models/') || record.src.startsWith('/campaign/') || /-ai\./.test(record.src)) {
    return { role: 'editorial_illustrative', decision: 'KEEP_WITH_DISCLOSURE', reason: 'Generated editorial image; must not imply a real venue, product or participant.' }
  }
  if (record.src.startsWith('/media/destinations/') || /\/dest-[^/]+-real\./.test(record.src)) {
    return { role: 'destination', decision: 'KEEP', reason: 'Destination-led image with a registered locale/focal-point use.' }
  }
  if (/\/stay-[^/]+-real\./.test(record.src)) {
    return { role: 'stay_or_city_photo', decision: 'KEEP_VERIFIED', reason: 'Previously verified photographic asset; product claims remain governed by the catalog.' }
  }
  return { role: 'editorial_or_product', decision: 'KEEP_SOURCE_RECORD', reason: 'Active local asset; retain its existing source and disclosure record.' }
}

imageSummary.suitability = imageRecords.map((record) => ({ ...record, ...imageDecision(record) }))

const result = {
  generatedAt: new Date().toISOString(),
  motion: {
    systemVersion: 'v1',
    groupCount: motionGroups.length,
    revealTargetCount: motionGroups.reduce((sum, group) => sum + group.revealCount, 0),
    groups: motionGroups,
    keyframeCount: (globals.match(/@keyframes/g) ?? []).length,
    decorativePulse,
    transitionAllCount,
    reducedMotion: failures.every((failure) => !failure.includes('reduced-motion')),
  },
  images: imageSummary,
  failures,
  warnings,
}

await mkdir(OUT, { recursive: true })
await writeFile(path.join(OUT, 'source-motion-visual-audit.json'), `${JSON.stringify(result, null, 2)}\n`)
const docsAuditDir = path.join(ROOT, 'docs', 'audits')
await mkdir(docsAuditDir, { recursive: true })
const suitabilityCsv = [
  'src,width,height,bytes,format,role,decision,reason',
  ...imageSummary.suitability.map((record) => [record.src, record.width ?? '', record.height ?? '', record.bytes, record.format, record.role, record.decision, record.reason].map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')),
].join('\n')
await writeFile(path.join(docsAuditDir, 'full-site-image-suitability-2026-08.csv'), `${suitabilityCsv}\n`)
const remoteCsv = [
  'file,url,decision',
  ...remoteImageReferences.map((record) => [record.file, record.url, 'MIGRATE_TO_VERIFIED_LOCAL_ASSET'].map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')),
].join('\n')
await writeFile(path.join(docsAuditDir, 'full-site-remote-image-sources-2026-08.csv'), `${remoteCsv}\n`)

if (failures.length) {
  console.error(`Full-site motion/visual audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Full-site motion/visual audit passed: ${motionGroups.length} priority route groups, ${result.motion.revealTargetCount} reveal targets, ${imageRecords.length} public images`)
console.log(`Image bytes: ${imageSummary.totalBytes.toLocaleString()} · remote refs: ${remoteImageReferences.length} · missing refs: ${missingReferences.length}`)
if (warnings.length) console.log(`Advisories: ${warnings.length} (see artifacts/full-site-audit/source-motion-visual-audit.json)`)
