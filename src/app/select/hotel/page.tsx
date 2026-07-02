'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { HOTEL_DESTINATIONS } from '@/lib/affiliate/destinations'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'

// 숙소 관련 파트너 카드만 추출
const HOTEL_PARTNERS = GLOBAL_PREP_ITEMS.filter((i) =>
  ['hotel-booking', 'hotel-tripcom'].includes(i.id)
)

// 국가별 그룹핑
const REGIONS = [
  { label: '🇯🇵 일본', ids: ['japan-tokyo', 'japan-osaka', 'japan-fukuoka'] },
  { label: '🇻🇳 베트남', ids: ['vietnam-danang', 'vietnam-hcmc'] },
  { label: '🇮🇩 발리·인도네시아', ids: ['indonesia-bali'] },
  { label: '🇵🇹 포르투갈', ids: ['portugal-lisbon'] },
  { label: '🇰🇷 국내', ids: ['korea-jeju', 'korea-yangyang', 'korea-gangneung'] },
]

export default function HotelSelectPage() {
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
          <p className="text-teal-500/60 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-3">
            WAKATION SELECT · 숙소
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            🛎 목적지별 숙소 예약
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            장기체류·아파트먼트·서비스드 레지던스. 워케이션에 적합한 숙소를 목적지별로 바로 검색하세요.
          </p>
        </div>
      </section>

      {/* Partner overview */}
      <section className="px-6 pb-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-white/30 text-[0.65rem] font-black tracking-[0.18em] uppercase mb-5">
            파트너 서비스
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {HOTEL_PARTNERS.map((item) => (
              <AffiliateCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Destination sections */}
      {REGIONS.map((region) => {
        const destinations = HOTEL_DESTINATIONS.filter((d) => region.ids.includes(d.id))
        if (destinations.length === 0) return null
        return (
          <section key={region.label} className="px-6 pb-10 border-t border-white/5">
            <div className="max-w-6xl mx-auto pt-10">
              <p className="text-white font-black text-base mb-5">{region.label}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map((entry) => (
                  <DestinationCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

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
