import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CITY_INSIGHTS } from '@/lib/cities'

export const metadata: Metadata = {
  title: '워케이션 도시 가이드 — 도쿄·발리·치앙마이·다낭·세부·시드니',
  description: '워케이션 인기 8개 도시의 인터넷 속도·생활비·비자·베스트 시즌 완전 비교. 도쿄 무비자 90일, 발리 월 100만원대, 치앙마이 노마드 1번지.',
  alternates: { canonical: 'https://www.wakation.kr/destinations' },
  openGraph: {
    title: '워케이션 도시 가이드 | Wakation',
    description: '도쿄·발리·치앙마이·다낭·세부·시드니 워케이션 완벽 가이드. 비자·생활비·인터넷 한눈에.',
    url: 'https://www.wakation.kr/destinations',
    siteName: 'Wakation',
  },
}

function InternetStars({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? 'text-teal-500' : 'text-[#ddd]'}>★</span>
      ))}
    </span>
  )
}

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <section className="bg-white border-b border-[#e8e4dc] px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase text-teal-600 mb-3">Destinations</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] leading-tight mb-4">
            워케이션 도시 가이드
          </h1>
          <p className="text-[#666] text-lg max-w-xl">
            인터넷·생활비·비자·시즌까지 핵심만 정리. 다음 워케이션 목적지를 정해보세요.
          </p>
        </div>
      </section>

      {/* City grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITY_INSIGHTS.map((city) => (
            <Link
              key={city.id}
              href={`/destinations/${city.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e8e4dc] hover:border-teal-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Cover photo */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={city.photo}
                  alt={`${city.city} 워케이션`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-2xl mb-0.5">{city.flag}</div>
                  <div className="font-black text-lg leading-tight">{city.city}</div>
                  <div className="text-white/70 text-xs">{city.country}</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {city.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-xs bg-[#f0f0eb] text-[#555] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#888]">인터넷</span>
                    <InternetStars score={city.internet} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#888]">생활비</span>
                    <span className="font-bold text-[#111]">{city.costMonthly}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#888]">비자</span>
                    <span className="text-[#444] text-xs">{city.visaFree.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#f0f0eb] flex items-center justify-between">
                  <span className="text-teal-600 text-xs font-bold">자세히 보기</span>
                  <ArrowRight className="w-4 h-4 text-teal-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
