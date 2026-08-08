'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Send } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/context/LanguageContext'
import { ConsentCheckbox } from '@/components/legal/ConsentCheckbox'
import { localizeHref } from '@/lib/i18n/localePath'
import { trackEvent } from '@/lib/track'
import type { Lang } from '@/lib/i18n/types'

type L = Record<Lang, string>
type FormState = {
  nickname: string
  destination: string
  visitedAt: string
  tripType: string
  title: string
  summary: string
  story: string
  workTip: string
  photoLink: string
}

const EMPTY: FormState = { nickname: '', destination: '', visitedAt: '', tripType: 'solo', title: '', summary: '', story: '', workTip: '', photoLink: '' }

const UI: Record<string, L> = {
  back: { KO: '여행자 노트로 돌아가기', EN: 'Back to Traveler Notes', JP: 'トラベラーノートへ戻る' },
  eyebrow: { KO: 'Member contribution', EN: 'Member contribution', JP: 'Member contribution' },
  title: { KO: '다녀온 도시의\n진짜 쓸모를 남겨주세요', EN: 'Share what was actually\nuseful in the city', JP: '滞在した街で\n本当に役立ったことを' },
  desc: { KO: '완벽한 여행기보다 다음 사람이 판단할 수 있는 정보가 좋아요. 업무 환경, 이동, 계절, 불편했던 점까지 솔직하게 적어주세요.', EN: 'Useful context matters more than a perfect travel essay. Be honest about workspaces, transport, seasonality and inconveniences.', JP: '完璧な旅行記より、次の人が判断できる情報を。仕事環境、移動、季節、不便だった点まで率直に教えてください。' },
  policy1: { KO: '실제로 경험한 내용만', EN: 'Only first-hand experience', JP: '実際に体験した内容のみ' },
  policy2: { KO: '공개 전 에디터 확인', EN: 'Editor review before publication', JP: '公開前に編集部が確認' },
  policy3: { KO: '사진 없이도 작성 가능', EN: 'Photo is optional', JP: '写真なしでも投稿可能' },
  loginTitle: { KO: '가입자만 여행 노트를 쓸 수 있어요', EN: 'Members can write travel notes', JP: '会員のみ旅のノートを投稿できます' },
  loginDesc: { KO: '작성자를 보호하고 수정·삭제 요청을 연결하기 위해 로그인이 필요합니다.', EN: 'Sign-in connects your note to you so publication, edits and deletion requests can be handled safely.', JP: '投稿者を保護し、修正・削除依頼につなげるためログインが必要です。' },
  login: { KO: '로그인하고 작성하기', EN: 'Sign in to write', JP: 'ログインして書く' },
  account: { KO: '작성 계정', EN: 'Writing account', JP: '投稿アカウント' },
  accountNote: { KO: '이메일은 확인 연락에만 사용하며 공개하지 않습니다.', EN: 'Your email is used for editorial contact and is never published.', JP: 'メールは確認連絡にのみ使用し、公開しません。' },
  nickname: { KO: '공개할 이름 또는 닉네임', EN: 'Public name or nickname', JP: '公開する名前・ニックネーム' },
  destination: { KO: '여행지', EN: 'Destination', JP: '行き先' },
  destinationPh: { KO: '예: 후쿠오카, 제주, 부산', EN: 'e.g. Fukuoka, Jeju, Busan', JP: '例: 福岡、済州、釜山' },
  visitedAt: { KO: '다녀온 시기', EN: 'When you visited', JP: '訪れた時期' },
  visitedAtHelp: { KO: '월 단위까지만 공개합니다.', EN: 'Only the month is shown publicly.', JP: '公開は月単位です。' },
  tripType: { KO: '여행 방식', EN: 'Travel style', JP: '旅のスタイル' },
  titleLabel: { KO: '노트 제목', EN: 'Note title', JP: 'ノートのタイトル' },
  titlePh: { KO: '예: 오전 회의 뒤, 바다까지 걸었던 제주', EN: 'e.g. Jeju, where I walked to the sea after morning calls', JP: '例: 午前の会議後、海まで歩いた済州' },
  summary: { KO: '한 줄 요약', EN: 'One-line takeaway', JP: 'ひとこと要約' },
  summaryPh: { KO: '누구에게 어떤 점이 잘 맞았는지 적어주세요.', EN: 'Who would this city suit, and why?', JP: 'どんな人に、何が合っていたか教えてください。' },
  story: { KO: '여행지 리뷰·소개', EN: 'Destination review', JP: '行き先のレビュー・紹介' },
  storyPh: { KO: '업무 장소, 하루 동선, 좋았던 점과 불편했던 점을 구체적으로 적어주세요.', EN: 'Describe your workspace, daily route, what worked and what did not.', JP: '仕事場所、一日の動線、良かった点と不便だった点を具体的に。' },
  workTip: { KO: '일하며 머물 때의 팁', EN: 'Tip for working while there', JP: '働きながら滞在するヒント' },
  workTipPh: { KO: '예: 오전 화상회의는 숙소에서, 오후 작업은 해변 근처 카페에서', EN: 'e.g. Morning calls at the stay, afternoon work near the beach', JP: '例: 午前の会議は宿、午後の作業は海辺のカフェ' },
  photoLink: { KO: '사진 링크 (선택)', EN: 'Photo link (optional)', JP: '写真リンク（任意）' },
  photoHelp: { KO: '본인이 촬영했거나 게시 권한이 있는 사진만 보내주세요. 공개 전 별도로 확인합니다.', EN: 'Only share a photo you took or have permission to publish. We confirm it separately before publication.', JP: 'ご自身で撮影した写真、または掲載許可のある写真のみ。公開前に別途確認します。' },
  photoRights: { KO: '사진을 직접 촬영했거나 Wakation에 게시할 권한이 있습니다.', EN: 'I took this photo or have the right to let Wakation publish it.', JP: 'この写真を自分で撮影した、またはWakationへの掲載権限があります。' },
  editorialNote: { KO: '제출 즉시 공개되지 않습니다. Wakation 편집팀이 개인정보·과장 표현·사진 권리를 확인하고, 필요한 경우 이메일로 수정 동의를 요청합니다.', EN: 'Submission does not publish immediately. Wakation editors review privacy, claims and image rights, and may email you for approval of edits.', JP: '送信後すぐには公開されません。編集部が個人情報・誇張表現・写真の権利を確認し、必要に応じて修正同意をメールで依頼します。' },
  submit: { KO: '검수 요청 보내기', EN: 'Send for review', JP: '確認を依頼する' },
  sending: { KO: '보내는 중…', EN: 'Sending…', JP: '送信中…' },
  doneTitle: { KO: '여행 노트를 받았어요', EN: 'Your travel note is in', JP: '旅のノートを受け取りました' },
  doneDesc: { KO: '검수 상태는 마이페이지에서 확인할 수 있습니다. 공개가 결정되면 계정 이메일로 안내할게요.', EN: 'You can check review status in My Page. We will email your account address if it is selected for publication.', JP: '確認状況はマイページで確認できます。公開が決まった場合はアカウントのメールへご連絡します。' },
  mypage: { KO: '마이페이지에서 확인', EN: 'Check in My Page', JP: 'マイページで確認' },
  fail: { KO: '접수하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해주세요.', EN: 'We could not receive your note. Check the form and try again.', JP: '投稿を受け付けられませんでした。内容を確認して再度お試しください。' },
}

