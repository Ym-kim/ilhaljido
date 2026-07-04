'use client'

import { ArrowUpRight, Clock } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'

const STATUS_META: Record<
  string,
  { rel: string; badgeText: string; isAffiliate: boolean }
> = {
  active_affiliate:            { rel: 'sponsored noopener noreferrer', badgeText: '제휴',      isAffiliate: true  },
  api_ready:                   { rel: 'sponsored noopener noreferrer', badgeText: '제휴 API',  isAffiliate: true  },
  approved_needs_link:         { rel: 'noopener noreferrer',           badgeText: '링크 준비중', isAffiliate: false },
  approved_needs_course_links: { rel: 'noopener noreferrer',           badgeText: '링크 준비중', isAffiliate: false },
  needs_referral_link:         { rel: 'noopener noreferrer',           badgeText: '추천 준비중', isAffiliate: false },
  pending_approval:            { rel: 'noopener noreferrer',           badgeText: '승인 확인중', isAffiliate: false },
  public_external_link:        { rel: 'noopener noreferrer',           badgeText: '외부 링크',  isAffiliate: false },
  placeholder:                 { rel: 'noopener noreferrer',           badgeText: '외부 링크',  isAffiliate: false },
  manual_link:                 { rel: 'noopener noreferrer',           badgeText: '외부 링크',  isAffiliate: false },
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
  /** visual=true: B2C 사진 카드 (OTA 스타일, 밝은 배경 전용) */
  visual?: boolean
}

