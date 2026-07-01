'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'

// status별 공개 화면 정책
//   active_affiliate / api_ready → rel="sponsored", "외부 제휴" 배지(teal), disclosure 대상
//   placeholder / manual_link   → rel="noopener", "외부 링크" 배지(회색), disclosure 미대상
//   pending_approval             → rel="noopener", "신청 검토중" 배지, disclosure 미대상
//   coming_soon                  → AffiliateSection에서 자동 제외 (렌더 안 됨)

const STATUS_META: Record<
  string,
  { rel: string; badgeText: string; badgeClass: string; isAffiliate: boolean }
> = {
  active_affiliate: {
    rel: 'sponsored noopener noreferrer',
    badgeText: '외부 제휴',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    isAffiliate: true,
  },
  api_ready: {
    rel: 'sponsored noopener noreferrer',
    badgeText: '제휴 API',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    isAffiliate: true,
  },
  pending_approval: {
    rel: 'noopener noreferrer',
    badgeText: '신청 검토중',
    badgeClass: 'bg-amber-500/10 text-amber-400/70 border-amber-500/20',
    isAffiliate: false,
  },
  placeholder: {
    rel: 'noopener noreferrer',
    badgeText: '외부 링크',
    badgeClass: 'bg-white/5 text-white/30 border-white/8',
    isAffiliate: false,
  },
  manual_link: {
    rel: 'noopener noreferrer',
    badgeText: '외부 링크',
    badgeClass: 'bg-white/5 text-white/30 border-white/8',
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
      className={`group block bg-[#1a1a1a] border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{item.emoji}</span>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {item.badge && item.badge !== '외부 링크' && (
            <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/8 text-white/45 border border-white/10">
              {item.badge}
            </span>
          )}
          <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${meta.badgeClass}`}>
            {item.status === 'pending_approval' && <Clock className="w-2.5 h-2.5" />}
            {meta.badgeText}
          </span>
        </div>
      </div>
      <p className="text-white font-bold text-sm mb-1">{item.name}</p>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{item.desc}</p>
      <div className="flex items-center gap-1 text-white/45 text-xs font-bold group-hover:text-white/70 transition-colors">
        {item.cta} <ArrowUpRight className="w-3 h-3" />
      </div>
    </a>
  )
}
