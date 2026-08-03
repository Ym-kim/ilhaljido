'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { STORIES, STORIES_UI } from '@/lib/stories'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// /stories 허브 — 에디토리얼 집결지 (3언어, 라이트 톤 — destinations 허브와 동일 문법)
// forceLang: /en·/ja 로케일 라우트용 (2026-08-04 i18n-routes-v1 — 번역 완비·라우트 부재였음)
// ─────────────────────────────────────────────────────────────────────────────

export function StoriesHubView({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])
  const visualStories = STORIES.filter((story) => story.image)
  const textStories = STORIES.filter((story) => !story.image)
  const featured = visualStories[0]

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

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-xs font-black tracking-widest uppercase text-teal-700">{STORIES_UI.featured[lang]}</p>
        {featured && (
          <Link href={featured.href} className="group mt-5 grid overflow-hidden bg-[#17282d] md:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[28rem]">
              <Image src={featured.image!} alt={featured.imageAlt?.[lang] ?? ''} fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              {featured.illustrative && <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[0.65rem] font-bold text-white">{STORIES_UI.illustrative[lang]}</span>}
            </div>
            <div className="flex flex-col justify-end p-7 text-white md:p-10 dark-surface">
              <span className="text-xs font-bold tracking-widest text-sky-300">{featured.category[lang]}</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{featured.title[lang]}</h2>
              <span className="mt-4 block text-sm leading-relaxed text-white/65">{featured.sub[lang]}</span>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white">
                {STORIES_UI.read[lang]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {visualStories.slice(1).map((story) => (
            <Link key={story.slug} href={story.href} className="wak-card-story group overflow-hidden border border-[#e8e4dc] bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={story.image!} alt={story.imageAlt?.[lang] ?? ''} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                {story.illustrative && <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[0.65rem] font-bold text-white">{STORIES_UI.illustrative[lang]}</span>}
              </div>
              <div className="p-6">
                <p className="text-[0.6875rem] font-bold tracking-widest uppercase text-teal-700">{story.category[lang]}</p>
                <h2 className="wak-card-title mt-2 text-xl text-[#111]">{story.title[lang]}</h2>
                <p className="wak-body mt-2 line-clamp-2 text-[#666]">{story.sub[lang]}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal-700">{STORIES_UI.read[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8e4dc] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-2xl font-bold text-[#111]">{STORIES_UI.more[lang]}</h2>
          <div data-ui-grid="story" className="mt-6 space-y-3">
          {textStories.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              data-ui-card="story"
              className="wak-card-story group flex items-start gap-5 border-t border-[#e8e4dc] px-0 py-6 transition-colors hover:border-teal-500"
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
          <p className="text-[0.6875rem] text-[#777] mt-6">{STORIES_UI.note[lang]}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col justify-between gap-6 border-t border-[#cbc5ba] pt-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#111]">{STORIES_UI.explore_title[lang]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#666]">{STORIES_UI.explore_sub[lang]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/destinations" className="inline-flex min-h-11 items-center rounded-full border border-[#bbb5aa] px-5 py-3 text-sm font-bold text-[#222] hover:border-teal-600">{STORIES_UI.explore_destinations[lang]}</Link>
            <Link href="/collections" className="inline-flex min-h-11 items-center rounded-full bg-[#17282d] px-5 py-3 text-sm font-bold text-white hover:bg-teal-900">{STORIES_UI.explore_collections[lang]}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
