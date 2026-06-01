'use client'

import Link from 'next/link'
import { MapPin, ArrowRight, CheckCircle2, Home } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getDomesticCurrent, getDomesticUpcoming, getDomesticThemedUpcoming } from '@/lib/i18n'
import { ICON_STROKE } from '@/lib/icons'

export default function DomesticPage() {
  const { lang, tr } = useLang()
  const current = getDomesticCurrent(lang)
  const themed = getDomesticThemedUpcoming(lang)
  const upcoming = getDomesticUpcoming(lang)

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark className="flex items-center gap-2">
            <Home className="w-4 h-4 inline" strokeWidth={ICON_STROKE} /> {tr('nav_prog_domestic')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr('domestic_hero_title')}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr('domestic_hero_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-6">{tr('domestic_current_title')}</p>
          {current.map((p) => (
            <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-brand-mid text-white text-xs font-black px-3 py-1 rounded-full">{tr('recruiting')}</span>
                </div>
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-white/40 text-xs flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {p.region} · {p.duration}
                    </p>
                    <h2 className="text-2xl font-black text-white mb-3">{p.name}</h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.includes.map((t) => (
                        <span key={t} className="flex items-center gap-1 bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full border border-white/10">
                          <CheckCircle2 className="w-3 h-3 text-teal-400" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-black text-white">₩{p.price}</span>
                      <span className="text-white/40 text-sm ml-1">{tr('domestic_vat')}</span>
                    </div>
                    {p.href.startsWith('http') ? (<a href={p.href} target="_blank" rel="noopener noreferrer" className="bg-teal-500 text-white font-black px-6 py-3 rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 text-sm">{tr('learn_more')} <ArrowRight className="w-4 h-4" /></a>) : (<Link href={p.href} className="bg-teal-500 text-white font-black px-6 py-3 rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 text-sm">{tr('learn_more')} <ArrowRight className="w-4 h-4" /></Link>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#161616]">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">{tr('coming_soon')}</p>
          <h2 className="text-2xl font-black text-white mb-8">{tr('domestic_themed_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {themed.map((p) => (
              <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">{p.theme}</span>
                </div>
                <div className="p-4">
                  <p className="text-white/40 text-xs flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />{p.region}
                  </p>
                  <h3 className="text-white font-black text-sm mb-3">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400/70 text-xs font-bold">{p.date}</span>
                    <a href="mailto:hello@wakation.kr" className="text-white/50 text-xs hover:text-teal-400 transition-colors flex items-center gap-1">
                      {tr('pre_register')} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>
          <h2 className="text-2xl font-black text-white mb-8">{tr('domestic_upcoming_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map((u) => (
              <div key={u.id} className="group relative rounded-2xl overflow-hidden h-40 cursor-default">
                <img src={u.img} alt={u.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white/40 text-xs mb-1">{u.region}</p>
                  <p className="text-white font-bold text-sm">{u.title}</p>
                  <span className="text-white/30 text-xs mt-1">{tr('domestic_coming_soon')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm mb-4">{tr('domestic_notify_desc')}</p>
            <a href="mailto:hello@wakation.kr" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              {tr('domestic_notify_btn')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
