'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { getActiveCampaigns } from '@/lib/campaigns'

// ─────────────────────────────────────────────────────────────────────────────
// 하우스 배너 — 자사 제휴·기획전을 미는 자체 통제 배너 (랜덤 광고 대체).
// campaigns.ts의 첫 active 캠페인을 노출. 운영자가 순서·active만 바꾸면 즉시 교체.
// bg-white 라이트 섹션 위 그라디언트 밴드라 .dark-surface p 함정 무관.
// ─────────────────────────────────────────────────────────────────────────────

export function HouseBanner() {
  const { lang } = useLang()
  const campaigns = getActiveCampaigns()
  if (campaigns.length === 0) return null
  const c = campaigns[0]

  return (
    <section className="px-6 py-8 md:py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <Link
          href={c.href}
          onClick={() => {
            try {
              track(c.event, { id: c.id })
            } catch {
              /* 계측 실패 무시 */
            }
          }}
          className={`group relative block overflow-hidden rounded-3xl bg-gradient-to-r ${c.gradient} px-7 py-8 md:px-10 md:py-9 shadow-sm hover:shadow-lg transition-shadow`}
        >
          {/* 장식 글로우 */}
          <div className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-white/80 text-[0.6875rem] font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                {c.eyebrow[lang]}
              </span>
              <h2 className="text-white font-black text-xl md:text-2xl leading-tight mb-1.5">
                {c.title[lang]}
              </h2>
              <p className="text-white/75 text-sm md:text-[0.9375rem] leading-relaxed">
                {c.sub[lang]}
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 bg-white text-[#0c4a6e] font-bold text-sm px-6 py-3 rounded-full group-hover:gap-2.5 transition-all whitespace-nowrap">
              {c.cta[lang]}
              <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
