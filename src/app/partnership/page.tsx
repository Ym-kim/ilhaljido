'use client'

import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

const PARTNER_TYPES = [
  {
    emoji: '🏛️',
    title: '지자체·관광재단',
    desc: '생활인구 프로그램 연계, 지역 활성화 사업과 협력하여 워케이션 거점을 조성합니다.',
  },
  {
    emoji: '🏠',
    title: '숙소·공유오피스·코리빙',
    desc: 'Wakation 검증 기준을 통과한 공간은 워케이션 전문 파트너로 등록됩니다.',
  },
  {
    emoji: '📖',
    title: '강의 플랫폼·강사',
    desc: '성장캠프 및 워케이션 프로그램에 강의 콘텐츠를 제공하는 교육 파트너입니다.',
  },
  {
    emoji: '🗣️',
    title: '어학원·유학원',
    desc: '어학연수·유학 체류 프로그램 연계를 위한 파트너십. 해외 어학원 직접 협력.',
  },
  {
    emoji: '✈️',
    title: '에어비앤비 호스트',
    desc: '해외 파트너 스테이 프로그램. 발리·오사카 등 워케이션 특화 호스트를 모집합니다.',
  },
  {
    emoji: '🏢',
    title: '기업 HR·리트릿',
    desc: '팀 워케이션, 기업 리트릿 프로그램 기획 및 운영. B2B 기업 파트너십.',
  },
  {
    emoji: '🏗️',
    title: 'B2G 생활인구 프로그램',
    desc: '정부·지자체의 생활인구 유치 사업과 연계한 워케이션 프로그램 운영.',
  },
  {
    emoji: '🌐',
    title: '글로벌 박람회·세미나',
    desc: '시장조사단·박람회 프로그램 연계. 해외 전시·세미나 기관과 협력합니다.',
  },
]

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <span className="inline-block text-teal-300 text-xs font-bold tracking-widest uppercase mb-3 border border-teal-300/40 px-3 py-1 rounded-full">
            파트너십
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            함께 만드는 Wakation
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 px-6 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-4">Why Partner</p>
          <h2 className="text-3xl font-black text-gray-900 mb-5">체류형 성장 생태계를 함께 만들어갑니다</h2>
          <p className="text-gray-500 leading-relaxed text-sm">
            Wakation은 지자체·숙소·강사·어학원·에어비앤비 호스트·기업 HR 등
            다양한 파트너와 협력하여 일하는 사람을 위한 글로벌 체류 플랫폼을 구축하고 있습니다.
          </p>
        </div>
      </section>

      {/* ── Partner types grid ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-3">Partner Types</p>
            <h2 className="text-3xl font-black text-gray-900">8가지 파트너십 유형</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_TYPES.map(p => (
              <div key={p.title} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
                <span className="text-3xl">{p.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
                <a
                  href="mailto:hello@wakation.kr?subject=파트너십 문의"
                  className="inline-flex items-center gap-1 text-teal-600 text-xs font-bold hover:gap-2 transition-all">
                  문의하기 <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl font-black text-white mb-5">파트너십 문의</h2>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed">
            Wakation과 함께 성장하고 싶은 기관·기업·개인 모두 환영합니다.
            담당자가 1영업일 이내 연락드립니다.
          </p>
          <a
            href="mailto:hello@wakation.kr?subject=파트너십 문의"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-10 py-5 rounded-full text-lg hover:bg-teal-400 transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/30">
            파트너십 문의하기 <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-500 text-xs mt-6">hello@wakation.kr</p>
        </div>
      </section>
    </div>
  )
}
