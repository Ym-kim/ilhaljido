'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, Search, Plane } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick } from '@/lib/track'
import { CITY_GUIDES, GUIDE_UI, type CityGuide } from '@/lib/guides'
import { WorkOverlap } from '@/components/guide/WorkOverlap'
import { FEATURED_STAYS, FEATURED_STAYS_V2, FEATURED_STAYS_V3, FEATURED_ACTIVITIES } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { AffiliateSection } from '@/components/affiliate/AffiliateSection'
import { ShareButton } from '@/components/share/ShareButton'
import { getMediaAssetBySrc } from '@/lib/media/assets'
import { getExperienceEditorial } from '@/lib/experiences/editorials'
import { ExperienceEditorialCard } from '@/components/experiences/ExperienceEditorialCard'
import { GuideLookbook } from '@/components/guide/GuideLookbook'
import { ContextualStaySearch } from '@/components/stays/ContextualStaySearch'
import { getStayPilotDestinationByGuideSlug } from '@/lib/stays/pilotDestinations'

// ─────────────────────────────────────────────────────────────────────────────
// 목적지 가이드 뷰 — 라이트 커머스 톤, 3언어
// 팩트(시차·직항·통화·시즌) → 동네 → 추천 숙소/체험(제휴) → 도시 검색 폴백
// ─────────────────────────────────────────────────────────────────────────────

// V3 추가(2026-07-28): 서울·부산 가이드의 stayIds(stay-fraser-seoul·stay-uh-busan)가 V3 소속
const ALL_ITEMS = [...FEATURED_STAYS, ...FEATURED_STAYS_V2, ...FEATURED_STAYS_V3, ...FEATURED_ACTIVITIES]

