import campaignData from '@/data/trip-set-campaigns.json'
import type { Lang } from '@/lib/i18n/types'

export type TripSetSlug = keyof typeof campaignData
export type SocialFormat = 'feed' | 'story' | 'square' | 'og'
export type CampaignLocale = Extract<Lang, 'KO' | 'JP'>

export const TRIP_SET_CAMPAIGNS = campaignData

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
