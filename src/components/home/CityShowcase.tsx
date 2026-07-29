'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'
import { CITY_GUIDES } from '@/lib/guides'
import { ICON_STROKE } from '@/lib/icons'
import { trackEvent } from '@/lib/track'

// ─────────────────────────────────────────────────────────────────────────────
// 지금 떠나기 좋은 도시 — 대형 비주얼 카드 (2026-07-28 라이프스타일 홈 개편)
// 데이터는 CITY_GUIDES 재사용(검증 사진·3언어 태그라인 기보유 — 신규 데이터 0).
// locale별 노출 순서 분기: KO=일본 단기 우선 / JP=한국(제주) 우선(방한 일본인 여성 65%
// 리서치 근거) / EN=동남아 장기 우선. 시드니는 홈 8장 큐레이션에서 제외(가이드는 유지).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

// 2026-07-28 서울·부산 가이드 신설 반영 — JP는 한국 우선(방한 일본인 여성 65% 리서치 근거)
const ORDER: Record<Lang, string[]> = {
  KO: ['tokyo', 'fukuoka', 'osaka', 'busan', 'jeju', 'danang', 'bali', 'chiangmai'],
  JP: ['seoul', 'busan', 'jeju', 'fukuoka', 'bali', 'chiangmai', 'osaka', 'danang'],
  EN: ['seoul', 'bali', 'chiangmai', 'tokyo', 'busan', 'danang', 'jeju', 'osaka'],
}

const UI: Record<string, L> = {
  eyebrow: { KO: 'Cities to go now', EN: 'Cities to go now', JP: 'Cities to go now' },
  title: { KO: '지금 떠나기 좋은 도시', EN: 'Cities worth going right now', JP: 'いま行きたい都市' },
  sub: {
    KO: '시차·인터넷·한 달 비용까지 — 직접 검증한 가이드가 있는 도시만 골랐습니다.',
    EN: 'Time zones, internet, monthly costs — only cities with a guide we verified ourselves.',
    JP: '時差・ネット環境・1カ月の費用まで。検証済みガイドのある都市だけを選びました。',
  },
  cta: { KO: '가이드 보기', EN: 'Open guide', JP: 'ガイドを見る' },
  all: { KO: '모든 여행지 보기', EN: 'All destinations', JP: '行き先をすべて見る' },
}

export function CityShowcase({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang } = useLang()
  const lang = forceLang ?? ctxLang
  const cities = ORDER[lang]
    .map((slug) => CITY_GUIDES.find((g) => g.slug === slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))

  return (
    <section className="bg-white border-b border-[#dbeafe] py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 md:mb-10">
          <div>
            <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-2.5">{UI.eyebrow[lang]}</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-snug tracking-tight mb-2">{UI.title[lang]}</h2>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-lg">{UI.sub[lang]}</p>
          </div>
          <Link href="/destinations" className="shrink-0 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:gap-2.5 transition-all">
            {UI.all[lang]} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cities.map((c, i) => (
            <Link
              key={c.slug}
              href={`/guide/${c.slug}`}
              onClick={() => trackEvent('destination_open', { city: c.slug, from: 'home_city_showcase' })}
              className={`group relative rounded-2xl overflow-hidden block border border-[#dbeafe] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                i < 2 ? 'h-56 sm:h-72 col-span-1' : 'h-44 sm:h-52'
              }`}
            >
              <Image
                src={c.heroPhoto}
                alt={`${c.name[lang]}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-black text-lg sm:text-xl leading-snug">{c.name[lang]}</h3>
                <p className="text-white/70 text-[0.7rem] sm:text-xs mt-1 leading-snug line-clamp-2">{c.tagline[lang]}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sky-300 text-[0.75rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {UI.cta[lang]} <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
