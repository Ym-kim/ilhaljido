import type { Metadata } from 'next'
import { SelectHubView } from '@/components/select/SelectHubView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/select — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const metadata: Metadata = {
  title: 'Wakation Select — Workation Prep, All in One Place',
  description:
    'Stays, local experiences, eSIMs and online courses — partner services curated by destination for your workation.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/select',
    languages: cityLanguageAlternates('/select'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Wakation Select | Workation Prep Essentials',
    description: 'Stays, experiences, eSIMs and courses — everything for your workation in one place.',
    url: 'https://www.wakation.kr/en/select',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function SelectPageEn() {
  return <SelectHubView forceLang="EN" />
}
