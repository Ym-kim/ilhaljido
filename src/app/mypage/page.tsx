'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Calendar, LogOut, ArrowRight, FileText } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type Application = {
  id: string
  program_id: string | null
  programs: { title: string } | null
  status: string | null
  created_at: string
}

export default function MyPage() {
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
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    )
  }

  const name = user.user_metadata?.name || user.email?.split('@')[0]

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-black text-2xl">
                {name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{name}</h1>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Mail className="w-3.5 h-3.5" /> {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-red-500 px-4 py-2 rounded-full border border-gray-200 hover:border-red-200 transition-colors">
              <LogOut className="w-4 h-4" /> 로그아웃
            </button>
          </div>
        </div>

        {/* 신청 내역 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-500" /> 내 신청 내역
            </h2>
            <Link href="/programs" className="text-xs font-bold text-teal-600 hover:underline">
              프로그램 둘러보기
            </Link>
          </div>

          {appsLoading ? (
            <p className="text-gray-400 text-sm text-center py-12">불러오는 중...</p>
          ) : apps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm mb-4">아직 신청한 프로그램이 없습니다.</p>
              <Link href="/programs" className="inline-flex items-center gap-2 bg-teal-500 text-white font-bold px-5 py-2.5 rounded-full hover:bg-teal-400 transition-colors text-sm">
                프로그램 신청하기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {apps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{app.programs?.title || app.program_id || '프로그램'}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    app.status === 'confirmed'       ? 'bg-teal-100 text-teal-700'
                    : app.status === 'cancelled'     ? 'bg-red-100 text-red-600'
                    : app.status === 'contacted'     ? 'bg-blue-100 text-blue-700'
                    : app.status === 'payment_pending' ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-200 text-gray-600'
                  }`}>
                    {app.status === 'confirmed'         ? '참가 확정'
                      : app.status === 'cancelled'      ? '취소'
                      : app.status === 'contacted'      ? '담당자 연락 완료'
                      : app.status === 'payment_pending' ? '결제 대기'
                      : '신청 접수'}
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
