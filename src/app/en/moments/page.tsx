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
  title: 'Traveler Notes — Destination Stories and Member Reviews',
  description:
    'Read destination introductions from Wakation editors and honest stay reviews contributed by members.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Traveler Notes — Destination Stories and Member Reviews',
    description: 'A shared travel journal that begins with editor introductions and grows with member reviews.',
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