const TRIP_TYPES = [
  { value: 'solo', label: { KO: '혼자', EN: 'Solo', JP: 'ひとり' } },
  { value: 'friends', label: { KO: '친구와', EN: 'With friends', JP: '友人と' } },
  { value: 'couple', label: { KO: '둘이', EN: 'As a pair', JP: 'ふたりで' } },
  { value: 'family', label: { KO: '가족과', EN: 'With family', JP: '家族と' } },
  { value: 'workation', label: { KO: '워케이션', EN: 'Workation', JP: 'ワーケーション' } },
  { value: 'long_stay', label: { KO: '장기체류', EN: 'Long stay', JP: '長期滞在' } },
] satisfies { value: string; label: L }[]

export function TravelerNoteSubmitView({ forceLang }: { forceLang?: Lang } = {}) {
  const { lang: ctxLang, setLang } = useLang()
  const lang = forceLang ?? ctxLang
  const { user, loading } = useAuth()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [photoRightsConfirmed, setPhotoRightsConfirmed] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (forceLang && forceLang !== ctxLang) setLang(forceLang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceLang])

  const set = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((prev) => ({ ...prev, [key]: event.target.value }))
  const backHref = localizeHref('/moments', lang)
  const redirect = encodeURIComponent(localizeHref('/moments/submit', lang))

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setSending(true)
    setError('')
    try {
      const response = await fetch('/api/moments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, privacyConsent, photoRightsConfirmed }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error || UI.fail[lang])
      trackEvent('traveler_note_submit', { destination: form.destination, trip_type: form.tripType, locale: lang })
      setDone(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : UI.fail[lang])
    } finally {
      setSending(false)
    }
  }

  const inputClass = 'min-w-0 w-full rounded-none border border-[#d5d0c6] bg-white px-4 py-3.5 text-sm text-[#1d2926] outline-none transition-colors placeholder:text-[#a5a49d] focus:border-[#1a7071] focus:ring-2 focus:ring-[#cce8e5]'
  const labelClass = 'mb-2 block text-xs font-bold text-[#46534e]'

  return (
    <main className="min-h-screen bg-[#f7f4ed]">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link href={backHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#646b65] hover:text-[#176d70]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {UI.back[lang]}</Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-18 pt-6 md:grid-cols-[0.78fr_1.22fr] md:gap-16 md:pb-24 md:pt-10">
        <header className="md:sticky md:top-24 md:self-start">
          <span className="text-[0.7rem] font-bold tracking-[0.16em] text-[#1a7071] uppercase">{UI.eyebrow[lang]}</span>
          <h1 className="mt-4 whitespace-pre-line text-[clamp(2.6rem,5.5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#17211f]">{UI.title[lang]}</h1>
          <p className="mt-6 text-base leading-relaxed text-[#616861]">{UI.desc[lang]}</p>
          <div className="mt-8 space-y-3 border-t border-[#d3ccc0] pt-6 text-sm font-semibold text-[#516059]">
            {[UI.policy1[lang], UI.policy2[lang], UI.policy3[lang]].map((item, index) => <p key={item} className="grid grid-cols-[1.6rem_1fr] gap-2"><span className="text-[#1a7071]">0{index + 1}</span><span>{item}</span></p>)}
          </div>
        </header>

        <div>
          {loading ? (
            <div className="min-h-80 animate-pulse border border-[#d8d2c7] bg-white" />
          ) : !user ? (
            <div className="border border-[#d2ccc0] bg-white p-7 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e2efec] text-[#195f61]"><LockKeyhole className="h-5 w-5" aria-hidden="true" /></div>
              <h2 className="mt-6 text-2xl font-bold text-[#1d2926]">{UI.loginTitle[lang]}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#666c66]">{UI.loginDesc[lang]}</p>
              <Link href={`/login?redirect=${redirect}`} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173235] px-6 py-3 text-sm font-bold text-white hover:bg-[#245156]">{UI.login[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          ) : done ? (
            <div className="border border-[#b9d9d3] bg-[#edf6f3] p-8 text-center md:p-12">
              <CheckCircle2 className="mx-auto h-10 w-10 text-[#1a7071]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-[#1d302d]">{UI.doneTitle[lang]}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5e6b65]">{UI.doneDesc[lang]}</p>
              <Link href="/mypage" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173235] px-6 py-3 text-sm font-bold text-white hover:bg-[#245156]">{UI.mypage[lang]} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          ) : (
            <form onSubmit={submit} className="border border-[#d2ccc0] bg-white p-6 md:p-9">
              <div className="border-b border-[#e2ddd4] pb-6">
                <p className="text-xs font-bold text-[#53605a]">{UI.account[lang]}</p>
                <p className="mt-1 break-all text-sm font-semibold text-[#1f302c]">{user.email}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#82847e]">{UI.accountNote[lang]}</p>
              </div>

              <div className="mt-7 grid min-w-0 gap-5 sm:grid-cols-2">
                <div className="min-w-0"><label htmlFor="note-nickname" className={labelClass}>{UI.nickname[lang]} *</label><input id="note-nickname" required maxLength={40} value={form.nickname} onChange={set('nickname')} className={inputClass} /></div>
                <div className="min-w-0"><label htmlFor="note-destination" className={labelClass}>{UI.destination[lang]} *</label><input id="note-destination" required maxLength={50} value={form.destination} onChange={set('destination')} placeholder={UI.destinationPh[lang]} className={inputClass} /></div>
                <div className="min-w-0"><label htmlFor="note-visited" className={labelClass}>{UI.visitedAt[lang]}</label><input id="note-visited" type="month" value={form.visitedAt} onChange={set('visitedAt')} className={inputClass} /><p className="mt-1.5 text-[0.68rem] text-[#8a8c86]">{UI.visitedAtHelp[lang]}</p></div>
                <div className="min-w-0"><label htmlFor="note-trip-type" className={labelClass}>{UI.tripType[lang]} *</label><select id="note-trip-type" value={form.tripType} onChange={set('tripType')} className={inputClass}>{TRIP_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label[lang]}</option>)}</select></div>
              </div>

              <div className="mt-7 space-y-5 border-t border-[#e2ddd4] pt-7">
                <div><label htmlFor="note-title" className={labelClass}>{UI.titleLabel[lang]} *</label><input id="note-title" required maxLength={70} value={form.title} onChange={set('title')} placeholder={UI.titlePh[lang]} className={inputClass} /></div>
                <div><label htmlFor="note-summary" className={labelClass}>{UI.summary[lang]} *</label><input id="note-summary" required maxLength={180} value={form.summary} onChange={set('summary')} placeholder={UI.summaryPh[lang]} className={inputClass} /></div>
                <div><label htmlFor="note-story" className={labelClass}>{UI.story[lang]} *</label><textarea id="note-story" required maxLength={520} rows={7} value={form.story} onChange={set('story')} placeholder={UI.storyPh[lang]} className={`${inputClass} resize-y`} /></div>
                <div><label htmlFor="note-work-tip" className={labelClass}>{UI.workTip[lang]}</label><textarea id="note-work-tip" maxLength={180} rows={3} value={form.workTip} onChange={set('workTip')} placeholder={UI.workTipPh[lang]} className={`${inputClass} resize-y`} /></div>
                <div><label htmlFor="note-photo" className={labelClass}>{UI.photoLink[lang]}</label><input id="note-photo" type="url" maxLength={500} value={form.photoLink} onChange={set('photoLink')} placeholder="https://" className={inputClass} /><p className="mt-2 text-[0.68rem] leading-relaxed text-[#80847d]">{UI.photoHelp[lang]}</p></div>
              </div>

              {form.photoLink && (
                <label className="mt-5 flex min-h-11 cursor-pointer items-start gap-3 border border-[#d9d3c8] bg-[#fbfaf7] p-4 text-xs font-semibold leading-relaxed text-[#505b55]"><input type="checkbox" checked={photoRightsConfirmed} onChange={(event) => setPhotoRightsConfirmed(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#1a7071]" /><span>{UI.photoRights[lang]}</span></label>
              )}

              <div className="mt-6"><ConsentCheckbox checked={privacyConsent} onChange={setPrivacyConsent} /></div>
              <p className="mt-5 text-xs leading-relaxed text-[#757a73]">{UI.editorialNote[lang]}</p>
              {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
              <button type="submit" disabled={sending || !privacyConsent || (!!form.photoLink && !photoRightsConfirmed)} className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#173235] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#245156] disabled:cursor-not-allowed disabled:opacity-45"><Send className="h-4 w-4" aria-hidden="true" />{sending ? UI.sending[lang] : UI.submit[lang]}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
