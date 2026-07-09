'use client'

import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getDomesticThemedUpcoming } from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { THEME_EXPERIENCES } from '@/lib/affiliate/featured'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

type Props = {
  heroImage: string
  eyebrow: string
  titleKey: string
  descKey: string
  themeIds: string[]
  featuredExperienceIds?: string[]
  emailSubject: string
}

export function ThemeProgramPage({ heroImage, eyebrow, titleKey, descKey, themeIds, emailSubject, featuredExperienceIds = [] }: Props) {
  const themeProducts = THEME_EXPERIENCES.filter((i) => featuredExperienceIds.includes(i.id))
  const { lang, tr } = useLang()
  const programs = getDomesticThemedUpcoming(lang).filter((p) => themeIds.includes(p.id))

  const mailto = `mailto:wakation.sf@gmail.com?subject=${encodeURIComponent(emailSubject)}`

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        {/* LCP 이미지 — next/image로 반응형 srcset·우선 로드 (모바일에 1800px 원본 전송 방지) */}
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{eyebrow}</SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr(titleKey)}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr(descKey)}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>
          {programs.length === 0 ? (
            <p className="text-white/40 text-sm py-12 text-center">{tr('domestic_coming_soon')}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {programs.map((p) => (
                <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all">
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">{p.theme}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-white/40 text-xs flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />{p.region}
                    </p>
                    <h3 className="text-white font-black mb-3">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-400 text-xs font-bold">{p.date}</span>
                      <a href={mailto} className="text-white/50 text-xs hover:text-teal-400 transition-colors flex items-center gap-1">
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

      {/* 테마 맞춤 실상품 — KKday */}
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
            <a href={mailto} className="bg-teal-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-teal-400 transition-all text-sm">
              {tr('pre_register')}
            </a>
            <Link href="/programs/domestic" className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              {tr('view_all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
