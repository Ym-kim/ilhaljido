import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 참가자 실후기 레지스트리 (2026-08-31 신설, 더휴일 벤치마크)
//
// ⚠️ 정직성 절대 원칙: 이 배열에는 **실제 참가자가 남긴 후기만** 들어간다.
//   지어낸 후기·문체만 다듬은 창작·타사이트 후기 이식 금지.
// 등재 절차: ①/reviews/submit 폼 또는 운영자 수집(양양 원문 등)으로 접수
//   ②운영자가 실참가 여부 확인 ③게재 동의 확인 ④여기 추가(consent: true만)
// 표기: author는 참가자가 동의한 형태(실명 또는 '김OO'·이니셜). quote는 원문
//   그대로가 원칙(맞춤법 정리만 허용, 내용 각색 금지). EN/JP 번역은 원문 병기 전제.
// 0건이면 홈 ReviewRail 섹션 자체가 렌더되지 않는다 — 빈 상태로 배포해도 안전.
// ─────────────────────────────────────────────────────────────────────────────

export type ParticipantReview = {
  id: string
  /** 동의받은 표기명 (예: '김OO', '이지은') */
  author: string
  /** 참여 프로그램 표기 (예: '양양 워케이션 1기') */
  program: Record<Lang, string>
  /** 참여 시점 (YYYY-MM) */
  stayedAt: string
  /** 후기 원문 — KO는 원문 그대로, EN/JP는 번역 */
  quote: Record<Lang, string>
  /** 게재 동의 확인 여부 — true만 등재 가능 */
  consent: true
  /** 운영자 검증일 */
  verifiedAt: string
}

export const PARTICIPANT_REVIEWS: ParticipantReview[] = [
  // 양양 1기 원문 도착 시 여기에 등재 (검증·동의 절차 후)
]
