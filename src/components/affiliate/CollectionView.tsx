'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { getCollection, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { NotifySignup } from '@/components/home/NotifySignup'

// 기획전 상세 — 히어로 + 구성 상품(숙소·체험·eSIM·항공) + 디스클로저 + 다음회차 알림
export function CollectionView({ slug, forceLang }: { slug: string; forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const col = getCollection(slug)

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  if (!col) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Link href={`${prefix}/collections`} className="text-brand-mid font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
        </Link>
      </div>
    )
  }

  const items = getCatalogItems(col.itemIds).map((i) => localizeAffiliateItem(i, lang))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[48vh] min-h-[340px] flex items-end overflow-hidden dark-surface">
        <Image src={col.photo} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/45 to-[#04121f]/10" />
        <div className="relative w-full max-w-5xl mx-auto px-6 pb-12">
          <Link
            href={`${prefix}/collections`}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-bold mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
          </Link>
          {/* span 사용 — .dark-surface p 규칙이 sky 액센트를 흰색으로 덮는 함정 회피 */}
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-2.5">
            {COLLECTIONS_UI.eyebrow[lang]}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            <span className="mr-2" aria-hidden>{col.emoji}</span>{col.title[lang]}
          </h1>
          <span className="block text-sky-200 text-sm font-bold mb-2">{col.tagline[lang]}</span>
          <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">{col.desc[lang]}</p>
        </div>
      </section>

      {/* 구성 상품 */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#111827] font-black text-lg mb-1.5">{COLLECTIONS_UI.included[lang]}</p>
          <p className="text-[#94a3b8] text-xs mb-7">
            {items.length}{COLLECTIONS_UI.count_label[lang]}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <AffiliateCard key={item.id} item={item} visual />
            ))}
          </div>
          <p className="text-[#b8b4ae] text-[0.7rem] leading-relaxed max-w-2xl mt-7">
            {COLLECTIONS_UI.disclosure[lang]}
          </p>
        </div>
      </section>

      {/* 다음 회차 알림 */}
      <section className="dark-surface bg-gradient-to-b from-[#04121f] to-[#0a1e33] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 text-sm font-semibold mb-3">
            {lang === 'KO' ? '이 테마의 프로그램이 열리면 알려드릴게요' : lang === 'JP' ? 'このテーマのプログラム開催時にお知らせ' : "We'll tell you when a program for this theme opens"}
          </p>
          <NotifySignup source={`기획전 알림 (${col.slug})`} event="program_alert_submitted" />
        </div>
      </section>
    </div>
  )
}
