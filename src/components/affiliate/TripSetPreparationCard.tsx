'use client'

import Image from 'next/image'
import { ArrowUpRight, Heart } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { trackAffiliateClick } from '@/lib/track'
import { useWishlist } from '@/hooks/useWishlist'
import { recordRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { formatVerificationDate, verificationLabel, type VerificationLevel } from '@/lib/verification'

const COPY = {
  revisit: { KO: '조건 다시 확인', EN: 'Check terms again', JP: '条件を再確認' },
  first: { KO: '먼저 확인', EN: 'Start here', JP: 'まず確認' },
  next: { KO: '다음으로 확인', EN: 'Check next', JP: '次に確認' },
  viewed: { KO: '살펴봄', EN: 'Viewed', JP: '閲覧済み' },
  step: { KO: '준비', EN: 'STEP', JP: '準備' },
  save: { KO: '여행 준비에 저장', EN: 'Save for this trip', JP: '旅の準備に保存' },
  remove: { KO: '저장한 준비에서 삭제', EN: 'Remove from saved items', JP: '保存した準備から削除' },
} satisfies Record<string, Record<Lang, string>>

const CATEGORY_CTA = {
  hotel: { KO: '숙소 조건 확인', EN: 'Check stay options', JP: '宿泊条件を確認' },
  activity: { KO: '체험 조건 확인', EN: 'Check activity details', JP: '体験条件を確認' },
  transport: { KO: '이동 조건 확인', EN: 'Check transport options', JP: '移動条件を確認' },
  esim: { KO: 'eSIM 조건 확인', EN: 'Check eSIM options', JP: 'eSIM条件を確認' },
  insurance: { KO: '보험 조건 확인', EN: 'Check insurance terms', JP: '保険条件を確認' },
  education: { KO: '강의 조건 확인', EN: 'Check course details', JP: '講座条件を確認' },
  visa: { KO: '비자 정보 확인', EN: 'Check visa guidance', JP: 'ビザ情報を確認' },
} satisfies Record<AffiliateItem['category'], Record<Lang, string>>

const DESTINATION_EDITORIAL_FALLBACK: Record<string, string> = {
  fukuoka: '/covers/stay-fukuoka-city-real.jpeg',
  osaka: '/covers/stay-osaka-city-real.jpeg',
  seoul: '/covers/stay-fraser-seoul-ai.jpeg',
  busan: '/covers/stay-uh-busan-ai.jpeg',
}

const ITEM_EDITORIAL_FALLBACK: Record<string, string> = {
  'theme-sports-seoul-baseball': '/covers/activity-seoul-baseball-editorial-v2.webp',
  'esim-airalo': '/covers/esim-asia-photo-v2.webp',
  'feat-transfer-klook': '/covers/airport-transfer-editorial-photo-v2.webp',
}

export function TripSetPreparationCard({
  item,
  reason,
  verificationLevel,
  verifiedAt,
  categoryLabel,
  lang,
  tripSetSlug,
  destinationSlug,
  position,
  isNext,
  isViewed,
  hasViewedAny,
  onPrepareClick,
}: {
  item: AffiliateItem
  reason: string
  verificationLevel: VerificationLevel
  verifiedAt: string
  categoryLabel: string
  lang: Lang
  tripSetSlug: string
  destinationSlug: string
  position: number
  isNext: boolean
  isViewed: boolean
  hasViewedAny: boolean
  onPrepareClick: (itemId: string) => void
}) {
  const { has, toggle } = useWishlist()
  const saved = has(item.id)
  const title = item.productTitle ?? item.displayTitle ?? item.name
  const coverPhoto = item.coverPhoto?.startsWith('/')
    ? item.coverPhoto
    : ITEM_EDITORIAL_FALLBACK[item.id]
      ?? DESTINATION_EDITORIAL_FALLBACK[destinationSlug]
      ?? '/covers/trip-prep-allinone-ai.jpeg'
  const ctaLabel = isViewed ? COPY.revisit[lang] : CATEGORY_CTA[item.category][lang]

  return (
    <article
      data-ui-card="product"
      data-trip-conversion-item={item.id}
      data-preparation-step={position}
      data-preparation-state={isViewed ? 'viewed' : isNext ? 'next' : 'upcoming'}
      className={`wak-card-product group flex h-full min-h-[26rem] min-w-0 flex-col overflow-hidden border bg-white transition duration-300 hover:-translate-y-1 hover:border-[#9fc4cf] hover:shadow-[0_18px_42px_rgba(8,47,73,0.12)] ${isNext ? 'border-[#76afc2] shadow-[0_14px_34px_rgba(8,86,115,0.12)] ring-1 ring-[#b7d8e2]' : 'border-[#dfe6e9]'}`}
    >
      <div className="relative aspect-[4/3] max-h-60 min-h-48 shrink-0 overflow-hidden bg-[#e9f0f2]">
        <Image
          src={coverPhoto}
          alt={title}
          fill
          loading={item.id === 'feat-transfer-klook' ? 'eager' : 'lazy'}
          unoptimized={item.id === 'feat-transfer-klook'}
          sizes="(max-width: 519px) 100vw, (max-width: 1024px) 50vw, 384px"
          className="object-cover saturate-[0.9] contrast-[1.03] transition duration-700 group-hover:scale-[1.025] group-hover:saturate-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[0.65rem] font-bold text-white backdrop-blur-sm">
            {COPY.step[lang]} {position} · {categoryLabel}
          </span>
          {(isNext || isViewed) && (
            <span className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-bold backdrop-blur-sm ${isViewed ? 'border-white/25 bg-white/90 text-[#36515d]' : 'border-sky-200/70 bg-[#e6f7fc]/95 text-[#075d7c]'}`}>
              {isViewed ? COPY.viewed[lang] : hasViewedAny ? COPY.next[lang] : COPY.first[lang]}
            </span>
          )}
        </div>
        {item.destination && (
          <span className="absolute bottom-3 left-3 right-14 truncate text-xs font-bold text-white drop-shadow-lg">
            {item.destination}
          </span>
        )}
        <button
          type="button"
          aria-label={saved ? COPY.remove[lang] : COPY.save[lang]}
          aria-pressed={saved}
          onClick={() => toggle(item.id)}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Heart
            aria-hidden="true"
            className={`h-4 w-4 transition ${saved ? 'fill-rose-400 text-rose-400' : 'text-white'}`}
            strokeWidth={ICON_STROKE}
          />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">
        <span className="wak-card-title line-clamp-2 min-h-[2.85rem] break-words text-[#14202b]">{title}</span>
        <span className="wak-meta mt-1 block font-semibold text-[#71818d]">
          {item.name}{item.badge ? ` · ${item.badge}` : ''}
        </span>
        <span className="mt-3 line-clamp-3 min-h-[3.9rem] text-[0.8125rem] leading-[1.6] text-[#516570]">{reason}</span>
        <span className="mt-3 text-[0.68rem] font-semibold text-[#829098]">
          {verificationLabel(verificationLevel, lang)} · <time dateTime={verifiedAt}>{formatVerificationDate(verifiedAt)}</time>
        </span>
        <a
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => {
            onPrepareClick(item.id)
            trackAffiliateClick({
              id: item.id,
              itemName: title,
              provider: item.name,
              status: item.status,
              sourceSection: 'trip_set_preparation',
              ctaLabel,
              ctaPosition: String(position),
              tripSetSlug,
              destination: destinationSlug,
              category: item.category,
              locale: lang,
              position: String(position),
            })
            recordRecentlyViewed(item.id)
          }}
          className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border-t border-[#e5ebed] pt-4 text-sm font-black text-[#036b95] transition hover:text-[#034f70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={ICON_STROKE} />
        </a>
      </div>
    </article>
  )
}
