'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { IconTile } from '@/components/brand/IconTile'
import { useLang } from '@/context/LanguageContext'
import { getHomeCategories, getDomesticCurrent } from '@/lib/i18n'
import {
  AiIcon,
  CATEGORY_ACCENT,
  CATEGORY_GLOW,
  CATEGORY_ICONS,
  ICON_STROKE,
  PARTNER_ICONS,
} from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'

const PARTNER_ICON_MAP = {
  government: PARTNER_ICONS.government,
  space: PARTNER_ICONS.space,
  education: PARTNER_ICONS.education,
  corporate: PARTNER_ICONS.corporate,
}

const DEST_FILTERS = [
  { id: 'all',   label: '전체',  flag: '🌏' },
  { id: 'japan', label: '일본',  flag: '🇯🇵' },
  { id: 'bali',  label: '발리',  flag: '🇮🇩' },
] as const
type DestFilter = typeof DEST_FILTERS[number]['id']

const THEME_ITEMS = [
  { labelKey: 'home_theme_healing_l', descKey: 'home_theme_healing_d', href: '/programs/healing', emoji: '🧘' },
  { labelKey: 'home_theme_network_l', descKey: 'home_theme_network_d', href: '/programs/networking', emoji: '🤝' },
  { labelKey: 'home_theme_local_l', descKey: 'home_theme_local_d', href: '/programs/local', emoji: '🗺️' },
  { labelKey: 'home_theme_growth_l', descKey: 'home_theme_growth_d', href: '/growth', emoji: '🚀' },
  { labelKey: 'home_theme_japan_l', descKey: 'home_theme_japan_d', href: '/programs/global', emoji: '🏯' },
  { labelKey: 'home_theme_golf_l', descKey: 'home_theme_golf_d', href: '/programs/golf', emoji: '⛳' },
  { labelKey: 'home_theme_sports_l', descKey: 'home_theme_sports_d', href: '/programs/sports', emoji: '🏟️' },
] as const

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
  const categories = getHomeCategories()
  const recruitingPrograms = getDomesticCurrent(lang)

  const featuredItems = activeFilter === 'all'
    ? HOME_FEATURED_ITEMS
    : HOME_FEATURED_ITEMS.filter((i) => {
        if (activeFilter === 'japan') return i.country === '일본'
        if (activeFilter === 'bali') return i.country === '인도네시아'
        return true
      })

  return (
    <div className="min-h-screen bg-[#0f0f0f]">

      {/* ── 히어로 ── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-24 md:pb-28">
          <SectionEyebrow onDark pill>
            {tr('hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6 whitespace-pre-line tracking-tight">
            {tr('hero_sub')}
          </h1>
          <p className="text-lead-on-dark max-w-2xl mb-10">{tr('hero_desc')}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/programs" className="btn-primary">
              {tr('hero_cta1')}
            </Link>
            <Link href="/visa-ai" className="btn-secondary">
              {tr('hero_cta2')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 워케이션 목적지 숙소 — 메인 상품 섹션 ── */}
      <section className="bg-white border-b border-[#e5e1da] pt-14 pb-10 md:pt-20 md:pb-14">
        {/* 헤더 */}
        <div className="max-w-6xl mx-auto px-6 mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
            <div>
              <p className="text-brand-mid text-[0.65rem] font-black tracking-[0.18em] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse inline-block" />
                WAKATION SELECT · 지금 예약 가능
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#141414] leading-tight tracking-tight">
                워케이션 목적지 숙소,<br className="sm:hidden" />
                <span className="text-brand-mid"> 지금 바로 예약</span>하세요
              </h2>
              <p className="text-[#7a7a7a] text-sm mt-3">
                Booking.com · Trip.com 제휴 할인 · 장기체류 특화
              </p>
            </div>
            <Link
              href="/select"
              className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all"
            >
              전체 상품 보기 <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          {/* 목적지 필터 pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {DEST_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-150 ${
                  activeFilter === f.id
                    ? 'bg-[#141414] border-[#141414] text-white shadow-sm'
                    : 'bg-white border-[#e5e1da] text-[#7a7a7a] hover:border-[#c8c4be] hover:text-[#141414]'
                }`}
              >
                <span>{f.flag}</span> {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 카드 — 모바일: 수평 스냅 스크롤 / sm+: 3열 그리드 */}
        <div className="
          flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-6
          sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:px-6
          lg:grid-cols-3 max-w-6xl sm:mx-auto
          [&::-webkit-scrollbar]:hidden
        ">
          {featuredItems.map((item) => (
            <div key={item.id} className="min-w-[78vw] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink sm:flex-initial">
              <AffiliateCard item={item} visual />
            </div>
          ))}
          {featuredItems.length === 0 && (
            <div className="min-w-[78vw] sm:col-span-3 flex items-center justify-center h-40 rounded-2xl bg-[#f9f7f3] border border-[#e5e1da]">
              <p className="text-[#a0a0a0] text-sm">준비 중인 목적지입니다</p>
            </div>
          )}
        </div>

        {/* 디스클로저 */}
        <div className="mt-6 px-6 max-w-6xl mx-auto space-y-1">
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">
            * 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다.
            외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.
            Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.
          </p>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section className="bg-white border-b border-[#e5e1da] py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STAT_KEYS.map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl md:text-4xl font-black text-[#141414] mb-2">{tr(v)}</p>
              <p className="text-sm font-semibold text-[#7a7a7a]">{tr(l)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 지금 모집 중 ── */}
      <section className="bg-[#0f0f0f] border-b border-white/8 py-14 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
            {recruitingPrograms.length > 0 && <span className="w-2 h-2 rounded-full bg-brand-mid animate-pulse inline-block" />}
            {recruitingPrograms.length > 0 ? tr('home_recruiting_eyebrow') : tr('home_recruiting_coming_title')}
          </p>
          {recruitingPrograms.length > 0 ? (
            <div className="space-y-5">
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
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white font-black text-lg mb-2">{tr('home_recruiting_coming_title')}</p>
              <p className="text-white/50 text-sm mb-6">{tr('home_recruiting_coming_desc')}</p>
              <a href="mailto:wakation.sf@gmail.com" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
                {tr('inquire')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 플랫폼 카테고리 ── */}
      <section className="bg-[#f9f7f3] py-20 md:py-28 px-6 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionEyebrow>{tr('home_platform_eyebrow')}</SectionEyebrow>
            <SectionTitle className="mb-4 text-center">
              {tr('home_platform_title')}
            </SectionTitle>
            <p className="text-[#6b6b6b] text-base leading-relaxed max-w-xl mx-auto">{tr('home_platform_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id]
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="card-light group p-7 flex flex-col gap-5 hover:border-[#d0ccc4] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <IconTile icon={Icon} size="lg" />
                  <div>
                    <h3 className="text-xl font-black mb-2 text-[#141414]">{tr(cat.labelKey)}</h3>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed">{tr(cat.descKey)}</p>
                  </div>
                  <span className="text-[0.875rem] font-semibold text-[#aaa9a6] group-hover:text-brand-mid transition-colors flex items-center gap-1.5 mt-auto">
                    {tr('learn_more')}
                    <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 테마별 워케이션 ── */}
      <section className="bg-white py-20 md:py-28 px-6 border-b border-[#e5e1da]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <SectionEyebrow>{tr('home_theme_eyebrow')}</SectionEyebrow>
            <SectionTitle className="mb-3 text-center">
              {tr('home_theme_title')}
            </SectionTitle>
            <p className="text-[#6b6b6b] text-base leading-relaxed max-w-xl mx-auto">{tr('home_theme_desc')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {THEME_ITEMS.map((t) => (
              <Link
                key={t.labelKey}
                href={t.href}
                className="group flex items-center gap-3 bg-white hover:bg-[#f9f7f3] border border-[#e5e1da] hover:border-brand-mid/30 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="text-2xl">{t.emoji}</span>
                <div className="text-left">
                  <p className="text-[#141414] font-bold text-[0.9375rem] leading-tight">{tr(t.labelKey)}</p>
                  <p className="text-[#7a7a7a] text-xs mt-0.5 max-w-[200px] leading-relaxed">{tr(t.descKey)}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#c8c4be] group-hover:text-brand-mid transition-colors ml-2 shrink-0" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

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
      <section className="bg-[#f9f7f3] border-t border-[#e5e1da] py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-4">ABOUT WAKATION</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#141414] mb-6 leading-tight">
                Wakation이란?
              </h2>
              <p className="text-[#4a4a4a] text-base leading-relaxed mb-6">
                Wakation은 <strong className="text-[#141414]">일하는 사람을 위한 체류·업무·성장 플랫폼</strong>입니다. 단순한 여행이나 숙박 예약이 아니라, 워케이션·어학연수·시장조사·비자 정보·장기체류까지 — 일과 이동을 연결하는 모든 경험을 하나의 플랫폼에서 제공합니다.
              </p>
              <p className="text-[#7a7a7a] text-sm leading-relaxed mb-8">
                프리랜서·1인 창업자·리모트워커·디지털 노마드를 위해 설계되었으며, 현재 베타 운영 중입니다. Wakation이 직접 기획하고 운영하는 <strong className="text-[#4a4a4a]">Hosted 프로그램</strong>을 중심으로, 검증된 외부 파트너 상품은 <strong className="text-[#4a4a4a]">Select 상품</strong>으로 순차 연결 예정입니다.
              </p>
              <Link href="/programs" className="inline-flex items-center gap-2 text-brand-mid font-bold text-sm hover:gap-3 transition-all">
                전체 프로그램 보기 <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            <div className="space-y-3">
              {([
                { label: 'Wakation Hosted', desc: 'Wakation이 직접 기획·운영하는 공식 프로그램. 국내 워케이션, 해외 성장캠프, 시장조사단 등 전 과정을 책임집니다.', color: 'border-brand-mid/20 bg-white' },
                { label: 'Wakation Select', desc: '목적지별 숙소·현지 체험·eSIM을 큐레이션합니다. Booking.com, Trip.com, KKday, Airalo 등 검증된 외부 파트너 상품을 지금 바로 확인할 수 있습니다.', color: 'border-blue-200 bg-white' },
                { label: 'Wakation Partner', desc: '지자체·기업·공간 운영사와의 B2B 제휴를 통해 Wakation 생태계를 함께 만들어갑니다.', color: 'border-purple-200 bg-white' },
              ] as const).map((item) => (
                <div key={item.label} className={`rounded-2xl border p-6 shadow-sm ${item.color}`}>
                  <p className="text-[#141414] font-black text-sm mb-2">{item.label}</p>
                  <p className="text-[#7a7a7a] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (GEO/AI 검색 대응) ── */}
      <section className="bg-white border-t border-[#e5e1da] py-16 md:py-20 px-6">
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
          <p className="text-brand-mid text-xs font-bold tracking-widest uppercase mb-5">자주 묻는 질문</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#141414] mb-10">Wakation, 궁금하신 점이 있으신가요?</h2>
          <div className="divide-y divide-[#e5e1da]">
            {([
              { q: '워케이션이란 무엇인가요?', a: 'Work(일)와 Vacation(휴가)의 합성어로, 일상적인 업무 공간을 벗어나 국내외 다양한 장소에서 일과 휴식·성장을 함께 누리는 새로운 업무 방식입니다. 프리랜서, 리모트워커, 1인 창업자에게 특히 적합합니다.' },
              { q: 'Wakation은 어떤 서비스인가요?', a: 'Wakation은 일하는 사람을 위한 체류·업무·성장 플랫폼입니다. 국내 워케이션(Hosted), 해외 체류·어학연수·시장조사(Select), 지자체·공간·기업과의 B2B 파트너십(Partner) 세 축으로 운영됩니다.' },
              { q: 'Hosted 프로그램과 Select 상품의 차이는?', a: 'Hosted는 Wakation이 직접 기획하고 운영하는 공식 프로그램입니다. Select는 검증된 외부 파트너의 숙소·현지 체험·eSIM 상품을 큐레이션해 연결하는 제휴 서비스입니다.' },
              { q: '비자·체류 AI 서비스는 법적 효력이 있나요?', a: '아닙니다. 비자·체류 AI 서비스는 국가별 비자 종류, 체류 기간, 서류 등을 안내하는 참고용 서비스입니다. 최종 확인은 반드시 해당 국가 대사관이나 전문 이민 변호사를 통해 받으시길 권장합니다.' },
              { q: '파트너십·제휴 문의는 어떻게 하나요?', a: '지자체·공간 운영사·교육기관·기업 등 다양한 형태의 파트너십을 환영합니다. wakation.sf@gmail.com 또는 파트너십 페이지를 통해 문의해 주세요.' },
            ] as const).map(({ q, a }, i) => (
              <details key={i} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between list-none gap-4">
                  <span className="text-[#141414] font-bold text-[0.9375rem] leading-snug">{q}</span>
                  <span className="text-[#c0bdb8] group-open:rotate-45 transition-transform duration-200 text-2xl leading-none shrink-0">+</span>
                </summary>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mt-3 pr-8">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 파트너십 신뢰 배너 ── */}
      <section className="bg-[#f9f7f3] border-t border-[#e5e1da] py-7 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {(['government', 'space', 'education', 'corporate'] as const).map((k) => {
                const Icon = PARTNER_ICON_MAP[k]
                return (
                  <div key={k} className="w-8 h-8 rounded-full bg-[#ede9e2] border border-[#e5e1da] flex items-center justify-center">
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
    </div>
  )
}
