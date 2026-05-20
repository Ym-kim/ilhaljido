'use client'
import { useLang } from '@/context/LanguageContext'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getWorkspaceFeatures } from '@/lib/i18n'
import { Wifi, Monitor, Building2, Zap, Volume2, Coffee } from 'lucide-react'

const ICONS = {
  wifi: Wifi,
  monitor: Monitor,
  booth: Building2,
  '24h': Zap,
  meeting: Volume2,
  drinks: Coffee,
} as const

export default function WorkspacePage() {
  const { lang, tr } = useLang()
  const features = getWorkspaceFeatures(lang)

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('ws_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white">{tr('ws_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-md">{tr('ws_desc')}</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = ICONS[f.id as keyof typeof ICONS] ?? Wifi
              return (
                <div key={f.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
