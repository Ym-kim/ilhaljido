'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BedDouble, Sparkles, Wifi, BookOpen } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { ProductBrowser } from '@/components/affiliate/ProductBrowser'
import { CoupangGear } from '@/components/affiliate/CoupangGear'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'
import { ALL_AFFILIATE_ITEMS } from '@/lib/affiliate/items'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// Wakation Select 허브 — 2026-07-13 i18n 적용 (KO 하드코딩 잔존 해소, 인라인 3언어)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const COPY: Record<string, L> = {
  title1: { KO: '워케이션 준비,', EN: 'Your workation prep,', JP: 'ワーケーションの準備、' },
  title2a: { KO: '한 곳에서', EN: 'all in one place', JP: 'ここひとつで' },
  title2b: { KO: ' 끝내세요', EN: '', JP: '完結' },
  sub: {
    KO: '숙소 예약부터 현지 체험, eSIM, 온라인 강의까지. 워케이션에 맞는 외부 제휴 서비스를 목적지별로 큐레이션합니다.',
    EN: 'Stays, local experiences, eSIMs and online courses — partner services curated by destination for your workation.',
    JP: '宿の予約から現地体験、eSIM、オンライン講座まで。ワーケーションに合う提携サービスを目的地別にキュレーション。',
  },
  note: {
    KO: '외부 제휴 서비스이며 Wakation이 직접 운영하는 상품과 구분됩니다. 요금과 상품 조건은 제휴사 사이트에서 최종 확인됩니다.',
    EN: 'These are external partner services, separate from programs run by Wakation. Final prices and terms are confirmed on each partner site.',
    JP: '外部提携サービスであり、Wakation直営プログラムとは区別されます。料金·条件は提携先サイトでご確認ください。',
  },
  cat_label: { KO: '카테고리', EN: 'CATEGORIES', JP: 'カテゴリー' },
  browse: { KO: '둘러보기', EN: 'Browse', JP: '見てみる' },
  stays_eyebrow: { KO: '추천 숙소', EN: 'FEATURED STAYS', JP: 'おすすめの宿' },
  stays_title: { KO: 'Wakation 큐레이션 숙소', EN: 'Wakation curated stays', JP: 'Wakation厳選の宿' },
  see_all: { KO: '전체 보기', EN: 'See all', JP: 'すべて見る' },
  f_all: { KO: '전체', EN: 'All', JP: 'すべて' },
  f_japan: { KO: '일본', EN: 'Japan', JP: '日本' },
  f_bali: { KO: '발리', EN: 'Bali', JP: 'バリ' },
  etc_eyebrow: { KO: '이동 · 체험 · eSIM', EN: 'TRANSPORT · EXPERIENCES · eSIM', JP: '移動 · 体験 · eSIM' },
  etc_title: { KO: '도착하기 전 미리 준비하세요', EN: 'Get ready before you land', JP: '到着前に準備しておこう' },
  etc_sub: {
    KO: '항공·렌터카·공항픽업 등 이동부터, 현지 투어와 공항 도착 즉시 연결되는 eSIM까지',
    EN: 'From flights, car rental and airport pickup to local tours and an eSIM that connects on arrival',
    JP: '航空券·レンタカー·空港送迎などの移動から、現地ツアーと到着後すぐ繋がるeSIMまで',
  },
  all_activity: { KO: '현지 체험 전체 보기', EN: 'See all experiences', JP: '現地体験をすべて見る' },
  all_esim: { KO: 'eSIM 전체 보기', EN: 'See all eSIMs', JP: 'eSIMをすべて見る' },
  learn_eyebrow: { KO: '강의 · 학습', EN: 'COURSES · LEARNING', JP: '講座 · 学習' },
  learn_title: { KO: '🎓 워케이션 중 성장하는 강의', EN: '🎓 Courses that grow with your workation', JP: '🎓 ワーケーション中に成長する講座' },
  learn_desc: {
    KO: 'AI 자동화, 마케팅, 생산성. 인프런 파트너 강의 큐레이션.',
    EN: 'AI automation, marketing and productivity — curated Inflearn partner courses.',
    JP: 'AI自動化·マーケティング·生産性。インフラン提携講座のキュレーション。',
  },
  disc1: {
    KO: '* 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다. 외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.',
    EN: '* Some external links may earn Wakation a commission through affiliate programs. Booking, payment and refund terms follow each service’s own policies.',
    JP: '* 一部の外部リンクは提携プログラムを通じてWakationに収益が発生する場合があります。予約·決済·返金条件は各サービスの規約に従います。',
  },
  disc2: {
    KO: 'Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.',
    EN: 'Programs run by Wakation are distinct from external partner services.',
    JP: 'Wakation直営プログラムと外部提携サービスは区別されます。',
  },
  disc3: {
    KO: '요금과 상품 조건은 제휴사 사이트에서 최종 확인됩니다.',
    EN: 'Final prices and product terms are confirmed on partner sites.',
    JP: '料金·商品条件は提携先サイトで最終確認されます。',
  },
}

