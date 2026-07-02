'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { ACTIVITY_DESTINATIONS } from '@/lib/affiliate/destinations'

export default function ActivitySelectPage() {
  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select"
            className="inline-flex items-center gap-1.5 text-white/35 text-xs hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            Wakation Select
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500/50 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3">
            WAKATION SELECT · 현지 체험
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🎌 목적지별 투어·액티비티
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            현지 투어, 교통패스, 테마 입장권. KKday에서 워케이션 목적지별 체험 상품을 탐색하세요.
          </p>
          <p className="text-amber-400/40 text-xs mt-3 font-medium">
            ※ 현재 제휴 링크 준비 중. 페이지 이동 후 예약 가능합니다.
          </p>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-white/30 text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            목적지별 체험
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITY_DESTINATIONS.map((entry) => (
              <DestinationCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* KKday intro */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎌</span>
              <div>
                <p className="text-white font-black mb-1">KKday란?</p>
                <p className="text-white/40 text-sm leading-relaxed">
                  아시아 최대 여행 체험 플랫폼. 투어·교통패스·테마파크 입장권·쿠킹클래스까지.
                  현지에서 예약하는 것보다 저렴하고, 한국어 서비스가 지원됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="text-white/20 text-[0.65rem] leading-relaxed max-w-2xl">
            * 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다.
            외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.
          </p>
          <p className="text-white/15 text-[0.65rem] leading-relaxed max-w-2xl">
            Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}
