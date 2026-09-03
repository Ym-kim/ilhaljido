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
  webm: 'public/media/campaigns/home-hero-clean-v3.webm',
  mp4: 'public/media/campaigns/home-hero-clean-v3.mp4',
  closeupWebm: 'public/media/campaigns/home-hero-closeup-v3.webm',
  closeupMp4: 'public/media/campaigns/home-hero-closeup-v3.mp4',
  posterDesktopWebp: 'public/media/campaigns/home-hero-polish-poster-desktop-v3.webp',
  posterDesktopAvif: 'public/media/campaigns/home-hero-polish-poster-desktop-v3.avif',
  posterMobileWebp: 'public/media/campaigns/home-hero-polish-poster-mobile-v3.webp',
  posterMobileAvif: 'public/media/campaigns/home-hero-polish-poster-mobile-v3.avif',
}

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

for (const [label, relativePath] of Object.entries(files)) {
  const absolutePath = path.join(root, relativePath)
  assert(fs.existsSync(absolutePath), `missing ${label}: ${relativePath}`)
}

for (const label of ['webm', 'mp4', 'closeupWebm', 'closeupMp4']) {
  const bytes = fs.statSync(path.join(root, files[label])).size
  assert(bytes <= 4_000_000, `${label} exceeds the 4MB target`)
  assert(bytes >= 100_000, `${label} is unexpectedly small`)
}

assert(component.indexOf('<source src={film.webm}') < component.indexOf('<source src={film.mp4}'), 'WebM source must precede the H.264 fallback')
assert(component.includes("window.matchMedia('(min-width: 768px)')"), 'mobile video suppression is required')
assert(component.includes('connection?.saveData'), 'Save Data fallback is required')
assert(component.includes("connection?.effectiveType === '3g'"), 'slow-network fallback is required')
assert(component.includes("variant !== 'control-static'"), 'static control variant must disable motion')
assert(component.includes("variant === 'video-story'"), 'story-film prototype variant is required')
assert(component.includes('home-hero-clean-v3.webm'), 'clean story-film source is required')
assert(component.includes('home-hero-closeup-v3.webm'), 'meaningful close-up comparison is required')
assert(component.includes("get('hero') === 'hero-closeup'"), 'Preview close-up selector is required')
assert(!component.includes('home-hero-story-desktop-v2.webm'), 'v2 residual-flash edit must not be selected')
assert(component.includes('home-editorial-hero-story-frame'), 'desktop story-film safe-area frame is required')
assert(!component.includes('home-hero-prototype-a-desktop-v1'), 'superseded prototype A must not remain selectable')
assert(!component.includes('home-hero-prototype-b-desktop-v1'), 'superseded prototype B must not remain selectable')
assert(!component.includes('home-seasonal-film-2026-08-mobile-v1.mp4'), 'mobile video source must not be present')
assert(component.includes('onError='), 'video error fallback is required')
assert(homePages.every((page) => page.includes("hero === 'control-static' ? 'control-static' : 'video-story'")), 'Story must be the proposed default in all locales while retaining the static control')

const edl = JSON.parse(fs.readFileSync(path.join(root, 'scripts/hero-final-polish.edl.json'), 'utf8'))
const safeRanges = { start: [8, 62], prepare: [68, 101], arrive: [32, 67], experience: [105, 132], reflect: [136, 163], work: [167, 192], resolve: [53, 95] }
for (const [id, shot] of Object.entries(edl.shots)) {
  assert(shot.startFrame === safeRanges[id][0] && shot.endFrame === safeRanges[id][1], id + ': native-frame safe range changed; re-audit source cuts')
  assert(shot.outputFrames >= edl.fps, id + ': sub-second insert is forbidden')
}
for (const [variant, shotIds] of Object.entries(edl.variants)) {
  const shots = shotIds.map((id) => edl.shots[id])
  const duration = shots.reduce((sum, shot) => sum + shot.outputFrames, 0) / edl.fps
  assert(duration >= 9 && duration <= 12, variant + ': duration must be 9–12s')
  assert(shots.filter((shot) => shot.closeup).length === (variant === 'clean' ? 0 : 1), variant + ': close-up policy mismatch')
}
assert(edl.shots.work.outputFrames / edl.fps >= 2.5, 'workspace needs at least 2.5s')
assert(component.includes('2200') && component.includes('preload="none"'), 'deferred poster-first loading must remain')
assert(component.includes('md:w-[68%]'), 'existing right-panel width must remain')

if (failures.length > 0) {
  console.error(`Hero video prototype audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Hero video prototype audit PASS')
console.log(`webm_bytes=${fs.statSync(path.join(root, files.webm)).size}`)
console.log(`mp4_bytes=${fs.statSync(path.join(root, files.mp4)).size}`)
console.log('desktop_layout=right-pane safe_zone=left clean_seconds=10.75 closeup_seconds=12')
console.log('mobile=static-poster')
