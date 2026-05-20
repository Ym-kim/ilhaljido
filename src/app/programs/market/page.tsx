'use client'

import Navbar from '@/components/Navbar'
import { ArrowRight, Globe, Users, TrendingUp, Building2 } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  { icon: <Globe className="w-6 h-6" />, title: '현장 시장조사', desc: '현지 도매상·박람회·로컬 유통망을 직접 눈으로 확인' },
  { icon: <Users className="w-6 h-6" />, title: '현지 네트워킹', desc: '같은 목적의 사업자들과 함께 이동하며 정보와 인사이트 공유' },
  { icon: <TrendingUp className="w-6 h-6" />, title: '사업 연결', desc: '발굴한 상품·파트너·시장 정보를 실제 사업에 바로 연결' },
  { icon: <Building2 className="w-6 h-6" />, title: '박람회 연계', desc: '현지 전시회·박람회 참관 및 바이어 미팅 지원' },
]

const UPCOMING = [
  { name: '일본 오사카 시장조사단', region: '오사카·도쿄', target: '이커머스·온라인 셀러', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
  { name: '중국 광저우 무역박람회', region: '광저우·선전', target: '소싱·수입 사업자', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80' },
  { name: '태국 방콕 시장조사단', region: '방콕·치앙마이', target: '동남아 시장 진출 사업자', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80' },
]

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=85"
          alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <p className="text-orange-400 text-xs font-black tracking-widest uppercase mb-3">📊 시장조사단·박람회</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            글로벌 시장을<br />직접 보고 사업에 연결
          </h1>
          <p className="text-white/60 mt-3 max-w-xl">이커머스·소싱·무역·글로벌 셀링을 준비하는 사업자를 위한 현장 시장조사 프로그램.</p>
        </div>
      </section>

      {/* 이 프로그램은? */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-orange-400 text-xs font-black tracking-widest uppercase mb-4">What is this?</p>
          <h2 className="text-3xl font-black text-white mb-4">시장조사단이란?</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
            혼자 떠나는 출장이 아니라, 같은 목적의 사업자들과 함께 이동하며 현지 시장을 조사하고, 박람회를 참관하고, 현지 바이어·공급사와 네트워킹하는 체류형 비즈니스 프로그램입니다.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4">{f.icon}</div>
                <h3 className="text-white font-black mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 준비중 프로그램 */}
      <section className="py-16 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-6">Coming Soon</p>
          <h2 className="text-2xl font-black text-white mb-8">준비중인 시장조사단</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {UPCOMING.map(u => (
              <div key={u.name} className="group bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/20 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="absolute top-4 left-4 bg-orange-500/80 text-white text-xs font-bold px-3 py-1 rounded-full">준비중</span>
                </div>
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-1">{u.region}</p>
                  <h3 className="text-white font-black mb-2">{u.name}</h3>
                  <p className="text-white/30 text-xs">{u.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사전 신청 */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-900/30 to-[#111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-4">시장조사단 사전 신청</h2>
          <p className="text-white/40 text-sm mb-8">참여 희망 국가·시장·일정을 알려주시면 프로그램 오픈 시 우선 안내드립니다.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@wakation.kr?subject=시장조사단 사전 신청"
              className="bg-orange-500 text-white font-black px-8 py-3.5 rounded-full hover:bg-orange-400 transition-all text-sm flex items-center justify-center gap-2">
              사전 신청 문의 <ArrowRight className="w-4 h-4" />
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
