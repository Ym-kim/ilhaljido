import { track } from '@vercel/analytics/react'

// 제휴 아웃바운드 클릭 계측 — 어떤 카드·파트너·상태가 실제 전환되는지 데이터화
// (Vercel Analytics는 이미 layout에 로드됨, 추가 비용 0)
// 범용 디스커버리 이벤트 — 홈 개편(무드·기간·도시 탐색) 퍼널 계측
// 레포 컨벤션: Vercel Analytics track() 단일 채널 (GA4 gtag는 동의 게이트 뒤라 직접 호출 안 함)
export function trackEvent(name: string, props?: Record<string, string>) {
  try {
    track(name, { page: typeof window !== 'undefined' ? window.location.pathname : 'unknown', ...props })
  } catch {
    // 계측 실패가 사용자 이동을 막지 않도록 무시
  }
}

export function trackAffiliateClick(props: {
  id?: string
  provider?: string
  status?: string
  page?: string
}) {
  try {
    track('affiliate_click', {
      id: props.id ?? 'unknown',
      provider: props.provider ?? 'unknown',
      status: props.status ?? 'unknown',
      page: props.page ?? (typeof window !== 'undefined' ? window.location.pathname : 'unknown'),
    })
  } catch {
    // 계측 실패가 사용자 이동을 막지 않도록 무시
  }
}
