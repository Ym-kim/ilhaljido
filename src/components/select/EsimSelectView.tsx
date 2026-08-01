'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useHashScroll } from '@/hooks/useHashScroll'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'
import { localizeDestination } from '@/lib/affiliate/localizeDest'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { ESIM_DESTINATIONS } from '@/lib/affiliate/destinations'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { ESIM_ALT_ITEMS } from '@/lib/affiliate/links'
import { FEATURED_ESIM } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { usePriceWatch } from '@/hooks/usePriceWatch'

const HOW_TO = [
  { step: '1', textKey: 'sele_s1' },
  { step: '2', textKey: 'sele_s2' },
  { step: '3', textKey: 'sele_s3' },
  { step: '4', textKey: 'sele_s4' },
]

export function EsimSelectView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key
  useHashScroll()
  // 1일 1회 갱신 검증가 — 목적지 카드 가격 태그(첫 항목) 교체
  const livePrices = usePriceWatch()

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`${prefix}/select`}
            className="inline-flex items-center gap-1.5 text-[#64748b] text-xs font-medium hover:text-brand-mid transition-colors"
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
            Wakation Select · eSIM
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            {tr('sel_cat_esim_t')}
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            {tr('sele_desc')}
          </p>
          <p className="text-amber-600/80 text-xs mt-3 font-medium">
            {tr('sele_note')}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-10 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            {tr('sele_how')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HOW_TO.map((item) => (
              <div key={item.step} className="bg-white border border-[#e0f2fe] rounded-xl p-4 text-center">
                <div className="w-7 h-7 rounded-full bg-[#f0f9ff] border border-[#dbeafe] flex items-center justify-center text-[#64748b] text-xs font-black mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-[#64748b] text-xs leading-snug">{tr(item.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Klook eSIM 실상품 — Airalo와 병행 (이중 수익 채널) */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid inline-block" />
            {tr('sele_klook_title')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('sele_klook_sub')}</p>
          <div data-ui-grid="product" className="wak-card-grid grid grid-cols-1 sm:grid-cols-2">
            {FEATURED_ESIM.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            {tr('sele_label')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESIM_DESTINATIONS.map((entry) => {
              // 가격 태그는 항상 첫 번째 — 최신 검증가 있으면 교체 (US$ 표기는 언어 중립)
              const live = livePrices[entry.id]
              const withLivePrice =
                live && entry.tags[0]?.startsWith('US$')
                  ? { ...entry, tags: [live, ...entry.tags.slice(1)] }
                  : entry
              return <DestinationCard key={entry.id} entry={localizeDestination(withLivePrice, lang)} />
            })}
          </div>
        </div>
      </section>

      {/* 활성 파트너 병행 — 항공·숙소·체험 (Airalo 링크 대기 중 수익 동선) */}
      <AffiliateSection
        tone="light"
        title={tr('sele_alt_title')}
        subtitle={tr('sele_alt_sub')}
        items={ESIM_ALT_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />

      {/* Airalo intro */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-white border border-[#e0f2fe] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📡</span>
              <div>
                <p className="text-[#111827] font-black mb-1">{tr('sele_airalo_t')}</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {tr('sele_airalo_d')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="wak-caption max-w-2xl text-[#66747d]">
            {tr('sel_disc_1')}
          </p>
          <p className="wak-caption max-w-2xl text-[#74818a]">
            {tr('sel_disc_2')}
          </p>
          <p className="wak-caption max-w-2xl text-[#74818a]">
            {tr('sel_disc_3')}
          </p>
        </div>
      </section>
    </div>
  )
}
