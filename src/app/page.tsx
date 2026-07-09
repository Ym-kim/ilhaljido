'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, CheckCircle2, Search, Bell, ShieldCheck, BedDouble } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getHomeCategories, getDomesticCurrent, getDomesticThemedUpcoming } from '@/lib/i18n'
import { AiIcon, ICON_STROKE, PARTNER_ICONS } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'
import { FEATURED_STAYS, FEATURED_STAYS_V2 } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { MomentRail } from '@/components/home/MomentRail'
import { DestinationFinder } from '@/components/home/DestinationFinder'

// 홈 선배치 — 에디터 추천 실상품 (개별 호텔 상세 직결, 필터 지역 커버)
const ALL_STAYS = [...FEATURED_STAYS, ...FEATURED_STAYS_V2]
const HOME_EDITOR_PICKS = ALL_STAYS.filter((i) =>
  [
    'stay-millennials-shibuya',
    'stay-tribal-bali',
    'stay-playce-jeju',
    'stay-chicland-danang',
    'stay-kantary-chiangmai',
    'stay-adina-sydney',
    'stay-nomadshub-cebu',
  ].includes(i.id)
)

const PARTNER_ICON_MAP = {
  government: PARTNER_ICONS.government,
  space: PARTNER_ICONS.space,
  education: PARTNER_ICONS.education,
  corporate: PARTNER_ICONS.corporate,
}

const DEST_FILTERS = [
  { id: 'all',         labelKey: 'filter_all',         country: null },
  { id: 'japan',       labelKey: 'filter_japan',       country: '일본' },
  { id: 'korea',       labelKey: 'filter_korea',       country: '국내' },
  { id: 'bali',        labelKey: 'filter_bali',        country: '인도네시아' },
  { id: 'vietnam',     labelKey: 'filter_vietnam',     country: '베트남' },
  { id: 'thailand',    labelKey: 'filter_thailand',    country: '태국' },
  { id: 'philippines', labelKey: 'filter_philippines', country: '필리핀' },
  { id: 'australia',   labelKey: 'filter_australia',   country: '호주' },
] as const
type DestFilter = typeof DEST_FILTERS[number]['id']

// 히어로 목적지 퀵칩 — /select/hotel의 해당 도시 카드로 바로 연결
const HERO_DESTS = [
  { labelKey: 'dest_tokyo',   anchor: 'japan-tokyo' },
  { labelKey: 'dest_osaka',   anchor: 'japan-osaka' },
  { labelKey: 'dest_fukuoka', anchor: 'japan-fukuoka' },
  { labelKey: 'dest_bali',    anchor: 'indonesia-bali' },
  { labelKey: 'dest_danang',  anchor: 'vietnam-danang' },
  { labelKey: 'dest_chiangmai', anchor: 'thailand-chiangmai' },
  { labelKey: 'dest_jeju',    anchor: 'korea-jeju' },
] as const

const CATEGORY_PHOTOS: Record<string, string> = {
  teal:   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  blue:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  green:  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  orange: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  cyan:   'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
}

