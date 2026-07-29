import type { Metadata } from 'next'
import { HostedLandingView } from '@/components/hosted/HostedLandingView'

const languages = {
  ko: 'https://www.wakation.kr/hosted',
  en: 'https://www.wakation.kr/en/hosted',
  ja: 'https://www.wakation.kr/ja/hosted',
  'x-default': 'https://www.wakation.kr/hosted',
}

export const metadata: Metadata = {
  title: 'Hosted Program Opening Alerts',
  description: 'Register interest in Wakation-run Korea workations, Japan market research stays, language stays and founder camps. We notify you after dates and terms are confirmed.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    title: 'Meet your next workation before it opens',
    description: 'Choose an interest and hear from us after the real dates and terms are confirmed.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
    type: 'website',
    images: [{ url: '/campaign/home-workation-editorial-v1.webp', width: 1600, height: 900, alt: 'A traveler working from a sea-view stay' }],
  },
  robots: { index: true, follow: true },
}

export default function HostedPageEn() {
  return <HostedLandingView forceLang="EN" />
}
