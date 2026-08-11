import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const cityDataPath = path.join(root, 'src', 'lib', 'cities.ts')
const guideDataPath = path.join(root, 'src', 'lib', 'guides.ts')
const manifestPath = path.join(root, 'src', 'lib', 'media', 'assets.ts')
const rosterPath = path.join(root, 'src', 'lib', 'media', 'brandModels.ts')
const rotationPath = path.join(root, 'src', 'lib', 'media', 'modelRotation.ts')
const experienceViewPath = path.join(root, 'src', 'components', 'experiences', 'ExperienceEditorialView.tsx')
const destinationDirectory = path.join(root, 'public', 'media', 'destinations')
const brandModelDirectory = path.join(root, 'public', 'media', 'brand-models')
const cityIds = ['tokyo', 'osaka', 'fukuoka', 'bali', 'danang', 'chiangmai', 'cebu', 'sydney']
const expectedDestinationIds = [...cityIds, 'jeju', 'seoul', 'busan']
const expectedRosterIds = 'ABCDEFGHIJ'.split('').map((letter) => `WAK-MODEL-${letter}`)
const maximumAllowedIdentityShare = 0.5

const archivedV1Assets = [
  ['home-hero-model-a-coastal-work-desktop-v1', 'home-hero-model-a-coastal-work-desktop-v1.webp', 1536, 1024],
  ['home-hero-model-a-coastal-work-mobile-v1', 'home-hero-model-a-coastal-work-mobile-v1.webp', 960, 1280],
  ['domestic-seoul-model-d-urban-work-v1', 'domestic-seoul-model-d-urban-work-v1.webp', 1200, 900],
  ['domestic-busan-model-c-coastal-transition-v1', 'domestic-busan-model-c-coastal-transition-v1.webp', 1200, 900],
  ['domestic-jeju-model-a-slow-stay-v1', 'domestic-jeju-model-a-slow-stay-v1.webp', 1200, 900],
  ['trip-match-model-d-city-departure-v1', 'trip-match-model-d-city-departure-v1.webp', 1536, 1024],
].map(([id, file, width, height]) => ({ id, file, width, height, archived: true }))

// Superseded files remain in public as an auditable generation archive,
// but are intentionally absent from the active placement registry.
const supersededPublicFiles = new Set([
  'monthly-2026-08-model-e-city-arrival-v1.webp',
  'monthly-2026-08-model-j-blue-hour-v1.webp',
  'monthly-model-edit-2026-08-v1.mp4',
  'home-hero-model-a-coastal-work-desktop-v2.webp',
  'home-hero-model-a-coastal-work-mobile-v2.webp',
  'home-hero-model-a-coastal-work-desktop-v2.avif',
  'home-hero-model-a-coastal-work-mobile-v2.avif',
  'domestic-jeju-model-k-coastal-stay-v4.webp',
  'learn-model-k-creative-focus-desktop-v1.webp',
  'learn-model-k-creative-focus-mobile-v1.webp',
  'programs-model-k-stay-planning-desktop-v1.webp',
  'programs-model-k-stay-planning-mobile-v1.webp',
  'business-models-c-h-k-late-summer-team-desktop-v2.webp',
  'business-models-c-h-k-late-summer-team-mobile-v2.webp',
  'domestic-seoul-model-j-city-noir-v2.webp',
  'domestic-busan-model-h-haeundae-v3.webp',
  'trip-match-model-d-itinerary-choice-v2.webp',
  'hosted-models-h-i-coastal-planning-v2.webp',
  'hosted-models-h-i-coastal-planning-mobile-v2.webp',
  'select-model-i-travel-prep-v2.webp',
  'growth-model-b-urban-learning-desktop-v1.webp',
  'growth-model-b-urban-learning-mobile-v1.webp',
  'campaign-model-f-japan-choice-desktop-v1.webp',
  'campaign-model-f-japan-choice-mobile-v1.webp',
  'monthly-2026-08-model-g-coastal-book-cafe-v1.webp',
  'experience-tokyo-model-d-immersive-gallery-v1.webp',
  'trip-match-model-d-itinerary-choice-v3.webp',
  'select-model-i-travel-prep-v3.webp',
  'business-model-c-team-planning-desktop-v1.webp',
  'business-model-c-team-planning-mobile-v1.webp',
  'fukuoka-model-h-cafe-work-v1.webp',
  'fukuoka-model-h-cafe-work-v1.avif',
  'seoul-model-i-after-work-design-lane-v2.webp',
  'seoul-model-i-after-work-design-lane-v2.avif',
  'busan-model-e-after-work-coast-v1.webp',
  'busan-model-e-after-work-coast-v1.avif',
  'jeju-model-g-after-rain-coast-v1.webp',
  'jeju-model-g-after-rain-coast-v1.avif',
])

