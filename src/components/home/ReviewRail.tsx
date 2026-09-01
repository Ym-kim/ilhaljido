'use client'
import { useLang } from '@/context/LanguageContext'
import { PARTICIPANT_REVIEWS, EDITOR_NOTES } from '@/lib/reviews'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 홈 실후기·에디터 노트 레일 (2026-08-31, 더휴일 벤치마크)
// - 참가자 후기(실참가·동의 확인분)와 에디터 노트(저자 명시 소개 콘텐츠)를
//   칩으로 구분해 함께 진열. 참가자 후기가 먼저.
// - 가짜 후기 금지 원칙 유지 — 노트는 '후기' 라벨을 절대 쓰지 않는다.
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const UI: Record<string, L> = {
  eyebrow: { KO: 'REAL VOICES & NOTES', EN: 'REAL VOICES & NOTES', JP: 'REAL VOICES & NOTES' },
  title: { KO: '현장에서 확인한 이야기', EN: 'Stories from the field', JP: '現場で確かめた話' },
  note: {
    KO: '참가자 후기는 게재 동의를 받아 원문 그대로, 에디터 노트는 저자를 밝히고 싣습니다.',
    EN: 'Participant reviews run verbatim with consent; editor notes are clearly authored by us.',
    JP: '参加者レビューは同意を得て原文のまま、エディターノートは著者を明記して掲載します。',
  },
  chipReview: { KO: '참가자 후기', EN: 'Participant review', JP: '参加者レビュー' },
  chipNote: { KO: '에디터 노트', EN: 'Editor note', JP: 'エディターノート' },
}

export function ReviewRail() {
  const { lang } = useLang()
  const cards = [
    ...PARTICIPANT_REVIEWS.map((r) => ({
      id: r.id,
      chip: UI.chipReview[lang],
      chipTone: 'bg-brand-mid/10 text-brand-mid' as string,
      quote: r.quote[lang],
      author: r.author,
      source: `${r.program[lang]} · ${r.stayedAt}`,
    })),
    ...EDITOR_NOTES.map((n) => ({
      id: n.id,
      chip: UI.chipNote[lang],
      chipTone: 'bg-[#f1f5f9] text-[#64748b]' as string,
      quote: n.quote[lang],
      author: n.author[lang],
      source: n.source[lang],
    })),
  ]
  if (cards.length === 0) return null
  return (
    <section className="border-y border-[#dbeafe] bg-white px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2">{UI.eyebrow[lang]}</p>
        <h2 className="text-xl font-bold leading-snug tracking-tight text-[#111827] md:text-2xl">{UI.title[lang]}</h2>
        <p className="mt-2 text-xs text-[#94a3b8]">{UI.note[lang]}</p>
        {/* 2026-09-02: 데스크톱에서 카드가 31% 폭인 가로 레일이라 4번째가 잘려 보였다(운영자 보고).
            모바일은 스와이프가 자연스러우니 레일을 유지하고, md 이상은 격자로 전환해 전부 보이게 한다.
            자동으로 흘러가는 마퀴는 쓰지 않았다 — 이 카드는 '읽는' 콘텐츠라 저절로 움직이면 읽기 어렵고,
            모션 축소 설정(prefers-reduced-motion) 대응도 따로 필요해진다. */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-4">
          {cards.map((c) => (
            <figure
              key={c.id}
              className="flex w-[85%] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:w-[46%] md:w-auto md:max-w-none"
            >
              <span className={`mb-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${c.chipTone}`}>{c.chip}</span>
              <blockquote className="text-[0.9375rem] leading-7 text-[#334155]">“{c.quote}”</blockquote>
              <figcaption className="mt-auto flex items-baseline justify-between gap-3 pt-4">
                <span className="text-sm font-bold text-[#111827]">{c.author}</span>
                <span className="text-right text-xs text-[#64748b]">{c.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
