'use client'

import Navbar from '@/components/Navbar'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const DESTINATIONS = [
  { name: '발리 워케이션', country: '인도네시아', region: '발리 우붓·짱구', tag: '정글·바다', status: '준비중', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { name: '치앙마이 워케이션', country: '태국', region: '치앙마이 님만', tag: '도심·자연', status: '준비중', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80' },
  { name: '오사카·도쿄 워케이션', country: '일본', region: '오사카·도쿄', tag: '비즈니스', status: '준비중', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
  { name: '다낭 워케이션', country: '베트남', region: '다낭·호이안', tag: '해변', status: '준비중', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
  { name: '세부 워케이션', country: '필리핀', region: '세부', tag: '어학+워케이션', status: '준비중', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: '시드니·멜버른', country: '호주', region: 'NSW·VIC', tag: '선진국 인프라', status: '준비중', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80' },
]

export default function GlobalPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=85"
          alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-teal-400 text-xs font-black tracking-widest uppercase mb-3">🌏 글로벌 워케이션</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            전 세계 거점에서<br />일하며 성장하다
          </h1>
          <p className="text-white/60 mt-3 max-w-xl">발리·치앙마이·오사카·다낭·세부·호주. 글로벌 체류 환경에서 업무와 네트워킹을 동시에.</p>
        </div>
      </section>

      {/* 준비중 거점들 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-2">Coming Soon</p>
              <h2 className="text-2xl font-black text-white">글로벌 워케이션 거점</h2>
            </div>
            <span className="bg-white/5 text-white/40 text-xs px-4 py-2 rounded-full border border-white/10">순차 오픈 예정</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESTINATIONS.map(d => (
              <div key={d.name} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 bg-teal-500/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{d.tag}</span>
                  <span className="absolute top-4 right-4 bg-black/50 text-white/60 text-xs px-2 py-1 rounded-full backdrop-blur-sm">{d.country}</span>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />{d.region}</p>
                  <h3 className="text-white font-black mb-3">{d.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">준비중</span>
                    <a href="mailto:hello@wakation.kr"
                      className="text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors flex items-center gap-1">
                      사전 신청 <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사전 신청 CTA */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">원하는 도시가 있나요?</h2>
          <p className="text-white/40 text-sm mb-8">사전 신청 수요가 많은 도시부터 순차적으로 오픈합니다.<br />희망 도시와 시기를 알려주세요.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@wakation.kr?subject=글로벌 워케이션 사전 신청"
              className="bg-teal-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-teal-400 transition-all text-sm">
              사전 신청 문의
            </a>
            <Link href="/programs"
              className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm">
              전체 프로그램 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
