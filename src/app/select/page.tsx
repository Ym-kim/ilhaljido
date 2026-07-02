'use client'

import Link from 'next/link'
import { ArrowRight, BedDouble, Sparkles, Wifi, BookOpen } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'

const CATEGORIES = [
  {
    id: 'hotel',
    href: '/select/hotel',
    icon: BedDouble,
    emoji: '🛎',
    label: '숙소 예약',
    title: '목적지별 숙소 큐레이션',
    desc: '도쿄·오사카·후쿠오카·다낭·발리·리스본·제주. Booking.com과 Trip.com으로 바로 검색.',
    badge: '제휴',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    accent: 'border-teal-500/20 hover:border-teal-500/35',
    glow: 'hover:shadow-teal-500/5',
    destinations: ['🗼 도쿄', '🏯 오사카', '🌊 다낭', '🌴 발리', '🍊 제주'],
  },
  {
    id: 'activity',
    href: '/select/activity',
    icon: Sparkles,
    emoji: '🎌',
    label: '현지 체험',
    title: '목적지별 투어·액티비티',
    desc: '일본·베트남·발리 현지 투어, 교통패스, 입장권. KKday 파트너 상품 큐레이션.',
    badge: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    accent: 'border-white/8 hover:border-white/18',
    glow: '',
    destinations: ['🎌 일본', '🌿 베트남', '🌺 발리'],
  },
  {
    id: 'esim',
    href: '/select/esim',
    icon: Wifi,
    emoji: '📡',
    label: 'eSIM',
    title: '목적지별 eSIM 즉시 구매',
    desc: '일본·베트남·발리·포르투갈. Airalo로 도착 전 설치, 공항에서 바로 연결.',
    badge: '추천 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    accent: 'border-white/8 hover:border-white/18',
    glow: '',
    destinations: ['🇯🇵 일본', '🇻🇳 베트남', '🇮🇩 발리', '🇵🇹 포르투갈'],
  },
  {
    id: 'learn',
    href: '/select/learn',
    icon: BookOpen,
    emoji: '🎓',
    label: '강의·학습',
    title: '워케이션 중 성장하는 강의',
    desc: 'AI 자동화, 마케팅, 생산성, 개발. 인프런 파트너 강의 카테고리 큐레이션.',
    badge: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    accent: 'border-white/8 hover:border-white/18',
    glow: '',
    destinations: ['🤖 AI 자동화', '📢 마케팅', '⚡ 생산성', '💻 개발'],
  },
]

export default function SelectPage() {
  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-500/60 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-4">
            WAKATION SELECT
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            워케이션 준비,<br />
            <span className="text-teal-400">한 곳에서</span> 끝내세요
          </h1>
          <p className="text-white/45 text-base leading-relaxed max-w-xl mb-3">
            숙소 예약부터 현지 체험, eSIM, 온라인 강의까지. Wakation이 워케이션에 맞는 외부 서비스를 목적지별로 큐레이션합니다.
          </p>
          <p className="text-white/25 text-xs">
            외부 제휴 서비스이며 Wakation이 직접 운영하는 상품과 구분됩니다.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group relative flex flex-col bg-[#1a1a1a] border rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${cat.accent} ${cat.glow}`}
              >
                {/* Teal accent top line for affiliate */}
                {cat.id === 'hotel' && (
                  <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-teal-500/35 to-transparent" />
                )}

                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none">{cat.emoji}</span>
                    <span
                      className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border ${cat.badgeClass}`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-white/25 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all"
                    strokeWidth={ICON_STROKE}
                  />
                </div>

                <p className="text-white/40 text-[0.7rem] font-bold uppercase tracking-wider mb-1">
                  {cat.label}
                </p>
                <h2 className="text-white font-black text-lg leading-snug mb-2">{cat.title}</h2>
                <p className="text-white/40 text-xs leading-relaxed mb-5 flex-1">{cat.desc}</p>

                {/* Destination pills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.destinations.map((d) => (
                    <span
                      key={d}
                      className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/35 border border-white/8"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-10 space-y-1">
          <p className="text-white/20 text-[0.65rem] leading-relaxed max-w-2xl">
            * 일부 외부 링크는 제휴 마케팅 프로그램을 통해 Wakation에 수익이 발생할 수 있습니다.
            외부 서비스의 예약·결제·환불·이용 조건은 각 서비스의 약관을 따릅니다.
          </p>
          <p className="text-white/15 text-[0.65rem] leading-relaxed max-w-2xl">
            Wakation이 직접 운영하는 프로그램과 외부 제휴 서비스는 구분됩니다.
          </p>
        </div>
      </section>
    </div>
  )
}
