'use client'

import Link from 'next/link'
import { ArrowRight, BedDouble, Sparkles, Wifi, BookOpen } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { AffiliateCard } from '@/components/affiliate/AffiliateCard'
import { HOME_FEATURED_ITEMS } from '@/lib/affiliate/links'

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
  },
  {
    id: 'activity',
    href: '/select/activity',
    icon: Sparkles,
    emoji: '🎌',
    label: '현지 체험',
    title: '목적지별 투어·액티비티',
    desc: '일본·베트남·발리 현지 투어, 교통패스, 입장권. KKday·Klook 파트너 상품 큐레이션.',
    badge: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    accent: 'border-white/8 hover:border-white/18',
    glow: '',
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
  },
]

export default function SelectPage() {
  const hotelItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-tokyo-hotel', 'feat-osaka-hotel', 'feat-fukuoka-hotel', 'feat-bali-hotel'].includes(i.id)
  )
  const etcItems = HOME_FEATURED_ITEMS.filter((i) =>
    ['feat-japan-activity', 'feat-japan-esim'].includes(i.id)
  )

  return (
    <div className="min-h-screen bg-[#111] dark-surface">
      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-teal-500/70 text-[0.65rem] font-black tracking-[0.22em] uppercase mb-5">
            WAKATION SELECT
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.06] tracking-tight mb-5">
            워케이션 준비,<br />
            <span className="text-teal-400">한 곳에서</span> 끝내세요
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mb-3">
            숙소 예약부터 현지 체험, eSIM, 온라인 강의까지.<br className="hidden sm:block" />
            워케이션에 맞는 외부 서비스를 목적지별로 큐레이션합니다.
          </p>
          <p className="text-white/25 text-xs">
            외부 제휴 서비스이며 Wakation이 직접 운영하는 상품과 구분됩니다.
          </p>
        </div>
      </section>

      {/* Category navigation */}
      <section className="px-6 pb-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-8">
          <p className="text-white/30 text-[0.65rem] font-black tracking-[0.18em] uppercase mb-4">
            카테고리
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`group relative flex flex-col bg-[#1a1a1a] border rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${cat.accent} ${cat.glow}`}
                >
                  {cat.id === 'hotel' && (
                    <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.id === 'hotel' ? 'bg-teal-500/15' : 'bg-white/8'}`}>
                      <Icon className={`w-4 h-4 ${cat.id === 'hotel' ? 'text-teal-400' : 'text-white/50'}`} strokeWidth={ICON_STROKE} />
                    </div>
                    <span className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full border ${cat.badgeClass}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-white font-black text-sm mb-1.5">{cat.label}</p>
                  <p className="text-white/35 text-[0.7rem] leading-relaxed line-clamp-2">{cat.title}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/25 group-hover:text-teal-400/70 text-[0.65rem] font-bold transition-colors">
                    둘러보기
                    <ArrowRight className="w-3 h-3" strokeWidth={ICON_STROKE} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 추천 숙소 상품 */}
      <section className="px-6 pb-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-teal-500/60 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-2">
                인기 숙소
              </p>
              <h2 className="text-white font-black text-xl md:text-2xl">목적지별 추천 숙소</h2>
            </div>
            <Link
              href="/select/hotel"
              className="text-teal-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all shrink-0"
            >
              전체 보기 <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelItems.map((item) => (
              <AffiliateCard key={item.id} item={item} visual />
            ))}
          </div>
        </div>
      </section>

      {/* 체험·eSIM */}
      <section className="px-6 pb-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-12">
          <div className="mb-8">
            <p className="text-white/40 text-[0.65rem] font-black tracking-[0.2em] uppercase mb-2">
              체험 · eSIM
            </p>
            <h2 className="text-white font-black text-xl md:text-2xl">현지 체험 & 데이터 연결</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {etcItems.map((item) => (
              <AffiliateCard key={item.id} item={item} visual />
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/select/activity"
              className="group flex items-center justify-between bg-white/3 border border-white/8 hover:border-white/18 rounded-xl p-4 transition-all"
            >
              <span className="text-white/60 text-sm font-bold">현지 체험 전체 보기</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
            <Link
              href="/select/esim"
              className="group flex items-center justify-between bg-white/3 border border-white/8 hover:border-white/18 rounded-xl p-4 transition-all"
            >
              <span className="text-white/60 text-sm font-bold">eSIM 전체 보기</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" strokeWidth={ICON_STROKE} />
            </Link>
          </div>
        </div>
      </section>

      {/* 강의 배너 */}
      <section className="px-6 pb-14 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-10">
          <Link
            href="/select/learn"
            className="group flex items-center justify-between bg-gradient-to-r from-indigo-950/60 to-violet-950/40 border border-indigo-500/15 hover:border-indigo-500/30 rounded-2xl p-6 transition-all"
          >
            <div>
              <p className="text-indigo-400/70 text-[0.65rem] font-black tracking-widest uppercase mb-2">
                강의 · 학습
              </p>
              <p className="text-white font-black text-lg mb-1">🎓 워케이션 중 성장하는 강의</p>
              <p className="text-white/40 text-sm">AI 자동화, 마케팅, 생산성. 인프런 파트너 강의 큐레이션.</p>
            </div>
            <ArrowRight
              className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0 ml-6"
              strokeWidth={ICON_STROKE}
            />
          </Link>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-6 pb-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto pt-8 space-y-1">
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
