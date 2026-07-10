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
  if (isExpired(p) && p.status !== 'closed') {
    return { ...p, status: 'closed' }
  }
  return p
}

// 검증 풀 사진 매핑 (program.id 기준) — 새 프로그램 등록 시 여기에 추가
const PROGRAM_PHOTOS: Record<string, string> = {
  // AI 활용 실무 집중 캠프 — 강원 속초 (동해 해변)
  'b701ae8f-0f87-4626-9b6c-1fb407c9af02': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80',
  // 온라인 마케팅 & 상세페이지 집중반 — 경기 가평 (들판)
  'e1f2f76e-bc8c-4a96-8d85-42c57559bff9': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  // 번아웃 탈출 힐링 워케이션 — 충남 태안 (해변)
  'f71b9c49-d981-4c24-bcf4-6b2be5b2cbff': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  // 1인 기업가 네트워킹 캠프 — 강원 춘천 (자연)
  '59f91d96-0cae-4ced-8cc3-622b7692f70a': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80',
  // 일본 시장조사 + 소도시 워케이션 — 오사카 (신세카이)
  'f4031123-0db9-4c4e-9253-982992ae1006': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=900&q=80',
  // 디자인 & 브랜딩 집중 캠프 — 경남 통영 (부두·바다)
  '684a3f59-1957-4d61-a510-150851d40e27': 'https://images.unsplash.com/photo-1617653202545-931490e8d7e7?auto=format&fit=crop&w=900&q=80',
}

/** picsum 플레이스홀더는 노출하지 않음 — 매핑 없으면 null(그라디언트 폴백) */
export function programPhoto(p: Pick<Program, 'id' | 'image_url'>): string | null {
  if (PROGRAM_PHOTOS[p.id]) return PROGRAM_PHOTOS[p.id]
  if (p.image_url && !p.image_url.includes('picsum.photos')) return p.image_url
  return null
}

// 운영자 보류 회차 (2026-07-11 지시) — 일정 확정 시 여기서 제거하면 모집 캘린더에 재노출
export const HELD_PROGRAM_IDS = new Set<string>([
  '59f91d96-0cae-4ced-8cc3-622b7692f70a', // 1인 기업가 네트워킹 캠프 — 춘천 7/23
  'f4031123-0db9-4c4e-9253-982992ae1006', // 일본 시장조사 + 소도시 워케이션 — 오사카 8/18
  '684a3f59-1957-4d61-a510-150851d40e27', // 디자인 & 브랜딩 집중 캠프 — 통영 8/27
])

/** date_start까지 남은 일수 (지났으면 null) */
export function daysUntilStart(p: Pick<Program, 'date_start'>): number | null {
  const diff = new Date(`${p.date_start}T00:00:00+09:00`).getTime() - Date.now()
  if (diff <= 0) return null
  return Math.ceil(diff / 86_400_000)
}