const v2Assets = [
  { id: 'home-hero-model-a-coastal-departure-desktop-v3', file: 'home-hero-model-a-coastal-departure-desktop-v3.webp', width: 1536, height: 960, modelIds: ['WAK-MODEL-A'] },
  { id: 'home-hero-model-a-coastal-departure-mobile-v3', file: 'home-hero-model-a-coastal-departure-mobile-v3.webp', width: 1080, height: 1440, modelIds: ['WAK-MODEL-A'] },
  { id: 'domestic-seoul-model-j-city-noir-v3', file: 'domestic-seoul-model-j-city-noir-v3.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-J'] },
  { id: 'domestic-busan-model-e-coastal-city-v2', file: 'domestic-busan-model-e-coastal-city-v2.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-E'] },
  { id: 'domestic-jeju-model-g-slow-stay-v2', file: 'domestic-jeju-model-g-slow-stay-v2.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-G'] },
  { id: 'domestic-busan-model-h-haeundae-v4', file: 'domestic-busan-model-h-haeundae-v4.webp', width: 1200, height: 900, modelIds: ['WAK-MODEL-H'] },
  { id: 'trip-match-model-d-ribbon-choice-v4', file: 'trip-match-model-d-ribbon-choice-v4.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-D'] },
  { id: 'hosted-models-h-i-coastal-planning-v3', file: 'hosted-models-h-i-coastal-planning-v3.webp', width: 1440, height: 900, modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'hosted-models-h-i-coastal-planning-mobile-v3', file: 'hosted-models-h-i-coastal-planning-mobile-v3.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'select-model-c-packing-flatlay-v4', file: 'select-model-c-packing-flatlay-v4.webp', width: 1440, height: 810, modelIds: ['WAK-MODEL-C'] },
  { id: 'experience-seoul-model-i-kpop-studio-v2', file: 'experience-seoul-model-i-kpop-studio-v2.webp', width: 1440, height: 1080, modelIds: ['WAK-MODEL-I'] },
  { id: 'experience-tokyo-model-d-immersive-gallery-v2', file: 'experience-tokyo-model-d-immersive-gallery-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-D'] },
  { id: 'growth-model-b-urban-learning-desktop-v2', file: 'growth-model-b-urban-learning-desktop-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-B'] },
  { id: 'growth-model-b-urban-learning-mobile-v2', file: 'growth-model-b-urban-learning-mobile-v2.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-B'] },
  { id: 'programs-model-b-coastal-arrival-desktop-v3', file: 'programs-model-b-coastal-arrival-desktop-v3.webp', width: 1915, height: 821, modelIds: ['WAK-MODEL-B'] },
  { id: 'programs-model-b-coastal-arrival-mobile-v2', file: 'programs-model-b-coastal-arrival-mobile-v2.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-B'] },
  { id: 'growth-model-f-pottery-learning-desktop-v3', file: 'growth-model-f-pottery-learning-desktop-v3.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-F'] },
  { id: 'growth-model-f-pottery-learning-mobile-v3', file: 'growth-model-f-pottery-learning-mobile-v3.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-F'] },
  { id: 'business-models-c-h-i-rooftop-session-desktop-v3', file: 'business-models-c-h-i-rooftop-session-desktop-v3.webp', width: 1536, height: 960, modelIds: ['WAK-MODEL-C', 'WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'business-models-c-h-i-rooftop-session-mobile-v3', file: 'business-models-c-h-i-rooftop-session-mobile-v3.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-C', 'WAK-MODEL-H', 'WAK-MODEL-I'] },
  { id: 'campaign-model-f-japan-choice-desktop-v2', file: 'campaign-model-f-japan-choice-desktop-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-F'] },
  { id: 'campaign-model-f-japan-choice-mobile-v2', file: 'campaign-model-f-japan-choice-mobile-v2.webp', width: 960, height: 1280, modelIds: ['WAK-MODEL-F'] },
  { id: 'monthly-2026-08-model-e-city-arrival-v2', file: 'monthly-2026-08-model-e-city-arrival-v2.webp', width: 1200, height: 1500, modelIds: ['WAK-MODEL-E'] },
  { id: 'monthly-2026-08-model-g-coastal-book-cafe-v2', file: 'monthly-2026-08-model-g-coastal-book-cafe-v2.webp', width: 1200, height: 1500, modelIds: ['WAK-MODEL-G'] },
  { id: 'monthly-2026-08-model-h-coastal-reset-v1', file: 'monthly-2026-08-model-h-coastal-reset-v1.webp', width: 1200, height: 1500, modelIds: ['WAK-MODEL-H'] },
  { id: 'monthly-2026-08-model-j-blue-hour-v2', file: 'monthly-2026-08-model-j-blue-hour-v2.webp', width: 1200, height: 1500, modelIds: ['WAK-MODEL-J'] },
  { id: 'tokyo-model-b-record-shop-v2', file: 'tokyo-model-b-record-shop-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-B'] },
  { id: 'danang-model-c-tropical-market-v1', file: 'danang-model-c-tropical-market-v1.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-C'] },
  { id: 'fukuoka-model-h-market-dress-v2', file: 'fukuoka-model-h-market-dress-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-H'] },
  { id: 'osaka-model-j-after-work-gallery-v1', file: 'osaka-model-j-after-work-gallery-v1.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-J'] },
  { id: 'seoul-model-i-design-book-dress-v3', file: 'seoul-model-i-design-book-dress-v3.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-I'] },
  { id: 'busan-model-e-harbor-steps-skirt-v2', file: 'busan-model-e-harbor-steps-skirt-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-E'] },
  { id: 'jeju-model-g-summer-camera-skirt-v2', file: 'jeju-model-g-summer-camera-skirt-v2.webp', width: 1536, height: 1024, modelIds: ['WAK-MODEL-G'] },
]

