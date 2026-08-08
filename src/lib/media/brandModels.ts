import type { Lang } from '@/lib/i18n/types'

export const BRAND_MODEL_ROSTER_VERSION = '2.3' as const

export const BRAND_MODEL_IDS = [
  'WAK-MODEL-A',
  'WAK-MODEL-B',
  'WAK-MODEL-C',
  'WAK-MODEL-D',
  'WAK-MODEL-E',
  'WAK-MODEL-F',
  'WAK-MODEL-G',
  'WAK-MODEL-H',
  'WAK-MODEL-I',
  'WAK-MODEL-J',
  'WAK-MODEL-K',
] as const

export type BrandModelId = (typeof BRAND_MODEL_IDS)[number]

export type BrandModelProfile = {
  id: BrandModelId
  rosterVersion: typeof BRAND_MODEL_ROSTER_VERSION
  nameCode: string
  adultAgeRange: string
  visualRole: Record<Lang, string>
  identityDescriptor: string
  faceKeywords: string[]
  hairKeywords: string[]
  moodKeywords: string[]
  wardrobePalette: string[]
  preferredActions: string[]
  preferredLocations: string[]
  allowedSections: string[]
  restrictedSections: string[]
  identityAnchorAssetIds: string[]
  referenceAssetIds: string[]
  productionAssetIds: string[]
  productionUse: 'generated_derivatives_only'
  sourceType: 'generated_reference'
  illustrative: true
  directPublish: false
  replacementRecord?: string
  notes: string
}

const COMMON_RESTRICTED_SECTIONS = [
  'reviews',
  'testimonials',
  'participant-proof',
  'hotel-product-photography',
  'experience-product-photography',
  'staff-profiles',
]

