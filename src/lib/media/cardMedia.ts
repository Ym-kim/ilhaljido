import type { MediaAsset } from '@/lib/media/assets'

type CardMediaSeed = Pick<MediaAsset, 'id' | 'src' | 'alt' | 'usage' | 'routeUsage' | 'sectionUsage' | 'focalPoint'>

const GENERATED_RESTRICTION = {
  KO: '실제 상품·지원사업 현장 사진이 아닌 편집 이미지이며 특정 업체·시설·운영 장면으로 단정하지 않는다.',
  EN: 'This is an editorial image, not an exact product or program photograph; do not attribute it to a specific operator, venue or service.',
  JP: '実際の商品・支援プログラムの現場写真ではない編集イメージであり、特定の事業者・施設・運営場面として扱わない。',
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

export const CARD_MEDIA_ASSETS: MediaAsset[] = [
  generatedCardMedia({ id: 'support-namhae-photo-v2', src: '/covers/support-namhae-photo-v2.webp', usage: 'editorial', alt: { KO: '남해의 다랭이논과 푸른 해안이 이어지는 지역 편집 이미지', EN: 'Editorial view of terraced fields and blue coastline in the Namhae area', JP: '南海エリアの棚田と青い海岸を写した地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.55, y: 0.53 } }),
  generatedCardMedia({ id: 'support-hamyang-photo-v2', src: '/covers/support-hamyang-photo-v2.webp', usage: 'editorial', alt: { KO: '산 안개와 전통 가옥이 어우러진 함양 산촌 지역 편집 이미지', EN: 'Editorial view of a misty mountain village in the Hamyang area', JP: '山霧と伝統家屋が調和する咸陽エリアの地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.52 } }),
  generatedCardMedia({ id: 'support-tongyeong-photo-v2', src: '/covers/support-tongyeong-photo-v2.webp', usage: 'editorial', alt: { KO: '섬과 어선이 보이는 통영 항구의 지역 편집 이미지', EN: 'Editorial view of an island-dotted harbor in the Tongyeong area', JP: '島々と漁船を望む統営港の地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.48 } }),
  generatedCardMedia({ id: 'support-gimhae-photo-v2', src: '/covers/support-gimhae-photo-v2.webp', usage: 'editorial', alt: { KO: '강변 자전거길과 들판이 이어지는 김해 지역 편집 이미지', EN: 'Editorial view of a riverside cycle path and fields in the Gimhae area', JP: '川沿いのサイクリングロードと田園が続く金海エリアの地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.52, y: 0.58 } }),
  generatedCardMedia({ id: 'support-yeongdeok-photo-v2', src: '/covers/support-yeongdeok-photo-v2.webp', usage: 'editorial', alt: { KO: '푸른 바다와 작은 어항이 보이는 영덕 해안의 지역 편집 이미지', EN: 'Editorial view of a small harbor and blue sea in the Yeongdeok area', JP: '青い海と小さな漁港を望む盈徳エリアの地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.56, y: 0.48 } }),
  generatedCardMedia({ id: 'support-gangjin-photo-v2', src: '/covers/support-gangjin-photo-v2.webp', usage: 'editorial', alt: { KO: '논과 한옥 담장이 이어지는 강진 농촌의 지역 편집 이미지', EN: 'Editorial view of rice fields and traditional rooflines in the Gangjin area', JP: '田園と韓屋の屋根が続く康津エリアの地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.58, y: 0.55 } }),
  generatedCardMedia({ id: 'support-cheongju-photo-v2', src: '/covers/support-cheongju-photo-v2.webp', usage: 'editorial', alt: { KO: '소나무 숲과 차분한 업무 테이블을 담은 청주 지역 편집 이미지', EN: 'Editorial forest-retreat work scene inspired by the Cheongju area', JP: '松林と落ち着いたワークテーブルを写した清州エリアの地域編集イメージ' }, routeUsage: ['/programs/support'], sectionUsage: ['support-program-card'], focalPoint: { x: 0.62, y: 0.52 } }),
  generatedCardMedia({ id: 'esim-japan-photo-v2', src: '/covers/esim-japan-photo-v2.webp', usage: 'product', alt: { KO: '여행 지도와 스마트폰을 놓은 일본 eSIM 편집 이미지', EN: 'Editorial Japan eSIM scene with a smartphone and travel map', JP: 'スマートフォンと旅行地図を配した日本eSIMの編集イメージ' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.58 } }),
  generatedCardMedia({ id: 'esim-asia-photo-v2', src: '/covers/esim-asia-photo-v2.webp', usage: 'product', alt: { KO: '공항 라운지 테이블의 스마트폰과 여행 소품을 담은 아시아 eSIM 편집 이미지', EN: 'Editorial Asia eSIM scene with a smartphone and travel essentials in an airport lounge', JP: '空港ラウンジのスマートフォンと旅道具を写したアジアeSIMの編集イメージ' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.57 } }),
  generatedCardMedia({ id: 'wifi-japan-photo-v2', src: '/covers/wifi-japan-photo-v2.webp', usage: 'product', alt: { KO: '열차 테이블 위 무브랜드 포켓 와이파이 편집 이미지', EN: 'Editorial image of an unbranded pocket Wi-Fi device on a train table', JP: '列車のテーブルに置かれた無ブランドのポケットWi-Fi編集イメージ' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.62 } }),
  generatedCardMedia({ id: 'wifi-taiwan-photo-v2', src: '/covers/wifi-taiwan-photo-v2.webp', usage: 'product', alt: { KO: '비 오는 대만 거리 앞 카페의 포켓 와이파이 편집 이미지', EN: 'Editorial pocket Wi-Fi scene in a café overlooking a rainy Taiwanese street', JP: '雨の台湾の街を望むカフェのポケットWi-Fi編集イメージ' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.48, y: 0.62 } }),
  generatedCardMedia({ id: 'wifi-thailand-photo-v2', src: '/covers/wifi-thailand-photo-v2.webp', usage: 'product', alt: { KO: '태국의 열대 카페에서 노트북과 포켓 와이파이를 사용하는 편집 이미지', EN: 'Editorial remote-work scene with a laptop and pocket Wi-Fi in a tropical Thai café', JP: 'タイのトロピカルなカフェでノートパソコンとポケットWi-Fiを配した編集イメージ' }, routeUsage: ['/select/esim'], sectionUsage: ['product-card'], focalPoint: { x: 0.5, y: 0.58 } }),
  generatedCardMedia({ id: 'carhire-editorial-photo-v2', src: '/covers/carhire-editorial-photo-v2.webp', usage: 'product', alt: { KO: '해안 도로 전망대에 세운 무브랜드 렌터카 편집 이미지', EN: 'Editorial image of an unbranded rental car at a coastal overlook', JP: '海岸道路の展望スポットに停めた無ブランド車のレンタカー編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.56 } }),
  generatedCardMedia({ id: 'airport-transfer-editorial-photo-v2', src: '/covers/airport-transfer-editorial-photo-v2.webp', usage: 'product', alt: { KO: '공항 도착층에서 무브랜드 차량으로 이동하는 여행자 편집 이미지', EN: 'Editorial image of a traveler approaching an unbranded airport-transfer vehicle', JP: '空港到着フロアで無ブランド車へ向かう旅行者の編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.52 } }),
  generatedCardMedia({ id: 'airport-taxi-editorial-photo-v2', src: '/covers/airport-taxi-editorial-photo-v2.webp', usage: 'product', alt: { KO: '저녁 공항 승차 구역에 대기한 무브랜드 세단 편집 이미지', EN: 'Editorial image of an unbranded sedan waiting in an airport pickup lane', JP: '夕方の空港乗車エリアで待機する無ブランドセダンの編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.54 } }),
  generatedCardMedia({ id: 'airport-lounge-editorial-photo-v2', src: '/covers/airport-lounge-editorial-photo-v2.webp', usage: 'product', alt: { KO: '활주로 창이 보이는 차분한 공항 라운지 편집 이미지', EN: 'Editorial image of a quiet airport lounge overlooking the runway', JP: '滑走路を望む落ち着いた空港ラウンジの編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.5 } }),
  generatedCardMedia({ id: 'course-midjourney-photo-v2', src: '/covers/course-midjourney-photo-v2.webp', usage: 'product', alt: { KO: '디지털 무드보드를 작업하는 디자이너의 강의 편집 이미지', EN: 'Editorial course image of a designer developing a digital moodboard', JP: 'デジタルムードボードを制作するデザイナーの講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.52 } }),
  generatedCardMedia({ id: 'course-smartstore-photo-v2', src: '/covers/course-smartstore-photo-v2.webp', usage: 'product', alt: { KO: '소형 상품을 촬영하고 포장하는 온라인 셀러의 강의 편집 이미지', EN: 'Editorial course image of an online seller photographing and packing products', JP: '小さな商品を撮影・梱包するオンライン販売者の講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.52, y: 0.55 } }),
  generatedCardMedia({ id: 'course-claude-photo-v2', src: '/covers/course-claude-photo-v2.webp', usage: 'product', alt: { KO: '노트북으로 업무 자동화 흐름을 설계하는 개발자의 강의 편집 이미지', EN: 'Editorial course image of a developer planning an automation workflow', JP: 'ノートパソコンで業務自動化フローを設計する開発者の講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.52 } }),
  generatedCardMedia({ id: 'course-notion-photo-v2', src: '/covers/course-notion-photo-v2.webp', usage: 'product', alt: { KO: '노트북과 노트로 프로젝트를 정리하는 원격 근무자의 강의 편집 이미지', EN: 'Editorial course image of a remote worker organizing a project with a laptop and notebook', JP: 'ノートパソコンとノートでプロジェクトを整理するリモートワーカーの講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.54 } }),
  generatedCardMedia({ id: 'course-excel-photo-v2', src: '/covers/course-excel-photo-v2.webp', usage: 'product', alt: { KO: '표 형태의 데이터를 검토하는 비즈니스 분석가의 강의 편집 이미지', EN: 'Editorial course image of a business analyst reviewing tabular data', JP: '表形式のデータを確認するビジネスアナリストの講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.52 } }),
  generatedCardMedia({ id: 'course-python-photo-v2', src: '/covers/course-python-photo-v2.webp', usage: 'product', alt: { KO: '차분한 작업 공간에서 코딩을 배우는 입문자의 강의 편집 이미지', EN: 'Editorial course image of a beginner learning to code in a calm workspace', JP: '落ち着いた作業空間でコーディングを学ぶ初心者の講座編集イメージ' }, routeUsage: ['/select/learn'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.52 } }),
  generatedCardMedia({ id: 'cruise-caribbean-editorial-photo-v2', src: '/covers/cruise-caribbean-editorial-photo-v2.webp', usage: 'product', alt: { KO: '카리브해 항구에 정박한 무브랜드 대형 크루즈선 편집 이미지', EN: 'Editorial image of an unbranded cruise ship in a Caribbean port', JP: 'カリブ海の港に停泊する無ブランド大型クルーズ船の編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.55, y: 0.48 } }),
  generatedCardMedia({ id: 'cruise-transatlantic-editorial-photo-v2', src: '/covers/cruise-transatlantic-editorial-photo-v2.webp', usage: 'product', alt: { KO: '해 질 무렵 남미 항구를 떠나는 무브랜드 크루즈선 편집 이미지', EN: 'Editorial image of an unbranded cruise ship departing a South American port at sunset', JP: '夕暮れの南米の港を出航する無ブランドクルーズ船の編集イメージ' }, routeUsage: ['/select'], sectionUsage: ['product-card'], focalPoint: { x: 0.54, y: 0.5 } }),
]
