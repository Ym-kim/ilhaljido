'use client'
import { useLang } from '@/context/LanguageContext'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getCruiseFeatures, getCruiseRoutes } from '@/lib/i18n'
import { Anchor, Wifi, Globe } from 'lucide-react'

const FEAT_ICONS = { wifi: Wifi, ports: Globe, all: Anchor } as const

export default function CruisePage() {
  const { lang, tr } = useLang()
  const features = getCruiseFeatures(lang)
  const routes = getCruiseRoutes(lang)

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('cruise_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('cruise_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('cruise_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? Anchor
            return (
              <div key={f.id} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">{tr('cruise_routes_title')}</h2>
          <div className="space-y-6">
            {routes.map((r) => (
              <div key={r.id} className="group flex flex-col md:flex-row gap-6 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col justify-center flex-1">
                  <p className="text-gray-400 text-xs mb-1">{r.days}</p>
                  <h3 className="font-black text-gray-900 text-xl mb-2">{r.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{r.ports}</p>
                  <span className="text-2xl font-black text-teal-500">
                    ₩{r.price}
                    <span className="text-sm text-gray-400 font-normal">{tr('per_person')}</span>
                  </span>
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
