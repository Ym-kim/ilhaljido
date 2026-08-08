'use client'

import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { COUPANG_GEAR, COUPANG_DISCLOSURE, COUPANG_UI } from '@/lib/coupangGear'

// ─────────────────────────────────────────────────────────────────────────────
// 쿠팡 파트너스 여행용품 그리드 + 필수 고지문구. 라이트 톤(/select 등 밝은 섹션용).
// ─────────────────────────────────────────────────────────────────────────────

export function CoupangGear() {
  const { lang } = useLang()

  return (
    <section className="px-6 py-14 border-b border-[#e5e1da] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-[#a0a0a0] text-xs font-bold tracking-widest uppercase mb-2">
            {COUPANG_UI.eyebrow[lang]}
          </p>
          <h2 className="text-[#141414] font-black text-xl md:text-2xl">{COUPANG_UI.title[lang]}</h2>
          <p className="text-[#475569] text-sm mt-1.5">{COUPANG_UI.sub[lang]}</p>
        </div>

        <div data-coupang-gear-grid className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {COUPANG_GEAR.map((g) => (
            <a
              key={g.id}
              href={g.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => {
                try {
                  track('coupang_gear_clicked', { id: g.id })
                } catch {
                  /* 계측 실패 무시 */
                }
              }}
              data-coupang-gear-card
              className="group flex min-h-[9rem] min-w-0 flex-col rounded-2xl border border-[#dfd9d0] bg-[#fffefa] p-4 transition-all hover:-translate-y-0.5 hover:border-[#9eb8c1] hover:shadow-[0_12px_28px_rgba(18,47,59,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:min-h-[9.5rem] sm:p-5"
            >
              <span className="flex w-full items-start justify-between gap-3">
                <span className="h-1 w-8 rounded-full bg-[#55a9c3] transition-all group-hover:w-11" aria-hidden="true" />
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#8ba1a9] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0b759c]" strokeWidth={ICON_STROKE} />
              </span>
              <span
                data-coupang-gear-title
                className="mt-4 line-clamp-2 min-h-[3rem] break-keep text-[0.95rem] font-black leading-6 text-[#17242b] sm:text-base"
              >
                {g.name[lang]}
              </span>
              <span className="mt-auto pt-3 text-[0.72rem] font-bold leading-5 text-[#4c6975] sm:text-xs">{COUPANG_UI.cta[lang]}</span>
            </a>
          ))}
        </div>

        {/* 쿠팡 파트너스 필수 고지 */}
        <p className="text-[#a8a29e] text-[0.6875rem] leading-relaxed mt-6">{COUPANG_DISCLOSURE[lang]}</p>
      </div>
    </section>
  )
}
