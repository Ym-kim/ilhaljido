'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, CheckCircle2, Search, Bell, ShieldCheck, BedDouble } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { getDomesticCurrent, getDomesticThemedUpcoming } from '@/lib/i18n'
import { ICON_STROKE, PARTNER_ICONS } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'
import { FEATURED_STAYS, FEATURED_STAYS_V2 } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { trackAffiliateClick, trackEvent } from '@/lib/track'
import { MoodExplorer } from '@/components/home/MoodExplorer'
import { DurationExplorer } from '@/components/home/DurationExplorer'
import { CityShowcase } from '@/components/home/CityShowcase'
import { MomentRail } from '@/components/home/MomentRail'
import { CollectionsSection } from '@/components/home/CollectionsSection'
import { HouseBanner } from '@/components/home/HouseBanner'
import { NotifySignup } from '@/components/home/NotifySignup'
import { SupportPromoBanner } from '@/components/home/SupportPromoBanner'
import { PromoTicker } from '@/components/home/PromoTicker'
import { GeoJapanBanner } from '@/components/home/GeoJapanBanner'
import { MoreExplore } from '@/components/home/MoreExplore'
import { YangyangProof } from '@/components/home/YangyangProof'
import { UpcomingCohorts } from '@/components/programs/UpcomingCohorts'

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
    'stay-lyf-sukhumvit-bangkok',
    'stay-citizenm-taipei',
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

// CATEGORY_PHOTOS·THEME_ITEMS 제거(2026-07-28 라이프스타일 홈 개편):
// 플랫폼 카테고리 섹션은 GrowthEngines·About과 중복이라 홈에서 내림(페이지들은 네비로 접근 유지),
// 테마 섹션은 MoodExplorer가 흡수(healing·networking·onsen·domestic 직결. golf·sports·local은 /programs 허브에서 접근)

