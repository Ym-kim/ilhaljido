import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { LanguageProvider } from '@/context/LanguageContext'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Work and travel, your way',
  description: 'Start with a short stay in Korea or Japan, then build a workation around verified city guides, Trip Sets and travel essentials.',
  alternates: {
    canonical: 'https://www.wakation.kr/en',
    languages: {
      ko: 'https://www.wakation.kr',
      en: 'https://www.wakation.kr/en',
      ja: 'https://www.wakation.kr/ja',
      'x-default': 'https://www.wakation.kr',
    },
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Work and travel, your way',
    description: 'Short stays, workation city guides and practical travel planning for working people.',
    url: 'https://www.wakation.kr/en',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
    siteName: 'Wakation',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function EnglishHomePage() {
  return (
    <LanguageProvider forceLang="EN">
      <HomePage forceLang="EN" chinaCampaignActive={isChinaHomeCampaignActive()} />
    </LanguageProvider>
  )
}
