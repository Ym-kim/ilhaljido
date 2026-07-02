'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'

// status별 공개 화면 정책
//   active_affiliate / api_ready               → rel="sponsored", teal 배지, disclosure 대상
//   approved_needs_link                        → "링크 준비중" (승인 완료, tracking link 대기)
//   approved_needs_course_links                → "링크 준비중" (승인 완료, 강의 링크 대기)
//   needs_referral_link                        → "추천 준비중" (가입 완료, referral link 대기)
//   pending_approval                           → "승인 확인중" (심사 진행중)
//   placeholder / manual_link                  → "외부 링크" 회색 배지
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
  // 승인 완료, tracking link 수령 전
  approved_needs_link: {
    rel: 'noopener noreferrer',
    badgeText: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    isAffiliate: false,
  },
  // 승인 완료, 강의별 파트너 링크 생성 전
  approved_needs_course_links: {
    rel: 'noopener noreferrer',
    badgeText: '링크 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    isAffiliate: false,
  },
  // 가입 완료, referral link 확인 전
  needs_referral_link: {
    rel: 'noopener noreferrer',
    badgeText: '추천 준비중',
    badgeClass: 'bg-amber-500/10 text-amber-400/60 border-amber-500/15',
    isAffiliate: false,
  },
  // 가입 신청, 심사 결과 대기
  pending_approval: {
    rel: 'noopener noreferrer',
    badgeText: '승인 확인중',
    badgeClass: 'bg-white/5 text-white/30 border-white/8',
    isAffiliate: false,
  },
  // 비제휴 외부 링크 (클릭 가능, 수익 추적 없음)
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

interface AffiliateCardProps {
  item: AffiliateItem
  className?: string
}

export function AffiliateCard({ item, className = '' }: AffiliateCardProps) {
  const meta = STATUS_META[item.status] ?? STATUS_META.placeholder

  return (
    <a
      href={item.href}
      target="_blank"
      rel={meta.rel}
      className={`group relative flex flex-col bg-[#1a1a1a] rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 ${
        meta.isAffiliate
          ? 'border border-teal-500/20 hover:border-teal-500/35 hover:shadow-lg hover:shadow-teal-500/5'
          : 'border border-white/8 hover:border-white/18'
      } ${className}`}
    >
      {/* active affiliate 상단 accent */}
      {meta.isAffiliate && (
        <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-teal-500/35 to-transparent" />
      )}

      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl leading-none">{item.emoji}</span>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {item.badge && (
            <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/6 text-white/35 border border-white/8">
              {item.badge}
            </span>
          )}
          <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${meta.badgeClass}`}>
            {['pending_approval','approved_needs_link','approved_needs_course_links','needs_referral_link'].includes(item.status) && (
              <Clock className="w-2.5 h-2.5" />
            )}
            {meta.badgeText}
          </span>
        </div>
      </div>

      <p className="text-white font-bold text-sm mb-1.5">{item.name}</p>
      <p className="text-white/45 text-xs leading-relaxed mb-5 flex-1">{item.desc}</p>

      <div className={`self-start inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
        meta.isAffiliate
          ? 'border-teal-500/30 text-teal-400/80 group-hover:border-teal-500/55 group-hover:text-teal-300 group-hover:bg-teal-500/5'
          : 'border-white/10 text-white/40 group-hover:border-white/22 group-hover:text-white/60'
      }`}>
        {item.cta}
        <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  )
}
