'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Users, Clock, CheckCircle2, XCircle,
  PhoneCall, RefreshCw, Search,
  ChevronRight, Calendar, Briefcase, CreditCard, Trash2,
} from 'lucide-react'
import type { Application } from '@/types/database'

const STATUS_MAP = {
  pending:         { label: '신규 접수', color: 'bg-amber-100 text-amber-800',    icon: Clock },
  contacted:       { label: '연락 완료', color: 'bg-blue-100 text-blue-800',      icon: PhoneCall },
  payment_pending: { label: '결제 대기', color: 'bg-purple-100 text-purple-800',  icon: CreditCard },
  confirmed:       { label: '확정',      color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
  cancelled:       { label: '취소',      color: 'bg-red-100 text-red-800',        icon: XCircle },
} as const

type AdminApp = Application & { programs?: { title: string; location: string } | null }

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [apps, setApps] = useState<AdminApp[]>([])
  const [filtered, setFiltered] = useState<AdminApp[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<AdminApp | null>(null)
  const [loading, setLoading] = useState(false)
  const [forbidden, setForbidden] = useState(false)
  const [memo, setMemo] = useState('')
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())

  const loadApps = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/applications')
    if (res.status === 403) {
      setForbidden(true)
      setLoading(false)
      return
    }
    const json = await res.json()
    setApps(json.data ?? [])
    setFiltered(json.data ?? [])
    setLoading(false)
  }, [])

  // Auth guard
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login?redirect=/admin')
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 인증 확정 후 1회 목록 로드(가드 패턴) — 동작 불변
    loadApps()
  }, [authLoading, user, router, loadApps])

  useEffect(() => {
    let result = apps
    if (filter === 'traveler_note') result = result.filter((a) => a.job_type === 'traveler_note')
    else if (filter !== 'all') result = result.filter((a) => a.status === filter)
    if (search) {
      result = result.filter(
        (a) =>
          a.name.includes(search) ||
          a.phone.includes(search) ||
          a.email.includes(search) ||
          a.job_type.includes(search)
      )
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 파생 필터 목록 동기화(기존 동작 유지) — 리팩터는 admin 접촉 금지 원칙상 보류
    setFiltered(result)
  }, [filter, search, apps])

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    await loadApps()
    if (selected?.id === id) {
      setSelected((prev) =>
        prev ? { ...prev, status: status as Application['status'] } : null
      )
    }
  }

  async function saveMemo(id: string) {
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, admin_memo: memo }),
    })
    await loadApps()
  }

  async function deleteApp(id: string) {
    if (!window.confirm('이 신청 건을 영구 삭제합니다. 되돌릴 수 없습니다. 삭제할까요?')) return
    const res = await fetch('/api/admin/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (!res.ok) {
      window.alert('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }
    if (selected?.id === id) setSelected(null)
    setCheckedIds((prev) => { const n = new Set(prev); n.delete(id); return n })
    await loadApps()
  }

  function toggleCheck(id: string) {
    setCheckedIds((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id); else n.add(id)
      return n
    })
  }

  function toggleCheckAll() {
    setCheckedIds((prev) =>
      prev.size === filtered.length && filtered.length > 0
        ? new Set()
        : new Set(filtered.map((a) => a.id))
    )
  }

  async function deleteChecked() {
    const ids = [...checkedIds]
    if (ids.length === 0) return
    if (!window.confirm(`선택한 ${ids.length}건을 영구 삭제합니다. 되돌릴 수 없습니다. 삭제할까요?`)) return
    const res = await fetch('/api/admin/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
    if (!res.ok) {
      window.alert('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.')
      return
    }
    if (selected && ids.includes(selected.id)) setSelected(null)
    setCheckedIds(new Set())
    await loadApps()
  }

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => a.status === 'pending').length,
    contacted: apps.filter((a) => a.status === 'contacted').length,
    confirmed: apps.filter((a) => a.status === 'confirmed').length,
    cancelled: apps.filter((a) => a.status === 'cancelled').length,
    traveler_note: apps.filter((a) => a.job_type === 'traveler_note').length,
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted text-sm">인증 확인 중...</p>
      </div>
    )
  }

  if (forbidden) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-border p-8 w-full max-w-sm shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-400" size={22} />
          </div>
          <p className="font-black text-dark mb-1">접근 권한 없음</p>
          <p className="text-sm text-muted">관리자 계정으로 로그인하세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Bar */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-brand-mid to-brand flex items-center justify-center text-white text-sm font-black">일</span>
          <span className="font-black text-dark">Wakation 관리자</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/support" className="flex min-h-11 items-center rounded-lg border border-border px-3 text-sm font-bold text-muted transition-colors hover:border-brand hover:text-brand">
            지원사업 검증
          </Link>
          {checkedIds.size > 0 && (
            <button
              onClick={deleteChecked}
              className="flex items-center gap-1.5 text-sm font-bold text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Trash2 size={13} /> 선택 삭제 ({checkedIds.size})
            </button>
          )}
          <span className="text-sm text-muted">총 신청 {counts.all}건</span>
          <button
            onClick={loadApps}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-brand border border-border rounded-lg px-3 py-1.5 hover:border-brand transition-colors"
          >
            <RefreshCw size={13} /> 새로고침
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: 'pending',   label: '신규 접수', num: counts.pending,   color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' },
          { key: 'contacted', label: '연락 완료', num: counts.contacted, color: 'text-blue-600',    bg: 'bg-blue-50 border-blue-200' },
          { key: 'confirmed', label: '확정',      num: counts.confirmed, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          { key: 'cancelled', label: '취소',      num: counts.cancelled, color: 'text-red-600',     bg: 'bg-red-50 border-red-200' },
        ].map((s) => (
          <div key={s.key} className={`rounded-xl border p-4 ${s.bg}`}>
            <div className={`text-2xl font-black ${s.color}`}>{s.num}</div>
            <div className="text-xs font-medium text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 flex gap-5 items-start">
        {/* List */}
        <div className="flex-1">
          {/* Filters + Search */}
          <div className="bg-white rounded-xl border border-border p-4 mb-3 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all',       label: `전체 (${counts.all})` },
                { key: 'pending',   label: `신규 (${counts.pending})` },
                { key: 'contacted', label: `연락완료 (${counts.contacted})` },
                { key: 'confirmed', label: `확정 (${counts.confirmed})` },
                { key: 'cancelled', label: `취소 (${counts.cancelled})` },
                { key: 'traveler_note', label: `여행자 노트 (${counts.traveler_note})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    filter === f.key
                      ? 'bg-brand border-brand text-white'
                      : 'bg-white border-border text-muted hover:border-brand'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름·연락처·이메일 검색"
                className="pl-8 pr-3 py-1.5 border border-border rounded-lg text-xs outline-none focus:border-brand-mid w-48"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {loading ? (
              <div className="py-16 text-center text-sm text-muted">로딩 중…</div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-sm text-muted">신청 내역이 없습니다.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream">
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        aria-label="전체 선택"
                        checked={filtered.length > 0 && checkedIds.size === filtered.length}
                        onChange={toggleCheckAll}
                        className="w-3.5 h-3.5 accent-brand cursor-pointer align-middle"
                      />
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">이름</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">연락처</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden md:table-cell">프로그램</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden lg:table-cell">직업</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted">상태</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted hidden md:table-cell">신청일</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, i) => {
                    const s = STATUS_MAP[app.status as keyof typeof STATUS_MAP] ?? STATUS_MAP.pending
                    return (
                      <tr
                        key={app.id}
                        className={`border-b border-border hover:bg-cream cursor-pointer transition-colors ${
                          selected?.id === app.id ? 'bg-brand-pale' : ''
                        } ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
                        onClick={() => { setSelected(app); setMemo(app.admin_memo || '') }}
                      >
                        <td className="px-4 py-3 w-10" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            aria-label={`${app.name} 선택`}
                            checked={checkedIds.has(app.id)}
                            onChange={() => toggleCheck(app.id)}
                            className="w-3.5 h-3.5 accent-brand cursor-pointer align-middle"
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-dark">{app.name}</td>
                        <td className="px-4 py-3 text-muted">{app.phone}</td>
                        <td className="px-4 py-3 text-muted hidden md:table-cell truncate max-w-[160px]">
                          {app.job_type === 'traveler_note' ? '여행자 노트' : app.programs?.title ?? app.program_id ?? '미정'}
                        </td>
                        <td className="px-4 py-3 text-muted hidden lg:table-cell">{app.job_type}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${s.color}`}>
                            <s.icon size={10} /> {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                          {new Date(app.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-4 py-3"><ChevronRight size={14} className="text-muted" /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-black text-dark text-lg">{selected.name}</div>
                  <div className="text-sm text-muted">{selected.email}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted hover:text-dark text-lg leading-none">×</button>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { icon: <PhoneCall size={13} />, val: selected.phone },
                  { icon: <Briefcase size={13} />, val: selected.job_type },
                  { icon: <Calendar size={13} />, val: selected.duration_preference ?? '미정' },
                  { icon: <Users size={13} />, val: selected.budget_range ?? '미정' },
                ].map(({ icon, val }) => (
                  <div key={val} className="flex items-center gap-2 text-sm text-muted">
                    <span className="text-brand">{icon}</span> {val}
                  </div>
                ))}
              </div>

              {selected.interests.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-bold text-dark mb-1.5">관심 분야</div>
                  <div className="flex flex-wrap gap-1">
                    {selected.interests.map((t) => (
                      <span key={t} className="bg-brand-pale text-brand text-xs font-medium px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.message && (
                <div className="mb-4 p-3 bg-cream rounded-lg text-xs text-muted leading-relaxed">
                  {selected.message}
                </div>
              )}

              {/* Status Change */}
              <div className="mb-4">
                <div className="text-xs font-bold text-dark mb-2">상태 변경</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(STATUS_MAP).map(([key, s]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(selected.id, key)}
                      className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selected.status === key
                          ? 'bg-brand border-brand text-white'
                          : 'border-border text-muted hover:border-brand hover:text-brand'
                      }`}
                    >
                      <s.icon size={11} /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div>
                <div className="text-xs font-bold text-dark mb-1.5">관리자 메모</div>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                  placeholder="상담 내용, 특이사항 등..."
                  className="w-full border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-mid resize-none"
                />
                <button
                  onClick={() => saveMemo(selected.id)}
                  className="w-full mt-1.5 bg-brand text-white rounded-lg py-2 text-xs font-bold hover:bg-brand-dark transition-colors"
                >
                  메모 저장
                </button>
              </div>

              {/* 삭제 — 영구 삭제(확인 프롬프트) */}
              <div className="mt-5 pt-4 border-t border-border">
                <button
                  onClick={() => deleteApp(selected.id)}
                  className="w-full flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-lg py-2 text-xs font-bold hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  <Trash2 size={12} /> 신청 건 삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
