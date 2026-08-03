import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 로케일 경로 헬퍼 — /en·/ja 라우트가 "실존하는 경우에만" prefix를 붙인다.
//
// 배경(2026-08-04 감사): 컴포넌트마다 제각각인 prefix 로직 5종이 산재했고,
// 존재 확인 없이 무조건 붙이는 구현(구 DomesticOnboarding.withLocale)은
// EN 홈에서 /en/trip-match(미존재) 404 링크를 만들었다.
//
// ⚠️ 아래 매니페스트는 src/app/en·src/app/ja 디렉토리와 수동 동기 —
//    새 로케일 라우트를 만들면 여기에도 추가할 것.
// ─────────────────────────────────────────────────────────────────────────────

/** EN·JA 양쪽에 실존하는 정확 경로 */
const SHARED_EXACT = new Set<string>([
  '/',
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
  '/guide',
])

/** EN·JA 양쪽에 실존하는 동적 패밀리 (하위 slug 라우트) */
const SHARED_FAMILIES = ['/guide/', '/collections/', '/destinations/', '/experiences/', '/programs/support/']

/** 패밀리에 걸리지만 KO 전용인 예외 (en·ja 미존재) */
const FAMILY_EXCLUDES = new Set<string>(['/programs/support/register'])

/** JA에만 실존 */
const JA_ONLY = new Set<string>(['/trip-match', '/campaign/korea-weekend'])

/**
 * 내부 href에 로케일 prefix를 안전하게 부착.
 * 해시(#)·쿼리(?)는 보존하고 경로부만 매니페스트와 대조한다.
 * 로케일 라우트가 없으면 KO 경로 그대로 반환(404 생성 금지).
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === 'KO' || !href.startsWith('/')) return href
  if (href.startsWith('/en/') || href.startsWith('/ja/')) return href

  const cut = href.split(/[#?]/, 1)[0]
  const path = cut !== '/' && cut.endsWith('/') ? cut.slice(0, -1) : cut

  const shared =
    SHARED_EXACT.has(path) ||
    (SHARED_FAMILIES.some((f) => path.startsWith(f)) && !FAMILY_EXCLUDES.has(path))
  const ok = shared || (lang === 'JP' && JA_ONLY.has(path))
  if (!ok) return href

  const prefix = lang === 'EN' ? '/en' : '/ja'
  return href === '/' ? prefix : `${prefix}${href}`
}
