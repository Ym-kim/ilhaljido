'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useHashScroll } from '@/hooks/useHashScroll'
import { useLang } from '@/context/LanguageContext'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n/types'
import { localizeLearnCategory } from '@/lib/affiliate/localizeDest'
import { LEARN_CATEGORIES } from '@/lib/affiliate/destinations'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { DestinationSearch } from '@/components/affiliate/DestinationSearch'
import { FEATURED_COURSES } from '@/lib/affiliate/featured'
import { LEARN_ALT_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

export function LearnSelectView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const tr = (key: string) => t[lang][key] ?? t['KO'][key] ?? key
  useHashScroll()

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

          {/* 강의 주제 검색 → 인프런 검색결과 직행 */}
          <div className="mt-6 max-w-2xl">
            <DestinationSearch mode="learn" />
          </div>
        </div>
      </section>

      {/* 에디터 추천 강의 — 실존 인기 강의 */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse inline-block" />
            {tr('learn_featured')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('learn_featured_d')}</p>
          <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {FEATURED_COURSES.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* 언어 튜터링 — AmazingTalker 3트랙 (2026-07-19 확충: /language 활성 링크 재사용, 202 검증) */}
      <section className="px-6 pb-12 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-1.5">
            {lang === 'EN' ? 'LANGUAGE TUTORING' : lang === 'JP' ? '言語チュータリング' : '언어 튜터링'}
          </p>
          <p className="text-[#475569] text-sm mb-6">
            {lang === 'EN'
              ? '1:1 online tutoring on AmazingTalker — prep the local language before you go.'
              : lang === 'JP'
              ? 'AmazingTalkerの1:1オンラインチュータリング — 出発前に現地語を準備。'
              : 'AmazingTalker 1:1 온라인 튜터링 — 떠나기 전 현지어를 준비하세요.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { id: 'at-english', emoji: '🇺🇸', slug: 'tutors/english', t: { KO: '영어 튜터 찾기', EN: 'Find English tutors', JP: '英語チューターを探す' } },
              { id: 'at-japanese', emoji: '🇯🇵', slug: 'tutors/japanese', t: { KO: '일본어 튜터 찾기', EN: 'Find Japanese tutors', JP: '日本語チューターを探す' } },
              { id: 'at-all', emoji: '🌍', slug: 'tutors', t: { KO: '전체 언어 둘러보기', EN: 'Browse all languages', JP: '全言語を見る' } },
            ].map((at) => (
              <a
                key={at.id}
                href={`https://www.amazingtalker.co.kr/${at.slug}?aff_c_code=aff_c-bXzneJ&aff_p_code=aff_p-bXRhXL`}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group flex items-center gap-4 bg-white border border-[#e0f2fe] rounded-2xl p-5 hover:border-[#7dd3fc] hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="text-3xl">{at.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[#111827] font-black text-[0.9375rem]">{at.t[lang]}</span>
                  <span className="block text-[#64748b] text-xs mt-0.5">AmazingTalker</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-brand-mid transition-colors shrink-0" strokeWidth={ICON_STROKE} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#64748b] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
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
                      <Image src={cat.photo} alt={cat.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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

      {/* 활성 파트너 병행 — 항공·숙소·체험 (인프런 링크 대기 중 수익 동선) */}
      <AffiliateSection
        tone="light"
        title={tr('sell_alt_title')}
        subtitle={tr('sell_alt_sub')}
        items={LEARN_ALT_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />

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
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">
            {tr('sel_disc_3')}
          </p>
        </div>
      </section>
    </div>
  )
}
