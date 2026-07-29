'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { getCollection, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { NotifySignup } from '@/components/home/NotifySignup'
import { ShareButton } from '@/components/share/ShareButton'
import { trackEvent } from '@/lib/track'

// 기획전 상세 — 히어로 + 구성 상품(숙소·체험·eSIM·항공) + 디스클로저 + 다음회차 알림
export function CollectionView({ slug, forceLang }: { slug: string; forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const col = getCollection(slug)

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  // Trip Set 진입 계측 (2026-07-28) — duration 필드가 있는 확장 컬렉션만.
  // source는 홈·무드·기간 탐색 링크의 ?src= 파라미터 (없으면 direct)
  useEffect(() => {
    if (!col?.duration) return
    const src = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('src') : null
    trackEvent('trip_set_open', {
      slug: col.slug,
      destination: col.cityGuideSlug ?? col.slug,
      duration: col.duration,
      locale: lang,
      source: src ?? 'direct',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [col?.slug])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  if (!col) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Link href={`${prefix}/collections`} className="text-brand-mid font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
        </Link>
      </div>
    )
  }

  const items = getCatalogItems(col.itemIds).map((i) => localizeAffiliateItem(i, lang))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[48vh] min-h-[340px] flex items-end overflow-hidden dark-surface">
        <Image src={col.photo} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/45 to-[#04121f]/10" />
        <div className="relative w-full max-w-5xl mx-auto px-6 pb-12">
          <Link
            href={`${prefix}/collections`}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-bold mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
          </Link>
          {/* span 사용 — .dark-surface p 규칙이 sky 액센트를 흰색으로 덮는 함정 회피 */}
          <span className="block text-sky-300 text-xs font-black tracking-widest uppercase mb-2.5">
            {COLLECTIONS_UI.eyebrow[lang]}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            {col.title[lang]}
          </h1>
          {(col.durationLabel || col.companions) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {col.durationLabel && (
                <span className="inline-flex items-center text-[0.75rem] font-bold px-3 py-1 rounded-full bg-white/14 text-white border border-white/25 backdrop-blur-sm">
                  {col.durationLabel[lang]}
                </span>
              )}
              {col.companions && (
                <span className="inline-flex items-center text-[0.75rem] font-bold px-3 py-1 rounded-full bg-white/14 text-white border border-white/25 backdrop-blur-sm">
                  {col.companions[lang]}
                </span>
              )}
            </div>
          )}
          <span className="block text-sky-200 text-sm font-bold mb-2">{col.tagline[lang]}</span>
          <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">{col.desc[lang]}</p>
          <div className="mt-4">
            <ShareButton
              title={`${col.title[lang]} — Wakation`}
              text={col.desc[lang]}
              url={`https://www.wakation.kr/collections/${col.slug}`}
              contentType="collection"
              slug={col.slug}
            />
          </div>
        </div>
      </section>

      {/* ── Trip Set 확장 섹션 (2026-07-28) — 확장 필드가 있을 때만 렌더, 기존 컬렉션 무영향 ── */}
      {col.audience && (
        <section className="px-6 py-12 border-b border-[#f1f5f9]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#111827] font-black text-lg mb-5">{COLLECTIONS_UI.ts_audience[lang]}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {col.audience.map((a, i) => (
                <div key={i} className="flex gap-3 rounded-2xl bg-[#fdfbf7] border border-[#f0e9dd] p-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-brand-mid/10 text-brand-mid font-black text-xs flex items-center justify-center">{i + 1}</span>
                  <span className="text-[#374151] text-sm leading-relaxed">{a[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {col.dayFlow && (
        <section className="px-6 py-12 border-b border-[#f1f5f9] bg-[#fdfbf7]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#111827] font-black text-lg mb-5">{COLLECTIONS_UI.ts_flow[lang]}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {col.dayFlow.map((d) => (
                <div key={d.day} className="rounded-2xl bg-white border border-[#f0e9dd] p-5">
                  <p className="text-brand-mid font-black text-xs tracking-widest uppercase mb-1">
                    {COLLECTIONS_UI.ts_day[lang]} {d.day}
                  </p>
                  <p className="text-[#111827] font-black text-[0.9375rem] mb-2.5">{d.title[lang]}</p>
                  <ul className="space-y-1.5">
                    {d.items.map((it, i) => (
                      <li key={i} className="text-[#64748b] text-[0.8125rem] leading-relaxed flex gap-1.5">
                        <span className="text-[#d6c9b2] shrink-0">·</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-[#a39a8b] text-[0.7rem] leading-relaxed mt-5 max-w-2xl">{COLLECTIONS_UI.ts_flow_note[lang]}</p>
          </div>
        </section>
      )}

      {col.comfortFacts && (
        <section className="px-6 py-12 border-b border-[#f1f5f9]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#111827] font-black text-lg mb-5">{COLLECTIONS_UI.ts_comfort[lang]}</h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {col.comfortFacts.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-[#e2e8f0] px-4 py-3">
                  <span className="shrink-0 text-[0.6875rem] font-black text-brand-mid bg-[#f0f9ff] rounded-md px-2 py-1 mt-0.5">
                    {f.label[lang]}
                  </span>
                  <span className="min-w-0 text-[#475569] text-[0.8125rem] leading-relaxed">
                    {f.value[lang]}
                    {f.verifiedAt && (
                      <span className="block text-[#b6c2d1] text-[0.65rem] mt-0.5">
                        {f.source ? `${f.source} · ` : ''}{f.verifiedAt}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 구성 상품 */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#111827] font-black text-lg mb-1.5">
            {col.duration ? COLLECTIONS_UI.ts_prepare[lang] : COLLECTIONS_UI.included[lang]}
          </p>
          {col.duration && (
            <p className="text-[#94a3b8] text-xs mb-1">{COLLECTIONS_UI.ts_prepare_note[lang]}</p>
          )}
          <p className="text-[#94a3b8] text-xs mb-7">
            {items.length}{COLLECTIONS_UI.count_label[lang]}
          </p>
          <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <AffiliateCard key={item.id} item={item} visual />
            ))}
          </div>
          <p className="text-[#b8b4ae] text-[0.7rem] leading-relaxed max-w-2xl mt-7">
            {COLLECTIONS_UI.disclosure[lang]}
          </p>
          {col.cityGuideSlug && (
            <Link
              href={`${prefix}/guide/${col.cityGuideSlug}`}
              className="mt-6 inline-flex items-center gap-2 text-brand-mid font-bold text-sm hover:gap-3 transition-all"
            >
              {COLLECTIONS_UI.ts_guide_cta[lang]} →
            </Link>
          )}
        </div>
      </section>

      {/* 다음 회차 알림 */}
      <section className="dark-surface bg-gradient-to-b from-[#04121f] to-[#0a1e33] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 text-sm font-semibold mb-3">
            {lang === 'KO' ? '이 테마의 프로그램이 열리면 알려드릴게요' : lang === 'JP' ? 'このテーマのプログラム開催時にお知らせ' : "We'll tell you when a program for this theme opens"}
          </p>
          <NotifySignup source={`기획전 알림 (${col.slug})`} event="program_alert_submitted" />
        </div>
      </section>
    </div>
  )
}
