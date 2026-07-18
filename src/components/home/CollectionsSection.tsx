'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { COLLECTIONS, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'

// 홈 테마 기획전 — 상위 3개 컬렉션 카드 + 전체보기 (하나투어 '기획전' 벤치마크)
const HOME_COLLECTIONS = COLLECTIONS.slice(0, 3)

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOME_COLLECTIONS.map((col) => {
            const count = getCatalogItems(col.itemIds).length
            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group relative rounded-3xl overflow-hidden block h-60 border border-[#e2e8f0] hover:border-brand-mid transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={col.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/30 to-transparent" />
                <span className="absolute top-3.5 left-3.5 text-[0.7rem] font-black px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm">
                  {count}{COLLECTIONS_UI.count_label[lang]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-black text-lg leading-snug mb-1">
                    {col.title[lang]}
                  </h3>
                  <p className="text-white/70 text-xs mb-2.5">{col.tagline[lang]}</p>
                  <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                    {COLLECTIONS_UI.included[lang]} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
