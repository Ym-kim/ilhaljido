import type { AffiliateItem } from './types'
import type { Lang } from '@/lib/i18n'

// ─────────────────────────────────────────────────────────────────────────────
// 제휴 상품 EN/JP 오버레이 — items.ts(KO 원본)를 건드리지 않고 표시 필드만 덮어씀
// 새 홈 피처드 상품 추가 시 여기에 EN/JP 항목도 함께 추가할 것
// ─────────────────────────────────────────────────────────────────────────────

type Overlay = Partial<Pick<AffiliateItem, 'name' | 'displayTitle' | 'productTitle' | 'destination' | 'desc' | 'cta' | 'badge' | 'priceFrom'>>

const EN: Record<string, Overlay> = {
  'hotel-booking': {
    desc: 'Book stays worldwide — great for long stays, apartments and serviced residences.',
    cta: 'Book a stay',
    badge: 'Long stay',
  },
  'hotel-tripcom': {
    desc: 'Stays, flights and tours in one place. Search long-stay hotels by destination.',
    cta: 'Find stays',
    badge: 'Stay · Flight',
  },
  'activity-kkday': {
    desc: 'Local tours, activities, tickets and transit passes across Japan, Taiwan and SEA.',
    cta: 'Book activities',
    badge: 'Experiences',
  },
  'esim-airalo': {
    desc: 'Instant eSIM for 200+ countries. Install before you land — skip the SIM queue.',
    cta: 'Get an eSIM',
    badge: 'eSIM',
  },
  'edu-inflearn': {
    name: 'Inflearn',
    desc: 'IT, dev, design and business courses. Learn on the move, apply on arrival.',
    cta: 'Browse courses',
    badge: 'Online courses',
  },
  'insurance-safetywing': {
    desc: 'Monthly travel insurance for digital nomads and long-stayers — 188 countries covered.',
    cta: 'Explore coverage',
    badge: 'Travel insurance',
  },
  'hotel-booking-visa': {
    displayTitle: 'Flight & stay booking',
    desc: 'Get the flight and stay confirmations you need for visa applications.',
    cta: 'Book flight & stay',
    badge: 'Flight · Stay',
  },
  'esim-airalo-visa': {
    desc: 'Install before your visa arrives — data connects the moment you land. 200+ countries.',
    cta: 'Get an eSIM',
    badge: 'eSIM',
  },
  'hotel-booking-market': {
    desc: 'Local hotels and apartments — long-stay options for research trips.',
    cta: 'Book a stay',
    badge: 'Long stay',
  },
  'stay-millennials-shibuya': {
    priceFrom: '₩40,000+',
    destination: 'Tokyo · Japan',
    desc: 'Two floors of .andwork coworking inside the hotel. 6 min from Shibuya station, free coffee and happy hour.',
    cta: 'See rooms', badge: 'Built-in coworking',
  },
  'stay-lively-osaka': {
    priceFrom: '₩80,000+',
    destination: 'Osaka · Japan',
    desc: 'Seven work-friendly lounges in the Honmachi business district. Rated 8.7 by 2,600+ guests.',
    cta: 'See rooms', badge: 'Lounge work',
  },
  'stay-webase-hakata': {
    priceFrom: '₩30,000+',
    destination: 'Fukuoka · Japan',
    desc: 'Free 9th-floor coworking space with terrace. 3 min from Nakasu-Kawabata station, rated 8.6.',
    cta: 'See rooms', badge: 'Free coworking',
  },
  'stay-tribal-bali': {
    priceFrom: '₩20,000+',
    destination: 'Canggu, Bali · Indonesia',
    desc: "Bali's first purpose-built coworking stay. Poolside workspace and a real nomad community.",
    cta: 'See rooms', badge: 'Nomad favorite',
  },
  'stay-chicland-danang': {
    priceFrom: '₩80,000+',
    destination: 'Da Nang · Vietnam',
    desc: '2 min to My Khe beach, café-style lounge and rooftop pool. Near the An Thuong nomad area, rated 8.6.',
    cta: 'See rooms', badge: 'Beach work',
  },
  'stay-playce-jeju': {
    priceFrom: '₩70,000+',
    destination: 'Seongsan, Jeju · Korea',
    desc: 'Rooms with separate work desks and dedicated workation packages. Near Seongsan Ilchulbong.',
    cta: 'See rooms', badge: 'Workation-ready',
  },
  'stay-kantary-chiangmai': {
    priceFrom: '₩80,000+',
    destination: 'Nimman, Chiang Mai · Thailand',
    desc: 'Serviced apartments with kitchenettes, built for long stays. Walk to Maya Mall and One Nimman.',
    cta: 'See rooms', badge: 'Long stay',
  },
  'act-tokyo-disney': {
    priceFrom: '₩80,000+',
    productTitle: 'Tokyo Disneyland · DisneySea ticket',
    destination: 'Tokyo · Japan',
    desc: '1-day pass with instant mobile QR entry. Make a workation weekend special.',
    cta: 'View product', badge: 'Best seller',
  },
  'act-osaka-usj': {
    priceFrom: '₩80,000+',
    productTitle: 'Universal Studios Japan ticket',
    destination: 'Osaka · Japan',
    desc: '1-day pass with Express Pass options. Skip the lines on your Osaka weekend.',
    cta: 'View product', badge: 'Express',
  },
  'act-fukuoka-bustour': {
    priceFrom: '₩80,000+',
    productTitle: 'Fukuoka day bus tour (KR guide)',
    destination: 'Fukuoka · Japan',
    desc: 'Dazaifu, Yufuin and Beppu in one day. Departs Hakata station with a Korean-speaking guide.',
    cta: 'View product', badge: 'Guided',
  },
  'act-bali-ubud': {
    priceFrom: '₩40,000+',
    productTitle: 'Bali Ubud private tour (KR guide)',
    destination: 'Bali · Indonesia',
    desc: 'Half-day customizable private tour — temples and rice terraces, your route.',
    cta: 'View product', badge: 'Private',
  },
  'act-danang-banahills': {
    priceFrom: '₩100,000+',
    productTitle: 'Da Nang Ba Na Hills private tour',
    destination: 'Da Nang · Vietnam',
    desc: 'Golden Bridge, tickets, lunch and pickup included. Private-vehicle day tour.',
    cta: 'View product', badge: 'All-inclusive',
  },
  'feat-tokyo-hotel': {
    productTitle: 'Tokyo long-stay hotels',
    destination: 'Tokyo · Japan',
    desc: 'Apartments, serviced residences and business hotels — picked for workations.',
    cta: 'Search Tokyo stays',
    badge: 'Long stay',
  },
  'feat-osaka-hotel': {
    productTitle: 'Osaka hotels & apartments',
    destination: 'Osaka · Japan',
    desc: 'Stays, flights and tours in one place. Find long-stay Osaka hotels on Trip.com.',
    cta: 'Search Osaka stays',
    badge: 'Stay · Flight',
  },
  'feat-fukuoka-hotel': {
    productTitle: 'Fukuoka workation stays',
    destination: 'Fukuoka · Japan',
    desc: 'Tenjin & Hakata business hotels and serviced apartments — the closest overseas base.',
    cta: 'Search Fukuoka stays',
    badge: 'Long stay',
  },
  'feat-bali-hotel': {
    productTitle: 'Bali villas & resorts',
    destination: 'Bali · Indonesia',
    desc: 'Ubud, Kuta and Seminyak villas, coliving stays and resorts for longer trips.',
    cta: 'Search Bali stays',
    badge: 'Long stay',
  },
  'feat-japan-activity': {
    productTitle: 'Japan tours & activities',
    destination: 'All Japan',
    desc: 'Local tours, transit passes and tickets across Tokyo, Osaka and Fukuoka.',
    cta: 'Browse activities',
    badge: 'Experiences',
  },
  'feat-japan-esim': {
    productTitle: 'Japan eSIM — instant',
    destination: 'Japan',
    desc: 'Install before you land. Unlimited or daily data plans, 200+ countries covered.',
    cta: 'Get an eSIM',
    badge: 'eSIM',
  },
  'feat-vietnam-hotel': {
    productTitle: 'Hoi An & Da Nang stays',
    destination: 'Da Nang · Vietnam',
    desc: 'Long-stay hotels in Hoi An, Da Nang and Hanoi — an affordable workation base.',
    cta: 'Search Vietnam stays',
    badge: 'Long stay',
  },
  'feat-bali-activity': {
    productTitle: 'Bali tours & experiences',
    destination: 'Bali · Indonesia',
    desc: 'Ubud rice terraces, surf lessons and temple tours — things only Bali can offer.',
    cta: 'See Bali experiences',
    badge: 'Experiences',
  },
}

