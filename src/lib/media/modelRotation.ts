import { BRAND_MODEL_IDS, type BrandModelId } from '@/lib/media/brandModels'

export type EditorialModelPlacement = {
  id: string
  routes: string[]
  section: string
  modelIds: BrandModelId[]
  assetIds: string[]
  primaryHref?: string
  status: 'active'
}

export const MODEL_ROTATION_POLICY = {
  strategy: 'deterministic-route-placement',
  maximumIdentityShare: 0.25,
  proofSensitiveAreasExcluded: true,
  rules: [
    'Keep one stable art-directed identity per route and section; never randomize a face on render.',
    'Prefer the least-exposed eligible identity when producing the next editorial surface.',
    'Represent the full active roster before adding a third placement for any identity when the context allows.',
    'Never use generated models as customer, participant, review, product, hotel or program proof.',
  ],
} as const

export const EDITORIAL_MODEL_PLACEMENTS: EditorialModelPlacement[] = [
  { id: 'home-hero', routes: ['/', '/en', '/ja'], section: 'home-seasonal-hero-2026-08', modelIds: ['WAK-MODEL-A', 'WAK-MODEL-F', 'WAK-MODEL-J'], assetIds: ['home-hero-model-a-coastal-work-desktop-v2', 'home-hero-model-a-coastal-work-mobile-v2', 'late-summer-model-f-market-v1', 'home-seasonal-film-2026-08-desktop-v1', 'home-seasonal-film-2026-08-mobile-v1'], primaryHref: '/trip-match', status: 'active' },
  { id: 'home-seoul', routes: ['/', '/en', '/ja'], section: 'domestic-onboarding-seoul', modelIds: ['WAK-MODEL-J'], assetIds: ['domestic-seoul-model-j-city-noir-v2'], primaryHref: '/destinations/seoul', status: 'active' },
  { id: 'home-busan', routes: ['/', '/en', '/ja'], section: 'domestic-onboarding-busan', modelIds: ['WAK-MODEL-E'], assetIds: ['domestic-busan-model-e-coastal-city-v2'], primaryHref: '/destinations/busan', status: 'active' },
  { id: 'home-jeju', routes: ['/', '/en', '/ja'], section: 'domestic-onboarding-jeju', modelIds: ['WAK-MODEL-G'], assetIds: ['domestic-jeju-model-g-slow-stay-v2'], primaryHref: '/destinations/jeju', status: 'active' },
  { id: 'trip-match-intro', routes: ['/trip-match', '/ja/trip-match'], section: 'trip-match-intro', modelIds: ['WAK-MODEL-D'], assetIds: ['trip-match-model-d-itinerary-choice-v2'], status: 'active' },
  { id: 'hosted-hero', routes: ['/hosted', '/en/hosted', '/ja/hosted'], section: 'hosted-hero', modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'], assetIds: ['hosted-models-h-i-coastal-planning-v2', 'hosted-models-h-i-coastal-planning-mobile-v2'], status: 'active' },
  { id: 'select-hero', routes: ['/select', '/en/select', '/ja/select'], section: 'select-hero-editorial', modelIds: ['WAK-MODEL-I'], assetIds: ['select-model-i-travel-prep-v2'], status: 'active' },
  { id: 'learn-hero', routes: ['/learn'], section: 'learn-hero', modelIds: ['WAK-MODEL-K'], assetIds: ['learn-model-k-creative-focus-desktop-v1', 'learn-model-k-creative-focus-mobile-v1'], primaryHref: '/select/learn', status: 'active' },
  { id: 'programs-hero', routes: ['/programs', '/en/programs', '/ja/programs'], section: 'programs-hero', modelIds: ['WAK-MODEL-K'], assetIds: ['programs-model-k-stay-planning-desktop-v1', 'programs-model-k-stay-planning-mobile-v1'], primaryHref: '/hosted', status: 'active' },
  { id: 'growth-hero', routes: ['/growth'], section: 'growth-hero', modelIds: ['WAK-MODEL-B'], assetIds: ['growth-model-b-urban-learning-desktop-v1', 'growth-model-b-urban-learning-mobile-v1'], primaryHref: '/learn', status: 'active' },
  { id: 'business-hero', routes: ['/business'], section: 'business-hero', modelIds: ['WAK-MODEL-C'], assetIds: ['business-model-c-team-planning-desktop-v1', 'business-model-c-team-planning-mobile-v1'], primaryHref: '#inquiry', status: 'active' },
  { id: 'japan-short-stay-hero', routes: ['/campaign/japan-short-stay'], section: 'campaign-japan-short-stay-hero', modelIds: ['WAK-MODEL-F'], assetIds: ['campaign-model-f-japan-choice-desktop-v1', 'campaign-model-f-japan-choice-mobile-v1'], primaryHref: '/trip-match?campaign=japan-short-stay', status: 'active' },
  { id: 'about-monthly-edit-2026-08', routes: ['/about'], section: 'monthly-model-editorial-2026-08', modelIds: ['WAK-MODEL-E', 'WAK-MODEL-H', 'WAK-MODEL-J'], assetIds: ['monthly-2026-08-model-e-city-arrival-v2', 'monthly-2026-08-model-h-coastal-reset-v1', 'monthly-2026-08-model-j-blue-hour-v2', 'monthly-model-edit-2026-08-v2'], status: 'active' },
]

export function getEditorialModelPlacement(id: string): EditorialModelPlacement {
  const placement = EDITORIAL_MODEL_PLACEMENTS.find((item) => item.id === id)
  if (!placement) throw new Error(`Unknown editorial model placement: ${id}`)
  return placement
}

export function getEditorialModelExposure(): Record<BrandModelId, number> {
  const exposure = Object.fromEntries(BRAND_MODEL_IDS.map((id) => [id, 0])) as Record<BrandModelId, number>
  for (const placement of EDITORIAL_MODEL_PLACEMENTS) {
    for (const modelId of placement.modelIds) exposure[modelId] += 1
  }
  return exposure
}

export function getNextEditorialModels(limit = 3): BrandModelId[] {
  const exposure = getEditorialModelExposure()
  return [...BRAND_MODEL_IDS]
    .sort((left, right) => exposure[left] - exposure[right] || BRAND_MODEL_IDS.indexOf(left) - BRAND_MODEL_IDS.indexOf(right))
    .slice(0, Math.max(0, limit))
}