export function GuideView({ guide, forceLang }: { guide: CityGuide; forceLang?: Lang }) {
  // forceLang: /en·/ja 로케일 라우트용 — 정적 생성 시 해당 언어로 렌더 (SEO)
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  // 로케일 URL 방문 시 사이트 언어(네비 등)도 동기화
  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const stays = guide.stayIds
    .map((id) => ALL_ITEMS.find((i) => i.id === id))
    .filter((i) => !!i)
    .map((i) => localizeAffiliateItem(i, lang))
  const activities = guide.activityIds
    .map((id) => ALL_ITEMS.find((i) => i.id === id))
    .filter((i) => !!i)
    .map((i) => localizeAffiliateItem(i, lang))
  const affiliateItems = [...stays, ...activities]

  const others = CITY_GUIDES.filter((g) => g.slug !== guide.slug)
  // 로케일 라우트에서는 가이드 간 링크도 같은 로케일 유지 (크롤러가 EN/JA 그래프 순회)
  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const heroAsset = getMediaAssetBySrc(guide.heroPhoto)
  const flagshipSlug = guide.slug === 'fukuoka'
    ? 'itoshima-photo-bus-tour'
    : guide.slug === 'busan'
      ? 'busan-coastal-highlights-day-tour'
      : guide.slug === 'seoul'
        ? 'hongdae-kpop-walk-dance'
        : guide.slug === 'tokyo'
          ? 'teamlab-planets-tokyo-evening'
          : undefined
  const flagshipExperience = flagshipSlug ? getExperienceEditorial(flagshipSlug) : undefined
  const stayPilotDestination = getStayPilotDestinationByGuideSlug(guide.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* ── 히어로 ── */}
      <section className="relative h-[300px] md:h-[380px] overflow-hidden dark-surface">
        <Image
          src={guide.heroPhoto}
          alt={heroAsset?.alt[lang] ?? guide.name[lang]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={heroAsset?.focalPoint ? {
            objectPosition: `${heroAsset.focalPoint.x * 100}% ${heroAsset.focalPoint.y * 100}%`,
          } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-6 pb-8 md:pb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-xs font-semibold mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              {GUIDE_UI.backHome[lang]}
            </Link>
            <p className="text-sky-300 text-[0.6875rem] font-bold tracking-[0.08em] uppercase mb-2">
              {GUIDE_UI.eyebrow[lang]}
            </p>
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2.5">
              {guide.name[lang]}
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl">{guide.tagline[lang]}</p>
            <div className="mt-4">
              <ShareButton
                title={`${guide.name[lang]} — Wakation`}
                text={guide.tagline[lang]}
                url={`https://www.wakation.kr/guide/${guide.slug}`}
                contentType="guide"
                slug={guide.slug}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 팩트 스트립 ── */}
      <section className="bg-[#f0f9ff] border-b border-[#dbeafe]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {guide.facts.map((f, i) => (
            <div key={i}>
              <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">
                {f.label[lang]}
              </p>
              <p className="text-[#111827] text-sm md:text-base font-bold">{f.value[lang]}</p>
            </div>
          ))}
        </div>
        {/* 빠른 비교 (internet/cost/visa) */}
        {(guide.internet || guide.costMonthly || guide.visaFree) && (
          <div className="max-w-5xl mx-auto px-6 pb-5 flex flex-wrap gap-4 border-t border-[#dbeafe] pt-4">
            {guide.internet && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '인터넷', EN: 'Internet', JP: 'ネット' }[lang]}</p>
                <p className="text-sm font-bold text-[#111827] flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={n <= guide.internet! ? 'text-teal-500' : 'text-[#d1d5db]'}>★</span>
                  ))}
                </p>
              </div>
            )}
            {guide.costMonthly && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '생활비', EN: 'Cost', JP: '生活費' }[lang]}</p>
                <p className="text-[#111827] text-sm font-bold">{guide.costMonthly[lang]}</p>
              </div>
            )}
            {guide.visaFree && (
              <div>
                <p className="text-[#94a3b8] text-[0.6875rem] font-semibold uppercase tracking-wide mb-1">{{ KO: '비자 (한국 여권)', EN: 'Visa (KR passport)', JP: '査証（韓国旅券）' }[lang]}</p>
                <p className="text-[#111827] text-sm font-bold">{guide.visaFree[lang]}</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── 인트로 + 워크타임 오버랩 ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[#334155] text-[0.9375rem] md:text-base leading-relaxed max-w-3xl mb-8">
          {guide.intro[lang]}
        </p>
        <WorkOverlap timeZone={guide.timeZone} cityName={guide.name[lang]} lang={lang} />
      </section>

      {guide.lookbook && <GuideLookbook lookbook={guide.lookbook} lang={lang} />}

      {/* ── 일하기 좋은 동네 ── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight mb-6">
          {GUIDE_UI.areasTitle[lang]}
        </h2>
        <ol data-visual-module="neighborhood-rail" data-motion="reveal" data-motion-speed="editorial" aria-label={GUIDE_UI.areasTitle[lang]} className="grid overflow-hidden border border-[#cfe0e5] bg-[#cfe0e5] md:grid-cols-2">
          {guide.areas.map((a, i) => (
            <li key={i} className="grid min-h-44 grid-cols-[3rem_1fr] gap-4 bg-[#f8fbff] p-5 sm:p-6">
              <div className="flex flex-col items-center" aria-hidden="true">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#153846] text-xs font-black text-white">0{i + 1}</span>
                {i < guide.areas.length - 1 && <span className="mt-2 h-full w-px bg-[#a9c4cc] md:hidden" />}
              </div>
              <div className="min-w-0">
                <span className="text-[0.64rem] font-black tracking-[0.14em] text-[#6b8790]">NEIGHBORHOOD</span>
                <h3 className="mt-2 text-lg font-black text-[#17242b]">{a.name[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475d66]">{a.desc[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 지자체 지원사업 연계 (SUPPORT_PROGRAMS 등재 데이터 재사용 — 조건·혜택 자체 주장 없음) ── */}
      {guide.supportProgram && (
        <section className="max-w-5xl mx-auto px-6 pb-12 md:pb-16">
          <div className="flex flex-col gap-4 rounded-2xl border border-[#c8e3d8] bg-[#f2faf6] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="text-[0.64rem] font-black tracking-[0.14em] text-[#3e7a61]">
                {lang === 'KO' ? '지자체 지원 연계' : lang === 'JP' ? '自治体支援と連携' : 'LOCAL SUPPORT PROGRAM'}
              </span>
              <h3 className="mt-1.5 text-lg font-black text-[#17352a]">{guide.supportProgram.name[lang]}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#3f5c50]">{guide.supportProgram.desc[lang]}</p>
            </div>
            <Link
              href={`${prefix}/programs/support/${guide.supportProgram.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#2f8f68] px-5 py-2.5 text-sm font-bold text-[#2f8f68] transition-all hover:bg-[#2f8f68] hover:text-white"
            >
              {lang === 'KO' ? '조건 확인' : lang === 'JP' ? '条件を確認' : 'See conditions'}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </section>
      )}

      {flagshipExperience && (
        <section className="border-t border-[#dfe7e7] bg-[#f7f5ef] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <span className="text-[0.68rem] font-black tracking-[0.15em] text-[#5d8290]">
              {flagshipExperience.placementCopy.guide.eyebrow[lang]}
            </span>
            <h2 className="mb-6 mt-2 text-2xl font-black text-[#172a36] sm:text-3xl">
              {flagshipExperience.placementCopy.guide.title[lang]}
            </h2>
            <ExperienceEditorialCard experience={flagshipExperience} lang={lang} source="guide" />
          </div>
        </section>
      )}

      {/* ── 추천 숙소·체험 (제휴, disclosure 내장) ── */}
      {affiliateItems.length > 0 && (
        <div className="border-t border-[#dbeafe] bg-white">
          <AffiliateSection
            eyebrow="WAKATION SELECT"
            title={GUIDE_UI.staysTitle[lang]}
            subtitle={GUIDE_UI.staysSub[lang]}
            items={affiliateItems}
            cols={2}
            tone="light"
          />
        </div>
      )}

      {stayPilotDestination ? (
        <section className="border-t border-[#dbe7e8] bg-[#f5f2eb] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <ContextualStaySearch
              destinationId={stayPilotDestination.id}
              lang={lang}
              source="guide"
              secondaryHref={`${prefix}/select/hotel#${guide.anchor}`}
            />
          </div>
        </section>
      ) : null}

      {/* ── 도시 전체 검색 + 항공권 CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-12 md:pb-16">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {!stayPilotDestination ? (
            <Link
              href={`${prefix}/select/hotel#${guide.anchor}`}
              className="btn-primary justify-center"
            >
              <Search className="w-4 h-4" strokeWidth={ICON_STROKE} />
              {GUIDE_UI.searchCta[lang]}
              <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          ) : null}
          {guide.flightUrl && (
            <a
              href={guide.flightUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackAffiliateClick({
                id: `flight-${guide.slug}`,
                itemName: `${guide.name[lang]} flight`,
                provider: 'Trip.com',
                status: 'active_affiliate',
                sourceSection: 'guide_travel_preparation',
                ctaLabel: GUIDE_UI.flightCta[lang],
                ctaPosition: 'guide_footer',
                destination: guide.slug,
                category: 'transport',
                locale: lang,
              })}
              className="inline-flex items-center gap-2 justify-center px-6 py-3.5 rounded-full border-2 border-brand-mid text-brand-mid font-bold text-[0.9375rem] hover:bg-brand-mid hover:text-white transition-all"
            >
              <Plane className="w-4 h-4" strokeWidth={ICON_STROKE} />
              {GUIDE_UI.flightCta[lang]}
            </a>
          )}
        </div>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
          <span className="text-[#64748b]">{GUIDE_UI.visaHint[lang]}</span>
          <Link
            href="/visa-ai"
            className="inline-flex items-center gap-1 text-brand-mid font-bold hover:gap-2 transition-all"
          >
            {GUIDE_UI.visaCta[lang]}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      {/* ── 다른 도시 가이드 ── */}
      <section className="bg-[#f0f9ff] border-t border-[#dbeafe] py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-lg font-bold text-[#111827] tracking-tight mb-5">
            {GUIDE_UI.otherGuides[lang]}
          </h2>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`${prefix}/guide/${g.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dbeafe] bg-white text-[#475569] text-sm font-semibold hover:border-[#93c5fd] hover:text-[#111827] transition-all"
              >
                {g.name[lang]}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            ))}
          </div>
          {/* /destinations 크로스링크 (8개 도시만) */}
          <Link
            href={`${prefix}/destinations`}
            className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-brand-mid font-semibold transition-colors"
          >
            {{
              KO: '도시별 인터넷·생활비·비자 빠른 비교 →',
              EN: 'Quick compare internet, cost & visa by city →',
              JP: '都市別のネット・生活費・ビザを比較 →',
            }[lang]}
          </Link>
        </div>
      </section>
    </div>
  )
}
