import type { Metadata } from 'next'
import { ThemeProgramPage } from '@/components/programs/ThemeProgramPage'
import { THEME_PAGE_CONFIGS } from '@/lib/themePages'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/programs/healing — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Healing & Yoga Workation',
  description:
    'Healing workations in Bali and Taean. Wellness programs where you work and recover with yoga, meditation and spa time.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/healing',
    languages: cityLanguageAlternates('/programs/healing'),
  },
  openGraph: {
    title: 'Healing & Yoga Workation | Wakation',
    description: 'Wellness workations where you work and recover with yoga, meditation and spa time.',
    url: 'https://www.wakation.kr/en/programs/healing',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function HealingPageEn() {
  return <ThemeProgramPage {...THEME_PAGE_CONFIGS.healing} forceLang="EN" />
}
