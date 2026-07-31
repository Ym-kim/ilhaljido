import type { Lang } from '@/lib/i18n/types'
import type { BrandModelId } from '@/lib/media/brandModels'

export type MediaFocalPoint = { x: number; y: number }

export type MediaAsset = {
  id: string
  src: string
  alt: Record<Lang, string>
  sourceType: 'owned' | 'licensed' | 'generated' | 'partner'
  usage: 'hero' | 'editorial' | 'destination' | 'product' | 'story' | 'social'
  illustrative: boolean
  width?: number
  height?: number
  modelId?: BrandModelId
  localeUsage?: Array<'ko' | 'en' | 'ja'>
  focalPoint?: MediaFocalPoint
  focalPoints?: {
    desktop?: MediaFocalPoint
    mobile?: MediaFocalPoint
  }
  source?: string
  license?: string
  createdAt?: string
  restriction?: Record<Lang, string>
}

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'home-workation-editorial-v1-legacy',
    src: '/campaign/home-workation-editorial-v1.webp',
    alt: {
      KO: '해안에서의 체류와 업무 전환을 표현한 Wakation 브랜드 편집 이미지',
      EN: 'Wakation brand editorial image about moving between coastal time and work',
      JP: '海辺での滞在と仕事の切り替えを表現したWakationのブランド編集画像',
    },
    sourceType: 'generated',
    usage: 'hero',
    illustrative: true,
    width: 1600,
    height: 900,
    localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.62, y: 0.5 },
    source: 'Legacy Wakation generated editorial asset; original production prompt not retained in this branch',
    license: 'Wakation-owned generated editorial asset',
    restriction: {
      KO: '실제 Hosted 참가자·숙소·확정 프로그램 현장으로 표현하지 않는다.',
      EN: 'Do not present as a real Hosted participant, stay or confirmed program location.',
      JP: '実在のHosted参加者・宿泊施設・確定済みプログラムの現場として表現しない。',
    },
  },
  {
    id: 'home-hero-model-a-coastal-work-desktop-v1',
    src: '/media/brand-models/home-hero-model-a-coastal-work-desktop-v1.webp',
    alt: {
      KO: '바다가 보이는 밝은 공간에서 노트북을 닫고 창밖을 보는 여행자',
      EN: 'A traveler closing a laptop and looking outside in a bright coastal setting',
      JP: '海の見える明るい空間でノートパソコンを閉じ、窓の外を見る旅行者',
    },
    sourceType: 'generated',
    usage: 'hero',
    illustrative: true,
    width: 1536,
    height: 1024,
    modelId: 'WAK-MODEL-A',
    localeUsage: ['ko', 'en', 'ja'],
    focalPoints: { desktop: { x: 0.7, y: 0.48 }, mobile: { x: 0.68, y: 0.47 } },
    source: 'OpenAI image generation using user-provided WAK-MODEL-A identity references',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: {
      KO: '특정 카페·호텔 또는 실제 Wakation 참가자 장면으로 단정하지 않는다.',
      EN: 'Do not identify this as a specific café, hotel or real Wakation participant scene.',
      JP: '特定のカフェ・ホテル、または実際のWakation参加者の場面として扱わない。',
    },
  },
  {
    id: 'home-hero-model-a-coastal-work-mobile-v1',
    src: '/media/brand-models/home-hero-model-a-coastal-work-mobile-v1.webp',
    alt: {
      KO: '바다가 보이는 밝은 공간에서 노트북을 정리하는 여행자',
      EN: 'A traveler packing up a laptop in a bright coastal setting',
      JP: '海の見える明るい空間でノートパソコンを片づける旅行者',
    },
    sourceType: 'generated',
    usage: 'hero',
    illustrative: true,
    width: 960,
    height: 1280,
    modelId: 'WAK-MODEL-A',
    localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.68, y: 0.47 },
    source: 'OpenAI image generation using user-provided WAK-MODEL-A identity references',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: {
      KO: '특정 카페·호텔 또는 실제 Wakation 참가자 장면으로 단정하지 않는다.',
      EN: 'Do not identify this as a specific café, hotel or real Wakation participant scene.',
      JP: '特定のカフェ・ホテル、または実際のWakation参加者の場面として扱わない。',
    },
  },
  {
    id: 'domestic-seoul-model-d-urban-work-v1',
    src: '/media/brand-models/domestic-seoul-model-d-urban-work-v1.webp',
    alt: {
      KO: '서울을 연상시키는 도시형 카페 공간에서 노트를 정리하는 여행자',
      EN: 'A traveler taking notes in a Seoul-inspired urban café setting',
      JP: 'ソウルをイメージした都会的なカフェ空間でノートを書く旅行者',
    },
    sourceType: 'generated', usage: 'editorial', illustrative: true,
    width: 1200, height: 900, modelId: 'WAK-MODEL-D', localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.68, y: 0.48 },
    source: 'OpenAI image generation using user-provided WAK-MODEL-D identity reference',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: { KO: '실제 서울 매장이나 참가자 사진이 아니다.', EN: 'Not a real Seoul venue or participant photograph.', JP: '実在のソウルの店舗や参加者の写真ではない。' },
  },
  {
    id: 'domestic-busan-model-c-coastal-transition-v1',
    src: '/media/brand-models/domestic-busan-model-c-coastal-transition-v1.webp',
    alt: {
      KO: '부산을 연상시키는 해안 공간에서 가방을 들고 산책을 시작하는 여행자',
      EN: 'A traveler beginning a walk in a Busan-inspired coastal setting',
      JP: '釜山をイメージした海辺の空間で散歩を始める旅行者',
    },
    sourceType: 'generated', usage: 'editorial', illustrative: true,
    width: 1200, height: 900, modelId: 'WAK-MODEL-C', localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.58, y: 0.48 },
    source: 'OpenAI image generation using user-provided WAK-MODEL-C identity reference',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: { KO: '실제 부산 카페·해변 또는 참가자 사진이 아니다.', EN: 'Not a real Busan café, beach or participant photograph.', JP: '実在の釜山のカフェ・海辺、または参加者の写真ではない。' },
  },
  {
    id: 'domestic-jeju-model-a-slow-stay-v1',
    src: '/media/brand-models/domestic-jeju-model-a-slow-stay-v1.webp',
    alt: {
      KO: '제주를 연상시키는 돌담과 억새 풍경 앞에서 노트를 펼친 여행자',
      EN: 'A traveler with a notebook beside stone walls and grass in a Jeju-inspired setting',
      JP: '済州をイメージした石垣とススキの風景でノートを開く旅行者',
    },
    sourceType: 'generated', usage: 'editorial', illustrative: true,
    width: 1200, height: 900, modelId: 'WAK-MODEL-A', localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.72, y: 0.5 },
    source: 'OpenAI image generation using user-provided WAK-MODEL-A identity references',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: { KO: '실제 제주 숙소·프로그램 또는 참가자 사진이 아니다.', EN: 'Not a real Jeju stay, program or participant photograph.', JP: '実在の済州の宿・プログラム、または参加者の写真ではない。' },
  },
  {
    id: 'trip-match-model-d-city-departure-v1',
    src: '/media/brand-models/trip-match-model-d-city-departure-v1.webp',
    alt: {
      KO: '도시 이동을 앞두고 라운지에서 노트북을 닫는 여행자',
      EN: 'A traveler closing a laptop in a city departure lounge',
      JP: '街への出発前にラウンジでノートパソコンを閉じる旅行者',
    },
    sourceType: 'generated', usage: 'hero', illustrative: true,
    width: 1536, height: 1024, modelId: 'WAK-MODEL-D', localeUsage: ['ko', 'en', 'ja'],
    focalPoint: { x: 0.72, y: 0.48 },
    source: 'OpenAI image generation using user-provided WAK-MODEL-D identity reference',
    license: 'User-controlled generated brand editorial asset; commercial review completed for this use',
    createdAt: '2026-07-31',
    restriction: { KO: '실제 역·교통사 또는 참가자 사진이 아니다.', EN: 'Not a real station, transport provider or participant photograph.', JP: '実在の駅・交通事業者、または参加者の写真ではない。' },
  },
  {
    id: 'activity-seoul-baseball-editorial-v2',
    src: '/covers/activity-seoul-baseball-editorial-v2.webp',
    alt: {
      KO: '인물과 구단 표식 없이 조명이 켜진 야간 야구장의 편집 이미지',
      EN: 'Editorial image of an illuminated empty baseball stadium without people or team marks',
      JP: '人物や球団の表示がない、照明の灯る無人の野球場を描いた編集イメージ',
    },
    sourceType: 'generated',
    usage: 'editorial',
    illustrative: true,
    focalPoint: { x: 0.58, y: 0.56 },
    source: 'OpenAI image generation; Wakation editorial direction',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-07-31',
  },
  {
    id: 'itoshima-coast-editorial-v1',
    src: '/campaign/itoshima-coast-editorial-v1.webp',
    alt: {
      KO: '바다를 바라보며 카메라를 든 여행자의 이토시마 분위기 편집 이미지',
      EN: 'Editorial image of a traveler with a camera overlooking a coast inspired by Itoshima',
      JP: '海を眺めながらカメラを持つ旅人を描いた、糸島をイメージした編集写真',
    },
    sourceType: 'generated',
    usage: 'editorial',
    illustrative: true,
    focalPoint: { x: 0.68, y: 0.5 },
    source: 'OpenAI image generation; Wakation editorial direction',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-07-30',
  },
  {
    id: 'programs-editorial-coastal-work-v1',
    src: '/campaign/programs-editorial-coastal-work-v1.webp',
    alt: {
      KO: '바다를 바라보며 다음 일정을 정리하는 여행자의 편집 이미지',
      EN: 'Editorial image of a traveler planning the next day by the sea',
      JP: '海を眺めながら翌日の予定を整える旅人のイメージ写真',
    },
    sourceType: 'generated',
    usage: 'hero',
    illustrative: true,
    focalPoint: { x: 0.62, y: 0.48 },
    source: 'OpenAI image generation; Wakation art direction prompt archived in docs/ui-polish-audit-2026-07-30.md',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-tokyo-editorial-v1',
    src: '/media/destinations/tokyo-editorial-v1.webp',
    alt: { KO: '비 내린 도쿄 도심의 네온 거리', EN: 'A neon-lit Tokyo street after rain', JP: '雨上がりの東京、ネオンが映る街並み' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.52 },
    source: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-osaka-editorial-v1',
    src: '/media/destinations/osaka-editorial-v1.webp',
    alt: { KO: '쓰텐카쿠가 보이는 오사카 신세카이 거리', EN: 'Shinsekai street in Osaka with Tsutenkaku tower', JP: '通天閣を望む大阪・新世界の街並み' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.44 },
    source: 'https://unsplash.com/photos/uBfK5i6j1B8',
    license: 'Unsplash License — photo by Nomadic Julien',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-fukuoka-editorial-v1',
    src: '/media/destinations/fukuoka-editorial-v1.webp',
    alt: { KO: '호수와 도심이 이어지는 후쿠오카의 한낮 풍경', EN: 'A lakeside view framed by Fukuoka city', JP: '湖と街が穏やかにつながる福岡の風景' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.66 },
    source: 'https://unsplash.com/photos/OxkZ2A9KoT0',
    license: 'Unsplash License — photo by Aibolat Askhar',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-bali-editorial-v1',
    src: '/media/destinations/bali-editorial-v1.webp',
    alt: { KO: '물가에 자리한 발리의 전통 사원', EN: 'A traditional Balinese temple beside the water', JP: '水辺にたたずむバリの伝統寺院' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.46 },
    source: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-danang-editorial-v1',
    src: '/media/destinations/danang-editorial-v1.webp',
    alt: { KO: '산 위를 가로지르는 다낭 골든브리지', EN: 'The Golden Bridge crossing the mountains near Da Nang', JP: 'ダナン近郊の山上に架かるゴールデンブリッジ' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.52, y: 0.5 },
    source: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-chiangmai-editorial-v1',
    src: '/media/destinations/chiangmai-editorial-v1.webp',
    alt: { KO: '초록 정원에 둘러싸인 치앙마이의 사원', EN: 'A Chiang Mai temple surrounded by a green courtyard', JP: '緑豊かな庭に囲まれたチェンマイの寺院' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.59, y: 0.5 },
    source: 'https://unsplash.com/photos/F07KhNovxRk',
    license: 'Unsplash License — photo by Peter Borter',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-cebu-editorial-v1',
    src: '/media/destinations/cebu-editorial-v1.webp',
    alt: { KO: '불빛이 켜진 세부 시티의 야경', EN: 'The illuminated skyline of Cebu City at night', JP: '明かりが灯るセブシティの夜景' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.53, y: 0.48 },
    source: 'https://unsplash.com/photos/ply-6rPZKSA',
    license: 'Unsplash License — photo by Zany Jadraque',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-sydney-editorial-v1',
    src: '/media/destinations/sydney-editorial-v1.webp',
    alt: { KO: '오페라하우스와 도심이 펼쳐진 시드니 항구', EN: 'Sydney Harbour with the Opera House and city skyline', JP: 'オペラハウスと街並みを望むシドニー湾' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.43, y: 0.5 },
    source: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-jeju-editorial-v1',
    src: '/media/destinations/jeju-editorial-v1.webp',
    alt: { KO: '제주 바다 건너 산방산과 한라산이 이어지는 풍경', EN: 'Jeju coast with Sanbangsan and Hallasan beyond the sea', JP: '海の向こうに山房山と漢拏山を望む済州の風景' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.52 },
    source: 'https://unsplash.com/photos/EQ-QSQp283M',
    license: 'Unsplash License — photo by Lux Park',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-seoul-editorial-v1',
    src: '/media/destinations/seoul-editorial-v1.webp',
    alt: { KO: '불빛과 한글 간판이 이어진 서울의 저녁 골목', EN: 'A Seoul evening street lined with lights and Hangul signs', JP: '灯りとハングルの看板が連なるソウルの夕暮れの路地' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.5, y: 0.54 },
    source: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
  {
    id: 'destination-busan-editorial-v1',
    src: '/media/destinations/busan-editorial-v1.webp',
    alt: { KO: '해운대 해변과 마린시티가 함께 보이는 부산 풍경', EN: 'Busan view across Haeundae Beach and Marine City', JP: '海雲台ビーチとマリンシティを望む釜山の風景' },
    sourceType: 'licensed',
    usage: 'destination',
    illustrative: false,
    focalPoint: { x: 0.47, y: 0.5 },
    source: 'https://images.unsplash.com/photo-1638591751482-1a7d27fcea15',
    license: 'Unsplash License',
    createdAt: '2026-07-30',
  },
]

export function getMediaAsset(id: string): MediaAsset | undefined {
  return MEDIA_ASSETS.find((asset) => asset.id === id)
}

export function getMediaAssetBySrc(src: string): MediaAsset | undefined {
  return MEDIA_ASSETS.find((asset) => asset.src === src)
}