// Delivery-format derivatives share the canonical WebP asset's provenance.
// They are audited separately so the public directory stays fully accounted for
// without duplicating one editorial asset in the semantic media manifest.
const optimizedDerivatives = [
  { file: 'home-hero-model-a-coastal-departure-desktop-v3.avif', width: 1536, height: 960, maximumBytes: 90_000 },
  { file: 'home-hero-model-a-coastal-departure-mobile-v3.avif', width: 1080, height: 1440, maximumBytes: 90_000 },
  { file: 'trip-match-model-d-ribbon-choice-v4.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'select-model-c-packing-flatlay-v4.avif', width: 1440, height: 810, maximumBytes: 90_000 },
  { file: 'programs-model-b-coastal-arrival-desktop-v3.avif', width: 1915, height: 821, maximumBytes: 90_000 },
  { file: 'programs-model-b-coastal-arrival-mobile-v2.avif', width: 960, height: 1280, maximumBytes: 90_000 },
  { file: 'growth-model-f-pottery-learning-desktop-v3.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'growth-model-f-pottery-learning-mobile-v3.avif', width: 960, height: 1280, maximumBytes: 90_000 },
  { file: 'business-models-c-h-i-rooftop-session-desktop-v3.avif', width: 1536, height: 960, maximumBytes: 90_000 },
  { file: 'business-models-c-h-i-rooftop-session-mobile-v3.avif', width: 960, height: 1280, maximumBytes: 90_000 },
  { file: 'tokyo-model-b-record-shop-v2.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'danang-model-c-tropical-market-v1.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'fukuoka-model-h-market-dress-v2.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'osaka-model-j-after-work-gallery-v1.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'seoul-model-i-design-book-dress-v3.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'busan-model-e-harbor-steps-skirt-v2.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
  { file: 'jeju-model-g-summer-camera-skirt-v2.avif', width: 1536, height: 1024, maximumBytes: 90_000 },
]

const motionAssets = [
  { id: 'monthly-model-edit-2026-08-v2', file: 'monthly-model-edit-2026-08-v2.mp4', width: 1080, height: 1920, modelIds: ['WAK-MODEL-E', 'WAK-MODEL-H', 'WAK-MODEL-J'], maximumBytes: 2_200_000 },
]

const auditedAssetIds = new Map([...v2Assets, ...motionAssets].map((asset) => [asset.id, asset]))
const assetIds = (...ids) => ids.map((id) => {
  if (!auditedAssetIds.has(id)) throw new Error(`Unknown audited asset ID: ${id}`)
  return id
})

// Desktop/mobile art-direction pairs are one visible placement, not separate model exposures.
const v2Placements = [
  { route: 'home', section: 'hero-poster', models: ['WAK-MODEL-A'], assets: assetIds('home-hero-model-a-coastal-departure-desktop-v3', 'home-hero-model-a-coastal-departure-mobile-v3'), source: 'src/components/home/HomeSeasonalHeroMedia.tsx' },
  { route: 'trip-match', section: 'intro', models: ['WAK-MODEL-D'], assets: assetIds('trip-match-model-d-ribbon-choice-v4'), source: 'src/components/trip-match/TripMatchExperience.tsx' },
  { route: 'hosted', section: 'hero', models: ['WAK-MODEL-H', 'WAK-MODEL-I'], assets: assetIds('hosted-models-h-i-coastal-planning-v3', 'hosted-models-h-i-coastal-planning-mobile-v3'), source: 'src/components/hosted/HostedLandingView.tsx' },
  { route: 'select', section: 'hero-editorial', models: ['WAK-MODEL-C'], assets: assetIds('select-model-c-packing-flatlay-v4'), source: 'src/components/select/SelectHubView.tsx' },
  { route: 'experience-hongdae-kpop-walk-dance', section: 'editorial-hero', models: ['WAK-MODEL-I'], assets: assetIds('experience-seoul-model-i-kpop-studio-v2'), source: 'src/lib/experiences/editorials.ts' },
  { route: 'experience-teamlab-planets-tokyo-evening', section: 'editorial-hero', models: ['WAK-MODEL-D'], assets: assetIds('experience-tokyo-model-d-immersive-gallery-v2'), source: 'src/lib/experiences/editorials.ts' },
  { route: 'learn', section: 'hero', models: ['WAK-MODEL-B'], assets: assetIds('growth-model-b-urban-learning-desktop-v2', 'growth-model-b-urban-learning-mobile-v2'), source: 'src/app/learn/page.tsx' },
  { route: 'programs', section: 'hero', models: ['WAK-MODEL-B'], assets: assetIds('programs-model-b-coastal-arrival-desktop-v3', 'programs-model-b-coastal-arrival-mobile-v2'), source: 'src/components/programs/ProgramsHubView.tsx' },
  { route: 'growth', section: 'hero', models: ['WAK-MODEL-F'], assets: assetIds('growth-model-f-pottery-learning-desktop-v3', 'growth-model-f-pottery-learning-mobile-v3'), source: 'src/app/growth/page.tsx' },
  { route: 'business', section: 'hero', models: ['WAK-MODEL-C', 'WAK-MODEL-H', 'WAK-MODEL-I'], assets: assetIds('business-models-c-h-i-rooftop-session-desktop-v3', 'business-models-c-h-i-rooftop-session-mobile-v3'), source: 'src/app/business/page.tsx' },
  { route: 'campaign-japan-short-stay', section: 'hero', models: ['WAK-MODEL-F'], assets: assetIds('campaign-model-f-japan-choice-desktop-v2', 'campaign-model-f-japan-choice-mobile-v2'), source: 'src/data/campaign-landings.ts' },
  { route: 'about', section: 'monthly-model-editorial-2026-08', models: ['WAK-MODEL-E', 'WAK-MODEL-G', 'WAK-MODEL-H', 'WAK-MODEL-J'], assets: assetIds('monthly-2026-08-model-e-city-arrival-v2', 'monthly-2026-08-model-g-coastal-book-cafe-v2', 'monthly-2026-08-model-h-coastal-reset-v1', 'monthly-2026-08-model-j-blue-hour-v2', 'monthly-model-edit-2026-08-v2'), source: 'src/components/media/MonthlyModelEditorial.tsx' },
  { route: 'guide-tokyo', section: 'guide-lookbook-record-dig', models: ['WAK-MODEL-B'], assets: assetIds('tokyo-model-b-record-shop-v2'), source: 'src/lib/guides.ts' },
  { route: 'guide-danang', section: 'guide-lookbook-tropical-market', models: ['WAK-MODEL-C'], assets: assetIds('danang-model-c-tropical-market-v1'), source: 'src/lib/guides.ts' },
  { route: 'guide-fukuoka', section: 'guide-lookbook-local-market', models: ['WAK-MODEL-H'], assets: assetIds('fukuoka-model-h-market-dress-v2'), source: 'src/lib/guides.ts' },
  { route: 'guide-osaka', section: 'guide-lookbook-after-work-exhibition', models: ['WAK-MODEL-J'], assets: assetIds('osaka-model-j-after-work-gallery-v1'), source: 'src/lib/guides.ts' },
  { route: 'guide-seoul', section: 'guide-lookbook-design-book', models: ['WAK-MODEL-I'], assets: assetIds('seoul-model-i-design-book-dress-v3'), source: 'src/lib/guides.ts' },
  { route: 'guide-busan', section: 'guide-lookbook-harbor-steps', models: ['WAK-MODEL-E'], assets: assetIds('busan-model-e-harbor-steps-skirt-v2'), source: 'src/lib/guides.ts' },
  { route: 'guide-jeju', section: 'guide-lookbook-photo-pause', models: ['WAK-MODEL-G'], assets: assetIds('jeju-model-g-summer-camera-skirt-v2'), source: 'src/lib/guides.ts' },
]

const nonModelMajorSurfaces = [
  'src/components/home/DomesticOnboarding.tsx',
  'src/components/home/MoodExplorer.tsx',
  'src/components/home/DurationExplorer.tsx',
  'src/components/home/CollectionsSection.tsx',
  'src/components/home/HouseBanner.tsx',
  'src/components/home/MomentRail.tsx',
  'src/components/home/MoreExplore.tsx',
  'src/components/affiliate/AffiliateCard.tsx',
  'src/components/guide/GuideView.tsx',
  'src/components/guide/GuideHubView.tsx',
  'src/components/guide/WorkOverlap.tsx',
  'src/components/affiliate/CollectionsHub.tsx',
  'src/components/programs/GlobalProgramsView.tsx',
  'src/components/programs/DomesticProgramsView.tsx',
  'src/components/programs/SupportProgramCard.tsx',
  'src/components/experiences/ExperienceEditorialView.tsx',
  'src/components/moments/MomentsView.tsx',
  'src/components/destinations/DestinationsHubView.tsx',
  'src/components/destinations/CompareView.tsx',
]

const errors = []
const [cityData, guideData, manifest, roster, rotation, experienceView] = await Promise.all([
  fs.readFile(cityDataPath, 'utf8'),
  fs.readFile(guideDataPath, 'utf8'),
  fs.readFile(manifestPath, 'utf8'),
  fs.readFile(rosterPath, 'utf8'),
  fs.readFile(rotationPath, 'utf8'),
  fs.readFile(experienceViewPath, 'utf8'),
])

if (/https?:\/\/images\.unsplash\.com/i.test(cityData)) errors.push('src/lib/cities.ts still contains an Unsplash hotlink')
if (/https?:\/\/images\.unsplash\.com/i.test(guideData)) errors.push('src/lib/guides.ts still contains an Unsplash hotlink')

if (!roster.includes("BRAND_MODEL_ROSTER_VERSION = '2.2'")) errors.push('Brand model roster is not pinned to v2.2')
if (!roster.includes('BRAND_MODEL_STYLING_RULES')) errors.push('Brand model styling registry is missing')
for (const id of expectedRosterIds) {
  if (!roster.includes(`id: '${id}'`)) errors.push(`Roster entry missing: ${id}`)
  if (!roster.includes(`'${id}': { styleDirection:`)) errors.push(`Styling rule missing: ${id}`)
}
for (const field of [
  'season:',
  'climateMood:',
  'wardrobeFamily:',
  'wardrobeTags:',
  'hairDirection:',
  'activityTags:',
  'travelContext:',
  'destinationMood:',
  'realismLevel:',
  'realismTarget:',
  'realismMethod:',
  'generationProvider:',
  'auditDisposition:',
  'photorealReferenceUsed:',
]) {
  if (!manifest.includes(field)) errors.push(`Seasonal realism metadata missing from manifest: ${field}`)
}
for (const field of ["framingMode: 'full-subject-desktop'", 'minHeadroomPercent: 4', "preserve: ['head', 'face', 'hands', 'bag', 'feet']"]) {
  if (!manifest.includes(field)) errors.push(`Safe model framing metadata missing from manifest: ${field}`)
}
if (!experienceView.includes("media.framingMode === 'full-subject-desktop'")) errors.push('Experience hero does not honor full-subject desktop framing')
if (!experienceView.includes("lg:object-contain lg:object-center")) errors.push('Experience hero can crop or push models off-canvas on wide desktop screens')
for (const [id, nameCode, descriptor] of [
  ['WAK-MODEL-H', 'Soft Daylight', 'softly rounded face'],
  ['WAK-MODEL-I', 'Modern Grace', 'elegant oval face'],
  ['WAK-MODEL-J', 'City Noir', 'heart-shaped face'],
]) {
  const start = roster.indexOf(`id: '${id}'`)
  const next = roster.indexOf("\n  {", start + 1)
  const block = start === -1 ? '' : roster.slice(start, next === -1 ? undefined : next)
  if (!block.includes(`nameCode: '${nameCode}'`)) errors.push(`v2.2 replacement name missing for ${id}`)
  if (!block.includes(descriptor)) errors.push(`v2.2 identity descriptor missing for ${id}`)
  if (!block.includes('supersedes and invalidates every previous')) errors.push(`Replacement record missing for ${id}`)
  if (!block.includes('directPublish: false')) errors.push(`Reference-only directPublish rule missing for ${id}`)
}
if (rotation.includes("'WAK-MODEL-K'")) errors.push('Retired WAK-MODEL-K remains in the active placement registry')

const hashes = new Map()
let totalBytes = 0

for (const id of expectedDestinationIds) {
  const relativePath = `/media/destinations/${id}-editorial-v1.webp`
  const filePath = path.join(destinationDirectory, `${id}-editorial-v1.webp`)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing destination asset: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > 500_000) errors.push(`Asset exceeds 500 KB: ${relativePath}`)
  if (cityIds.includes(id) && !cityData.includes(`photo: '${relativePath}'`)) errors.push(`City data does not use ${relativePath}`)
  if (!guideData.includes(`heroPhoto: '${relativePath}'`)) errors.push(`Guide data does not use ${relativePath}`)
  if (!manifest.includes(`id: 'destination-${id}-editorial-v1'`)) errors.push(`Manifest entry missing for ${id}`)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const duplicate = hashes.get(hash)
  if (duplicate) errors.push(`Duplicate destination assets: ${duplicate} and ${relativePath}`)
  hashes.set(hash, relativePath)
}

for (const asset of [...archivedV1Assets, ...v2Assets]) {
  const relativePath = `/media/brand-models/${asset.file}`
  const filePath = path.join(brandModelDirectory, asset.file)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing brand model asset: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > (asset.archived ? 500_000 : 250_000)) errors.push(`Asset exceeds size budget: ${relativePath}`)
  const metadata = await sharp(buffer).metadata()
  if (metadata.format !== 'webp') errors.push(`Brand model asset is not WebP: ${relativePath}`)
  if (metadata.width !== asset.width || metadata.height !== asset.height) {
    errors.push(`Unexpected dimensions for ${relativePath}: ${metadata.width}x${metadata.height}, expected ${asset.width}x${asset.height}`)
  }
  const entryStart = manifest.indexOf(`id: '${asset.id}'`)
  const nextEntry = entryStart === -1 ? -1 : manifest.indexOf("\n  {", entryStart + 1)
  const block = entryStart === -1 ? '' : manifest.slice(entryStart, nextEntry === -1 ? undefined : nextEntry)
  if (!block) errors.push(`Manifest entry missing for ${asset.id}`)
  if (!block.includes(`src: '${relativePath}'`)) errors.push(`Manifest source mismatch for ${asset.id}`)
  if (!block.includes("sourceType: 'generated'")) errors.push(`sourceType missing for ${asset.id}`)
  if (!block.includes('illustrative: true')) errors.push(`illustrative flag missing for ${asset.id}`)
  if (!block.includes(`width: ${asset.width}`) || !block.includes(`height: ${asset.height}`)) errors.push(`Manifest dimensions missing for ${asset.id}`)
  if (!block.includes("localeUsage: ['ko', 'en', 'ja']")) errors.push(`localeUsage missing for ${asset.id}`)
  for (const locale of ['KO', 'EN', 'JP']) if (!block.includes(`${locale}:`)) errors.push(`${locale} alt or restriction missing for ${asset.id}`)
  if (!block.includes('restriction:')) errors.push(`Usage restriction missing for ${asset.id}`)
  if (!asset.archived) {
    for (const modelId of asset.modelIds) if (!block.includes(`'${modelId}'`)) errors.push(`model ID ${modelId} missing for ${asset.id}`)
    for (const field of ['routeUsage:', 'sectionUsage:', 'generatedFromReferenceIds:', 'createdAt:', 'verifiedAt:']) {
      if (!block.includes(field)) errors.push(`${field.replace(':', '')} missing for ${asset.id}`)
    }
    if (!block.includes('focalPoint')) errors.push(`Focal point missing for ${asset.id}`)
  }
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  const duplicate = hashes.get(hash)
  if (duplicate) errors.push(`Duplicate media assets: ${duplicate} and ${relativePath}`)
  hashes.set(hash, relativePath)
}

for (const asset of motionAssets) {
  const relativePath = `/media/brand-models/${asset.file}`
  const filePath = path.join(brandModelDirectory, asset.file)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing brand model video: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > asset.maximumBytes) errors.push(`Video exceeds size budget: ${relativePath}`)
  if (buffer.subarray(4, 8).toString('ascii') !== 'ftyp') errors.push(`Brand model video is not a valid MP4 container: ${relativePath}`)
  const entryStart = manifest.indexOf(`id: '${asset.id}'`)
  const nextEntry = entryStart === -1 ? -1 : manifest.indexOf("\n  {", entryStart + 1)
  const block = entryStart === -1 ? '' : manifest.slice(entryStart, nextEntry === -1 ? undefined : nextEntry)
  if (!block) errors.push(`Manifest entry missing for ${asset.id}`)
  if (!block.includes(`src: '${relativePath}'`)) errors.push(`Manifest source mismatch for ${asset.id}`)
  if (!block.includes("mediaType: 'video'")) errors.push(`mediaType video missing for ${asset.id}`)
  if (!block.includes("sourceType: 'generated'")) errors.push(`sourceType missing for ${asset.id}`)
  if (!block.includes('illustrative: true')) errors.push(`illustrative flag missing for ${asset.id}`)
  if (!block.includes(`width: ${asset.width}`) || !block.includes(`height: ${asset.height}`)) errors.push(`Manifest dimensions missing for ${asset.id}`)
  if (!block.includes("localeUsage: ['ko', 'en', 'ja']")) errors.push(`localeUsage missing for ${asset.id}`)
  for (const modelId of asset.modelIds) if (!block.includes(`'${modelId}'`)) errors.push(`model ID ${modelId} missing for ${asset.id}`)
  for (const field of ['routeUsage:', 'sectionUsage:', 'generatedFromReferenceIds:', 'createdAt:', 'verifiedAt:', 'restriction:']) {
    if (!block.includes(field)) errors.push(`${field.replace(':', '')} missing for ${asset.id}`)
  }
}

