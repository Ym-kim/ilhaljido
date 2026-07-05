'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BedDouble } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { HOTEL_DESTINATIONS } from '@/lib/affiliate/destinations'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'

// 숙소 관련 파트너 카드만 추출
const HOTEL_PARTNERS = GLOBAL_PREP_ITEMS.filter((i) =>
  ['hotel-booking', 'hotel-tripcom'].includes(i.id)
)

// 국가별 그룹핑
const REGIONS = [
  { id: 'region-japan',    label: '🇯🇵 일본',            ids: ['japan-tokyo', 'japan-osaka', 'japan-fukuoka'] },
  { id: 'region-vietnam',  label: '🇻🇳 베트남',          ids: ['vietnam-danang', 'vietnam-hcmc'] },
  { id: 'region-indonesia', label: '🇮🇩 발리·인도네시아', ids: ['indonesia-bali'] },
  { id: 'region-portugal', label: '🇵🇹 포르투갈',        ids: ['portugal-lisbon'] },
  { id: 'region-korea',    label: '🇰🇷 국내',            ids: ['korea-jeju', 'korea-yangyang', 'korea-gangneung'] },
]

export default function HotelSelectPage() {
  const { lang } = useLang()

  // 홈 히어로 칩 등 해시 딥링크 — hydration 이후 대상 카드로 스크롤
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    // Next 라우터의 전환 후 스크롤 리셋보다 늦게, 두 번 시도해 확실히 이동
    const scroll = () =>
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const t1 = setTimeout(scroll, 150)
    const t2 = setTimeout(scroll, 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

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
      <section className="px-6 pt-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3 flex items-center gap-2">
            <BedDouble className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            Wakation Select · 숙소
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            목적지별 숙소, <span className="text-brand-mid">최저가로 예약</span>
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            장기체류·아파트먼트·서비스드 레지던스. 워케이션에 적합한 숙소를 목적지별로 바로 검색하세요.
          </p>

          {/* 목적지 퀵점프 */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-1 [&::-webkit-scrollbar]:hidden">
            {REGIONS.map((r) => (
              <a
                key={r.id}
                href={`#${r.ids[0]}`}
                className="shrink-0 inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] hover:border-[#7dd3fc] hover:text-[#111827] transition-all"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner overview */}
      <section className="px-6 pb-10 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
            공식 제휴 파트너
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {HOTEL_PARTNERS.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* Destination sections */}
      {REGIONS.map((region) => {
        const destinations = HOTEL_DESTINATIONS.filter((d) => region.ids.includes(d.id))
        if (destinations.length === 0) return null
        return (
          <section key={region.label} id={region.id} className="px-6 pb-10 border-t border-[#e0f2fe] scroll-mt-24">
            <div className="max-w-6xl mx-auto pt-10">
              <p className="text-[#111827] font-black text-base mb-5">{region.label}</p>
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
