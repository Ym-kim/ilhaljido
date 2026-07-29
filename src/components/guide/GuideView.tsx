'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, Search, MapPin, Plane } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick } from '@/lib/track'
import { CITY_GUIDES, GUIDE_UI, type CityGuide } from '@/lib/guides'
import { WorkOverlap } from '@/components/guide/WorkOverlap'
import { FEATURED_STAYS, FEATURED_STAYS_V2, FEATURED_STAYS_V3, FEATURED_ACTIVITIES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 가이드 뷰 — 라이트 커머스 톤, 3언어
// 팩트(시차·직항·통화·시즌) → 동네 → 추천 숙소/체험(제휴) → 도시 검색 폴백
// ─────────────────────────────────────────────────────────────────────────────

// V3 추가(2026-07-28): 서울·부산 가이드의 stayIds(stay-fraser-seoul·stay-uh-busan)가 V3 소속
const ALL_ITEMS = [...FEATURED_STAYS, ...FEATURED_STAYS_V2, ...FEATURED_STAYS_V3, ...FEATURED_ACTIVITIES]

export function GuideView({ guide, forceLang }: { guide: CityGuide; forceLang?: Lang }) {
  // forceLang: /en·/ja 로케일 라우트용 — 정적 생성 시 해당 언어로 렌더 (SEO)
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  // 로케일 URL 방문 시 사이트 언어(네비 등)도 동기화
  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const stays = guide.stayIds
    .map((id) => ALL_ITEMS.find((i) => i.id === id))
    .filter((i) => !!i)
    .map((i) => localizeAffiliateItem(i, lang))
  const activities = guide.activityIds
    .map((id) => ALL_ITEMS.find((i) => i.id === id))
    .filter((i) => !!i)
    .map((i) => localizeAffiliateItem(i, lang))
  const affiliateItems = [...stays, ...activities]

  const others = CITY_GUIDES.filter((g) => g.slug !== guide.slug)
  // 로케일 라우트에서는 가이드 간 링크도 같은 로케일 유지 (크롤러가 EN/JA 그래프 순회)
  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  return (
    <div className="min-h-screen bg-white">
      {/* ── 히어로 ── */}
      <section className="relative h-[300px] md:h-[380px] overflow-hidden dark-surface">
        <Image
          src={guide.heroPhoto}
          alt={guide.name[lang]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-6 pb-8 md:pb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-xs font-semibold mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              {GUIDE_UI.backHome[lang]}
            </Link>
            <p className="text-sky-300 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-2">
              {GUIDE_UI.eyebrow[lang]}
            </p>
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2.5">
              {guide.name[lang]}
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl">{guide.tagline[lang]}</p>
          </div>
        </div>
      </section>

      {/* ── 팩트 스트립 ── */}
      <section className="bg-[#f0f9ff] border-b border-[#dbeafe]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {guide.facts.map((f, i) => (
            <div key={i}>
              <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">
                {f.label[lang]}
              </p>
              <p className="text-[#111827] text-sm md:text-base font-bold">{f.value[lang]}</p>
            </div>
          ))}
        </div>
        {/* 빠른 비교 (internet/cost/visa) */}
        {(guide.internet || guide.costMonthly || guide.visaFree) && (
          <div className="max-w-5xl mx-auto px-6 pb-5 flex flex-wrap gap-4 border-t border-[#dbeafe] pt-4">
            {guide.internet && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '인터넷', EN: 'Internet', JP: 'ネット' }[lang]}</p>
                <p className="text-sm font-bold text-[#111827] flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={n <= guide.internet! ? 'text-teal-500' : 'text-[#d1d5db]'}>★</span>
                  ))}
                </p>
              </div>
            )}
            {guide.costMonthly && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '생활비', EN: 'Cost', JP: '生活費' }[lang]}</p>
                <p className="text-[#111827] text-sm font-bold">{guide.costMonthly[lang]}</p>
              </div>
            )}
            {guide.visaFree && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '비자', EN: 'Visa', JP: 'ビザ' }[lang]}</p>
                <p className="text-[#111827] text-sm font-bold">{guide.visaFree[lang]}</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── 인트로 + 워크타임 오버랩 ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[#334155] text-[0.9375rem] md:text-base leading-relaxed max-w-3xl mb-8">
          {guide.intro[lang]}
        </p>
        <WorkOverlap timeZone={guide.timeZone} cityName={guide.name[lang]} lang={lang} />
      </section>

      {/* ── 일하기 좋은 동네 ── */}
      <section className="max-w-5xl mx-auto px-6 pb-12 md:pb-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight mb-6">
          {GUIDE_UI.areasTitle[lang]}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {guide.areas.map((a, i) => (
            <div key={i} className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] p-5">
              <p className="flex items-center gap-1.5 text-[#111827] font-bold text-base mb-2">
                <MapPin className="w-4 h-4 text-brand-mid" strokeWidth={ICON_STROKE} />
                {a.name[lang]}
              </p>
              <p className="text-[#475569] text-sm leading-relaxed">{a.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 추천 숙소·체험 (제휴, disclosure 내장) ── */}
      {affiliateItems.length > 0 && (
        <div className="border-t border-[#dbeafe] bg-white">
          <AffiliateSection
            eyebrow="WAKATION SELECT"
            title={GUIDE_UI.staysTitle[lang]}
            subtitle={GUIDE_UI.staysSub[lang]}
            items={affiliateItems}
            cols={2}
            tone="light"
          />
        </div>
      )}

      {/* ── 도시 전체 검색 + 항공권 CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-12 md:pb-16">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            href={`/select/hotel#${guide.anchor}`}
            className="btn-primary justify-center"
          >
            <Search className="w-4 h-4" strokeWidth={ICON_STROKE} />
            {GUIDE_UI.searchCta[lang]}
            <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
          {guide.flightUrl && (
            <a
              href={guide.flightUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackAffiliateClick({ id: `flight-${guide.slug}`, provider: 'Trip.com', status: 'active_affiliate' })}
              className="inline-flex items-center gap-2 justify-center px-6 py-3.5 rounded-full border-2 border-brand-mid text-brand-mid font-bold text-[0.9375rem] hover:bg-brand-mid hover:text-white transition-all"
            >
              <Plane className="w-4 h-4" strokeWidth={ICON_STROKE} />
              {GUIDE_UI.flightCta[lang]}
            </a>
          )}
        </div>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
          <span className="text-[#64748b]">{GUIDE_UI.visaHint[lang]}</span>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-1 text-brand-mid font-bold hover:gap-2 transition-all"
          >
            {GUIDE_UI.visaCta[lang]}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      {/* ── 다른 도시 가이드 ── */}
      <section className="bg-[#f0f9ff] border-t border-[#dbeafe] py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-lg font-bold text-[#111827] tracking-tight mb-5">
            {GUIDE_UI.otherGuides[lang]}
          </h2>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`${prefix}/guide/${g.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] text-sm font-semibold hover:border-[#93c5fd] hover:text-[#111827] transition-all"
              >
                {g.name[lang]}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            ))}
          </div>
          {/* /destinations 크로스링크 (8개 도시만) */}
          <Link
            href={`${prefix}/destinations`}
            className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-brand-mid font-semibold transition-colors"
          >
            {{
              KO: '도시별 인터넷·생활비·비자 빠른 비교 →',
              EN: 'Quick compare internet, cost & visa by city →',
              JP: '都市別のネット・生活費・ビザを比較 →',
            }[lang]}
          </Link>
        </div>
      </section>
    </div>
  )
}
