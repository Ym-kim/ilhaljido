import type { Lang } from '@/lib/i18n'
import type { DestinationEntry, LearnCategory, ServiceLink } from './destinations'
import { localizeOutboundHref } from './linkLocale'

// ─────────────────────────────────────────────────────────────────────────────
// /select/* 목적지·강의 데이터 EN/JP 오버레이
// destinations.ts(KO 원본)를 건드리지 않고 표시 필드만 번역
// 새 목적지/태그 추가 시 여기 사전에도 추가할 것
// ─────────────────────────────────────────────────────────────────────────────

const CITY_JP: Record<string, string> = {
  'japan-tokyo': '東京', 'japan-osaka': '大阪', 'japan-fukuoka': '福岡',
  'vietnam-danang': 'ダナン', 'vietnam-hcmc': 'ホーチミン',
  'indonesia-bali': 'バリ', 'portugal-lisbon': 'リスボン',
  'korea-jeju': '済州', 'korea-yangyang': '襄陽', 'korea-gangneung': '江陵',
  'activity-japan': '日本全域', 'activity-japan-fukuoka': '福岡',
  'activity-vietnam': 'ベトナム全域', 'activity-bali': 'バリ',
  'japan-kyoto': '京都', 'japan-okinawa': '沖縄',
  'thailand-chiangmai': 'チェンマイ', 'thailand-bangkok': 'バンコク',
  'vietnam-nhatrang': 'ニャチャン', 'philippines-cebu': 'セブ',
  'taiwan-taipei': '台北', 'singapore-city': 'シンガポール', 'korea-busan': '釜山',
  'japan-sapporo': '札幌', 'japan-kobe': '神戸',
  'japan-kawaguchiko': '河口湖', 'japan-kanazawa': '金沢', 'japan-yufuin': '湯布院',
  'indonesia-ubud': 'ウブド', 'indonesia-canggu': 'チャングー',
  'australia-sydney': 'シドニー', 'australia-melbourne': 'メルボルン', 'australia-goldcoast': 'ゴールドコースト',
  'china-shanghai': '上海', 'china-hongkong': '香港', 'china-guangzhou': '広州',
  'korea-seoul': 'ソウル', 'korea-sokcho': '束草', 'korea-jeonju': '全州', 'korea-yeosu': '麗水', 'thailand-phuket': 'プーケット',
  'japan-nagoya': '名古屋', 'japan-hiroshima': '広島', 'portugal-porto': 'ポルト', 'portugal-faro': 'ファーロ',
  'esim-japan': '日本', 'esim-vietnam': 'ベトナム', 'esim-indonesia': 'インドネシア・バリ',
  'esim-portugal': 'ポルトガル', 'esim-korea': '韓国', 'esim-global': 'グローバル',
}

const CITY_EN_OVERRIDE: Record<string, string> = {
  'activity-japan': 'All Japan',
  'activity-vietnam': 'All Vietnam',
  'esim-indonesia': 'Indonesia · Bali',
  'esim-global': 'Global',
}

const COUNTRY: Record<string, { EN: string; JP: string }> = {
  '일본': { EN: 'Japan', JP: '日本' },
  '베트남': { EN: 'Vietnam', JP: 'ベトナム' },
  '인도네시아': { EN: 'Indonesia', JP: 'インドネシア' },
  '포르투갈': { EN: 'Portugal', JP: 'ポルトガル' },
  '국내': { EN: 'Korea', JP: '韓国国内' },
  '한국': { EN: 'South Korea', JP: '韓国' },
  '200개국': { EN: '200+ countries', JP: '200カ国' },
  '태국': { EN: 'Thailand', JP: 'タイ' },
  '호주': { EN: 'Australia', JP: 'オーストラリア' },
  '중국': { EN: 'China', JP: '中国' },
  '홍콩': { EN: 'Hong Kong', JP: '香港' },
  '필리핀': { EN: 'Philippines', JP: 'フィリピン' },
  '대만': { EN: 'Taiwan', JP: '台湾' },
  '싱가포르': { EN: 'Singapore', JP: 'シンガポール' },
}

