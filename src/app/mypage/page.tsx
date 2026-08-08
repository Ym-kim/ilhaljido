'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Calendar, LogOut, ArrowRight, FileText } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

type Application = {
  id: string
  program_id: string | null
  programs: { title: string } | null
  job_type: string
  status: string | null
  created_at: string
}

const DATE_LOCALE: Record<Lang, string> = { KO: 'ko-KR', EN: 'en-US', JP: 'ja-JP' }

const STATUS_STYLE: Record<string, string> = {
  confirmed: 'bg-sky-100 text-sky-700',
  cancelled: 'bg-red-100 text-red-600',
  contacted: 'bg-blue-100 text-blue-700',
  payment_pending: 'bg-purple-100 text-purple-700',
}

const STATUS_KEY: Record<string, string> = {
  confirmed: 'my_st_confirmed',
  cancelled: 'my_st_cancelled',
  contacted: 'my_st_contacted',
  payment_pending: 'my_st_payment',
}

const NOTE_LABEL: Record<Lang, string> = { KO: '여행자 노트 검수', EN: 'Traveler note review', JP: '旅のノート確認' }
const NOTE_STATUS: Record<string, Record<Lang, string>> = {
  pending: { KO: '검수 대기', EN: 'Awaiting review', JP: '確認待ち' },
  contacted: { KO: '수정 확인 중', EN: 'Edit confirmation', JP: '修正確認中' },
  confirmed: { KO: '공개 승인', EN: 'Approved to publish', JP: '公開承認' },
  cancelled: { KO: '미게시', EN: 'Not published', JP: '非公開' },
}

export default function MyPage() {
  const { lang, tr } = useLang()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [apps, setApps] = useState<Application[]>([])
  const [appsLoading, setAppsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      try {
        // 서버 API가 getUser()로 신원 확인 후 user_id 필터 강제 → RLS 무관하게 본인 데이터만
        const res = await fetch('/api/my/applications')
        const json = await res.json()
        setApps((json.applications as Application[]) || [])
      } catch {
        setApps([])
      } finally {
        setAppsLoading(false)
      }
    }
    load()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center">
        <p className="text-[#94a3b8] text-sm">{tr('my_loading')}</p>
      </div>
    )
  }

  const name = user.user_metadata?.name || user.email?.split('@')[0]

  return (
    <div className="min-h-screen bg-[#f0f9ff] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-mid rounded-full flex items-center justify-center text-white font-black text-2xl">
                {name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#111827]">{name}</h1>
                <p className="text-sm text-[#64748b] flex items-center gap-1 mt-1">
                  <Mail className="w-3.5 h-3.5" /> {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#64748b] hover:text-red-500 px-4 py-2 rounded-full border border-[#dbeafe] hover:border-red-200 transition-colors">
              <LogOut className="w-4 h-4" /> {tr('my_logout')}
            </button>
          </div>
        </div>

        {/* 신청 내역 */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#dbeafe] p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-[#111827] flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-mid" /> {tr('my_apps_title')}
            </h2>
            <Link href="/programs" className="text-xs font-bold text-brand-mid hover:underline">
              {tr('my_browse')}
            </Link>
          </div>

          {appsLoading ? (
            <p className="text-[#94a3b8] text-sm text-center py-12">{tr('my_apps_loading')}</p>
          ) : apps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#94a3b8] text-sm mb-4">{tr('my_apps_empty')}</p>
              <Link href="/programs" className="inline-flex items-center gap-2 bg-brand-mid text-white font-bold px-5 py-2.5 rounded-full hover:bg-sky-500 transition-colors text-sm">
                {tr('my_apply_cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {apps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-[#f0f9ff] rounded-2xl">
                  <div>
                    <p className="font-bold text-[#111827] text-sm">{app.job_type === 'traveler_note' ? NOTE_LABEL[lang] : app.programs?.title || app.program_id || tr('my_fallback_program')}</p>
                    <p className="text-xs text-[#64748b] flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.created_at).toLocaleDateString(DATE_LOCALE[lang])}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLE[app.status ?? ''] ?? 'bg-[#e2e8f0] text-[#475569]'}`}>
                    {app.job_type === 'traveler_note' ? (NOTE_STATUS[app.status ?? '']?.[lang] ?? NOTE_STATUS.pending[lang]) : tr(STATUS_KEY[app.status ?? ''] ?? 'my_st_pending')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