export const BRAND_MODELS: BrandModelProfile[] = [
  {
    id: 'WAK-MODEL-A', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Coastal Calm', adultAgeRange: 'late twenties to early thirties',
    visualRole: { KO: '홈 히어로·해안 업무·차분한 체류', EN: 'Home hero, coastal work and calm stays', JP: 'ホーム・海辺の仕事・穏やかな滞在' },
    identityDescriptor: 'fictional adult East Asian woman with a calm natural presence and softly textured long dark hair',
    faceKeywords: ['calm', 'natural', 'balanced'], hairKeywords: ['long', 'dark', 'soft texture'], moodKeywords: ['coastal', 'quiet', 'grounded'],
    wardrobePalette: ['ocean blue', 'ivory', 'sand'], preferredActions: ['closing a laptop', 'packing a weekender', 'looking toward the coast'], preferredLocations: ['coastal work lounge', 'island stay', 'quiet terrace'],
    allowedSections: ['home-hero', 'coastal-editorial', 'slow-stay'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-a-coastal-calm-identity-anchor'], referenceAssetIds: ['model-a-source-reference'],
    productionAssetIds: ['home-hero-model-a-coastal-work-desktop-v2', 'home-hero-model-a-coastal-work-mobile-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Keep as one member of the roster, never the default face across adjacent sections.',
  },
  {
    id: 'WAK-MODEL-B', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Soft Urban', adultAgeRange: 'late twenties',
    visualRole: { KO: '서울·카페 업무·도시 발견', EN: 'Seoul, café work and urban discovery', JP: 'ソウル・カフェワーク・街の発見' },
    identityDescriptor: 'fictional adult East Asian woman with a soft urban presence and long dark hair',
    faceKeywords: ['soft', 'urban', 'approachable'], hairKeywords: ['long', 'dark', 'natural'], moodKeywords: ['daylight', 'social', 'easy'],
    wardrobePalette: ['stone', 'soft blue', 'charcoal'], preferredActions: ['taking notes', 'walking between cafés', 'checking a route'], preferredLocations: ['city café', 'design district', 'local street'],
    allowedSections: ['seoul-editorial', 'social-discovery', 'cafe-work', 'growth-learning'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-b-soft-urban-identity-anchor'], referenceAssetIds: ['model-b-source-reference'], productionAssetIds: ['growth-model-b-urban-learning-desktop-v1', 'growth-model-b-urban-learning-mobile-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Regenerate environment-led scenes; never publish the source pose or synthetic lettering.',
  },
  {
    id: 'WAK-MODEL-C', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Quiet Premium', adultAgeRange: 'early thirties',
    visualRole: { KO: '라운지·프리미엄 체류·도시 업무', EN: 'Premium lounges, stays and city work', JP: 'ラウンジ・上質な滞在・都市の仕事' },
    identityDescriptor: 'fictional adult East Asian woman with a composed premium presence and polished long dark hair',
    faceKeywords: ['composed', 'polished', 'quiet'], hairKeywords: ['long', 'dark', 'smooth'], moodKeywords: ['premium', 'focused', 'minimal'],
    wardrobePalette: ['ink', 'taupe', 'cream'], preferredActions: ['waiting before check-in', 'reviewing a schedule', 'quiet laptop work'], preferredLocations: ['hotel lounge', 'business stay', 'museum café'],
    allowedSections: ['premium-stay-editorial', 'business-travel', 'lounge', 'team-business-editorial'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-c-quiet-premium-identity-anchor'], referenceAssetIds: ['model-c-source-reference'], productionAssetIds: ['business-model-c-team-planning-desktop-v1', 'business-model-c-team-planning-mobile-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Vary wardrobe and camera distance; avoid repeating a white top and beauty-portrait composition.',
  },
  {
    id: 'WAK-MODEL-D', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Refined Editorial', adultAgeRange: 'late twenties to early thirties',
    visualRole: { KO: 'Trip Match·전시·저녁 도시', EN: 'Trip Match, exhibitions and evening cities', JP: 'Trip Match・展示・夜の街' },
    identityDescriptor: 'fictional adult East Asian woman with a reflective editorial presence and long dark hair',
    faceKeywords: ['refined', 'reflective', 'editorial'], hairKeywords: ['long', 'dark', 'soft'], moodKeywords: ['decisive', 'city', 'cinematic'],
    wardrobePalette: ['taupe', 'muted blue', 'charcoal'], preferredActions: ['choosing an itinerary', 'closing a laptop', 'leaving an exhibition'], preferredLocations: ['departure lounge', 'gallery district', 'evening city'],
    allowedSections: ['trip-match', 'exhibition-editorial', 'city-departure'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-d-refined-editorial-identity-anchor'], referenceAssetIds: ['model-d-source-reference'],
    productionAssetIds: ['trip-match-model-d-itinerary-choice-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Prioritize choice, movement and place rather than a close beauty composition.',
  },
  {
    id: 'WAK-MODEL-E', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'City Chic', adultAgeRange: 'late twenties',
    visualRole: { KO: '부산·해안 도시·짧은 여행', EN: 'Busan, coastal cities and short breaks', JP: '釜山・海辺の街・短い旅' },
    identityDescriptor: 'fictional adult East Asian woman with a confident city presence and long dark hair',
    faceKeywords: ['confident', 'defined', 'modern'], hairKeywords: ['long', 'dark', 'sleek'], moodKeywords: ['coastal city', 'fresh', 'active'],
    wardrobePalette: ['navy', 'muted coral', 'beige'], preferredActions: ['starting a coastal walk', 'adjusting a travel bag', 'moving between city and sea'], preferredLocations: ['coastal promenade', 'harbor district', 'short city break'],
    allowedSections: ['busan-editorial', 'select-editorial', 'short-break'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-e-city-chic-identity-anchor'], referenceAssetIds: ['model-e-source-reference'], productionAssetIds: ['domestic-busan-model-e-coastal-city-v2', 'monthly-2026-08-model-e-city-arrival-v1', 'monthly-model-edit-2026-08-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Restyle into practical travel clothing and show movement rather than a fashion pose.',
  },
  {
    id: 'WAK-MODEL-F', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Warm Modern', adultAgeRange: 'late twenties',
    visualRole: { KO: '후쿠오카·오사카·따뜻한 낮', EN: 'Fukuoka, Osaka and warm daylight', JP: '福岡・大阪・あたたかな昼' },
    identityDescriptor: 'fictional adult East Asian woman with warm brown hair and a modern feminine presence',
    faceKeywords: ['warm', 'modern', 'open'], hairKeywords: ['brown', 'long', 'soft wave'], moodKeywords: ['daylight', 'city food', 'social'],
    wardrobePalette: ['camel', 'cream', 'terracotta'], preferredActions: ['walking to a café', 'browsing a market', 'meeting a friend'], preferredLocations: ['Fukuoka-inspired street', 'Osaka-inspired café', 'market lane'],
    allowedSections: ['japan-campaign', 'food-editorial', 'social-editorial'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-f-warm-modern-identity-anchor'], referenceAssetIds: ['model-f-source-reference'], productionAssetIds: ['campaign-model-f-japan-choice-desktop-v1', 'campaign-model-f-japan-choice-mobile-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Use warm hair and natural daylight to diversify the roster without repeating glamour styling.',
  },
  {
    id: 'WAK-MODEL-G', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Clean Romantic', adultAgeRange: 'late twenties',
    visualRole: { KO: '제주·느린 체류·섬 산책', EN: 'Jeju, slow stays and island walks', JP: '済州・ゆっくり滞在・島の散歩' },
    identityDescriptor: 'fictional adult East Asian woman with a clean gentle presence and long straight dark hair',
    faceKeywords: ['clean', 'gentle', 'focused'], hairKeywords: ['long', 'straight', 'dark'], moodKeywords: ['slow', 'windy', 'quiet'],
    wardrobePalette: ['sage', 'ivory', 'dark denim'], preferredActions: ['writing in a notebook', 'walking by a stone wall', 'pausing in the wind'], preferredLocations: ['island lane', 'coastal field', 'quiet café'],
    allowedSections: ['jeju-editorial', 'domestic-onboarding', 'slow-stay'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-g-clean-romantic-identity-anchor'], referenceAssetIds: ['model-g-source-reference'], productionAssetIds: ['domestic-jeju-model-g-slow-stay-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Create environmental travel poses; the portrait anchor itself is never a publication asset.',
  },
  {
    id: 'WAK-MODEL-H', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Soft Daylight', adultAgeRange: 'late twenties',
    visualRole: { KO: '로컬 카페·입문 여행·낮의 도시', EN: 'Local cafés, beginner trips and quiet daytime cities', JP: 'ローカルカフェ・旅の入門・昼の街' },
    identityDescriptor: 'fictional adult East Asian woman, late twenties, softly rounded face, gentle dark eyes, airy curtain bangs, long softly waved dark hair, warm approachable smile, understated feminine styling',
    faceKeywords: ['softly rounded', 'gentle dark eyes', 'approachable'], hairKeywords: ['airy curtain bangs', 'long', 'soft dark waves'], moodKeywords: ['soft daylight', 'friendly', 'local'],
    wardrobePalette: ['sand', 'ivory', 'soft blue'], preferredActions: ['planning together', 'pointing to a map', 'organizing a day'], preferredLocations: ['local café', 'coastal shared lounge', 'quiet daytime street'],
    allowedSections: ['hosted-editorial', 'domestic-beginner', 'local-cafe'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-h-soft-daylight-identity-anchor-v2-2'], referenceAssetIds: ['model-h-source-reference-v2-2'],
    productionAssetIds: ['hosted-models-h-i-coastal-planning-v2', 'hosted-models-h-i-coastal-planning-mobile-v2', 'monthly-2026-08-model-h-coastal-reset-v1', 'monthly-model-edit-2026-08-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    replacementRecord: 'New v2.2 H; supersedes and invalidates every previous H identity.',
    notes: 'Keep the rounded face and curtain bangs distinct; never blend with I or the rejected former H.',
  },
  {
    id: 'WAK-MODEL-I', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Modern Grace', adultAgeRange: 'early thirties',
    visualRole: { KO: '비즈니스 여행·라운지·장기 체류', EN: 'Business travel, premium lounges and long stays', JP: '出張・ラウンジ・長期滞在' },
    identityDescriptor: 'fictional adult East Asian woman, early thirties, elegant oval face, calm almond-shaped brown eyes, long chestnut waves, poised expression, refined minimal makeup, mature contemporary styling',
    faceKeywords: ['elegant oval', 'calm almond eyes', 'poised'], hairKeywords: ['long', 'chestnut', 'soft waves'], moodKeywords: ['mature', 'organized', 'premium'],
    wardrobePalette: ['chestnut', 'cream', 'deep navy'], preferredActions: ['checking an itinerary', 'writing a shared plan', 'preparing to depart'], preferredLocations: ['travel lounge', 'coastal shared workspace', 'exhibition district'],
    allowedSections: ['select-editorial', 'hosted-editorial', 'business-travel'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-i-modern-grace-identity-anchor-v2-2'], referenceAssetIds: ['model-i-source-reference-v2-2'],
    productionAssetIds: ['hosted-models-h-i-coastal-planning-v2', 'hosted-models-h-i-coastal-planning-mobile-v2', 'select-model-i-travel-prep-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    replacementRecord: 'New v2.2 I; supersedes and invalidates every previous I identity.',
    notes: 'Keep the mature oval face and chestnut waves distinct; never blend with H or the rejected former I.',
  },
  {
    id: 'WAK-MODEL-J', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'City Noir', adultAgeRange: 'late twenties',
    visualRole: { KO: '도시 야간·전시·서울 발견', EN: 'Urban evenings, exhibitions and Seoul discovery', JP: '夜の街・展示・ソウル発見' },
    identityDescriptor: 'fictional adult East Asian woman, late twenties, refined heart-shaped face, sleek straight black hair, defined natural eyes, composed editorial expression, modern monochrome styling',
    faceKeywords: ['heart-shaped', 'defined natural eyes', 'composed'], hairKeywords: ['sleek', 'straight', 'black'], moodKeywords: ['urban night', 'gallery', 'sharp'],
    wardrobePalette: ['charcoal', 'cream', 'warm amber'], preferredActions: ['walking after work', 'carrying a weekender', 'leaving an exhibition'], preferredLocations: ['gallery lane', 'urban evening street', 'design district'],
    allowedSections: ['seoul-editorial', 'city-discovery', 'exhibition-editorial'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-j-city-noir-identity-anchor-v2-2'], referenceAssetIds: ['model-j-source-reference-v2-2'], productionAssetIds: ['domestic-seoul-model-j-city-noir-v2', 'monthly-2026-08-model-j-blue-hour-v1', 'monthly-model-edit-2026-08-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    replacementRecord: 'New v2.2 J; supersedes and invalidates every previous J identity.',
    notes: 'Keep the heart-shaped face, sleek black hair and urban restraint distinct from every prior J.',
  },
  {
    id: 'WAK-MODEL-K', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Creative Navigator', adultAgeRange: 'late twenties',
    visualRole: { KO: '학습·성장·체류 일정 설계', EN: 'Learning, growth and stay planning', JP: '学び・成長・滞在プラン' },
    identityDescriptor: 'fictional adult East Asian woman, age twenty-nine, calm almond-shaped brown eyes, long chestnut-brown hair, composed approachable expression, practical contemporary work-travel styling',
    faceKeywords: ['adult', 'calm almond eyes', 'approachable'], hairKeywords: ['long', 'chestnut brown', 'natural'], moodKeywords: ['curious', 'organized', 'grounded'],
    wardrobePalette: ['ink navy', 'soft blue', 'ivory', 'stone'], preferredActions: ['organizing travel notes', 'planning a work-and-stay rhythm', 'packing a practical weekender'], preferredLocations: ['design library', 'coastal shared workspace', 'quiet learning lounge'],
    allowedSections: ['learn-editorial', 'programs-editorial', 'growth-learning'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-k-creative-navigator-identity-reference-v1'], referenceAssetIds: ['model-10-gemini-travel-lounge-reference-2026-08-05'],
    productionAssetIds: ['learn-model-k-creative-focus-desktop-v1', 'learn-model-k-creative-focus-mobile-v1', 'programs-model-k-stay-planning-desktop-v1', 'programs-model-k-stay-planning-mobile-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'The supplied Model 10 pack remains reference-only. Publish only modest, action-led derivatives with clear editorial-image disclosure.',
  },
]

export function getBrandModel(id: BrandModelId): BrandModelProfile {
  const model = BRAND_MODELS.find((item) => item.id === id)
  if (!model) throw new Error(`Unknown brand model: ${id}`)
  return model
}
