'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { COLLECTIONS, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getTripSetCampaign } from '@/lib/tripSetCampaign'
import type { Lang } from '@/lib/i18n/types'

// 홈 기획전 v2 (2026-08-02) — 시즌 스포트라이트(와이드 1장) + Trip Set 그리드.
// spotlight=시즌 카드(추석 — 9/27 종료 시 데이터의 플래그만 제거하면 자동 소멸),
// 그리드는 나머지 duration 세트 6장(2열/3열). 기존 컬렉션은 /collections 허브에서.
const TRIP_SETS = COLLECTIONS.filter((c) => c.duration)
const SPOTLIGHT = TRIP_SETS.find((c) => c.spotlight)
const HOME_COLLECTIONS = TRIP_SETS.filter((c) => !c.spotlight).slice(0, 6)

export function CollectionsSection({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang } = useLang()
  const lang = forceLang ?? ctxLang

  return (
    <section className="bg-[var(--wak-ivory)] py-16 md:py-24 px-4 sm:px-6 border-b border-[#e8e0d4]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-2.5">
              {COLLECTIONS_UI.eyebrow[lang]}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">{COLLECTIONS_UI.home_title[lang]}</h2>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl">{COLLECTIONS_UI.home_sub[lang]}</p>
          </div>
          <Link
            href="/collections"
            className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all"
          >
            {COLLECTIONS_UI.see_all[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>

        {/* 시즌 스포트라이트 — 와이드 카드, 웜(앰버) 액센트 절제 사용 */}
        {SPOTLIGHT && (
          <Link
            href={`/collections/${SPOTLIGHT.slug}?src=home`}
            data-ui-card="editorial"
            className="wak-card-editorial group relative mb-4 block h-56 overflow-hidden rounded-3xl border border-black/5 bg-[#0b1b25] shadow-[0_12px_32px_rgba(8,32,48,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(8,32,48,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:h-64 lg:h-72"
          >
            <Image
              src={SPOTLIGHT.photo}
              alt={SPOTLIGHT.photoAlt?.[lang] ?? SPOTLIGHT.title[lang]}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04121f]/92 via-[#04121f]/55 to-[#04121f]/10" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-9">
              {SPOTLIGHT.spotlightNote && (
                <span className="mb-3 w-fit rounded-full bg-amber-300/95 px-3.5 py-1 text-[0.72rem] font-black tracking-wide text-[#3a2506] shadow-sm">
                  {SPOTLIGHT.spotlightNote[lang]}
                </span>
              )}
              <h3 className="wak-card-title max-w-xl text-2xl text-white sm:text-3xl">{SPOTLIGHT.title[lang]}</h3>
              <span className="mt-2 block max-w-lg text-sm leading-relaxed text-white/75">{SPOTLIGHT.tagline[lang]}</span>
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all group-hover:gap-2.5 group-hover:bg-white/20">
                {COLLECTIONS_UI.ts_card_cta[lang]} <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
              </span>
            </div>
          </Link>
        )}

        <div data-ui-grid="editorial" className="wak-card-grid grid grid-cols-2 lg:grid-cols-3">
          {HOME_COLLECTIONS.map((col) => {
            const campaign = getTripSetCampaign(col.slug)
            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}?src=home`}
                data-ui-card="editorial"
                className="wak-card-editorial group relative aspect-[4/5] overflow-hidden border border-black/5 bg-[#0b1b25] shadow-[0_12px_32px_rgba(8,32,48,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(8,32,48,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Image
                  src={col.photo}
                  alt={col.photoAlt?.[lang] ?? col.title[lang]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  style={{ objectPosition: col.photoPosition }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/20 to-black/5" />
                <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-1.5">
                  {col.durationLabel && (
                    <span className="rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-black text-[#102434] shadow-sm">
                      {col.durationLabel[lang]}
                    </span>
                  )}
                  {col.companions && (
                    <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.68rem] font-bold text-white backdrop-blur-sm">
                      {col.companions[lang]}
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span
                    className="mb-3 block h-1 w-9 rounded-full"
                    style={{ backgroundColor: campaign?.accent ?? '#38bdf8' }}
                  />
                  <h3 className="wak-card-title text-lg text-white">
                    {col.title[lang]}
                  </h3>
                  <span className="mt-2 block line-clamp-2 text-xs leading-relaxed text-white/72">{col.tagline[lang]}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white transition-all group-hover:gap-2.5">
                    {COLLECTIONS_UI.ts_card_cta[lang]} <ArrowRight className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
