'use client'

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

const PARTNER_ICON_MAP = {
  government: PARTNER_ICONS.government,
  space: PARTNER_ICONS.space,
  education: PARTNER_ICONS.education,
  corporate: PARTNER_ICONS.corporate,
}

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
  const categories = getHomeCategories()
  const recruitingPrograms = getDomesticCurrent(lang)

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <section className="relative min-h-[92vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
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

      {/* 지금 모집 중 */}
      <section className="bg-[#0f0f0f] border-b border-white/8 py-14 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-mid animate-pulse inline-block" />
            {tr('home_recruiting_eyebrow')}
          </p>
          {recruitingPrograms.length > 0 ? (
            <div className="space-y-5">
              {recruitingPrograms.map((p) => (
                <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-brand-mid/30 transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              <a href="mailto:hello@wakation.kr" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
                {tr('inquire')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="dark-surface bg-[#111] border-y border-white/8 py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STAT_KEYS.map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl md:text-4xl font-black text-white mb-2">{tr(v)}</p>
              <p className="text-stat-label">{tr(l)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-surface py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionEyebrow onDark>{tr('home_platform_eyebrow')}</SectionEyebrow>
            <SectionTitle onDark className="mb-4 text-center">
              {tr('home_platform_title')}
            </SectionTitle>
            <p className="text-caption-on-dark">{tr('home_platform_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id]
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`card-dark group p-7 flex flex-col gap-5 hover:border-white/15 hover:shadow-2xl ${CATEGORY_GLOW[cat.id]} transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <IconTile icon={Icon} size="lg" onDark />
                  <div>
                    <h3 className={`text-xl font-black mb-2 ${CATEGORY_ACCENT[cat.id]}`}>{tr(cat.labelKey)}</h3>
                    <p className="text-caption-on-dark leading-relaxed">{tr(cat.descKey)}</p>
                  </div>
                  <span className="text-[0.875rem] font-semibold text-white/45 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 mt-auto">
                    {tr('learn_more')}
                    <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="dark-surface py-20 md:py-28 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <SectionEyebrow onDark>{tr('home_theme_eyebrow')}</SectionEyebrow>
            <SectionTitle onDark className="mb-3 text-center">
              {tr('home_theme_title')}
            </SectionTitle>
            <p className="text-caption-on-dark">{tr('home_theme_desc')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {THEME_ITEMS.map((t) => (
              <Link
                key={t.labelKey}
                href={t.href}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 rounded-2xl px-6 py-4 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="text-2xl">{t.emoji}</span>
                <div className="text-left">
                  <p className="text-white font-bold text-[0.9375rem] leading-tight">{tr(t.labelKey)}</p>
                  <p className="text-white/45 text-xs mt-0.5 max-w-[200px] leading-relaxed">{tr(t.descKey)}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors ml-2 shrink-0" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                <img src={s.img} alt={tr(s.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

      {/* 파트너십 신뢰 배너 (전체 섹션 → 1줄 배너로 축소) */}
      <section className="dark-surface bg-[#0a0a0a] border-t border-white/8 py-7 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {(['government', 'space', 'education', 'corporate'] as const).map((k) => {
                const Icon = PARTNER_ICON_MAP[k]
                return (
                  <div key={k} className="w-8 h-8 rounded-full bg-white/8 border border-white/15 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white/50" strokeWidth={ICON_STROKE} />
                  </div>
                )
              })}
            </div>
            <p className="text-white/55 text-sm font-medium">{tr('home_partner_banner_text')}</p>
          </div>
          <Link href="/partnership" className="shrink-0 text-brand-mid text-sm font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">
            {tr('home_partner_banner_cta')} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>
    </div>
  )
}
