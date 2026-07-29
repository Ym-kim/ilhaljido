import type { CampaignPlatform } from '@/data/social-campaigns'
import { CAMPAIGN_PLATFORM_UTM } from '@/data/social-campaigns'

export const CAMPAIGN_UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const
export type CampaignUtmKey = (typeof CAMPAIGN_UTM_KEYS)[number]
export type CampaignUtm = Partial<Record<CampaignUtmKey, string>>

const SAFE_VALUE = /^[a-zA-Z0-9._-]{1,100}$/

export function sanitizeCampaignUtm(input: URLSearchParams): CampaignUtm {
  return Object.fromEntries(
    CAMPAIGN_UTM_KEYS.flatMap((key) => {
      const value = input.get(key)
      return value && SAFE_VALUE.test(value) ? [[key, value]] : []
    }),
  )
}

export function withCampaignUtm(href: string, utm: CampaignUtm) {
  const [pathname, currentQuery = ''] = href.split('?')
  const query = new URLSearchParams(currentQuery)
  for (const key of CAMPAIGN_UTM_KEYS) {
    const value = utm[key]
    if (value) query.set(key, value)
  }
  const output = query.toString()
  return output ? `${pathname}?${output}` : pathname
}

export function buildSocialUtm(
  platform: CampaignPlatform,
  campaign: string,
  content: string,
): CampaignUtm {
  const channel = CAMPAIGN_PLATFORM_UTM[platform]
  return {
    utm_source: channel.source,
    utm_medium: channel.medium,
    utm_campaign: campaign,
    utm_content: content,
  }
}

export function campaignEventFields(utm: CampaignUtm) {
  return {
    ...(utm.utm_source ? { source: utm.utm_source } : {}),
    ...(utm.utm_content ? { content: utm.utm_content } : {}),
  }
}

export function rememberCampaignContext(context: {
  campaign: string
  destination?: string
  locale: string
  source?: string
  content?: string
}) {
  try {
    sessionStorage.setItem('wakation_campaign_context', JSON.stringify(context))
  } catch {
    // Attribution must never block navigation.
  }
}
