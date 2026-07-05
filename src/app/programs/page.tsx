'use client'

import Link from 'next/link'
import { ArrowRight, Mail, BellRing, Handshake } from 'lucide-react'
import { SectionEyebrow, SectionTitle } from '@/components/brand/SectionEyebrow'
import { useLang } from '@/context/LanguageContext'
import { getProgramsList } from '@/lib/i18n'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { PROGRAMS_LEARN_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

const SELECT_CATEGORIES = [
  {
    id: 'stay',
    emoji: '🏨',
    name: '숙소·장기체류',
    desc: '워케이션·장기체류에 최적화된 숙소. 주간/월간 단위 체류 상품을 파트너사와 연결합니다.',
    status: '파트너 모집중',
    statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
    cta: '파트너 제안하기',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=숙소·장기체류%20파트너%20제안',
  },
  {
    id: 'cowork',
    emoji: '💻',
    name: '공유오피스·코워킹',
    desc: '국내외 코워킹 스페이스와 공유오피스. 일 잘 되는 환경에서 일하는 사람을 위한 공간 파트너십.',
    status: '제휴 검토중',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    cta: '제휴 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=코워킹%20제휴%20문의',
  },
  {
    id: 'activity',
    emoji: '🌿',
    name: '현지 체험',
    desc: '현지에서만 경험할 수 있는 투어·액티비티·문화 체험. 워케이션 참가자 대상 큐레이션 예정.',
    status: '준비중',
    statusColor: 'bg-gray-50 text-gray-500 border-gray-200',
    cta: '알림 받기',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=현지%20체험%20알림%20신청',
  },
  {
    id: 'transport',
    emoji: '✈️',
    name: '교통·항공·이동',
    desc: '워케이션 동선에 맞춘 항공권·렌터카·현지 교통 연결. 파트너 API 연동 검토 중.',
    status: '제휴 검토중',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    cta: '제휴 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=교통·항공%20제휴%20문의',
  },
  {
    id: 'language',
    emoji: '📚',
    name: '어학·유학',
    desc: '일본·영어·기타 외국어 집중 연수와 워케이션을 결합한 패키지. Select 상품으로 연결 예정.',
    status: '사전 문의 가능',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    cta: '사전 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=어학·유학%20사전%20문의',
  },
  {
    id: 'visa',
    emoji: '🛂',
    name: '비자·체류 정보',
    desc: '국가별 워케이션 비자, 디지털 노마드 비자, 장기체류 허가. AI 기반 정보 제공 준비 중.',
    status: '준비중',
    statusColor: 'bg-gray-50 text-gray-500 border-gray-200',
    cta: '알림 받기',
    ctaHref: '/visa-ai',
  },
  {
    id: 'market',
    emoji: '📊',
    name: '시장조사단·박람회',
    desc: '해외 박람회 동반 참가 및 현장 리서치 프로그램. Wakation Hosted + Select 파트너 모집 중.',
    status: '파트너 모집중',
    statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
    cta: '파트너 제안하기',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=시장조사단%20파트너%20제안',
  },
  {
    id: 'cruise',
    emoji: '🚢',
    name: '크루즈',
    desc: '이동하면서 일하는 새로운 형태의 크루즈 워케이션. 파트너 모집 및 수요 조사 중.',
    status: '파트너 모집중',
    statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
    cta: '프로그램 제안하기',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=크루즈%20워케이션%20제안',
  },
  {
    id: 'golf',
    emoji: '⛳',
    name: '골프·스포츠',
    desc: '골프 포함 스포츠 워케이션 패키지. 국내외 골프 리조트 파트너십 검토 중.',
    status: '제휴 검토중',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    cta: '제휴 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=골프·스포츠%20제휴%20문의',
  },
  {
    id: 'education',
    emoji: '🎓',
    name: '교육·VOD·강의',
    desc: '워케이션 중 성장을 위한 온·오프라인 강의, VOD, 코칭 프로그램. 에듀테크 파트너 모집 중.',
    status: '파트너 모집중',
    statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
    cta: '파트너 제안하기',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=교육·VOD%20파트너%20제안',
  },
  {
    id: 'wellness',
    emoji: '🧘',
    name: '요가·힐링',
    desc: '요가 리트릿, 명상, 힐링 워케이션. 웰니스와 업무의 균형을 찾는 사람들을 위한 프로그램.',
    status: '사전 문의 가능',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    cta: '사전 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=요가·힐링%20워케이션%20사전%20문의',
  },
  {
    id: 'ryokan',
    emoji: '♨️',
    name: '료칸·온천',
    desc: '일본 전통 료칸에서 업무와 온천을 함께. 일본 파트너사와 연결하는 고품격 워케이션.',
    status: '제휴 검토중',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    cta: '제휴 문의',
    ctaHref: 'mailto:wakation.sf@gmail.com?subject=료칸·온천%20제휴%20문의',
  },
]

const STATUS_ICON = {
  '파트너 모집중': Handshake,
  '제휴 검토중': Mail,
  '준비중': BellRing,
  '사전 문의 가능': Mail,
}

export default function ProgramsPage() {
  const { lang, tr } = useLang()
  const programs = getProgramsList()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="relative h-[50vh] flex items-end overflow-hidden dark-surface">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <SectionEyebrow onDark pill>
            {tr('programs_hero_badge')}
          </SectionEyebrow>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {tr('programs_hero_title')}
          </h1>
        </div>
      </section>

      {/* Wakation Hosted — 공식 프로그램 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionEyebrow>{tr('programs_grid_eyebrow')}</SectionEyebrow>
            <SectionTitle className="text-center">{tr('programs_grid_title')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={tr(p.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {p.badgeKey && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {tr(p.badgeKey)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{tr(p.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tr(p.descKey)}</p>
                  <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold mt-5 group-hover:gap-2 transition-all">
                    {tr('learn_more')} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wakation Select — 12개 카테고리 수익화 기반 */}
      <section className="py-20 px-6 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-4">WAKATION SELECT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight">
              단계적으로 연결되는<br className="hidden sm:block" /> 파트너 상품 카테고리
            </h2>
            <p className="text-[#64748b] text-sm max-w-xl mx-auto leading-relaxed">
              Wakation은 직접 운영하는 Hosted 프로그램 외에, 검증된 외부 파트너와의 Select 상품을 순차 연결합니다.<br />
              현재 파트너십 수요 조사 및 제휴 협의 진행 중입니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SELECT_CATEGORIES.map((cat) => {
              const StatusIcon = STATUS_ICON[cat.status as keyof typeof STATUS_ICON] ?? BellRing
              const isMailto = cat.ctaHref.startsWith('mailto:')
              return (
                <div
                  key={cat.id}
                  className="bg-white border border-[#dbeafe] rounded-2xl p-6 hover:border-[#7dd3fc] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${cat.statusColor}`}>
                      <StatusIcon className="w-3 h-3" strokeWidth={2} />
                      {cat.status}
                    </span>
                  </div>
                  <h3 className="text-[#111827] font-black mb-2">{cat.name}</h3>
                  <p className="text-[#64748b] text-xs leading-relaxed mb-5">{cat.desc}</p>
                  {isMailto ? (
                    <a
                      href={cat.ctaHref}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#f0f9ff] text-[#475569] font-bold py-2.5 rounded-xl border border-[#dbeafe] text-xs hover:bg-[#e0f2fe] hover:text-[#111827] transition-all"
                    >
                      {cat.cta} <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={cat.ctaHref}
                      className="w-full flex items-center justify-center gap-1.5 bg-[#f0f9ff] text-[#475569] font-bold py-2.5 rounded-xl border border-[#dbeafe] text-xs hover:bg-[#e0f2fe] hover:text-[#111827] transition-all"
                    >
                      {cat.cta} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#94a3b8] text-xs mb-3">파트너십 제안 및 제휴 문의</p>
            <a
              href="mailto:wakation.sf@gmail.com?subject=Wakation%20파트너십%20제안"
              className="inline-flex items-center gap-2 bg-white text-[#475569] font-bold px-6 py-3 rounded-full border border-[#dbeafe] text-sm hover:border-[#7dd3fc] hover:text-[#111827] transition-all"
            >
              <Mail className="w-4 h-4" />
              wakation.sf@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* 워케이션 중 성장 */}
      <AffiliateSection
        tone="light"
        title="워케이션 중에도 계속 성장하세요"
        subtitle="이동 시간·여유 시간을 활용해 스킬을 쌓을 수 있는 온라인 강의 플랫폼입니다."
        items={PROGRAMS_LEARN_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
        cols={2}
      />

      {/* CTA */}
      <section className="dark-surface py-20 px-6 bg-gradient-to-b from-[#04121f] to-[#0a1e33]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle onDark className="mb-4 text-center">
            {tr('programs_cta_title')}
          </SectionTitle>
          <p className="text-caption-on-dark mb-8">{tr('programs_cta_desc')}</p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all"
          >
            {tr('home_ai_cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
