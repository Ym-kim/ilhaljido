import type { Metadata } from 'next'
import { SupportProgramsView } from '@/components/programs/SupportProgramsView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/programs/support — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Local Government Workation Subsidies in Korea',
  description:
    'Workation subsidy programs from Korean local governments — Jeju, Busan, Gangwon and more. Accommodation support and experience programs, summarized from official notices.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/support',
    languages: cityLanguageAlternates('/programs/support'),
  },
  openGraph: {
    title: 'Local Government Workation Subsidies | Wakation',
    description:
      'Workation subsidies from Korean local governments — accommodation support and experience programs at a glance.',
    url: 'https://www.wakation.kr/en/programs/support',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function SupportPageEn() {
  return <SupportProgramsView forceLang="EN" />
}
