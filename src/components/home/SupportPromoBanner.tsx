'use client'

import Link from 'next/link'
import { ArrowRight, Landmark } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'

// ─────────────────────────────────────────────────────────────────────────────
// 지원사업 프로모 배너 — 정부·지자체 지원(실데이터 9건)을 홈에서 훅으로 노출
// 수치는 /programs/support(SUPPORT_PROGRAMS)와 동기 유지: 갱신 시 함께 확인
// ─────────────────────────────────────────────────────────────────────────────

export function SupportPromoBanner() {
  const { tr } = useLang()

  return (
    <section className="bg-white py-14 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/programs/support"
          className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1e33] to-[#04121f] border border-sky-500/20 p-8 md:p-12 transition-all hover:border-amber-400/40 hover:shadow-2xl"
        >
          {/* 웜 글로우 데코 */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="flex-1">
              <p className="flex items-center gap-1.5 text-amber-400 text-xs font-black tracking-widest uppercase mb-3">
                <Landmark className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                {tr('home_gov_eyebrow')}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                {tr('home_gov_title')}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-6">
                {tr('home_gov_sub')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(['home_gov_chip1', 'home_gov_chip2', 'home_gov_chip3'] as const).map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center bg-white/8 border border-amber-400/25 text-amber-200 text-xs font-bold px-3.5 py-1.5 rounded-full"
                  >
                    {tr(k)}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 bg-amber-400 text-[#0a1e33] font-black px-7 py-3.5 rounded-full text-sm transition-all group-hover:bg-amber-300 group-hover:gap-3">
                {tr('home_gov_cta')} <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
