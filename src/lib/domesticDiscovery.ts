import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>

export type DomesticDiscoveryEntry = {
  id: string
  assetId: string
  image: string
  imagePosition?: string
  name: L
  duration: L
  description: L
  alt: L
  bookingQuery: string
  href: Record<Lang, string>
}

const ENTRIES: DomesticDiscoveryEntry[] = [
  {
    id: 'jeju',
    assetId: 'destination-jeju-editorial-v1',
    image: '/media/destinations/jeju-editorial-v1.webp',
    imagePosition: '50% 52%',
    name: { KO: '제주', EN: 'Jeju', JP: '済州' },
    duration: { KO: '3박 이상', EN: '3+ nights', JP: '3泊以上' },
    description: {
      KO: '바다와 오름 사이에서 일상의 속도를 낮추는 섬 체류',
      EN: 'Slow down between the coast and volcanic landscapes',
      JP: '海とオルムの間で、日常の速度をゆるめる島滞在',
    },
    alt: { KO: '제주 바다와 산방산 풍경', EN: 'Jeju coast and Sanbangsan', JP: '済州の海と山房山の風景' },
    bookingQuery: 'Jeju, South Korea',
    href: { KO: '/guide/jeju', EN: '/en/guide/jeju', JP: '/ja/guide/jeju' },
  },
  {
    id: 'busan',
    assetId: 'destination-busan-editorial-v1',
    image: '/media/destinations/busan-editorial-v1.webp',
    imagePosition: '47% 50%',
    name: { KO: '부산', EN: 'Busan', JP: '釜山' },
    duration: { KO: '주말 2박 3일', EN: 'Weekend · 2 nights', JP: '週末2泊3日' },
    description: {
      KO: '해운대의 바다와 부산역 워케이션 거점을 함께 쓰는 주말',
      EN: 'A weekend linking the coast with a city workation base',
      JP: '海辺と都市のワーク拠点をつなぐ、釜山の週末',
    },
    alt: { KO: '해운대 해변과 마린시티가 보이는 부산', EN: 'Haeundae Beach and Marine City in Busan', JP: '海雲台ビーチとマリンシティを望む釜山' },
    bookingQuery: 'Busan, South Korea',
    href: { KO: '/collections/busan-weekend', EN: '/en/collections/busan-weekend', JP: '/ja/collections/busan-weekend' },
  },
  {
    id: 'gangneung',
    assetId: 'destination-gangneung-anmok-licensed-v1',
    image: '/media/destinations/gangneung-anmok-licensed-v1.webp',
    imagePosition: '64% 56%',
    name: { KO: '강릉', EN: 'Gangneung', JP: '江陵' },
    duration: { KO: '2박 3일', EN: '2–3 nights', JP: '2〜3泊' },
    description: {
      KO: '안목의 바다와 카페, 동해안 업무 시간을 한 동선에',
      EN: 'Build work hours around Anmok Beach and the east coast',
      JP: '安木の海とカフェ、東海岸での仕事時間をひとつの動線に',
    },
    alt: { KO: '강릉 안목해변의 모래사장과 안전초소', EN: 'Anmok Beach and lifeguard tower in Gangneung', JP: '江陵・安木海岸の砂浜と監視塔' },
    bookingQuery: 'Gangneung, South Korea',
    href: { KO: '/programs/support/gangwon-workation', EN: '/en/programs/support/gangwon-workation', JP: '/ja/programs/support/gangwon-workation' },
  },
  {
    id: 'yeosu',
    assetId: 'program-yeosu-harbor-licensed-v1',
    image: '/media/product-editorial/program-yeosu-harbor-licensed-v1.webp',
    imagePosition: '50% 54%',
    name: { KO: '여수', EN: 'Yeosu', JP: '麗水' },
    duration: { KO: '2박 3일', EN: '2–3 nights', JP: '2〜3泊' },
    description: {
      KO: '낮에는 항구 가까이서 일하고 저녁에는 밤바다를 걷는 체류',
      EN: 'Work by the harbor, then walk the night waterfront',
      JP: '昼は港の近くで働き、夜は海辺を歩く滞在',
    },
    alt: { KO: '바다와 섬이 내려다보이는 여수 해안', EN: 'The Yeosu coast overlooking the sea and islands', JP: '海と島を見渡す麗水の海岸' },
    bookingQuery: 'Yeosu, South Korea',
    href: { KO: '/guide/yeosu', EN: '/en/guide/yeosu', JP: '/ja/guide/yeosu' },
  },
  {
    id: 'jeonju',
    assetId: 'program-jeonju-hanok-licensed-v1',
    image: '/media/product-editorial/program-jeonju-hanok-licensed-v1.webp',
    imagePosition: '50% 52%',
    name: { KO: '전주', EN: 'Jeonju', JP: '全州' },
    duration: { KO: '2박 3일', EN: '2–3 nights', JP: '2〜3泊' },
    description: {
      KO: '한옥 골목과 미식 사이에서 천천히 보내는 도심 워케이션',
      EN: 'A slow city stay shaped by hanok lanes and local food',
      JP: '韓屋の路地と美食の間で過ごす、ゆっくりした都市滞在',
    },
    alt: { KO: '전주 한옥마을의 기와지붕 풍경', EN: 'Tiled rooftops in Jeonju Hanok Village', JP: '全州韓屋村の瓦屋根の風景' },
    bookingQuery: 'Jeonju, South Korea',
    href: { KO: '/guide/jeonju', EN: '/en/guide/jeonju', JP: '/ja/guide/jeonju' },
  },
  {
    id: 'yangyang',
    assetId: 'destination-yangyang-naksan-licensed-v1',
    image: '/media/destinations/yangyang-naksan-licensed-v1.webp',
    imagePosition: '56% 52%',
    name: { KO: '양양', EN: 'Yangyang', JP: '襄陽' },
    duration: { KO: '주말 2박 3일', EN: 'Weekend · 2 nights', JP: '週末2泊3日' },
    description: {
      KO: '낙산의 바다와 해안 산책으로 리듬을 바꾸는 짧은 체류',
      EN: 'Reset your pace with Naksan Beach and coastal walks',
      JP: '洛山の海と海岸散歩でリズムを変える短い滞在',
    },
    alt: { KO: '파도가 밀려오는 양양 낙산해수욕장', EN: 'Waves at Naksan Beach in Yangyang', JP: '波が寄せる襄陽・洛山海水浴場' },
    bookingQuery: 'Yangyang, South Korea',
    href: { KO: '/report/yangyang', EN: '/en/programs/domestic#yangyang', JP: '/ja/programs/domestic#yangyang' },
  },
  {
    id: 'jeongseon',
    assetId: 'destination-jeongseon-atrain-licensed-v1',
    image: '/media/destinations/jeongseon-atrain-licensed-v1.webp',
    imagePosition: '56% 50%',
    name: { KO: '정선', EN: 'Jeongseon', JP: '旌善' },
    duration: { KO: '2박 3일', EN: '2–3 nights', JP: '2〜3泊' },
    description: {
      KO: '아리랑열차와 산골 마을을 잇는 느린 이동의 여행',
      EN: 'A slower journey by A-train through mountain towns',
      JP: 'アリラン列車と山あいの町を結ぶ、ゆっくりした旅',
    },
    alt: { KO: '정선역 승강장의 정선아리랑열차 A-train', EN: 'The Jeongseon Arirang A-train at Jeongseon Station', JP: '旌善駅に停車するアリラン列車A-train' },
    bookingQuery: 'Jeongseon, South Korea',
    href: { KO: '/programs/domestic/jeongseon-train', EN: '/en/programs/domestic#jeongseon', JP: '/ja/programs/domestic#jeongseon' },
  },
  {
    id: 'seoul',
    assetId: 'destination-seoul-editorial-v1',
    image: '/media/destinations/seoul-editorial-v1.webp',
    imagePosition: '50% 54%',
    name: { KO: '서울', EN: 'Seoul', JP: 'ソウル' },
    duration: { KO: '도시형 3박 4일', EN: '3-night city stay', JP: '都市型3泊4日' },
    description: {
      KO: '성수와 연남의 카페, 퇴근 뒤의 도시 문화를 함께',
      EN: 'Work from city cafés, then step into Seoul after dark',
      JP: '聖水と延南のカフェ、仕事の後の街の時間を一緒に',
    },
    alt: { KO: '한글 간판과 불빛이 이어지는 서울의 저녁 골목', EN: 'A Seoul evening street with Hangul signs and lights', JP: 'ハングルの看板と灯りが続くソウルの夜の路地' },
    bookingQuery: 'Seoul, South Korea',
    href: { KO: '/collections/seoul-3n4d', EN: '/en/collections/seoul-3n4d', JP: '/ja/collections/seoul-3n4d' },
  },
]

const ORDER: Record<Lang, string[]> = {
  KO: ['jeju', 'busan', 'gangneung', 'yeosu', 'jeonju', 'yangyang', 'jeongseon', 'seoul'],
  EN: ['seoul', 'busan', 'jeju', 'jeonju', 'yeosu', 'gangneung', 'yangyang', 'jeongseon'],
  JP: ['seoul', 'busan', 'jeju', 'jeonju', 'yeosu', 'gangneung', 'yangyang', 'jeongseon'],
}

export function getDomesticDiscoveries(lang: Lang): DomesticDiscoveryEntry[] {
  const byId = new Map(ENTRIES.map((entry) => [entry.id, entry]))
  return ORDER[lang].map((id) => byId.get(id)).filter((entry): entry is DomesticDiscoveryEntry => Boolean(entry))
}
