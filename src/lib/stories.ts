import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 에디토리얼 스토리 인덱스 — /stories 허브 (2026-07-19)
// 아티클이 늘 때마다 배너를 증식시키지 않기 위한 단일 집결지.
// 새 아티클 추가 시: ①아티클 페이지(확립 패턴) ②여기 STORIES에 항목 추가
// ③해당 카테고리 페이지에 EditorialBanner 1개 — 이 3곳이 전부다.
// 카피는 각 아티클의 검증 완료 문구만 재사용 (신규 주장 금지).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

export type Story = {
  slug: string
  href: string
  /** 게재일 (표기용) */
  published: string
  category: L
  title: L
  sub: L
  image?: string
  imageAlt?: L
  illustrative?: boolean
}

export const STORIES: Story[] = [
  {
    slug: 'world-europa',
    href: '/cruise/world-europa',
    published: '2026-07-28',
    category: { KO: '크루즈 · 겨울 카리브', EN: 'Cruise · Winter Caribbean', JP: 'クルーズ · 冬のカリブ' },
    title: {
      KO: '21만 톤, 겨울의 반대편 — MSC 월드 유로파',
      EN: 'A 215,000-ton winter escape — MSC World Europa',
      JP: '21万トン、冬の反対側 — MSCワールドエウローパ',
    },
    sub: {
      KO: '한국의 겨울에 카리브 8일 — 마르티니크 모항, 스타링크 와이파이.',
      EN: 'Eight Caribbean days in Korean winter — Martinique home port, Starlink Wi-Fi.',
      JP: '韓国の冬にカリブ8日 — マルティニーク母港、スターリンクWi-Fi。',
    },
    image: '/covers/cruise-caribbean-editorial-photo-v2.webp',
    imageAlt: {
      KO: '따뜻한 바다를 항해하는 크루즈를 표현한 편집 이미지',
      EN: 'Editorial image of a cruise sailing through warm waters',
      JP: '暖かな海を航行するクルーズを表現した編集画像',
    },
    illustrative: true,
  },
  {
    slug: 'serena',
    href: '/cruise/serena',
    published: '2026-07-28',
    category: { KO: '크루즈 · 그랜드 보야지', EN: 'Cruise · Grand voyage', JP: 'クルーズ · グランドボヤージュ' },
    title: {
      KO: '바다 위에서 한 달 살기 — 코스타 세레나 그랜드 보야지',
      EN: 'A month at sea — Costa Serena grand voyage',
      JP: '海の上でひと月暮らす — コスタ·セレーナ',
    },
    sub: {
      KO: '남미에서 유럽까지 19~23일 — 배가 이사할 때 열리는 바다 위 한 달.',
      EN: '19–23 days from South America to Europe — a month at sea on a repositioning voyage.',
      JP: '南米からヨーロッパへ19〜23日 — リポジショニングで海上のひと月。',
    },
    image: '/covers/cruise-transatlantic-editorial-photo-v2.webp',
    imageAlt: {
      KO: '대양 횡단 항해를 표현한 크루즈 편집 이미지',
      EN: 'Editorial image representing an ocean-crossing cruise',
      JP: '大洋横断の航海を表現したクルーズ編集画像',
    },
    illustrative: true,
  },
  {
    slug: 'bellissima',
    href: '/cruise/bellissima',
    published: '2026-07-26',
    category: { KO: '크루즈 · 선상 오피스', EN: 'Cruise · Office at sea', JP: 'クルーズ · 船上オフィス' },
    title: {
      KO: '17만 톤의 스타링크 오피스 — MSC 벨리시마',
      EN: 'A 171,000-ton Starlink office — MSC Bellissima',
      JP: '17万トンのスターリンク·オフィス — MSCベリッシマ',
    },
    sub: {
      KO: '스타링크 와이파이·다이닝 12곳 — 2027년 6월부터 인천 연중 모항.',
      EN: 'Starlink Wi-Fi, 12 dining venues — Incheon home port from June 2027.',
      JP: 'スターリンクWi-Fi·ダイニング12カ所 — 2027年6月から仁川母港。',
    },
  },
  {
    slug: 'manado',
    href: '/programs/global/manado',
    published: '2026-07-18',
    category: { KO: '글로벌 · 비밀의 체류지', EN: 'Global · Hidden base', JP: 'グローバル · 秘密の拠点' },
    title: {
      KO: '발리 다음은, 아무도 모르는 이 바다 — 마나도',
      EN: 'After Bali, a sea nobody knows — Manado',
      JP: 'バリの次は、誰も知らない海 — マナド',
    },
    sub: {
      KO: '다이버 성지 부나켄 — 돼지고기·주류 자유, 인천 직항 전세기.',
      EN: "Divers' mecca Bunaken, pork & beer freely, direct charter flights from Seoul.",
      JP: 'ダイバーの聖地ブナケン、豚肉もビールも自由、仁川直行チャーター。',
    },
  },
  {
    slug: 'jeongseon-train',
    href: '/programs/domestic/jeongseon-train',
    published: '2026-07-18',
    category: { KO: '국내 · 슬로우 트레인', EN: 'Korea · Slow train', JP: '国内 · スロートレイン' },
    title: {
      KO: '느리게 달릴수록, 일은 깊어진다 — 정선 아리랑 열차',
      EN: 'The slower the train, the deeper the work — Jeongseon A-train',
      JP: '遅い列車ほど、仕事は深くなる — 旌善アリラン列車',
    },
    sub: {
      KO: '2년 3개월 만에 돌아온 산악열차 — 태백산맥을 통과하는 달리는 오피스.',
      EN: 'Back after 2 years 3 months. A rolling office through the Taebaek range.',
      JP: '2年3カ月ぶりに復活。太白山脈を走るオフィス。',
    },
  },
  {
    slug: 'miracle',
    href: '/cruise/miracle',
    published: '2026-07-18',
    category: { KO: '크루즈 · 이동형 워케이션', EN: 'Cruise · Transit workation', JP: 'クルーズ · 移動型' },
    title: {
      KO: '바다 위 17시간, 부산—오사카 크루즈 워케이션',
      EN: 'Deep work at sea — 17 hours from Busan to Osaka',
      JP: '海の上の17時間 — 釜山発大阪行きディープワーク',
    },
    sub: {
      KO: '팬스타 미라클호 — 뷔페 2식·위성 와이파이·수하물 걱정 제로.',
      EN: 'PanStar Miracle: two buffet meals, satellite Wi-Fi, no baggage limits.',
      JP: 'パンスター·ミラクル：ビュッフェ2食·衛星Wi-Fi·手荷物制限なし。',
    },
    image: '/covers/cruise-panstar-real-v2.jpeg',
    imageAlt: {
      KO: '부산과 오사카를 잇는 팬스타 크루즈 선박',
      EN: 'PanStar cruise ship connecting Busan and Osaka',
      JP: '釜山と大阪を結ぶパンスタークルーズ船',
    },
  },
]

