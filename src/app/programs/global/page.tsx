'use client'

import { MapPin, ArrowRight, Globe2 } from 'lucide-react'
import Link from 'next/link'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getGlobalDestinations } from '@/lib/i18n'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'

const SELECT_PRODUCTS = [
  {
    id: 'language-japan',
    category: '어학연수',
    region: '일본 · 도쿄/오사카',
    name: '일본 어학연수 + 리모트워크 패키지',
    desc: '일본어 수업과 코워킹 스페이스를 결합한 4~12주 체류 프로그램. 비자 안내 포함.',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'cowork-bali',
    category: '코워킹 스테이',
    region: '인도네시아 · 발리',
    name: '발리 코워킹 장기체류 스테이',
    desc: '발리의 검증된 코워킹 스페이스와 숙소를 패키지로. 디지털 노마드 비자 안내 포함.',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'stay-portugal',
    category: '장기체류',
    region: '포르투갈 · 리스본',
    name: '포르투갈 디지털 노마드 체류',
    desc: '유럽에서 일하고 싶은 리모트워커를 위한 포르투갈 장기체류 패키지. D8 비자 안내.',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'market-japan',
    category: '시장조사',
    region: '일본 · 도쿄',
    name: '일본 스타트업·유통 시장조사단',
    desc: '도쿄의 스타트업 생태계와 유통 현장을 직접 탐방. 현지 기업인 네트워킹 포함.',
    img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'network-vietnam',
    category: '네트워킹',
    region: '베트남 · 하노이/호치민',
    name: '베트남 진출 네트워킹 캠프',
    desc: '베트남 시장 진출을 준비하는 창업자·마케터를 위한 현지 네트워킹 프로그램.',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'language-ph',
    category: '어학연수',
    region: '필리핀 · 세부',
    name: '필리핀 집중 영어 연수',
    desc: '1:1 맞춤 영어 수업과 워케이션을 결합한 4~8주 세부 체류 프로그램.',
    img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=70',
  },
]

export default function GlobalPage() {
  const { lang, tr } = useLang()
  const destinations = getGlobalDestinations(lang)

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 w-full h-full object-cover" />
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
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">{tr('domestic_coming_soon')}</span>
                    <a
                      href="mailto:wakation.sf@gmail.com"
                      className="text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors flex items-center gap-1"
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

      {/* Wakation Select — 파트너 추천 상품 */}
      <section className="py-16 px-6 bg-[#0d0d0d] border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-2">WAKATION SELECT</p>
              <h2 className="text-2xl font-black text-white">파트너 추천 상품</h2>
              <p className="text-white/40 text-sm mt-1">검증된 외부 파트너 어학·체류·시장조사 상품을 연결합니다</p>
            </div>
            <span className="shrink-0 bg-blue-500/10 text-blue-400 text-xs px-4 py-2 rounded-full border border-blue-500/20 self-start sm:self-auto">
              2026년 하반기 순차 오픈
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SELECT_PRODUCTS.map((p) => (
              <div key={p.id} className="bg-[#1a1a1a] border border-white/8 rounded-3xl overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <span className="bg-blue-500/70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{p.category}</span>
                    <span className="bg-white/15 text-white/70 text-xs px-2 py-1 rounded-full backdrop-blur-sm">준비중</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} /> {p.region}
                  </p>
                  <h3 className="text-white font-black mb-2 text-sm leading-snug">{p.name}</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">{p.desc}</p>
                  <a
                    href="mailto:wakation.sf@gmail.com?subject=Select%20상품%20제휴%20문의"
                    className="w-full flex items-center justify-center gap-2 bg-white/6 text-white/50 font-bold py-2.5 rounded-xl border border-white/10 text-xs hover:bg-white/12 hover:text-white/80 transition-all"
                  >
                    제휴 문의 <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs mt-8">
            파트너 상품 입점 문의: <a href="mailto:wakation.sf@gmail.com" className="underline hover:text-white/50 transition-colors">wakation.sf@gmail.com</a>
          </p>
        </div>
      </section>

      {/* 외부 서비스 — 해외 체류 준비 */}
      <AffiliateSection
        eyebrow="해외 체류 준비"
        title="글로벌 워케이션 필수 체크리스트"
        subtitle="숙소·체험·eSIM·여행자보험 등 해외 체류 준비를 도와주는 외부 서비스입니다. Wakation Select 직접 상품과 별개입니다."
        items={GLOBAL_PREP_ITEMS}
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
