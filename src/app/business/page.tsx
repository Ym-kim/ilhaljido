'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, ArrowUpRight, Building2, CheckCircle2, ClipboardList,
  HandCoins, Lightbulb, MessageCircle, Send, Users, Zap,
} from 'lucide-react'
import { track } from '@vercel/analytics/react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import { getSupportPrograms } from '@/lib/i18n'
import { ConsentCheckbox } from '@/components/legal/ConsentCheckbox'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 기업·팀 워케이션 B2B 랜딩 — 더휴일(thehyuil.co.kr) 벤치마크 2026-07-15
// 훅: 지자체 지원사업 연계(실보유 SUPPORT_PROGRAMS 데이터) + 양양 1기 실측 실증
// 저장: /api/applications 재활용 (job_type='기업 워케이션 문의', message에 구조화)
// 정직 원칙: 실데이터·실제 가능한 서비스 범위만. 컨설턴트·전담팀 등 허위 조직 표현 금지
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>
const T: Record<string, L> = {
  eyebrow: { KO: 'For Teams & Companies', EN: 'For Teams & Companies', JP: 'For Teams & Companies' },
  title_pre: { KO: '팀이 함께 떠나는 ', EN: 'Workations that ', JP: 'チームで行く' },
  title_accent: { KO: '워케이션', EN: 'move your team', JP: 'ワーケーション' },
  sub: {
    KO: '몰입 워크와 리프레시를 한 번에. 팀 규모·일정에 맞춰 기획하고, 활용 가능한 지자체 지원사업 정보까지 함께 정리해 드립니다.',
    EN: 'Deep work and recovery in one trip. We plan around your team size and schedule, and map out applicable local subsidy programs.',
    JP: '集中ワークとリフレッシュを一度に。チーム規模・日程に合わせて企画し、活用できる自治体支援事業の情報もまとめてご案内します。',
  },
  cta_form: { KO: '도입 문의하기', EN: 'Send an inquiry', JP: '導入を問い合わせる' },
  cta_kakao: { KO: '카카오톡 문의', EN: 'KakaoTalk chat', JP: 'カカオトーク相談' },
  // 실증 스탯 (양양 1기 실측 — /report/yangyang)
  proof_title: { KO: '1기 운영 실측 데이터', EN: 'Measured from our 1st cohort', JP: '第1期の実測データ' },
  proof_sat: { KO: '참가 만족도', EN: 'Satisfaction', JP: '参加満足度' },
  proof_again: { KO: '재참여 의향', EN: 'Would join again', JP: '再参加意向' },
  proof_link: { KO: '양양 1기 결과 리포트 보기', EN: 'See the Yangyang cohort report', JP: '襄陽第1期レポートを見る' },
  // 왜 팀 워케이션
  why_eyebrow: { KO: 'Why team workation', EN: 'Why team workation', JP: 'Why team workation' },
  why_title: { KO: '팀 워케이션이 만드는 것', EN: 'What a team workation builds', JP: 'チームワーケーションがつくるもの' },
  why1_t: { KO: '몰입 워크', EN: 'Deep work', JP: '集中ワーク' },
  why1_d: {
    KO: '일상 업무 공간을 벗어난 집중 블록. 스프린트·기획 합숙·분기 회고에 적합합니다.',
    EN: 'Focus blocks away from the daily office — ideal for sprints, planning offsites and quarterly retros.',
    JP: '日常から離れた集中ブロック。スプリント・企画合宿・四半期振り返りに最適。',
  },
  why2_t: { KO: '팀 결속', EN: 'Team bonding', JP: 'チーム結束' },
  why2_d: {
    KO: '같이 일하고 같이 쉬는 경험이 온보딩·협업 밀도를 높입니다.',
    EN: 'Working and resting together raises onboarding quality and collaboration density.',
    JP: '一緒に働き一緒に休む経験が、オンボーディングと協働の密度を高めます。',
  },
  why3_t: { KO: '복지 시그널', EN: 'A real benefit', JP: '福利厚生シグナル' },
  why3_d: {
    KO: '구성원이 체감하는 복지. 채용 브랜딩에도 실질적인 스토리가 됩니다.',
    EN: 'A benefit employees actually feel — and a genuine story for hiring.',
    JP: 'メンバーが体感できる福利厚生。採用ブランディングにも実質的なストーリーに。',
  },
  // 지원사업 연계 (더휴일 '지원금 연계' 벤치 — 실데이터)
  sup_eyebrow: { KO: 'Subsidy match', EN: 'Subsidy match', JP: '支援事業マッチ' },
  sup_title_pre: { KO: '지자체 지원사업 ', EN: 'Local subsidy programs, ', JP: '自治体支援事業を' },
  sup_title_accent: { KO: '연계 정보', EN: 'mapped for you', JP: '連携案内' },
  sup_desc: {
    KO: '제주·부산·강원 등 지자체 워케이션 지원사업 공고를 상시 정리하고 있습니다. 문의 주시면 팀 조건에 맞는 사업을 함께 확인해 드립니다.',
    EN: 'We keep an updated list of official local workation subsidy notices (Jeju, Busan, Gangwon and more) and check which ones fit your team.',
    JP: '済州・釜山・江原など自治体ワーケーション支援事業の公告を常時整理。チーム条件に合う事業を一緒に確認します。',
  },
  sup_all: { KO: '지원사업 전체 보기', EN: 'View all subsidies', JP: '支援事業をすべて見る' },
  sup_notice: {
    KO: '* 공고 정보는 조사 시점 기준이며, 정확한 조건은 각 공식 공고에서 확인됩니다. Wakation은 지원사업의 운영 주체가 아닙니다.',
    EN: '* Details are as of our research date; confirm conditions in each official notice. Wakation does not operate these programs.',
    JP: '* 情報は調査時点のものです。正確な条件は各公式公告でご確認ください。Wakationは運営主体ではありません。',
  },
  // 도입 프로세스
  how_eyebrow: { KO: 'How it works', EN: 'How it works', JP: 'How it works' },
  how_title: { KO: '도입은 이렇게 진행됩니다', EN: 'How adoption works', JP: '導入の流れ' },
  how1_t: { KO: '문의 접수', EN: 'Inquiry', JP: 'お問い合わせ' },
  how1_d: {
    KO: '팀 규모·희망 시기·지역·목적을 알려주세요. 이메일로 회신드립니다.',
    EN: 'Tell us your team size, timing, region and goals. We reply by email.',
    JP: 'チーム規模・希望時期・地域・目的をお知らせください。メールで返信します。',
  },
  how2_t: { KO: '기획안 제안', EN: 'Proposal', JP: '企画のご提案' },
  how2_d: {
    KO: '검증된 숙소·업무 공간과 일정 구성, 활용 가능한 지원사업 정보를 정리해 제안합니다.',
    EN: 'We propose verified stays, workspaces, an itinerary — plus applicable subsidy information.',
    JP: '検証済みの宿・ワークスペースと日程構成、活用可能な支援事業情報をご提案。',
  },
  how3_t: { KO: '실행', EN: 'Run', JP: '実行' },
  how3_d: {
    KO: '확정된 기획에 따라 진행합니다. 운영 실측 데이터는 1기 리포트에서 확인하실 수 있습니다.',
    EN: 'We run the confirmed plan. See our measured results in the cohort report.',
    JP: '確定した企画に沿って実行。運営実測データは第1期レポートでご確認いただけます。',
  },
  // 폼
  form_eyebrow: { KO: 'Inquiry', EN: 'Inquiry', JP: 'Inquiry' },
  form_title: { KO: '기업·팀 워케이션 문의', EN: 'Team workation inquiry', JP: '企業・チームワーケーション問い合わせ' },
  form_desc: {
    KO: '아래 내용을 남겨주시면 확인 후 이메일로 회신드립니다.',
    EN: 'Leave your details and we will reply by email.',
    JP: '以下をご記入いただければ、確認後メールで返信します。',
  },
  f_name: { KO: '담당자 성함', EN: 'Contact name', JP: 'ご担当者名' },
  f_phone: { KO: '연락처', EN: 'Phone', JP: '連絡先' },
  f_email: { KO: '이메일', EN: 'Email', JP: 'メール' },
  f_company: { KO: '회사·팀명', EN: 'Company / team', JP: '会社・チーム名' },
  f_biztype: { KO: '기업 유형', EN: 'Company type', JP: '企業タイプ' },
  f_biztype_ph: { KO: '선택해 주세요', EN: 'Please select', JP: '選択してください' },
  f_location: { KO: '기업 소재지', EN: 'Company location', JP: '企業所在地' },
  f_location_ph: { KO: '예: 서울 / 경기 성남 (지원사업 매칭용)', EN: 'e.g. Seoul / Gyeonggi (for subsidy matching)', JP: '例: ソウル / 京畿（支援事業マッチ用）' },
  f_size: { KO: '예상 인원', EN: 'Team size', JP: '予定人数' },
  f_size_ph: { KO: '예: 8명', EN: 'e.g. 8', JP: '例: 8名' },
  f_region: { KO: '희망 지역', EN: 'Preferred region', JP: '希望地域' },
  f_region_ph: { KO: '예: 강원 양양 / 제주 / 미정', EN: 'e.g. Gangwon / Jeju / undecided', JP: '例: 江原 / 済州 / 未定' },
  f_when: { KO: '희망 일정', EN: 'Preferred dates', JP: '希望日程' },
  f_when_ph: { KO: '예: 9월 중 2박 3일', EN: 'e.g. 3 days in September', JP: '例: 9月中 2泊3日' },
  f_msg: { KO: '문의 내용', EN: 'Message', JP: 'お問い合わせ内容' },
  f_msg_ph: {
    KO: '목적(워크숍·팀빌딩·복지 등), 예산 범위, 기타 요청 사항을 자유롭게 남겨주세요.',
    EN: 'Purpose (offsite, bonding, benefits…), budget range, and any requests.',
    JP: '目的（合宿・チームビルディング・福利厚生など）、予算感、その他ご要望を自由に。',
  },
  f_submit: { KO: '문의 보내기', EN: 'Send inquiry', JP: '送信する' },
  f_sending: { KO: '전송 중…', EN: 'Sending…', JP: '送信中…' },
  f_done_t: { KO: '문의가 접수되었습니다', EN: 'Inquiry received', JP: 'お問い合わせを受け付けました' },
  f_done_d: {
    KO: '남겨주신 이메일로 회신드리겠습니다. 감사합니다.',
    EN: 'We will get back to you at the email you provided. Thank you.',
    JP: 'ご記入のメールアドレスへ返信いたします。ありがとうございます。',
  },
  f_fail: { KO: '전송에 실패했어요. 잠시 후 다시 시도해주세요.', EN: 'Failed to send — please try again shortly.', JP: '送信に失敗しました。しばらくして再度お試しください。' },
  f_consent_need: { KO: '개인정보 수집·이용에 동의해주세요.', EN: 'Please agree to the privacy terms.', JP: '個人情報の収集・利用に同意してください。' },
}

