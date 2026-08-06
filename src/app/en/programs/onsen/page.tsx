import type { Metadata } from 'next'
import { JapanTownsView } from '@/components/programs/JapanTownsView'
import { cityLanguageAlternates } from '@/lib/cities'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// /en/programs/onsen — 영어 정적 로케일 라우트. 콘텐츠는 일본 소도시 료칸·온천 뷰(JapanTownsView).

export const metadata: Metadata = {
  title: 'Ryokan & Onsen Workation — Small-Town Japan',
  description:
    'Kawaguchiko, Kanazawa and Yufuin. Work by Fuji lakesides and historic streets, then end the day in an onsen — stays and program info.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/onsen',
    languages: cityLanguageAlternates('/programs/onsen'),
  },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Ryokan & Onsen Workation | Wakation',
    description: 'Work from small Japanese towns and end the day in an onsen — Kawaguchiko, Kanazawa and Yufuin.',
    url: 'https://www.wakation.kr/en/programs/onsen',
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function OnsenThemePageEn() {
  return <JapanTownsView forceLang="EN" />
}
