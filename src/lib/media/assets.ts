import type { Lang } from '@/lib/i18n/types'

export type MediaAsset = {
  id: string
  src: string
  alt: Record<Lang, string>
  sourceType: 'owned' | 'licensed' | 'generated' | 'partner'
  usage: 'hero' | 'editorial' | 'destination' | 'product' | 'story' | 'social'
  illustrative: boolean
  focalPoint?: { x: number; y: number }
  source?: string
  license?: string
  createdAt?: string
}

export const MEDIA_ASSETS: MediaAsset[] = [
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
