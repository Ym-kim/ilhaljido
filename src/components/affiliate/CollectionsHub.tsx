'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { COLLECTIONS, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { SelectionCriteria } from '@/components/affiliate/SelectionCriteria'

// 기획전 허브 — 전체 컬렉션 카드 그리드
export function CollectionsHub({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 pt-24 pb-10 bg-[#f0f9ff] border-b border-[#dbeafe]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">
            {COLLECTIONS_UI.eyebrow[lang]}
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-3">{COLLECTIONS_UI.hub_title[lang]}</h1>
          <p className="text-[#64748b] text-sm md:text-base max-w-2xl leading-relaxed">{COLLECTIONS_UI.hub_sub[lang]}</p>
          <SelectionCriteria className="mt-4" />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {COLLECTIONS.map((col) => {
            const count = getCatalogItems(col.itemIds).length
            return (
              <Link
                key={col.slug}
                href={`${prefix}/collections/${col.slug}`}
                className="group relative rounded-3xl overflow-hidden block h-64 border border-[#e2e8f0] hover:border-brand-mid transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={col.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/35 to-transparent" />
                <span className="absolute top-4 left-4 text-[0.7rem] font-black px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                  {count}{COLLECTIONS_UI.count_label[lang]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-black text-xl leading-snug mb-1.5">
                    <span className="mr-2" aria-hidden>{col.emoji}</span>{col.title[lang]}
                  </h2>
                  <p className="text-white/70 text-sm mb-3">{col.tagline[lang]}</p>
                  <span className="inline-flex items-center gap-1.5 text-sky-300 text-sm font-bold group-hover:gap-2.5 transition-all">
                    {COLLECTIONS_UI.included[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
