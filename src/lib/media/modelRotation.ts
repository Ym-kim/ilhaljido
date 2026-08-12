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
  maximumIdentityShare: 0.5,
  proofSensitiveAreasExcluded: true,
  rules: [
    'Keep one stable art-directed identity per route and section; never randomize a face on render.',
    'Prefer the least-exposed eligible identity when producing the next editorial surface.',
    'Represent the full active roster before adding a third placement for any identity when the context allows.',
    'Do not repeat the same pose family, camera family, silhouette or primary action on adjacent major surfaces.',
    'Across every six new model surfaces, use at least four pose families, four silhouette families, four color stories and three camera families.',
    'Balance dresses, skirts, shorts, layered sets and trousers; no single silhouette family may exceed 40 percent of active placements.',
    'Laptop, map and paper are task props only, never the default shorthand for workation.',
    'Do not repeat neutral linen styling on consecutive surfaces; give every destination a deliberate color story.',
    'Vary environment tone, light quality and material palette with the model direction; never treat wardrobe color alone as sufficient visual diversity.',
    'Never use generated models as customer, participant, review, product, hotel or program proof.',
  ],
} as const

export const EDITORIAL_MODEL_PLACEMENTS: EditorialModelPlacement[] = [
  { id: 'home-hero', routes: ['/', '/en', '/ja'], section: 'home-seasonal-hero-2026-08', modelIds: ['WAK-MODEL-A', 'WAK-MODEL-F'], assetIds: ['home-hero-model-a-coastal-departure-desktop-v3', 'home-hero-model-a-coastal-departure-mobile-v3', 'home-seasonal-film-2026-08-desktop-v1', 'home-seasonal-film-2026-08-mobile-v1'], primaryHref: '/trip-match', status: 'active' },
  { id: 'trip-match-intro', routes: ['/trip-match', '/ja/trip-match'], section: 'trip-match-intro', modelIds: ['WAK-MODEL-D'], assetIds: ['trip-match-model-d-ribbon-choice-v4'], status: 'active' },
  { id: 'hosted-hero', routes: ['/hosted', '/en/hosted', '/ja/hosted'], section: 'hosted-hero', modelIds: ['WAK-MODEL-H', 'WAK-MODEL-I'], assetIds: ['hosted-models-h-i-coastal-planning-v3', 'hosted-models-h-i-coastal-planning-mobile-v3'], status: 'active' },
  { id: 'select-hero', routes: ['/select', '/en/select', '/ja/select'], section: 'select-hero-editorial', modelIds: ['WAK-MODEL-C'], assetIds: ['select-model-c-packing-flatlay-v4'], status: 'active' },
  { id: 'learn-hero', routes: ['/learn'], section: 'learn-hero', modelIds: ['WAK-MODEL-B'], assetIds: ['growth-model-b-urban-learning-desktop-v2', 'growth-model-b-urban-learning-mobile-v2'], primaryHref: '/select/learn', status: 'active' },
  { id: 'programs-hero', routes: ['/programs', '/en/programs', '/ja/programs'], section: 'programs-hero', modelIds: ['WAK-MODEL-B'], assetIds: ['programs-model-b-coastal-arrival-desktop-v3', 'programs-model-b-coastal-arrival-mobile-v2'], primaryHref: '/hosted', status: 'active' },
  { id: 'growth-hero', routes: ['/growth'], section: 'growth-hero', modelIds: ['WAK-MODEL-F'], assetIds: ['growth-model-f-pottery-learning-desktop-v3', 'growth-model-f-pottery-learning-mobile-v3'], primaryHref: '/learn', status: 'active' },
  { id: 'business-hero', routes: ['/business'], section: 'business-hero', modelIds: ['WAK-MODEL-C', 'WAK-MODEL-H', 'WAK-MODEL-I'], assetIds: ['business-models-c-h-i-rooftop-session-desktop-v3', 'business-models-c-h-i-rooftop-session-mobile-v3'], primaryHref: '#inquiry', status: 'active' },
  { id: 'japan-short-stay-hero', routes: ['/campaign/japan-short-stay'], section: 'campaign-japan-short-stay-hero', modelIds: ['WAK-MODEL-F'], assetIds: ['campaign-model-f-japan-choice-desktop-v2', 'campaign-model-f-japan-choice-mobile-v2'], primaryHref: '/trip-match?campaign=japan-short-stay', status: 'active' },
  { id: 'fukuoka-trip-set-editorial', routes: ['/', '/en', '/ja', '/collections/fukuoka-3n4d', '/en/collections/fukuoka-3n4d', '/ja/collections/fukuoka-3n4d'], section: 'fukuoka-trip-set-editorial', modelIds: ['WAK-MODEL-G'], assetIds: ['trip-set-fukuoka-model-g-cafe-v2'], primaryHref: '/collections/fukuoka-3n4d', status: 'active' },
  { id: 'itoshima-experience-editorial', routes: ['/experiences/itoshima-photo-bus-tour', '/en/experiences/itoshima-photo-bus-tour', '/ja/experiences/itoshima-photo-bus-tour', '/select/activity'], section: 'itoshima-experience-editorial', modelIds: ['WAK-MODEL-G'], assetIds: ['itoshima-coast-editorial-model-g-v2'], primaryHref: '/experiences/itoshima-photo-bus-tour', status: 'active' },
  { id: 'tokyo-guide-lookbook', routes: ['/guide/tokyo', '/en/guide/tokyo', '/ja/guide/tokyo'], section: 'guide-lookbook-record-dig', modelIds: ['WAK-MODEL-B'], assetIds: ['tokyo-model-b-record-shop-v2'], primaryHref: '/collections/tokyo-allinone', status: 'active' },
  { id: 'danang-guide-lookbook', routes: ['/guide/danang', '/en/guide/danang', '/ja/guide/danang'], section: 'guide-lookbook-tropical-market', modelIds: ['WAK-MODEL-C'], assetIds: ['danang-model-c-tropical-market-v1'], status: 'active' },
  { id: 'bali-guide-lookbook', routes: ['/guide/bali', '/en/guide/bali', '/ja/guide/bali'], section: 'guide-lookbook-tropical-cycle', modelIds: ['WAK-MODEL-A'], assetIds: ['bali-model-a-tropical-cycle-v1'], primaryHref: '/collections/bali-monthstay', status: 'active' },
  { id: 'chiangmai-guide-lookbook', routes: ['/guide/chiangmai', '/en/guide/chiangmai', '/ja/guide/chiangmai'], section: 'guide-lookbook-red-ride', modelIds: ['WAK-MODEL-E'], assetIds: ['chiangmai-model-e-red-ride-v1'], primaryHref: '/collections/chiangmai-nomad', status: 'active' },
  { id: 'cebu-guide-lookbook', routes: ['/guide/cebu', '/en/guide/cebu', '/ja/guide/cebu'], section: 'guide-lookbook-island-prep', modelIds: ['WAK-MODEL-F'], assetIds: ['cebu-model-f-island-prep-v1'], status: 'active' },
  { id: 'sydney-guide-lookbook', routes: ['/guide/sydney', '/en/guide/sydney', '/ja/guide/sydney'], section: 'guide-lookbook-clear-winter-harbour', modelIds: ['WAK-MODEL-D'], assetIds: ['sydney-model-d-clear-winter-skirt-v2'], status: 'active' },
  { id: 'fukuoka-guide-lookbook', routes: ['/guide/fukuoka', '/en/guide/fukuoka', '/ja/guide/fukuoka'], section: 'guide-lookbook-local-market', modelIds: ['WAK-MODEL-H'], assetIds: ['fukuoka-model-h-market-dress-v2'], primaryHref: '/collections/fukuoka-3n4d', status: 'active' },
  { id: 'osaka-guide-lookbook', routes: ['/guide/osaka', '/en/guide/osaka', '/ja/guide/osaka'], section: 'guide-lookbook-after-work-exhibition', modelIds: ['WAK-MODEL-J'], assetIds: ['osaka-model-j-after-work-gallery-v1'], primaryHref: '/collections/osaka-friends', status: 'active' },
  { id: 'seoul-guide-lookbook', routes: ['/guide/seoul', '/en/guide/seoul', '/ja/guide/seoul'], section: 'guide-lookbook-design-book', modelIds: ['WAK-MODEL-I'], assetIds: ['seoul-model-i-design-book-dress-v3'], primaryHref: '/collections/seoul-3n4d', status: 'active' },
  { id: 'busan-guide-lookbook', routes: ['/guide/busan', '/en/guide/busan', '/ja/guide/busan'], section: 'guide-lookbook-harbor-steps', modelIds: ['WAK-MODEL-E'], assetIds: ['busan-model-e-harbor-steps-skirt-v2'], primaryHref: '/collections/busan-weekend', status: 'active' },
  { id: 'jeju-guide-lookbook', routes: ['/guide/jeju', '/en/guide/jeju', '/ja/guide/jeju'], section: 'guide-lookbook-photo-pause', modelIds: ['WAK-MODEL-G'], assetIds: ['jeju-model-g-summer-camera-skirt-v2'], primaryHref: '/collections/jeju-solo-reset', status: 'active' },
  { id: 'jeonju-guide-lookbook', routes: ['/guide/jeonju', '/en/guide/jeonju', '/ja/guide/jeonju'], section: 'guide-lookbook-hanok-shade', modelIds: ['WAK-MODEL-J'], assetIds: ['jeonju-model-j-hanok-fan-v1'], status: 'active' },
  { id: 'yeosu-guide-lookbook', routes: ['/guide/yeosu', '/en/guide/yeosu', '/ja/guide/yeosu'], section: 'guide-lookbook-harbour-breeze', modelIds: ['WAK-MODEL-A'], assetIds: ['yeosu-model-a-harbor-breeze-v1'], status: 'active' },
  { id: 'hongdae-kpop-experience-editorial', routes: ['/experiences/hongdae-kpop-walk-dance', '/en/experiences/hongdae-kpop-walk-dance', '/ja/experiences/hongdae-kpop-walk-dance', '/select/activity'], section: 'hongdae-kpop-experience-editorial', modelIds: ['WAK-MODEL-I'], assetIds: ['experience-seoul-model-i-kpop-studio-v2'], primaryHref: '/experiences/hongdae-kpop-walk-dance', status: 'active' },
  { id: 'teamlab-tokyo-experience-editorial', routes: ['/experiences/teamlab-planets-tokyo-evening', '/en/experiences/teamlab-planets-tokyo-evening', '/ja/experiences/teamlab-planets-tokyo-evening', '/select/activity'], section: 'teamlab-tokyo-experience-editorial', modelIds: ['WAK-MODEL-D'], assetIds: ['experience-tokyo-model-d-immersive-gallery-v2'], primaryHref: '/experiences/teamlab-planets-tokyo-evening', status: 'active' },
  { id: 'about-monthly-edit-2026-08', routes: ['/about'], section: 'monthly-model-editorial-2026-08', modelIds: ['WAK-MODEL-E', 'WAK-MODEL-G', 'WAK-MODEL-H', 'WAK-MODEL-J'], assetIds: ['monthly-2026-08-model-e-city-arrival-v2', 'monthly-2026-08-model-g-coastal-book-cafe-v2', 'monthly-2026-08-model-h-coastal-reset-v1', 'monthly-2026-08-model-j-blue-hour-v2', 'monthly-model-edit-2026-08-v2'], status: 'active' },
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
