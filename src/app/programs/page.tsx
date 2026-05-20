'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getProgramsList } from '@/lib/i18n'

export default function ProgramsPage() {
  const { tr } = useLang()
  const programs = getProgramsList()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[50vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <SectionEyebrow onDark pill>
            {tr('programs_hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {tr('programs_hero_title')}
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>{tr('programs_grid_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('programs_grid_title')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={tr(p.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {p.badgeKey && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {tr(p.badgeKey)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{tr(p.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tr(p.descKey)}</p>
                  <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold mt-5 group-hover:gap-2 transition-all">
                    {tr('learn_more')} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-surface py-20 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle onDark className="mb-4 text-center">
            {tr('programs_cta_title')}
          </SectionTitle>
          <p className="text-caption-on-dark mb-8">{tr('programs_cta_desc')}</p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all"
          >
            {tr('home_ai_cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
