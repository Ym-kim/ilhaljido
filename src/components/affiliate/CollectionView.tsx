'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { getCollection, COLLECTIONS_UI } from '@/lib/affiliate/collections'
import { getCatalogItems } from '@/lib/affiliate/catalog'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { NotifySignup } from '@/components/home/NotifySignup'
import { ShareButton } from '@/components/share/ShareButton'
import { trackEvent } from '@/lib/track'
import { getTripSetCampaign } from '@/lib/tripSetCampaign'
import { getExperienceEditorial } from '@/lib/experiences/editorials'
import { ExperienceEditorialCard } from '@/components/experiences/ExperienceEditorialCard'
import { TripSetPreparationCard } from '@/components/affiliate/TripSetPreparationCard'

// 기획전 상세 — 히어로 + 구성 상품(숙소·체험·eSIM·항공) + 디스클로저 + 다음회차 알림
export function CollectionView({ slug, forceLang }: { slug: string; forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const col = getCollection(slug)
  const conversionSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  // Trip Set 진입 계측 (2026-07-28) — duration 필드가 있는 확장 컬렉션만.
  // source는 홈·무드·기간 탐색 링크의 ?src= 파라미터 (없으면 direct)
  useEffect(() => {
    if (!col?.duration) return
    const src = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('src') : null
    trackEvent('trip_set_open', {
      slug: col.slug,
      destination: col.cityGuideSlug ?? col.slug,
      duration: col.duration,
      locale: lang,
      source: src ?? 'direct',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [col?.slug])

  useEffect(() => {
    if (!col?.duration || !col.conversionItems?.length) return
    const section = conversionSectionRef.current
    if (!section) return

    let sent = false
    const observer = new IntersectionObserver((entries) => {
      if (sent || !entries.some((entry) => entry.isIntersecting)) return
      sent = true
      trackEvent('trip_set_conversion_view', {
        slug: col.slug,
        destination: col.cityGuideSlug ?? col.slug,
        locale: lang,
        item_count: String(col.conversionItems?.length ?? 0),
      })
      observer.disconnect()
    }, { threshold: 0.2 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [col, lang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''

  if (!col) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Link href={`${prefix}/collections`} className="text-brand-mid font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
        </Link>
      </div>
    )
  }

  const conversionItems = (col.conversionItems ?? []).flatMap((entry, index) => {
    const item = getCatalogItems([entry.affiliateItemId])[0]
    if (!item || item.status !== 'active_affiliate' || !item.href) return []
    return [{ entry, item: localizeAffiliateItem(item, lang), position: index + 1 }]
  })
  const items = col.duration && conversionItems.length > 0
    ? conversionItems.map(({ item }) => item)
    : getCatalogItems(col.itemIds).map((item) => localizeAffiliateItem(item, lang))
  const campaign = getTripSetCampaign(col.slug)
  const socialCopy = (lang === 'KO' || lang === 'JP') ? campaign?.copy[lang] : undefined
  const accent = campaign?.accent ?? '#38bdf8'
  const flagshipExperience = col.slug === 'fukuoka-3n4d' ? getExperienceEditorial('itoshima-photo-bus-tour') : undefined
  const categoryOrder = ['hotel', 'activity', 'transport', 'esim', 'insurance', 'education', 'visa'] as const
  const categorySummary = categoryOrder
    .map((category) => ({ category, count: items.filter((item) => item.category === category).length }))
    .filter((entry) => entry.count > 0)
  const trackSection = (section: string, placement: 'intro' | 'sticky') => {
    trackEvent('trip_set_section_click', {
      slug: col.slug,
      destination: col.cityGuideSlug ?? col.slug,
      locale: lang,
      section,
      placement,
    })
  }

  return (
    <div className={`min-h-screen bg-white ${lang === 'JP' ? 'font-jp' : ''}`}>
      {/* Hero */}
      <section className="relative flex h-[72svh] min-h-[500px] max-h-[760px] items-end overflow-hidden dark-surface">
        <Image
          src={col.photo}
          alt={col.photoAlt?.[lang] ?? col.title[lang]}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: col.photoPosition }}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/95 via-[#04121f]/22 to-[#04121f]/12" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="relative w-full max-w-6xl mx-auto px-5 pb-8 sm:px-6 sm:pb-12">
          <Link
            href={`${prefix}/collections`}
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-4 text-xs font-bold text-white/80 transition-colors hover:bg-black/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} /> {COLLECTIONS_UI.back[lang]}
          </Link>
          {/* span 사용 — .dark-surface p 규칙이 sky 액센트를 흰색으로 덮는 함정 회피 */}
          <span className="mb-3 block text-xs font-black uppercase tracking-[0.16em] text-white/75">
            {COLLECTIONS_UI.eyebrow[lang]}
          </span>
          <span className="mb-4 block h-1 w-12 rounded-full" style={{ backgroundColor: accent }} />
          <h1 className="mb-3 max-w-3xl text-[2.15rem] font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {col.title[lang]}
          </h1>
          {(col.durationLabel || col.companions) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {col.durationLabel && (
                <span className="inline-flex items-center text-[0.75rem] font-bold px-3 py-1 rounded-full bg-white/14 text-white border border-white/25 backdrop-blur-sm">
                  {col.durationLabel[lang]}
                </span>
              )}
              {col.companions && (
                <span className="inline-flex items-center text-[0.75rem] font-bold px-3 py-1 rounded-full bg-white/14 text-white border border-white/25 backdrop-blur-sm">
                  {col.companions[lang]}
                </span>
              )}
            </div>
          )}
          <span className="block max-w-2xl text-sm font-bold leading-relaxed text-white/88 sm:text-base">{col.tagline[lang]}</span>
        </div>
      </section>

      <section className="border-b border-[#e8e0d4] bg-[var(--wak-ivory)] px-5 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto grid min-w-0 max-w-5xl gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p className="min-w-0 max-w-3xl break-words text-[0.95rem] leading-7 text-[#45545e] sm:text-base">{col.desc[lang]}</p>
          <div className="flex max-w-full flex-wrap items-center gap-2 justify-self-start md:max-w-sm md:justify-end">
            {col.duration && (
              <>
                <a
                  href="#trip-prepare"
                  onClick={() => trackSection('prepare', 'intro')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b4b69] px-5 text-sm font-black text-white transition hover:bg-[#073c55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  {COLLECTIONS_UI.ts_intro_prepare[lang]}
                </a>
                <a
                  href="#trip-flow"
                  onClick={() => trackSection('flow', 'intro')}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd9dc] bg-white px-5 text-sm font-black text-[#245f76] transition hover:border-[#8eb3bf] hover:bg-[#f6fafb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  {COLLECTIONS_UI.ts_intro_flow[lang]}
                </a>
              </>
            )}
            <ShareButton
              title={socialCopy?.shareTitle ?? `${col.title[lang]} — Wakation`}
              text={socialCopy?.shareDescription ?? col.desc[lang]}
              url={`https://www.wakation.kr${prefix}/collections/${col.slug}`}
              contentType="collection"
              slug={col.slug}
              tone="light"
            />
          </div>
        </div>
      </section>

      {col.duration && (
        <nav aria-label={COLLECTIONS_UI.ts_nav_label[lang]} className="sticky top-16 z-30 border-b border-[#dce5e5] bg-white/95 px-4 py-2.5 shadow-[0_8px_22px_rgba(15,50,65,0.05)] backdrop-blur-lg sm:px-6">
          <div className="mx-auto flex max-w-5xl gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {([
              ['fit', COLLECTIONS_UI.ts_nav_fit[lang]],
              ['flow', COLLECTIONS_UI.ts_nav_flow[lang]],
              ['comfort', COLLECTIONS_UI.ts_nav_comfort[lang]],
              ['prepare', COLLECTIONS_UI.ts_nav_prepare[lang]],
            ] as const).map(([section, label]) => (
              <a
                key={section}
                href={`#trip-${section}`}
                onClick={() => trackSection(section, 'sticky')}
                className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-4 text-xs font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${section === 'prepare' ? 'bg-[#0b4b69] text-white hover:bg-[#073c55]' : 'text-[#526670] hover:bg-[#edf4f5] hover:text-[#163e51]'}`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* ── Trip Set 확장 섹션 (2026-07-28) — 확장 필드가 있을 때만 렌더, 기존 컬렉션 무영향 ── */}
      {col.audience && (
        <section id="trip-fit" data-trip-section="fit" className="scroll-mt-32 border-b border-[#edf0ed] px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-7 text-2xl font-black text-[var(--wak-ink)] sm:text-3xl">{COLLECTIONS_UI.ts_audience[lang]}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {col.audience.map((a, i) => (
                <div key={i} className="min-w-0 border-l-2 py-2 pl-4" style={{ borderColor: accent }}>
                  <span className="mb-2 block text-[0.68rem] font-black tracking-[0.16em] text-[#91a0a7]">0{i + 1}</span>
                  <span className="break-words text-sm font-semibold leading-relaxed text-[#33444f]">{a[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {col.dayFlow && (
        <section id="trip-flow" data-trip-section="flow" className="scroll-mt-32 border-b border-[#e8e0d4] bg-[var(--wak-ivory)] px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-7 text-2xl font-black text-[var(--wak-ink)] sm:text-3xl">{COLLECTIONS_UI.ts_flow[lang]}</h2>
            <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
              {col.dayFlow.map((d) => (
                <div key={d.day} className="relative w-[78vw] max-w-[19rem] shrink-0 snap-center overflow-hidden rounded-[1.35rem] border border-[#e9e0d3] bg-white p-5 shadow-[0_8px_24px_rgba(50,45,36,0.04)] sm:w-auto sm:max-w-none">
                  <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
                  <p className="mb-1 text-xs font-black uppercase tracking-widest text-[#60747e]">
                    {COLLECTIONS_UI.ts_day[lang]} {d.day}
                  </p>
                  <p className="mb-3 text-[0.9375rem] font-black text-[#172a36]">{d.title[lang]}</p>
                  <ul className="space-y-1.5">
                    {d.items.map((it, i) => (
                      <li key={i} className="flex gap-1.5 text-[0.8125rem] leading-relaxed text-[#65737c]">
                        <span className="shrink-0" style={{ color: accent }}>·</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-2xl text-[0.7rem] leading-relaxed text-[#8e877d]">{COLLECTIONS_UI.ts_flow_note[lang]}</p>
          </div>
        </section>
      )}

      {col.comfortFacts && (
        <section id="trip-comfort" data-trip-section="comfort" className="scroll-mt-32 border-b border-[#e4eaeb] bg-[#f2f7f7] px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-7 text-2xl font-black text-[var(--wak-ink)] sm:text-3xl">{COLLECTIONS_UI.ts_comfort[lang]}</h2>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              {col.comfortFacts.map((f, i) => (
                <div key={i} className="flex min-w-0 items-start gap-3 rounded-2xl border border-[#dae4e5] bg-white px-4 py-4">
                  <span className="mt-0.5 max-w-[7.5rem] shrink-0 rounded-full bg-[#e8f1f2] px-2.5 py-1 text-center text-[0.6875rem] font-black leading-snug text-[#315c6c]">
                    {f.label[lang]}
                  </span>
                  <span className="min-w-0 text-[#475569] text-[0.8125rem] leading-relaxed">
                    {f.value[lang]}
                    {f.verifiedAt && (
                      <span className="block text-[#b6c2d1] text-[0.65rem] mt-0.5">
                        {f.source ? `${f.source} · ` : ''}{f.verifiedAt}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {flagshipExperience && (
        <section className="border-b border-[#e4e9e7] bg-[#f7f5ef] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#5d8290]">
              {lang === 'KO' ? 'DAY 3 대안' : lang === 'JP' ? 'DAY 3 の選択肢' : 'DAY 3 OPTION'}
            </span>
            <h2 className="mb-6 mt-2 text-2xl font-black text-[#172a36] sm:text-3xl">
              {lang === 'KO' ? '하루를 비우기 어렵다면, 이토시마 반나절' : lang === 'JP' ? '一日を空けにくいなら、糸島を半日で' : 'If a full day is too much, take half a day for Itoshima'}
            </h2>
            <ExperienceEditorialCard experience={flagshipExperience} lang={lang} source="trip_set" />
          </div>
        </section>
      )}

      {/* 구성 상품 */}
      <section ref={col.duration ? conversionSectionRef : undefined} id={col.duration ? 'trip-prepare' : undefined} data-trip-section={col.duration ? 'prepare' : undefined} className="scroll-mt-32 bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-2 text-2xl font-black text-[var(--wak-ink)] sm:text-3xl">
            {col.duration ? COLLECTIONS_UI.ts_prepare[lang] : COLLECTIONS_UI.included[lang]}
          </h2>
          {col.duration && (
            <p className="mb-1 max-w-2xl text-xs leading-relaxed text-[#7a8a93]">{COLLECTIONS_UI.ts_prepare_note[lang]}</p>
          )}
          <div className="mb-7 mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#8a989f]">{items.length}{COLLECTIONS_UI.count_label[lang]}</span>
            {col.duration && categorySummary.map(({ category, count }) => (
              <span key={category} className="rounded-full border border-[#dce6e7] bg-[#f6f9f8] px-2.5 py-1 text-[0.6875rem] font-bold text-[#526a74]">
                {COLLECTIONS_UI[`ts_category_${category}`][lang]} {count}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {col.duration && conversionItems.length > 0
              ? conversionItems.map(({ entry, item, position }) => (
                  <TripSetPreparationCard
                    key={item.id}
                    item={item}
                    reason={entry.reason[lang]}
                    verifiedAt={entry.verifiedAt}
                    categoryLabel={COLLECTIONS_UI[`ts_category_${item.category}`][lang]}
                    lang={lang}
                    tripSetSlug={col.slug}
                    destinationSlug={col.cityGuideSlug ?? col.slug}
                    position={position}
                  />
                ))
              : items.map((item) => (
                  <AffiliateCard key={item.id} item={item} visual />
                ))}
          </div>
          <details className="group mt-7 max-w-2xl border-t border-[#e5e9e8] pt-4">
            <summary className="min-h-11 cursor-pointer list-none py-2 text-xs font-bold text-[#65757d] [&::-webkit-details-marker]:hidden">
              {COLLECTIONS_UI.ts_disclosure_label[lang]}
              <span aria-hidden="true" className="ml-1.5 inline-block transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-2 text-[0.72rem] leading-relaxed text-[#8c989e]">{COLLECTIONS_UI.disclosure[lang]}</p>
          </details>
          {col.cityGuideSlug && (
            <Link
              href={`${prefix}/guide/${col.cityGuideSlug}`}
              onClick={() => trackEvent('trip_set_guide_click', { slug: col.slug, destination: col.cityGuideSlug ?? col.slug, locale: lang })}
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfdcdf] px-5 text-sm font-bold text-[#245f76] transition-all hover:border-[#7faabc] hover:bg-[#f5fafb] hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {COLLECTIONS_UI.ts_guide_cta[lang]} <ArrowRight className="h-4 w-4" strokeWidth={ICON_STROKE} />
            </Link>
          )}
          {/* 지자체 지원사업 연계 (2026-08-04 cross-link-mesh) — GuideView 콜아웃 패턴 이식, 등재 데이터 재사용 */}
          {col.supportProgram && (
            <div className="mt-6 flex max-w-2xl flex-col gap-4 rounded-2xl border border-[#c8e3d8] bg-[#f2faf6] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <span className="text-[0.64rem] font-black tracking-[0.14em] text-[#3e7a61]">
                  {lang === 'KO' ? '지자체 지원 연계' : lang === 'JP' ? '自治体支援と連携' : 'LOCAL SUPPORT PROGRAM'}
                </span>
                <h3 className="mt-1.5 text-lg font-black text-[#17352a]">{col.supportProgram.name[lang]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3f5c50]">{col.supportProgram.desc[lang]}</p>
              </div>
              <Link
                href={`${prefix}/programs/support/${col.supportProgram.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#2f8f68] px-5 py-2.5 text-sm font-bold text-[#2f8f68] transition-all hover:bg-[#2f8f68] hover:text-white"
              >
                {lang === 'KO' ? '조건 확인' : lang === 'JP' ? '条件を確認' : 'See conditions'}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 다음 회차 알림 */}
      <section className="dark-surface bg-[#071c29] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="mb-2 block text-[0.68rem] font-black uppercase tracking-[0.16em] text-sky-300">Wakation Hosted</span>
          <p className="text-white/72 text-sm font-semibold mb-3">
            {lang === 'KO' ? '이 테마의 프로그램이 열리면 알려드릴게요' : lang === 'JP' ? 'このテーマのプログラム開催時にお知らせ' : "We'll tell you when a program for this theme opens"}
          </p>
          <NotifySignup source={`기획전 알림 (${col.slug})`} event="program_alert_submitted" />
        </div>
      </section>
    </div>
  )
}
