'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/context/LanguageContext'
import { Logo } from '@/components/brand/Logo'
import { GoogleIcon } from '@/components/brand/GoogleIcon'
import { KakaoIcon } from '@/components/brand/KakaoIcon'

function safeRedirectPath(raw: string | null): string {
  if (!raw) return '/mypage'
  if (raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('://')) {
    return raw
  }
  return '/mypage'
}

const INPUT_CLASS =
  'w-full pl-10 pr-4 py-3 border border-[#dbeafe] rounded-xl text-sm focus:outline-none focus:border-brand-mid focus:ring-2 focus:ring-sky-100 transition-colors'

function LoginForm() {
  const { tr } = useLang()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = safeRedirectPath(searchParams.get('redirect'))
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(tr('auth_err_login'))
      return
    }
    router.push(redirectTo)
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}` },
    })
    if (error) setError(tr('auth_err_google'))
  }

  const handleKakaoLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}` },
    })
    if (error) setError(tr('auth_err_kakao'))
  }

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8">
          <h1 className="text-2xl font-black text-[#111827] mb-2">{tr('auth_login_title')}</h1>
          <p className="text-sm text-[#64748b] mb-6">{tr('auth_login_sub')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-2.5 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-mid text-white font-bold py-3 rounded-xl hover:bg-sky-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? tr('auth_login_loading') : <>{tr('auth_login_btn')} <ArrowRight className="w-4 h-4" /></>}
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
            {tr('auth_no_account')}{' '}
            <Link href="/signup" className="text-brand-mid font-bold hover:underline">{tr('auth_signup_link')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
