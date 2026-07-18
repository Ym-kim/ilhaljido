'use client'

import Image from 'next/image'
import { ArrowUpRight, Clock, Heart } from 'lucide-react'
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
const BADGE_TEXT: Record<Lang, Record<BadgeKey | 'editorial', string>> = {
  KO: { affiliate: '제휴', api: '제휴 API', link_prep: '링크 준비중', ref_prep: '추천 준비중', review: '승인 확인중', external: '외부 링크', editorial: '여행 이미지' },
  EN: { affiliate: 'Partner', api: 'Partner API', link_prep: 'Link coming', ref_prep: 'Coming soon', review: 'In review', external: 'External link', editorial: 'Travel image' },
  JP: { affiliate: '提携', api: '提携API', link_prep: 'リンク準備中', ref_prep: '準備中', review: '承認確認中', external: '外部リンク', editorial: '旅のイメージ' },
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
  const { lang } = useLang()
  const { has, toggle } = useWishlist()
  const saved = has(item.id)
  const badgeText = BADGE_TEXT[lang] ?? BADGE_TEXT.KO
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
        onClick={() => {
          trackAffiliateClick({ id: item.id, provider: item.name, status: item.status })
          recordRecentlyViewed(item.id)
        }}
        className={`group flex flex-col overflow-hidden rounded-[1.35rem] border border-[#dfe6e9] bg-white shadow-[0_10px_35px_rgba(8,47,73,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a9cbd9] hover:shadow-[0_20px_55px_rgba(8,47,73,0.13)] ${className}`}
      >
        <div className="relative h-52 shrink-0 overflow-hidden bg-[#e9f0f2] sm:h-48">
          {hasPhoto ? (
            <Image
              src={item.coverPhoto!}
              alt=""
              fill
              sizes="(max-width: 519px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover saturate-[0.9] contrast-[1.04] transition-all duration-700 group-hover:scale-[1.035] group-hover:saturate-100"
            />
          ) : (
            <div className={`relative flex h-full w-full items-end bg-gradient-to-br ${item.coverGradient ?? 'from-[#12344a] via-[#0b2639] to-[#061925]'} p-4`}>
              <div className="absolute inset-x-4 top-4 h-px bg-white/25" />
              <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-white/10" />
              <span className="relative text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/65">Wakation Select</span>
            </div>
          )}

          {/* 사진 하단 그라디언트 — 목적지 텍스트 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* 호버 광택(sheen) — 프리미엄 마이크로 인터랙션 */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/[0.07] to-white/20" />

          {/* 목적지 — 사진 하단 크고 선명하게 */}
          {item.destination && (
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <span className="block truncate text-[0.78rem] font-bold leading-tight text-white drop-shadow-lg sm:text-sm">
                {item.destination}
              </span>
            </div>
          )}

          {/* 실제 평점 — 좌상단 픽토그램 옆 (리서치 확인 값만) */}
          {item.rating && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[0.65rem] font-black text-[#111827] shadow-sm">
                <span className="text-amber-500">★</span>
                {item.rating}
                {item.reviews && <span className="font-medium text-[#94a3b8]">({item.reviews})</span>}
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
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${saved ? 'text-rose-400 fill-rose-400' : 'text-white'}`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {/* ⚠️ visual 카드는 다크 페이지(.dark-surface)에도 놓임 — `.dark-surface p`가
              p 색을 흰색으로 덮어써 흰 카드에서 안 보이는 버그가 있어 p 대신 span 사용 */}
          <div className="flex-1">
            {/* 상품명 */}
            <span className="block line-clamp-2 text-base font-extrabold leading-snug tracking-[-0.015em] text-[#14202b]">
              {title}
            </span>
            {/* 판매처 · 유형 — 무슨 상품인지 한눈에 (2026-07-15 MD 피드백) */}
            <span className="mt-1 block text-[0.68rem] font-semibold text-[#8493a0]">
              {item.name}{item.badge ? ` · ${item.badge}` : ''}{hasPhoto ? ` · ${badgeText.editorial}` : ''}
            </span>
            {/* 상품 설명 — 폰에서도 상품 정체가 보이게 항상 노출 (2026-07-16 모바일 패스) */}
            {item.desc && (
              <span className="mt-2 block line-clamp-2 text-[0.78rem] leading-relaxed text-[#5e6e7a]">
                {item.desc}
              </span>
            )}
          </div>

          {/* 가격 + CTA */}
          <div className="mt-4 flex items-center justify-between border-t border-[#edf1f2] pt-3.5">
            <span className={`text-[0.92rem] font-extrabold ${
              meta.isAffiliate ? 'text-[#0369a1]' : 'text-[#8a969e]'
            }`}>
              {item.priceFrom ?? item.cta}
            </span>
            <span className={meta.isAffiliate ? 'text-[#0369a1]' : 'text-[#8a969e]'}>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] bg-[#17212a] transition-all duration-300 hover:-translate-y-1 ${
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
            <div className="absolute inset-0">
              <div className="absolute inset-x-5 top-5 h-px bg-white/20" />
              <div className="absolute right-6 top-7 h-24 w-24 rounded-full border border-white/10" />
              <span className="absolute bottom-5 left-5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/45">Wakation Select</span>
            </div>
          )}
          {meta.isAffiliate && (
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1c1b1a] to-transparent" />
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
        <div className="mb-3 flex items-start justify-end">
          <div className="flex flex-wrap items-center justify-end gap-1.5">
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
