// 워크타임 오버랩 공용 계산 — 클라이언트 전용 (Intl, 비용 0)
// 양쪽 9:00–18:00 근무 가정, 서울 기준

export const WORK_START = 9
export const WORK_END = 18

/** 해당 타임존의 현재 로컬 시각(시스템 tz 투영 근사 — 차이 계산·표시용) */
export function nowIn(tz: string): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: tz }))
}

/** 서울 대비 시차(시간, DST 반영)와 근무시간 겹침(0~9h) */
export function overlapWithSeoul(timeZone: string): { diffH: number; overlapH: number } {
  const seoul = nowIn('Asia/Seoul')
  const local = nowIn(timeZone)
  const diffH = Math.round(((local.getTime() - seoul.getTime()) / 3_600_000) * 2) / 2
  const overlapH = Math.max(0, WORK_END - WORK_START - Math.abs(diffH))
  return { diffH, overlapH }
}
