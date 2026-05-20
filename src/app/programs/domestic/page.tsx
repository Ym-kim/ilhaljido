'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'

const CURRENT = [
  {
    tag: '🔥 모집중', tagColor: 'bg-teal-500',
    name: 'Wakation 양양 1기 파일럿',
    region: '강원도 양양',
    duration: '2박 3일',
    price: '299,000',
    desc: '양양 바다 앞에서 일하고, 쉬고, 성장 방향을 잡는 체류형 워케이션 성장 프로그램.',
    includes: ['2박 숙박', '웨이브웍스 종일', '바베큐 네트워킹', '성장 세션'],
    href: '/programs/yangyang-1',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
]

const UPCOMING = [
  { name: '강릉 워케이션', region: '강원도 강릉', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
  { name: '제주 워케이션', region: '제주도', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { name: '전주 워케이션', region: '전라북도 전주', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
  { name: '여수 워케이션', region: '전라남도 여수', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
]

export default function DomesticPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
          alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">🏡 국내 워케이션</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            국내 거점에서<br />일하고 성장하다
          </h1>
          <p className="text-white/60 mt-3 max-w-xl">양양·강릉·제주·전주·여수. 사무실을 벗어난 공간에서 업무 몰입과 회복, 성장이 동시에.</p>
        </div>
      </section>

      {/* 현재 모집중 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-6">현재 모집중</p>
          {CURRENT.map(p => (
            <div key={p.name} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-4 left-4 ${p.tagColor} text-white text-xs font-black px-3 py-1 rounded-full`}>{p.tag}</span>
                </div>
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-white/40 text-xs flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{p.region} · {p.duration}</p>
                    <h2 className="text-2xl font-black text-white mb-3">{p.name}</h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.includes.map(t => (
                        <span key={t} className="flex items-center gap-1 bg-white/5 text-white/60 text-xs px-3 py-1 rounded-full border border-white/10">
                          <CheckCircle2 className="w-3 h-3 text-teal-400" />{t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-black text-white">₩{p.price}</span>
                      <span className="text-white/40 text-sm ml-1">VAT 포함</span>
                    </div>
                    <Link href={p.href}
                      className="bg-teal-500 text-white font-black px-6 py-3 rounded-full hover:bg-teal-400 transition-all flex items-center gap-2 text-sm">
                      자세히 보기 <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 다음 거점 예고 */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">Coming Soon</p>
          <h2 className="text-2xl font-black text-white mb-8">다음 워케이션 거점</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {UPCOMING.map(u => (
              <div key={u.name} className="group relative rounded-2xl overflow-hidden h-40 cursor-default">
                <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white/40 text-xs mb-1">{u.region}</p>
                  <p className="text-white font-bold text-sm">{u.name}</p>
                  <span className="text-white/30 text-xs mt-1">준비중</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm mb-4">다음 프로그램 알림을 받고 싶으신가요?</p>
            <a href="mailto:hello@wakation.kr"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              사전 신청 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
