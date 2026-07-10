'use client'

import { ArrowRight, Globe, Users, TrendingUp, Building2, LineChart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getMarketFeatures, getMarketUnits } from '@/lib/i18n'
import { loc, tloc } from '@/lib/i18n/locale'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { MARKET_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

const FEAT_ICONS = { field: Globe, network: Users, connect: TrendingUp, fair: Building2 } as const

const SELECT_MARKET_PRODUCTS = [
  {
    id: 'fair-japan',
    category: loc('박람회·전시', 'Trade fairs', '展示会'),
    region: loc('일본 · 도쿄', 'Japan · Tokyo', '日本・東京'),
    name: loc('도쿄 유통·박람회 동반 리서치', 'Tokyo retail & trade fair research', '東京 流通・展示会同行リサーチ'),
    desc: loc(
      '일본 주요 전시회 현장 탐방과 바이어 미팅을 연결하는 시장조사 프로그램.',
      'Field visits to major Japanese trade shows, connected with buyer meetings.',
      '日本の主要展示会の視察とバイヤーミーティングをつなぐ市場調査プログラム。',
    ),
    img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'survey-vietnam',
    category: loc('현장 리서치', 'Field research', '現地リサーチ'),
    region: loc('베트남 · 하노이/호치민', 'Vietnam · Hanoi/HCMC', 'ベトナム・ハノイ/ホーチミン'),
    name: loc('베트남 소비자 현장 리서치', 'Vietnam consumer field research', 'ベトナム消費者現地リサーチ'),
    desc: loc(
      '베트남 현지 소비자 트렌드와 유통 채널을 직접 조사하는 파트너 프로그램.',
      'A partner program for first-hand research on Vietnamese consumer trends and retail channels.',
      'ベトナムの消費トレンドと流通チャネルを現地で調査するパートナープログラム。',
    ),
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'meetup-us',
    category: loc('네트워킹', 'Networking', 'ネットワーキング'),
    region: loc('미국 · LA/SF', 'USA · LA/SF', 'アメリカ・LA/SF'),
    name: loc('미국 K-콘텐츠·뷰티 네트워킹', 'US K-content & K-beauty networking', '米国 K-コンテンツ・ビューティー ネットワーキング'),
    desc: loc(
      'LA·SF의 K-뷰티, K-콘텐츠 관련 현지 바이어·에이전시와의 네트워킹 세션.',
      'Networking sessions with LA/SF buyers and agencies in K-beauty and K-content.',
      'LA・SFのK-ビューティー、K-コンテンツ関連バイヤー・エージェンシーとのネットワーキング。',
    ),
    img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=70',
  },
]

export default function MarketPage() {
  const { lang, tr } = useLang()
  const features = getMarketFeatures(lang)
  const upcoming = getMarketUnits(lang)

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=85" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark className="!flex items-center gap-2 !text-amber-400">
            <LineChart className="w-4 h-4" strokeWidth={ICON_STROKE} /> {tr('nav_prog_market')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
            {tr('market_hero_title')}
          </h1>
          <p className="text-lead-on-dark mt-4 max-w-xl">{tr('market_hero_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-orange-400 text-xs font-black tracking-widest uppercase mb-4">{tr('market_what_eyebrow')}</p>
          <h2 className="text-3xl font-black text-white mb-4">{tr('market_what_title')}</h2>
          <p className="text-caption-on-dark text-sm leading-relaxed mb-10 max-w-2xl">{tr('market_what_desc')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? Globe
              return (
                <div key={f.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-black mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wakation Hosted — 예정 시장조사단 */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">{tr('coming_soon')}</p>
          <h2 className="text-2xl font-black text-white mb-8">{tr('market_upcoming_title')}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {upcoming.map((u) => (
              <div key={u.id} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/20 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src={u.img} alt={u.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="absolute top-4 left-4 bg-orange-500/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {tr('domestic_coming_soon')}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1">{u.region}</p>
                  <h3 className="text-white font-black mb-2">{u.name}</h3>
                  <p className="text-white/30 text-xs mb-4">{u.target}</p>
                  <a
                    href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(u.stayQuery)}`}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-orange-500/15 text-orange-300 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-orange-500/25 hover:text-orange-200 transition-all"
                  >
                    {tr('h3_bar_stay')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wakation Select — 파트너 시장조사 상품 */}
      <section className="py-16 px-6 bg-[#111] border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-2">WAKATION SELECT</p>
              <h2 className="text-2xl font-black text-white">{tr('market_select_title')}</h2>
              <p className="text-white/40 text-sm mt-1">{tr('market_select_sub')}</p>
            </div>
            <span className="shrink-0 bg-blue-500/10 text-blue-400 text-xs px-4 py-2 rounded-full border border-blue-500/20 self-start sm:self-auto">
              {tr('market_select_badge')}
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SELECT_MARKET_PRODUCTS.map((p) => (
              <div key={p.id} className="bg-[#1a1a1a] border border-white/8 rounded-3xl overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.img} alt={tloc(lang, p.name)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-500/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{tloc(lang, p.category)}</span>
                    <span className="bg-white/15 text-white/70 text-xs px-2 py-1 rounded-full backdrop-blur-sm">{tr('market_select_wip')}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} /> {tloc(lang, p.region)}
                  </p>
                  <h3 className="text-white font-black mb-2 text-sm leading-snug">{tloc(lang, p.name)}</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">{tloc(lang, p.desc)}</p>
                  <a
                    href="mailto:wakation.sf@gmail.com?subject=Select%20Market%20Research%20Partnership"
                    className="w-full flex items-center justify-center gap-2 bg-white/6 text-white/50 font-bold py-2.5 rounded-xl border border-white/10 text-xs hover:bg-white/12 hover:text-white/80 transition-all"
                  >
                    {tr('market_select_cta')} <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs mt-8">
            {tr('market_select_contact')} <a href="mailto:wakation.sf@gmail.com" className="underline hover:text-white/50 transition-colors">wakation.sf@gmail.com</a>
          </p>
        </div>
      </section>

      {/* 현지 체험·이동 준비 */}
      <AffiliateSection
        title={tr('market_prep_title')}
        subtitle={tr('market_prep_sub')}
        items={MARKET_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-900/30 to-[#111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">{tr('market_preregister_title')}</h2>
          <p className="text-caption-on-dark text-sm mb-8">{tr('market_preregister_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:wakation.sf@gmail.com?subject=Market%20research%20pre-register"
              className="bg-orange-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-orange-400 transition-all text-sm flex items-center justify-center gap-2"
            >
              {tr('market_preregister_btn')} <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/programs"
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
