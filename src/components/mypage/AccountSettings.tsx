'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { KeyRound, Save, Trash2, UserRound } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 마이페이지 계정 설정 (2026-08-13)
// - 회원 정보(이름·연락처·주소): auth user_metadata에 저장 — 별도 테이블·SQL 불필요,
//   본인 세션으로만 수정 가능(auth API 자체가 강제)
// - 비밀번호 변경: 이메일 로그인 계정만 노출(구글·카카오 계정은 비밀번호가 없음).
//   최소 6자 = signup 페이지와 동일 기준
// - 회원 탈퇴: /api/my/delete-account(서버에서 본인 확인 후 service role 삭제).
//   신청 기록은 보존(user_id만 해제), 호스트 데이터는 함께 삭제됨을 안내
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const C: Record<string, L> = {
  infoTitle: { KO: '회원 정보', EN: 'Account info', JP: '会員情報' },
  name: { KO: '이름', EN: 'Name', JP: 'お名前' },
  phone: { KO: '연락처 (선택)', EN: 'Phone (optional)', JP: '電話番号（任意）' },
  address: { KO: '주소 (선택)', EN: 'Address (optional)', JP: '住所（任意）' },
  addressPh: {
    KO: '예: 인천광역시 연수구 — 프로그램 안내에만 사용됩니다',
    EN: 'Used only for program logistics',
    JP: '例：東京都 — プログラム案内にのみ使用します',
  },
  save: { KO: '저장하기', EN: 'Save', JP: '保存する' },
  saving: { KO: '저장 중…', EN: 'Saving…', JP: '保存中…' },
  saved: { KO: '저장됐습니다.', EN: 'Saved.', JP: '保存しました。' },
  pwTitle: { KO: '비밀번호 변경', EN: 'Change password', JP: 'パスワード変更' },
  pwNew: { KO: '새 비밀번호 (6자 이상)', EN: 'New password (6+ characters)', JP: '新しいパスワード（6文字以上）' },
  pwConfirm: { KO: '새 비밀번호 확인', EN: 'Confirm new password', JP: '新しいパスワード（確認）' },
  pwChange: { KO: '비밀번호 변경하기', EN: 'Update password', JP: 'パスワードを変更' },
  pwDone: { KO: '비밀번호가 변경됐습니다.', EN: 'Password updated.', JP: 'パスワードを変更しました。' },
  pwMismatch: { KO: '새 비밀번호가 서로 다릅니다.', EN: 'Passwords do not match.', JP: 'パスワードが一致しません。' },
  delTitle: { KO: '회원 탈퇴', EN: 'Delete account', JP: '退会' },
  delDesc: {
    KO: '탈퇴하면 로그인 계정과 호스트 정보(등록한 숙소 포함)가 삭제됩니다. 프로그램 신청 기록은 운영을 위해 계정 연결만 해제된 채 보존됩니다. 이 작업은 되돌릴 수 없습니다.',
    EN: 'Deleting your account removes your login and host data (including registered stays). Program applications are kept for operations with the account link removed. This cannot be undone.',
    JP: '退会するとログインアカウントとホスト情報（登録した宿を含む）が削除されます。プログラム申請記録は運営のためアカウント連携を解除して保存されます。この操作は元に戻せません。',
  },
  delBtn: { KO: '탈퇴하기', EN: 'Delete my account', JP: '退会する' },
  delConfirm1: {
    KO: '정말 탈퇴하시겠어요? 계정과 호스트 데이터가 삭제되며 되돌릴 수 없습니다.',
    EN: 'Really delete your account? Your account and host data will be removed permanently.',
    JP: '本当に退会しますか？アカウントとホストデータが削除され、元に戻せません。',
  },
  delConfirm2: {
    KO: '마지막 확인입니다. 지금 탈퇴하시겠어요?',
    EN: 'Final confirmation — delete now?',
    JP: '最終確認です。今すぐ退会しますか？',
  },
  deleting: { KO: '탈퇴 처리 중…', EN: 'Deleting…', JP: '退会処理中…' },
  err: { KO: '처리에 실패했어요. 잠시 후 다시 시도해주세요.', EN: 'Something failed — please try again shortly.', JP: '処理に失敗しました。しばらくして再度お試しください。' },
}

const inputCls =
  'w-full min-w-0 bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'
const cardCls = 'bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8'
const titleCls = 'text-lg font-black text-[#111827] flex items-center gap-2 mb-6'

