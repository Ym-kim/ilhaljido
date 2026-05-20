'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

const PROGRAMS = [
  {
    id: 'domestic',
    title: '국내 워케이션',
    desc: '양양·강릉·제주 등 국내 거점에서 일하며 쉬는 체류형 워케이션.',
    href: '/programs/domestic',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80',
    badge: '🔥 양양 1기 모집중',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 'global',
    title: '글로벌 워케이션',
    desc: '발리·치앙마이·도쿄 등 해외 거점에서 일하며 성장하는 글로벌 체류.',
    href: '/programs/global',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=80',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'market',
    title: '시장조사단·박람회',
    desc: '글로벌 시장을 직접 보고 사업에 연결하는 현장 탐방형 프로그램.',
    href: '/programs/market',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=80',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'language',
    title: '어학·유학',
    desc: '일하면서 언어를 배우는 체류 프로그램. 해외 어학원 연계.',
    href: '/language',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'cruise',
    title: '크루즈 워케이션',
    desc: '바다 위에서 일하며 이동하는 워케이션. 항구마다 새로운 영감.',
    href: '/cruise',
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80',
    badge: null,
    badgeColor: '',
  },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
          <span className="inline-block text-teal-300 text-xs font-bold tracking-widest uppercase mb-3 border border-teal-300/40 px-3 py-1 rounded-full">
            워케이션 프로그램
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
            {'일하는 방식을 바꾸는\n체류형 성장 프로그램'}
          </h1>
        </div>
      </section>

      {/* ── Programs grid ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-500 text-xs font-bold tracking-widest uppercase mb-3">Programs</p>
            <h2 className="text-3xl font-black text-gray-900">5가지 체류형 프로그램</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROGRAMS.map(p => (
              <Link
                key={p.id}
                href={p.href}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {p.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={`${p.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                        {p.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold mt-5 group-hover:gap-2 transition-all">
                    자세히 보기 <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">어떤 프로그램이 나에게 맞을까?</h2>
          <p className="text-gray-400 mb-8 text-sm">비자 AI로 국가·목적·기간별 맞춤 추천을 받아보세요.</p>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-8 py-4 rounded-full hover:bg-teal-400 transition-all">
            비자·체류 AI 시작하기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
