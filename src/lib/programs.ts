import type { Program } from '@/types/database'

// ─────────────────────────────────────────────────────────────────────────────
// DB 프로그램 표시 유틸
//
// 1) 자동 만료: date_end가 지난 프로그램은 DB status가 'open'으로 남아 있어도
//    화면·AI 추천에서 'closed'로 취급 (운영자가 status를 매번 갱신하지 않아도 안전)
// 2) 사진 오버라이드: DB image_url이 picsum 플레이스홀더인 행은
//    검증 풀(코드베이스에서 실물 확인된 Unsplash)의 사진으로 교체
// ─────────────────────────────────────────────────────────────────────────────

export function isExpired(p: Pick<Program, 'date_end'>): boolean {
  return new Date(`${p.date_end}T23:59:59+09:00`) < new Date()
}

export function withEffectiveStatus(p: Program): Program {
  // 취소 회차가 최우선 — 만료·보류보다 앞서 'closed'로 확정한다
  // (2026-08-06 운영자 취소 지시: 오사카 8/18·통영 8/27. 보류와 달리 재개 예정이 없으므로
  //  'soon'(=사전예약)으로 두면 진행하지 않을 회차에 신청이 들어옴 — 상세 CTA도 함께 차단)
  if (CANCELLED_PROGRAM_IDS.has(p.id)) {
    return { ...p, status: 'closed' }
  }
  if (isExpired(p) && p.status !== 'closed') {
    return { ...p, status: 'closed' }
  }
  // 보류 회차는 상세에서도 'soon'으로 강등 — 잔여석 게이지·'지금 신청하기' 노출 차단
  // (2026-08-04 감사: 홈 위젯만 필터되고 상세는 open 유지되던 구멍. CTA는 prog_preorder=사전 관심 등록으로 전환됨)
  if (HELD_PROGRAM_IDS.has(p.id) && p.status === 'open') {
    return { ...p, status: 'soon' }
  }
  return p
}

// 검증 풀 사진 매핑 (program.id 기준) — 새 프로그램 등록 시 여기에 추가
const PROGRAM_PHOTOS: Record<string, string> = {
  // AI 활용 실무 집중 캠프 — 강원 속초 (동해 해변)
  'b701ae8f-0f87-4626-9b6c-1fb407c9af02': '/media/verified/unsplash/1473116763249-2faaef81ccda.webp',
  // 온라인 마케팅 & 상세페이지 집중반 — 경기 가평 (들판)
  'e1f2f76e-bc8c-4a96-8d85-42c57559bff9': '/media/verified/unsplash/1500382017468-9049fed747ef.webp',
  // 번아웃 탈출 힐링 워케이션 — 충남 태안 (해변)
  'f71b9c49-d981-4c24-bcf4-6b2be5b2cbff': '/media/verified/unsplash/1507525428034-b723cf961d3e.webp',
  // 1인 기업가 네트워킹 캠프 — 강원 춘천 (자연)
  '59f91d96-0cae-4ced-8cc3-622b7692f70a': '/media/verified/unsplash/1501854140801-50d01698950b.webp',
  // 일본 시장조사 + 소도시 워케이션 — 오사카 (신세카이)
  'f4031123-0db9-4c4e-9253-982992ae1006': '/media/verified/unsplash/1590559899731-a382839e5549.webp',
  // 디자인 & 브랜딩 집중 캠프 — 경남 통영 (부두·바다)
  '684a3f59-1957-4d61-a510-150851d40e27': '/media/verified/unsplash/1617653202545-931490e8d7e7.webp',
}

/** picsum 플레이스홀더는 노출하지 않음 — 매핑 없으면 null(그라디언트 폴백) */
export function programPhoto(p: Pick<Program, 'id' | 'image_url'>): string | null {
  if (PROGRAM_PHOTOS[p.id]) return PROGRAM_PHOTOS[p.id]
  if (p.image_url && !p.image_url.includes('picsum.photos')) return p.image_url
  return null
}

// 운영자 취소 회차 — 진행하지 않기로 확정된 것. 재개 예정이 없으므로 'closed' 고정.
// 목록에서 제외되고 상세에서도 신청·사전예약 CTA가 렌더되지 않는다.
// ⚠️ 보류(HELD)와 구분할 것: 보류는 일정 확정 시 재노출, 취소는 되살리지 않는다.
export const CANCELLED_PROGRAM_IDS = new Set<string>([
  'f71b9c49-d981-4c24-bcf4-6b2be5b2cbff', // 번아웃 탈출 힐링 워케이션 — 태안 7/7 (진행 예정 없음)
  '59f91d96-0cae-4ced-8cc3-622b7692f70a', // 1인 기업가 네트워킹 캠프 — 춘천 7/23 (운영자 취소 지시 2026-07-19)
  'f4031123-0db9-4c4e-9253-982992ae1006', // 일본 시장조사 + 소도시 워케이션 — 오사카 8/18 (운영자 취소 지시 2026-08-06)
  '684a3f59-1957-4d61-a510-150851d40e27', // 디자인 & 브랜딩 집중 캠프 — 통영 8/27 (운영자 취소 지시 2026-08-06)
])

// 운영자 보류 회차 (2026-07-11 지시) — 일정 확정 시 여기서 제거하면 모집 캘린더에 재노출
// (현재 비어 있음. 취소분은 위 CANCELLED_PROGRAM_IDS로 이관)
export const HELD_PROGRAM_IDS = new Set<string>([])

/** date_start까지 남은 일수 (지났으면 null) */
export function daysUntilStart(p: Pick<Program, 'date_start'>): number | null {
  const diff = new Date(`${p.date_start}T00:00:00+09:00`).getTime() - Date.now()
  if (diff <= 0) return null
  return Math.ceil(diff / 86_400_000)
}
