'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Wifi, Wallet, Calendar, IdCard, Clock, MapPin, BookOpen, Laptop, Car, Heart, TrainFront, Plane, Plug, CreditCard, ChevronDown } from 'lucide-react'
import { useWishlist } from '@/hooks/useWishlist'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { INTERNET_LABEL, COST_TIER_LABEL, COST_TIER_STYLE, buildCityFaq, type CityInsight } from '@/lib/cities'
import { CITY_CLIMATE, CLIMATE_UI, MONTH_LABELS } from '@/lib/cityClimate'
import { FEATURED_STAYS, FEATURED_STAYS_V2 } from '@/lib/affiliate/featured'
import { localizeAffiliateItem } from '@/lib/affiliate/localize'
import { CITY_GUIDES } from '@/lib/guides'

// ─────────────────────────────────────────────────────────────────────────────
// /destinations/[city] 상세 뷰 — 도시 인사이트 (3언어, 라이트 톤)
// 한눈에 보기 → 추천 숙소(제휴) → eSIM·체험 → 에디터 가이드 크로스링크 → 비자 AI
// ─────────────────────────────────────────────────────────────────────────────

const ALL_STAYS = [...FEATURED_STAYS, ...FEATURED_STAYS_V2]

const UI: Record<string, Record<Lang, string>> = {
  breadcrumb: { KO: '목적지', EN: 'Destinations', JP: '目的地' },
  glance: { KO: '한눈에 보기', EN: 'At a glance', JP: 'ひと目で' },
  prosTitle: { KO: '좋은 점', EN: 'The good', JP: '良い点' },
  consTitle: { KO: '아쉬운 점', EN: 'The trade-offs', JP: '惜しい点' },
  prosConsNote: {
    KO: '에디터 관점의 정리입니다 — 단점도 솔직하게 적었습니다.',
    EN: "Editor's honest take — trade-offs included.",
    JP: 'エディターの率直なまとめ — 惜しい点も正直に。',
  },
  internet: { KO: '인터넷 속도', EN: 'Internet speed', JP: 'ネット速度' },
  cost: { KO: '월 생활비', EN: 'Monthly cost', JP: '月の生活費' },
  season: { KO: '베스트 시즌', EN: 'Best season', JP: 'ベストシーズン' },
  visa: { KO: '비자', EN: 'Visa', JP: 'ビザ' },
  timezone: { KO: '시간대', EN: 'Time zone', JP: 'タイムゾーン' },
  flight: { KO: '직항 소요', EN: 'Direct flight', JP: '直行便' },
  plug: { KO: '콘센트·전압', EN: 'Plug & voltage', JP: 'コンセント・電圧' },
  payment: { KO: '결제 환경', EN: 'Payments', JP: '決済環境' },
  faqTitle: { KO: '자주 묻는 질문', EN: 'FAQ', JP: 'よくある質問' },
  staysTitle: { KO: '추천 숙소', EN: 'Recommended stay', JP: 'おすすめの宿' },
  workEnv: { KO: '업무 환경', EN: 'Work setup', JP: '仕事環境' },
  viewAll: { KO: '전체 보기', EN: 'View all', JP: 'すべて見る' },
  reviews: { KO: '리뷰', EN: 'reviews', JP: 'レビュー' },
  tripCompare: {
    KO: 'Trip.com에서도 비교하기 →',
    EN: 'Also compare on Trip.com →',
    JP: 'Trip.comでも比較 →',
  },
  esimLabel: { KO: 'eSIM · Airalo', EN: 'eSIM · Airalo', JP: 'eSIM · Airalo' },
  esimTitle: { KO: '{city} eSIM', EN: '{city} eSIM', JP: '{city} eSIM' },
  esimSub: {
    KO: '도착 전 설치, 공항 즉시 연결',
    EN: 'Install before arrival, connect at the airport',
    JP: '到着前に設定、空港ですぐ接続',
  },
  activityLabel: { KO: '현지 체험 · KKday', EN: 'Activities · KKday', JP: '現地体験 · KKday' },
  activityTitle: { KO: '{city} 체험 보기', EN: 'Explore {city} activities', JP: '{city}の体験を見る' },
  activitySub: {
    KO: '투어·입장권·교통패스',
    EN: 'Tours, tickets & transit passes',
    JP: 'ツアー・チケット・交通パス',
  },
  railLabel: { KO: '교통 패스 · Klook', EN: 'Transit pass · Klook', JP: '交通パス · Klook' },
  railSub: {
    KO: '체류 중 이동을 정액으로, 창구 대기 없이',
    EN: 'Flat-rate transit for your stay, skip the ticket lines',
    JP: '滞在中の移動を定額で、窓口に並ばず',
  },
  transferLabel: { KO: '공항 픽업 · Klook', EN: 'Airport pickup · Klook', JP: '空港送迎 · Klook' },
  transferTitle: { KO: '{city} 공항 픽업', EN: '{city} airport pickup', JP: '{city}空港送迎' },
  transferSub: {
    KO: '도착 즉시 기사 대기, 프라이빗 이동',
    EN: 'Driver waiting on arrival, private ride',
    JP: '到着時にドライバー待機、プライベート送迎',
  },
  guideLabel: { KO: '에디터 가이드', EN: 'Editor guide', JP: 'エディターガイド' },
  guideTitle: {
    KO: '{city} 워케이션 심층 가이드',
    EN: '{city} in-depth workation guide',
    JP: '{city}ワーケーション詳細ガイド',
  },
  guideSub: {
    KO: '동네 소개 · 일하기 좋은 카페 · 워크타임 오버랩 계산기',
    EN: 'Neighborhoods · work-friendly cafés · work-time overlap calculator',
    JP: 'エリア紹介・作業向きカフェ・ワークタイム重なり計算',
  },
  guideCta: { KO: '보러 가기', EN: 'Read guide', JP: '見に行く' },
  visaEyebrow: { KO: '비자·체류 AI (베타)', EN: 'Visa & stay AI (beta)', JP: 'ビザ・滞在AI（ベータ）' },
  visaTitle: {
    KO: '{city} 비자, 자세히 알아보기',
    EN: 'Learn more about {city} visas',
    JP: '{city}のビザを詳しく知る',
  },
  visaSub: {
    KO: '구체적인 조건과 연장 방법을 AI로 확인하세요.',
    EN: 'Check exact conditions and extensions with AI.',
    JP: '具体的な条件と延長方法をAIで確認。',
  },
  visaCta: { KO: '비자 AI 확인', EN: 'Check visa AI', JP: 'ビザAIで確認' },
  back: { KO: '← 다른 도시 보기', EN: '← Back to destinations', JP: '← 他の都市を見る' },
}

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

