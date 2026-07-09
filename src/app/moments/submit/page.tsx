'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Send, Camera } from 'lucide-react'
import { ICON_STROKE } from '@/lib/icons'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 와케이션 모먼트 제보 — UGC 2단계 (서버 비용 0)
// 저장: 기존 /api/applications 재활용 (job_type='모먼트 제보', message 구조화)
// 사진 업로드 인프라 없이 링크(인스타 게시물·드라이브 등)로 접수 → 검수 후
// moments.ts 등록 + 제보자 크레딧 표기 (게재 동의는 제출로 갈음, 문구 고지)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const T: Record<string, L> = {
  back: { KO: '홈', EN: 'Home', JP: 'ホーム' },
  title: { KO: '나의 와케이션 모먼트 제보', EN: 'Share your Wakation moment', JP: 'あなたのワーケーションの瞬間を投稿' },
  desc: {
    KO: '일과 휴가가 겹쳤던 당신의 순간을 보내주세요. 에디터 검수 후 홈 "와케이션 모먼트"에 크레딧과 함께 소개됩니다.',
    EN: 'Send us a moment where your work met vacation. After editor review it may appear in "Wakation Moments" on the home page, with credit.',
    JP: '仕事と休暇が重なったあなたの瞬間を送ってください。エディター確認後、ホームの「ワーケーションモーメント」にクレジット付きで紹介されます。',
  },
  name: { KO: '이름 (또는 닉네임)', EN: 'Name (or nickname)', JP: '名前（ニックネーム可）' },
  email: { KO: '이메일', EN: 'Email', JP: 'メールアドレス' },
  phone: { KO: '연락처', EN: 'Phone', JP: '電話番号' },
  insta: { KO: '인스타그램 (선택)', EN: 'Instagram (optional)', JP: 'Instagram（任意）' },
  city: { KO: '도시', EN: 'City', JP: '都市' },
  cityPh: { KO: '예: 다낭, 치앙마이, 제주…', EN: 'e.g. Da Nang, Chiang Mai, Jeju…', JP: '例: ダナン、チェンマイ、済州…' },
  photoLink: { KO: '사진 링크', EN: 'Photo link', JP: '写真リンク' },
  photoPh: {
    KO: '인스타 게시물·구글 드라이브 등 사진을 볼 수 있는 링크',
    EN: 'A link where we can view the photo (Instagram post, Drive, etc.)',
    JP: '写真が見られるリンク（Instagram投稿·Driveなど）',
  },
  caption: { KO: '한 줄 모먼트', EN: 'Your moment in one line', JP: 'ひとことモーメント' },
  captionPh: {
    KO: '예: 오전 회의 끝내고 바로 스노클링',
    EN: 'e.g. Morning stand-up, then straight into the water',
    JP: '例: 午前の会議を終えてすぐシュノーケリング',
  },
  story: { KO: '뒷이야기 (선택)', EN: 'The story behind it (optional)', JP: '背景ストーリー（任意）' },
  consent: {
    KO: '제출 시 사진·문구의 Wakation 게재(크레딧 표기)에 동의하는 것으로 간주됩니다. 게재 전 이메일로 확인을 드리며, 언제든 철회할 수 있습니다.',
    EN: 'By submitting you agree to publication on Wakation with credit. We confirm by email before publishing and you can withdraw anytime.',
    JP: '送信により、クレジット表記のうえWakationへの掲載に同意したものとみなされます。掲載前にメールで確認し、いつでも撤回できます。',
  },
  submit: { KO: '모먼트 보내기', EN: 'Send my moment', JP: 'モーメントを送る' },
  sending: { KO: '보내는 중…', EN: 'Sending…', JP: '送信中…' },
  doneT: { KO: '접수 완료!', EN: 'Received!', JP: '受付完了！' },
  doneD: {
    KO: '에디터가 확인 후 이메일로 게재 여부를 알려드릴게요. 보내주셔서 감사합니다.',
    EN: "Our editor will review it and email you about publication. Thank you!",
    JP: 'エディター確認後、掲載についてメールでお知らせします。ありがとうございます！',
  },
  fail: { KO: '전송에 실패했어요. 잠시 후 다시 시도해주세요.', EN: 'Failed to send. Please try again shortly.', JP: '送信に失敗しました。しばらくして再度お試しください。' },
}

