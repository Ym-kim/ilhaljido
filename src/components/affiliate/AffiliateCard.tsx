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

  // ── visual 모드: 사진 카드 (2열 모바일 가독성 최적화) ────────────────────────
  if (visual) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel={meta.rel}
        className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#ede9e3] hover:border-[#c8c4be] transition-all duration-200 hover:-translate-y-0.5 flex flex-col ${className}`}
      >
        {/* 사진 — 모바일 h-36, sm+ h-48 */}
        <div className="relative h-36 sm:h-48 overflow-hidden bg-[#f0ede7] shrink-0">
          {hasPhoto ? (
            <img
              src={item.coverPhoto}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${item.coverGradient ?? 'from-[#e8e4de] to-[#f5f3ef]'} flex items-center justify-center`}>
              <span className="text-5xl opacity-20 select-none">{item.emoji}</span>
            </div>
          )}

          {/* 사진 하단 그라디언트 — 목적지 텍스트 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* 목적지 — 사진 하단 크고 선명하게 */}
          {item.destination && (
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <p className="text-white font-bold text-[0.78rem] sm:text-sm leading-tight drop-shadow-lg truncate">
                {item.destination}
              </p>
            </div>
          )}

          {/* 예약 가능 dot */}
          {meta.isAffiliate && (
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/95 text-emerald-700 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                예약 가능
              </span>
            </div>
          )}

          {/* 준비중 */}
          {!meta.isAffiliate && (
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white/90">
                {PENDING_STATUSES.has(item.status) && <Clock className="w-2 h-2" />}
                {meta.badgeText}
              </span>
            </div>
          )}
        </div>

        {/* 콘텐츠 — 3요소만: 제목 / 가격 / 화살표 */}
        <div className="px-3 pt-3 pb-3.5 sm:px-4 sm:pt-3.5 sm:pb-4 flex flex-col flex-1">
          {/* 상품명 — 2줄 */}
          <p className="text-[#111] font-extrabold text-[0.875rem] sm:text-base leading-snug line-clamp-2 flex-1">
            {title}
          </p>

          {/* 가격 + CTA 화살표 */}
          <div className={`mt-2.5 flex items-center justify-between ${
            meta.isAffiliate ? 'text-brand-mid' : 'text-[#9a9793]'
          }`}>
            <p className="font-black text-[0.9375rem] sm:text-base">
              {item.priceFrom ?? item.cta}
            </p>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 ${
              meta.isAffiliate
                ? 'bg-brand-mid/10 group-hover:bg-brand-mid text-brand-mid group-hover:text-white'
                : 'bg-[#f0ede8] group-hover:bg-[#e0ddd8] text-[#9a9793]'
            }`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
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
