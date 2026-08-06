import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SupportProgramsView } from '@/components/programs/SupportProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/programs/support — 일본어 정적 로케일 라우트

export const metadata: Metadata = {
  title: '韓国自治体のワーケーション支援事業',
  description:
    '済州・釜山・江原など、韓国自治体のワーケーション支援事業を一目で。宿泊費支援・体験プログラムなど公式公告の要点を整理しました。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/support',
    languages: cityLanguageAlternates('/programs/support'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '韓国自治体のワーケーション支援事業 | Wakation',
    description: '韓国自治体のワーケーション支援事業 — 宿泊費支援・体験プログラムなど公式公告を一目で。',
    url: 'https://www.wakation.kr/ja/programs/support',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function SupportPageJa() {
  return <Suspense fallback={<div className="min-h-screen bg-[#fafaf7]" aria-hidden />}><SupportProgramsView forceLang="JP" /></Suspense>
}
