'use client'

import { useEffect } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getDomesticThemedUpcoming, translate } from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { THEME_EXPERIENCES } from '@/lib/affiliate/featured'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Lang } from '@/lib/i18n/types'

type Props = {
  heroImage: string
  /** 로케일별 eyebrow — KO 값은 기존 카피 그대로, EN/JP는 /en·/ja 라우트에서 사용 */
  eyebrow: Record<Lang, string>
  titleKey: string
  descKey: string
  themeIds: string[]
  featuredExperienceIds?: string[]
  emailSubject: string
  forceLang?: Lang
}

export function ThemeProgramPage({ heroImage, eyebrow, titleKey, descKey, themeIds, emailSubject, featuredExperienceIds = [], forceLang }: Props) {
  const themeProducts = THEME_EXPERIENCES.filter((i) => featuredExperienceIds.includes(i.id))
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  // SSG 첫 렌더가 컨텍스트(KO)로 나오지 않도록 tr을 해석된 lang에 바인딩
  const tr = (key: string) => translate(lang, key)
  const programs = getDomesticThemedUpcoming(lang).filter((p) => themeIds.includes(p.id))

  const mailto = `mailto:wakation.sf@gmail.com?subject=${encodeURIComponent(emailSubject)}`

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        {/* LCP 이미지 — next/image로 반응형 srcset·우선 로드 (모바일에 1800px 원본 전송 방지) */}
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{eyebrow[lang]}</SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr(titleKey)}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr(descKey)}</p>
        </div>
      </section>

      {/* 테마 맞춤 실상품 — 바로 예약 가능한 것 먼저 (2026-07-15 운영자 피드백: 준비중보다 실상품 우선) */}
      {themeProducts.length > 0 && (
        <section className="py-14 px-6 bg-[#0d0d0d] border-t border-white/8">
          <div className="max-w-6xl mx-auto">
            <p className="text-sky-400 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse inline-block" />
              {tr('theme_featured')}
            </p>
            <p className="text-white/60 text-sm mb-6">{tr('theme_featured_d')}</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {themeProducts.map((item) => (
                <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sky-400 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>
          {programs.length === 0 ? (
            /* 빈 상태 — 흐릿한 텍스트 대신 대비 있는 안내 카드 + 사전신청 동선 */
            <div className="bg-[#1a1a1a] border border-white/12 rounded-2xl px-8 py-10 text-center">
              <p className="text-white font-black text-lg mb-2">{tr('home_recruiting_coming_title')}</p>
              <p className="text-white/65 text-sm mb-6">{tr('home_recruiting_coming_desc')}</p>
              <a href={mailto} className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-6 py-3 rounded-full hover:bg-sky-500 transition-all text-sm">
                {tr('pre_register')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs.map((p) => (
                <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">{p.theme}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-white/45 text-xs flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />{p.region}
                    </p>
                    <h3 className="text-white font-black mb-3">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sky-400 text-xs font-bold">{p.date}</span>
                      <a href={mailto} className="text-white/60 text-xs hover:text-sky-400 transition-colors flex items-center gap-1">
                        {tr('pre_register')} <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 여행 준비 크로스셀 — Wakation Select */}
      <AffiliateSection
        eyebrow="Wakation Select"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={GLOBAL_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />

      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">{tr(titleKey)}</h2>
          <p className="text-caption-on-dark text-sm mb-8">{tr('theme_cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={mailto} className="bg-brand-mid text-white font-black px-8 py-3.5 rounded-full hover:bg-sky-500 transition-all text-sm">
              {tr('pre_register')}
            </a>
            <Link href={`${prefix}/programs/domestic`} className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              {tr('view_all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
