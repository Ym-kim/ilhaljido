import type { AffiliateItem } from './types'
import type { Lang } from '@/lib/i18n'

// ─────────────────────────────────────────────────────────────────────────────
// 제휴 상품 EN/JP 오버레이 — items.ts(KO 원본)를 건드리지 않고 표시 필드만 덮어씀
// 새 홈 피처드 상품 추가 시 여기에 EN/JP 항목도 함께 추가할 것
// ─────────────────────────────────────────────────────────────────────────────

type Overlay = Partial<Pick<AffiliateItem, 'productTitle' | 'destination' | 'desc' | 'cta' | 'badge'>>

const EN: Record<string, Overlay> = {
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
