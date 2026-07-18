'use client'

import Image from 'next/image'
import { ArrowUpRight, Clock, BedDouble, Compass, Wifi, BookOpen, Heart } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n'
import { useLang } from '@/context/LanguageContext'
import { trackAffiliateClick } from '@/lib/track'
import { useWishlist } from '@/hooks/useWishlist'
import { recordRecentlyViewed } from '@/hooks/useRecentlyViewed'

type BadgeKey = 'affiliate' | 'api' | 'link_prep' | 'ref_prep' | 'review' | 'external'

const STATUS_META: Record<
  string,
  { rel: string; badgeKey: BadgeKey; isAffiliate: boolean }
> = {
  active_affiliate:            { rel: 'sponsored noopener noreferrer', badgeKey: 'affiliate', isAffiliate: true  },
  api_ready:                   { rel: 'sponsored noopener noreferrer', badgeKey: 'api',       isAffiliate: true  },
  approved_needs_link:         { rel: 'noopener noreferrer',           badgeKey: 'link_prep', isAffiliate: false },
  approved_needs_course_links: { rel: 'noopener noreferrer',           badgeKey: 'link_prep', isAffiliate: false },
  needs_referral_link:         { rel: 'noopener noreferrer',           badgeKey: 'ref_prep',  isAffiliate: false },
  pending_approval:            { rel: 'noopener noreferrer',           badgeKey: 'review',    isAffiliate: false },
  public_external_link:        { rel: 'noopener noreferrer',           badgeKey: 'external',  isAffiliate: false },
  placeholder:                 { rel: 'noopener noreferrer',           badgeKey: 'external',  isAffiliate: false },
  manual_link:                 { rel: 'noopener noreferrer',           badgeKey: 'external',  isAffiliate: false },
}

// 배지 문구 — 3개 언어
const BADGE_TEXT: Record<Lang, Record<BadgeKey | 'available', string>> = {
  KO: { affiliate: '제휴', api: '제휴 API', link_prep: '링크 준비중', ref_prep: '추천 준비중', review: '승인 확인중', external: '외부 링크', available: '제휴사 예약' },
  EN: { affiliate: 'Partner', api: 'Partner API', link_prep: 'Link coming', ref_prep: 'Coming soon', review: 'In review', external: 'External link', available: 'Book via partner' },
  JP: { affiliate: '提携', api: '提携API', link_prep: 'リンク準備中', ref_prep: '準備中', review: '承認確認中', external: '外部リンク', available: '提携先で予約' },
}

const PENDING_STATUSES = new Set([
  'pending_approval',
  'approved_needs_link',
  'approved_needs_course_links',
  'needs_referral_link',
])

const PRODUCT_TYPE_ICONS = {
  stay:      BedDouble,
  activity:  Compass,
  esim:      Wifi,
  education: BookOpen,
} as const

interface AffiliateCardProps {
  item: AffiliateItem
  className?: string
  /** visual=true: B2C 사진 카드 (OTA 스타일, 밝은 배경 전용) */
  visual?: boolean
}