export function AccountSettings({ user }: { user: User }) {
  const { lang } = useLang()
  const router = useRouter()
  const { signOut } = useAuth()
  const supabase = createClient()

  // 회원 정보 — user_metadata에서 초기값
  const [name, setName] = useState<string>(user.user_metadata?.name ?? '')
  const [phone, setPhone] = useState<string>(user.user_metadata?.phone ?? '')
  const [address, setAddress] = useState<string>(user.user_metadata?.address ?? '')
  const [savingInfo, setSavingInfo] = useState(false)
  const [infoMsg, setInfoMsg] = useState('')

  // 비밀번호 — 이메일 로그인 계정만 (구글·카카오는 비밀번호 없음)
  const hasEmailIdentity = user.identities?.some((i) => i.provider === 'email') ?? false
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [savingPw, setSavingPw] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [pwErr, setPwErr] = useState('')

  // 탈퇴
  const [deleting, setDeleting] = useState(false)
  const [delErr, setDelErr] = useState('')

  async function saveInfo(e: React.FormEvent) {
    e.preventDefault()
    setInfoMsg('')
    setSavingInfo(true)
    const { error } = await supabase.auth.updateUser({
      data: {
        name: name.slice(0, 80),
        phone: phone.slice(0, 40),
        address: address.slice(0, 200),
      },
    })
    setSavingInfo(false)
    setInfoMsg(error ? C.err[lang] : C.saved[lang])
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwMsg('')
    setPwErr('')
    if (pw !== pw2) {
      setPwErr(C.pwMismatch[lang])
      return
    }
    setSavingPw(true)
    const { error } = await supabase.auth.updateUser({ password: pw })
    setSavingPw(false)
    if (error) {
      // Supabase 원문 메시지(같은 비밀번호·정책 위반 등)를 그대로 노출 — 원인 파악에 유용
      setPwErr(error.message || C.err[lang])
      return
    }
    setPw('')
    setPw2('')
    setPwMsg(C.pwDone[lang])
  }

  async function deleteAccount() {
    setDelErr('')
    if (!window.confirm(C.delConfirm1[lang])) return
    if (!window.confirm(C.delConfirm2[lang])) return
    setDeleting(true)
    const res = await fetch('/api/my/delete-account', { method: 'POST' })
    if (!res.ok) {
      setDeleting(false)
      setDelErr(C.err[lang])
      return
    }
    // 서버에서 계정이 이미 삭제됨 — 로컬 세션 정리는 실패해도 무방
    try {
      await signOut()
    } catch {
      /* noop */
    }
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* 회원 정보 */}
      <div className={`${cardCls} mt-6`}>
        <h2 className={titleCls}>
          <UserRound className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} /> {C.infoTitle[lang]}
        </h2>
        <form onSubmit={saveInfo} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="acc-name" className={labelCls}>{C.name[lang]}</label>
              <input id="acc-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label htmlFor="acc-phone" className={labelCls}>{C.phone[lang]}</label>
              <input id="acc-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="acc-address" className={labelCls}>{C.address[lang]}</label>
            <input id="acc-address" autoComplete="street-address" placeholder={C.addressPh[lang]} value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={savingInfo}
              className="inline-flex items-center gap-2 bg-brand-mid hover:bg-sky-500 disabled:opacity-60 text-white font-bold text-sm px-5 py-3 rounded-full transition-colors"
            >
              <Save className="w-4 h-4" strokeWidth={ICON_STROKE} />
              {savingInfo ? C.saving[lang] : C.save[lang]}
            </button>
            {infoMsg && <span className="text-sm text-[#64748b]">{infoMsg}</span>}
          </div>
        </form>
      </div>

      {/* 비밀번호 변경 — 이메일 로그인 계정만 */}
      {hasEmailIdentity && (
        <div className={`${cardCls} mt-6`}>
          <h2 className={titleCls}>
            <KeyRound className="w-5 h-5 text-brand-mid" strokeWidth={ICON_STROKE} /> {C.pwTitle[lang]}
          </h2>
          <form onSubmit={changePassword} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="acc-pw" className={labelCls}>{C.pwNew[lang]}</label>
                <input id="acc-pw" required type="password" minLength={6} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="acc-pw2" className={labelCls}>{C.pwConfirm[lang]}</label>
                <input id="acc-pw2" required type="password" minLength={6} autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={inputCls} />
              </div>
            </div>
            {pwErr && <p className="text-red-500 text-sm">{pwErr}</p>}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={savingPw}
                className="inline-flex items-center gap-2 bg-brand-mid hover:bg-sky-500 disabled:opacity-60 text-white font-bold text-sm px-5 py-3 rounded-full transition-colors"
              >
                <KeyRound className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {savingPw ? C.saving[lang] : C.pwChange[lang]}
              </button>
              {pwMsg && <span className="text-sm text-[#64748b]">{pwMsg}</span>}
            </div>
          </form>
        </div>
      )}

      {/* 회원 탈퇴 */}
      <div className={`${cardCls} mt-6 border-red-100`}>
        <h2 className={titleCls}>
          <Trash2 className="w-5 h-5 text-red-400" strokeWidth={ICON_STROKE} /> {C.delTitle[lang]}
        </h2>
        <p className="text-[#64748b] text-sm leading-relaxed mb-5">{C.delDesc[lang]}</p>
        {delErr && <p className="text-red-500 text-sm mb-3">{delErr}</p>}
        <button
          onClick={deleteAccount}
          disabled={deleting}
          className="inline-flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-60 font-bold text-sm px-5 py-3 rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" strokeWidth={ICON_STROKE} />
          {deleting ? C.deleting[lang] : C.delBtn[lang]}
        </button>
      </div>
    </>
  )
}
