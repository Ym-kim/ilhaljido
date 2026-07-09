import { createBrowserClient } from '@supabase/ssr'
import { SESSION_MAX_AGE } from './session'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
    // 세션 쿠키 수명 상한 — 활성 사용자는 자동 갱신되므로 사실상 '비활성 30일 후 로그아웃'
    { cookieOptions: { maxAge: SESSION_MAX_AGE } }
  )
}
