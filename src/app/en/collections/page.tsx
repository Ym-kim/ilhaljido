import type { Metadata } from 'next'
import { CollectionsHub } from '@/components/affiliate/CollectionsHub'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/collections — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Workation Collections — Curated by Theme',
  description:
    'Tokyo, Bali, Chiang Mai, Japanese onsen towns and more. Stays, experiences, eSIMs and flights bundled by destination theme — get your workation ready on one screen.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/collections',
    languages: cityLanguageAlternates('/collections'),
  },
  openGraph: {
    title: 'Workation Collections | Wakation',
    description: 'Stays, experiences, eSIMs and flights bundled by destination theme — workation prep on one screen.',
    url: 'https://www.wakation.kr/en/collections',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function CollectionsPageEn() {
  return <CollectionsHub forceLang="EN" />
}
