import { track } from '@vercel/analytics/react'

type GtagWindow = Window & {
  gtag?: (command: 'event', name: string, props: Record<string, string>) => void
}

function trackGaEvent(name: string, props: Record<string, string>) {
  if (typeof window === 'undefined') return
  ;(window as GtagWindow).gtag?.('event', name, props)
}

// 제휴 아웃바운드 클릭 계측 — 어떤 카드·파트너·상태가 실제 전환되는지 데이터화
// (Vercel Analytics는 이미 layout에 로드됨, 추가 비용 0)
// 범용 디스커버리 이벤트 — 홈 개편(무드·기간·도시 탐색) 퍼널 계측
// 레포 컨벤션: Vercel Analytics track() 단일 채널 (GA4 gtag는 동의 게이트 뒤라 직접 호출 안 함)
export function trackEvent(name: string, props?: Record<string, string>) {
  try {
    const payload = { page: typeof window !== 'undefined' ? window.location.pathname : 'unknown', ...props }
    track(name, payload)
    // GA4는 사용자가 분석 쿠키에 동의해 gtag가 로드된 경우에만 전송된다.
    trackGaEvent(name, payload)
  } catch {
    // 계측 실패가 사용자 이동을 막지 않도록 무시
  }
}

export function trackAffiliateClick(props: {
  id?: string
  provider?: string
  status?: string
  page?: string
  tripSetSlug?: string
  destination?: string
  category?: string
  locale?: string
  position?: string
}) {
  try {
    let campaignContext: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      try {
        const raw = window.sessionStorage.getItem('wakation_campaign_context')
        const parsed = raw ? JSON.parse(raw) as Record<string, unknown> : {}
        campaignContext = Object.fromEntries(
          ['campaign', 'destination', 'locale', 'source', 'content'].flatMap((key) =>
            typeof parsed[key] === 'string' ? [[key, parsed[key] as string]] : [],
          ),
        )
      } catch {
        campaignContext = {}
      }
    }
    const payload = {
      id: props.id ?? 'unknown',
      provider: props.provider ?? 'unknown',
      status: props.status ?? 'unknown',
      page: props.page ?? (typeof window !== 'undefined' ? window.location.pathname : 'unknown'),
      ...campaignContext,
      ...(props.tripSetSlug ? { trip_set_slug: props.tripSetSlug } : {}),
      ...(props.destination ? { destination: props.destination } : {}),
      ...(props.category ? { category: props.category } : {}),
      ...(props.locale ? { locale: props.locale } : {}),
      ...(props.position ? { position: props.position } : {}),
    }
    track('affiliate_click', payload)
    trackGaEvent('affiliate_click', payload)
  } catch {
    // 계측 실패가 사용자 이동을 막지 않도록 무시
  }
}
