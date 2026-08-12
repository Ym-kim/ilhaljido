import type { Lang } from '@/lib/i18n/types'

export const BRAND_MODEL_ROSTER_VERSION = '2.2' as const

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

export type BrandModelStylingRule = {
  styleDirection: string
  summerWardrobe: string[]
  seasonalFit: string[]
  activityMood: string[]
  hairVariation: string[]
  realismLevel: 'high_photoreal_editorial'
  photorealReferenceUsed: true
}

// Global casting and styling defaults for every new derivative. “Attractive”
// means healthy, expressive and editorially polished. A subtly brighter skin
// grade and softly enhanced silhouette are welcome when they stay coherent
// with the model's identity, natural anatomy, scene lighting and travel context.
export const BRAND_MODEL_APPEAL_POLICY = {
  adultCastingOnly: true,
  appearanceGoal: 'aspirational, photogenic and recognizably human',
  skinRendering: 'naturally_bright_luminous',
  bodyDirection: 'realistic_attractive_volume',
  appearanceEnhancement: 'subtle_editorial_polish',
  bodyProportion: 'balanced_seven_to_eight_head_editorial',
  legLine: 'naturally_lengthened_balanced',
  physiqueDirection: 'healthy_toned_natural',
  beautyCharacter: 'model_specific_beautiful_refined_cute_mix',
  wardrobeDirection: 'context_led_wardrobe',
  environmentDirection: 'environment_palette_rotation',
  feminineStyleRotation: 'contextual_mini_skirt_skorts_short_shorts_and_fitted_dresses',
  rules: [
    'Cast clearly adult models with expressive eyes, distinctive facial character and natural camera presence.',
    'Render clear, softly bright and luminous skin while preserving pores, texture, undertone and the model identity; gentle editorial brightening must remain believable under the scene light.',
    'Keep realistic anatomy while adding understated, attractive body volume and dimensionality through posture, proportion, tailoring and fabric drape; the whole silhouette matters more than one emphasized body part.',
    'Aim for a believable seven-to-eight-head editorial balance through camera distance, upright posture and garment proportion so the legs do not read short; never stretch the body, shrink the head or overwrite identity.',
    'Keep the whole physique healthy and gently toned without extreme thinness or exaggerated muscularity.',
    'Give each model a different balance of beauty, refinement and friendly cuteness so the roster does not collapse into one doll-like face or styling formula.',
    'Choose season-, place- and activity-appropriate fashion that flatters the individual model and rotates dresses, skirts, shorts, layered sets and trousers.',
    'Include feminine options such as tailored mini skirts, skorts, polished short shorts and fitted dresses when the climate, movement and local context make them credible; rotate hemlines and coverage instead of repeating one formula.',
    'Use fit, waist definition, proportion and fabric movement to create an attractive feminine silhouette without making body exposure the default or treating the model body as the product.',
    'Align gaze, hands and body weight with one clear action so the scene reads as a candid travel moment rather than a fashion pose.',
    'Rotate background brightness, color temperature, materials and cultural atmosphere alongside the model; wardrobe color alone is not visual diversity.',
    'Preserve enough headroom and action context for responsive crops, with the head, face and active hands kept visible.',
    'Generated models remain illustrative and must never imply a real customer, participant, hotel, product or program outcome.',
  ],
  avoid: [
    'chalky, mask-like or identity-changing whitening',
    'explicit or isolated sexualized body emphasis',
    'climate-inappropriate bare-leg styling selected only for sex appeal',
    'distorted anatomy, stretched limbs, tiny heads or extreme proportions',
    'generic influencer pose',
    'off-screen gaze unrelated to the action',
    'repeated beige or dark-amber environments',
  ],
} as const