const TAG: Record<string, { EN: string; JP: string }> = {
  '장기체류 특화': { EN: 'Long-stay ready', JP: '長期滞在向け' },
  'Wi-Fi 완비': { EN: 'Fast Wi-Fi', JP: 'Wi-Fi完備' },
  '미식 도시': { EN: 'Food city', JP: '美食の街' },
  '한옥 스테이': { EN: 'Hanok stays', JP: '韓屋ステイ' },
  '밤바다 야경': { EN: 'Night-sea views', JP: '夜の海の景色' },
  '해안 산책로': { EN: 'Waterfront walks', JP: '海辺の遊歩道' },
  '교통 편리': { EN: 'Easy transit', JP: '交通便利' },
  '한국 근거리': { EN: 'Closest to Korea', JP: '韓国から最短' },
  '라멘·포장마차': { EN: 'Ramen & yatai', JP: 'ラーメン・屋台' },
  '해변 코워킹': { EN: 'Beach coworking', JP: 'ビーチコワーキング' },
  '무비자 45일': { EN: 'Visa-free 45d', JP: 'ノービザ45日' },
  '스타트업 허브': { EN: 'Startup hub', JP: 'スタートアップ都市' },
  '카페 문화': { EN: 'Café culture', JP: 'カフェ文化' },
  '노마드 메카': { EN: 'Nomad mecca', JP: 'ノマドの聖地' },
  '디지털 비자': { EN: 'Digital visa', JP: 'デジタルビザ' },
  'D8 비자': { EN: 'D8 visa', JP: 'D8ビザ' },
  '유럽 게이트웨이': { EN: 'Gateway to Europe', JP: '欧州ゲートウェイ' },
  '국내 워케이션 추천': { EN: 'Top Korea workation', JP: '国内ワーケーション推薦' },
  '자연+카페': { EN: 'Nature + cafés', JP: '自然＋カフェ' },
  '서퍼 성지': { EN: 'Surf town', JP: 'サーフィンの聖地' },
  '동해 뷰': { EN: 'East Sea view', JP: '東海ビュー' },
  '해변 뷰': { EN: 'Beach view', JP: 'ビーチビュー' },
  '카페거리': { EN: 'Café street', JP: 'カフェ通り' },
  '여름 시원한 워크': { EN: 'Cool summer work', JP: '夏も涼しいワーク' },
  '수프카레': { EN: 'Soup curry', JP: 'スープカレー' },
  '항구 야경': { EN: 'Harbor nights', JP: '港の夜景' },
  '온천 근교': { EN: 'Onsen nearby', JP: '温泉近郊' },
  '후지산 뷰': { EN: 'Mt. Fuji views', JP: '富士山ビュー' },
  '전통 거리': { EN: 'Historic streets', JP: '伝統の街並み' },
  '온천 마을': { EN: 'Onsen town', JP: '温泉の町' },
  '요가 리트릿': { EN: 'Yoga retreats', JP: 'ヨガリトリート' },
  '정글 뷰': { EN: 'Jungle views', JP: 'ジャングルビュー' },
  '서핑+코워킹': { EN: 'Surf + coworking', JP: 'サーフ＋コワーキング' },
  '노마드 카페': { EN: 'Nomad cafés', JP: 'ノマドカフェ' },
  '하버 뷰': { EN: 'Harbour views', JP: 'ハーバービュー' },
  '프리미엄 인프라': { EN: 'Premium infra', JP: 'プレミアムインフラ' },
  '커피 문화': { EN: 'Coffee culture', JP: 'コーヒー文化' },
  '도심 코워킹': { EN: 'CBD coworking', JP: '都心コワーキング' },
  '서퍼 비치': { EN: 'Surf beaches', JP: 'サーファービーチ' },
  '휴양 워크': { EN: 'Resort work', JP: 'リゾートワーク' },
  '와이탄 야경': { EN: 'Bund skyline', JP: '外灘の夜景' },
  '금융 허브': { EN: 'Finance hub', JP: '金融ハブ' },
  '캔톤페어': { EN: 'Canton Fair', JP: '広州交易会' },
  '소싱 거점': { EN: 'Sourcing base', JP: 'ソーシング拠点' },
  '전통+카페': { EN: 'Temples + cafés', JP: '伝統＋カフェ' },
  '조용한 몰입': { EN: 'Quiet focus', JP: '静かな没入' },
  '휴양+골프': { EN: 'Resort + golf', JP: 'リゾート＋ゴルフ' },
  '비치 워크': { EN: 'Beach work', JP: 'ビーチワーク' },
  '노마드 클래식': { EN: 'Nomad classic', JP: 'ノマドの定番' },
  '카페 천국': { EN: 'Café heaven', JP: 'カフェ天国' },
  '코워킹 허브': { EN: 'Coworking hub', JP: 'コワーキング拠点' },
  '미식 천국': { EN: 'Food heaven', JP: '美食天国' },
  '해변 리조트': { EN: 'Beach resorts', JP: 'ビーチリゾート' },
  '가성비': { EN: 'Great value', JP: 'コスパ良' },
  '어학+워케이션': { EN: 'Language + workation', JP: '語学＋ワーケーション' },
  '다이빙': { EN: 'Diving', JP: 'ダイビング' },
  '야시장': { EN: 'Night markets', JP: '夜市' },
  '비즈니스 허브': { EN: 'Business hub', JP: 'ビジネス拠点' },
  '크루즈 출항': { EN: 'Cruise port', JP: 'クルーズ出航' },
  '도심+바다': { EN: 'City + sea', JP: '都市＋海' },
  '해운대 코워킹': { EN: 'Haeundae coworking', JP: '海雲台コワーキング' },
  '투어·체험·교통패스': { EN: 'Tours & passes', JP: 'ツアー・交通パス' },
  '10,000+ 상품': { EN: '10,000+ products', JP: '10,000+商品' },
  '포장마차 투어': { EN: 'Yatai tour', JP: '屋台ツアー' },
  '지역 체험': { EN: 'Local experiences', JP: '地域体験' },
  '다낭·호치민·하노이': { EN: 'Da Nang · HCMC · Hanoi', JP: 'ダナン・HCMC・ハノイ' },
  '3,000+ 상품': { EN: '3,000+ products', JP: '3,000+商品' },
  '요가·서핑·투어': { EN: 'Yoga · surf · tours', JP: 'ヨガ・サーフ・ツアー' },
  '자연 체험': { EN: 'Nature experiences', JP: '自然体験' },
  '$11.50부터': { EN: 'From $11.50', JP: '$11.50から' },
  'Softbank·Docomo': { EN: 'Softbank · Docomo', JP: 'Softbank・Docomo' },
  '7일·15일·30일': { EN: '7 / 15 / 30 days', JP: '7・15・30日' },
  '데이터 무제한': { EN: 'Unlimited data', JP: 'データ無制限' },
  '발리 전용': { EN: 'Bali-ready', JP: 'バリ対応' },
  '즉시 개통': { EN: 'Instant activation', JP: '即時開通' },
  '유럽 로밍': { EN: 'EU roaming', JP: '欧州ローミング' },
  '30일+': { EN: '30+ days', JP: '30日+' },
  '귀국 후 단기': { EN: 'Short-term Korea', JP: '帰国後の短期' },
  'SKT·KT': { EN: 'SKT · KT', JP: 'SKT・KT' },
  '단일 eSIM으로 멀티국': { EN: 'One eSIM, many countries', JP: '1枚でマルチ国対応' },
  '여러 국가 출장': { EN: 'Multi-country trips', JP: '複数国の出張に' },
}

