'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { COLLECTIONS, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { SelectionCriteria } from '@/components/affiliate/SelectionCriteria'
import { trackEvent } from '@/lib/track'

type L = Record<Lang, string>

const VISUAL_COPY: Record<string, L> = {
  featured: { KO: '이번 주의 여행 구성', EN: 'Featured trip set', JP: '今週の旅の構成' },
  tripSets: { KO: '기간과 동행으로 비교하기', EN: 'Compare by time and company', JP: '日数と同行者で比べる' },
  more: { KO: '테마로 더 찾아보기', EN: 'Explore more themes', JP: 'テーマからもっと探す' },
  details: { KO: '여행 구성 보기', EN: 'Open trip set', JP: '旅の構成を見る' },
}

// 기획전 허브 — 전체 컬렉션 카드 그리드
export function CollectionsHub({ forceLang }: { forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const featured = COLLECTIONS.find((col) => col.duration) ?? COLLECTIONS[0]
  const tripSets = COLLECTIONS.filter((col) => col.duration && col.slug !== featured.slug)
  const editorialCollections = COLLECTIONS.filter((col) => !col.duration && col.slug !== featured.slug)

  return (
    <div className={`min-h-screen bg-[var(--wak-ivory)] ${lang === 'JP' ? 'font-jp' : ''}`}>
      <section className="px-6 pt-28 pb-12 bg-white border-b border-[#e7e1d8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">
            {COLLECTIONS_UI.eyebrow[lang]}
          </p>
          <h1 className="wak-page-title mb-3 text-[#111827]">{COLLECTIONS_UI.hub_title[lang]}</h1>
          <p className="text-[#64748b] text-sm md:text-base max-w-2xl leading-relaxed">{COLLECTIONS_UI.hub_sub[lang]}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`${prefix}/collections/${featured.slug}`}
            data-visual-module="featured-trip-set"
            data-ui-card="editorial"
            data-motion="reveal"
            data-motion-speed="editorial"
            onClick={() => trackEvent('visual_module_interaction', { route: '/collections', locale: lang, sectionId: 'featured-trip-set', visualType: 'featured-editorial', contentId: featured.slug, targetRoute: `${prefix}/collections/${featured.slug}` })}
            className="group relative block min-h-[28rem] overflow-hidden border border-black/5 bg-[#0b1b25] shadow-[0_20px_54px_rgba(8,32,48,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:min-h-[32rem]"
          >
            <Image
              src={featured.photo}
              alt={featured.photoAlt?.[lang] ?? featured.title[lang]}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1152px"
              style={{ objectPosition: featured.photoPosition }}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04121f]/90 via-[#04121f]/42 to-transparent" />
            {featured.illustrative && (
              <span className="absolute right-5 top-5 border border-white/30 bg-black/45 px-3 py-1.5 text-[0.65rem] font-bold text-white backdrop-blur-sm">
                {lang === 'KO' ? '편집 이미지' : lang === 'JP' ? 'イメージ写真' : 'Editorial image'}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 max-w-2xl p-6 sm:p-10">
              <span className="text-[0.68rem] font-black tracking-[0.16em] text-sky-300">{VISUAL_COPY.featured[lang]}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">{featured.title[lang]}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{featured.tagline[lang]}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/80">
                {featured.durationLabel && <span className="border border-white/25 bg-black/25 px-3 py-1.5">{featured.durationLabel[lang]}</span>}
                {featured.companions && <span className="border border-white/25 bg-black/25 px-3 py-1.5">{featured.companions[lang]}</span>}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-sky-300">
                {VISUAL_COPY.details[lang]} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={ICON_STROKE} />
              </span>
            </div>
          </Link>

          <div className="mt-12">
            <h2 className="text-2xl font-black text-[#17242b]">{VISUAL_COPY.tripSets[lang]}</h2>
            <div data-visual-module="trip-set-comparison" data-ui-grid="editorial" data-motion="reveal" className="mt-5 grid gap-4 md:grid-cols-3">
              {tripSets.map((col, index) => (
                <Link
                  key={col.slug}
                  href={`${prefix}/collections/${col.slug}`}
                  data-ui-card="editorial"
                  onClick={() => trackEvent('comparison_select', { route: '/collections', locale: lang, sectionId: 'trip-set-comparison', visualType: 'decision-card', contentId: col.slug, position: String(index + 1), targetRoute: `${prefix}/collections/${col.slug}` })}
                  className="wak-card-editorial group flex min-h-80 flex-col overflow-hidden border border-[#dbe4e5] bg-white transition hover:-translate-y-1 hover:border-[#9fc3ce] hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={col.photo} alt={col.photoAlt?.[lang] ?? col.title[lang]} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectPosition: col.photoPosition }} className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap gap-2 text-[0.65rem] font-bold text-[#5d7780]">
                      {col.durationLabel && <span>{col.durationLabel[lang]}</span>}
                      {col.companions && <><span aria-hidden="true">·</span><span>{col.companions[lang]}</span></>}
                    </div>
                    <h3 className="mt-3 text-lg font-black text-[#17242b]">{col.title[lang]}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#647178]">{col.tagline[lang]}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-bold text-brand-mid">{VISUAL_COPY.details[lang]} <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-[#d7dedf] pt-8">
            <h2 className="text-xl font-black text-[#17242b]">{VISUAL_COPY.more[lang]}</h2>
            <div data-visual-module="editorial-theme-index" data-motion="reveal" data-motion-variant="fade" className="mt-5 grid border-t border-[#d7dedf] md:grid-cols-2">
              {editorialCollections.map((col, index) => {
            const count = getCatalogItems(col.itemIds).length
            return (
              <Link
                key={col.slug}
                href={`${prefix}/collections/${col.slug}`}
                onClick={() => trackEvent('visual_module_interaction', { route: '/collections', locale: lang, sectionId: 'editorial-theme-index', visualType: 'compact-index', contentId: col.slug, position: String(index + 1), targetRoute: `${prefix}/collections/${col.slug}` })}
                className="group grid min-h-32 grid-cols-[7rem_1fr] items-center gap-4 border-b border-[#d7dedf] bg-transparent py-4 pr-4 transition hover:bg-white md:odd:border-r md:odd:pr-6 md:even:pl-6"
              >
                <div className="relative aspect-square overflow-hidden bg-[#dfe7e7]">
                  <Image src={col.photo} alt="" fill sizes="112px" style={{ objectPosition: col.photoPosition }} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <span className="text-[0.64rem] font-black tracking-[0.12em] text-[#78909a]">{count}{COLLECTIONS_UI.count_label[lang]}</span>
                  <h3 className="mt-1 line-clamp-2 text-base font-black leading-snug text-[#17242b]">{col.title[lang]}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-[#6f7d82]">{col.tagline[lang]}</p>
                </div>
              </Link>
            )
              })}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl">
          <SelectionCriteria className="mt-10" />
        </div>
      </section>
    </div>
  )
}