// Generation defaults for every new model derivative. These rules complement
// identity fields above: face continuity never implies repeating one outfit,
// hairstyle, pose or mood across adjacent routes.
export const BRAND_MODEL_STYLING_RULES: Record<BrandModelId, BrandModelStylingRule> = {
  'WAK-MODEL-A': { styleDirection: 'airy coastal slow-stay', summerWardrobe: ['linen shirt dress', 'sleeveless knit with relaxed shirt', 'travel sandals'], seasonalFit: ['bright coastal summer', 'breezy early autumn'], activityMood: ['packing up', 'walking toward the coast', 'quiet reset'], hairVariation: ['soft waves', 'low bun', 'wind-moved half-up hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-B': { styleDirection: 'bright urban café and social discovery', summerWardrobe: ['light blouse with denim', 'shirt with tailored shorts', 'minimal city sneakers'], seasonalFit: ['warm city summer', 'humid urban summer'], activityMood: ['walking with iced coffee', 'checking a route', 'talking with a friend'], hairVariation: ['natural C-curl', 'ponytail', 'medium layered hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-C': { styleDirection: 'quiet premium lounge and business stay', summerWardrobe: ['lightweight linen set', 'cap-sleeve knit with fluid skirt', 'refined loafers'], seasonalFit: ['air-conditioned summer lounge', 'breezy early autumn'], activityMood: ['reviewing a shared plan', 'moving after check-in', 'calm conversation'], hairVariation: ['polished low bun', 'soft waves', 'sleek half-up hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-D': { styleDirection: 'fashion-aware exhibition, Tokyo evening and clear winter harbour', summerWardrobe: ['sleeveless fine-knit with pleated midi skirt', 'fitted short-sleeve knit with a tailored mini skirt', 'polished short shorts with a lightweight jacket', 'minimal city dress', 'flat travel sandals'], seasonalFit: ['luminous city summer', 'blue-hour early autumn', 'clear mild Southern Hemisphere winter midday'], activityMood: ['walking through an exhibition', 'choosing an itinerary', 'leaving for the evening', 'descending harbour steps with a light jacket'], hairVariation: ['soft low ponytail', 'side-parted waves', 'sleek low bun', 'wind-moved straight hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-E': { styleDirection: 'confident polished city travel with a cute-friendly edge', summerWardrobe: ['structured sleeveless top with tailored skort', 'relaxed shirt with tailored shorts', 'walking sandals'], seasonalFit: ['humid coastal summer', 'warm dry-season city', 'clear late summer'], activityMood: ['stepping from local transport', 'laughing in transit', 'carrying a weekender'], hairVariation: ['high ponytail', 'wind-moved layers', 'low bun'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-F': { styleDirection: 'warm city daylight, tactile learning and bright island preparation', summerWardrobe: ['rolled-sleeve linen blouse', 'feminine top with denim', 'sleeveless camp shirt with A-line midi skirt', 'soft city flats or flat travel sandals'], seasonalFit: ['warm city summer', 'golden-hour late summer', 'bright tropical dry-season afternoon'], activityMood: ['browsing a market', 'walking to a café', 'meeting a friend', 'fastening a dry bag before a waterside afternoon'], hairVariation: ['soft C-curl', 'half-up hair', 'loose low ponytail', 'loose low braid'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-G': { styleDirection: 'clean romantic island and slow travel', summerWardrobe: ['light summer dress', 'sleeveless knit with long skirt', 'woven travel sandals'], seasonalFit: ['breezy island summer', 'soft early autumn'], activityMood: ['writing outdoors', 'walking beside a stone wall', 'pausing in the breeze'], hairVariation: ['natural waves', 'low braid', 'wind-moved half-up hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-H': { styleDirection: 'friendly local café and beginner trip', summerWardrobe: ['soft-blue linen blouse', 'shirt dress', 'light tote and sneakers'], seasonalFit: ['soft daylight summer', 'mild early autumn'], activityMood: ['planning together', 'pointing to a map', 'smiling in conversation'], hairVariation: ['airy curtain bangs with waves', 'low ponytail', 'casual half-up hair'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-I': { styleDirection: 'modern graceful business travel and social planning', summerWardrobe: ['ivory cap-sleeve knit', 'fluid resort set', 'minimal travel loafers'], seasonalFit: ['refined indoor summer', 'coastal late summer'], activityMood: ['collaborating at a table', 'preparing to depart', 'walking through a design district'], hairVariation: ['chestnut waves', 'polished low ponytail', 'side-parted low bun'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
  'WAK-MODEL-J': { styleDirection: 'sharp city night and Seoul discovery', summerWardrobe: ['white short-sleeve blouse', 'minimal summer dress', 'charcoal skirt with light scarf'], seasonalFit: ['urban summer evening', 'blue-hour early autumn'], activityMood: ['walking after work', 'leaving an exhibition', 'crossing a lively street'], hairVariation: ['sleek straight hair', 'low ponytail', 'tucked-behind-ear bob effect'], realismLevel: 'high_photoreal_editorial', photorealReferenceUsed: true },
}

export type ModelVisualDirectionRule = {
  signatureSilhouettes: string[]
  poseFamilies: string[]
  cameraFamilies: string[]
  colorStories: string[]
  avoidRepeating: string[]
}

// Identity continuity is only one layer of art direction. Every new production
// prompt must also choose a silhouette, pose, camera family and color story that
// differs from the adjacent major surface. These options intentionally include
// dresses, skirts, shorts and tactile actions so "woman with paper/laptop" can
// never become Wakation's default visual shorthand again.
export const BRAND_MODEL_VISUAL_DIRECTIONS: Record<BrandModelId, ModelVisualDirectionRule> = {
  'WAK-MODEL-A': { signatureSilhouettes: ['draped coastal dress', 'layered travel set', 'asymmetrical wrap dress'], poseFamilies: ['turning from a balcony', 'kneeling beside luggage', 'reaching through a record rack', 'walking a bicycle'], cameraFamilies: ['back-view environmental wide', 'side-on low wide', 'through-rack low diagonal', 'slightly elevated curved-lane wide'], colorStories: ['ocean-blue and citrus', 'ivory and sea-glass', 'indigo, vermilion and chrome', 'hibiscus, banana green, cobalt and wet stone'], avoidRepeating: ['seated laptop', 'neutral linen portrait', 'bicycle on a wet tropical road', 'magenta wrap dress'] },
  'WAK-MODEL-B': { signatureSilhouettes: ['tailored Bermuda shorts', 'sporty shirt dress', 'graphic A-line midi skirt'], poseFamilies: ['descending steps', 'reaching into transit storage', 'two-hand record inspection'], cameraFamilies: ['low-angle motion', 'architectural wide', 'eye-level shop aisle'], colorStories: ['cobalt, coral and teal', 'lime and navy', 'mint, vermilion, saffron and cobalt'], avoidRepeating: ['desk writing', 'map reading', 'looking away from the active object'] },
  'WAK-MODEL-C': { signatureSilhouettes: ['bias midi skirt', 'sculptural culotte set'], poseFamilies: ['floor packing', 'standing presentation'], cameraFamilies: ['overhead diagonal', 'waist-height layered'], colorStories: ['raspberry and cobalt', 'ink and chartreuse'], avoidRepeating: ['white blouse portrait', 'paper folio close-up'] },
  'WAK-MODEL-D': { signatureSilhouettes: ['sleeveless shirt dress', 'graphic pleated skirt', 'fitted knit and tailored mini skirt', 'polished short shorts with a lightweight layer'], poseFamilies: ['crouched luggage prep', 'turning through an installation', 'diagonal stair descent with jacket carry'], cameraFamilies: ['low wide departure', 'immersive off-axis', 'low three-quarter clear-harbour wide'], colorStories: ['tomato, teal and sky blue', 'ultraviolet and silver', 'clear blue, sandstone, cobalt, saffron and oxblood'], avoidRepeating: ['standing itinerary choice', 'taupe lounge scene', 'bright sandstone harbour steps', 'stair-descent pose'] },
  'WAK-MODEL-E': { signatureSilhouettes: ['pleated midi skirt', 'tailored shorts', 'tailored summer skort set'], poseFamilies: ['seated scarf tie', 'laughing mid-transit', 'shared-ride step-down'], cameraFamilies: ['low side wide', 'long-lens candid', 'low three-quarter transit-side wide'], colorStories: ['cobalt, coral and yellow', 'mint and vermilion', 'vermilion, jade, turquoise and saffron'], avoidRepeating: ['straight promenade walk', 'beige trousers', 'red shared vehicle', 'transport step-down action', 'deep-jade skort'] },
  'WAK-MODEL-F': { signatureSilhouettes: ['creative midi dress and apron', 'printed wrap skirt', 'sunlit A-line midi skirt'], poseFamilies: ['hands-on craft', 'leaning into a food stall', 'harbor-step dry-bag fastening'], cameraFamilies: ['tactile side view', 'counter-height candid', 'waist-height off-axis harbor wide'], colorStories: ['violet and ultramarine', 'terracotta and jade', 'mango, cobalt, coral and turquoise'], avoidRepeating: ['map at table', 'beige linen shirt', 'dry-bag fastening at a tropical harbor', 'mango A-line skirt'] },
  'WAK-MODEL-G': { signatureSilhouettes: ['A-line midi skirt', 'flowing island dress'], poseFamilies: ['seated camera pause', 'wind-turn on a coastal path'], cameraFamilies: ['environmental wide', 'rear three-quarter'], colorStories: ['marigold, navy and turquoise', 'lavender and moss'], avoidRepeating: ['straight walking pose', 'dark denim trousers'] },
  'WAK-MODEL-H': { signatureSilhouettes: ['belted shirt dress', 'cropped top with full skirt'], poseFamilies: ['crouching to browse', 'reaching across a shared display'], cameraFamilies: ['vendor-eye medium wide', 'high-angle social'], colorStories: ['sunflower, cobalt and red', 'aqua and tangerine'], avoidRepeating: ['pointing at map', 'soft-blue blouse portrait'] },
  'WAK-MODEL-I': { signatureSilhouettes: ['jewel-tone belted dress', 'fluid resort set'], poseFamilies: ['seated reading', 'moving through a team session'], cameraFamilies: ['elevated layered view', 'architectural profile'], colorStories: ['emerald and burgundy', 'plum and warm silver'], avoidRepeating: ['walking with laptop sleeve', 'ivory knit portrait'] },
  'WAK-MODEL-J': { signatureSilhouettes: ['graphic monochrome skirt', 'minimal city dress'], poseFamilies: ['crossing through light', 'perching after an exhibition'], cameraFamilies: ['compressed night street', 'asymmetric gallery wide'], colorStories: ['charcoal and electric blue', 'cream and acid green'], avoidRepeating: ['generic straight walk', 'white blouse with map'] },
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
    wardrobePalette: ['ocean blue', 'ivory', 'sand', 'indigo', 'vermilion', 'hibiscus magenta', 'cobalt', 'banana green'], preferredActions: ['closing a laptop', 'packing a weekender', 'looking toward the coast', 'walking a bicycle after work'], preferredLocations: ['coastal work lounge', 'island stay', 'quiet terrace', 'Bali-inspired tropical lane'],
    allowedSections: ['home-hero', 'coastal-editorial', 'slow-stay', 'bali-guide-lookbook', 'yeosu-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-a-coastal-calm-identity-anchor'], referenceAssetIds: ['model-a-source-reference'],
    productionAssetIds: ['home-hero-model-a-coastal-departure-desktop-v3', 'home-hero-model-a-coastal-departure-mobile-v3', 'home-seasonal-film-2026-08-desktop-v1', 'home-seasonal-film-2026-08-mobile-v1', 'bali-model-a-tropical-cycle-v1', 'yeosu-model-a-harbor-breeze-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Keep as one member of the roster, never the default face across adjacent sections. Do not repeat the Bali bicycle, wet tropical road or magenta wrap-dress direction on the next major surface.',
  },
  {
    id: 'WAK-MODEL-B', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Soft Urban', adultAgeRange: 'late twenties',
    visualRole: { KO: '서울·카페 업무·도시 발견', EN: 'Seoul, café work and urban discovery', JP: 'ソウル・カフェワーク・街の発見' },
    identityDescriptor: 'fictional adult East Asian woman with a soft urban presence and long dark hair',
    faceKeywords: ['soft', 'urban', 'approachable'], hairKeywords: ['long', 'dark', 'natural'], moodKeywords: ['daylight', 'social', 'easy'],
    wardrobePalette: ['stone', 'soft blue', 'charcoal', 'teal', 'vermilion', 'mustard'], preferredActions: ['taking notes', 'walking between cafés', 'checking a route', 'examining a record sleeve'], preferredLocations: ['city café', 'design district', 'local street', 'Tokyo-inspired record shop'],
    allowedSections: ['seoul-editorial', 'social-discovery', 'cafe-work', 'growth-learning', 'programs-hero', 'tokyo-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-b-soft-urban-identity-anchor'], referenceAssetIds: ['model-b-source-reference'], productionAssetIds: ['growth-model-b-urban-learning-desktop-v2', 'growth-model-b-urban-learning-mobile-v2', 'programs-model-b-coastal-arrival-desktop-v3', 'programs-model-b-coastal-arrival-mobile-v2', 'tokyo-model-b-record-shop-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Regenerate environment-led scenes; never publish the source pose or synthetic lettering.',
  },
  {
    id: 'WAK-MODEL-C', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Quiet Premium', adultAgeRange: 'early thirties',
    visualRole: { KO: '라운지·프리미엄 체류·도시 업무', EN: 'Premium lounges, stays and city work', JP: 'ラウンジ・上質な滞在・都市の仕事' },
    identityDescriptor: 'fictional adult East Asian woman with a composed premium presence and polished long dark hair',
    faceKeywords: ['composed', 'polished', 'quiet'], hairKeywords: ['long', 'dark', 'smooth'], moodKeywords: ['premium', 'focused', 'minimal'],
    wardrobePalette: ['ink', 'taupe', 'cream', 'coral', 'jade', 'turquoise'], preferredActions: ['waiting before check-in', 'reviewing a schedule', 'quiet laptop work', 'examining local produce'], preferredLocations: ['hotel lounge', 'business stay', 'museum café', 'tropical market arcade'],
    allowedSections: ['premium-stay-editorial', 'business-travel', 'lounge', 'team-business-editorial', 'select-editorial', 'danang-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-c-quiet-premium-identity-anchor'], referenceAssetIds: ['model-c-source-reference'], productionAssetIds: ['business-model-c-team-planning-desktop-v1', 'business-model-c-team-planning-mobile-v1', 'select-model-c-packing-flatlay-v4', 'business-models-c-h-i-rooftop-session-desktop-v3', 'business-models-c-h-i-rooftop-session-mobile-v3', 'danang-model-c-tropical-market-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Vary wardrobe and camera distance; avoid repeating a white top, fruit-market action, coral dress, jade-coral arcade or beauty-portrait composition.',
  },
  {
    id: 'WAK-MODEL-D', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Refined Editorial', adultAgeRange: 'late twenties to early thirties',
    visualRole: { KO: 'Trip Match·전시·저녁 도시', EN: 'Trip Match, exhibitions and evening cities', JP: 'Trip Match・展示・夜の街' },
    identityDescriptor: 'fictional adult East Asian woman with a reflective editorial presence and long dark hair',
    faceKeywords: ['refined', 'reflective', 'editorial'], hairKeywords: ['long', 'dark', 'soft'], moodKeywords: ['decisive', 'city', 'cinematic'],
    wardrobePalette: ['taupe', 'muted blue', 'charcoal', 'deep cobalt', 'ivory', 'saffron', 'oxblood'], preferredActions: ['choosing an itinerary', 'closing a laptop', 'leaving an exhibition', 'descending steps with a light jacket'], preferredLocations: ['departure lounge', 'gallery district', 'evening city', 'clear winter harbour steps'],
    allowedSections: ['trip-match', 'exhibition-editorial', 'city-departure', 'sydney-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-d-refined-editorial-identity-anchor'], referenceAssetIds: ['model-d-source-reference'],
    productionAssetIds: ['trip-match-model-d-itinerary-choice-v3', 'trip-match-model-d-ribbon-choice-v4', 'experience-tokyo-model-d-immersive-gallery-v2', 'sydney-model-d-clear-winter-skirt-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Prioritize choice, movement and place rather than a close beauty composition. Preserve the natural seven-to-eight-head editorial balance and rotate tailored mini skirts, polished short shorts, dresses and longer layers by climate. Do not repeat the Sydney fitted-knit mini-skirt stair-descent direction on the next major surface.',
  },
  {
    id: 'WAK-MODEL-E', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'City Chic', adultAgeRange: 'late twenties',
    visualRole: { KO: '부산·해안 도시·짧은 여행', EN: 'Busan, coastal cities and short breaks', JP: '釜山・海辺の街・短い旅' },
    identityDescriptor: 'fictional adult East Asian woman with a confident city presence and long dark hair',
    faceKeywords: ['confident', 'defined', 'modern', 'cute-friendly polish'], hairKeywords: ['long', 'dark', 'sleek'], moodKeywords: ['coastal city', 'fresh', 'active', 'playful city arrival'],
    wardrobePalette: ['navy', 'muted coral', 'beige', 'deep jade', 'vermilion', 'turquoise'], preferredActions: ['starting a coastal walk', 'adjusting a travel bag', 'moving between city and sea', 'stepping down from local transport'], preferredLocations: ['coastal promenade', 'harbor district', 'short city break', 'Chiang Mai-inspired leafy street'],
    allowedSections: ['busan-editorial', 'select-editorial', 'short-break', 'busan-guide-lookbook', 'chiangmai-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-e-city-chic-identity-anchor'], referenceAssetIds: ['model-e-source-reference'], productionAssetIds: ['domestic-busan-model-e-coastal-city-v2', 'monthly-2026-08-model-e-city-arrival-v2', 'monthly-model-edit-2026-08-v2', 'busan-model-e-after-work-coast-v1', 'busan-model-e-harbor-steps-skirt-v2', 'chiangmai-model-e-red-ride-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Restyle into practical travel clothing and show movement rather than a fashion pose. Keep her naturally balanced seven-to-eight-head editorial proportion, healthy toned silhouette and confident beauty with a slightly cute-friendly edge.',
  },
  {
    id: 'WAK-MODEL-F', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Warm Modern', adultAgeRange: 'late twenties',
    visualRole: { KO: '후쿠오카·오사카·따뜻한 낮', EN: 'Fukuoka, Osaka and warm daylight', JP: '福岡・大阪・あたたかな昼' },
    identityDescriptor: 'fictional adult East Asian woman with warm brown hair and a modern feminine presence',
    faceKeywords: ['warm', 'modern', 'open'], hairKeywords: ['brown', 'long', 'soft wave'], moodKeywords: ['daylight', 'city food', 'social'],
    wardrobePalette: ['camel', 'cream', 'terracotta', 'mango yellow', 'cobalt', 'coral'], preferredActions: ['walking to a café', 'browsing a market', 'meeting a friend', 'fastening a dry bag before an island afternoon'], preferredLocations: ['Fukuoka-inspired street', 'Osaka-inspired café', 'market lane', 'Cebu-inspired unnamed tropical harbor'],
    allowedSections: ['japan-campaign', 'food-editorial', 'social-editorial', 'growth-learning', 'cebu-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-f-warm-modern-identity-anchor'], referenceAssetIds: ['model-f-source-reference'], productionAssetIds: ['campaign-model-f-japan-choice-desktop-v2', 'campaign-model-f-japan-choice-mobile-v2', 'late-summer-model-f-market-v1', 'home-seasonal-film-2026-08-desktop-v1', 'home-seasonal-film-2026-08-mobile-v1', 'growth-model-f-pottery-learning-desktop-v3', 'growth-model-f-pottery-learning-mobile-v3', 'cebu-model-f-island-prep-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Use warm hair and natural daylight to diversify the roster without repeating glamour styling. Preserve a naturally balanced seven-to-eight-head editorial proportion, a healthy toned silhouette and her distinct warm, refined, softly cute character through posture, camera distance and garment line rather than anatomical distortion.',
  },
  {
    id: 'WAK-MODEL-G', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Clean Romantic', adultAgeRange: 'late twenties',
    visualRole: { KO: '제주·느린 체류·섬 산책', EN: 'Jeju, slow stays and island walks', JP: '済州・ゆっくり滞在・島の散歩' },
    identityDescriptor: 'fictional adult East Asian woman with a clean gentle presence and long straight dark hair',
    faceKeywords: ['clean', 'gentle', 'focused'], hairKeywords: ['long', 'straight', 'dark'], moodKeywords: ['slow', 'windy', 'quiet'],
    wardrobePalette: ['sage', 'ivory', 'dark denim'], preferredActions: ['writing in a notebook', 'walking by a stone wall', 'pausing in the wind'], preferredLocations: ['island lane', 'coastal field', 'quiet café'],
    allowedSections: ['jeju-editorial', 'domestic-onboarding', 'slow-stay', 'jeju-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-g-clean-romantic-identity-anchor'], referenceAssetIds: ['model-g-source-reference'], productionAssetIds: ['domestic-jeju-model-g-slow-stay-v2', 'monthly-2026-08-model-g-coastal-book-cafe-v2', 'jeju-model-g-after-rain-coast-v1', 'jeju-model-g-summer-camera-skirt-v2'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    notes: 'Create environmental travel poses; the portrait anchor itself is never a publication asset.',
  },
  {
    id: 'WAK-MODEL-H', rosterVersion: BRAND_MODEL_ROSTER_VERSION, nameCode: 'Soft Daylight', adultAgeRange: 'late twenties',
    visualRole: { KO: '로컬 카페·입문 여행·낮의 도시', EN: 'Local cafés, beginner trips and quiet daytime cities', JP: 'ローカルカフェ・旅の入門・昼の街' },
    identityDescriptor: 'fictional adult East Asian woman, late twenties, softly rounded face, gentle dark eyes, airy curtain bangs, long softly waved dark hair, warm approachable smile, understated feminine styling',
    faceKeywords: ['softly rounded', 'gentle dark eyes', 'approachable'], hairKeywords: ['airy curtain bangs', 'long', 'soft dark waves'], moodKeywords: ['soft daylight', 'friendly', 'local'],
    wardrobePalette: ['sand', 'ivory', 'soft blue'], preferredActions: ['planning together', 'pointing to a map', 'organizing a day'], preferredLocations: ['local café', 'coastal shared lounge', 'quiet daytime street'],
    allowedSections: ['hosted-editorial', 'domestic-beginner', 'local-cafe', 'fukuoka-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-h-soft-daylight-identity-anchor-v2-2'], referenceAssetIds: ['model-h-source-reference-v2-2'],
    productionAssetIds: ['hosted-models-h-i-coastal-planning-v3', 'hosted-models-h-i-coastal-planning-mobile-v3', 'monthly-2026-08-model-h-coastal-reset-v1', 'monthly-model-edit-2026-08-v2', 'domestic-busan-model-h-haeundae-v4', 'fukuoka-model-h-cafe-work-v1', 'fukuoka-model-h-market-dress-v2', 'business-models-c-h-i-rooftop-session-desktop-v3', 'business-models-c-h-i-rooftop-session-mobile-v3'],
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
    allowedSections: ['select-editorial', 'hosted-editorial', 'business-travel', 'seoul-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-i-modern-grace-identity-anchor-v2-2'], referenceAssetIds: ['model-i-source-reference-v2-2'],
    productionAssetIds: ['hosted-models-h-i-coastal-planning-v3', 'hosted-models-h-i-coastal-planning-mobile-v3', 'select-model-i-travel-prep-v3', 'seoul-model-i-after-work-design-lane-v2', 'seoul-model-i-design-book-dress-v3', 'business-models-c-h-i-rooftop-session-desktop-v3', 'business-models-c-h-i-rooftop-session-mobile-v3'],
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
    allowedSections: ['seoul-editorial', 'city-discovery', 'exhibition-editorial', 'osaka-guide-lookbook', 'jeonju-guide-lookbook'], restrictedSections: COMMON_RESTRICTED_SECTIONS,
    identityAnchorAssetIds: ['wak-model-j-city-noir-identity-anchor-v2-2'], referenceAssetIds: ['model-j-source-reference-v2-2'], productionAssetIds: ['domestic-seoul-model-j-city-noir-v3', 'monthly-2026-08-model-j-blue-hour-v2', 'monthly-model-edit-2026-08-v2', 'osaka-model-j-after-work-gallery-v1', 'jeonju-model-j-hanok-fan-v1'],
    productionUse: 'generated_derivatives_only', sourceType: 'generated_reference', illustrative: true, directPublish: false,
    replacementRecord: 'New v2.2 J; supersedes and invalidates every previous J identity.',
    notes: 'Keep the heart-shaped face, sleek black hair and urban restraint distinct from every prior J.',
  },
]

export function getBrandModel(id: BrandModelId): BrandModelProfile {
  const model = BRAND_MODELS.find((item) => item.id === id)
  if (!model) throw new Error(`Unknown brand model: ${id}`)
  return model
}
