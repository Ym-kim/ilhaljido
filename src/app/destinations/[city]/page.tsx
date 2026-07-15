import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Wifi, Wallet, Calendar, IdCard, Clock, MapPin, BookOpen } from 'lucide-react'
import { CITY_INSIGHTS, getCityById } from '@/lib/cities'
import { FEATURED_STAYS, FEATURED_STAYS_V2 } from '@/lib/affiliate/featured'
import { CITY_GUIDES } from '@/lib/guides'

// ── Static generation ─────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return CITY_INSIGHTS.map((c) => ({ city: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: cityId } = await params
  const city = getCityById(cityId)
  if (!city) return {}
  return {
    title: `${city.city} 워케이션 가이드 — 비자·생활비·인터넷 완전 정리`,
    description: city.metaDesc,
    alternates: { canonical: `https://www.wakation.kr/destinations/${cityId}` },
    openGraph: {
      title: `${city.city} 워케이션 가이드 | Wakation`,
      description: city.metaDesc,
      url: `https://www.wakation.kr/destinations/${cityId}`,
      siteName: 'Wakation',
      images: [{ url: city.photo, width: 1200, height: 630, alt: `${city.city} 워케이션` }],
    },
  }
}

// ── Helper components ─────────────────────────────────────────────────────────
function Stars({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 text-lg">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? 'text-teal-500' : 'text-[#ddd]'}>★</span>
      ))}
    </span>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
  sub?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e4dc] p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-teal-600 shrink-0" strokeWidth={2} />
        <span className="text-xs font-bold text-[#888] uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-[#111] font-black text-lg leading-tight">{value}</div>
      {sub && <p className="text-[#888] text-xs mt-1">{sub}</p>}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: cityId } = await params
  const city = getCityById(cityId)
  if (!city) notFound()

  const allStays = [...FEATURED_STAYS, ...FEATURED_STAYS_V2]
  const featuredStay = city.featuredStayId
    ? allStays.find((s) => s.id === city.featuredStayId)
    : undefined
  const hasGuide = CITY_GUIDES.some((g) => g.slug === cityId)

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px] flex items-end overflow-hidden">
        <img
          src={city.photo}
          alt={`${city.city} 워케이션`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 flex items-center gap-2 text-white/70 text-sm">
          <Link href="/destinations" className="hover:text-white transition-colors">목적지</Link>
          <span>/</span>
          <span className="text-white">{city.city}</span>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pb-12 w-full">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" strokeWidth={2} />
                {city.country}
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-none">
                {city.flag} {city.city}
              </h1>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {city.tags.map((t) => (
              <span key={t} className="text-xs bg-white/15 text-white backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* At-a-glance stats */}
        <section>
          <h2 className="text-xl font-black text-[#111] mb-4">한눈에 보기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard
              icon={Wifi}
              label="인터넷 속도"
              value={<Stars score={city.internet} />}
              sub={city.internetNote}
            />
            <StatCard
              icon={Wallet}
              label="월 생활비"
              value={city.costMonthly}
              sub={city.costBreakdown + ' (만원)'}
            />
            <StatCard
              icon={Calendar}
              label="베스트 시즌"
              value={city.bestSeason}
            />
            <StatCard
              icon={IdCard}
              label="비자"
              value={city.visaFree}
            />
            <StatCard
              icon={Clock}
              label="시간대"
              value={city.timezone}
            />
          </div>
        </section>

        {/* Featured stay */}
        {featuredStay && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#111]">추천 숙소</h2>
              <a
                href={city.hotelBookingHref}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="text-sm text-teal-600 font-bold hover:text-teal-700 flex items-center gap-1"
              >
                전체 보기 <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href={featuredStay.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-teal-300 hover:shadow-lg overflow-hidden flex flex-col sm:flex-row transition-all"
            >
              <div className="sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={featuredStay.coverPhoto}
                  alt={featuredStay.productTitle ?? featuredStay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[#888] text-xs mb-0.5">{featuredStay.name}</p>
                      <h3 className="font-black text-[#111] text-lg leading-tight">
                        {featuredStay.productTitle}
                      </h3>
                    </div>
                    {featuredStay.badge && (
                      <span className="shrink-0 text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-bold">
                        {featuredStay.badge}
                      </span>
                    )}
                  </div>
                  {featuredStay.rating && (
                    <p className="text-sm text-[#555] mb-2">
                      ★ {featuredStay.rating}
                      {featuredStay.reviews && <span className="text-[#888]"> ({featuredStay.reviews} 리뷰)</span>}
                    </p>
                  )}
                  <p className="text-[#666] text-sm line-clamp-2">{featuredStay.desc}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl group-hover:bg-teal-700 transition-colors w-fit">
                  {featuredStay.cta} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Trip.com secondary link */}
            {city.hotelTripHref && (
              <div className="mt-2 text-center">
                <a
                  href={city.hotelTripHref}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="text-xs text-[#888] hover:text-[#555] transition-colors"
                >
                  Trip.com에서도 비교하기 →
                </a>
              </div>
            )}
          </section>
        )}

        {/* eSIM + Activity CTAs */}
        <section className="grid sm:grid-cols-2 gap-4">
          <a
            href={city.esimHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-[#c8c4bc] p-5 flex items-center gap-4 transition-all hover:shadow-md"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#888] mb-0.5">eSIM · Airalo</p>
              <p className="font-bold text-[#111]">{city.city} eSIM</p>
              <p className="text-xs text-[#888]">도착 전 설치, 공항 즉시 연결</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:translate-x-1 transition-transform shrink-0" />
          </a>

          {city.activityHref && (
            <a
              href={city.activityHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-[#c8c4bc] p-5 flex items-center gap-4 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xl">🎟</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] mb-0.5">현지 체험 · KKday</p>
                <p className="font-bold text-[#111]">{city.city} 체험 보기</p>
                <p className="text-xs text-[#888]">투어·입장권·교통패스</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          )}
        </section>

        {/* 에디터 심층 가이드 크로스링크 */}
        {hasGuide && (
          <section className="bg-[#f8f7f4] border border-[#e8e4dc] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl border border-[#e8e4dc] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-[#555]" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#888] mb-0.5">에디터 가이드</p>
              <p className="font-bold text-[#111]">{city.city} 워케이션 심층 가이드</p>
              <p className="text-xs text-[#888]">동네 소개 · 일하기 좋은 카페 · 워크타임 오버랩 계산기</p>
            </div>
            <Link
              href={`/guide/${cityId}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#555] hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
            >
              보러 가기 <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}

        {/* Visa quick link */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">비자·체류 AI (베타)</p>
            <h3 className="font-black text-[#111] text-lg">{city.city} 비자, 자세히 알아보기</h3>
            <p className="text-[#666] text-sm mt-1">{city.visaFree} — 구체적인 조건과 연장 방법을 AI로 확인하세요.</p>
          </div>
          <Link
            href={`/visa-ai?country=${city.visaCountryKey}`}
            className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            비자 AI 확인 <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Back to destinations */}
        <div className="pt-2 pb-6">
          <Link
            href="/destinations"
            className="text-sm text-[#888] hover:text-teal-600 flex items-center gap-1.5 transition-colors"
          >
            ← 다른 도시 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
