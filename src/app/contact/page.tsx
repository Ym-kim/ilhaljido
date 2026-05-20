'use client'

import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

const CONTACT_TYPES = [
  {
    emoji: '🗺️',
    title: '프로그램 참가 문의',
    desc: '워케이션 프로그램 신청, 일정 확인, 참가 조건 등을 문의하세요.',
    subject: '프로그램 참가 문의',
  },
  {
    emoji: '🤝',
    title: '파트너십·제휴 문의',
    desc: '공간, 강사, 기관, 어학원 등 Wakation과의 협업을 원하시면 문의해 주세요.',
    subject: '파트너십·제휴 문의',
  },
  {
    emoji: '🏢',
    title: '단체·기업 문의',
    desc: '팀 워케이션, 기업 리트릿, 단체 프로그램 기획 등을 문의하세요.',
    subject: '단체·기업 문의',
  },
  {
    emoji: '🏠',
    title: '공간·숙소 입점 문의',
    desc: '스테이·공유오피스·코리빙 공간의 Wakation 파트너 등록을 문의하세요.',
    subject: '공간·숙소 입점 문의',
  },
  {
    emoji: '📰',
    title: '언론·투자 문의',
    desc: '미디어 취재, 투자 관련 문의는 이 채널을 이용해 주세요.',
    subject: '언론·투자 문의',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-28 pb-12 px-6 text-center">
        <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-4">Contact</p>
        <h1 className="text-5xl font-black text-gray-900 mb-4">문의하기</h1>
        <p className="text-gray-500 text-sm">담당자가 1영업일 이내 연락드립니다.</p>
      </section>

      {/* ── Contact cards ── */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CONTACT_TYPES.map(c => (
              <a
                key={c.title}
                href={`mailto:hello@wakation.kr?subject=${encodeURIComponent(c.subject)}`}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4">
                <span className="text-4xl">{c.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-teal-600 text-sm font-bold group-hover:gap-2 transition-all mt-2">
                  문의하기 <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* ── Kakao open chat ── */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-3xl p-8 text-center">
            <span className="text-4xl mb-4 block">💬</span>
            <h3 className="text-xl font-black text-gray-900 mb-2">카카오 오픈채팅</h3>
            <p className="text-gray-500 text-sm mb-5">빠른 답변이 필요하신 분은 카카오 오픈채팅을 이용해 주세요.</p>
            <button
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-300 transition-colors"
              onClick={() => alert('카카오 오픈채팅은 준비 중입니다. hello@wakation.kr로 문의해 주세요.')}>
              카카오 오픈채팅 열기
            </button>
          </div>

          {/* ── Note ── */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-xs">
              모든 문의는 <strong className="text-gray-600">hello@wakation.kr</strong> 로 접수됩니다.
              담당자가 1영업일 이내 연락드립니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