const JP: Record<string, Overlay> = {
  'hotel-booking': {
    desc: '世界中の宿泊予約。長期滞在・アパートメント・サービスレジデンスに最適。',
    cta: '宿を予約',
    badge: '長期滞在',
  },
  'hotel-tripcom': {
    desc: '宿・航空券・ツアーをひとつに。目的地別の長期滞在ホテルを検索。',
    cta: '宿を探す',
    badge: '宿 · 航空',
  },
  'activity-kkday': {
    desc: '現地ツアー・アクティビティ・入場券・交通パス。日本・台湾・東南アジアが充実。',
    cta: '体験を予約',
    badge: '現地体験',
  },
  'esim-airalo': {
    desc: '200カ国対応のeSIMを即時購入。到着前にインストールして並ばず接続。',
    cta: 'eSIMを購入',
    badge: 'eSIM',
  },
  'edu-inflearn': {
    name: 'Inflearn',
    desc: 'IT・開発・デザイン・ビジネス講座。移動中に学び、到着後すぐ実践。',
    cta: '講座を見る',
    badge: 'オンライン講座',
  },
  'insurance-safetywing': {
    desc: 'ノマド・長期滞在者向けの月単位トラベル保険。188カ国をカバー。',
    cta: '保険を見る',
    badge: '旅行保険',
  },
  'hotel-booking-visa': {
    displayTitle: '航空券・宿の予約',
    desc: 'ビザ申請に必要な航空券・宿泊の予約確認書を取得できます。',
    cta: '航空券・宿を予約',
    badge: '航空 · 宿',
  },
  'esim-airalo-visa': {
    desc: 'ビザ受領前にインストールしておけば入国後すぐ接続。200カ国対応。',
    cta: 'eSIMを購入',
    badge: 'eSIM',
  },
  'hotel-booking-market': {
    desc: '現地のホテル・アパートメント。市場調査の長期滞在に適した宿を。',
    cta: '宿を予約',
    badge: '長期滞在',
  },
  'stay-millennials-shibuya': {
    priceFrom: '₩40,000+',
    destination: '東京 · 日本',
    desc: 'ホテル内にコワーキング「.andwork」2フロア。渋谷駅徒歩6分、無料コーヒーとハッピーアワーも。',
    cta: '客室を見る', badge: 'コワーキング内蔵',
  },
  'stay-lively-osaka': {
    priceFrom: '₩80,000+',
    destination: '大阪 · 日本',
    desc: '作業できる共用ラウンジが7カ所。本町ビジネス地区、評価8.7（2,600件以上）。',
    cta: '客室を見る', badge: 'ラウンジワーク',
  },
  'stay-webase-hakata': {
    priceFrom: '₩30,000+',
    destination: '福岡 · 日本',
    desc: '9階の宿泊者無料コワーキング＋テラス。中洲川端駅徒歩3分、評価8.6。',
    cta: '客室を見る', badge: '無料コワーキング',
  },
  'stay-tribal-bali': {
    priceFrom: '₩20,000+',
    destination: 'チャングー、バリ · インドネシア',
    desc: 'バリ初のコワーキング特化型ステイ。プールサイドのワークスペースとノマドコミュニティ。',
    cta: '客室を見る', badge: 'ノマドの聖地',
  },
  'stay-chicland-danang': {
    priceFrom: '₩80,000+',
    destination: 'ダナン · ベトナム',
    desc: 'ミーケビーチ徒歩2分、カフェ風ラウンジとルーフトッププール。評価8.6。',
    cta: '客室を見る', badge: 'ビーチワーク',
  },
  'stay-playce-jeju': {
    priceFrom: '₩70,000+',
    destination: '済州 城山 · 韓国',
    desc: '寝室とワークデスクを分けた客室、ワーケーション専用パッケージも。城山日出峰近く。',
    cta: '客室を見る', badge: 'ワーケーション特化',
  },
  'stay-kantary-chiangmai': {
    priceFrom: '₩80,000+',
    destination: 'ニマン、チェンマイ · タイ',
    desc: 'キッチネット付きサービスアパート。長期滞在向け、マヤモール徒歩圏。',
    cta: '客室を見る', badge: '長期滞在',
  },
  'act-tokyo-disney': {
    priceFrom: '₩80,000+',
    productTitle: '東京ディズニーランド・シー チケット',
    destination: '東京 · 日本',
    desc: 'モバイルQRで即入場の1日券。ワーケーションの週末を特別に。',
    cta: '商品を見る', badge: '人気No.1',
  },
  'act-osaka-usj': {
    priceFrom: '₩80,000+',
    productTitle: 'USJ入場券',
    destination: '大阪 · 日本',
    desc: '1日券＋エクスプレスパスのオプション。並ばない大阪の週末。',
    cta: '商品を見る', badge: 'エクスプレス',
  },
  'act-fukuoka-bustour': {
    priceFrom: '₩80,000+',
    productTitle: '福岡近郊バスツアー',
    destination: '福岡 · 日本',
    desc: '太宰府・湯布院・別府を1日で。博多駅発。',
    cta: '商品を見る', badge: 'ガイド付き',
  },
  'act-bali-ubud': {
    priceFrom: '₩40,000+',
    productTitle: 'バリ ウブド プライベートツアー',
    destination: 'バリ · インドネシア',
    desc: '寺院・ライステラスを半日でカスタム。自由なコースで。',
    cta: '商品を見る', badge: 'プライベート',
  },
  'act-danang-banahills': {
    priceFrom: '₩100,000+',
    productTitle: 'ダナン バナヒルズ ツアー',
    destination: 'ダナン · ベトナム',
    desc: 'ゴールデンブリッジ、入場券・昼食・送迎込み。専用車の日帰りツアー。',
    cta: '商品を見る', badge: 'オールインクルーシブ',
  },
  'feat-tokyo-hotel': {
    productTitle: '東京の長期滞在ホテル',
    destination: '東京 · 日本',
    desc: 'アパートメント・サービスレジデンス・ビジネスホテル。ワーケーション向けに厳選。',
    cta: '東京の宿を検索',
    badge: '長期滞在',
  },
  'feat-osaka-hotel': {
    productTitle: '大阪のホテル・アパート',
    destination: '大阪 · 日本',
    desc: '宿・航空券・ツアーをひとつに。Trip.comで大阪の長期滞在ホテルを検索。',
    cta: '大阪の宿を検索',
    badge: '宿 · 航空',
  },
  'feat-fukuoka-hotel': {
    productTitle: '福岡ワーケーションの宿',
    destination: '福岡 · 日本',
    desc: '天神・博多のビジネスホテルとサービスアパート。韓国から最も近い海外拠点。',
    cta: '福岡の宿を検索',
    badge: '長期滞在',
  },
  'feat-bali-hotel': {
    productTitle: 'バリのヴィラ・リゾート',
    destination: 'バリ · インドネシア',
    desc: 'ウブド・クタ・スミニャックのヴィラやコリビング。長期滞在に最適。',
    cta: 'バリの宿を検索',
    badge: '長期滞在',
  },
  'feat-japan-activity': {
    productTitle: '日本の現地ツアー・体験',
    destination: '日本全域',
    desc: '東京・大阪・福岡の現地ツアー、交通パス、入場券をまとめて。',
    cta: '体験を見る',
    badge: '現地体験',
  },
  'feat-japan-esim': {
    productTitle: '日本eSIM 即時購入',
    destination: '日本',
    desc: '到着前にインストール。無制限・デイリープランを選択、200カ国対応。',
    cta: 'eSIMを購入',
    badge: 'eSIM',
  },
  'feat-vietnam-hotel': {
    productTitle: 'ホイアン・ダナンの宿',
    destination: 'ダナン · ベトナム',
    desc: 'ホイアン・ダナン・ハノイの長期滞在ホテル。快適でリーズナブルな拠点。',
    cta: 'ベトナムの宿を検索',
    badge: '長期滞在',
  },
  'feat-bali-activity': {
    productTitle: 'バリの現地ツアー・体験',
    destination: 'バリ · インドネシア',
    desc: 'ウブドのライステラス、サーフィン、寺院ツアー。バリだけの体験を。',
    cta: 'バリの体験を見る',
    badge: '現地体験',
  },
}

export function localizeAffiliateItem(item: AffiliateItem, lang: Lang): AffiliateItem {
  if (lang === 'KO') return item
  const overlay = (lang === 'EN' ? EN : JP)[item.id]
  return overlay ? { ...item, ...overlay } : item
}