export default function HomePage() {
  const { lang, tr } = useLang()
  const bookingNote = ({ KO: '예약 전 확인', EN: 'Before booking', JP: '予約前の確認' } as const)[lang]
  const [activeFilter, setActiveFilter] = useState<DestFilter>('all')
  // 히어로 목적지 선택 — CTA와 연동 (재클릭 시 해제)
  const [heroDest, setHeroDest] = useState<(typeof HERO_DESTS)[number] | null>(null)
  const [heroQuery, setHeroQuery] = useState('')

  // 통합 검색 — 입력 도시로 Booking 검색결과 직행(aid 추적). 하나투어식 상단 검색.
  const submitHeroSearch = () => {
    const q = heroQuery.trim()
    if (!q) return
    try { trackAffiliateClick({ provider: 'Booking.com', status: 'active_affiliate', id: 'hero-search' }) } catch {}
    window.open(`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer')
  }
  const recruitingPrograms = getDomesticCurrent(lang)
  const upcomingPrograms = getDomesticThemedUpcoming(lang).slice(0, 3)

  // 추천 실상품을 먼저, 도시 검색 카드를 뒤에 — 둘러보다 아래에서 검색으로 이어지는 흐름
  const merged = [...HOME_EDITOR_PICKS, ...HOME_FEATURED_ITEMS]
  const activeCountry = DEST_FILTERS.find((f) => f.id === activeFilter)?.country ?? null
  // 수익 추적 활성(active_affiliate/api_ready) 카드를 상단에 — 노출당 기대 커미션 극대화 (안정 정렬)
  const ACTIVE = new Set(['active_affiliate', 'api_ready'])
  const featuredItems = (activeCountry === null
    ? merged
    : merged.filter((i) => i.country === activeCountry)
  )
    .map((i, idx) => ({ i, idx }))
    .sort((a, b) => (ACTIVE.has(b.i.status) ? 1 : 0) - (ACTIVE.has(a.i.status) ? 1 : 0) || a.idx - b.idx)
    // 홈은 탐색의 시작점: 전 카탈로그를 늘어놓지 않고 에디터 픽 6개만 보여준다.
    // 전체 상품은 /select에서 필터·비교하도록 연결해 모바일 스크롤과 선택 피로를 줄인다.
    .slice(0, 6)
    .map(({ i }) => localizeAffiliateItem(i, lang))

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-16 md:pb-0">

      {/* ── 히어로 — 목적지 결정 → 예약/프로그램의 두 갈래 전환 구조 ── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden dark-surface pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="absolute inset-0">
          {/* LCP 이미지 — next/image 반응형 srcset·priority (모바일 대역폭·속도 개선) */}
          <Image
            src="/covers/home-hero-real.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-[#04121f]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/45 to-[#04121f]/20 lg:bg-gradient-to-r lg:from-[#04121f]/95 lg:via-[#04121f]/65 lg:to-[#04121f]/20" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid min-w-0 items-end gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.82fr)] lg:gap-12 xl:gap-20">
            <div className="min-w-0 lg:pb-2">
              {/* 실제 운영·제휴 신뢰 신호 */}
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
                className="animate-rise text-[2.45rem] sm:text-6xl md:text-7xl font-black text-white leading-[1.04] mb-4 sm:mb-5 tracking-tight"
                style={{ animationDelay: '0.15s' }}
              >
                {tr('h3_title_pre')}
                <br />
                <span className="text-gradient-ocean">{tr('h3_title_accent')}</span>
                {tr('h3_title_post')}
              </h1>
              <span
                className="animate-rise block text-white/90 text-[0.9375rem] sm:text-lg font-medium max-w-xl leading-relaxed"
                style={{ animationDelay: '0.25s' }}
              >
                {tr('h3_sub')}
              </span>

              {/* 수치 스트립 제거(2026-07-28) — 첫 화면은 감정·행동 전달에 집중, 실적은 YangyangProof 섹션이 담당 */}
            </div>

            {/* 목적지 퀵서치 카드 */}
            <div
              className="animate-rise w-full min-w-0 rounded-[1.75rem] bg-[#061927]/80 border border-white/20 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_24px_80px_rgba(1,12,22,0.45)]"
              style={{ animationDelay: '0.32s' }}
            >
              <span className="text-white/85 text-[0.8125rem] font-semibold mb-3 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                {tr('h3_search_label')}
              </span>
            {/* 통합 검색창 — 도시 입력 → Booking 검색결과 직행(제휴 추적) */}
            <form
              onSubmit={(e) => { e.preventDefault(); submitHeroSearch() }}
              className="flex gap-2 mb-3"
            >
              {/* min-w-0: input의 flex 기본 min-width:auto가 긴 placeholder 폭만큼 버텨
                  모바일에서 버튼이 카드 밖으로 밀려 짤리던 버그 수정 (375px 실측) */}
              <div className="flex items-center gap-2 flex-1 min-w-0 bg-white/10 border border-white/20 rounded-2xl px-3.5 focus-within:border-sky-300/60 transition-colors">
                <Search className="w-4 h-4 text-white/60 shrink-0" strokeWidth={ICON_STROKE} />
                <input
                  type="text"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder={tr('h3_search_ph')}
                  aria-label={tr('h3_search_ph')}
                  className="flex-1 min-w-0 bg-transparent py-3 text-[0.9375rem] text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-brand-mid hover:bg-brand-light text-white font-bold text-sm min-w-12 px-4 sm:px-5 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Search className="w-4 h-4 sm:hidden" strokeWidth={ICON_STROKE} />
                <span className="hidden sm:inline">{tr('h3_search_go')}</span>
              </button>
            </form>
            <span className="block text-white/50 text-[0.7rem] font-medium mb-3">{tr('h3_search_or')}</span>
            <div className="flex flex-nowrap lg:flex-wrap gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {HERO_DESTS.map((d) => (
                <button
                  key={d.labelKey}
                  type="button"
                  onClick={() => setHeroDest(heroDest?.anchor === d.anchor ? null : d)}
                  className={`chip-dest shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${heroDest?.anchor === d.anchor ? 'chip-dest-active' : ''}`}
                >
                  {tr(d.labelKey)}
                </button>
              ))}
            </div>
            <div className="h-px bg-white/10 my-4" />
            <div className="flex flex-col gap-2.5">
              <Link
                href={heroDest ? `/select/hotel#${heroDest.anchor}` : '/select/hotel'}
                onClick={() => trackEvent('hero_cta_click', { cta: 'stay', dest: heroDest?.anchor ?? 'none' })}
                className="inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light text-white font-bold text-[0.9375rem] px-6 py-3.5 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <BedDouble className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {tr('h3_cta_stay')}
                {heroDest && <span className="opacity-90">· {tr(heroDest.labelKey)}</span>}
              </Link>
              <Link
                href="/programs"
                onClick={() => trackEvent('hero_cta_click', { cta: 'programs' })}
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 text-white/90 font-bold text-sm px-6 py-3 rounded-2xl border border-white/18 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                {tr('h3_cta_programs')}
                <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 프로모 티커 — 제휴 상품 롤링 배너 (호버 시 정지) ── */}
      <PromoTicker />

      {/* ── 국가 지정 노출: 일본 접속자 전용 컨텍스트 배너 (그 외 국가엔 미노출) ── */}
      <GeoJapanBanner />

      {/* ── 무드 탐색 — 감정·상황으로 먼저 (2026-07-28 라이프스타일 개편, 탐색 1축) ── */}
      <MoodExplorer />

      {/* ── 기간 탐색 — 쓸 수 있는 날짜로 고르기 (탐색 2축) ── */}
      <DurationExplorer />

      {/* ── 지금 떠나기 좋은 도시 — locale별 순서 분기(KO=일본 단기 / JP=제주 우선) ── */}
      <CityShowcase />

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
        <div className="grid grid-cols-1 gap-3 px-4 min-[520px]:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-3 max-w-6xl sm:mx-auto">
          {featuredItems.map((item) => (
            <AffiliateCard key={item.id} item={item} visual />
          ))}
          {featuredItems.length === 0 && (
            <div className="col-span-1 flex h-40 items-center justify-center rounded-2xl border border-[#dbeafe] bg-[#f0f9ff] min-[520px]:col-span-2 lg:col-span-3">
              <p className="text-[#94a3b8] text-sm">{tr('h3_sel_empty')}</p>
            </div>
          )}
        </div>

        {/* 디스클로저 */}
        <details className="group mx-auto mt-6 max-w-6xl border-t border-[#e8e4dd] px-6 pt-4">
          <summary className="w-fit cursor-pointer list-none text-[0.7rem] font-bold text-[#77716a] underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
            {bookingNote}
            <span aria-hidden="true" className="ml-1 inline-block transition-transform group-open:rotate-45">+</span>
          </summary>
          <span className="mt-3 block max-w-2xl text-[0.65rem] leading-relaxed text-[#918b83]">{tr('h3_disclosure')}</span>
        </details>
      </section>

      {/* ── 테마 기획전 — 목적지별 숙소·체험·eSIM·항공 큐레이션 묶음 ── */}
      <CollectionsSection />

      {/* ── 와케이션 모먼트 — 세로 숏츠형 에디터 큐레이션 ── */}
      <MomentRail />

      {/* ── 하우스 배너 — 자사 제휴·기획전 프로모(랜덤 광고 대체) ── */}
      <HouseBanner />

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
                      <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 288px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
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

              {/* 오픈 알림 이메일 수집 — 신청 전 단계 트래픽을 리드로 전환 */}
              <div className="mt-8 max-w-xl">
                <NotifySignup />
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── 확정 모집 회차 (Supabase 라이브) — 활성 프로그램을 메인에 바로 노출 ── */}
      {/* 데이터 없으면 자동 숨김. 운영자가 HELD에서 회차를 풀면 즉시 메인 노출됨 */}
      <UpcomingCohorts />

      {/* ── 양양 1기 완료 증거 — 실운영 신뢰 + 리드 수집 ── */}
      <YangyangProof />

      {/* ── 지원사업 프로모 배너 — 정부 지원 훅 ── */}
      <SupportPromoBanner />

      {/* ── 홈 다이어트 v2 (2026-07-28): GrowthEngines·Learning·Tools·DestinationFinder·
          비자AI·Sponsor·인프라 7개 무거운 섹션 → MoreExplore 컴팩트 링크 그리드 1개로 압축.
          컴포넌트·페이지·URL 전부 보존(전용 페이지에서 계속 서비스) — 홈 노출만 축소 */}
      <MoreExplore />

      {/* ── 비자AI·Media·Sponsor·인프라 섹션은 MoreExplore로 이관 (2026-07-28 v2) — 전용 페이지 유지 ── */}

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
