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
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { FEATURED_ACTIVITIES, THEME_EXPERIENCES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { ACTIVITY_DESTINATIONS } from '@/lib/affiliate/destinations'
import { getExperienceEditorial } from '@/lib/experiences/editorials'
import { ExperienceEditorialCard } from '@/components/experiences/ExperienceEditorialCard'

export function ActivitySelectView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key
  useHashScroll()

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const flagship = getExperienceEditorial('itoshima-photo-bus-tour')

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

      {flagship && (
        <section className="border-t border-[#dce6e7] bg-[#f7f5ef] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#5d8290]">
              {lang === 'KO' ? '에디터가 고른 반나절' : lang === 'JP' ? '編集部が選んだ半日体験' : 'EDITOR’S HALF-DAY PICK'}
            </span>
            <h2 className="mb-6 mt-2 text-2xl font-black text-[#172a36] sm:text-3xl">
              {lang === 'KO' ? '상품보다 먼저, 이 체험이 내 일정에 맞는지 확인하세요' : lang === 'JP' ? '商品を見る前に、自分の旅程に合うかを確認' : 'See how it fits your trip before opening the product page'}
            </h2>
            <ExperienceEditorialCard experience={flagship} lang={lang} source="activity" />
          </div>
        </section>
      )}

      {/* 대표 체험 상품 — 실존 검증 개별 상품 */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid inline-block" />
            {tr('sela_featured')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('sela_featured_d')}</p>
          <div data-ui-grid="product" className="wak-card-grid grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ACTIVITIES.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* 테마 체험 — 골프·힐링·로컬·스포츠 (2026-07-19 확충: KKday 검증 실상품 16종 재노출) */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-1.5">
            {lang === 'EN' ? 'THEMED EXPERIENCES' : lang === 'JP' ? 'テーマ別体験' : '테마별 체험'}
          </p>
          <p className="text-[#475569] text-sm mb-6">
            {lang === 'EN'
              ? 'Golf, healing, local culture and sports — verified KKday experiences by theme.'
              : lang === 'JP'
              ? 'ゴルフ·ヒーリング·ローカル·スポーツ — テーマ別の検証済みKKday体験。'
              : '골프·힐링·로컬·스포츠 — 테마별로 고른 검증 KKday 체험.'}
          </p>
          <div data-ui-grid="product" className="wak-card-grid grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4">
            {/* coming_soon 제외 — 소멸 상품이 죽은 링크로 렌더되던 것 차단 (2026-08-06) */}
            {THEME_EXPERIENCES.filter((item) => item.status !== 'coming_soon').map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
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