const LINK_LABEL: Record<string, { EN: string; JP: string }> = {
  '숙소 예약': { EN: 'Book stay', JP: '宿を予約' },
  '호텔 보기': { EN: 'See hotels', JP: 'ホテルを見る' },
  '일본 체험 보기': { EN: 'Japan activities', JP: '日本の体験' },
  '후쿠오카 체험': { EN: 'Fukuoka activities', JP: '福岡の体験' },
  '베트남 체험 보기': { EN: 'Vietnam activities', JP: 'ベトナムの体験' },
  '발리 체험 보기': { EN: 'Bali activities', JP: 'バリの体験' },
  'eSIM 구매': { EN: 'Get eSIM', JP: 'eSIM購入' },
  '전체 eSIM 보기': { EN: 'All eSIMs', JP: '全eSIMを見る' },
}

export function localizeDestination(entry: DestinationEntry, lang: Lang): DestinationEntry {
  if (lang === 'KO') return entry
  const city = lang === 'EN'
    ? (CITY_EN_OVERRIDE[entry.id] ?? entry.cityEn)
    : (CITY_JP[entry.id] ?? entry.cityEn)
  const links: ServiceLink[] = entry.links.map((l) => ({
    ...l,
    label: LINK_LABEL[l.label]?.[lang] ?? l.label,
    // 2026-08-14: Trip 시티 딥링크 등 파트너 링크를 사이트 언어에 매칭(검증 패턴만)
    href: localizeOutboundHref(l.href, lang),
  }))
  return {
    ...entry,
    city,
    country: COUNTRY[entry.country]?.[lang] ?? entry.country,
    tags: entry.tags.map((t) => TAG[t]?.[lang] ?? t),
    links,
  }
}