// 목적지 필터 (에어비앤비 스타일)
const DEST_FILTERS = [
  { id: 'all',   labelKey: 'f_all',   flag: '🌏' },
  { id: 'japan', labelKey: 'f_japan', flag: '🇯🇵' },
  { id: 'bali',  labelKey: 'f_bali',  flag: '🇮🇩' },
] as const
type DestFilter = typeof DEST_FILTERS[number]['id']

const CATEGORIES: {
  id: string
  href: string
  icon: typeof BedDouble
  label: L
  title: L
  badge: L
  badgeClass: string
  cardClass: string
  iconBg: string
  iconColor: string
  cta: string
}[] = [
  {
    id: 'hotel',
    href: '/select/hotel',
    icon: BedDouble,
    label: { KO: '숙소 예약', EN: 'Stays', JP: '宿の予約' },
    title: {
      KO: '목적지별 숙소 큐레이션',
      EN: 'Stays curated by destination',
      JP: '目的地別の宿キュレーション',
    },
    badge: { KO: '제휴', EN: 'Partner', JP: '提携' },
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cardClass: 'border-emerald-100 hover:border-emerald-200 hover:shadow-md',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    cta: 'text-emerald-600',
  },
  {
    id: 'activity',
    href: '/select/activity',
    icon: Sparkles,
    label: { KO: '현지 체험', EN: 'Experiences', JP: '現地体験' },
    title: {
      KO: '목적지별 투어·액티비티',
      EN: 'Tours and activities by destination',
      JP: '目的地別ツアー·アクティビティ',
    },
    badge: { KO: '제휴', EN: 'Partner', JP: '提携' },
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cardClass: 'border-emerald-100 hover:border-emerald-200 hover:shadow-md',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    cta: 'text-emerald-600',
  },
  {
    id: 'esim',
    href: '/select/esim',
    icon: Wifi,
    label: { KO: 'eSIM', EN: 'eSIM', JP: 'eSIM' },
    title: {
      KO: '목적지별 eSIM 즉시 구매',
      EN: 'Instant eSIMs by destination',
      JP: '目的地別eSIMを即購入',
    },
    badge: { KO: '큐레이션', EN: 'Curated', JP: '厳選' },
    badgeClass: 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    iconBg: 'bg-[#f5f3ef]',
    iconColor: 'text-[#7a7a7a]',
    cta: 'text-[#9a9a9a]',
  },
  {
    id: 'learn',
    href: '/select/learn',
    icon: BookOpen,
    label: { KO: '강의·학습', EN: 'Courses', JP: '講座·学習' },
    title: {
      KO: '워케이션 중 성장하는 강의',
      EN: 'Courses to grow during your stay',
      JP: '滞在中に成長する講座',
    },
    badge: { KO: '큐레이션', EN: 'Curated', JP: '厳選' },
    badgeClass: 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    iconBg: 'bg-[#f5f3ef]',
    iconColor: 'text-[#7a7a7a]',
    cta: 'text-[#9a9a9a]',
  },
]