for (const asset of optimizedDerivatives) {
  const relativePath = `/media/brand-models/${asset.file}`
  const filePath = path.join(brandModelDirectory, asset.file)
  let buffer
  try { buffer = await fs.readFile(filePath) } catch { errors.push(`Missing optimized derivative: ${relativePath}`); continue }
  totalBytes += buffer.byteLength
  if (buffer.byteLength === 0) errors.push(`Zero-byte asset: ${relativePath}`)
  if (buffer.byteLength > asset.maximumBytes) errors.push(`Optimized derivative exceeds size budget: ${relativePath}`)
  const metadata = await sharp(buffer).metadata()
  if (metadata.format !== 'heif') errors.push(`Optimized derivative is not AVIF: ${relativePath}`)
  if (metadata.width !== asset.width || metadata.height !== asset.height) {
    errors.push(`Unexpected dimensions for ${relativePath}: ${metadata.width}x${metadata.height}, expected ${asset.width}x${asset.height}`)
  }
}

const publicBrandFiles = await fs.readdir(brandModelDirectory)
for (const file of publicBrandFiles) {
  if (/reference|anchor|contact|grid|sheet|source/i.test(file)) errors.push(`Reference-only file is present in public assets: ${file}`)
  if (![...archivedV1Assets, ...v2Assets, ...motionAssets, ...optimizedDerivatives].some((asset) => asset.file === file) && !supersededPublicFiles.has(file)) errors.push(`Unregistered brand model asset: ${file}`)
}

