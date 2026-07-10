'use client'

import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'
import type { Lang } from '@/lib/i18n/types'
import { nowIn, overlapWithSeoul, WORK_START, WORK_END } from '@/lib/overlap'

// ─────────────────────────────────────────────────────────────────────────────
// 워크타임 오버랩 — 워케이션 결정 팩터 1위(타임존 궁합)를 시각화 (차별화 기능)
// 리서치: "Timezone overlap matters more than weather" (2026 노마드 트렌드)
// 서울 시간축(24h) 위에 서울·현지 근무창(9~18시)을 겹쳐 협업 가능 시간을 표시.
// Intl API 클라이언트 계산 = 외부 API·비용 0. 시각은 클라이언트 전용(hydration 안전).
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  title: { KO: '한국 팀과의 워크타임 겹침', EN: 'Work-hours overlap with Korea', JP: '韓国·日本チームとの勤務時間の重なり' },
  nowLocal: { KO: '현지 지금', EN: 'Local time now', JP: '現地時刻' },
  nowSeoul: { KO: '서울 지금', EN: 'Seoul now', JP: 'ソウル現在' },
  seoulRow: { KO: '서울 근무시간', EN: 'Seoul work hours', JP: 'ソウル勤務時間' },
  localRow: { KO: '현지 근무시간', EN: 'Local work hours', JP: '現地勤務時間' },
  overlapUnit: { KO: '시간 겹침', EN: 'h overlap', JP: '時間重なる' },
  basis: {
    KO: '양쪽 9:00–18:00 근무 기준 · 서울 시간축',
    EN: 'Assuming 9:00–18:00 on both sides · Seoul time axis',
    JP: '両側9:00–18:00勤務基準 · ソウル時間軸',
  },
  full: { KO: '완전 동기 협업', EN: 'Fully synchronous', JP: '完全同期コラボ' },
  most: { KO: '거의 실시간 협업', EN: 'Mostly real-time', JP: 'ほぼリアルタイム' },
  partial: { KO: '코어타임 조율 권장', EN: 'Plan core hours', JP: 'コアタイム調整推奨' },
}

function verdictKey(h: number): string {
  if (h >= 9) return 'full'
  if (h >= 7) return 'most'
  return 'partial'
}

export function WorkOverlap({ timeZone, cityName, lang }: { timeZone: string; cityName: string; lang: Lang }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  // SSG/hydration 시엔 자리만 (시간은 클라이언트 전용)
  if (!now) {
    return <div className="h-40 rounded-2xl border border-[#dbeafe] bg-[#f8fbff] animate-pulse" aria-hidden />
  }

  const seoulNow = nowIn('Asia/Seoul')
  const { diffH } = overlapWithSeoul(timeZone)

  // 서울 시간축 기준 근무창: 서울 9~18 / 현지 9~18 → 서울축 [9 - diffH, 18 - diffH]
  const localStartOnSeoul = WORK_START - diffH
  const localEndOnSeoul = WORK_END - diffH
  const overlapStart = Math.max(WORK_START, localStartOnSeoul)
  const overlapEnd = Math.min(WORK_END, localEndOnSeoul)
  const overlapH = Math.max(0, overlapEnd - overlapStart)

  const fmt = (tz: string) =>
    new Intl.DateTimeFormat(lang === 'KO' ? 'ko-KR' : lang === 'JP' ? 'ja-JP' : 'en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
    }).format(now)

  // 서울 기준 현재 시각 마커 위치(%)
  const seoulHourNow = seoulNow.getHours() + seoulNow.getMinutes() / 60
  const pct = (h: number) => `${Math.max(0, Math.min(100, (h / 24) * 100))}%`
  const widthPct = (a: number, b: number) => `${Math.max(0, ((Math.min(24, b) - Math.max(0, a)) / 24) * 100)}%`

  const rows = [
    { label: T.seoulRow[lang], start: WORK_START, end: WORK_END },
    { label: T.localRow[lang], start: localStartOnSeoul, end: localEndOnSeoul },
  ]

  return (
    <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fbff] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="flex items-center gap-1.5 text-[#111827] font-bold text-sm">
          <Clock3 className="w-4 h-4 text-brand-mid" />
          {T.title[lang]}
        </p>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-[#64748b]">
            {T.nowLocal[lang]} <span className="text-[#111827] font-bold tabular-nums">{fmt(timeZone)}</span>
          </span>
          <span className="text-[#94a3b8]">·</span>
          <span className="text-[#64748b]">
            {T.nowSeoul[lang]} <span className="text-[#111827] font-bold tabular-nums">{fmt('Asia/Seoul')}</span>
          </span>
        </div>
      </div>

      {/* 24h 트랙 ×2 (서울축) */}
      <div className="space-y-2 mb-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[0.6875rem] font-semibold text-[#64748b] text-right">
              {i === 0 ? r.label : `${cityName}`}
            </span>
            <div className="relative flex-1 h-5 rounded-full bg-[#e2e8f0]/60 overflow-hidden">
              {/* 근무창 */}
              <div
                className={`absolute top-0 h-full rounded-full ${i === 0 ? 'bg-sky-300/70' : 'bg-brand-mid/60'}`}
                style={{ left: pct(Math.max(0, r.start)), width: widthPct(r.start, r.end) }}
              />
              {/* 겹침 하이라이트 */}
              {overlapH > 0 && (
                <div
                  className="absolute top-0 h-full bg-brand-mid"
                  style={{ left: pct(overlapStart), width: widthPct(overlapStart, overlapEnd) }}
                />
              )}
              {/* 현재 시각 마커 */}
              <div className="absolute top-0 h-full w-[2px] bg-[#111827]/70" style={{ left: pct(seoulHourNow) }} />
            </div>
          </div>
        ))}
        {/* 축 라벨 */}
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0" />
          <div className="relative flex-1 text-[0.6rem] text-[#94a3b8] font-medium">
            <span className="absolute left-0">0</span>
            <span className="absolute" style={{ left: '25%' }}>6</span>
            <span className="absolute" style={{ left: '50%' }}>12</span>
            <span className="absolute" style={{ left: '75%' }}>18</span>
            <span className="absolute right-0">24</span>
            <span className="invisible">0</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <p className="text-sm">
          <span className="text-brand-mid font-black text-lg tabular-nums">{overlapH}</span>
          <span className="text-[#111827] font-bold"> {T.overlapUnit[lang]}</span>
          <span className="ml-2 text-[0.75rem] font-bold px-2 py-0.5 rounded-full bg-brand-mid/10 text-brand-mid">
            {T[verdictKey(overlapH)][lang]}
          </span>
        </p>
        <p className="text-[#94a3b8] text-[0.6875rem]">{T.basis[lang]}</p>
      </div>
    </div>
  )
}
