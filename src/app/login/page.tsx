'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mountain, Mail, Lock, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
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
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      return
    }
    router.push('/mypage')
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback?next=/mypage` },
    })
    if (error) setError('구글 로그인을 시작할 수 없습니다.')
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 font-black text-xl text-gray-900 mb-8">
          <Mountain className="w-6 h-6 text-teal-500" />
          Wakation
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-2">로그인</h1>
          <p className="text-sm text-gray-500 mb-6">이메일과 비밀번호로 로그인하세요.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-2.5 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? '로그인 중...' : <>로그인 <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">또는</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2.5 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 계속하기
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-teal-600 font-bold hover:underline">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
