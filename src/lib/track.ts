import { track } from '@vercel/analytics/react'

type AuthTrackingState = 'true' | 'false' | 'unknown'

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', name: string, props: Record<string, string>) => void
  __WAKATION_AUTH_STATE__?: AuthTrackingState
  __WAKATION_ANALYTICS_DEBUG__?: Array<{
    event: string
    payload: Record<string, string>
    timestamp: string
  }>
}

export type AffiliateClickInput = {
  id?: string
  itemName?: string
  provider?: string
  status?: string
  page?: string
  sourcePage?: string
  sourceSection?: string
  ctaLabel?: string
  ctaPosition?: string
  tripSetSlug?: string
  destination?: string
  category?: string
  locale?: string
  position?: string
  campaign?: string
  isLoggedIn?: boolean
}

export type AffiliateClickPayload = {
  partner: string
  category: string
  item_id: string
  item_name: string
  destination: string
  source_page: string
  source_section: string
  cta_label: string
  cta_position: string
  locale: string
  trip_set: string
  campaign: string
  campaign_source: string
  campaign_content: string
  is_logged_in: AuthTrackingState
  status: string
  categories_clicked: string
  provider: string
  id: string
  page: string
  position: string
}

const CAMPAIGN_CONTEXT_KEY = 'wakation_campaign_context'
const AFFILIATE_CATEGORY_KEY = 'wakation_affiliate_categories'
const DUPLICATE_WINDOW_MS = 900

let lastAffiliateFingerprint = ''
let lastAffiliateTimestamp = 0

function currentPath() {
  return typeof window === 'undefined' ? 'unknown' : window.location.pathname
}

function resolveLocale(value?: string) {
  if (value) {
    const normalized = value.toLowerCase()
    if (normalized === 'jp') return 'ja'
    if (normalized === 'ko' || normalized === 'en' || normalized === 'ja') return normalized
  }
  const pathname = currentPath()
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return 'ja'
  return 'ko'
}

function resolveAuthState(value?: boolean): AuthTrackingState {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof window === 'undefined') return 'unknown'
  return (window as AnalyticsWindow).__WAKATION_AUTH_STATE__ ?? 'unknown'
}

function readCampaignContext() {
  const empty = { campaign: '', source: '', content: '' }
  if (typeof window === 'undefined') return empty
  try {
    const raw = window.sessionStorage.getItem(CAMPAIGN_CONTEXT_KEY)
    const parsed = raw ? JSON.parse(raw) as Record<string, unknown> : {}
    const search = new URLSearchParams(window.location.search)
    const current = {
      campaign: search.get('utm_campaign') ?? '',
      source: search.get('utm_source') ?? '',
      content: search.get('utm_content') ?? '',
    }
    const context = {
      campaign: current.campaign || (typeof parsed.campaign === 'string' ? parsed.campaign : ''),
      source: current.source || (typeof parsed.source === 'string' ? parsed.source : ''),
      content: current.content || (typeof parsed.content === 'string' ? parsed.content : ''),
    }
    if (current.campaign || current.source || current.content) {
      window.sessionStorage.setItem(CAMPAIGN_CONTEXT_KEY, JSON.stringify(context))
    }
    return context
  } catch {
    return empty
  }
}

function recordAffiliateCategory(category: string) {
  if (typeof window === 'undefined') return { count: 0, isNew: false }
  try {
    const raw = window.sessionStorage.getItem(AFFILIATE_CATEGORY_KEY)
    const parsed = raw ? JSON.parse(raw) as unknown : []
    const previous = Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
    if (!category || category === 'unknown') return { count: previous.length, isNew: false }
    const isNew = !previous.includes(category)
    const next = isNew ? [...previous, category] : previous
    window.sessionStorage.setItem(AFFILIATE_CATEGORY_KEY, JSON.stringify(next))
    return { count: next.length, isNew }
  } catch {
    return { count: 0, isNew: false }
  }
}

function writeDebugEvent(name: string, payload: Record<string, string>) {
  if (typeof window === 'undefined') return
  const search = new URLSearchParams(window.location.search)
  if (search.get('analytics_debug') !== '1') return
  const analyticsWindow = window as AnalyticsWindow
  const entries = analyticsWindow.__WAKATION_ANALYTICS_DEBUG__ ?? []
  analyticsWindow.__WAKATION_ANALYTICS_DEBUG__ = [
    ...entries.slice(-49),
    { event: name, payload, timestamp: new Date().toISOString() },
  ]
  let output = document.getElementById('wakation-analytics-debug')
  if (!output) {
    output = document.createElement('output')
    output.id = 'wakation-analytics-debug'
    output.hidden = true
    output.setAttribute('aria-hidden', 'true')
    document.body.appendChild(output)
  }
  output.textContent = JSON.stringify({ event: name, payload })
  window.dispatchEvent(new CustomEvent('wakation:analytics', { detail: { event: name, payload } }))
}

function emitEvent(name: string, payload: Record<string, string>) {
  writeDebugEvent(name, payload)
  try {
    track(name, payload)
  } catch {
    // Keep the remaining analytics channels and user journey intact.
  }
  try {
    if (typeof window !== 'undefined') (window as AnalyticsWindow).gtag?.('event', name, payload)
  } catch {
    // Consent-gated GA4 may be unavailable without affecting the click.
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  try {
    const page = currentPath()
    emitEvent(name, { page, source_page: page, ...props })
  } catch {
    // Analytics must never block the user journey.
  }
}

export function trackAffiliateClick(props: AffiliateClickInput) {
  try {
    const campaignContext = readCampaignContext()
    const sourcePage = props.sourcePage ?? props.page ?? currentPath()
    const itemId = props.id ?? 'unknown'
    const partner = props.provider ?? 'unknown'
    const category = props.category ?? 'unknown'
    const ctaPosition = props.ctaPosition ?? props.position ?? 'unknown'
    const fingerprint = [sourcePage, props.sourceSection, itemId, category, ctaPosition].join('|')
    const now = Date.now()
    if (fingerprint === lastAffiliateFingerprint && now - lastAffiliateTimestamp < DUPLICATE_WINDOW_MS) return
    lastAffiliateFingerprint = fingerprint
    lastAffiliateTimestamp = now

    const categoryProgress = recordAffiliateCategory(category)
    const payload: AffiliateClickPayload = {
      partner,
      category,
      item_id: itemId,
      item_name: props.itemName ?? itemId,
      destination: props.destination ?? 'unknown',
      source_page: sourcePage,
      source_section: props.sourceSection ?? 'unknown',
      cta_label: props.ctaLabel ?? 'external_link',
      cta_position: ctaPosition,
      locale: resolveLocale(props.locale),
      trip_set: props.tripSetSlug ?? 'none',
      campaign: (props.campaign ?? campaignContext.campaign) || 'none',
      campaign_source: campaignContext.source || 'none',
      campaign_content: campaignContext.content || 'none',
      is_logged_in: resolveAuthState(props.isLoggedIn),
      status: props.status ?? 'unknown',
      categories_clicked: String(categoryProgress.count),
      // Legacy aliases keep existing Vercel Analytics views usable during schema migration.
      provider: partner,
      id: itemId,
      page: sourcePage,
      position: ctaPosition,
    }

    emitEvent('affiliate_click', payload)
    if (categoryProgress.isNew && categoryProgress.count === 2) {
      emitEvent('second_category_click', payload)
    }
  } catch {
    // Analytics must never block the external navigation.
  }
}