const STATUS_STYLE: Record<string, string> = {
  open: 'bg-teal-500 text-white',
  always: 'bg-brand-mid text-white',
  upcoming: 'bg-amber-100 text-amber-700 border border-amber-200',
  check: 'bg-gray-100 text-gray-500 border border-gray-200',
}

// 기업 유형 — 지원사업 자격 판단에 실질적으로 쓰이는 구분 (더휴일 '지원금 연계' 벤치)
const BIZ_TYPES: { v: string; l: L }[] = [
  { v: 'startup', l: { KO: '스타트업', EN: 'Startup', JP: 'スタートアップ' } },
  { v: 'sme', l: { KO: '중소기업', EN: 'SME', JP: '中小企業' } },
  { v: 'enterprise', l: { KO: '중견·대기업', EN: 'Mid–large enterprise', JP: '中堅・大企業' } },
  { v: 'public', l: { KO: '공공·비영리', EN: 'Public / non-profit', JP: '公共・非営利' } },
  { v: 'solo', l: { KO: '개인사업자·프리랜서', EN: 'Solo / freelancer', JP: '個人事業主・フリーランス' } },
]

type FormState = {
  name: string; phone: string; email: string; company: string
  bizType: string; location: string; size: string; region: string; when: string; message: string
}
const EMPTY: FormState = { name: '', phone: '', email: '', company: '', bizType: '', location: '', size: '', region: '', when: '', message: '' }