export const STORIES_UI: Record<string, L> = {
  eyebrow: { KO: 'Stories', EN: 'Stories', JP: 'Stories' },
  title: { KO: '여행 이야기', EN: 'Travel stories', JP: '旅のストーリー' },
  sub: {
    KO: '검증된 사실만으로 쓰는 에디토리얼 — 새로운 체류지와 이동 방식의 가능성을 취재합니다.',
    EN: 'Editorials built on verified facts — new bases and new ways to move, researched.',
    JP: '検証済みの事実だけで書くエディトリアル — 新しい滞在地と移動のかたち。',
  },
  read: { KO: '읽기', EN: 'Read', JP: '読む' },
  featured: { KO: '편집자가 살펴본 이동과 체류', EN: 'Researched journeys and stays', JP: '編集部が調べた移動と滞在' },
  more: { KO: '더 많은 여행 이야기', EN: 'More travel stories', JP: 'もっと旅のストーリー' },
  illustrative: { KO: '편집 이미지', EN: 'Editorial image', JP: '編集画像' },
  explore_title: { KO: '이야기에서 다음 여행으로', EN: 'Turn a story into your next trip', JP: 'ストーリーから次の旅へ' },
  explore_sub: { KO: '도시를 비교하거나, 일정이 담긴 여행 구성을 살펴보세요.', EN: 'Compare destinations or explore a trip set with a ready-made flow.', JP: '都市を比べたり、日程の流れがある旅の構成を見てみましょう。' },
  explore_destinations: { KO: '여행지 살펴보기', EN: 'Explore destinations', JP: '行き先を見る' },
  explore_collections: { KO: '여행 구성 보기', EN: 'Explore trip sets', JP: '旅の構成を見る' },
  note: {
    KO: '스토리 속 일부 링크는 제휴 링크이며, 요금과 조건은 제휴사 사이트에서 최종 확인됩니다.',
    EN: 'Some links in stories are affiliate links; final prices are confirmed on partner sites.',
    JP: 'ストーリー内の一部リンクは提携リンクです。料金は提携先でご確認ください。',
  },
}
