'use client'

import Image from 'next/image'
import { ArrowUpRight, Heart } from 'lucide-react'
import type { AffiliateItem } from '@/lib/affiliate/types'
import type { Lang } from '@/lib/i18n/types'
import { ICON_STROKE } from '@/lib/icons'
import { useWishlist } from '@/hooks/useWishlist'
import { recordRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { trackAffiliateClick } from '@/lib/track'

const CATEGORY_LABEL: Record<AffiliateItem['category'], Record<Lang, string>> = {
  hotel: { KO: '숙소', EN: 'Stay', JP: '宿泊' },
  activity: { KO: '체험', EN: 'Experience', JP: '体験' },
  transport: { KO: '이동', EN: 'Transport', JP: '移動' },
  esim: { KO: '연결', EN: 'Connectivity', JP: '通信' },
  insurance: { KO: '보험', EN: 'Insurance', JP: '保険' },
  education: { KO: '배움', EN: 'Learning', JP: '学び' },
  visa: { KO: '비자', EN: 'Visa', JP: 'ビザ' },
}

const CATEGORY_CTA: Record<AffiliateItem['category'], Record<Lang, string>> = {
  hotel: { KO: '현재 숙소 조건 확인', EN: 'Check current stays', JP: '現在の宿泊条件を確認' },
  activity: { KO: '현재 체험 조건 확인', EN: 'Check experience details', JP: '現在の体験条件を確認' },
  transport: { KO: '현재 이동 조건 확인', EN: 'Check transport options', JP: '現在の移動条件を確認' },
  esim: { KO: '현재 eSIM 조건 확인', EN: 'Check current eSIMs', JP: '現在のeSIM条件を確認' },
  insurance: { KO: '현재 보험 조건 확인', EN: 'Check insurance terms', JP: '現在の保険条件を確認' },
  education: { KO: '현재 강의 조건 확인', EN: 'Check course details', JP: '現在の講座条件を確認' },
  visa: { KO: '현재 비자 정보 확인', EN: 'Check visa guidance', JP: '現在のビザ情報を確認' },
}

const SAVE_COPY: Record<'save' | 'remove', Record<Lang, string>> = {
  save: { KO: '여행 준비에 저장', EN: 'Save for this trip', JP: '旅の準備に保存' },
  remove: { KO: '저장한 준비에서 삭제', EN: 'Remove from saved items', JP: '保存した準備から削除' },
}

export function ExperiencePreparationCard({
  item,
  reason,
  lang,
  experienceSlug,
  destinationSlug,
  position,
  displayTitle,
  displayDestination,
}: {
  item: AffiliateItem
  reason: string
  lang: Lang
  experienceSlug: string
  destinationSlug: string
  position: number
  displayTitle?: string
  displayDestination?: string
}) {
  const { has, toggle } = useWishlist()
  const saved = has(item.id)
  const title = displayTitle ?? item.productTitle ?? item.displayTitle ?? item.name
  const destination = displayDestination ?? item.destination ?? item.name
  const href = item.deepLinks?.[destinationSlug] ?? item.href
  const coverPhoto = item.coverPhoto?.startsWith('/') ? item.coverPhoto : '/covers/trip-prep-allinone-ai.jpeg'
  const categoryLabel = CATEGORY_LABEL[item.category][lang]
  const ctaLabel = CATEGORY_CTA[item.category][lang]

  return (
    <article
      data-ui-card="product"
      data-experience-preparation-item={item.id}
      className="wak-card-product group flex h-full min-h-[27rem] min-w-0 flex-col overflow-hidden border border-[#d9e2e2] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#94bdc8] hover:shadow-[0_18px_42px_rgba(8,47,73,0.12)]"
    >
      <div className="relative aspect-[4/3] max-h-60 min-h-48 shrink-0 overflow-hidden bg-[#e9f0f2]">
        <Image
          src={coverPhoto}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
          className="object-cover saturate-[0.96] contrast-[1.04] transition duration-700 group-hover:scale-[1.025] group-hover:saturate-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#092332]/75 via-transparent to-black/10" />
        <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[0.68rem] font-black text-white backdrop-blur-sm">
          {categoryLabel}
        </span>
        <button
          type="button"
          aria-label={saved ? SAVE_COPY.remove[lang] : SAVE_COPY.save[lang]}
          aria-pressed={saved}
          onClick={() => toggle(item.id, {
            content_type: 'experience_preparation',
            content_slug: experienceSlug,
            locale: lang,
            destination: destinationSlug,
            source_section: 'experience_preparation',
          })}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Heart aria-hidden="true" className={`h-4 w-4 ${saved ? 'fill-rose-400 text-rose-400' : 'text-white'}`} strokeWidth={ICON_STROKE} />
        </button>
        <span className="absolute bottom-3 left-3 right-3 truncate text-xs font-bold text-white drop-shadow-lg">
          {destination}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-4">
        <span className="wak-card-title line-clamp-2 min-h-[2.85rem] break-words text-[#14202b]">{title}</span>
        <span className="wak-meta mt-1 block font-semibold text-[#71818d]">{item.name} · {categoryLabel}</span>
        <span className="mt-3 line-clamp-3 min-h-[3.9rem] text-[0.8125rem] leading-[1.6] text-[#516570]">{reason}</span>
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => {
            trackAffiliateClick({
              id: item.id,
              itemName: title,
              provider: item.name,
              status: item.status,
              sourceSection: 'experience_preparation',
              ctaLabel,
              ctaPosition: String(position),
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
