import type { MediaAsset } from '@/lib/media/assets'

type CardMediaSeed = Pick<MediaAsset, 'id' | 'src' | 'alt' | 'usage' | 'routeUsage' | 'sectionUsage' | 'focalPoint'>

const GENERATED_RESTRICTION = {
  KO: '실제 상품·지원사업 현장 사진이 아닌 자체 제작 이미지이며 특정 업체·시설·운영 장면으로 단정하지 않는다.',
  EN: 'This is an in-house generated visual, not an exact product or program photograph; do not attribute it to a specific operator, venue or service.',
  JP: '実際の商品・支援プログラムの現場写真ではない自社制作画像であり、特定の事業者・施設・運営場面として扱わない。',
}

function generatedCardMedia(seed: CardMediaSeed): MediaAsset {
  return {
    ...seed,
    sourceType: 'generated',
    illustrative: true,
    width: 1200,
    height: 900,
    localeUsage: ['ko', 'en', 'ja'],
    source: 'OpenAI built-in image generation from a Wakation art-direction prompt',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-08-01',
    verifiedAt: '2026-08-01',
    restriction: GENERATED_RESTRICTION,
  }
}

// Higgsfield Soul 생성분 — 크기 가변(히어로 1920×1080 포함)이라 width/height 오버라이드 허용
function higgsfieldCardMedia(seed: CardMediaSeed & Partial<Pick<MediaAsset, 'width' | 'height'>>): MediaAsset {
  return {
    width: 1200,
    height: 900,
    ...seed,
    sourceType: 'generated',
    illustrative: true,
    localeUsage: ['ko', 'en', 'ja'],
    source: 'Higgsfield Soul image generation from a Wakation art-direction prompt',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-08-17',
    verifiedAt: '2026-08-17',
    restriction: GENERATED_RESTRICTION,
  }
}

