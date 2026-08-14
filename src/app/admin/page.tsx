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
    else if (filter === 'host_apply') result = result.filter((a) => a.job_type === '호스트 등록')
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
    host_apply: apps.filter((a) => a.job_type === '호스트 등록').length,
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
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-700 flex items-center justify-center text-white text-sm font-black shadow-sm">W</span>
          <div>
            <span className="block font-black text-slate-900 leading-tight">Wakation 관리자</span>
            <span className="block text-[11px] text-slate-400 leading-tight">신청 · 문의 관리</span>
          </div>
          <nav className="ml-4 hidden md:flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-sky-700 shadow-sm">신청 목록</span>
            <Link href="/admin/hosts" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              호스트 검수
            </Link>
            <Link href="/admin/support" className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors">
              지원사업 검증
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2.5">
          {checkedIds.size > 0 && (
            <button
              onClick={deleteChecked}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 border border-red-200 rounded-full px-3.5 py-2 hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Trash2 size={13} /> 선택 삭제 ({checkedIds.size})
            </button>
          )}
          <span className="hidden sm:block text-xs font-medium text-slate-400">총 {counts.all}건</span>
          <button
            onClick={loadApps}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-700 bg-white border border-slate-200 rounded-full px-3.5 py-2 hover:border-sky-300 shadow-sm transition-all"
          >
            <RefreshCw size={13} /> 새로고침
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: 'pending',   label: '신규 접수', num: counts.pending,   icon: Clock,        chip: 'bg-amber-50 text-amber-600',   num2: 'text-amber-600' },
          { key: 'contacted', label: '연락 완료', num: counts.contacted, icon: PhoneCall,    chip: 'bg-blue-50 text-blue-600',     num2: 'text-blue-600' },
          { key: 'confirmed', label: '확정',      num: counts.confirmed, icon: CheckCircle2, chip: 'bg-emerald-50 text-emerald-600', num2: 'text-emerald-600' },
          { key: 'cancelled', label: '취소',      num: counts.cancelled, icon: XCircle,      chip: 'bg-red-50 text-red-500',       num2: 'text-red-500' },
        ].map((s) => (
          <div key={s.key} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.chip}`}>
              <s.icon size={20} />
            </span>
            <div>
              <div className={`text-2xl font-black leading-none ${s.num2}`}>{s.num}</div>
              <div className="text-xs font-semibold text-slate-400 mt-1.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 flex gap-5 items-start">
        {/* List */}
        <div className="flex-1">
          {/* Filters + Search */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 mb-3 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {[
                { key: 'all',       label: `전체 (${counts.all})` },
                { key: 'pending',   label: `신규 (${counts.pending})` },
                { key: 'contacted', label: `연락완료 (${counts.contacted})` },
                { key: 'confirmed', label: `확정 (${counts.confirmed})` },
                { key: 'cancelled', label: `취소 (${counts.cancelled})` },
                { key: 'traveler_note', label: `여행자 노트 (${counts.traveler_note})` },
                { key: 'host_apply', label: `호스트 등록 (${counts.host_apply})` },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === f.key
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름·연락처·이메일 검색"
                className="pl-9 pr-4 py-2 bg-slate-50 border border-transparent rounded-full text-xs outline-none focus:bg-white focus:border-sky-300 transition-all w-52"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-20 text-center text-sm text-slate-400">로딩 중…</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center">
                <Users size={28} className="mx-auto text-slate-200 mb-3" />
                <p className="text-sm text-slate-400">신청 내역이 없습니다.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        aria-label="전체 선택"
                        checked={filtered.length > 0 && checkedIds.size === filtered.length}
                        onChange={toggleCheckAll}
                        className="w-3.5 h-3.5 accent-sky-600 cursor-pointer align-middle"
                      />
                    </th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">이름</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">연락처</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">프로그램</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden lg:table-cell">유형</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">상태</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">신청일</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, i) => {
                    const s = STATUS_MAP[app.status as keyof typeof STATUS_MAP] ?? STATUS_MAP.pending
                    return (
                      <tr
                        key={app.id}
                        className={`border-b border-slate-100 hover:bg-sky-50/50 cursor-pointer transition-colors ${
                          selected?.id === app.id ? 'bg-sky-50' : ''
                        } ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
                        onClick={() => { setSelected(app); setMemo(app.admin_memo || '') }}
                      >
                        <td className="px-4 py-3.5 w-10" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            aria-label={`${app.name} 선택`}
                            checked={checkedIds.has(app.id)}
                            onChange={() => toggleCheck(app.id)}
                            className="w-3.5 h-3.5 accent-sky-600 cursor-pointer align-middle"
                          />
                        </td>
                        <td className="px-4 py-3.5 font-bold text-slate-900">{app.name}</td>
                        <td className="px-4 py-3.5 text-slate-500">{app.phone}</td>
                        <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell truncate max-w-[160px]">
                          {app.job_type === 'traveler_note' ? '여행자 노트' : app.job_type === '호스트 등록' ? '호스트 등록' : app.programs?.title ?? app.program_id ?? '미정'}
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 hidden lg:table-cell">{app.job_type}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${s.color}`}>
                            <s.icon size={10} /> {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 text-xs hidden md:table-cell">
                          {new Date(app.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-4 py-3.5"><ChevronRight size={14} className="text-slate-300" /></td>
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
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 sticky top-20">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-black text-base">
                    {selected.name?.[0] ?? '?'}
                  </span>
                  <div>
                    <div className="font-black text-slate-900 leading-tight">{selected.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 break-all">{selected.email}</div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} aria-label="닫기" className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 text-sm leading-none transition-colors">×</button>
              </div>

              <div className="space-y-1.5 mb-5">
                {[
                  { icon: <PhoneCall size={13} />, val: selected.phone },
                  { icon: <Briefcase size={13} />, val: selected.job_type },
                  { icon: <Calendar size={13} />, val: selected.duration_preference ?? '미정' },
                  { icon: <Users size={13} />, val: selected.budget_range ?? '미정' },
                ].map(({ icon, val }) => (
                  <div key={val} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">{icon}</span> {val}
                  </div>
                ))}
              </div>

              {selected.interests.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">관심 분야</div>
                  <div className="flex flex-wrap gap-1">
                    {selected.interests.map((t) => (
                      <span key={t} className="bg-sky-50 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.message && (
                <div className="mb-5 p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                  {selected.message}
                </div>
              )}

              {/* Status Change */}
              <div className="mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">상태 변경</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(STATUS_MAP).map(([key, s]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(selected.id, key)}
                      className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        selected.status === key
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      <s.icon size={11} /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memo */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">관리자 메모</div>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                  placeholder="상담 내용, 특이사항 등..."
                  className="w-full bg-slate-50 border border-transparent rounded-xl px-3.5 py-2.5 text-xs outline-none focus:bg-white focus:border-sky-300 resize-none transition-all"
                />
                <button
                  onClick={() => saveMemo(selected.id)}
                  className="w-full mt-2 bg-sky-600 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-sky-500 shadow-sm transition-colors"
                >
                  메모 저장
                </button>
              </div>

              {/* 삭제 — 영구 삭제(확인 프롬프트) */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => deleteApp(selected.id)}
                  className="w-full flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-xl py-2.5 text-xs font-bold hover:bg-red-50 hover:border-red-300 transition-colors"
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
