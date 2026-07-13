'use client'

import Link from 'next/link'
import { ArrowLeft, BedDouble } from 'lucide-react'
import { useHashScroll } from '@/hooks/useHashScroll'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { DestinationCard } from '@/components/affiliate/DestinationCard'
import { DestinationSearch } from '@/components/affiliate/DestinationSearch'
import { HOTEL_DESTINATIONS } from '@/lib/affiliate/destinations'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { WishlistRail } from '@/components/affiliate/WishlistRail'
import { RecentRail } from '@/components/affiliate/RecentRail'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { FEATURED_STAYS, FEATURED_STAYS_V2, FEATURED_STAYS_V3 } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { localizeDestination } from '@/lib/affiliate/localizeDest'

// 숙소 관련 파트너 카드만 추출
const HOTEL_PARTNERS = GLOBAL_PREP_ITEMS.filter((i) =>
  ['hotel-booking', 'hotel-tripcom'].includes(i.id)
)

// 국가별 그룹핑 — 각 지역: 추천 개별 숙소(featuredIds) 먼저, 도시 검색 카드는 폴백
const REGIONS = [
  { id: 'region-japan',     labelKey: 'region_japan',     ids: ['japan-tokyo', 'japan-osaka', 'japan-kyoto', 'japan-fukuoka', 'japan-nagoya', 'japan-hiroshima', 'japan-okinawa', 'japan-sapporo', 'japan-kobe'], featuredIds: ['stay-millennials-shibuya', 'stay-lively-osaka', 'stay-webase-hakata', 'stay-mimaru-tokyo'] },
  { id: 'region-japan-small', labelKey: 'region_japan_small', ids: ['japan-kawaguchiko', 'japan-kanazawa', 'japan-yufuin'], featuredIds: [] },
  { id: 'region-korea',     labelKey: 'region_korea',     ids: ['korea-seoul', 'korea-jeju', 'korea-busan', 'korea-yangyang', 'korea-gangneung', 'korea-sokcho'], featuredIds: ['stay-playce-jeju', 'stay-fraser-seoul', 'stay-uh-busan', 'stay-skybay-gangneung'] },
  { id: 'region-thailand',  labelKey: 'region_thailand',  ids: ['thailand-chiangmai', 'thailand-bangkok', 'thailand-phuket'], featuredIds: ['stay-kantary-chiangmai', 'stay-lyf-sukhumvit-bangkok', 'stay-shama-bangkok', 'stay-naka-phuket'] },
  { id: 'region-vietnam',   labelKey: 'region_vietnam',   ids: ['vietnam-danang', 'vietnam-nhatrang', 'vietnam-hcmc'], featuredIds: ['stay-chicland-danang', 'stay-sanouva-danang', 'stay-seaside-nhatrang', 'stay-dhts-hcmc'] },
  { id: 'region-indonesia', labelKey: 'region_indonesia', ids: ['indonesia-bali', 'indonesia-ubud', 'indonesia-canggu'], featuredIds: ['stay-tribal-bali', 'stay-thenomad-canggu', 'stay-ubud-village', 'stay-fields-seminyak'] },
  { id: 'region-asia',      labelKey: 'region_asia',      ids: ['philippines-cebu', 'taiwan-taipei', 'singapore-city'], featuredIds: ['stay-nomadshub-cebu', 'stay-citizenm-taipei', 'stay-lyf-funan-singapore', 'stay-gloria-taipei'] },
  { id: 'region-oceania',   labelKey: 'region_oceania',   ids: ['australia-sydney', 'australia-melbourne', 'australia-goldcoast'], featuredIds: ['stay-adina-sydney', 'stay-meriton-kent-sydney', 'stay-adina-melbourne', 'stay-meriton-surfers-goldcoast'] },
  { id: 'region-china',     labelKey: 'region_china',     ids: ['china-shanghai', 'china-hongkong', 'china-guangzhou'], featuredIds: [] },
  { id: 'region-portugal',  labelKey: 'region_portugal',  ids: ['portugal-lisbon', 'portugal-porto', 'portugal-faro'], featuredIds: [] },
]

export default function HotelSelectPage() {
  const { lang, tr } = useLang()
  useHashScroll()

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
            Wakation Select · {tr('selh_cat')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {tr('selh_t_pre')}<span className="text-brand-mid">{tr('selh_t_accent')}</span>
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">
            {tr('selh_desc')}
          </p>

          {/* 도시 검색 → Booking 검색결과 직행 (어필리에이트 추적) */}
          <div className="mt-6 max-w-2xl">
            <DestinationSearch mode="hotel" />
          </div>

          {/* 목적지 퀵점프 */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-1 [&::-webkit-scrollbar]:hidden">
            {REGIONS.map((r) => (
              <a
                key={r.id}
                href={`#${r.ids[0]}`}
                className="shrink-0 inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] hover:border-[#7dd3fc] hover:text-[#111827] transition-all"
              >
                {tr(r.labelKey)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 찜한 상품 · 최근 본 — 재방문 재클릭 동선 (기록 있을 때만 렌더) */}
      <WishlistRail />
      <RecentRail />

      {/* Destination sections — 추천 개별 숙소 먼저, 도시 검색은 폴백 */}
      {REGIONS.map((region) => {
        const destinations = HOTEL_DESTINATIONS.filter((d) => region.ids.includes(d.id))
        const featuredPool = [...FEATURED_STAYS, ...FEATURED_STAYS_V2, ...FEATURED_STAYS_V3]
        // featuredIds 순서대로 정렬 (지역별 4장 진열 순서 유지)
        const featured = region.featuredIds
          .map((id) => featuredPool.find((i) => i.id === id))
          .filter((i): i is (typeof featuredPool)[number] => Boolean(i))
        if (destinations.length === 0 && featured.length === 0) return null
        return (
          <section key={region.id} id={region.id} className="px-6 pb-10 border-t border-[#e0f2fe] scroll-mt-24">
            <div className="max-w-6xl mx-auto pt-10">
              <p className="text-[#111827] font-black text-base mb-5">{tr(region.labelKey)}</p>

              {/* 1) 에디터 추천 개별 숙소 — 지역별 4장 진열: 폰 2열·데스크톱 4열 모두 빈칸 없음 */}
              {featured.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-6">
                  {featured.map((item) => (
                    <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
                  ))}
                </div>
              )}

              {/* 2) 도시별 전체 검색 (폴백) */}
              <p className="text-[#94a3b8] text-[0.65rem] font-bold tracking-[0.14em] uppercase mb-3">
                {tr('selh_region_search')}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map((entry) => (
                  <DestinationCard key={entry.id} entry={localizeDestination(entry, lang)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Partner overview — 원하는 도시가 없을 때 최종 폴백 */}
      <section className="px-6 pb-10 border-t border-[#e0f2fe] bg-[#f0f9ff]/50">
        <div className="max-w-6xl mx-auto pt-10">
          <p className="text-[#94a3b8] text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
            {tr('selh_partners')}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {HOTEL_PARTNERS.map((item) => (
              <AffiliateCard key={item.id} item={localizeAffiliateItem(item, lang)} visual />
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
          <p className="text-[#a8a29e] text-[0.65rem] leading-relaxed max-w-2xl">{tr('sel_disc_1')}</p>
          <p className="text-[#c0bcb6] text-[0.65rem] leading-relaxed max-w-2xl">{tr('sel_disc_2')}</p>
        </div>
      </section>
    </div>
  )
}
