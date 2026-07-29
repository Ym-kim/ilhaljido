import campaignData from '@/data/trip-set-campaigns.json'
import type { Lang } from '@/lib/i18n/types'

export type TripSetSlug = keyof typeof campaignData
export type SocialFormat = 'feed' | 'story' | 'square' | 'og'
export type CampaignLocale = Extract<Lang, 'KO' | 'JP'>
export type CampaignMedia = {
  id: string
  image: string
  alt: Record<Lang, string>
  focalPoint?: { x: number; y: number }
  // JSON imports widen string literals; the asset validator enforces the
  // allowed source and usage vocabulary at generation/CI time.
  sourceType: string
  usage: string
  illustrative: boolean
  source?: string
  license?: string
  createdAt?: string
}

export const TRIP_SET_CAMPAIGNS = campaignData satisfies Record<TripSetSlug, CampaignMedia & Record<string, unknown>>

export function isTripSetCampaignSlug(slug: string): slug is TripSetSlug {
  return slug in TRIP_SET_CAMPAIGNS
}

export function getTripSetCampaign(slug: string) {
  return isTripSetCampaignSlug(slug) ? TRIP_SET_CAMPAIGNS[slug] : undefined
}

export function getTripSetSocialAsset(slug: string, format: SocialFormat, lang: CampaignLocale) {
  if (!isTripSetCampaignSlug(slug)) return undefined
  const locale = lang === 'JP' ? 'ja' : 'ko'
  return `/social/trip-sets/${slug}/${format}-${locale}.webp`
}