type FormState = {
  name: string
  email: string
  phone: string
  insta: string
  city: string
  photoLink: string
  caption: string
  story: string
}

const EMPTY: FormState = {
  name: '', email: '', phone: '', insta: '', city: '', photoLink: '', caption: '', story: '',
}

export default function MomentSubmitPage() {
  const { lang } = useLang()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)
    // 구조화 직렬화 — admin 대시보드(message 필드)에서 그대로 읽힘. 1000자 제한 준수
    const structured = [
      `[모먼트 제보]`,
      `도시: ${form.city}`,
      `사진: ${form.photoLink}`,
      `한줄: ${form.caption}`,
      form.insta ? `인스타: ${form.insta}` : '',
      form.story ? `이야기: ${form.story}` : '',
    ].filter(Boolean).join('\n').slice(0, 1000)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          job_type: '모먼트 제보',
          message: structured,
        }),
      })
      if (!res.ok) throw new Error('submit failed')
      setDone(true)
    } catch {
      setError(T.fail[lang])
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
  const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-8 pb-2">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] text-xs font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={ICON_STROKE} />
            {T.back[lang]}
          </Link>
        </div>
      </div>

      <section className="px-6 pt-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-1.5 text-brand-mid text-[0.6875rem] font-semibold tracking-[0.08em] uppercase mb-3">
            <Camera className="w-3.5 h-3.5" strokeWidth={ICON_STROKE} />
            Wakation Moments
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {T.title[lang]}
          </h1>
          <p className="text-[#64748b] text-sm leading-relaxed mb-10">{T.desc[lang]}</p>

          {done ? (
            <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-brand-mid mx-auto mb-4" strokeWidth={ICON_STROKE} />
              <p className="text-[#111827] font-black text-lg mb-2">{T.doneT[lang]}</p>
              <p className="text-[#64748b] text-sm">{T.doneD[lang]}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{T.name[lang]} *</label>
                  <input required value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.email[lang]} *</label>
                  <input required type="email" value={form.email} onChange={set('email')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.phone[lang]} *</label>
                  <input required value={form.phone} onChange={set('phone')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.insta[lang]}</label>
                  <input value={form.insta} onChange={set('insta')} className={inputCls} placeholder="@" />
                </div>
              </div>

              <div className="h-px bg-[#e0f2fe]" />

              <div>
                <label className={labelCls}>{T.city[lang]} *</label>
                <input required value={form.city} onChange={set('city')} className={inputCls} placeholder={T.cityPh[lang]} />
              </div>
              <div>
                <label className={labelCls}>{T.photoLink[lang]} *</label>
                <input required type="url" value={form.photoLink} onChange={set('photoLink')} className={inputCls} placeholder={T.photoPh[lang]} />
              </div>
              <div>
                <label className={labelCls}>{T.caption[lang]} *</label>
                <input required value={form.caption} onChange={set('caption')} className={inputCls} placeholder={T.captionPh[lang]} maxLength={60} />
              </div>
              <div>
                <label className={labelCls}>{T.story[lang]}</label>
                <textarea value={form.story} onChange={set('story')} rows={3} className={inputCls} />
              </div>

              <p className="text-[#94a3b8] text-[0.6875rem] leading-relaxed">{T.consent[lang]}</p>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light disabled:opacity-60 text-white font-bold text-[0.9375rem] px-6 py-4 rounded-2xl transition-all shadow-[0_6px_24px_rgba(2,132,199,0.35)]"
              >
                <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {sending ? T.sending[lang] : T.submit[lang]}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