const placementSources = new Map()
for (const placement of v2Placements) {
  const source = placementSources.get(placement.source) ?? await fs.readFile(path.join(root, placement.source), 'utf8')
  placementSources.set(placement.source, source)
  for (const assetId of placement.assets) if (!source.includes(assetId)) errors.push(`${placement.source} does not use ${assetId}`)
  if (/home-workation-editorial-v1-legacy|domestic-(?:seoul|busan|jeju)-model-[acd].*-v1|trip-match-model-d-city-departure-v1/.test(source)) {
    errors.push(`Legacy v1 model placement still exposed by ${placement.source}`)
  }
}

const exposedModels = new Set(v2Placements.flatMap((placement) => placement.models))
for (const modelId of expectedRosterIds) {
  if (!exposedModels.has(modelId)) errors.push(`${modelId} has no visible editorial placement`)
  if (!rotation.includes(`'${modelId}'`)) errors.push(`${modelId} is missing from the deterministic rotation registry`)
}
for (const placement of v2Placements) {
  for (const assetId of placement.assets) if (!rotation.includes(`'${assetId}'`)) errors.push(`${assetId} is missing from the deterministic rotation registry`)
}
if (!rotation.includes("strategy: 'deterministic-route-placement'")) errors.push('Rotation strategy must remain deterministic by route')
const identityExposure = v2Placements.flatMap((placement) => placement.models)
let maximumIdentityShare = 0
for (const modelId of exposedModels) {
  const count = identityExposure.filter((id) => id === modelId).length
  const share = count / identityExposure.length
  maximumIdentityShare = Math.max(maximumIdentityShare, share)
  if (share > maximumAllowedIdentityShare) errors.push(`${modelId} exceeds ${(maximumAllowedIdentityShare * 100).toFixed(0)}% of visible model placements: ${(share * 100).toFixed(1)}%`)
}
const domesticModels = v2Placements.filter((placement) => placement.section.startsWith('domestic-')).flatMap((placement) => placement.models)
if (new Set(domesticModels).size !== domesticModels.length) errors.push('The same model appears in adjacent domestic onboarding cards')

