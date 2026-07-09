import { track } from '@vercel/analytics/react'

// 제휴 아웃바운드 클릭 계측 — 어떤 카드·파트너·상태가 실제 전환되는지 데이터화
// (Vercel Analytics는 이미 layout에 로드됨, 추가 비용 0)
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
