// No offer, brand, URL or tracking format is assumed before a partner is approved.
export type SecurityAudience = 'individual' | 'business'
export type SecurityPlacement = 'select_connect' | 'esim_connect' | 'security_guide' | 'business_readiness'
export type SecurityLocale = 'ko' | 'en' | 'ja'
export type SecurityContext = { placement: SecurityPlacement; locale: SecurityLocale; audience_type: SecurityAudience }
export type SecurityPartnerConfig = {
  enabled: boolean
  audience: SecurityAudience
  partnerId: string | null
  title: string | null
  description: string | null
  url: string | null
  offerText: string | null
  disclosure: string | null
}

const inactive = (audience: SecurityAudience): Readonly<SecurityPartnerConfig> => Object.freeze({
  enabled: false, audience, partnerId: null, title: null, description: null,
  url: null, offerText: null, disclosure: null,
})
export const connectSecurityPartner = inactive('individual')
export const businessSecurityPartner = inactive('business')

const sources: Record<SecurityPlacement, string> = {
  select_connect: '/select', esim_connect: '/select/esim',
  security_guide: '/select/esim/work-safely', business_readiness: '/business',
}

/** Allowlisted context only: no search terms, queries, email or device identifiers. */
export function securityEventProperties(context: SecurityContext): Record<string, string> | null {
  if (!Object.hasOwn(sources, context.placement)
    || !['ko', 'en', 'ja'].includes(context.locale)
    || !['individual', 'business'].includes(context.audience_type)) return null
  const page = sources[context.placement]
  const source = context.locale === 'ko' || page === '/business' ? page : `/${context.locale}${page}`
  return { partner: 'none', placement: context.placement, locale: context.locale,
    audience_type: context.audience_type, source_page: source, page: source }
}

export function isSecurityPartnerReady(config: SecurityPartnerConfig): boolean {
  if (!config.enabled || !config.partnerId || !/^[a-z0-9_-]{1,48}$/.test(config.partnerId)
    || !config.title?.trim() || !config.description?.trim() || !config.disclosure?.trim() || !config.url) return false
  try {
    const url = new URL(config.url)
    return url.protocol === 'https:' && !url.username && !url.password
  } catch { return false }
}

/** A later approved provider can implement its documented SubID format.
 * No adapter means exact URL preservation. Never guess or rewrite CID/SubID keys.
 */
export type SecuritySubIdAdapter = (url: string, context: Readonly<Record<string, string>>) => string
export function securityPartnerHref(config: SecurityPartnerConfig, context: SecurityContext, adapter?: SecuritySubIdAdapter): string | null {
  const props = securityEventProperties(context)
  if (!props || config.audience !== context.audience_type || !isSecurityPartnerReady(config)) return null
  try {
    const original = config.url!
    const href = adapter ? adapter(original, Object.freeze({ ...props, partner: config.partnerId! })) : original
    const parsed = new URL(href)
    if (parsed.origin !== new URL(original).origin || parsed.username || parsed.password) return null
    return href
  } catch { return null }
}