for (const relativePath of nonModelMajorSurfaces) {
  const content = await fs.readFile(path.join(root, relativePath), 'utf8')
  if (content.includes('/media/brand-models/')) errors.push(`Place/product-led surface unexpectedly uses a brand model: ${relativePath}`)
}
const declaredNonModelShare = nonModelMajorSurfaces.length / (nonModelMajorSurfaces.length + v2Placements.length)
if (declaredNonModelShare < 0.5) errors.push(`Declared non-model major surface share is below 50%: ${(declaredNonModelShare * 100).toFixed(1)}%`)

async function collectSourceFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectSourceFiles(fullPath))
    else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) files.push(fullPath)
  }
  return files
}

for (const filePath of await collectSourceFiles(path.join(root, 'src'))) {
  const relativePath = path.relative(root, filePath).replaceAll('\\', '/')
  const content = await fs.readFile(filePath, 'utf8')
  if (/wak-model-h-(?!soft-daylight)|wak-model-i-(?!modern-grace)|wak-model-j-(?!city-noir)/i.test(content)) {
    errors.push(`Rejected pre-v2.2 H/I/J identity reference in ${relativePath}`)
  }
  if (/reference[_-](?:grid|sheet)|contact[_-]sheet|identity[_-]anchor\.jpg/i.test(content)) errors.push(`Reference-only input exposed by ${relativePath}`)
  if (!content.includes('/media/brand-models/')) continue
  if (/(?:reviews?|testimonials?|participant-proof|hotel-product|experience-product)/i.test(relativePath)) {
    errors.push(`Generated brand model asset used in a proof-sensitive area: ${relativePath}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const productionFiles = [...v2Assets, ...motionAssets]
const productionBytes = await Promise.all(productionFiles.map(async (asset) => (await fs.stat(path.join(brandModelDirectory, asset.file))).size))
console.log(`Media audit passed: ${expectedDestinationIds.length} destinations, ${expectedRosterIds.length} v2.2 models, ${v2Assets.length} production images and ${motionAssets.length} video (${productionBytes.reduce((sum, size) => sum + size, 0).toLocaleString()} bytes)`)
console.log(`Visible identity mix: ${[...exposedModels].join(', ')}; actual max share ${(maximumIdentityShare * 100).toFixed(1)}% (cap ${(maximumAllowedIdentityShare * 100).toFixed(0)}%); non-model major surfaces ${(declaredNonModelShare * 100).toFixed(1)}%`)
console.log(`Total audited media bytes: ${totalBytes.toLocaleString()}`)
