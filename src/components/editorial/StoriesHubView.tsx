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
          <h1 className="wak-page-title mb-4 text-[#111]">{STORIES_UI.title[lang]}</h1>
          <p className="text-[#666] text-lg max-w-xl">{STORIES_UI.sub[lang]}</p>
        </div>
      </section>

      {/* Story list */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div data-ui-grid="story" className="space-y-5">
          {STORIES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              data-ui-card="story"
              className="wak-card-story group flex items-start gap-5 border border-[#e8e4dc] bg-white p-6 transition-all duration-300 hover:border-teal-300 hover:shadow-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[0.6875rem] font-bold tracking-widest uppercase text-teal-600 mb-1">
                  {s.category[lang]}
                </p>
                <h2 className="wak-card-title text-lg text-[#111]">{s.title[lang]}</h2>
                <p className="wak-body mt-1 line-clamp-2 text-[#666]">{s.sub[lang]}</p>
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
