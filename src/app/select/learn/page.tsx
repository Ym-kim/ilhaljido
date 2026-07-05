'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useHashScroll } from '@/hooks/useHashScroll'
import { useLang } from '@/context/LanguageContext'
import { localizeLearnCategory } from '@/lib/affiliate/localizeDest'
import { LEARN_CATEGORIES } from '@/lib/affiliate/destinations'

export default function LearnSelectPage() {
  const { lang, tr } = useLang()
  useHashScroll()

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            Wakation Select
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-600 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3">
            Wakation Select · {tr('sell_cat')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            {tr('sel_cat_learn_t')}
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            {tr('sell_desc')}
          </p>
          <p className="text-amber-600/80 text-xs mt-3 font-medium">
            {tr('sell_note')}
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            {tr('sell_label')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARN_CATEGORIES.map((raw) => {
              const cat = localizeLearnCategory(raw, lang)
              const isPending = cat.status === 'approved_needs_course_links'
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col bg-white border border-[#e0f2fe] rounded-2xl overflow-hidden hover:border-[#7dd3fc] hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* 사진 헤더 */}
                  {cat.photo && (
                    <div className="relative h-28 overflow-hidden bg-[#f0f9ff]">
                      <img
                        src={cat.photo}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      {isPending && (
                        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-black/55 text-white/90">
                          <Clock className="w-2.5 h-2.5" />
                          {tr('sel_badge_prep')}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[#111827] font-black text-base leading-snug">{cat.title}</p>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-[#cbd5e1] group-hover:text-[#64748b] transition-colors shrink-0 mt-1"
                      strokeWidth={ICON_STROKE}
                    />
                  </div>

                  <p className="text-[#64748b] text-xs leading-relaxed mb-4 flex-1">{cat.desc}</p>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] font-medium px-2 py-0.5 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#e0f2fe]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inflearn intro */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-white border border-[#e0f2fe] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📚</span>
              <div>
                <p className="text-[#111827] font-black mb-1">{tr('sell_inflearn_t')}</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {tr('sell_inflearn_d')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('sel_disc_1')}
          </p>
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('sel_disc_2')}
          </p>
        </div>
      </section>
    </div>
  )
}