export function AffiliateCard({ item, className = '', visual = false }: AffiliateCardProps) {
  const meta = STATUS_META[item.status] ?? STATUS_META.placeholder
  const title = item.productTitle ?? item.displayTitle ?? item.name
  const hasPhoto = visual && !!item.coverPhoto

  // ── visual 모드: 밝은 사진 카드 (2열 그리드 최적화) ──────────────────────────
  if (visual) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel={meta.rel}
        className={`group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#e8e4de] hover:border-[#c8c4be] hover:shadow-lg sm:hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 sm:hover:-translate-y-1 flex flex-col ${className}`}
      >
        {/* 사진 헤더 — 모바일 h-32, sm+ h-44 */}
        <div className="relative h-32 sm:h-44 overflow-hidden bg-[#f0ede7] shrink-0">
          {hasPhoto ? (
            <img
              src={item.coverPhoto}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${item.coverGradient ?? 'from-[#e8e4de] to-[#f5f3ef]'} flex items-center justify-center`}>
              <span className="text-5xl opacity-25 select-none">{item.emoji}</span>
            </div>
          )}

          {hasPhoto && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          )}

          {/* 예약 가능 배지 */}
          {meta.isAffiliate && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 text-[0.55rem] font-bold px-2 py-0.5 rounded-full bg-white/95 text-emerald-700 border border-emerald-200/60 shadow-sm">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse inline-block" />
                예약 가능
              </span>
            </div>
          )}

          {/* 준비중 배지 */}
          {!meta.isAffiliate && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center gap-1 text-[0.55rem] font-bold px-2 py-0.5 rounded-full bg-black/55 text-white/90">
                {PENDING_STATUSES.has(item.status) && <Clock className="w-2 h-2" />}
                {meta.badgeText}
              </span>
            </div>
          )}

          {/* 목적지 (사진 하단) */}
          {hasPhoto && item.destination && (
            <div className="absolute bottom-2 left-3">
              <p className="text-white/92 text-[0.62rem] font-semibold drop-shadow-sm leading-tight">
                {item.destination}
              </p>
            </div>
          )}
        </div>

        {/* 콘텐츠 — 컴팩트 */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">
          {/* 목적지 (사진 없을 때) */}
          {!hasPhoto && item.destination && (
            <p className="text-[#8a8784] text-[0.62rem] font-semibold mb-0.5">{item.destination}</p>
          )}

          {/* 상품명 */}
          <p className="text-[#141414] font-black text-sm sm:text-[0.9375rem] leading-snug mb-1">
            {title}
          </p>

          {/* via + 가격 */}
          <div className="flex items-center justify-between mt-0.5 mb-0">
            <p className="text-[#c0bdb8] text-[0.6rem]">via {item.name}</p>
            {item.priceFrom && (
              <p className="text-brand-mid font-black text-xs sm:text-sm">{item.priceFrom}</p>
            )}
          </div>

          {/* CTA — 모바일에서 심플하게 */}
          <div className={`mt-auto pt-2.5 sm:pt-3 border-t border-[#f0ede8] flex items-center gap-0.5 text-xs sm:text-[0.8125rem] font-bold transition-colors duration-150 ${
            meta.isAffiliate
              ? 'text-brand-mid group-hover:text-brand'
              : 'text-[#a8a5a0] group-hover:text-[#6b6b6b]'
          }`}>
            <span className="truncate">{item.cta}</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          </div>
        </div>
      </a>
    )
  }

  // ── 기본 모드: 다크 카드 (어두운 배경 페이지용) ─────────────────────────────
  const showCover = !!(item.coverGradient || item.destination)
  return (
    <a
      href={item.href}
      target="_blank"
      rel={meta.rel}
      className={`group relative flex flex-col bg-[#1c1b1a] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        meta.isAffiliate
          ? 'border border-emerald-500/18 hover:border-emerald-500/38 hover:shadow-lg'
          : 'border border-white/8 hover:border-white/20 hover:shadow-md'
      } ${className}`}
    >
      {showCover && (
        <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${item.coverGradient ?? 'from-white/8 to-white/3'}`}>
          {meta.isAffiliate && (
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
          )}
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[5.5rem] opacity-[0.16] select-none pointer-events-none leading-none" aria-hidden>
            {item.emoji}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1c1b1a] to-transparent" />
          {meta.isAffiliate && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-1 rounded-full bg-black/50 text-white/90 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                예약 가능
              </span>
            </div>
          )}
          {item.destination && (
            <div className="absolute bottom-3.5 left-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/65 text-white/85 border border-white/12">
                {item.destination}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-col flex-1 p-5 ${!showCover && meta.isAffiliate ? 'pt-6' : ''}`}>
        {!showCover && meta.isAffiliate && (
          <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        )}
        <div className="flex items-start justify-between mb-3">
          {!showCover && <span className="text-3xl leading-none">{item.emoji}</span>}
          <div className={`flex items-center gap-1.5 flex-wrap justify-end ${!showCover ? 'ml-auto' : ''}`}>
            {item.badge && (
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/6 text-white/32 border border-white/10">
                {item.badge}
              </span>
            )}
            <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
              meta.isAffiliate
                ? 'bg-emerald-500/18 text-emerald-300 border-emerald-500/28'
                : PENDING_STATUSES.has(item.status)
                ? 'bg-amber-500/10 text-amber-300/75 border-amber-500/18'
                : 'bg-white/6 text-white/32 border-white/10'
            }`}>
              {PENDING_STATUSES.has(item.status) && <Clock className="w-2.5 h-2.5" />}
              {meta.badgeText}
            </span>
          </div>
        </div>
        <p className="text-white/92 font-bold text-[0.9375rem] leading-snug mb-1.5">{title}</p>
        {item.productTitle && item.productTitle !== item.name && (
          <p className="text-white/28 text-[0.65rem] font-medium -mt-0.5 mb-1.5">via {item.name}</p>
        )}
        <p className="text-white/38 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>
        <div className={`self-start inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-150 ${
          meta.isAffiliate
            ? 'border-emerald-500/25 text-emerald-400/85 group-hover:border-emerald-500/50 group-hover:text-emerald-300'
            : 'border-white/10 text-white/38 group-hover:border-white/20 group-hover:text-white/55'
        }`}>
          {item.cta}
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  )
}