export default function BusinessPage() {
  const { lang } = useLang()
  const t = (k: string) => T[k][lang]
  const programs = getSupportPrograms(lang)
  const topPrograms = programs.slice(0, 4)

  const [form, setForm] = useState<FormState>(EMPTY)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const bizTypeLabel = BIZ_TYPES.find((b) => b.v === form.bizType)?.l[lang] ?? form.bizType

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!consent) { setError(t('f_consent_need')); return }
    setSending(true)
    // 구조화 직렬화 — admin 대시보드 message 필드에서 그대로 읽힘 (1000자 제한)
    const structured = [
      `[기업 워케이션 문의]`,
      `회사·팀: ${form.company}`,
      form.bizType ? `기업 유형: ${bizTypeLabel}` : '',
      form.location ? `소재지: ${form.location}` : '',
      form.size ? `인원: ${form.size}` : '',
      form.region ? `희망 지역: ${form.region}` : '',
      form.when ? `희망 일정: ${form.when}` : '',
      form.message ? `내용: ${form.message}` : '',
      `(${lang})`,
    ].filter(Boolean).join('\n').slice(0, 1000)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          job_type: '기업 워케이션 문의',
          message: structured,
        }),
      })
      if (!res.ok) throw new Error('submit failed')
      setDone(true)
      try { track('business_inquiry_submitted') } catch { /* 계측 실패 무시 */ }
    } catch {
      setError(t('f_fail'))
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
  const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'

  return (
    <div className="min-h-screen bg-white">
      {/* ── 히어로 ── */}
      <section className="relative bg-[#f0f9ff] border-b border-[#dbeafe] px-6 pt-14 pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            {t('eyebrow')}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111827] tracking-tight mb-4">
            {t('title_pre')}<span className="text-brand-mid">{t('title_accent')}</span>
          </h1>
          <p className="text-[#64748b] text-sm md:text-base leading-relaxed max-w-xl mb-8">{t('sub')}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#inquiry" className="inline-flex items-center gap-2 bg-brand-mid text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              {t('cta_form')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </a>
            <a
              href="http://pf.kakao.com/_xiPxbXG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-[#dbeafe] text-[#334155] text-sm font-bold px-6 py-3 rounded-xl hover:border-[#7dd3fc] transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={ICON_STROKE} /> {t('cta_kakao')}
            </a>
          </div>
        </div>
      </section>

      {/* ── 실증 스탯 (양양 1기 실측) ── */}
      <section className="px-6 py-10 border-b border-[#f1f5f9]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
          <p className="text-[#94a3b8] text-xs font-bold uppercase tracking-wider shrink-0">{t('proof_title')}</p>
          <div className="flex gap-10">
            <div>
              <p className="text-2xl font-bold text-[#111827]">4.7<span className="text-[#94a3b8] text-sm font-semibold">/5</span></p>
              <p className="text-[#64748b] text-xs mt-0.5">{t('proof_sat')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">100<span className="text-[#94a3b8] text-sm font-semibold">%</span></p>
              <p className="text-[#64748b] text-xs mt-0.5">{t('proof_again')}</p>
            </div>
          </div>
          <Link
            href="/report/yangyang"
            className="inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:underline sm:ml-auto"
          >
            {t('proof_link')} <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </div>
      </section>

      {/* ── 왜 팀 워케이션 ── */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3">{t('why_eyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight mb-8">{t('why_title')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Zap, tt: 'why1_t', dd: 'why1_d' },
              { icon: Users, tt: 'why2_t', dd: 'why2_d' },
              { icon: Lightbulb, tt: 'why3_t', dd: 'why3_d' },
            ].map(({ icon: Icon, tt, dd }) => (
              <div key={tt} className="bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:border-[#7dd3fc] hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} />
                </div>
                <h3 className="text-[#111827] font-bold mb-2">{t(tt)}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{t(dd)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 지원사업 연계 (실데이터) ── */}
      <section className="px-6 py-14 bg-[#f8fafc] border-y border-[#f1f5f9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3 flex items-center gap-2">
                <HandCoins className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
                {t('sup_eyebrow')}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight mb-3">
                {t('sup_title_pre')}<span className="text-brand-mid">{t('sup_title_accent')}</span>
              </h2>
              <p className="text-[#64748b] text-sm leading-relaxed max-w-xl">{t('sup_desc')}</p>
            </div>
            <Link
              href="/programs/support"
              className="hidden sm:inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold hover:underline whitespace-nowrap shrink-0"
            >
              {t('sup_all')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPrograms.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#7dd3fc] hover:shadow-md transition-all"
              >
                <div className="relative h-28 overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-2.5 left-2.5 text-[0.625rem] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>
                    {p.statusLabel}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[#94a3b8] text-[0.6875rem] font-bold mb-1">{p.region}</p>
                  <h3 className="text-[#111827] text-sm font-bold leading-snug line-clamp-2 mb-1.5">{p.name}</h3>
                  {p.maxBenefit && <p className="text-brand-mid text-xs font-bold">{p.maxBenefit}</p>}
                </div>
              </a>
            ))}
          </div>

          <Link
            href="/programs/support"
            className="sm:hidden mt-5 inline-flex items-center gap-1.5 text-brand-mid text-sm font-bold"
          >
            {t('sup_all')} <ArrowRight className="w-4 h-4" strokeWidth={ICON_STROKE} />
          </Link>

          <p className="text-[#94a3b8] text-[0.6875rem] leading-relaxed mt-6">{t('sup_notice')}</p>
        </div>
      </section>

      {/* ── 도입 프로세스 ── */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3">{t('how_eyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight mb-8">{t('how_title')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '1', tt: 'how1_t', dd: 'how1_d', icon: ClipboardList },
              { n: '2', tt: 'how2_t', dd: 'how2_d', icon: Lightbulb },
              { n: '3', tt: 'how3_t', dd: 'how3_d', icon: CheckCircle2 },
            ].map(({ n, tt, dd, icon: Icon }) => (
              <div key={n} className="relative bg-white border border-[#e2e8f0] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-brand-mid text-white text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
                  <Icon className="w-4 h-4 text-[#94a3b8]" strokeWidth={ICON_STROKE} />
                </div>
                <h3 className="text-[#111827] font-bold mb-2">{t(tt)}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{t(dd)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 문의 폼 ── */}
      <section id="inquiry" className="px-6 py-14 bg-[#f0f9ff] border-t border-[#dbeafe] scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3">{t('form_eyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight mb-3">{t('form_title')}</h2>
          <p className="text-[#64748b] text-sm leading-relaxed mb-8">{t('form_desc')}</p>

          {done ? (
            <div className="bg-white border border-[#bae6fd] rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-brand-mid mx-auto mb-4" strokeWidth={ICON_STROKE} />
              <p className="text-[#111827] font-bold text-lg mb-2">{t('f_done_t')}</p>
              <p className="text-[#64748b] text-sm">{t('f_done_d')}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="business-name" className={labelCls}>{t('f_name')} *</label>
                  <input id="business-name" required value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-phone" className={labelCls}>{t('f_phone')} *</label>
                  <input id="business-phone" required type="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-email" className={labelCls}>{t('f_email')} *</label>
                  <input id="business-email" required type="email" value={form.email} onChange={set('email')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-company" className={labelCls}>{t('f_company')} *</label>
                  <input id="business-company" required value={form.company} onChange={set('company')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-biztype" className={labelCls}>{t('f_biztype')}</label>
                  <select id="business-biztype" value={form.bizType} onChange={set('bizType')} className={inputCls}>
                    <option value="">{t('f_biztype_ph')}</option>
                    {BIZ_TYPES.map((b) => (
                      <option key={b.v} value={b.v}>{b.l[lang]}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="business-location" className={labelCls}>{t('f_location')}</label>
                  <input id="business-location" value={form.location} onChange={set('location')} placeholder={t('f_location_ph')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-size" className={labelCls}>{t('f_size')}</label>
                  <input id="business-size" value={form.size} onChange={set('size')} placeholder={t('f_size_ph')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="business-region" className={labelCls}>{t('f_region')}</label>
                  <input id="business-region" value={form.region} onChange={set('region')} placeholder={t('f_region_ph')} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="business-when" className={labelCls}>{t('f_when')}</label>
                  <input id="business-when" value={form.when} onChange={set('when')} placeholder={t('f_when_ph')} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="business-message" className={labelCls}>{t('f_msg')}</label>
                <textarea
                  id="business-message"
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t('f_msg_ph')}
                  maxLength={600}
                  className={inputCls}
                />
              </div>

              <ConsentCheckbox checked={consent} onChange={setConsent} />

              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-mid text-white text-sm font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {sending ? t('f_sending') : t('f_submit')}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
