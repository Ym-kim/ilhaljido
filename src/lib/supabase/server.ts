import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SESSION_MAX_AGE } from './session'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
    {
      // 세션 쿠키 수명 상한 — 활성 사용자는 자동 갱신되므로 사실상 '비활성 30일 후 로그아웃'
      cookieOptions: { maxAge: SESSION_MAX_AGE },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
