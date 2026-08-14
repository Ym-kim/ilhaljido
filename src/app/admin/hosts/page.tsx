'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BadgeCheck, CheckCircle2, ExternalLink, Home, ImageOff, RefreshCw, UserRound, XCircle } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { listingPhotoUrl, type Host, type HostListing } from '@/lib/host/hostTypes'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트·리스팅 검수 (P2, 2026-08-13 / UI 리프레시 2026-08-14) —
// /admin/layout.tsx 서버 가드 아래 (ADMIN_EMAILS). 운영자 전용이라 KO 단일.
// 승인 전 확인: ①리스팅 실존 ②사진 적절성 ③현지 등록번호(일본 필수 성격) ④과장 문구
// ─────────────────────────────────────────────────────────────────────────────

const HOST_ST: Record<Host['status'], { label: string; cls: string }> = {
  pending: { label: '대기', cls: 'bg-amber-50 text-amber-700' },
  approved: { label: '승인됨', cls: 'bg-emerald-50 text-emerald-700' },
  suspended: { label: '중지', cls: 'bg-red-50 text-red-600' },
}
const LISTING_ST: Record<HostListing['status'], { label: string; cls: string }> = {
  draft: { label: '작성 중', cls: 'bg-slate-100 text-slate-500' },
  submitted: { label: '검수 대기', cls: 'bg-amber-50 text-amber-700' },
  approved: { label: '공개 중', cls: 'bg-emerald-50 text-emerald-700' },
  rejected: { label: '반려', cls: 'bg-red-50 text-red-600' },
}

