'use client'

import { useLang } from '@/context/LanguageContext'
import { CheckCircle2, Users, Zap, Globe } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'

const STATS = [
  { Icon: Users, vKey: 'about_stat_1_v', lKey: 'about_stat_1_l' },
  { Icon: Zap, vKey: 'about_stat_2_v', lKey: 'about_stat_2_l' },
  { Icon: Globe, vKey: 'about_stat_3_v', lKey: 'about_stat_3_l' },
] as const

export default function AboutPage() {
  const { tr } = useLang()
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[55vh] flex items-end overflow-hidden dark-surface">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('about_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('about_title')}</h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 text-lg leading-relaxed mb-12">{tr('about_desc')}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {STATS.map(({ Icon, vKey, lKey }) => (
              <div key={lKey} className="bg-gray-50 rounded-2xl p-6 text-center">
                <Icon className="w-6 h-6 text-teal-500 mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900 mb-1">{tr(vKey)}</p>
                <p className="text-sm text-gray-500">{tr(lKey)}</p>
              </div>
            ))}
          </div>

          <SectionTitle className="mb-8">{tr('about_vs_title')}</SectionTitle>
          <div className="space-y-4">
            {[
              ['about_q1', 'about_a1'],
              ['about_q2', 'about_a2'],
              ['about_q3', 'about_a3'],
            ].map(([q, a]) => (
              <div key={q} className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-2xl p-5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs shrink-0">
                    ✗
                  </span>
                  <p className="text-gray-600 text-sm line-through">{tr(q)}</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <p className="text-gray-800 text-sm font-medium">{tr(a)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
