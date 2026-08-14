import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarClock, CheckCircle2, ExternalLink, FileSearch, Layers, RefreshCcwDot, ShieldCheck } from 'lucide-react'
import { SUPPORT_LABELS, SUPPORT_VERIFICATION_STALE_DAYS, SUPPORT_VERIFICATION_WARN_DAYS } from '@/lib/support/catalog'
import { getSupportFreshnessSummary, type SupportFreshnessState } from '@/lib/support/freshness'

export const metadata: Metadata = {
  title: '지원사업 검증 현황',
  robots: { index: false, follow: false },
}

// 2026-08-14 UI 리프레시 — /admin·/admin/hosts와 동일 디자인 언어(로직·데이터 무변경)

const FRESHNESS: Record<SupportFreshnessState, { label: string; className: string }> = {
  fresh: { label: '최신', className: 'bg-emerald-50 text-emerald-700' },
  watch: { label: '재확인 예정', className: 'bg-amber-50 text-amber-700' },
  stale: { label: '재검증 필요', className: 'bg-red-50 text-red-600' },
}

export default function AdminSupportFreshnessPage() {
  const summary = getSupportFreshnessSummary('KO')

  return (
    <main className="min-h-screen bg-[#f1f5f9]">
      {/* Top Bar — /admin과 동일 디자인 언어 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center text-white text-sm font-black shadow-sm">W</span>
          <div>
            <span className="block font-black text-slate-900 leading-tight">Wakation 관리자</span>
            <span className="block text-[11px] text-slate-400 leading-tight">지원사업 검증 현황</span>
          </div>
          <nav className="ml-4 hidden md:flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <Link href="/admin" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              신청 목록
            </Link>
            <Link href="/admin/hosts" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              호스트 검수
            </Link>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-sky-700 shadow-sm">지원사업 검증</span>
          </nav>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-500 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-600" /> DB 변경 없이 카탈로그 기준
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="max-w-3xl text-sm leading-6 text-slate-500">
          공식 출처를 마지막으로 확인한 날짜를 기준으로 관리합니다. {SUPPORT_VERIFICATION_WARN_DAYS}일 초과는 재확인 예정, {SUPPORT_VERIFICATION_STALE_DAYS}일 초과는 공개 상태를 자동으로 ‘공고 확인’으로 낮춥니다.
        </p>

        <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { label: '전체', value: summary.total, icon: Layers, chip: 'bg-slate-100 text-slate-500', num: 'text-slate-900' },
            { label: '최신', value: summary.fresh, icon: CheckCircle2, chip: 'bg-emerald-50 text-emerald-600', num: 'text-emerald-600' },
            { label: '재확인 예정', value: summary.watch, icon: CalendarClock, chip: 'bg-amber-50 text-amber-600', num: 'text-amber-600' },
            { label: '재검증 필요', value: summary.stale, icon: RefreshCcwDot, chip: 'bg-red-50 text-red-500', num: 'text-red-500' },
            { label: '공고 확인 상태', value: summary.needsReview, icon: FileSearch, chip: 'bg-sky-50 text-sky-600', num: 'text-sky-700' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.chip}`}>
                <s.icon size={18} />
              </span>
              <div className="min-w-0">
                <strong className={`block text-xl font-black leading-none ${s.num}`}>{s.value}</strong>
                <span className="mt-1 block text-[11px] font-semibold text-slate-400 truncate">{s.label}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">프로그램</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">검증 상태</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">공개 상태</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">접수 마감</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">운영 종료</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">확인</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.items.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-sky-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <strong className="block max-w-xs text-slate-900">{item.name}</strong>
                      <span className="mt-1 block text-xs text-slate-400">{item.region} · {item.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${FRESHNESS[item.freshness].className}`}>{FRESHNESS[item.freshness].label}</span>
                      <span className="mt-2 block text-xs text-slate-400">{item.verifiedAt} · {item.ageDays}일 경과</span>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-600">{SUPPORT_LABELS.status[item.status].KO}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{item.applicationEnd ?? '정확한 날짜 없음'}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{item.travelEnd ?? '정확한 날짜 없음'}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <a href={item.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-slate-50 hover:bg-sky-50 hover:text-sky-700 px-3.5 text-xs font-bold text-slate-500 transition-colors">공식 출처 <ExternalLink className="h-3.5 w-3.5" /></a>
                        <Link href={`/programs/support/${item.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-sky-600 hover:bg-sky-500 px-3.5 text-xs font-bold text-white shadow-sm transition-colors">공개 상세</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
