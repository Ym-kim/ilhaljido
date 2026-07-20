import type { Metadata } from 'next'
import { ActivitySelectView } from '@/components/select/ActivitySelectView'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/select/activity — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Local Tours & Activities — Wakation Select',
  description:
    'Local tours, transit passes and tickets in Japan, Vietnam and Bali. Enrich your workation with KKday partner products.',
  keywords: ['workation activities', 'KKday', 'Japan tours', 'Vietnam activities', 'Bali experiences', 'transit pass'],
  alternates: {
    canonical: 'https://www.wakation.kr/en/select/activity',
    languages: cityLanguageAlternates('/select/activity'),
  },
  openGraph: {
    title: 'Local Tours & Activities | Wakation Select',
    description: 'Local tours, transit passes and tickets by destination — via KKday and Klook partners.',
    url: 'https://www.wakation.kr/en/select/activity',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function ActivitySelectPageEn() {
  return <ActivitySelectView forceLang="EN" />
}
