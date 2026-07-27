'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, CheckCircle2, Home, Flag } from 'lucide-react'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getDomesticCurrent, getDomesticCompleted, getDomesticUpcoming, getDomesticThemedUpcoming, translate } from '@/lib/i18n'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { EditorialBanner } from '@/components/editorial/EditorialBanner'
import { HostedLeadSection } from '@/components/programs/HostedLeadSection'
import { DOMESTIC_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import type { Lang } from '@/lib/i18n/types'

export function DomesticProgramsView({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const tr = (key: string) => translate(lang, key)
  const current = getDomesticCurrent(lang)
  const completed = getDomesticCompleted(lang)
  const themed = getDomesticThemedUpcoming(lang).filter((p) => !p.isGlobal)
  const upcoming = getDomesticUpcoming(lang)

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark className="flex items-center gap-2">
            <Home className="w-4 h-4 inline" strokeWidth={ICON_STROKE} /> {tr('nav_prog_domestic')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr('domestic_hero_title')}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr('domestic_hero_desc')}</p>
        </div>
      </section>

      {/* 정선 아리랑열차 워케이션 아티클 배너 — 공용 EditorialBanner (2026-07-19 통일) */}
      <section className="px-6 pt-10">
        <div className="max-w-6xl mx-auto">
          <EditorialBanner
            href="/programs/domestic/jeongseon-train"
            eyebrow={lang === 'EN' ? 'Editorial · Slow-train workation' : lang === 'JP' ? '特集 · スロートレイン' : '에디토리얼 · 슬로우 트레인 워케이션'}
            title={lang === 'EN' ? 'The slower the train, the deeper the work — Jeongseon A-train' : lang === 'JP' ? '遅い列車ほど、仕事は深くなる — 旌善アリラン列車' : '느리게 달릴수록, 일은 깊어진다 — 정선 아리랑 열차'}
            sub={lang === 'EN' ? 'Back after 2 years 3 months. A rolling office through the Taebaek range.' : lang === 'JP' ? '2年3カ月ぶりに復活。太白山脈を走るオフィス。' : '2년 3개월 만에 돌아온 산악열차 — 태백산맥을 통과하는 달리는 오피스.'}
            cta={lang === 'EN' ? 'Read the guide →' : lang === 'JP' ? 'ガイドを読む →' : '가이드 읽기 →'}
          />
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-6">
            {current.length > 0 ? tr('domestic_current_title') : tr('home_recruiting_coming_title')}
          </p>
          {current.length > 0 ? (
            <div className="space-y-5">
              {current.map((p) => (
                <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                      <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 bg-brand-mid text-white text-xs font-black px-3 py-1 rounded-full">{tr('recruiting')}</span>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-white/40 text-xs flex items-center gap-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          {p.region} · {p.duration}
                        </p>
                        <h2 className="text-2xl font-black text-white mb-3">{p.name}</h2>
                        <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.includes.map((t) => (
                            <span key={t} className="flex items-center gap-1 bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full border border-white/10">
                              <CheckCircle2 className="w-3 h-3 text-teal-400" />
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-black text-white">₩{p.price}</span>
                          <span className="text-white/40 text-sm ml-1">{tr('domestic_vat')}</span>
                        </div>
                        {p.href.startsWith('http') ? (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" className="bg-teal-500 text-white font-black px-6 py-3 rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 text-sm">
                            {tr('learn_more')} <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link href={p.href} className="bg-teal-500 text-white font-black px-6 py-3 rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 text-sm">
                            {tr('learn_more')} <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 text-center mb-6">
              <p className="text-white font-black text-lg mb-2">{tr('home_recruiting_coming_title')}</p>
              <p className="text-white/50 text-sm mb-6">{tr('home_recruiting_coming_desc')}</p>
              <a href="mailto:wakation.sf@gmail.com" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
                {tr('inquire')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
              </a>
            </div>
          )}
        </div>
      </section>

      {completed.length > 0 && (
        <section className="py-12 px-6 bg-[#161616]">
          <div className="max-w-6xl mx-auto">
            <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
              <Flag className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              {tr('pilot_complete_eyebrow')}
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {completed.map((p) => (
                <div key={p.id} className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden opacity-80">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale" />
                    <div className="absolute inset-0 bg-black/60" />
                    <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-white/60 text-xs font-bold px-2.5 py-1 rounded-full border border-white/15">
                      {tr('pilot_complete_eyebrow')}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-white/30 text-xs flex items-center gap-1 mb-1.5">
                      <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
                      {p.region}{p.date ? ` · ${p.date}` : ''}
                    </p>
                    <h3 className="text-white/70 font-black text-base mb-2">{p.name}</h3>
                    <p className="text-white/35 text-xs leading-relaxed mb-4">{p.desc}</p>
                    <a href="mailto:wakation.sf@gmail.com" className="inline-flex items-center gap-1.5 text-white/40 text-xs hover:text-teal-400 transition-colors">
                      {tr('home_recruiting_coming_title')} <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-[#161616]">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">{tr('coming_soon')}</p>
          <h2 className="text-2xl font-black text-white mb-8">{tr('domestic_themed_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {themed.map((p) => (
              <div key={p.id} className="group bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">{p.theme}</span>
                </div>
                <div className="p-4">
                  <p className="text-white/40 text-xs flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />{p.region}
                  </p>
                  <h3 className="text-white font-black text-sm mb-3">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400/70 text-xs font-bold">{p.date}</span>
                    <a href="mailto:wakation.sf@gmail.com" className="text-white/50 text-xs hover:text-teal-400 transition-colors flex items-center gap-1">
                      {tr('pre_register')} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>
          <h2 className="text-2xl font-black text-white mb-8">{tr('domestic_upcoming_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map((u) => (
              <div key={u.id} className="group relative rounded-2xl overflow-hidden h-40 cursor-default">
                <Image src={u.img} alt={u.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white/40 text-xs mb-1">{u.region}</p>
                  <p className="text-white font-bold text-sm">{u.title}</p>
                  <span className="text-white/30 text-xs mt-1">{tr('domestic_coming_soon')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm mb-4">{tr('domestic_notify_desc')}</p>
            <a href="mailto:wakation.sf@gmail.com" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              {tr('domestic_notify_btn')}
            </a>
          </div>
        </div>
      </section>

      {/* Hosted 리드 — 국내 회차 오픈 알림 (feat/hosted-lead-v1) */}
      <HostedLeadSection variant="domestic" tone="dark" lang={lang} />

      {/* 국내 워케이션 준비 — 숙소·체험 크로스셀 */}
      <AffiliateSection
        title={tr('domestic_prep_title')}
        subtitle={tr('domestic_prep_sub')}
        items={DOMESTIC_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />
    </div>
  )
}
