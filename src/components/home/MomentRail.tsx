'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { MOMENTS } from '@/lib/moments'
import { ICON_STROKE } from '@/lib/icons'

// ─────────────────────────────────────────────────────────────────────────────
// 와케이션 모먼트 — 세로 숏츠형 에디터 큐레이션 레일 (홈)
// 각 카드 = /select/hotel#{도시} 직결 → 감성 후킹에서 예약 동선으로
// ─────────────────────────────────────────────────────────────────────────────

export function MomentRail() {
  const { lang, tr } = useLang()

  return (
    <section className="bg-[#f0f9ff] border-b border-[#dbeafe] py-14 md:py-20">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto px-6 mb-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5">
              Wakation Moments
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight">
              {tr('home_moments_title')}
            </h2>
            <p className="text-[#64748b] text-sm mt-2.5">{tr('home_moments_sub')}</p>
          </div>
          <Link
            href="/select/hotel"
            className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all"
          >
            {tr('view_all')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </div>

      {/* 세로 카드 레일 */}
      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-2 [&::-webkit-scrollbar]:hidden max-w-6xl mx-auto">
        {MOMENTS.map((m) => (
          <Link
            key={m.id}
            href={`/select/hotel#${m.anchor}`}
            className="group relative shrink-0 snap-start w-[200px] sm:w-[220px] aspect-[3/5] rounded-2xl overflow-hidden bg-[#0a1e33] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={m.photo}
              alt={`${m.dest[lang]} — ${m.title[lang].replace('\n', ' ')}`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />

            {/* 상단: 목적지 pill + 에디터 픽 */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[0.6875rem] font-semibold px-2.5 py-1 rounded-full">
                <MapPin className="w-3 h-3" strokeWidth={ICON_STROKE} />
                {m.dest[lang]}
              </span>
              <span className="text-white/55 text-[0.6rem] font-semibold tracking-wide uppercase">
                {tr('home_moments_badge')}
              </span>
            </div>

            {/* 하단: 훅 카피 + 팁 + CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-[1.0625rem] leading-snug whitespace-pre-line mb-2">
                {m.title[lang]}
              </p>
              <p className="text-white/65 text-[0.6875rem] leading-relaxed mb-3">
                {m.tip[lang]}
              </p>
              <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                {tr('home_moments_cta')} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
