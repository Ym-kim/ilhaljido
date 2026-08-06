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
  // 2026-08-04 i18n-routes-v1 신설분
  '/stories',
  '/moments',
  '/tools/diagnosis',
])

/** EN·JA 양쪽에 실존하는 동적 패밀리 (하위 slug 라우트) */
const SHARED_FAMILIES = ['/guide/', '/collections/', '/destinations/', '/experiences/', '/programs/support/']

/** 패밀리에 걸리지만 KO 전용인 예외 (en·ja 미존재) */
const FAMILY_EXCLUDES = new Set<string>(['/programs/support/register'])

/** JA에만 실존 */
const JA_ONLY = new Set<string>(['/trip-match', '/campaign/korea-weekend'])

// ─────────────────────────────────────────────────────────────────────────────
// 언어별 노출 가능 여부 (2026-08-07 구조 결정 ③)
//
// localizeHref는 "404를 만들지 않는" 것까지만 보장한다 — 로케일 라우트가 없으면
// KO 경로를 그대로 돌려주므로, EN 사용자가 KO 전용 화면으로 그대로 이동한다.
// /trip-match는 forceLang="KO" 서버 페이지라 EN 사용자가 들어가면 화면 전체가 한국어다
// (프로덕션 EN 홈에서 "Find my trip" → /trip-match 실측 확인).
//
// EN 지원은 하지 않기로 했다: TripMatchExperience 타입이 KO|JP 제한이고 매칭 로직의
// 시장 부스트가 KO/JP 시장을 전제로 설계돼 있어, EN 추가는 카피+부스트 재설계가 필요하다.
// 대신 EN 화면에서는 진입로를 숨긴다.
// ─────────────────────────────────────────────────────────────────────────────

/** 해당 언어에 대응 화면이 없어 링크를 숨겨야 하는 라우트 */
const HIDDEN_BY_LANG: Record<Lang, readonly string[]> = {
  KO: [],
  EN: ['/trip-match'],
  JP: [],
}

/** 이 언어 화면에서 해당 내부 링크를 노출해도 되는지 */
export function isRouteVisibleIn(href: string, lang: Lang): boolean {
  if (!href.startsWith('/')) return true
  const path = href.split(/[#?]/, 1)[0].replace(/\/$/, '') || '/'
  return !HIDDEN_BY_LANG[lang].some((p) => path === p || path.startsWith(`${p}/`))
}

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
