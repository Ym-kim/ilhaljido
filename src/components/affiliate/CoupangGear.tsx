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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
              className="group flex items-center gap-3 bg-white border border-[#e5e1da] rounded-2xl p-4 hover:border-[#c8c4be] hover:shadow-md transition-all"
            >
              <span className="text-2xl shrink-0">{g.emoji}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-[#141414] text-sm leading-tight truncate">{g.name[lang]}</span>
                <span className="text-[#475569] text-xs font-semibold">{COUPANG_UI.cta[lang]}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#c0bdb8] group-hover:text-[#f43f5e] transition-colors shrink-0" strokeWidth={ICON_STROKE} />
            </a>
          ))}
        </div>

        {/* 쿠팡 파트너스 필수 고지 */}
        <p className="text-[#a8a29e] text-[0.6875rem] leading-relaxed mt-6">{COUPANG_DISCLOSURE[lang]}</p>
      </div>
    </section>
  )
}
