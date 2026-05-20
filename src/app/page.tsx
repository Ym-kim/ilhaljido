'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { IconTile } from '@/components/brand/IconTile'
import { useLang } from '@/context/LanguageContext'
import { getHomeCategories } from '@/lib/i18n'
import {
  AiIcon,
  CATEGORY_ACCENT,
  CATEGORY_GLOW,
  CATEGORY_ICONS,
  ICON_STROKE,
  PARTNER_ICONS,
  type PartnerIconKey,
} from '@/lib/icons'

const SPACE_KEYS = [
  { titleKey: 'home_space_domestic_t', descKey: 'home_space_domestic_d', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { titleKey: 'home_space_global_t', descKey: 'home_space_global_d', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { titleKey: 'home_space_cowork_t', descKey: 'home_space_cowork_d', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
] as const

const PARTNER_TILES: { id: PartnerIconKey; titleKey: string }[] = [
  { id: 'government', titleKey: 'home_partner_tile_gov' },
  { id: 'space', titleKey: 'home_partner_tile_space' },
  { id: 'education', titleKey: 'home_partner_tile_edu' },
  { id: 'corporate', titleKey: 'home_partner_tile_hr' },
]

const PARTNER_LIST_KEYS = [
  'home_partner_li_1',
  'home_partner_li_2',
  'home_partner_li_3',
  'home_partner_li_4',
  'home_partner_li_5',
] as const

const STAT_KEYS = [
  ['home_stat_1_v', 'home_stat_1_l'],
  ['home_stat_2_v', 'home_stat_2_l'],
  ['home_stat_3_v', 'home_stat_3_l'],
  ['home_stat_4_v', 'home_stat_4_l'],
] as const

export default function HomePage() {
  const { tr } = useLang()
  const categories = getHomeCategories()

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

      <section className="dark-surface py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-center">
            <div>
              <SectionEyebrow onDark>{tr('home_partner_eyebrow')}</SectionEyebrow>
              <SectionTitle onDark className="mb-5">
                {tr('home_partner_title')}
              </SectionTitle>
              <p className="text-caption-on-dark leading-relaxed mb-8">{tr('home_partner_desc')}</p>
              <ul className="space-y-3 mb-10">
                {PARTNER_LIST_KEYS.map((key) => (
                  <li key={key} className="text-[0.9375rem] text-white/65 flex items-start gap-3 font-medium">
                    <Check className="w-4 h-4 text-brand-mid shrink-0 mt-0.5" strokeWidth={2.5} />
                    {tr(key)}
                  </li>
                ))}
              </ul>
              <Link href="/partnership" className="btn-ghost-light">
                {tr('home_partner_cta')}
                <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PARTNER_TILES.map((p) => {
                const Icon = PARTNER_ICONS[p.id]
                return (
                  <div key={p.id} className="card-dark p-5 flex flex-col gap-3">
                    <IconTile icon={Icon} onDark />
                    <p className="text-white font-bold text-[0.9375rem] leading-snug">{tr(p.titleKey)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
