import type { Metadata } from 'next'
import { MomentsView } from '@/components/moments/MomentsView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/moments',
  en: 'https://www.wakation.kr/en/moments',
  ja: 'https://www.wakation.kr/ja/moments',
  'x-default': 'https://www.wakation.kr/moments',
}

export const metadata: Metadata = {
  title: 'Workation Moments — Editor-Picked Highlights',
  description:
    'Tokyo, Bali, Da Nang, Chiang Mai, Jeju — the defining moments of workation life in vertical shorts, curated by our editors.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Workation Moments | Wakation',
    description: 'The defining moments of workation life — editor-picked destination inspiration.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function MomentsPageEn() {
  return <MomentsView forceLang="EN" />
}
