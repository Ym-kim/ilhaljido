import { access, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const checks = []
const failures = []

const assert = (condition, message) => {
  checks.push(message)
  if (!condition) failures.push(message)
}

const files = {
  desktopVideo: 'public/media/seasonal/home-seasonal-film-2026-08-desktop-v1.mp4',
  mobileVideo: 'public/media/seasonal/home-seasonal-film-2026-08-mobile-v1.mp4',
  seasonalStill: 'public/media/seasonal/late-summer-model-f-market-v1.webp',
  component: 'src/components/home/HomeSeasonalHeroMedia.tsx',
  manifest: 'src/lib/media/assets.ts',
  rotation: 'src/lib/media/modelRotation.ts',
}

for (const file of Object.values(files)) await access(path.join(root, file))

const desktopStat = await stat(path.join(root, files.desktopVideo))
const mobileStat = await stat(path.join(root, files.mobileVideo))
const stillMeta = await sharp(path.join(root, files.seasonalStill)).metadata()
const component = await readFile(path.join(root, files.component), 'utf8')
const manifest = await readFile(path.join(root, files.manifest), 'utf8')
const rotation = await readFile(path.join(root, files.rotation), 'utf8')

assert(desktopStat.size <= 1_500_000, `desktop hero film is <= 1.5 MB (${desktopStat.size} bytes)`)
assert(mobileStat.size <= 1_250_000, `mobile hero film is <= 1.25 MB (${mobileStat.size} bytes)`)
assert(stillMeta.width === 1536 && stillMeta.height === 864, `seasonal still is 1536x864 (${stillMeta.width}x${stillMeta.height})`)
assert(component.includes('prefers-reduced-motion: reduce'), 'home film respects reduced motion')
assert(component.includes('saveData'), 'home film respects data saver')
assert(component.includes('<Pause') && component.includes('<Play'), 'home film provides playback control')
assert(component.includes('setTimeout(() => setShouldLoadVideo(true), 700)'), 'home film defers loading until after the LCP poster')
assert(component.includes('home-seasonal-film-2026-08-mobile-v1.mp4'), 'home film has a mobile-specific source')
assert(component.includes('home-seasonal-film-2026-08-desktop-v1.mp4'), 'home film has a desktop-specific source')
assert(manifest.includes("id: 'late-summer-model-f-market-v1'"), 'seasonal still is registered in the media manifest')
assert(manifest.includes("id: 'home-seasonal-film-2026-08-desktop-v1'"), 'desktop film is registered in the media manifest')
assert(manifest.includes("id: 'home-seasonal-film-2026-08-mobile-v1'"), 'mobile film is registered in the media manifest')
assert(manifest.includes("seasonalUsage: ['late-summer', 'autumn']"), 'seasonal usage metadata is present')
assert(rotation.includes("modelIds: ['WAK-MODEL-A', 'WAK-MODEL-F', 'WAK-MODEL-J']"), 'home film follows the model rotation roster')

const disallowedActiveIllustrations = [
  'support-cheongju-ai.jpeg',
  'support-gangjin-ai.jpeg',
  'support-gimhae-ai.jpeg',
  'support-hamyang-ai.jpeg',
  'support-namhae-ai.jpeg',
  'support-tongyeong-ai.jpeg',
  'support-yeongdeok-ai.jpeg',
  'course-claude-ai.jpeg',
  'course-excel-ai.jpeg',
  'course-midjourney-ai.jpeg',
  'course-notion-ai.jpeg',
  'course-python-ai.jpeg',
  'course-smartstore-ai.jpeg',
]
const sourceFiles = [
  'src/lib/affiliate/items.ts',
  'src/lib/affiliate/featured.ts',
  'src/lib/i18n/data.ts',
  'src/components/home/MoodExplorer.tsx',
  'src/components/home/DurationExplorer.tsx',
]
const activeSource = (await Promise.all(sourceFiles.map((file) => readFile(path.join(root, file), 'utf8')))).join('\n')
for (const image of disallowedActiveIllustrations) {
  assert(!activeSource.includes(image), `${image} is not referenced by active visual surfaces`)
}

if (failures.length > 0) {
  console.error(`[seasonal-media] ${failures.length} failure(s)`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`[seasonal-media] ${checks.length} checks passed`)
