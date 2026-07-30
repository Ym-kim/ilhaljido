import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react'
import { SUPPORT_LABELS, SUPPORT_VERIFICATION_STALE_DAYS, SUPPORT_VERIFICATION_WARN_DAYS } from '@/lib/support/catalog'
import { getSupportFreshnessSummary, type SupportFreshnessState } from '@/lib/support/freshness'

export const metadata: Metadata = {
  title: '지원사업 검증 현황',
  robots: { index: false, follow: false },
}

const FRESHNESS: Record<SupportFreshnessState, { label: string; className: string }> = {
  fresh: { label: '최신', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  watch: { label: '재확인 예정', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  stale: { label: '재검증 필요', className: 'bg-red-50 text-red-700 border-red-200' },
}

export default function AdminSupportFreshnessPage() {
  const summary = getSupportFreshnessSummary('KO')

  return (
    <main className="min-h-screen bg-[#f5f3ed] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#61747b] hover:text-[#17647f]">
              <ArrowLeft className="h-4 w-4" /> 신청 관리
            </Link>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#17313b]">지원사업 검증 현황</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#65777d]">
              공식 출처를 마지막으로 확인한 날짜를 기준으로 관리합니다. {SUPPORT_VERIFICATION_WARN_DAYS}일 초과는 재확인 예정, {SUPPORT_VERIFICATION_STALE_DAYS}일 초과는 공개 상태를 자동으로 ‘공고 확인’으로 낮춥니다.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#cfe0e1] bg-white px-4 py-3 text-xs font-bold text-[#31515d]">
            <ShieldCheck className="h-4 w-4 text-[#1d829f]" /> DB 변경 없이 카탈로그 기준
          </div>
        </div>

        <section className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            ['전체', summary.total, 'text-[#17313b]'],
            ['최신', summary.fresh, 'text-emerald-700'],
            ['재확인 예정', summary.watch, 'text-amber-700'],
            ['재검증 필요', summary.stale, 'text-red-700'],
            ['공고 확인 상태', summary.needsReview, 'text-slate-700'],
          ].map(([label, value, color]) => (
            <div key={String(label)} className="rounded-2xl border border-[#dfe6e4] bg-white p-4 shadow-[0_8px_24px_rgba(25,59,70,.04)]">
              <strong className={`block text-2xl font-black ${color}`}>{value}</strong>
              <span className="mt-1 block text-xs font-semibold text-[#718188]">{label}</span>
            </div>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#dce5e3] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-[#edf3f1] text-xs text-[#52676f]">
                <tr>
                  <th className="px-4 py-3 font-bold">프로그램</th>
                  <th className="px-4 py-3 font-bold">검증 상태</th>
                  <th className="px-4 py-3 font-bold">공개 상태</th>
                  <th className="px-4 py-3 font-bold">접수 마감</th>
                  <th className="px-4 py-3 font-bold">운영 종료</th>
                  <th className="px-4 py-3 font-bold">확인</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0ee]">
                {summary.items.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-[#fbfcfa]">
                    <td className="px-4 py-4">
                      <strong className="block max-w-xs text-[#203943]">{item.name}</strong>
                      <span className="mt-1 block text-xs text-[#7b8a8f]">{item.region} · {item.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${FRESHNESS[item.freshness].className}`}>{FRESHNESS[item.freshness].label}</span>
                      <span className="mt-2 block text-xs text-[#6d7d83]">{item.verifiedAt} · {item.ageDays}일 경과</span>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-[#445b64]">{SUPPORT_LABELS.status[item.status].KO}</td>
                    <td className="px-4 py-4 text-xs text-[#60737a]">{item.applicationEnd ?? '정확한 날짜 없음'}</td>
                    <td className="px-4 py-4 text-xs text-[#60737a]">{item.travelEnd ?? '정확한 날짜 없음'}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <a href={item.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-[#ccdadd] px-3 text-xs font-bold text-[#17647f]">공식 출처 <ExternalLink className="h-3.5 w-3.5" /></a>
                        <Link href={`/programs/support/${item.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-[#17313b] px-3 text-xs font-bold text-white">공개 상세</Link>
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
