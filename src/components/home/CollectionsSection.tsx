'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { COLLECTIONS, COLLECTIONS_UI } from '@/lib/affiliate/collections'

// 홈 기획전 — Trip Set 4개 우선 노출 (2026-07-28 feat/promotable-trip-sets-v1).
// duration 필드 = Trip Set 확장 컬렉션. 시즌 기획전(추석)·기존 컬렉션은 /collections 허브에서 노출.
const HOME_COLLECTIONS = COLLECTIONS.filter((c) => c.duration).slice(0, 4)

export function CollectionsSection() {
  const { lang } = useLang()

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 border-b border-[#dbeafe]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2.5">
              {COLLECTIONS_UI.eyebrow[lang]}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COLLECTIONS_UI.home_title[lang]}</h2>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COLLECTIONS_UI.home_sub[lang]}</p>
          </div>
          <Link
            href="/collections"
            className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all"
          >
            {COLLECTIONS_UI.see_all[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOME_COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}?src=home`}
              className="group relative rounded-3xl overflow-hidden block h-64 border border-[#e2e8f0] hover:border-brand-mid transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              <Image
                src={col.photo}
                alt={col.title[lang]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/30 to-transparent" />
              {/* 뱃지 최대 2개: 기간 + 동행 (가격 미노출 — 카드는 구성 안내만) */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                {col.durationLabel && (
                  <span className="text-[0.7rem] font-black px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                    {col.durationLabel[lang]}
                  </span>
                )}
                {col.companions && (
                  <span className="text-[0.7rem] font-black px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                    {col.companions[lang]}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-lg leading-snug mb-1">
                  {col.title[lang]}
                </h3>
                <p className="text-white/70 text-xs mb-2.5 line-clamp-2">{col.tagline[lang]}</p>
                <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                  {COLLECTIONS_UI.ts_card_cta[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
