'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

// 라우트 에러 경계 — 페이지 렌더 중 throw 시 흰 화면 대신 브랜드 폴백 + 재시도
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Route error:', error)
  }, [error])

  const { lang } = useLang()
  const t = {
    KO: { title: '문제가 발생했어요', desc: '일시적인 오류일 수 있습니다. 다시 시도해 주세요.', retry: '다시 시도', home: '홈으로' },
    EN: { title: 'Something went wrong', desc: 'This may be temporary. Please try again.', retry: 'Try again', home: 'Go home' },
    JP: { title: '問題が発生しました', desc: '一時的なエラーの可能性があります。もう一度お試しください。', retry: '再試行', home: 'ホームへ' },
  }[lang]

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 dark-surface">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-white/55 text-sm mb-8">{t.desc}</p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button onClick={reset} className="btn-primary justify-center">{t.retry}</button>
          <Link href="/" className="btn-ghost-light justify-center">{t.home}</Link>
        </div>
      </div>
    </div>
  )
}
