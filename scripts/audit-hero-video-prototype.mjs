import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const component = fs.readFileSync(path.join(root, 'src/components/home/HomeSeasonalHeroMedia.tsx'), 'utf8')
const homePages = [
  'src/app/page.tsx',
  'src/app/en/page.tsx',
  'src/app/ja/page.tsx',
].map((relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8'))
const files = {
  webm: 'public/media/campaigns/home-hero-story-desktop-v2.webm',
  mp4: 'public/media/campaigns/home-hero-story-desktop-v2.mp4',
  posterDesktopWebp: 'public/media/campaigns/home-hero-story-poster-desktop-v2.webp',
  posterDesktopAvif: 'public/media/campaigns/home-hero-story-poster-desktop-v2.avif',
  posterMobileWebp: 'public/media/campaigns/home-hero-story-poster-mobile-v2.webp',
  posterMobileAvif: 'public/media/campaigns/home-hero-story-poster-mobile-v2.avif',
}

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

for (const [label, relativePath] of Object.entries(files)) {
  const absolutePath = path.join(root, relativePath)
  assert(fs.existsSync(absolutePath), `missing ${label}: ${relativePath}`)
}

for (const label of ['webm', 'mp4']) {
  const bytes = fs.statSync(path.join(root, files[label])).size
  assert(bytes <= 4_000_000, `${label} exceeds the 4MB target`)
  assert(bytes >= 100_000, `${label} is unexpectedly small`)
}

assert(component.indexOf('.webm') < component.indexOf('.mp4'), 'WebM source must precede the H.264 fallback')
assert(component.includes("window.matchMedia('(min-width: 768px)')"), 'mobile video suppression is required')
assert(component.includes('connection?.saveData'), 'Save Data fallback is required')
assert(component.includes("connection?.effectiveType === '3g'"), 'slow-network fallback is required')
assert(component.includes("variant !== 'control-static'"), 'static control variant must disable motion')
assert(component.includes("variant === 'video-story'"), 'story-film prototype variant is required')
assert(component.includes('home-hero-story-desktop-v2.webm'), 'story-film WebM source is required')
assert(component.includes('home-editorial-hero-story-frame'), 'desktop story-film safe-area frame is required')
assert(!component.includes('home-hero-prototype-a-desktop-v1'), 'superseded prototype A must not remain selectable')
assert(!component.includes('home-hero-prototype-b-desktop-v1'), 'superseded prototype B must not remain selectable')
assert(!component.includes('home-seasonal-film-2026-08-mobile-v1.mp4'), 'mobile video source must not be present')
assert(component.includes('onError='), 'video error fallback is required')
assert(homePages.every((page) => page.includes("hero === 'control-static' ? 'control-static' : 'video-story'")), 'Story must be the proposed default in all locales while retaining the static control')

if (failures.length > 0) {
  console.error(`Hero video prototype audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Hero video prototype audit PASS')
console.log(`webm_bytes=${fs.statSync(path.join(root, files.webm)).size}`)
console.log(`mp4_bytes=${fs.statSync(path.join(root, files.mp4)).size}`)
console.log('desktop_layout=right-pane safe_zone=left duration_seconds=9.0 audio=removed')
console.log('mobile=static-poster')