export default function SelectPage() {
  const { lang } = useLang()
  const [activeFilter, setActiveFilter] = useState<DestFilter>('all')

  const allHotelItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-tokyo-hotel', 'feat-osaka-hotel', 'feat-fukuoka-hotel', 'feat-bali-hotel'].includes(i.id)
  )
  // ⚠️ 소스는 전체 카탈로그로 — HOME_FEATURED_ITEMS는 showOn 'home' 아이템만 담아
  //    홈 미노출 아이템(taxi 등)이 걸러지는 함정이 있음 (2026-07-16 실배포에서 발견)
  const etcItems = ALL_AFFILIATE_ITEMS.filter((i) =>
    // 여정 준비 활성 파트너: 항공·렌터카·공항픽업·택시·라운지(이동) + 체험 + eSIM
    [
      'feat-flight-tripcom', 'feat-carhire-tripcom', 'feat-transfer-klook', 'feat-taxi-booking',
      'feat-lounge-klook', 'feat-japan-activity', 'feat-bali-activity', 'feat-japan-esim',
    ].includes(i.id)
  )

  const hotelItems = activeFilter === 'all'
    ? allHotelItems
    : activeFilter === 'japan'
    ? allHotelItems.filter((i) => i.country === '일본')
    : allHotelItems.filter((i) => i.country === '인도네시아')

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 bg-[#f9f7f3] border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-5">
            WAKATION SELECT
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#141414] leading-[1.06] tracking-tight mb-5">
            {COPY.title1[lang]}<br />
            <span className="text-brand-mid">{COPY.title2a[lang]}</span>{COPY.title2b[lang]}
          </h1>
          <p className="text-[#5c5c5c] text-base md:text-lg leading-relaxed max-w-xl mb-3">
            {COPY.sub[lang]}
          </p>
          <p className="text-[#a0a0a0] text-xs">{COPY.note[lang]}</p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="px-6 py-10 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#a0a0a0] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4">
            {COPY.cat_label[lang]}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`group relative flex flex-col bg-white border rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 ${cat.cardClass}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.iconBg}`}>
                      <Icon className={`w-4 h-4 ${cat.iconColor}`} strokeWidth={ICON_STROKE} />
                    </div>
                    <span className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full border ${cat.badgeClass}`}>
                      {cat.badge[lang]}
                    </span>
                  </div>
                  <p className="text-[#141414] font-black text-sm mb-1">{cat.label[lang]}</p>
                  <p className="text-[#7a7a7a] text-[0.7rem] leading-relaxed line-clamp-2">{cat.title[lang]}</p>
                  <div className={`mt-4 flex items-center gap-1 text-[0.65rem] font-semibold transition-colors ${cat.cta} group-hover:text-brand-mid`}>
                    {COPY.browse[lang]}
                    <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 추천 숙소 상품 */}
      <section className="pb-14 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-2">
                {COPY.stays_eyebrow[lang]}
              </p>
              <h2 className="text-[#141414] font-black text-xl md:text-2xl">
                {COPY.stays_title[lang]}
              </h2>
            </div>
            <Link
              href="/select/hotel"
              className="text-brand-mid text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all shrink-0"
            >
              {COPY.see_all[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          {/* 목적지 필터 pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden mb-5">
            {DEST_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                  activeFilter === f.id
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-[#e5e1da] text-[#7a7a7a] hover:border-[#c8c4be] hover:text-[#4a4a4a]'
                }`}
              >
                <span>{f.flag}</span> {COPY[f.labelKey][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* 모바일: 2열 그리드 / lg+: 4열 */}
        <div className="grid grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-4 max-w-6xl sm:mx-auto">
          {hotelItems.map((item) => (
            <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
          ))}
        </div>
      </section>

      {/* 카테고리 탭 상품 브라우저 — 숙소·체험·eSIM·강의·크루즈·기획전 인라인 탐색 */}
      <ProductBrowser />

      {/* 체험·eSIM */}
      <section className="px-6 py-14 border-b border-[#e5e1da] bg-[#f9f7f3]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[#a0a0a0] text-xs font-bold tracking-widest uppercase mb-2">
              {COPY.etc_eyebrow[lang]}
            </p>
            <h2 className="text-[#141414] font-black text-xl md:text-2xl">
              {COPY.etc_title[lang]}
            </h2>
            <p className="text-[#7a7a7a] text-sm mt-1.5">{COPY.etc_sub[lang]}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {etcItems.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/select/activity"
              className="group flex items-center justify-between bg-white border border-[#e5e1da] hover:border-[#c8c4be] rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-[#5c5c5c] text-sm font-bold">{COPY.all_activity[lang]}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
            <Link
              href="/select/esim"
              className="group flex items-center justify-between bg-white border border-[#e5e1da] hover:border-[#c8c4be] rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-[#5c5c5c] text-sm font-bold">{COPY.all_esim[lang]}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      {/* 여행 준비물 — 쿠팡 파트너스 */}
      <CoupangGear />

      {/* 강의 배너 */}
      <section className="px-6 py-12 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select/learn"
            className="group flex items-center justify-between bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 hover:border-indigo-200 rounded-2xl p-6 transition-all hover:shadow-md"
          >
            <div>
              <p className="text-indigo-500 text-xs font-bold tracking-widest uppercase mb-2">
                {COPY.learn_eyebrow[lang]}
              </p>
              <p className="text-[#141414] font-black text-lg mb-1">{COPY.learn_title[lang]}</p>
              <p className="text-[#6b6b6b] text-sm">{COPY.learn_desc[lang]}</p>
            </div>
            <ArrowRight
              className="w-5 h-5 text-[#c0bdb8] group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-6"
              strokeWidth={ICON_STROKE}
            />
          </Link>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 pt-8">
        <div className="max-w-6xl mx-auto space-y-1">
          <p className="text-[#b8b4ae] text-[0.65rem] leading-relaxed max-w-2xl">{COPY.disc1[lang]}</p>
          <p className="text-[#c8c4be] text-[0.65rem] leading-relaxed max-w-2xl">{COPY.disc2[lang]}</p>
          <p className="text-[#c8c4be] text-[0.65rem] leading-relaxed max-w-2xl">{COPY.disc3[lang]}</p>
        </div>
      </section>
    </div>
  )
}
