'use client'
import { useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import Image from 'next/image'
import Link from 'next/link'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { FEATURED_CRUISES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { usePriceWatch } from '@/hooks/usePriceWatch'
import { GLOBAL_PREP_ITEMS } from '@/lib/affiliate/links'
import { SectionEyebrow } from '@/components/brand/SectionEyebrow'
import { getCruiseFeatures, getCruiseRoutes, t } from '@/lib/i18n'
import { Anchor, Wifi, Globe } from 'lucide-react'
import { EditorialBanner } from '@/components/editorial/EditorialBanner'
import { localizeOutboundHref } from '@/lib/affiliate/linkLocale'

const FEAT_ICONS = { wifi: Wifi, ports: Globe, all: Anchor } as const

// /cruise 허브 — 2026-08-13 cruise-articles-i18n-v1에서 page.tsx로부터 추출.
// 원래부터 tr()·3언어 인라인 카피로 작성돼 있어 forceLang만 추가(내용 무변경).
export function CruiseHubView({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  // tr은 컨텍스트가 아닌 해석된 lang에 바인딩 — forceLang 뷰의 SSG 첫 렌더 KO 함정 방지 룰
  const tr = (key: string) => t[lang][key] ?? t.KO[key] ?? key
  const prefix = lang === 'EN' ? '/en' : lang === 'JP' ? '/ja' : ''
  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount 1회 로케일 동기화 (StoriesHubView와 동일 패턴)
  }, [forceLang])
  const features = getCruiseFeatures(lang)
  const routes = getCruiseRoutes(lang)
  // 1일 1회 갱신되는 검증가 — 있으면 정적 priceFrom을 덮어씀
  const livePrices = usePriceWatch()

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-end overflow-hidden dark-surface">
        <Image src="/media/verified/unsplash/1548574505-5e239809ee19.webp" alt="" fill priority sizes="100vw" className="object-cover" />
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
                      href={localizeOutboundHref('https://kr.trip.com/cruises/?Allianceid=9024807', lang)}
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

      {/* 크루즈 에디토리얼 배너 — 최신 아티클 1개 + 이전 스토리 텍스트 링크 (배너 증식 금지 룰) */}
      <section className="px-6 py-10 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <EditorialBanner
            href={`${prefix}/cruise/world-europa`}
            eyebrow={lang === 'EN' ? 'Editorial · Winter Caribbean' : lang === 'JP' ? '特集 · 冬のカリブ' : '에디토리얼 · 겨울 카리브'}
            title={lang === 'EN' ? 'A 215,000-ton winter escape — MSC World Europa' : lang === 'JP' ? '21万トン、冬の反対側 — MSCワールドエウローパ' : '21만 톤, 겨울의 반대편 — MSC 월드 유로파'}
            sub={lang === 'EN' ? 'Eight Caribbean days in Korean winter — Martinique home port, Starlink Wi-Fi.' : lang === 'JP' ? '韓国の冬にカリブ8日 — マルティニーク母港、スターリンクWi-Fi。' : '한국의 겨울에 카리브 8일 — 마르티니크 모항, 스타링크 와이파이.'}
            cta={lang === 'EN' ? 'Read the guide →' : lang === 'JP' ? 'ガイドを読む →' : '가이드 읽기 →'}
          />
          <div className="mt-3 flex flex-wrap justify-end gap-x-5 gap-y-1">
            <Link href={`${prefix}/cruise/serena`} className="text-[#64748b] text-xs font-bold hover:text-brand-mid transition-colors">
              {lang === 'EN' ? 'Previous story: a month at sea, Costa Serena →' : lang === 'JP' ? '前の特集：コスタ·セレーナ →' : '이전 스토리: 바다 위에서 한 달 살기, 코스타 세레나 →'}
            </Link>
            <Link href={`${prefix}/cruise/bellissima`} className="text-[#64748b] text-xs font-bold hover:text-brand-mid transition-colors">
              {lang === 'EN' ? 'MSC Bellissima →' : lang === 'JP' ? 'MSCベリッシマ →' : 'MSC 벨리시마 →'}
            </Link>
            {/* 미라클호 아티클 허브 아웃링크 (고아 방지) */}
            <Link href={`${prefix}/cruise/miracle`} className="text-[#64748b] text-xs font-bold hover:text-brand-mid transition-colors">
              {lang === 'EN' ? 'Busan–Osaka, Panstar Miracle →' : lang === 'JP' ? '釜山—大阪パンスター·ミラクル →' : '부산—오사카 팬스타 미라클 →'}
            </Link>
          </div>
        </div>
      </section>

      {/* 지금 예약 가능한 크루즈 — 실존 상품 */}
      <section className="px-6 py-14 bg-[#f0f9ff] border-t border-[#e0f2fe]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mid inline-block" />
            {tr('cruise_featured')}
          </p>
          <p className="text-[#64748b] text-sm mb-6">{tr('cruise_featured_d')}</p>
          {/* 6장 기준: desktop 3×2, mobile 1~2열 — 마지막 고아 카드 없이 균형 유지 */}
          <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {FEATURED_CRUISES.map((item) => (
              <AffiliateCard
                key={item.id}
                item={localizeAffiliateItem(
                  // 라이브가 갱신 시 기준일도 오늘로 — priceWatch가 일 1회 실조회한 값 (PRICE_POLICY)
                  livePrices[item.id]
                    ? { ...item, priceFrom: livePrices[item.id], priceAsOf: new Date().toISOString().slice(0, 10) }
                    : item,
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
