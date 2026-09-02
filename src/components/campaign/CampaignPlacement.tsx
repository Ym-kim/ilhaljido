'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import { localizeHref } from '@/lib/i18n/localePath'
import { trackAffiliateClick, trackEvent } from '@/lib/track'

type LocalizedText = Record<Lang, string>

export type CampaignPlacementItem = {
  id: string
  eyebrow: LocalizedText
  title: LocalizedText
  description: LocalizedText
  cta: LocalizedText
  href: string
  external?: boolean
  sponsored?: boolean
  provider?: string
  category?: string
  destination?: string
  tone?: 'ocean' | 'sand' | 'coral' | 'ink'
}

type CampaignPlacementProps = {
  items: CampaignPlacementItem[]
  lang: Lang
  sectionId: string
  variant: 'announcement' | 'featured' | 'context'
}

const TONE = {
  ocean: 'border-[#b8d9e5] bg-[#edf8fb] text-[#075c78]',
  sand: 'border-[#ddd4c5] bg-[#f7f3eb] text-[#735830]',
  coral: 'border-[#e8c9bd] bg-[#fcf2ed] text-[#9a4f37]',
  ink: 'border-[#bfcbd0] bg-[#edf2f4] text-[#173d4b]',
} as const

export function CampaignPlacement({ items, lang, sectionId, variant }: CampaignPlacementProps) {
  const shown = items.slice(0, variant === 'announcement' ? 1 : variant === 'featured' ? 4 : 2)

  return (
    <div
      data-campaign-placement={variant}
      className={variant === 'featured' ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4' : 'grid gap-3 sm:grid-cols-2'}
    >
      {shown.map((item, index) => {
        const className = `group flex min-h-44 flex-col justify-between rounded-[1.35rem] border p-5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1687ad] ${TONE[item.tone ?? 'ocean']}`
        const content = (
          <>
            <span>
              <span className="block text-[0.64rem] font-black uppercase tracking-[0.14em] opacity-70">{item.eyebrow[lang]}</span>
              <span className="mt-3 block text-[1.05rem] font-black leading-snug text-[#17242b]">{item.title[lang]}</span>
              <span className="mt-2 block text-[0.78rem] font-medium leading-5 text-[#5e7077]">{item.description[lang]}</span>
            </span>
            <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-xs font-black">
              {item.cta[lang]}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </>
        )
        const onClick = () => {
          trackEvent('campaign_placement_click', {
            campaign: item.id,
            locale: lang,
            sectionId,
            variant,
            position: String(index + 1),
          })
          if (item.external && item.sponsored) {
            trackAffiliateClick({
              id: item.id,
              itemName: item.title[lang],
              provider: item.provider ?? 'external',
              status: 'active_affiliate',
              sourceSection: sectionId,
              ctaLabel: item.cta[lang],
              ctaPosition: String(index + 1),
              destination: item.destination,
              category: item.category,
              locale: lang,
            })
          }
        }

        return item.external ? (
          <a key={item.id} href={item.href} target="_blank" rel={item.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} onClick={onClick} className={className}>
            {content}
          </a>
        ) : (
          <Link key={item.id} href={localizeHref(item.href, lang)} onClick={onClick} className={className}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}

