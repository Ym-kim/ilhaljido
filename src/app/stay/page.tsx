'use client'

import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getStayAsia, getStayOceania } from '@/lib/i18n'
import { Star, Wifi, CheckCircle2, MapPin } from 'lucide-react'

type Tab = 'asia' | 'oceania'

const VERIFY_KEYS = ['stay_verify_wifi', 'stay_verify_desk', 'stay_verify_noise', 'stay_verify_visit'] as const

export default function StayPage() {
  const { lang, tr } = useLang()
  const [tab, setTab] = useState<Tab>('asia')
  const asia = getStayAsia(lang)
  const oceania = getStayOceania(lang)
  const spaces = tab === 'asia' ? asia : oceania

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('stay_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('stay_title')}</h1>
        </div>
      </section>

      {/* 검증 배지 */}
      <section className="bg-[#1a1a1a] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-5 justify-center">
          {VERIFY_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />{tr(key)}
            </div>
          ))}
        </div>
      </section>

      {/* 탭 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">

          {/* 탭 버튼 */}
          <div className="flex gap-3 mb-10">
            <button
              onClick={() => setTab('asia')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'asia'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {tr('stay_tab_asia')}
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab==='asia' ? 'bg-white/20' : 'bg-white/10'}`}>
                {asia.length}
              </span>
            </button>

            <button
              onClick={() => setTab('oceania')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                tab === 'oceania'
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {tr('stay_tab_oceania')}
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab==='oceania' ? 'bg-white/20' : 'bg-white/10'}`}>
                {oceania.length}
              </span>
            </button>
          </div>

          {/* 지역 설명 */}
          <div className="mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
            {tab === 'asia' ? (
              <div>
                <p className="text-white font-bold mb-1">{tr('stay_asia_title')}</p>
                <p className="text-white/50 text-sm">{tr('stay_asia_desc')}</p>
              </div>
            ) : (
              <div>
                <p className="text-white font-bold mb-1">{tr('stay_oceania_title')}</p>
                <p className="text-white/50 text-sm">{tr('stay_oceania_desc')}</p>
              </div>
            )}
          </div>

          {/* 숙소 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((s) => (
              <a
                key={s.id}
                href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(s.bookingQuery)}`}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group rounded-3xl overflow-hidden cursor-pointer bg-[#1a1a1a] hover:scale-[1.02] transition-transform duration-300 block">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-bold">{s.score}</span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white/70 text-xs font-medium">{s.country}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1">{s.region}</p>
                  <h3 className="text-white font-bold mb-3 text-base">{s.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-teal-400" />{s.wifi}
                    </span>
                    <div>
                      <span className="text-teal-400 font-black text-lg">₩{s.price}</span>
                      <span className="text-white/30 font-normal text-xs">{tr('per_night')}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-1.5 bg-teal-500/12 text-teal-300 border border-teal-500/25 rounded-xl py-2.5 text-xs font-bold group-hover:bg-teal-500/20 group-hover:text-teal-200 transition-all">
                    {tr('nav_select_hotel')} · Booking.com
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
