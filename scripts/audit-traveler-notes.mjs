import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dataPath = path.join(root, 'src/lib/moments.ts')
const source = fs.readFileSync(dataPath, 'utf8')
const slugs = [...source.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1])
const photos = [...source.matchAll(/\bphoto:\s*'([^']+)'/g)].map((match) => match[1])
const failures = []

if (slugs.length < 6) failures.push(`expected at least 6 seeded notes, found ${slugs.length}`)
if (new Set(slugs).size !== slugs.length) failures.push('duplicate traveler-note slug')
for (const slug of slugs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) failures.push(`invalid slug: ${slug}`)
}
for (const photo of photos) {
  const absolute = path.join(root, 'public', photo.replace(/^\//, ''))
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size === 0) failures.push(`missing image: ${photo}`)
}

for (const required of [
  "sourceType: 'editorial'",
  "format: 'introduction'",
  '회원 후기가 아닌 Wakation 에디터 소개입니다.',
  '실제로 경험한 내용만',
  "job_type: 'traveler_note'",
]) {
  const files = [
    source,
    fs.readFileSync(path.join(root, 'src/components/moments/TravelerNoteSubmitView.tsx'), 'utf8'),
    fs.readFileSync(path.join(root, 'src/app/api/moments/route.ts'), 'utf8'),
  ].join('\n')
  if (!files.includes(required)) failures.push(`required transparency/auth marker missing: ${required}`)
}

for (const route of [
  'src/app/moments/[slug]/page.tsx',
  'src/app/en/moments/[slug]/page.tsx',
  'src/app/ja/moments/[slug]/page.tsx',
  'src/app/moments/submit/page.tsx',
  'src/app/en/moments/submit/page.tsx',
  'src/app/ja/moments/submit/page.tsx',
]) {
  if (!fs.existsSync(path.join(root, route))) failures.push(`missing route: ${route}`)
}

if (/가장 인기|후기 1위|모두 만족|선정 보장/.test(source)) failures.push('forbidden social-proof or guarantee copy found')

if (failures.length) {
  console.error(`Traveler Notes audit failed (${failures.length})`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Traveler Notes audit passed: ${slugs.length} seeded editor notes, ${photos.length} local images, auth/review routes present.`)
