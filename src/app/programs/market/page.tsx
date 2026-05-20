'use client'



import { ArrowRight, Globe, Users, TrendingUp, Building2, LineChart } from 'lucide-react'

import Link from 'next/link'

import { SectionEyebrow } from '@/components/brand/SectionEyebrow'

import { useLang } from '@/context/LanguageContext'

import { getMarketFeatures, getMarketUnits } from '@/lib/i18n'

import { ICON_STROKE } from '@/lib/icons'



const FEAT_ICONS = { field: Globe, network: Users, connect: TrendingUp, fair: Building2 } as const



export default function MarketPage() {

  const { lang, tr } = useLang()

  const features = getMarketFeatures(lang)

  const upcoming = getMarketUnits(lang)



  return (

    <div className="min-h-screen bg-[#111] dark-surface">

      <section className="relative h-[55vh] flex items-end overflow-hidden">

        <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />

        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">

          <SectionEyebrow onDark className="!flex items-center gap-2 !text-amber-400">

            <LineChart className="w-4 h-4" strokeWidth={ICON_STROKE} /> {tr('nav_prog_market')}

          </SectionEyebrow>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">

            {tr('market_hero_title')}

          </h1>

          <p className="text-lead-on-dark mt-4 max-w-xl">{tr('market_hero_desc')}</p>

        </div>

      </section>



      <section className="py-16 px-6">

        <div className="max-w-6xl mx-auto">

          <p className="text-orange-400 text-xs font-black tracking-widest uppercase mb-4">{tr('market_what_eyebrow')}</p>

          <h2 className="text-3xl font-black text-white mb-4">{tr('market_what_title')}</h2>

          <p className="text-caption-on-dark text-sm leading-relaxed mb-10 max-w-2xl">{tr('market_what_desc')}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {features.map((f) => {

              const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? Globe

              return (

                <div key={f.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all">

                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4">

                    <Icon className="w-6 h-6" />

                  </div>

                  <h3 className="text-white font-black mb-2">{f.title}</h3>

                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>

                </div>

              )

            })}

          </div>

        </div>

      </section>



      <section className="py-16 px-6 bg-[#0d0d0d]">

        <div className="max-w-6xl mx-auto">

          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>

          <h2 className="text-2xl font-black text-white mb-8">{tr('market_upcoming_title')}</h2>

          <div className="grid md:grid-cols-3 gap-5">

            {upcoming.map((u) => (

              <div key={u.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/20 transition-all">

                <div className="relative h-44 overflow-hidden">

                  <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                  <div className="absolute inset-0 bg-black/50" />

                  <span className="absolute top-4 left-4 bg-orange-500/80 text-white text-xs font-bold px-3 py-1 rounded-full">

                    {tr('domestic_coming_soon')}

                  </span>

                </div>

                <div className="p-5">

                  <p className="text-white/40 text-xs mb-1">{u.region}</p>

                  <h3 className="text-white font-black mb-2">{u.name}</h3>

                  <p className="text-white/30 text-xs">{u.target}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      <section className="py-16 px-6 bg-gradient-to-br from-orange-900/30 to-[#111]">

        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-2xl font-black text-white mb-4">{tr('market_preregister_title')}</h2>

          <p className="text-caption-on-dark text-sm mb-8">{tr('market_preregister_desc')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <a

              href="mailto:hello@wakation.kr?subject=Market%20research%20pre-register"

              className="bg-orange-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-orange-400 transition-all text-sm flex items-center justify-center gap-2"

            >

              {tr('market_preregister_btn')} <ArrowRight className="w-4 h-4" />

            </a>

            <Link

              href="/programs"

              className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm"

            >

              {tr('view_all')}

            </Link>

          </div>

        </div>

      </section>

    </div>

  )

}