export function CityInsightView({ city, forceLang }: { city: CityInsight; forceLang?: Lang }) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const prefix = forceLang === 'EN' ? '/en' : forceLang === 'JP' ? '/ja' : ''
  const cityName = city.name[lang]
  const t = (key: string) => UI[key][lang].replace('{city}', cityName)
  const { has, toggle } = useWishlist()

  const rawStay = city.featuredStayId ? ALL_STAYS.find((s) => s.id === city.featuredStayId) : undefined
  const featuredStay = rawStay ? localizeAffiliateItem(rawStay, lang) : undefined
  const hasGuide = CITY_GUIDES.some((g) => g.slug === city.id)

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px] flex items-end overflow-hidden">
        <img
          src={city.photo}
          alt={`${cityName} workation`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 flex items-center gap-2 text-white/70 text-sm">
          <Link href={`${prefix}/destinations`} className="hover:text-white transition-colors">{UI.breadcrumb[lang]}</Link>
          <span>/</span>
          <span className="text-white">{cityName}</span>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pb-12 w-full">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" strokeWidth={2} />
                {city.country[lang]}
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-none">
                {city.flag} {cityName}
              </h1>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {city.tags[lang].map((tag) => (
              <span key={tag} className="text-xs bg-white/15 text-white backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

        {/* At-a-glance stats */}
        <section>
          <h2 className="text-xl font-black text-[#111] mb-4">{UI.glance[lang]}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard
              icon={Wifi}
              label={UI.internet[lang]}
              value={
                <span className="flex items-center gap-2 flex-wrap">
                  <Stars score={city.internet} />
                  <span className="text-[0.75rem] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                    {INTERNET_LABEL[city.internet][lang]}
                  </span>
                </span>
              }
              sub={city.internetNote[lang]}
            />
            <StatCard
              icon={Wallet}
              label={UI.cost[lang]}
              value={
                <span className="flex items-center gap-2 flex-wrap">
                  {city.costMonthly[lang]}
                  <span className={`text-[0.6875rem] font-bold px-2 py-0.5 rounded-full ${COST_TIER_STYLE[city.costTier]}`}>
                    {COST_TIER_LABEL[city.costTier][lang]}
                  </span>
                </span>
              }
              sub={city.costBreakdown[lang]}
            />
            <StatCard
              icon={Calendar}
              label={UI.season[lang]}
              value={city.bestSeason[lang]}
            />
            <StatCard
              icon={IdCard}
              label={UI.visa[lang]}
              value={city.visaFree[lang]}
            />
            <StatCard
              icon={Clock}
              label={UI.timezone[lang]}
              value={city.timezone[lang]}
            />
            <StatCard
              icon={Plane}
              label={UI.flight[lang]}
              value={city.flightTime[lang]}
            />
            <StatCard
              icon={Plug}
              label={UI.plug[lang]}
              value={city.plug[lang]}
            />
            <StatCard
              icon={CreditCard}
              label={UI.payment[lang]}
              value={city.payment[lang]}
            />
          </div>
        </section>

        {/* Pros / Cons — 에디터 관점, 단점도 솔직하게 (NomadList 벤치·정직성 원칙) */}
        <section>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-[#e8e4dc] p-5">
              <h3 className="text-sm font-black text-emerald-700 mb-3">{UI.prosTitle[lang]}</h3>
              <ul className="space-y-2">
                {city.pros[lang].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#444] leading-snug">
                    <span className="text-emerald-500 font-bold shrink-0 mt-px">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8e4dc] p-5">
              <h3 className="text-sm font-black text-rose-600 mb-3">{UI.consTitle[lang]}</h3>
              <ul className="space-y-2">
                {city.cons[lang].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-[#444] leading-snug">
                    <span className="text-rose-400 font-bold shrink-0 mt-px">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[#a8a29e] text-[0.6875rem] mt-2">{UI.prosConsNote[lang]}</p>
        </section>

        {/* 월별 시즌 스트립 — "언제 갈까" (NomadList Weather 벤치, 근사치·3단계 강수) */}
        {CITY_CLIMATE[city.id] && (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-xl font-black text-[#111]">{CLIMATE_UI.title[lang]}</h2>
              <div className="flex items-center gap-3 text-[0.6875rem] text-[#888]">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" /> {CLIMATE_UI.bestLegend[lang]}
                </span>
                <span className="inline-flex items-center gap-1">💧 {CLIMATE_UI.rainLegend[lang]}</span>
              </div>
            </div>
            <div className="overflow-x-auto -mx-1 px-1 pb-1">
              <div className="grid grid-cols-12 gap-1.5 min-w-[640px]">
                {CITY_CLIMATE[city.id].map((m, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-2 text-center ${
                      m.best
                        ? 'bg-teal-50 border-teal-200'
                        : 'bg-white border-[#e8e4dc]'
                    }`}
                  >
                    <div className={`text-[0.625rem] font-bold mb-1 ${m.best ? 'text-teal-700' : 'text-[#888]'}`}>
                      {MONTH_LABELS[lang][i]}
                    </div>
                    <div className="text-sm font-black text-[#111]">{m.t}°</div>
                    <div className="text-[0.625rem] h-3.5 leading-3.5">
                      {m.rain === 2 ? '💧💧' : m.rain === 1 ? '💧' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#a8a29e] text-[0.6875rem] mt-2">{CLIMATE_UI.note[lang]}</p>
          </section>
        )}

        {/* FAQ — 트리플 벤치. 답변은 검증 필드 자동 조립(buildCityFaq), JSON-LD와 동일 소스 */}
        <section>
          <h2 className="text-xl font-black text-[#111] mb-4">{UI.faqTitle[lang]}</h2>
          <div className="space-y-2">
            {buildCityFaq(city, lang).map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-2xl border border-[#e8e4dc] open:border-teal-200 transition-colors"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 font-bold text-sm text-[#111]">
                  {f.q}
                  <ChevronDown className="w-4 h-4 text-[#aaa] shrink-0 transition-transform group-open:rotate-180" strokeWidth={2} />
                </summary>
                <p className="px-5 pb-4 text-sm text-[#555] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Featured stay */}
        {featuredStay && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#111]">{UI.staysTitle[lang]}</h2>
              <a
                href={city.hotelBookingHref}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="text-sm text-teal-600 font-bold hover:text-teal-700 flex items-center gap-1"
              >
                {UI.viewAll[lang]} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href={featuredStay.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-teal-300 hover:shadow-lg overflow-hidden flex flex-col sm:flex-row transition-all"
            >
              <div className="relative sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={featuredStay.coverPhoto}
                  alt={featuredStay.productTitle ?? featuredStay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* 위시리스트 하트 (Airbnb 벤치) */}
                <button
                  type="button"
                  aria-label={has(featuredStay.id) ? 'remove from wishlist' : 'add to wishlist'}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(featuredStay.id) }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center hover:bg-black/65 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${has(featuredStay.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} strokeWidth={2} />
                </button>
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
                      {featuredStay.reviews && <span className="text-[#888]"> ({featuredStay.reviews} {UI.reviews[lang]})</span>}
                    </p>
                  )}
                  <p className="text-[#666] text-sm line-clamp-2">{featuredStay.desc}</p>

                  {/* 업무 환경 스펙 칩 — 더휴일 '오피스 스펙' 벤치, desc 검증 내용만 */}
                  {city.workTags && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold text-teal-700">
                        <Laptop className="w-3 h-3" strokeWidth={2} />
                        {UI.workEnv[lang]}
                      </span>
                      {city.workTags[lang].map((w) => (
                        <span key={w} className="text-[0.6875rem] font-medium bg-[#f0fdfa] text-teal-700 border border-teal-100 px-2 py-0.5 rounded-full">
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
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
                  {UI.tripCompare[lang]}
                </a>
              </div>
            )}
          </section>
        )}

        {/* eSIM + 공항픽업 + Activity CTAs */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <p className="text-xs text-[#888] mb-0.5">{UI.esimLabel[lang]}</p>
              <p className="font-bold text-[#111]">{t('esimTitle')}</p>
              <p className="text-xs text-[#888]">{UI.esimSub[lang]}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:translate-x-1 transition-transform shrink-0" />
          </a>

          {city.transferHref && (
            <a
              href={city.transferHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-[#c8c4bc] p-5 flex items-center gap-4 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-violet-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] mb-0.5">{UI.transferLabel[lang]}</p>
                <p className="font-bold text-[#111]">{t('transferTitle')}</p>
                <p className="text-xs text-[#888]">{UI.transferSub[lang]}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          )}

          {city.railPassHref && city.railPassName && (
            <a
              href={city.railPassHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e4dc] hover:border-[#c8c4bc] p-5 flex items-center gap-4 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <TrainFront className="w-5 h-5 text-emerald-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] mb-0.5">{UI.railLabel[lang]}</p>
                <p className="font-bold text-[#111]">{city.railPassName[lang]}</p>
                <p className="text-xs text-[#888]">{UI.railSub[lang]}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          )}

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
                <p className="text-xs text-[#888] mb-0.5">{UI.activityLabel[lang]}</p>
                <p className="font-bold text-[#111]">{t('activityTitle')}</p>
                <p className="text-xs text-[#888]">{UI.activitySub[lang]}</p>
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
              <p className="text-xs text-[#888] mb-0.5">{UI.guideLabel[lang]}</p>
              <p className="font-bold text-[#111]">{t('guideTitle')}</p>
              <p className="text-xs text-[#888]">{UI.guideSub[lang]}</p>
            </div>
            <Link
              href={`${prefix}/guide/${city.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#555] hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
            >
              {UI.guideCta[lang]} <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}

        {/* Visa quick link */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">{UI.visaEyebrow[lang]}</p>
            <h3 className="font-black text-[#111] text-lg">{t('visaTitle')}</h3>
            <p className="text-[#666] text-sm mt-1">{city.visaFree[lang]} — {UI.visaSub[lang]}</p>
          </div>
          <Link
            href={`/visa-ai?country=${city.visaCountryKey}`}
            className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            {UI.visaCta[lang]} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Back to destinations */}
        <div className="pt-2 pb-6">
          <Link
            href={`${prefix}/destinations`}
            className="text-sm text-[#888] hover:text-teal-600 flex items-center gap-1.5 transition-colors"
          >
            {UI.back[lang]}
          </Link>
        </div>
      </div>
    </div>
  )
}