export default function AdminHostsPage() {
  const [hosts, setHosts] = useState<Host[]>([])
  const [listings, setListings] = useState<HostListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [memoDrafts, setMemoDrafts] = useState<Record<string, string>>({})

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/hosts')
    if (!res.ok) {
      setError('목록을 불러오지 못했습니다.')
      setLoading(false)
      return
    }
    const json = await res.json()
    setHosts(json.hosts ?? [])
    setListings(json.listings ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount 1회 목록 로드(admin/page.tsx와 동일 패턴)
    load()
  }, [load])

  async function patch(kind: 'host' | 'listing', id: string, status: string, admin_memo?: string) {
    const res = await fetch('/api/admin/hosts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, id, status, ...(admin_memo !== undefined ? { admin_memo } : {}) }),
    })
    if (!res.ok) {
      setError('처리에 실패했습니다.')
      return
    }
    await load()
  }

  const hostById = (id: string) => hosts.find((h) => h.id === id)
  const sortedHosts = [...hosts].sort((a, b) => (a.status === 'pending' ? -1 : 1) - (b.status === 'pending' ? -1 : 1))
  const sortedListings = [...listings].sort((a, b) => (a.status === 'submitted' ? -1 : 1) - (b.status === 'submitted' ? -1 : 1))
  const pendingHosts = hosts.filter((h) => h.status === 'pending').length
  const pendingListings = listings.filter((l) => l.status === 'submitted').length

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Top Bar — /admin과 동일 디자인 언어 */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center text-white text-sm font-black shadow-sm">W</span>
          <div>
            <span className="block font-black text-slate-900 leading-tight">Wakation 관리자</span>
            <span className="block text-[11px] text-slate-400 leading-tight">호스트 · 숙소 검수</span>
          </div>
          <nav className="ml-4 hidden md:flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <Link href="/admin" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              신청 목록
            </Link>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-sky-700 shadow-sm">호스트 검수</span>
            <Link href="/admin/support" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              지원사업 검증
            </Link>
          </nav>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-700 bg-white border border-slate-200 rounded-full px-3.5 py-2 hover:border-sky-300 shadow-sm transition-all"
        >
          <RefreshCw size={13} /> 새로고침
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><UserRound size={20} /></span>
            <div>
              <div className="text-2xl font-black leading-none text-amber-600">{pendingHosts}</div>
              <div className="text-xs font-semibold text-slate-400 mt-1.5">호스트 승인 대기</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><Home size={20} /></span>
            <div>
              <div className="text-2xl font-black leading-none text-sky-600">{pendingListings}</div>
              <div className="text-xs font-semibold text-slate-400 mt-1.5">숙소 검수 대기</div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-slate-400 text-sm mb-4">불러오는 중...</p>}

        {/* 호스트 */}
        <h2 className="flex items-center gap-2 font-black text-slate-900 mb-3">
          <UserRound size={16} className="text-sky-600" strokeWidth={ICON_STROKE} /> 호스트 신청
        </h2>
        <div className="space-y-3 mb-10">
          {sortedHosts.length === 0 && !loading && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-12 text-center">
              <UserRound size={26} className="mx-auto text-slate-200 mb-2" />
              <p className="text-slate-400 text-sm">아직 호스트 신청이 없습니다.</p>
            </div>
          )}
          {sortedHosts.map((h) => {
            const st = HOST_ST[h.status]
            return (
              <div key={h.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {h.display_name?.[0] ?? '?'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-slate-900">{h.display_name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.cls}`}>{st.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{h.contact_email}{h.contact_phone ? ` · ${h.contact_phone}` : ''}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {h.airbnb_profile_url && (
                      <a href={h.airbnb_profile_url} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 px-3 py-2 rounded-full transition-colors">
                        에어비앤비 <ExternalLink size={11} />
                      </a>
                    )}
                    {h.status !== 'approved' && (
                      <button onClick={() => patch('host', h.id, 'approved')}
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition-colors">
                        <CheckCircle2 size={12} strokeWidth={ICON_STROKE} /> 승인
                      </button>
                    )}
                    {h.status !== 'suspended' && (
                      <button onClick={() => patch('host', h.id, 'suspended')}
                              className="inline-flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold px-3.5 py-2 rounded-full transition-colors">
                        <XCircle size={12} strokeWidth={ICON_STROKE} /> 중지
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 리스팅 */}
        <h2 className="flex items-center gap-2 font-black text-slate-900 mb-3">
          <Home size={16} className="text-sky-600" strokeWidth={ICON_STROKE} /> 숙소 검수
        </h2>
        <div className="space-y-4">
          {sortedListings.length === 0 && !loading && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-12 text-center">
              <Home size={26} className="mx-auto text-slate-200 mb-2" />
              <p className="text-slate-400 text-sm">아직 등록된 숙소가 없습니다.</p>
            </div>
          )}
          {sortedListings.map((l) => {
            const st = LISTING_ST[l.status]
            return (
              <div key={l.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  {/* 대표 사진 */}
                  <div className="sm:w-44 shrink-0 bg-slate-100 flex items-center justify-center">
                    {l.photos?.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element -- 검수용 원본 썸네일(관리자 화면 전용)
                      <img src={listingPhotoUrl(l.photos[0])} alt="" className="w-full h-36 sm:h-full object-cover" />
                    ) : (
                      <div className="py-10 text-center">
                        <ImageOff size={20} className="mx-auto text-slate-300" />
                        <p className="text-[11px] text-slate-400 mt-1">사진 없음</p>
                      </div>
                    )}
                  </div>
                  {/* 내용 */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.cls}`}>{st.label}</span>
                      <span className="font-black text-slate-900">{l.title}</span>
                      <span className="text-xs text-slate-400">{l.city} · {hostById(l.host_id)?.display_name ?? '?'}</span>
                    </div>
                    {l.summary && <p className="mt-2 text-sm text-slate-600">{l.summary}</p>}
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      {l.local_license ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                          <BadgeCheck size={12} /> 등록번호 {l.local_license}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-bold">⚠️ 현지 등록번호 미기재 — 일본 숙소면 승인 전 확인 필수</span>
                      )}
                      {l.wifi_mbps ? <span className="text-slate-400">와이파이 {l.wifi_mbps}Mbps (자가 실측)</span> : null}
                      {l.slug ? <span className="text-slate-400">/stays/{l.slug}</span> : null}
                    </div>
                    {l.photos?.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {l.photos.slice(1).map((p) => (
                          // eslint-disable-next-line @next/next/no-img-element -- 검수용 원본 썸네일(관리자 화면 전용)
                          <img key={p} src={listingPhotoUrl(p)} alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-100" />
                        ))}
                      </div>
                    )}
                    <input
                      value={memoDrafts[l.id] ?? l.admin_memo ?? ''}
                      onChange={(e) => setMemoDrafts((m) => ({ ...m, [l.id]: e.target.value }))}
                      placeholder="반려 사유·검수 메모 (호스트에게 표시됨)"
                      className="mt-3.5 w-full bg-slate-50 border border-transparent rounded-xl px-3.5 py-2.5 text-xs outline-none focus:bg-white focus:border-sky-300 transition-all"
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a href={l.airbnb_url} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 px-3 py-2 rounded-full transition-colors">
                        에어비앤비 리스팅 <ExternalLink size={11} />
                      </a>
                      {l.status !== 'approved' && (
                        <button onClick={() => patch('listing', l.id, 'approved', memoDrafts[l.id])}
                                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition-colors">
                          <CheckCircle2 size={12} strokeWidth={ICON_STROKE} /> 승인·공개
                        </button>
                      )}
                      {l.status !== 'rejected' && (
                        <button onClick={() => patch('listing', l.id, 'rejected', memoDrafts[l.id])}
                                className="inline-flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold px-3.5 py-2 rounded-full transition-colors">
                          <XCircle size={12} strokeWidth={ICON_STROKE} /> 반려
                        </button>
                      )}
                      {l.status === 'approved' && l.slug && (
                        <a href={`/stays/${l.slug}`} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-full transition-colors">
                          공개 페이지 <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