export const CARD_MEDIA_ASSETS: MediaAsset[] = [
  generatedCardMedia({ id: 'support-namhae-photo-v2', src: '/covers/support-namhae-photo-v2.webp', usage: 'editorial', alt: { KO: '남해의 다랭이논과 푸른 해안', EN: 'Terraced fields and blue coastline in the Namhae area', JP: '南海エリアの棚田と青い海岸' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.55, y: 0.53 } }),
  generatedCardMedia({ id: 'support-hamyang-photo-v2', src: '/covers/support-hamyang-photo-v2.webp', usage: 'editorial', alt: { KO: '산 안개와 전통 가옥이 어우러진 함양 산촌', EN: 'A misty mountain village in the Hamyang area', JP: '山霧と伝統家屋が調和する咸陽エリアの山村' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.52 } }),
  generatedCardMedia({ id: 'support-tongyeong-photo-v2', src: '/covers/support-tongyeong-photo-v2.webp', usage: 'editorial', alt: { KO: '섬과 어선이 보이는 통영 항구', EN: 'An island-dotted harbor in the Tongyeong area', JP: '島々と漁船を望む統営港' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.48 } }),
  generatedCardMedia({ id: 'support-gimhae-photo-v2', src: '/covers/support-gimhae-photo-v2.webp', usage: 'editorial', alt: { KO: '강변 자전거길과 들판이 이어지는 김해 풍경', EN: 'A riverside cycle path and fields in the Gimhae area', JP: '川沿いのサイクリングロードと田園が続く金海の風景' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.52, y: 0.58 } }),
  generatedCardMedia({ id: 'support-yeongdeok-photo-v2', src: '/covers/support-yeongdeok-photo-v2.webp', usage: 'editorial', alt: { KO: '푸른 바다와 작은 어항이 보이는 영덕 해안', EN: 'A small harbor and blue sea in the Yeongdeok area', JP: '青い海と小さな漁港を望む盈徳の海岸' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.56, y: 0.48 } }),
  generatedCardMedia({ id: 'support-gangjin-photo-v2', src: '/covers/support-gangjin-photo-v2.webp', usage: 'editorial', alt: { KO: '논과 한옥 담장이 이어지는 강진 농촌 풍경', EN: 'Rice fields and traditional rooflines in the Gangjin area', JP: '田園と韓屋の屋根が続く康津の風景' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.55 } }),
  generatedCardMedia({ id: 'support-cheongju-photo-v2', src: '/covers/support-cheongju-photo-v2.webp', usage: 'editorial', alt: { KO: '소나무 숲과 차분한 업무 테이블이 있는 청주 체류 장면', EN: 'A forest-retreat work scene inspired by the Cheongju area', JP: '松林と落ち着いたワークテーブルがある清州の滞在風景' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.62, y: 0.52 } }),
  generatedCardMedia({ id: 'esim-japan-photo-v2', src: '/covers/esim-japan-photo-v2.webp', usage: 'product', alt: { KO: '여행 지도와 스마트폰을 놓은 일본 eSIM 준비 장면', EN: 'A Japan eSIM planning scene with a smartphone and travel map', JP: 'スマートフォンと旅行地図を配した日本eSIMの準備シーン' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.58 } }),
  generatedCardMedia({ id: 'esim-asia-photo-v2', src: '/covers/esim-asia-photo-v2.webp', usage: 'product', alt: { KO: '공항 라운지 테이블의 스마트폰과 여행 소품', EN: 'A smartphone and travel essentials in an airport lounge', JP: '空港ラウンジに置かれたスマートフォンと旅道具' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.57 } }),
  generatedCardMedia({ id: 'wifi-japan-photo-v2', src: '/covers/wifi-japan-photo-v2.webp', usage: 'product', alt: { KO: '열차 테이블 위 무브랜드 포켓 와이파이', EN: 'An unbranded pocket Wi-Fi device on a train table', JP: '列車のテーブルに置かれた無ブランドのポケットWi-Fi' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.62 } }),
  generatedCardMedia({ id: 'wifi-taiwan-photo-v2', src: '/covers/wifi-taiwan-photo-v2.webp', usage: 'product', alt: { KO: '비 오는 대만 거리 앞 카페의 포켓 와이파이', EN: 'A pocket Wi-Fi device in a café overlooking a rainy Taiwanese street', JP: '雨の台湾の街を望むカフェのポケットWi-Fi' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.48, y: 0.62 } }),
  generatedCardMedia({ id: 'wifi-thailand-photo-v2', src: '/covers/wifi-thailand-photo-v2.webp', usage: 'product', alt: { KO: '태국의 열대 카페에서 노트북과 포켓 와이파이를 사용하는 장면', EN: 'A remote-work scene with a laptop and pocket Wi-Fi in a tropical Thai café', JP: 'タイのトロピカルなカフェでノートパソコンとポケットWi-Fiを使う場面' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.58 } }),
  generatedCardMedia({ id: 'carhire-editorial-photo-v2', src: '/covers/carhire-editorial-photo-v2.webp', usage: 'product', alt: { KO: '해안 도로 전망대에 세운 무브랜드 렌터카', EN: 'An unbranded rental car at a coastal overlook', JP: '海岸道路の展望スポットに停めた無ブランドのレンタカー' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.56 } }),
  generatedCardMedia({ id: 'airport-transfer-editorial-photo-v2', src: '/covers/airport-transfer-editorial-photo-v2.webp', usage: 'product', alt: { KO: '공항 도착층에서 무브랜드 차량으로 이동하는 여행자', EN: 'A traveler approaching an unbranded airport-transfer vehicle', JP: '空港到着フロアで無ブランド車へ向かう旅行者' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.52 } }),
  generatedCardMedia({ id: 'airport-taxi-editorial-photo-v2', src: '/covers/airport-taxi-editorial-photo-v2.webp', usage: 'product', alt: { KO: '저녁 공항 승차 구역에 대기한 무브랜드 세단', EN: 'An unbranded sedan waiting in an airport pickup lane', JP: '夕方の空港乗車エリアで待機する無ブランドセダン' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.54 } }),
  generatedCardMedia({ id: 'airport-lounge-editorial-photo-v2', src: '/covers/airport-lounge-editorial-photo-v2.webp', usage: 'product', alt: { KO: '활주로 창이 보이는 차분한 공항 라운지', EN: 'A quiet airport lounge overlooking the runway', JP: '滑走路を望む落ち着いた空港ラウンジ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.5 } }),
  generatedCardMedia({ id: 'course-midjourney-photo-v2', src: '/covers/course-midjourney-photo-v2.webp', usage: 'product', alt: { KO: '디지털 무드보드를 작업하는 디자이너', EN: 'A designer developing a digital moodboard', JP: 'デジタルムードボードを制作するデザイナー' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.52 } }),
  generatedCardMedia({ id: 'course-smartstore-photo-v2', src: '/covers/course-smartstore-photo-v2.webp', usage: 'product', alt: { KO: '소형 상품을 촬영하고 포장하는 온라인 셀러', EN: 'An online seller photographing and packing products', JP: '小さな商品を撮影・梱包するオンライン販売者' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.55 } }),
  generatedCardMedia({ id: 'course-claude-photo-v2', src: '/covers/course-claude-photo-v2.webp', usage: 'product', alt: { KO: '노트북으로 업무 자동화 흐름을 설계하는 개발자', EN: 'A developer planning an automation workflow', JP: 'ノートパソコンで業務自動化フローを設計する開発者' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.52 } }),
  generatedCardMedia({ id: 'course-notion-photo-v2', src: '/covers/course-notion-photo-v2.webp', usage: 'product', alt: { KO: '노트북과 노트로 프로젝트를 정리하는 원격 근무자', EN: 'A remote worker organizing a project with a laptop and notebook', JP: 'ノートパソコンとノートでプロジェクトを整理するリモートワーカー' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.54 } }),
  generatedCardMedia({ id: 'course-python-photo-v2', src: '/covers/course-python-photo-v2.webp', usage: 'product', alt: { KO: '차분한 작업 공간에서 코딩을 배우는 입문자', EN: 'A beginner learning to code in a calm workspace', JP: '落ち着いた作業空間でコーディングを学ぶ初心者' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.52 } }),
  generatedCardMedia({ id: 'cruise-caribbean-editorial-photo-v2', src: '/covers/cruise-caribbean-editorial-photo-v2.webp', usage: 'product', alt: { KO: '카리브해 항구에 정박한 무브랜드 대형 크루즈선', EN: 'An unbranded cruise ship in a Caribbean port', JP: 'カリブ海の港に停泊する無ブランド大型クルーズ船' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.48 } }),
  generatedCardMedia({ id: 'cruise-transatlantic-editorial-photo-v2', src: '/covers/cruise-transatlantic-editorial-photo-v2.webp', usage: 'product', alt: { KO: '해 질 무렵 남미 항구를 떠나는 무브랜드 크루즈선', EN: 'An unbranded cruise ship departing a South American port at sunset', JP: '夕暮れの南米の港を出航する無ブランドクルーズ船' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.5 } }),
  // 2026-08-17 확충분 — Higgsfield Soul 2K 생성 (숙소 카드 사진 반복 해소 + /language 히어로)
  higgsfieldCardMedia({ id: 'japanese-ryokan-work-editorial-v1', src: '/media/product-editorial/japanese-ryokan-work-editorial-v1.webp', usage: 'editorial', alt: { KO: '쇼지 창으로 빛이 드는 다다미 방의 좌식 작업 테이블', EN: 'A low work table in a tatami room lit through shoji screens', JP: '障子越しの光が差す畳の間のローテーブル' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'tropical-pool-villa-editorial-v1', src: '/media/product-editorial/tropical-pool-villa-editorial-v1.webp', usage: 'editorial', alt: { KO: '풀장이 보이는 열대 빌라의 밝은 작업 테이블', EN: 'A bright work table in a tropical villa overlooking a plunge pool', JP: 'プールを望むトロピカルヴィラの明るいワークテーブル' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.45, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'bright-loft-workspace-editorial-v1', src: '/media/product-editorial/bright-loft-workspace-editorial-v1.webp', usage: 'editorial', alt: { KO: '창가에 책상을 둔 밝은 아파트 작업 공간', EN: 'A bright apartment workspace with a desk by the window', JP: '窓際にデスクを置いた明るいアパートの作業空間' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.45, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'language-study-lounge-editorial-v1', src: '/media/product-editorial/language-study-lounge-editorial-v1.webp', usage: 'editorial', alt: { KO: '라운지 창가에서 노트북과 노트로 공부하는 사람', EN: 'A person studying with a laptop and notebook by a lounge window', JP: 'ラウンジの窓際でノートパソコンとノートで学ぶ人' }, routeUsage: ['/language'], sectionUsage: ['hero'], focalPoint: { x: 0.42, y: 0.45 }, width: 1920, height: 1080 }),
  higgsfieldCardMedia({ id: 'oceanview-balcony-desk-editorial-v1', src: '/media/product-editorial/oceanview-balcony-desk-editorial-v1.webp', usage: 'editorial', alt: { KO: '바다가 보이는 발코니의 작업 테이블', EN: 'A work table on a balcony overlooking the sea', JP: '海を望むバルコニーのワークテーブル' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'hanok-stay-work-editorial-v1', src: '/media/product-editorial/hanok-stay-work-editorial-v1.webp', usage: 'editorial', alt: { KO: '기와지붕이 보이는 한옥 방의 좌식 테이블', EN: 'A low table in a hanok room with tiled-roof view', JP: '瓦屋根を望む韓屋の間のローテーブル' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'city-dusk-lounge-editorial-v1', src: '/media/product-editorial/city-dusk-lounge-editorial-v1.webp', usage: 'editorial', alt: { KO: '해 질 녘 도시 전망의 호텔 라운지 좌석', EN: 'A hotel lounge seat with a city view at dusk', JP: '夕暮れの街並みを望むホテルラウンジ' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.6 } }),
  higgsfieldCardMedia({ id: 'forest-cabin-desk-editorial-v1', src: '/media/product-editorial/forest-cabin-desk-editorial-v1.webp', usage: 'editorial', alt: { KO: '숲이 보이는 오두막 창가의 나무 책상', EN: 'A wooden desk by a cabin window facing the forest', JP: '森を望むキャビンの窓際の木製デスク' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'mediterranean-room-editorial-v1', src: '/media/product-editorial/mediterranean-room-editorial-v1.webp', usage: 'editorial', alt: { KO: '햇살이 드는 화이트 게스트하우스 방의 작은 책상', EN: 'A small desk in a sunlit whitewashed guesthouse room', JP: '陽光が差す白壁のゲストハウスの小さなデスク' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.35, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'coliving-work-lounge-editorial-v1', src: '/media/product-editorial/coliving-work-lounge-editorial-v1.webp', usage: 'editorial', alt: { KO: '긴 공용 테이블이 있는 코리빙 라운지', EN: 'A coliving lounge with a long communal work table', JP: '長い共用テーブルのあるコリビングラウンジ' }, routeUsage: ['/select/hotel'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
  // 2026-08-17 Klook 피드 확충 8종 커버
  higgsfieldCardMedia({ id: 'act-gardens-dome-editorial-v1', src: '/media/product-editorial/act-gardens-dome-editorial-v1.webp', usage: 'editorial', alt: { KO: '유리 돔 온실 속 거대한 수직 정원', EN: 'Giant vertical gardens inside a glass conservatory dome', JP: 'ガラスドーム温室の巨大な垂直庭園' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.4 } }),
  higgsfieldCardMedia({ id: 'act-umeda-dusk-editorial-v1', src: '/media/product-editorial/act-umeda-dusk-editorial-v1.webp', usage: 'editorial', alt: { KO: '해 질 녘 옥상 전망 데크와 연결형 쌍둥이 빌딩', EN: 'Twin connected towers seen from a rooftop deck at dusk', JP: '夕暮れの屋上デッキから望む連結型ツインタワー' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.45, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'act-taipei-observatory-editorial-v1', src: '/media/product-editorial/act-taipei-observatory-editorial-v1.webp', usage: 'editorial', alt: { KO: '전망대 창 너머로 보이는 도시와 초고층 타워', EN: 'A supertall tower and cityscape through observatory windows', JP: '展望台の窓越しに見える超高層タワーと街並み' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.45 } }),
  higgsfieldCardMedia({ id: 'act-mahanakhon-skywalk-editorial-v1', src: '/media/product-editorial/act-mahanakhon-skywalk-editorial-v1.webp', usage: 'editorial', alt: { KO: '노을 진 도시 위 유리 바닥 스카이워크', EN: 'A glass-floor skywalk above a city at sunset', JP: '夕焼けの街の上のガラス床スカイウォーク' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'act-ngongping-cablecar-editorial-v1', src: '/media/product-editorial/act-ngongping-cablecar-editorial-v1.webp', usage: 'editorial', alt: { KO: '산과 바다 위를 지나는 케이블카 곤돌라', EN: 'Cable car gondolas over mountains and sea', JP: '山と海の上を渡るケーブルカー' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.4, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'act-landmark81-skyline-editorial-v1', src: '/media/product-editorial/act-landmark81-skyline-editorial-v1.webp', usage: 'editorial', alt: { KO: '강이 굽이치는 도시 위로 솟은 초고층 타워', EN: 'A supertall tower above a riverside city at twilight', JP: '川辺の街にそびえる超高層タワー' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.4 } }),
  higgsfieldCardMedia({ id: 'act-immersive-art-editorial-v1', src: '/media/product-editorial/act-immersive-art-editorial-v1.webp', usage: 'editorial', alt: { KO: '빛나는 구체와 프로젝션이 있는 몰입형 아트 공간', EN: 'An immersive art space with glowing orbs and projections', JP: '光る球体とプロジェクションの没入型アート空間' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.55 } }),
  higgsfieldCardMedia({ id: 'act-hanbok-palace-editorial-v1', src: '/media/product-editorial/act-hanbok-palace-editorial-v1.webp', usage: 'editorial', alt: { KO: '고궁 문 앞에서 한복을 입은 사람의 뒷모습', EN: 'A person in hanbok seen from behind at a palace gate', JP: '古宮の門前で韓服を着た人の後ろ姿' }, routeUsage: ['/select/activity'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'course-analytics-desk-editorial-v1', src: '/media/product-editorial/course-analytics-desk-editorial-v1.webp', usage: 'editorial', alt: { KO: '흐릿한 분석 대시보드가 켜진 노트북과 커피잔', EN: 'A laptop with a blurred analytics dashboard beside a coffee cup', JP: 'ぼかされた分析ダッシュボードのノートPCとコーヒー' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.45 } }),
  // 2026-09-01 인프런 2차 배치 커버 — nano_banana_pro 생성(정물). Soul 2.0은 정물에 가짜 텍스트를 새겨 생성 불가였음
  higgsfieldCardMedia({ id: 'course-figma-ai-photo-v1', src: '/covers/course-figma-ai-photo-v1.webp', usage: 'product', alt: { KO: '태블릿과 스타일러스, 보라색 색상 카드가 놓인 디자인 책상', EN: 'A tablet, stylus and violet colour swatch cards on a design desk', JP: 'タブレットとスタイラス、紫の色見本が置かれたデザイン机' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'course-data-literacy-photo-v1', src: '/covers/course-data-literacy-photo-v1.webp', usage: 'product', alt: { KO: '노트와 안경, 커피잔이 놓인 창가 원목 책상', EN: 'A notebook, glasses and coffee cup on a sunlit wooden desk', JP: 'ノートと眼鏡、コーヒーが置かれた窓辺の木製デスク' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
  higgsfieldCardMedia({ id: 'course-aws-cloud-photo-v1', src: '/covers/course-aws-cloud-photo-v1.webp', usage: 'product', alt: { KO: '층층이 떠 있는 반투명 유리 패널과 금속 연결봉', EN: 'Layered translucent glass panels linked by metal rods', JP: '層状に浮かぶ半透明のガラス板と金属のロッド' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.5 } }),
]
