'use client'
import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getLanguageFeatures, getLanguagePrograms } from '@/lib/i18n'
import { BookOpen, Globe, Users, Star } from 'lucide-react'

const FEAT_ICONS = { work: BookOpen, immersion: Globe, community: Users } as const

export default function LanguagePage() {
  const { lang, tr } = useLang()
  const features = getLanguageFeatures(lang)
  const programs = getLanguagePrograms(lang)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        <Image src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('lang_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('lang_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('lang_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? BookOpen
            return (
              <div key={f.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">{tr('lang_programs_title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                <div className="relative md:w-44 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-400">{p.country}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{p.duration}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* 고정가 노출 제거 — 가격표현 금지 방침 (요금은 파트너사에서 확인) */}
                  <div className="mt-auto flex items-center justify-end gap-3">
                    <a
                      href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(p.stayQuery)}`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 bg-brand-mid text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-light transition-all shadow-sm"
                    >
                      {tr('h3_bar_stay')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 여행 준비 크로스셀 — Wakation Select */}
      <AffiliateSection
        eyebrow="Wakation Select"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={GLOBAL_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />
    </div>
  )
}
