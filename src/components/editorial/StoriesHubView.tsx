'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { STORIES, STORIES_UI } from '@/lib/stories'

// ─────────────────────────────────────────────────────────────────────────────
// /stories 허브 — 에디토리얼 집결지 (3언어, 라이트 톤 — destinations 허브와 동일 문법)
// ─────────────────────────────────────────────────────────────────────────────

export function StoriesHubView() {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <section className="bg-white border-b border-[#e8e4dc] px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-teal-600 mb-3">{STORIES_UI.eyebrow[lang]}</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] leading-tight mb-4">{STORIES_UI.title[lang]}</h1>
          <p className="text-[#666] text-lg max-w-xl">{STORIES_UI.sub[lang]}</p>
        </div>
      </section>

      {/* Story list */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-5">
          {STORIES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group flex items-start gap-5 bg-white rounded-2xl border border-[#e8e4dc] hover:border-teal-300 hover:shadow-lg transition-all duration-300 p-6"
            >
              <span className="shrink-0 w-12 h-12 rounded-2xl bg-[#f0f0eb] flex items-center justify-center text-2xl">
                {s.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[0.6875rem] font-bold tracking-widest uppercase text-teal-600 mb-1">
                  {s.category[lang]}
                </p>
                <h2 className="font-black text-[#111] text-lg leading-snug">{s.title[lang]}</h2>
                <p className="text-[#666] text-sm mt-1">{s.sub[lang]}</p>
                <p className="text-[#aaa] text-xs mt-2">{s.published}</p>
              </div>
              <span className="shrink-0 self-center inline-flex items-center gap-1 text-teal-600 text-sm font-bold">
                {STORIES_UI.read[lang]}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
        <p className="text-[0.6875rem] text-[#999] mt-6">{STORIES_UI.note[lang]}</p>
      </section>
    </div>
  )
}
