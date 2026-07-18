import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/programs/networking — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Solopreneur Networking Workation',
  description:
    'Networking workations for freelancers, solopreneurs and founders. Programs that connect you with peers who share the same challenges.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/networking',
    languages: cityLanguageAlternates('/programs/networking'),
  },
  openGraph: {
    title: 'Solopreneur Networking Workation | Wakation',
    description: 'Networking workations for freelancers, solopreneurs and founders.',
    url: 'https://www.wakation.kr/en/programs/networking',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function NetworkingPageEn() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.networking} forceLang="EN" />
}
