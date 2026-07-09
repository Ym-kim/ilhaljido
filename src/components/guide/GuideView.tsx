'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Search, MapPin } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { CITY_GUIDES, GUIDE_UI, type CityGuide } from '@/lib/guides'
import { FEATURED_STAYS, FEATURED_STAYS_V2, FEATURED_ACTIVITIES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 가이드 뷰 — 라이트 커머스 톤, 3언어
// 팩트(시차·직항·통화·시즌) → 동네 → 추천 숙소/체험(제휴) → 도시 검색 폴백
// ─────────────────────────────────────────────────────────────────────────────

const ALL_ITEMS = [...FEATURED_STAYS, ...FEATURED_STAYS_V2, ...FEATURED_ACTIVITIES]

export function GuideView({ guide }: { guide: CityGuide }) {
  const { lang } = useLang()

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

  return (
    <div className="min-h-screen bg-white">
      {/* ── 히어로 ── */}
      <section className="relative h-[300px] md:h-[380px] overflow-hidden dark-surface">
        <img
          src={guide.heroPhoto}
          alt={guide.name[lang]}
          className="absolute inset-0 w-full h-full object-cover"
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
      </section>

      {/* ── 인트로 ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[#334155] text-[0.9375rem] md:text-base leading-relaxed max-w-3xl">
          {guide.intro[lang]}
        </p>
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

      {/* ── 도시 전체 검색 폴백 CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-12 md:pb-16">
        <Link
          href={`/select/hotel#${guide.anchor}`}
          className="btn-primary w-full sm:w-auto justify-center"
        >
          <Search className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {GUIDE_UI.searchCta[lang]}
          <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
        </Link>
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
          <div className="flex flex-wrap gap-2.5">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] text-sm font-semibold hover:border-[#93c5fd] hover:text-[#111827] transition-all"
              >
                {g.name[lang]}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
