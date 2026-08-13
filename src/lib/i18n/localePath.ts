import type { Lang } from '@/lib/i18n/types'

/** Routes with dedicated English and Japanese pages. */
const SHARED_EXACT = new Set<string>([
  '/',
  '/host',
  '/hosted',
  '/media-credits',
  '/select',
  '/select/activity',
  '/select/esim',
  '/select/hotel',
  '/select/learn',
  '/programs',
  '/programs/domestic',
  '/programs/global',
  '/programs/golf',
  '/programs/healing',
  '/programs/local',
  '/programs/market',
  '/programs/networking',
  '/programs/onsen',
  '/programs/sports',
  '/programs/support',
  '/programs/support/calendar',
  '/programs/support/half-price-travel',
  '/destinations',
  '/destinations/compare',
  '/collections',
  '/cruise',
  '/guide',
  '/stories',
  '/moments',
  '/trip-match',
  '/trip-match/result',
  '/tools/diagnosis',
])

/** Dynamic route families with dedicated English and Japanese pages. */
const SHARED_FAMILIES = ['/guide/', '/collections/', '/cruise/', '/destinations/', '/experiences/', '/moments/', '/programs/support/']

/** Korean-only pages that sit under an otherwise localized route family. */
const FAMILY_EXCLUDES = new Set<string>(['/programs/support/register'])

/** Pages that currently have a Japanese route but no English route. */
const JA_ONLY = new Set<string>(['/campaign/korea-weekend'])

/** Locale-specific visibility exceptions for customer navigation. */
const HIDDEN_BY_LANG: Record<Lang, readonly string[]> = {
  KO: [],
  EN: [],
  JP: [],
}

export function isRouteVisibleIn(href: string, lang: Lang): boolean {
  if (!href.startsWith('/')) return true
  const path = href.split(/[#?]/, 1)[0].replace(/\/$/, '') || '/'
  return !HIDDEN_BY_LANG[lang].some((hidden) => path === hidden || path.startsWith(`${hidden}/`))
}

/**
 * Add a locale prefix only when the matching locale route exists.
 * Query strings and hash fragments remain unchanged.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === 'KO' || !href.startsWith('/')) return href
  if (href.startsWith('/en/') || href.startsWith('/ja/')) return href

  const cut = href.split(/[#?]/, 1)[0]
  const path = cut !== '/' && cut.endsWith('/') ? cut.slice(0, -1) : cut
  const shared = SHARED_EXACT.has(path)
    || (SHARED_FAMILIES.some((family) => path.startsWith(family)) && !FAMILY_EXCLUDES.has(path))
  const routeExists = shared || (lang === 'JP' && JA_ONLY.has(path))
  if (!routeExists) return href

  const prefix = lang === 'EN' ? '/en' : '/ja'
  return href === '/' ? prefix : `${prefix}${href}`
}