// ── /select/learn 카테고리 ──
const LEARN: Record<string, { EN: { title: string; desc: string }; JP: { title: string; desc: string } }> = {
  'learn-ai': {
    EN: { title: 'AI & automation', desc: 'ChatGPT, n8n, Make.com, Python — AI tools that boost your productivity on a workation.' },
    JP: { title: 'AI・業務自動化', desc: 'ChatGPT・n8n・Make.com・Python。ワーケーション中の生産性を高めるAIツール。' },
  },
  'learn-marketing': {
    EN: { title: 'Startup · marketing · branding', desc: 'Performance marketing, brand strategy and social — grow your business on the move.' },
    JP: { title: '起業・マーケ・ブランディング', desc: 'パフォーマンスマーケ、ブランド戦略、SNS運用。移動中に事業を育てる実践講座。' },
  },
  'learn-productivity': {
    EN: { title: 'Productivity · Notion', desc: 'Notion, Obsidian and Zettelkasten — build a work system that fits workation life.' },
    JP: { title: '生産性・Notion・自動化', desc: 'Notion・Obsidian・ツェッテルカステン。ワーケーションに合う業務システムを構築。' },
  },
  'learn-dev': {
    EN: { title: 'Development & programming', desc: 'Web, apps and cloud — technology that makes your workation freer.' },
    JP: { title: '開発・プログラミング', desc: 'Web・アプリ・クラウド。技術でワーケーションをもっと自由に。' },
  },
  'learn-language': {
    EN: { title: 'Languages & communication', desc: 'English, Japanese, Vietnamese — languages you can use right away on location.' },
    JP: { title: '語学・コミュニケーション', desc: '英語・日本語・ベトナム語。現地ですぐ使える語学講座。' },
  },
  'learn-finance': {
    EN: { title: 'Finance · tax · investing', desc: 'Freelancer tax, overseas income and investing — make workation costs work smarter.' },
    JP: { title: '財務・投資・税金', desc: 'フリーランスの税金、海外所得申告、投資。ワーケーション費用を賢く。' },
  },
}

export function localizeLearnCategory(cat: LearnCategory, lang: Lang): LearnCategory {
  if (lang === 'KO') return cat
  const o = LEARN[cat.id]?.[lang]
  const merged = o ? { ...cat, ...o } : cat
  // 2026-08-14: 인프런 카테고리 링크 /ko → /en·/ja (검증 패턴만)
  return { ...merged, href: localizeOutboundHref(merged.href, lang) }
}
