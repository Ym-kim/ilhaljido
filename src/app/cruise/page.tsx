'use client'
import { useLang } from '@/context/LanguageContext'
import Image from 'next/image'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { FEATURED_CRUISES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { usePriceWatch } from '@/hooks/usePriceWatch'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getCruiseFeatures, getCruiseRoutes } from '@/lib/i18n'
import { Anchor, Wifi, Globe } from 'lucide-react'
import { EditorialBanner } from '@/components/editorial/EditorialBanner'

const FEAT_ICONS = { wifi: Wifi, ports: Globe, all: Anchor } as const

export default function CruisePage() {
  const { lang, tr } = useLang()
  const features = getCruiseFeatures(lang)
  const routes = getCruiseRoutes(lang)
  // 1일 1회 갱신되는 검증가 — 있으면 정적 priceFrom을 덮어씀
  const livePrices = usePriceWatch()

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        <Image src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <SectionEyebrow onDark>{tr('cruise_badge')}</SectionEyebrow>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">{tr('cruise_title')}</h1>
          <p className="text-lead-on-dark mt-3 max-w-xl">{tr('cruise_desc')}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = FEAT_ICONS[f.id as keyof typeof FEAT_ICONS] ?? Anchor
            return (
              <div key={f.id} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">{tr('cruise_routes_title')}</h2>
          <div className="space-y-6">
            {routes.map((r) => (
              <div key={r.id} className="group flex flex-col md:flex-row gap-6 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                  <Image src={r.img} alt={r.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col justify-center flex-1">
                  <p className="text-gray-400 text-xs mb-1">{r.days}</p>
                  <h3 className="font-black text-gray-900 text-xl mb-2">{r.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{r.ports}</p>
                  {/* 고정가 노출 제거 — 가격표현 금지 방침 (요금은 파트너사에서 최종 확인) */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <a
                      href="https://kr.trip.com/cruises/?Allianceid=9024807"
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-mid text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-light transition-all shadow-sm"
                    >
                      {tr('cruise_search')} · Trip.com
                    </a>
                    <a
                      href={`https://www.booking.com/searchresults.html?aid=7854081&ss=${encodeURIComponent(r.portQuery)}`}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-500 px-4 py-2 rounded-full text-xs font-bold hover:border-brand-mid hover:text-brand-mid transition-all"
                    >
                      {tr('port_stay')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 미라클호 크루즈 워케이션 아티클 배너 — 공용 EditorialBanner (2026-07-19 통일) */}
      <section className="px-6 py-10 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <EditorialBanner
            href="/cruise/miracle"
            eyebrow={lang === 'EN' ? 'Editorial · Transit Workation' : lang === 'JP' ? '特集 · 移動型ワーケーション' : '에디토리얼 · 이동형 워케이션'}
            title={lang === 'EN' ? 'Deep work at sea — 17 hours from Busan to Osaka' : lang === 'JP' ? '海の上の17時間 — 釜山発大阪行きディープワーク' : '바다 위 17시간, 부산—오사카 크루즈 워케이션'}
            sub={lang === 'EN' ? 'PanStar Miracle: two buffet meals, satellite Wi-Fi, no baggage limits.' : lang === 'JP' ? 'パンスター·ミラクル：ビュッフェ2食·衛星Wi-Fi·手荷物制限なし。' : '팬스타 미라클호 — 뷔페 2식·위성 와이파이·수하물 걱정 제로.'}
            cta={lang === 'EN' ? 'Read the guide →' : lang === 'JP' ? 'ガイドを読む →' : '가이드 읽기 →'}
          />
        </div>
      </section>

      {/* 지금 예약 가능한 크루즈 — 실존 상품 */}
      <section className="px-6 py-14 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid animate-pulse inline-block" />
            {tr('cruise_featured')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('cruise_featured_d')}</p>
          {/* 5장 기준: lg 3열(3+2)·xl 5열 한 줄 — 4열 고아 카드 방지 (2026-07-19) */}
          <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {FEATURED_CRUISES.map((item) => (
              <AffiliateCard
                key={item.id}
                item={localizeAffiliateItem(
                  livePrices[item.id] ? { ...item, priceFrom: livePrices[item.id] } : item,
                  lang
                )}
                visual
              />
            ))}
          </div>
        </div>
      </section>

      {/* 여행 준비 크로스셀 — Wakation Select */}
      <AffiliateSection
        eyebrow="Wakation Select"
        title={tr('prep_title')}
        subtitle={tr('prep_sub')}
        items={GLOBAL_PREP_ITEMS.map((i) => localizeAffiliateItem(i, lang))}
      />
    </div>
  )
}
