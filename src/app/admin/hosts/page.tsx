'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ExternalLink, RefreshCw, XCircle } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { listingPhotoUrl, type Host, type HostListing } from '@/lib/host/hostTypes'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트·리스팅 검수 (P2, 2026-08-13) — /admin/layout.tsx 서버 가드 아래 (ADMIN_EMAILS)
// 운영자 전용 화면이라 KO 단일 (기존 /admin과 동일 원칙)
// 승인 전 확인 체크리스트: ①리스팅 실존(에어비앤비 링크) ②사진 적절성
// ③현지 등록번호(일본 필수 성격) ④과장 문구 여부
// ─────────────────────────────────────────────────────────────────────────────

const HOST_ST: Record<Host['status'], string> = { pending: '대기', approved: '승인됨', suspended: '중지' }
const LISTING_ST: Record<HostListing['status'], string> = { draft: '작성 중', submitted: '검수 대기', approved: '공개 중', rejected: '반려' }

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

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-muted text-xs font-bold hover:text-dark transition-colors mb-2">
              <ArrowLeft size={13} /> 신청 목록으로
            </Link>
            <h1 className="text-xl font-black text-dark">호스트 · 숙소 검수</h1>
          </div>
          <button onClick={load} className="inline-flex items-center gap-1.5 text-xs font-bold text-muted border border-border rounded-full px-3 py-1.5 hover:border-brand transition-all">
            <RefreshCw size={12} /> 새로고침
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-muted text-sm">불러오는 중...</p>}

        {/* 호스트 */}
        <h2 className="font-black text-dark mb-3">호스트 신청 ({hosts.filter((h) => h.status === 'pending').length}건 대기)</h2>
        <div className="space-y-3 mb-10">
          {sortedHosts.length === 0 && !loading && (
            <p className="text-muted text-sm bg-white rounded-xl border border-border p-5">아직 호스트 신청이 없습니다.</p>
          )}
          {sortedHosts.map((h) => (
            <div key={h.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${h.status === 'pending' ? 'bg-amber-50 text-amber-700' : h.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                  {HOST_ST[h.status]}
                </span>
                <span className="font-black text-dark">{h.display_name}</span>
                <span className="text-muted text-xs">{h.contact_email}{h.contact_phone ? ` · ${h.contact_phone}` : ''}</span>
              </div>
              {h.airbnb_profile_url && (
                <a href={h.airbnb_profile_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">
                  에어비앤비 프로필 확인 <ExternalLink size={11} />
                </a>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {h.status !== 'approved' && (
                  <button onClick={() => patch('host', h.id, 'approved')} className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all">
                    <CheckCircle2 size={12} strokeWidth={ICON_STROKE} /> 승인
                  </button>
                )}
                {h.status !== 'suspended' && (
                  <button onClick={() => patch('host', h.id, 'suspended')} className="inline-flex items-center gap-1 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-full transition-all">
                    <XCircle size={12} strokeWidth={ICON_STROKE} /> 중지
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 리스팅 */}
        <h2 className="font-black text-dark mb-3">숙소 검수 ({listings.filter((l) => l.status === 'submitted').length}건 대기)</h2>
        <div className="space-y-3">
          {sortedListings.length === 0 && !loading && (
            <p className="text-muted text-sm bg-white rounded-xl border border-border p-5">아직 등록된 숙소가 없습니다.</p>
          )}
          {sortedListings.map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${l.status === 'submitted' ? 'bg-amber-50 text-amber-700' : l.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : l.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                  {LISTING_ST[l.status]}
                </span>
                <span className="font-black text-dark">{l.title}</span>
                <span className="text-muted text-xs">{l.city} · 호스트: {hostById(l.host_id)?.display_name ?? '?'}</span>
              </div>
              {l.summary && <p className="mt-2 text-sm text-dark">{l.summary}</p>}
              <div className="mt-2 text-xs text-muted space-y-0.5">
                {l.local_license ? <p>현지 등록번호: {l.local_license}</p> : <p className="text-amber-600 font-bold">⚠️ 현지 등록번호 미기재 — 일본 숙소면 승인 전 확인 필수</p>}
                {l.wifi_mbps ? <p>와이파이: {l.wifi_mbps}Mbps (호스트 자가 실측)</p> : null}
                {l.slug ? <p>슬러그: /stays/{l.slug}</p> : null}
              </div>
              <a href={l.airbnb_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">
                에어비앤비 리스팅 확인 <ExternalLink size={11} />
              </a>
              {l.photos?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {l.photos.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element -- 검수용 원본 썸네일(관리자 화면 전용)
                    <img key={p} src={listingPhotoUrl(p)} alt="" className="w-24 h-24 object-cover rounded-lg border border-border" />
                  ))}
                </div>
              )}
              <div className="mt-3">
                <input
                  value={memoDrafts[l.id] ?? l.admin_memo ?? ''}
                  onChange={(e) => setMemoDrafts((m) => ({ ...m, [l.id]: e.target.value }))}
                  placeholder="반려 사유·검수 메모 (호스트에게 표시됨)"
                  className="w-full border border-border rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {l.status !== 'approved' && (
                  <button onClick={() => patch('listing', l.id, 'approved', memoDrafts[l.id])} className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all">
                    <CheckCircle2 size={12} strokeWidth={ICON_STROKE} /> 승인·공개 (슬러그 자동 부여)
                  </button>
                )}
                {l.status !== 'rejected' && (
                  <button onClick={() => patch('listing', l.id, 'rejected', memoDrafts[l.id])} className="inline-flex items-center gap-1 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-full transition-all">
                    <XCircle size={12} strokeWidth={ICON_STROKE} /> 반려 (메모 필수 권장)
                  </button>
                )}
                {l.status === 'approved' && l.slug && (
                  <a href={`/stays/${l.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-brand border border-border px-3 py-1.5 rounded-full hover:border-brand transition-all">
                    공개 페이지 <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
