'use client'
import { useLang } from '@/context/LanguageContext'
import { PARTICIPANT_REVIEWS } from '@/lib/reviews'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 홈 실후기 레일 (2026-08-31, 더휴일 벤치마크) — PARTICIPANT_REVIEWS 0건이면 미렌더.
// 가짜 후기·별점 금지 원칙: 실참가·동의 확인분만 lib/reviews.ts에 등재된다.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const UI: Record<string, L> = {
  eyebrow: { KO: 'REAL VOICES', EN: 'REAL VOICES', JP: 'REAL VOICES' },
  title: { KO: '참가자들이 남긴 이야기', EN: 'What participants said', JP: '参加者の声' },
  note: {
    KO: '실제 참가자가 남긴 후기입니다 — 게재 동의를 받아 원문 그대로 싣습니다.',
    EN: 'Reviews from real participants, published verbatim with their consent.',
    JP: '実際の参加者のレビューです。掲載同意を得て原文のまま掲載しています。',
  },
}

export function ReviewRail() {
  const { lang } = useLang()
  if (PARTICIPANT_REVIEWS.length === 0) return null
  return (
    <section className="border-y border-[#dbeafe] bg-white px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2">{UI.eyebrow[lang]}</p>
        <h2 className="text-xl font-bold leading-snug tracking-tight text-[#111827] md:text-2xl">{UI.title[lang]}</h2>
        <p className="mt-2 text-xs text-[#94a3b8]">{UI.note[lang]}</p>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PARTICIPANT_REVIEWS.map((r) => (
            <figure
              key={r.id}
              className="w-[85%] max-w-sm shrink-0 snap-start rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:w-[46%] lg:w-[31%]"
            >
              <blockquote className="text-[0.9375rem] leading-7 text-[#334155]">“{r.quote[lang]}”</blockquote>
              <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                <span className="text-sm font-bold text-[#111827]">{r.author}</span>
                <span className="text-xs text-[#64748b]">{r.program[lang]} · {r.stayedAt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
