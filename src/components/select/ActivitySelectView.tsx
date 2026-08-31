'use client'

import { useEffect, useState } from 'react'
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
import { EXPERIENCE_EDITORIALS } from '@/lib/experiences/editorials'
import { ExperienceEditorialCard } from '@/components/experiences/ExperienceEditorialCard'

// ─────────────────────────────────────────────────────────────────────────────
// 지역 필터 칩 (2026-08-31, 더휴일 벤치마크 이식) — 체험 카드 27장 무필터 나열 해소.
// 클라이언트 필터라 SSG 유지. 필터는 KO 원본 item.country 기준(로컬라이즈 전) 매칭.
// ─────────────────────────────────────────────────────────────────────────────
const REGION_CHIPS: { id: string; label: Record<Lang, string>; countries: string[] | null }[] = [
  { id: 'all', label: { KO: '전체', EN: 'All', JP: 'すべて' }, countries: null },
  { id: 'japan', label: { KO: '일본', EN: 'Japan', JP: '日本' }, countries: ['일본'] },
  { id: 'korea', label: { KO: '한국', EN: 'Korea', JP: '韓国' }, countries: ['국내', '한국', '한국 출발'] },
  { id: 'sea', label: { KO: '동남아', EN: 'SE Asia', JP: '東南アジア' }, countries: ['베트남', '태국', '인도네시아', '필리핀'] },
  { id: 'city', label: { KO: '대만·홍콩·싱가포르', EN: 'TW·HK·SG', JP: '台湾·香港·シンガポール' }, countries: ['대만', '홍콩', '싱가포르'] },
]

function matchRegion(country: string | undefined, chip: (typeof REGION_CHIPS)[number]): boolean {
  if (!chip.countries) return true
  return !!country && chip.countries.includes(country)
}

export function ActivitySelectView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key
  useHashScroll()

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const [region, setRegion] = useState('all')
  const activeChip = REGION_CHIPS.find((c) => c.id === region) ?? REGION_CHIPS[0]
  const filteredFeatured = FEATURED_ACTIVITIES.filter((i) => matchRegion(i.country, activeChip))
  const filteredThemes = THEME_EXPERIENCES.filter(
    (i) => i.status !== 'coming_soon' && matchRegion(i.country, activeChip),
  )

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const editorials = EXPERIENCE_EDITORIALS

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

      {editorials.length > 0 && (
        <section className="border-t border-[#dce6e7] bg-[#f7f5ef] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#5d8290]">
              {lang === 'KO' ? 'WAKATION 에디터 셀렉션' : lang === 'JP' ? 'WAKATION 編集部セレクション' : 'WAKATION EDITOR’S SELECTION'}
            </span>
            <h2 className="mb-6 mt-2 text-2xl font-black text-[#172a36] sm:text-3xl">
              {lang === 'KO' ? '상품을 열기 전에, 내 일정에 맞는 체험부터 고르세요' : lang === 'JP' ? '商品を開く前に、旅程に合う体験から選ぶ' : 'Choose an experience that fits before opening the product page'}
            </h2>
            <div className="grid gap-6 lg:gap-8">
              {editorials.map((experience, index) => (
                <ExperienceEditorialCard
                  key={experience.slug}
                  experience={experience}
                  lang={lang}
                  source="activity"
                  priority={index === 0}
                />
              ))}
            </div>
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
          <p className="text-[#64748b] text-sm mb-4">{tr('sela_featured_d')}</p>
          {/* 지역 필터 칩 — 아래 대표·테마 두 그리드에 함께 적용 */}
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={lang === 'EN' ? 'Filter by region' : lang === 'JP' ? '地域で絞り込み' : '지역 필터'}>
            {REGION_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setRegion(chip.id)}
                aria-pressed={region === chip.id}
                className={`min-h-9 rounded-full border px-4 text-[0.8125rem] font-semibold transition-colors ${
                  region === chip.id
                    ? 'border-brand-mid bg-brand-mid text-white'
                    : 'border-[#dbeafe] bg-white text-[#475569] hover:border-[#93c5fd]'
                }`}
              >
                {chip.label[lang]}
              </button>
            ))}
          </div>
          <div data-ui-grid="product" className="wak-card-grid grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3">
            {filteredFeatured.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* 테마 체험 — 골프·힐링·로컬·스포츠 (2026-07-19 확충: KKday 검증 실상품 16종 재노출) */}
      {filteredThemes.length > 0 && (
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
            {filteredThemes.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            {tr('sela_label')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITY_DESTINATIONS.map((entry) => (
              <DestinationCard key={entry.id} entry={localizeDestination(entry, lang)} category="activity" />
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
