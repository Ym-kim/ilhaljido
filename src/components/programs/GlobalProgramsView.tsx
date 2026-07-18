'use client'

import { useEffect } from 'react'
import { MapPin, ArrowRight, Globe2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getGlobalDestinations, translate } from '@/lib/i18n'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Lang } from '@/lib/i18n/types'


export function GlobalProgramsView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const tr = (key: string) => translate(lang, key)
  const destinations = getGlobalDestinations(lang)

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark className="!flex items-center gap-2">
            <Globe2 className="w-4 h-4" strokeWidth={ICON_STROKE} /> {tr('nav_prog_global')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr('global_hero_title')}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr('global_hero_desc')}</p>
        </div>
      </section>

      {/* 마나도 워케이션 아티클 배너 (2026-07-18) */}
      <section className="px-6 pt-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/programs/global/manado"
            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-sky-950 to-[#111] border border-sky-500/20 px-7 py-6 hover:border-sky-400/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span className="block text-sky-300 text-[0.6875rem] font-bold tracking-widest uppercase mb-1">
                {lang === 'EN' ? 'Editorial · Hidden base' : lang === 'JP' ? '特集 · 秘密の拠点' : '에디토리얼 · 비밀의 체류지'}
              </span>
              <span className="block text-white font-black text-lg leading-tight">
                {lang === 'EN' ? 'After Bali, a sea nobody knows — Manado workation' : lang === 'JP' ? 'バリの次は、誰も知らない海 — マナド' : '발리 다음은, 아무도 모르는 이 바다 — 마나도'}
              </span>
              <span className="block text-white/55 text-sm mt-1">
                {lang === 'EN' ? "Divers' mecca Bunaken, pork & beer freely, direct charter flights from Seoul." : lang === 'JP' ? 'ダイバーの聖地ブナケン、豚肉もビールも自由、仁川直行チャーター。' : '다이버 성지 부나켄 — 돼지고기·주류 자유, 인천 직항 전세기.'}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 shrink-0 text-sm font-bold text-sky-300 group-hover:text-sky-200">
              {lang === 'EN' ? 'Read the guide →' : lang === 'JP' ? 'ガイドを読む →' : '가이드 읽기 →'}
            </span>
          </Link>
        </div>
      </section>

      {/* Wakation Hosted — 글로벌 프로그램 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-2">{tr('coming_soon')}</p>
              <h2 className="text-2xl font-black text-white">{tr('global_dest_title')}</h2>
            </div>
            <span className="bg-white/5 text-white/40 text-xs px-4 py-2 rounded-full border border-white/10">
              {tr('global_sequential_open')}
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((d) => (
              <div key={d.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image src={d.img} alt={d.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 bg-teal-500/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{d.tag}</span>
                  <span className="absolute top-4 right-4 bg-black/50 text-white/60 text-xs px-2 py-1 rounded-full backdrop-blur-sm">{d.country}</span>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    {d.region}
                  </p>
                  <h3 className="text-white font-black mb-3">{d.name}</h3>
                  <div className="flex items-center justify-between gap-2">
                    {d.stayQuery ? (
                      <a
                        href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(d.stayQuery)}`}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-teal-500/15 text-teal-300 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-teal-500/25 hover:text-teal-200 transition-all"
                      >
                        {tr('h3_bar_stay')} <ArrowRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-white/30 text-xs">{tr('domestic_coming_soon')}</span>
                    )}
                    <a
                      href="mailto:wakation.sf@gmail.com"
                      className="text-white/40 text-xs font-bold hover:text-teal-300 transition-colors flex items-center gap-1 shrink-0"
                    >
                      {tr('pre_register')} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wakation Select — /select 바로가기 배너 */}
      <section className="py-12 px-6 bg-[#0d0d0d] border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#1a1a1a] border border-teal-500/20 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 overflow-hidden">
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
            <div>
              <p className="text-teal-500/60 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-2">WAKATION SELECT</p>
              <p className="text-white font-black text-lg mb-1.5">
                {tr('gsel_banner_t')}
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                {tr('gsel_banner_d')}
              </p>
            </div>
            <Link
              href={`${prefix}/select`}
              className="shrink-0 inline-flex items-center gap-2 bg-teal-500/15 text-teal-300 border border-teal-500/30 px-5 py-2.5 rounded-full font-black text-sm hover:bg-teal-500/25 hover:text-teal-200 transition-all"
            >
              {tr('gsel_banner_cta')}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      {/* 워케이션 준비 서비스 */}
      <AffiliateSection
        title={tr('gsel_prep_t')}
        subtitle={tr('gsel_prep_d')}
        items={GLOBAL_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">{tr('global_cta_title')}</h2>
          <p className="text-caption-on-dark text-sm mb-8 whitespace-pre-line">{tr('global_cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:wakation.sf@gmail.com?subject=Global%20workation%20pre-register"
              className="bg-teal-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-teal-400 transition-all text-sm"
            >
              {tr('global_preregister_btn')}
            </a>
            <Link
              href={`${prefix}/programs`}
              className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm"
            >
              {tr('view_all')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
