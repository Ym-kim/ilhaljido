'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/context/LanguageContext'
import { Logo } from '@/components/brand/Logo'
import { GoogleIcon } from '@/components/brand/GoogleIcon'
import { KakaoIcon } from '@/components/brand/KakaoIcon'

const INPUT_CLASS =
  'w-full pl-10 pr-4 py-3 border border-[#dbeafe] rounded-xl text-sm focus:outline-none focus:border-brand-mid focus:ring-2 focus:ring-sky-100 transition-colors'

export default function SignupPage() {
  const { tr } = useLang()
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!agreed) {
      setError(tr('auth_err_agree'))
      return
    }
    if (password !== confirm) {
      setError(tr('auth_err_pw_mismatch'))
      return
    }
    if (password.length < 6) {
      setError(tr('auth_err_pw_short'))
      return
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // 이메일 확인 활성화 시: 확인 메일 발송 안내
    if (data.user && !data.session) {
      setSuccess(true)
      return
    }

    // 즉시 로그인된 경우
    router.push('/mypage')
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=/mypage` },
    })
    if (error) setError(tr('auth_err_google'))
  }

  const handleKakaoLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${location.origin}/auth/callback?next=/mypage` },
    })
    if (error) setError(tr('auth_err_kakao'))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-brand-mid mx-auto mb-4" />
          <h1 className="text-2xl font-black text-[#111827] mb-2">{tr('auth_done_title')}</h1>
          <p className="text-sm text-[#64748b] mb-6">
            {tr('auth_done_pre')}<span className="font-bold text-[#111827]">{email}</span>{tr('auth_done_post')}<br />
            {tr('auth_done_line2')}
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-6 py-3 rounded-full hover:bg-sky-500 transition-colors text-sm">
            {tr('auth_to_login')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8">
          <h1 className="text-2xl font-black text-[#111827] mb-2">{tr('auth_signup_title')}</h1>
          <p className="text-sm text-[#64748b] mb-6">{tr('auth_signup_sub')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#334155] mb-1.5 block">{tr('auth_name')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={tr('auth_name_ph')}
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] mb-1.5 block">{tr('auth_email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] mb-1.5 block">{tr('auth_password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tr('auth_pw_min_ph')}
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] mb-1.5 block">{tr('auth_pw_confirm')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder={tr('auth_pw_confirm_ph')}
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 shrink-0 accent-brand-mid cursor-pointer"
              />
              <span className="text-[#64748b] text-xs leading-snug">
                {tr('auth_agree_pre')}
                <Link href="/terms" target="_blank" className="text-brand-mid font-semibold underline">{tr('auth_terms')}</Link>
                {tr('auth_agree_mid')}
                <Link href="/privacy" target="_blank" className="text-brand-mid font-semibold underline">{tr('auth_privacy')}</Link>
                {tr('auth_agree_post')}
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-2.5 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full bg-brand-mid text-white font-bold py-3 rounded-xl hover:bg-sky-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? tr('auth_signup_loading') : <>{tr('auth_signup_btn')} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#e2e8f0]" />
            <span className="text-xs text-[#94a3b8] font-medium">{tr('auth_or')}</span>
            <div className="flex-1 h-px bg-[#e2e8f0]" />
          </div>

          {/* 카카오 공식 버튼 가이드: 컨테이너 #FEE500 · 라벨 검정 85% */}
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="w-full bg-[#FEE500] text-black/85 font-bold py-3 rounded-xl hover:brightness-95 transition-[filter] flex items-center justify-center gap-2.5 text-sm">
            <KakaoIcon />
            {tr('auth_kakao')}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-3 bg-white border border-[#dbeafe] text-[#334155] font-bold py-3 rounded-xl hover:bg-[#f0f9ff] transition-colors flex items-center justify-center gap-2.5 text-sm">
            <GoogleIcon />
            {tr('auth_google')}
          </button>

          <p className="text-center text-sm text-[#64748b] mt-6">
            {tr('auth_have_account')}{' '}
            <Link href="/login" className="text-brand-mid font-bold hover:underline">{tr('auth_login_link')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