export function AffiliateCard({ item, className = '', visual = false }: AffiliateCardProps) {
  const { lang } = useLang()
  const { has, toggle } = useWishlist()
  const saved = has(item.id)
  const badgeText = BADGE_TEXT[lang] ?? BADGE_TEXT.KO
  const meta = STATUS_META[item.status] ?? STATUS_META.placeholder
  const title = item.productTitle ?? item.displayTitle ?? item.name
  const hasPhoto = visual && !!item.coverPhoto
  const ProductIcon = item.productType && item.productType in PRODUCT_TYPE_ICONS
    ? PRODUCT_TYPE_ICONS[item.productType as keyof typeof PRODUCT_TYPE_ICONS]
    : null

  // ── visual 모드: 사진 카드 (2열 모바일 가독성 최적화) ────────────────────────
  if (visual) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel={meta.rel}
        onClick={() => {
          trackAffiliateClick({ id: item.id, provider: item.name, status: item.status })
          recordRecentlyViewed(item.id)
        }}
        className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#dbeafe] hover:border-[#93c5fd] transition-all duration-200 hover:-translate-y-0.5 flex flex-col ${className}`}
      >
        {/* 사진 — 모바일 h-36, sm+ h-48 */}
        <div className="relative h-36 sm:h-48 overflow-hidden bg-[#eff6ff] shrink-0">
          {hasPhoto ? (
            <Image
              src={item.coverPhoto!}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 384px"
              className="object-cover saturate-[0.94] contrast-[1.03] group-hover:scale-105 group-hover:saturate-100 transition-all duration-700"
            />
          ) : (
            /* 사진 없는 카드 — 흐릿한 이모지 대신 의도된 커버 디자인 (도트 패턴 + 큰 아이콘) */
            <div className={`relative w-full h-full bg-gradient-to-br ${item.coverGradient ?? 'from-[#0a1e33] to-[#04121f]'} flex items-center justify-center`}>
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1.2px, transparent 0)', backgroundSize: '16px 16px' }}
              />
              <span className="relative text-6xl drop-shadow-xl select-none">{item.emoji}</span>
            </div>
          )}

          {/* 사진 하단 그라디언트 — 목적지 텍스트 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* 호버 광택(sheen) — 프리미엄 마이크로 인터랙션 */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/[0.07] to-white/20" />

          {/* 목적지 — 사진 하단 크고 선명하게 */}
          {item.destination && (
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <p className="text-white font-bold text-[0.78rem] sm:text-sm leading-tight drop-shadow-lg truncate">
                {item.destination}
              </p>
            </div>
          )}

          {/* 상품 타입 픽토그램 — 좌상단 */}
          {ProductIcon && (
            <div className="absolute top-2.5 left-2.5">
              <span className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <ProductIcon className="w-3.5 h-3.5 text-white" />
              </span>
            </div>
          )}

          {/* 실제 평점 — 좌상단 픽토그램 옆 (리서치 확인 값만) */}
          {item.rating && (
            <div className={`absolute top-2.5 ${ProductIcon ? 'left-11' : 'left-2.5'}`}>
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-black px-2 py-1 rounded-full bg-white/95 text-[#111827] shadow-sm">
                <span className="text-amber-500">★</span>
                {item.rating}
                {/* 리뷰수는 좁은 2열 모바일에서 우측 배지와 겹치므로 sm+에서만 노출 */}
                {item.reviews && <span className="hidden sm:inline font-medium text-[#94a3b8]">({item.reviews})</span>}
              </span>
            </div>
          )}

          {/* 예약 가능 — 모바일은 점만(좌상단 평점과 겹침 방지), sm+는 텍스트 포함 */}
          {meta.isAffiliate && (
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-white/95 text-emerald-700 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                <span className="hidden sm:inline">{badgeText.available}</span>
              </span>
            </div>
          )}

          {/* 준비중 */}
          {!meta.isAffiliate && (
            <div className="absolute top-2.5 right-2.5">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white/90">
                {PENDING_STATUSES.has(item.status) && <Clock className="w-2 h-2" />}
                {badgeText[meta.badgeKey]}
              </span>
            </div>
          )}

          {/* 위시리스트 ♥ — 재방문 시 재클릭 동선 (localStorage, 비용 0) */}
          <button
            type="button"
            aria-label={saved ? 'remove from wishlist' : 'add to wishlist'}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggle(item.id)
            }}
            className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center hover:bg-black/65 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${saved ? 'text-rose-400 fill-rose-400' : 'text-white'}`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="px-3.5 pt-3 pb-4 sm:px-4 sm:pt-3.5 sm:pb-4 flex flex-col flex-1">
          {/* ⚠️ visual 카드는 다크 페이지(.dark-surface)에도 놓임 — `.dark-surface p`가
              p 색을 흰색으로 덮어써 흰 카드에서 안 보이는 버그가 있어 p 대신 span 사용 */}
          <div className="flex-1">
            {/* 상품명 */}
            <span className="block text-[#111827] font-bold text-sm sm:text-[0.9375rem] leading-snug line-clamp-2">
              {title}
            </span>
            {/* 판매처 · 유형 — 무슨 상품인지 한눈에 (2026-07-15 MD 피드백) */}
            <span className="block text-[#94a3b8] text-[0.65rem] font-semibold mt-0.5">
              {item.name}{item.badge ? ` · ${item.badge}` : ''}
            </span>
            {/* 상품 설명 — 폰에서도 상품 정체가 보이게 항상 노출 (2026-07-16 모바일 패스) */}
            {item.desc && (
              <span className="block text-[#64748b] text-[0.7rem] leading-relaxed line-clamp-2 mt-1.5">
                {item.desc}
              </span>
            )}
          </div>

          {/* 가격 + CTA */}
          <div className="mt-3 flex items-center justify-between">
            <span className={`font-bold text-[0.9375rem] sm:text-base ${
              meta.isAffiliate ? 'text-brand-mid' : 'text-[#9a9793]'
            }`}>
              {item.priceFrom ?? item.cta}
            </span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 ${
              meta.isAffiliate
                ? 'bg-brand-mid/10 group-hover:bg-brand-mid text-brand-mid group-hover:text-white'
                : 'bg-[#eff6ff] group-hover:bg-[#dbeafe] text-[#9a9793]'
            }`}>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    )
  }

  // ── 기본 모드: 다크 카드 (어두운 배경 페이지용) ─────────────────────────────
  const showCover = !!(item.coverPhoto || item.coverGradient || item.destination)
  return (
    <a
      href={item.href}
      target="_blank"
      rel={meta.rel}
      onClick={() => {
        trackAffiliateClick({ id: item.id, provider: item.name, status: item.status })
        recordRecentlyViewed(item.id)
      }}
      className={`group relative flex flex-col bg-[#1c1b1a] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        meta.isAffiliate
          ? 'border border-emerald-500/18 hover:border-emerald-500/38 hover:shadow-lg'
          : 'border border-white/8 hover:border-white/20 hover:shadow-md'
      } ${className}`}
    >
      {showCover && (
        <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${item.coverGradient ?? 'from-white/8 to-white/3'}`}>
          {item.coverPhoto ? (
            <Image
              src={item.coverPhoto}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
            />
          ) : (
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[5.5rem] opacity-[0.16] select-none pointer-events-none leading-none" aria-hidden>
              {item.emoji}
            </span>
          )}
          {meta.isAffiliate && (
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1c1b1a] to-transparent" />
          {meta.isAffiliate && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-1 rounded-full bg-black/50 text-white/90 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                {badgeText.available}
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
              {badgeText[meta.badgeKey]}
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