const THEME_ITEMS = [
  { labelKey: 'home_theme_healing_l',  descKey: 'home_theme_healing_d',  href: '/programs/healing',    emoji: '🧘', photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_network_l',  descKey: 'home_theme_network_d',  href: '/programs/networking', emoji: '🤝', photo: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_local_l',    descKey: 'home_theme_local_d',    href: '/programs/local',      emoji: '🗺️', photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_growth_l',   descKey: 'home_theme_growth_d',   href: '/growth',               emoji: '🚀', photo: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_japan_l',    descKey: 'home_theme_japan_d',    href: '/programs/global',     emoji: '🏯', photo: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_golf_l',     descKey: 'home_theme_golf_d',     href: '/programs/golf',       emoji: '⛳', photo: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80' },
  { labelKey: 'home_theme_sports_l',   descKey: 'home_theme_sports_d',   href: '/programs/sports',     emoji: '🏟️', photo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80' },
]

const SPACE_KEYS = [
  { titleKey: 'home_space_domestic_t', descKey: 'home_space_domestic_d', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { titleKey: 'home_space_global_t', descKey: 'home_space_global_d', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { titleKey: 'home_space_cowork_t', descKey: 'home_space_cowork_d', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
] as const

const STAT_KEYS = [
  ['home_stat_1_v', 'home_stat_1_l'],
  ['home_stat_2_v', 'home_stat_2_l'],
  ['home_stat_3_v', 'home_stat_3_l'],
  ['home_stat_4_v', 'home_stat_4_l'],
] as const

export default function HomePage() {
  const { lang, tr } = useLang()
  const [activeFilter, setActiveFilter] = useState<DestFilter>('all')
  // 히어로 목적지 선택 — CTA와 연동 (재클릭 시 해제)
  const [heroDest, setHeroDest] = useState<(typeof HERO_DESTS)[number] | null>(null)
  const categories = getHomeCategories()
  const recruitingPrograms = getDomesticCurrent(lang)
  const upcomingPrograms = getDomesticThemedUpcoming(lang).slice(0, 3)

  // 추천 실상품을 먼저, 도시 검색 카드를 뒤에 — 둘러보다 아래에서 검색으로 이어지는 흐름
  const merged = [...HOME_EDITOR_PICKS, ...HOME_FEATURED_ITEMS]
  const activeCountry = DEST_FILTERS.find((f) => f.id === activeFilter)?.country ?? null
  const featuredItems = (activeCountry === null
    ? merged
    : merged.filter((i) => i.country === activeCountry)
  ).map((i) => localizeAffiliateItem(i, lang))

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-16 md:pb-0">

      {/* ── 히어로 — 예약 의도형 ── */}
      <section className="relative min-h-[94vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/40 to-[#04121f]/15" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 md:pb-20">
          {/* 신뢰 배지 라인 */}
          <div className="animate-rise flex flex-wrap items-center gap-2 mb-5" style={{ animationDelay: '0.05s' }}>
            <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold px-3 py-1.5 rounded-full bg-white/12 text-white border border-white/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse inline-block" />
              {tr('h3_badge_pilot')}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[0.75rem] font-semibold px-3 py-1.5 rounded-full bg-white/8 text-white/90 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" strokeWidth={ICON_STROKE} />
              {tr('h3_badge_partner')}
            </span>
          </div>

          <h1
            className="animate-rise text-[2.6rem] sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-5 tracking-tight"
            style={{ animationDelay: '0.15s' }}
          >
            {tr('h3_title_pre')}
            <br />
            <span className="text-gradient-ocean">{tr('h3_title_accent')}</span>
            {tr('h3_title_post')}
          </h1>
          <p
            className="animate-rise text-white/90 text-base sm:text-lg font-medium max-w-xl mb-8"
            style={{ animationDelay: '0.25s' }}
          >
            {tr('h3_sub')}
          </p>

          {/* 목적지 퀵서치 카드 */}
          <div
            className="animate-rise max-w-3xl rounded-3xl bg-black/40 border border-white/15 backdrop-blur-xl p-5 sm:p-6 mb-6"
            style={{ animationDelay: '0.35s' }}
          >
            <p className="text-white/80 text-[0.8125rem] font-semibold mb-3 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              {tr('h3_search_label')}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {HERO_DESTS.map((d) => (
                <button
                  key={d.labelKey}
                  type="button"
                  onClick={() => setHeroDest(heroDest?.anchor === d.anchor ? null : d)}
                  className={`chip-dest ${heroDest?.anchor === d.anchor ? 'chip-dest-active' : ''}`}
                >
                  {tr(d.labelKey)}
                </button>
              ))}
            </div>
            <div className="h-px bg-white/10 mb-5" />
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href={heroDest ? `/select/hotel#${heroDest.anchor}` : '/select/hotel'}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light text-white font-bold text-[0.9375rem] px-6 py-3.5 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.45)]"
              >
                <BedDouble className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {tr('h3_cta_stay')}
                {heroDest && <span className="opacity-90">· {tr(heroDest.labelKey)}</span>}
              </Link>
              <Link
                href="/programs"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[0.9375rem] px-6 py-3.5 rounded-2xl border border-white/25 transition-all"
              >
                {tr('h3_cta_programs')}
                <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
          </div>

          {/* 통계 인라인 스트립 */}
          <div
            className="animate-rise flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{ animationDelay: '0.45s' }}
          >
            {STAT_KEYS.map(([v, l]) => (
              <p key={l} className="text-white/75 text-[0.8125rem] font-medium">
                <span className="text-white font-black text-base mr-1.5">{tr(v)}</span>
                {tr(l)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 워케이션 목적지 숙소 — 메인 상품 섹션 ── */}
      <section className="bg-white border-b border-[#dbeafe] pt-14 pb-10 md:pt-20 md:pb-14">
        {/* 헤더 */}
        <div className="max-w-6xl mx-auto px-6 mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
            <div>
              <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse inline-block" />
                Wakation Select · {tr('h3_sel_live')}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight">
                {tr('h3_sel_title_pre')}<br className="sm:hidden" />
                <span className="text-brand-mid">{tr('h3_sel_title_accent')}</span>
              </h2>
              <p className="text-[#64748b] text-sm mt-2.5">{tr('h3_sel_sub')}</p>
            </div>
            <Link
              href="/select"
              className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all"
            >
              {tr('view_all')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          {/* 목적지 필터 pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {DEST_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 inline-flex items-center text-sm font-semibold px-4.5 py-2 rounded-full border transition-all duration-150 ${
                  activeFilter === f.id
                    ? 'bg-[#111827] border-[#111827] text-white shadow-sm'
                    : 'bg-white border-[#dbeafe] text-[#475569] hover:border-[#93c5fd] hover:text-[#111827]'
                }`}
              >
                {tr(f.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* 카드 — 모바일: 2열 그리드 / lg+: 3열 그리드 */}
        <div className="grid grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-3 max-w-6xl sm:mx-auto">
          {featuredItems.map((item) => (
            <AffiliateCard key={item.id} item={item} visual />
          ))}
          {featuredItems.length === 0 && (
            <div className="col-span-2 lg:col-span-3 flex items-center justify-center h-40 rounded-2xl bg-[#f0f9ff] border border-[#dbeafe]">
              <p className="text-[#94a3b8] text-sm">{tr('h3_sel_empty')}</p>
            </div>
          )}
        </div>

        {/* 디스클로저 */}
        <div className="mt-6 px-6 max-w-6xl mx-auto space-y-1">
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('h3_disclosure')}
          </p>
        </div>
      </section>

      {/* ── 와케이션 모먼트 — 세로 숏츠형 에디터 큐레이션 ── */}
      <MomentRail />

      {/* ── 지금 모집 중 / 다음 라인업 ── */}
      <section className="bg-gradient-to-b from-[#04121f] to-[#0a1e33] border-b border-white/8 py-16 md:py-20 px-6 dark-surface">
        <div className="max-w-6xl mx-auto">
          {recruitingPrograms.length > 0 ? (
            <div className="space-y-5">
              <p className="text-sky-400 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
                {tr('home_recruiting_eyebrow')}
              </p>
              {recruitingPrograms.map((p) => (
                <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-brand-mid/30 transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <span className="absolute top-4 left-4 bg-brand-mid text-white text-xs font-black px-3 py-1 rounded-full">{tr('recruiting')}</span>
                    </div>
                    <div className="p-7 flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-white/40 text-xs flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
                          {p.region} · {p.duration}{p.date ? ` · ${p.date}` : ''}
                        </p>
                        <h2 className="text-xl font-black text-white mb-2">{p.name}</h2>
                        <p className="text-white/50 text-sm leading-relaxed mb-4">{p.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.includes.map((t) => (
                            <span key={t} className="flex items-center gap-1 bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full border border-white/10">
                              <CheckCircle2 className="w-3 h-3 text-brand-mid" strokeWidth={ICON_STROKE} />
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-5">
                        <div>
                          <span className="text-2xl font-black text-white">₩{p.price}</span>
                          <span className="text-white/40 text-sm ml-1">{tr('domestic_vat')}</span>
                          {p.originalPrice && (
                            <span className="ml-2 text-white/30 text-sm line-through">₩{p.originalPrice}</span>
                          )}
                        </div>
                        {p.href.startsWith('http') ? (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" className="bg-brand-mid text-white font-black px-6 py-3 rounded-full hover:bg-brand-light transition-all flex items-center gap-2 text-sm">
                            {tr('learn_more')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                          </a>
                        ) : (
                          <Link href={p.href} className="bg-brand-mid text-white font-black px-6 py-3 rounded-full hover:bg-brand-light transition-all flex items-center gap-2 text-sm">
                            {tr('learn_more')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
                <div>
                  <p className="text-sky-400 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse inline-block" />
                    Wakation Hosted · {tr('h3_lineup_eyebrow')}
                  </p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug tracking-tight">
                    {tr('h3_lineup_title_pre')}
                    <span className="text-sky-400">{tr('h3_lineup_title_accent')}</span>
                  </h2>
                  <p className="text-white/75 text-sm mt-2.5 max-w-xl leading-relaxed">
                    {tr('h3_lineup_sub')}
                  </p>
                </div>
                <Link
                  href="/apply"
                  className="shrink-0 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-[0_6px_24px_rgba(14,165,233,0.4)]"
                >
                  <Bell className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  {tr('h3_lineup_cta')}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingPrograms.map((p) => (
                  <Link
                    key={p.id}
                    href="/apply"
                    className="group relative rounded-3xl overflow-hidden block h-64 sm:h-72 border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(2,132,199,0.25)]"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/30 to-transparent" />
                    <span className="absolute top-4 left-4 text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-black/55 text-white border border-white/20 backdrop-blur-sm">
                      {p.theme}
                    </span>
                    <span className="absolute top-4 right-4 text-[0.7rem] font-bold px-2.5 py-1 rounded-full bg-sky-500/90 text-white shadow-md">
                      {p.date}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white/70 text-xs flex items-center gap-1 mb-1.5">
                        <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
                        {p.region}
                      </p>
                      <h3 className="text-white font-black text-lg leading-snug mb-2.5">{p.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-sky-300 text-[0.8125rem] font-bold group-hover:gap-2.5 transition-all">
                        <Bell className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                        {tr('h3_lineup_card_cta')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── 플랫폼 카테고리 ── */}
      <section className="bg-[#f0f9ff] py-14 md:py-20 px-4 sm:px-6 border-b border-[#dbeafe]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10">
            <SectionEyebrow>{tr('home_platform_eyebrow')}</SectionEyebrow>
            <SectionTitle className="mb-2">
              {tr('home_platform_title')}
            </SectionTitle>
            <p className="text-[#475569] text-sm leading-relaxed max-w-lg">{tr('home_platform_desc')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const photo = CATEGORY_PHOTOS[cat.id]
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group relative rounded-2xl overflow-hidden h-44 sm:h-52 block border border-[#dbeafe] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {photo && (
                    <img
                      src={photo}
                      alt={tr(cat.labelKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-black text-[0.9375rem] sm:text-lg leading-snug">{tr(cat.labelKey)}</h3>
                    <p className="text-white/60 text-[0.65rem] sm:text-xs mt-0.5 flex items-center gap-1">
                      {tr('learn_more')} <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 테마별 워케이션 ── */}
      <section className="bg-white py-14 md:py-20 px-4 sm:px-6 border-b border-[#dbeafe]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10">
            <SectionEyebrow>{tr('home_theme_eyebrow')}</SectionEyebrow>
            <SectionTitle className="mb-2">
              {tr('home_theme_title')}
            </SectionTitle>
            <p className="text-[#475569] text-sm leading-relaxed max-w-lg">{tr('home_theme_desc')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {THEME_ITEMS.map((t) => (
              <Link
                key={t.labelKey}
                href={t.href}
                className="group relative rounded-2xl overflow-hidden h-36 sm:h-44 block border border-[#dbeafe] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <img
                  src={t.photo}
                  alt={tr(t.labelKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5">
                  <p className="text-white font-bold text-sm sm:text-[0.9375rem] leading-snug">{tr(t.labelKey)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 목적지 추천 위저드 (룰베이스, API 0원) ── */}
      <DestinationFinder />

      {/* ── AI 비자·체류 ── */}
      <section className="dark-surface py-20 md:py-28 px-6 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0f0f0f] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionEyebrow onDark>{tr('home_ai_eyebrow')}</SectionEyebrow>
          <div className="flex justify-center mb-6">
            <span className="icon-tile icon-tile-lg icon-tile-on-dark">
              <AiIcon className="w-6 h-6" strokeWidth={ICON_STROKE} />
            </span>
          </div>
          <SectionTitle onDark className="mb-5 text-center">
            {tr('home_ai_title')}
          </SectionTitle>
          <p className="text-lead-on-dark mb-4">{tr('home_ai_desc')}</p>
          <p className="text-caption-on-dark mb-10 max-w-xl mx-auto">{tr('home_ai_desc2')}</p>
          <Link href="/visa-ai" className="btn-primary">
            {tr('home_ai_cta')}
            <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      {/* ── 공간 인프라 ── */}
      <section className="dark-surface py-20 md:py-28 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <SectionEyebrow onDark>{tr('home_infra_eyebrow')}</SectionEyebrow>
              <SectionTitle onDark className="leading-tight whitespace-pre-line">
                {tr('home_infra_title')}
              </SectionTitle>
            </div>
            <Link
              href="/infrastructure"
              className="text-emerald-400 text-[0.9375rem] font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all shrink-0"
            >
              {tr('view_all')}
              <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SPACE_KEYS.map((s) => (
              <Link
                key={s.titleKey}
                href="/infrastructure"
                className="group rounded-2xl overflow-hidden relative block h-72 border border-white/8"
              >
                <img src={s.img} alt={tr(s.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-white font-black text-lg mb-2">{tr(s.titleKey)}</h3>
                  <p className="text-caption-on-dark">{tr(s.descKey)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wakation 소개 (GEO 대응) ── */}
      <section className="bg-[#f0f9ff] border-t border-[#dbeafe] py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-4">ABOUT WAKATION</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-6 leading-tight">
                {tr('h3_about_title')}
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                {tr('h3_about_p1')}
              </p>
              <p className="text-[#64748b] text-sm leading-relaxed mb-8">
                {tr('h3_about_p2')}
              </p>
              <Link href="/programs" className="inline-flex items-center gap-2 text-brand-mid font-bold text-sm hover:gap-3 transition-all">
                {tr('h3_about_cta')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            <div className="space-y-3">
              {([
                { label: 'Wakation Hosted', descKey: 'h3_about_hosted_d', color: 'border-brand-mid/20 bg-white' },
                { label: 'Wakation Select', descKey: 'h3_about_select_d', color: 'border-blue-200 bg-white' },
                { label: 'Wakation Partner', descKey: 'h3_about_partner_d', color: 'border-purple-200 bg-white' },
              ] as const).map((item) => (
                <div key={item.label} className={`rounded-2xl border p-6 shadow-sm ${item.color}`}>
                  <p className="text-[#111827] font-black text-sm mb-2">{item.label}</p>
                  <p className="text-[#64748b] text-sm leading-relaxed">{tr(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (GEO/AI 검색 대응) ── */}
      <section className="bg-white border-t border-[#dbeafe] py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: '워케이션이란 무엇인가요?',
                    acceptedAnswer: { '@type': 'Answer', text: "Work(일)와 Vacation(휴가)의 합성어로, 일상적인 업무 공간을 벗어나 국내외 다양한 장소에서 일과 휴식·성장을 함께 누리는 새로운 업무 방식입니다. 프리랜서, 리모트워커, 1인 창업자에게 특히 적합합니다." },
                  },
                  {
                    '@type': 'Question',
                    name: 'Wakation은 어떤 서비스인가요?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Wakation은 일하는 사람을 위한 체류·업무·성장 플랫폼입니다. 국내 워케이션(Hosted), 해외 체류·어학연수·시장조사(Select), 지자체·공간·기업과의 B2B 파트너십(Partner) 세 축으로 운영됩니다.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Hosted 프로그램과 Select 상품의 차이는?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Hosted는 Wakation이 직접 기획하고 운영하는 공식 프로그램입니다. Select는 검증된 외부 파트너의 숙소·현지 체험·eSIM 상품을 큐레이션해 연결하는 제휴 서비스입니다.' },
                  },
                  {
                    '@type': 'Question',
                    name: '비자·체류 AI 서비스는 법적 효력이 있나요?',
                    acceptedAnswer: { '@type': 'Answer', text: '아닙니다. 비자·체류 AI 서비스는 국가별 비자 종류, 체류 기간, 서류 등을 안내하는 참고용 서비스입니다. 최종 확인은 반드시 해당 국가 대사관이나 전문 이민 변호사를 통해 받으시길 권장합니다.' },
                  },
                  {
                    '@type': 'Question',
                    name: '파트너십·제휴 문의는 어떻게 하나요?',
                    acceptedAnswer: { '@type': 'Answer', text: '지자체·공간 운영사·교육기관·기업 등 다양한 형태의 파트너십을 환영합니다. wakation.sf@gmail.com 또는 파트너십 페이지를 통해 문의해 주세요.' },
                  },
                ],
              }),
            }}
          />
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-4">{tr('h3_faq_eyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-10">{tr('h3_faq_title')}</h2>
          <div className="divide-y divide-[#dbeafe]">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <details key={n} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between list-none gap-4">
                  <span className="text-[#111827] font-bold text-[0.9375rem] leading-snug">{tr(`h3_faq_q${n}`)}</span>
                  <span className="text-[#94a3b8] group-open:rotate-45 transition-transform duration-200 text-2xl leading-none shrink-0">+</span>
                </summary>
                <p className="text-[#475569] text-sm leading-relaxed mt-3 pr-8">{tr(`h3_faq_a${n}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 파트너십 신뢰 배너 ── */}
      <section className="bg-[#f0f9ff] border-t border-[#dbeafe] py-7 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {(['government', 'space', 'education', 'corporate'] as const).map((k) => {
                const Icon = PARTNER_ICON_MAP[k]
                return (
                  <div key={k} className="w-8 h-8 rounded-full bg-[#ede9e2] border border-[#dbeafe] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-[#8a8a8a]" strokeWidth={ICON_STROKE} />
                  </div>
                )
              })}
            </div>
            <p className="text-[#7a7a7a] text-sm font-medium">{tr('home_partner_banner_text')}</p>
          </div>
          <Link href="/partnership" className="shrink-0 text-brand-mid text-sm font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">
            {tr('home_partner_banner_cta')} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      {/* ── 모바일 스티키 예약 바 ── */}
      <div className="sticky-cta-bar flex md:hidden">
        <Link
          href="/select/hotel"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-mid text-white font-bold text-sm px-4 py-3 rounded-xl"
        >
          <BedDouble className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {tr('h3_bar_stay')}
        </Link>
        <Link
          href="/apply"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0a1e33] text-white font-bold text-sm px-4 py-3 rounded-xl"
        >
          <Bell className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {tr('h3_bar_apply')}
        </Link>
      </div>
    </div>
  )
}
