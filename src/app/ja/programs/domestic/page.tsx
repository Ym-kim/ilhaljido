import type { Metadata } from 'next'
import { DomesticProgramsView } from '@/components/programs/DomesticProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /ja/programs/domestic — 일본어 정적 로케일 라우트

export const metadata: Metadata = {
  title: '韓国国内ワーケーション — 地域拠点で働き成長する',
  description:
    '襄陽パイロットを皮切りに、韓国の地域で仕事と休息・ネットワーキング・成長をつなぐ滞在型ワーケーションプログラム。フリーランス・起業家・リモートワーカー向け。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/domestic',
    languages: cityLanguageAlternates('/programs/domestic'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '韓国国内ワーケーション | Wakation',
    description: '韓国の地域拠点で仕事と休息・ネットワーキング・成長をつなぐ滞在型ワーケーション。',
    url: 'https://www.wakation.kr/ja/programs/domestic',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function DomesticPageJa() {
  return <DomesticProgramsView forceLang="JP" />
}
