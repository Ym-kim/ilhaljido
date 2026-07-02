'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'

// status별 공개 화면 정책
//   active_affiliate / api_ready               → rel="sponsored", teal 배지
//   approved_needs_link / approved_needs_course_links → "링크 준비중" amber
//   needs_referral_link                        → "추천 준비중" amber
//   pending_approval                           → "승인 확인중" gray
//   placeholder / manual_link / public_external_link → "외부 링크" gray
//   coming_soon                                → AffiliateSection에서 자동 제외

const STATUS_META: Record<
  string,
  { rel: string; badgeText: string; badgeClass: string; isAffiliate: boolean }
> = {
  active_affiliate: {
    rel: 'sponsored noopener noreferrer',
    badgeText: '제휴',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    isAffiliate: true,
  },
  api_ready: {
    rel: 'sponsored noopener noreferrer',
    badgeText: '제휴 API',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    isAffiliate: true,
  },
  approved_needs_link: {
    rel: 'noopener noreferrer',
    badgeText: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/70 border-amber-500/20',
    isAffiliate: false,
  },
  approved_needs_course_links: {
    rel: 'noopener noreferrer',
    badgeText: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/70 border-amber-500/20',
    isAffiliate: false,
  },
  needs_referral_link: {
    rel: 'noopener noreferrer',
    badgeText: '추천 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/70 border-amber-500/20',
    isAffiliate: false,
  },
  pending_approval: {
    rel: 'noopener noreferrer',
    badgeText: '승인 확인중',
    badgeClass: 'bg-white/5 text-white/30 border-white/8',
    isAffiliate: false,
  },
  public_external_link: {
    rel: 'noopener noreferrer',
    badgeText: '외부 링크',
    badgeClass: 'bg-white/5 text-white/30 border-white/8',
    isAffiliate: false,
  },
  placeholder: {
    rel: 'noopener noreferrer',
    badgeText: '외부 링크',
    badgeClass: 'bg-white/5 text-white/25 border-white/8',
    isAffiliate: false,
  },
  manual_link: {
    rel: 'noopener noreferrer',
    badgeText: '외부 링크',
    badgeClass: 'bg-white/5 text-white/25 border-white/8',
    isAffiliate: false,
  },
}

const PENDING_STATUSES = new Set([
  'pending_approval',
  'approved_needs_link',
  'approved_needs_course_links',
  'needs_referral_link',
])

interface AffiliateCardProps {
  item: AffiliateItem
  className?: string
  /** visual=true: 상품관 스타일 (그라디언트 헤더 + 목적지 레이블 포함) */
  visual?: boolean
}

export function AffiliateCard({ item, className = '', visual = false }: AffiliateCardProps) {
  const meta = STATUS_META[item.status] ?? STATUS_META.placeholder
  const title = item.productTitle ?? item.displayTitle ?? item.name
  const showCover = visual && (item.coverGradient || item.destination)

  return (
    <a
      href={item.href}
      target="_blank"
      rel={meta.rel}
      className={`group relative flex flex-col bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        meta.isAffiliate
          ? 'border border-teal-500/20 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/6'
          : 'border border-white/8 hover:border-white/20'
      } ${className}`}
    >
      {/* ── 비주얼 헤더 (visual 모드) ── */}
      {showCover && (
        <div
          className={`relative h-24 flex items-end pb-3 px-4 overflow-hidden bg-gradient-to-br ${
            item.coverGradient ?? 'from-white/8 to-white/3'
          }`}
        >
          {meta.isAffiliate && (
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
          )}
          {/* 배경 대형 이모지 */}
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none pointer-events-none"
            aria-hidden
          >
            {item.emoji}
          </span>
          {/* 목적지 레이블 */}
          {item.destination && (
            <span className="relative z-10 text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-black/45 text-white/80 border border-white/12 backdrop-blur-sm">
              {item.destination}
            </span>
          )}
        </div>
      )}

      {/* ── 콘텐츠 영역 ── */}
      <div className={`flex flex-col flex-1 p-5 ${!showCover && meta.isAffiliate ? 'pt-6' : ''}`}>
        {/* 상단 accent 라인 (비주얼 헤더 없을 때) */}
        {!showCover && meta.isAffiliate && (
          <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-teal-500/35 to-transparent" />
        )}

        {/* 헤더 행 */}
        <div className="flex items-start justify-between mb-3">
          {!showCover && <span className="text-3xl leading-none">{item.emoji}</span>}
          <div className={`flex items-center gap-1.5 flex-wrap justify-end ${!showCover ? 'ml-auto' : ''}`}>
            {item.badge && (
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/6 text-white/35 border border-white/8">
                {item.badge}
              </span>
            )}
            <span
              className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${meta.badgeClass}`}
            >
              {PENDING_STATUSES.has(item.status) && <Clock className="w-2.5 h-2.5" />}
              {meta.badgeText}
            </span>
          </div>
        </div>

        {/* 타이틀 */}
        <p className="text-white font-black text-sm leading-snug mb-1.5">{title}</p>

        {/* via 서비스명 (visual 모드에서 productTitle이 name과 다를 때) */}
        {visual && item.productTitle && item.productTitle !== item.name && (
          <p className="text-white/30 text-[0.65rem] font-semibold -mt-0.5 mb-1.5">
            via {item.name}
          </p>
        )}

        <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>

        {/* CTA 버튼 */}
        <div
          className={`self-start inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border transition-all duration-200 ${
            meta.isAffiliate
              ? 'border-teal-500/30 text-teal-400/80 bg-teal-500/6 group-hover:border-teal-500/55 group-hover:text-teal-300 group-hover:bg-teal-500/12'
              : 'border-white/10 text-white/40 group-hover:border-white/22 group-hover:text-white/60'
          }`}
        >
          {item.cta}
          <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  )
}
