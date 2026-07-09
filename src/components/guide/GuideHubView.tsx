'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Plane } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import { CITY_GUIDES } from '@/lib/guides'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// /guide 허브 — 도시 카드 그리드 + 팩트 비교표 (내부링크 허브, 롱테일 SEO)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  eyebrow: { KO: 'City Guides', EN: 'City Guides', JP: 'City Guides' },
  title: { KO: '워케이션 도시 가이드', EN: 'Workation City Guides', JP: 'ワーケーション都市ガイド' },
  sub: {
    KO: '시차·비행·시즌·동네까지 — 에디터가 정리한 도시별 워케이션 가이드. 숙소와 항공권으로 바로 이어집니다.',
    EN: 'Time zones, flights, seasons and neighborhoods — editor-curated guides that lead straight to stays and flights.',
    JP: '時差・フライト・シーズン・エリアまで — エディター整理の都市別ガイド。宿と航空券にすぐつながります。',
  },
  compareTitle: { KO: '한눈에 비교', EN: 'Compare at a glance', JP: 'ひと目で比較' },
  city: { KO: '도시', EN: 'City', JP: '都市' },
  viewGuide: { KO: '가이드 보기', EN: 'View guide', JP: 'ガイドを見る' },
  home: { KO: '홈', EN: 'Home', JP: 'ホーム' },
}

export function GuideHubView() {
  const { lang } = useLang()
  const factLabels = CITY_GUIDES[0].facts.map((f) => f.label[lang])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          {T.home[lang]}
        </Link>

        <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3">
          {T.eyebrow[lang]}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight mb-3">
          {T.title[lang]}
        </h1>
        <p className="text-[#64748b] text-sm leading-relaxed max-w-2xl mb-10">{T.sub[lang]}</p>

        {/* 도시 카드 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {CITY_GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="group relative rounded-2xl overflow-hidden h-52 border border-[#dbeafe] hover:border-[#7dd3fc] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <img
                src={g.heroPhoto}
                alt={g.name[lang]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="text-white font-bold text-xl mb-1">{g.name[lang]}</h2>
                <p className="text-white/70 text-xs leading-snug mb-2.5 line-clamp-2">{g.tagline[lang]}</p>
                <span className="inline-flex items-center gap-1 text-sky-300 text-xs font-bold group-hover:gap-2 transition-all">
                  {T.viewGuide[lang]} <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 팩트 비교표 */}
        <h2 className="text-xl font-bold text-[#111827] tracking-tight mb-4">{T.compareTitle[lang]}</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#dbeafe]">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[#f0f9ff] text-[#475569]">
                <th className="text-left font-bold px-4 py-3">{T.city[lang]}</th>
                {factLabels.map((l) => (
                  <th key={l} className="text-left font-bold px-4 py-3">{l}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {CITY_GUIDES.map((g, i) => (
                <tr key={g.slug} className={i % 2 ? 'bg-[#f8fbff]' : 'bg-white'}>
                  <td className="px-4 py-3 font-bold text-[#111827]">
                    <Link href={`/guide/${g.slug}`} className="hover:text-brand-mid transition-colors">
                      {g.name[lang]}
                    </Link>
                  </td>
                  {g.facts.map((f, j) => (
                    <td key={j} className="px-4 py-3 text-[#475569]">{f.value[lang]}</td>
                  ))}
                  <td className="px-4 py-3">
                    {g.flightUrl && (
                      <a
                        href={g.flightUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-mid text-xs font-bold hover:gap-1.5 transition-all whitespace-nowrap"
                      >
                        <Plane className="w-3 h-3" strokeWidth={ICON_STROKE} />
                        {lang === 'KO' ? '항공권' : lang === 'JP' ? '航空券' : 'Flights'}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
