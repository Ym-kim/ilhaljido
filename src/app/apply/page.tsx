'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, Sparkles, CreditCard, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { INTEREST_OPTIONS, REST_OPTIONS, JOB_TYPE_OPTIONS } from '@/lib/utils'

const PROGRAM_OPTIONS = [
  { value: '', label: '선택해 주세요' },
  { value: 'ai-sokcho', label: 'AI 활용 실무 집중 캠프 — 강원 속초 (6/12~15)' },
  { value: 'marketing-gapyeong', label: '온라인 마케팅 & 상세페이지 — 경기 가평 (6/26~29)' },
  { value: 'healing-taean', label: '번아웃 탈출 힐링 워케이션 — 충남 태안 (7/7~11)' },
  { value: 'network-chuncheon', label: '1인 기업가 네트워킹 캠프 — 강원 춘천 (7/23~26)' },
  { value: 'japan-osaka', label: '일본 시장조사 워케이션 (8월 예정)' },
  { value: 'design-tongyeong', label: '디자인 & 브랜딩 집중 캠프 — 경남 통영 (8월 예정)' },
  { value: 'undecided', label: '아직 정하지 않았어요 (추천받고 싶어요)' },
]

function ApplyForm() {
  const searchParams = useSearchParams()
  const programParam = searchParams.get('program') ?? ''

  const isYangyang = programParam.toLowerCase().includes('yangyang')

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    job_type: '', program_id: programParam,
    work_style: '', interests: [] as string[],
    rest_preferences: [] as string[],
    duration_preference: '', budget_range: '',
    date_preference: '',
    companion_count: '0',
    companion_names: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function toggleChip(field: 'interests' | 'rest_preferences', val: string) {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter(v => v !== val)
        : [...f[field], val],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('서버 오류')
      setDone(true)
    } catch {
      setError('신청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-16 px-6">
        <CheckCircle2 size={64} className="text-brand mx-auto mb-5" strokeWidth={1.5} />
        <h2 className="text-2xl font-black text-dark mb-3">신청이 접수되었습니다!</h2>
        <p className="text-muted leading-relaxed mb-8">
          입력하신 연락처로 <strong className="text-dark">3일 내 담당자가 직접 연락</strong>드립니다.<br />
          AI 맞춤 플랜도 이메일로 함께 보내드릴게요.
        </p>
        <Button asChild>
          <Link href="/programs">다른 프로그램 보기</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 이름 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">이름 <span className="text-red-500">*</span></label>
        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="홍길동" className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors" />
      </div>

      {/* 연락처 + 이메일 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">연락처 <span className="text-red-500">*</span></label>
          <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="010-0000-0000" className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">이메일 <span className="text-red-500">*</span></label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com" className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors" />
        </div>
      </div>

      {/* 직업 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">직업 / 업종 <span className="text-red-500">*</span></label>
        <select required value={form.job_type} onChange={e => setForm(f => ({ ...f, job_type: e.target.value }))}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors bg-white">
          <option value="">선택해 주세요</option>
          {JOB_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* 관심 프로그램 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">관심 프로그램 <span className="text-red-500">*</span></label>
        <select required value={form.program_id} onChange={e => setForm(f => ({ ...f, program_id: e.target.value }))}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors bg-white">
          {PROGRAM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* 업무 스타일 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">업무 스타일</label>
        <div className="space-y-2">
          {[
            { val: 'focus', label: '집중 근무가 필요해요 (업무 처리 목적)' },
            { val: 'relaxed', label: '여유롭게 일해도 돼요 (힐링 우선)' },
            { val: 'balanced', label: '반반이에요 (균형을 원해요)' },
          ].map(({ val, label }) => (
            <label key={val} className="flex items-center gap-2.5 cursor-pointer">
              <input type="radio" name="work_style" value={val}
                checked={form.work_style === val}
                onChange={() => setForm(f => ({ ...f, work_style: val }))}
                className="accent-brand w-4 h-4" />
              <span className="text-sm text-text">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 관심 자기개발 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">관심 있는 자기개발 분야</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => toggleChip('interests', opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.interests.includes(opt)
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 휴식 선호 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">선호하는 휴식 스타일</label>
        <div className="flex flex-wrap gap-2">
          {REST_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => toggleChip('rest_preferences', opt)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.rest_preferences.includes(opt)
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 양양 전용: 희망 참가 일정 */}
      {isYangyang && (
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            희망 참가 일정 <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              '6월 20일(금) – 6월 22일(일)',
              '6월 27일(금) – 6월 29일(일)',
              '7월 4일(금) – 7월 6일(일)',
              '미정 (일정 추천 받을게요)',
            ].map(opt => (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer p-3 rounded-xl border border-border hover:border-brand-mid transition-colors">
                <input type="radio" name="date_preference" value={opt}
                  checked={form.date_preference === opt}
                  onChange={() => setForm(f => ({ ...f, date_preference: opt }))}
                  className="accent-brand w-4 h-4 shrink-0" />
                <span className="text-sm text-text font-medium">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 동반 참가자 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">동반 참가자</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {['혼자 참가', '2명 (나 포함)', '3명 (나 포함)', '4명 이상'].map(opt => (
            <button key={opt} type="button"
              onClick={() => setForm(f => ({ ...f, companion_count: opt, companion_names: opt === '혼자 참가' ? '' : f.companion_names }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                form.companion_count === opt
                  ? 'bg-brand-pale border-brand text-brand'
                  : 'bg-white border-border text-muted hover:border-brand'
              }`}>
              {opt}
            </button>
          ))}
        </div>
        {form.companion_count !== '혼자 참가' && form.companion_count !== '0' && (
          <input value={form.companion_names}
            onChange={e => setForm(f => ({ ...f, companion_names: e.target.value }))}
            placeholder="동반 참가자 이름 (예: 김영희, 박철수)"
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors" />
        )}
      </div>

      {/* 기간 + 예산 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">희망 체류 기간</label>
          <select value={form.duration_preference} onChange={e => setForm(f => ({ ...f, duration_preference: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid bg-white">
            <option value="">선택</option>
            {['2박 3일', '3박 4일', '4박 5일', '5박 6일 이상', '미정'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1.5">1인 예산 (숙박 포함)</label>
          <select value={form.budget_range} onChange={e => setForm(f => ({ ...f, budget_range: e.target.value }))}
            className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid bg-white">
            <option value="">선택</option>
            {['50만원 이하', '50~100만원', '100~150만원', '150만원 이상', '미정'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* 메시지 */}
      <div>
        <label className="block text-sm font-bold text-dark mb-1.5">문의 사항 또는 전달할 내용</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={3} placeholder="궁금하신 점이나 특별히 고려해야 할 사항을 자유롭게 적어주세요."
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-brand-mid transition-colors resize-none" />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? '제출 중…' : '신청서 제출하기 →'}
      </Button>
      <p className="text-xs text-muted text-center">입력하신 정보는 프로그램 안내 목적으로만 사용됩니다.</p>
    </form>
  )
}

export default function ApplyPage() {
  return (
    <main className="pt-20 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-[6%] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-24">
            <p className="text-brand-mid text-xs font-black tracking-widest uppercase mb-3">APPLY NOW</p>
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight mb-3">지금 바로 신청하세요</h1>
            <p className="text-muted mb-8 leading-relaxed">
              아래 양식을 작성하시면 담당자가 3일 내 직접 연락드립니다.<br />
              AI 맞춤 플랜도 이메일로 함께 보내드릴게요.
            </p>
            <div className="space-y-3">
              {[
                { icon: <Phone size={18} strokeWidth={1.5} />, title: '신청 후 3일 내 담당자 직접 연락', desc: '신청서 확인 후 상세 일정과 준비사항을 안내드립니다.' },
                { icon: <Sparkles size={18} strokeWidth={1.5} />, title: 'AI 맞춤 워케이션 플랜 무료 제공', desc: '입력 정보를 분석해 나에게 딱 맞는 플랜을 무료로 제안합니다.' },
                { icon: <CreditCard size={18} strokeWidth={1.5} />, title: '확정 전까지 비용 발생 없음', desc: '담당자와 상담 후 최종 확정 시에만 결제가 진행됩니다.' },
                { icon: <RefreshCw size={18} strokeWidth={1.5} />, title: '출발 7일 전 취소 시 전액 환불', desc: '일정 변경 및 다음 회차 이월도 가능합니다.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 items-start p-4 bg-white rounded-xl border border-border">
                  <span className="text-brand mt-0.5 flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-sm font-bold text-dark">{title}</p>
                    <p className="text-xs text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 예약 확정 프로세스 */}
            <div className="mt-8 bg-brand-pale border border-brand/20 rounded-2xl p-5">
              <p className="text-xs font-black text-brand tracking-widest uppercase mb-4">예약 확정 프로세스</p>
              <ol className="space-y-3">
                {[
                  { step: '01', title: '신청서 제출', desc: '오른쪽 폼 작성 후 제출 (5분 소요)' },
                  { step: '02', title: '담당자 확인 연락', desc: '3일 내 전화 또는 문자로 직접 연락' },
                  { step: '03', title: '결제 링크 발송', desc: '일정 확인 후 이메일로 결제 링크 발송' },
                  { step: '04', title: '입금 완료 → 예약 확정', desc: '입금 확인 즉시 확정 문자 발송' },
                ].map(s => (
                  <li key={s.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{s.step}</span>
                    <div>
                      <p className="text-sm font-bold text-dark">{s.title}</p>
                      <p className="text-xs text-muted">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted mt-4 pt-3 border-t border-brand/10">
                💡 신청서 제출만으로는 예약이 확정되지 않아요. 담당자 확인 후 결제 링크를 받으셔야 최종 확정됩니다.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
            <h2 className="text-lg font-black text-dark mb-5 pb-4 border-b border-border">프로그램 신청 & 사전 진단</h2>
            <Suspense fallback={<div className="text-sm text-muted">로딩 중…</div>}>
              <ApplyForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
