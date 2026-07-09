'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

// 404 — 다크 브랜드 톤
export default function NotFound() {
  const { lang } = useLang()
  const t = {
    KO: { title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 삭제된 페이지일 수 있습니다.', home: '홈으로', browse: '워케이션 둘러보기' },
    EN: { title: 'Page not found', desc: 'The page may have moved or been removed.', home: 'Go home', browse: 'Browse workations' },
    JP: { title: 'ページが見つかりません', desc: 'アドレスが変更されたか削除された可能性があります。', home: 'ホームへ', browse: 'ワーケーションを見る' },
  }[lang]

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 dark-surface">
      <div className="text-center max-w-md">
        <p className="text-[5rem] font-black text-white/10 leading-none mb-2">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">{t.title}</h1>
        <p className="text-white/55 text-sm mb-8">{t.desc}</p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link href="/" className="btn-primary justify-center">{t.home}</Link>
          <Link href="/select/hotel" className="btn-ghost-light justify-center">{t.browse}</Link>
        </div>
      </div>
    </div>
  )
}
