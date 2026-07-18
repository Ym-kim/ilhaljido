'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
          className={`group relative block overflow-hidden rounded-3xl bg-gradient-to-r ${c.gradient} px-7 py-8 md:px-10 md:py-9 shadow-sm hover:shadow-xl transition-all`}
        >
          {c.image && (
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-[62%_center] md:object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
          {/* 왼쪽 카피 대비 + 오른쪽 사진 디테일을 함께 살리는 브랜드 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#04121f]/98 via-[#075985]/92 to-[#075985]/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04121f]/35 via-transparent to-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-1 min-w-0 md:max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-white/80 text-[0.6875rem] font-bold uppercase tracking-widest mb-2">
                <span aria-hidden="true" className="h-px w-5 bg-sky-300/80" />
                {c.eyebrow[lang]}
              </span>
              <h2 className="text-white font-black text-xl md:text-2xl leading-tight mb-1.5">
                {c.title[lang]}
              </h2>
              <span className="block text-white/78 text-sm md:text-[0.9375rem] leading-relaxed">
                {c.sub[lang]}
              </span>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 bg-white text-[#0c4a6e] font-bold text-sm px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(4,18,31,0.18)] group-hover:gap-2.5 group-hover:bg-sky-50 transition-all whitespace-nowrap">
              {c.cta[lang]}
              <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
