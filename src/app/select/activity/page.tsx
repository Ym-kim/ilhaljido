'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useHashScroll } from '@/hooks/useHashScroll'
import { useLang } from '@/context/LanguageContext'
import { localizeDestination } from '@/lib/affiliate/localizeDest'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { FEATURED_ACTIVITIES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { ACTIVITY_DESTINATIONS } from '@/lib/affiliate/destinations'

export default function ActivitySelectPage() {
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
            Wakation Select · {tr('sela_cat')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            {tr('sel_cat_act_t')}
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            {tr('sela_desc')}
          </p>
          <p className="text-amber-600/80 text-xs mt-3 font-medium">
            {tr('sela_note')}
          </p>
        </div>
      </section>

      {/* 대표 체험 상품 — 실존 검증 개별 상품 */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse inline-block" />
            {tr('sela_featured')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('sela_featured_d')}</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {FEATURED_ACTIVITIES.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            {tr('sela_label')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITY_DESTINATIONS.map((entry) => (
              <DestinationCard key={entry.id} entry={localizeDestination(entry, lang)} />
            ))}
          </div>
        </div>
      </section>

      {/* KKday intro */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-white border border-[#e0f2fe] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎌</span>
              <div>
                <p className="text-[#111827] font-black mb-1">{tr('sela_kkday_t')}</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {tr('sela_kkday_d')}
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
