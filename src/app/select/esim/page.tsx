'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { ESIM_DESTINATIONS } from '@/lib/affiliate/destinations'

const HOW_TO = [
  { step: '1', text: '목적지 eSIM 선택' },
  { step: '2', text: 'Airalo 앱에서 구매' },
  { step: '3', text: '출발 전 QR 스캔 설치' },
  { step: '4', text: '도착 즉시 자동 연결' },
]

export default function EsimSelectPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/select"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            Wakation Select
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-600 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3">
            WAKATION SELECT · eSIM
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            📡 목적지별 eSIM 즉시 구매
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            공항 유심 줄 없이. 출발 전 설치하고, 현지 도착 즉시 연결. Airalo로 200개국 eSIM을 앱에서 바로 구매하세요.
          </p>
          <p className="text-amber-600/80 text-xs mt-3 font-medium">
            ※ 현재 추천 링크 준비 중. 페이지 이동 후 구매 가능합니다.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-10 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            eSIM 사용 방법
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HOW_TO.map((item) => (
              <div key={item.step} className="bg-white border border-[#e0f2fe] rounded-xl p-4 text-center">
                <div className="w-7 h-7 rounded-full bg-[#f0f9ff] border border-[#dbeafe] flex items-center justify-center text-[#64748b] text-xs font-black mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-[#64748b] text-xs leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-black tracking-[0.18em] uppercase mb-6">
            목적지별 eSIM
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ESIM_DESTINATIONS.map((entry) => (
              <DestinationCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Airalo intro */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="bg-white border border-[#e0f2fe] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📡</span>
              <div>
                <p className="text-[#111827] font-black mb-1">Airalo란?</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  200개국 eSIM을 앱 하나로. 물리적 유심 교체 없이 QR 스캔만으로 개통.
                  단기·장기 플랜 선택 가능. 멀티국 플랜으로 여러 나라를 하나의 eSIM으로 이용할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl">
            * 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다.
            외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.
          </p>
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">
            Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}
