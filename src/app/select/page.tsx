'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BedDouble, Sparkles, Wifi, BookOpen } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { useLang } from '@/context/LanguageContext'

// 목적지 필터 (에어비앤비 스타일)
const DEST_FILTERS = [
  { id: 'all',   labelKey: 'filter_all' },
  { id: 'japan', labelKey: 'filter_japan' },
  { id: 'bali',  labelKey: 'filter_bali' },
] as const
type DestFilter = typeof DEST_FILTERS[number]['id']

const CATEGORIES = [
  {
    id: 'hotel',
    href: '/select/hotel',
    icon: BedDouble,
    labelKey: 'nav_select_hotel',
    titleKey: 'sel_cat_hotel_t',
    desc: '도쿄·오사카·후쿠오카·다낭·발리·리스본·제주. Booking.com과 Trip.com으로 바로 검색.',
    badgeKey: 'sel_badge_active',
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
    labelKey: 'nav_select_activity',
    titleKey: 'sel_cat_act_t',
    desc: '일본·베트남·발리 현지 투어, 교통패스, 입장권. KKday·Klook 파트너 상품 큐레이션.',
    badgeKey: 'sel_badge_prep',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    iconBg: 'bg-[#f5f3ef]',
    iconColor: 'text-[#7a7a7a]',
    cta: 'text-[#9a9a9a]',
  },
  {
    id: 'esim',
    href: '/select/esim',
    icon: Wifi,
    labelKey: 'nav_select_esim',
    titleKey: 'sel_cat_esim_t',
    desc: '일본·베트남·발리·포르투갈. Airalo로 도착 전 설치, 공항에서 바로 연결.',
    badgeKey: 'sel_badge_ref',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    iconBg: 'bg-[#f5f3ef]',
    iconColor: 'text-[#7a7a7a]',
    cta: 'text-[#9a9a9a]',
  },
  {
    id: 'learn',
    href: '/select/learn',
    icon: BookOpen,
    labelKey: 'nav_select_learn',
    titleKey: 'sel_cat_learn_t',
    desc: 'AI 자동화, 마케팅, 생산성, 개발. 인프런 파트너 강의 카테고리 큐레이션.',
    badgeKey: 'sel_badge_prep',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
    cardClass: 'border-[#e5e1da] hover:border-[#d0ccc4] hover:shadow-sm',
    iconBg: 'bg-[#f5f3ef]',
    iconColor: 'text-[#7a7a7a]',
    cta: 'text-[#9a9a9a]',
  },
]

export default function SelectPage() {
  const { lang, tr } = useLang()
  const [activeFilter, setActiveFilter] = useState<DestFilter>('all')

  const allHotelItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-tokyo-hotel', 'feat-osaka-hotel', 'feat-fukuoka-hotel', 'feat-bali-hotel'].includes(i.id)
  )
  const etcItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-japan-activity', 'feat-japan-esim'].includes(i.id)
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
            {tr('sel_hub_t_pre')}<br />
            <span className="text-brand-mid">{tr('sel_hub_t_accent')}</span>{tr('sel_hub_t_post')}
          </h1>
          <p className="text-[#5c5c5c] text-base md:text-lg leading-relaxed max-w-xl mb-3">
            {tr('sel_hub_desc')}
          </p>
          <p className="text-[#a0a0a0] text-xs">
            {tr('sel_hub_note')}
          </p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="px-6 py-10 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#a0a0a0] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4">
            {tr('sel_cat_label')}
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
                      {tr(cat.badgeKey)}
                    </span>
                  </div>
                  <p className="text-[#141414] font-black text-sm mb-1">{tr(cat.labelKey)}</p>
                  <p className="text-[#7a7a7a] text-[0.7rem] leading-relaxed line-clamp-2">{tr(cat.titleKey)}</p>
                  <div className={`mt-4 flex items-center gap-1 text-[0.65rem] font-semibold transition-colors ${cat.cta} group-hover:text-brand-mid`}>
                    {tr('sel_browse')}
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
                {tr('sel_pop_eyebrow')}
              </p>
              <h2 className="text-[#141414] font-black text-xl md:text-2xl">
                {tr('sel_pop_title')}
              </h2>
            </div>
            <Link
              href="/select/hotel"
              className="text-brand-mid text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all shrink-0"
            >
              {tr('view_all')} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
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
                {tr(f.labelKey)}
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

      {/* 체험·eSIM */}
      <section className="px-6 py-14 border-b border-[#e5e1da] bg-[#f9f7f3]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[#a0a0a0] text-xs font-bold tracking-widest uppercase mb-2">
              {tr('sel_ready_eyebrow')}
            </p>
            <h2 className="text-[#141414] font-black text-xl md:text-2xl">
              {tr('sel_ready_title')}
            </h2>
            <p className="text-[#7a7a7a] text-sm mt-1.5">{tr('sel_ready_desc')}</p>
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
              <span className="text-[#5c5c5c] text-sm font-bold">{tr('sel_act_viewall')}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
            <Link
              href="/select/esim"
              className="group flex items-center justify-between bg-white border border-[#e5e1da] hover:border-[#c8c4be] rounded-xl p-4 transition-all hover:shadow-sm"
            >
              <span className="text-[#5c5c5c] text-sm font-bold">{tr('sel_esim_viewall')}</span>
              <ArrowRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-brand-mid transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      {/* 강의 배너 */}
      <section className="px-6 py-12 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select/learn"
            className="group flex items-center justify-between bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 hover:border-indigo-200 rounded-2xl p-6 transition-all hover:shadow-md"
          >
            <div>
              <p className="text-indigo-500 text-xs font-bold tracking-widest uppercase mb-2">
                {tr('sel_learn_banner_eyebrow')}
              </p>
              <p className="text-[#141414] font-black text-lg mb-1">{tr('sel_cat_learn_t')}</p>
              <p className="text-[#6b6b6b] text-sm">{tr('sel_learn_banner_d')}</p>
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
          <p className="text-[#b8b4ae] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('sel_disc_1')}
          </p>
          <p className="text-[#c8c4be] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('sel_disc_2')}
          </p>
        </div>
      </section>
    </div>
  )
}
