import type { Metadata } from 'next'
import { GuideHubView } from '@/components/guide/GuideHubView'
import { guideLanguageAlternates } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Workation City Guides — Time Zones, Flights & Seasons',
  description:
    'Workation guides for Tokyo, Fukuoka, Da Nang, Bali, Chiang Mai, Jeju, Osaka, Cebu and Sydney. Compare time zones, direct flights, best seasons and work-friendly neighborhoods — then jump straight to stays and flights.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/guide',
    languages: guideLanguageAlternates('/guide'),
  },
  openGraph: { locale: 'en_US', alternateLocale: ['ko_KR', 'ja_JP'] },
  robots: { index: true, follow: true },
}

export default function GuideHubPageEn() {
  return <GuideHubView forceLang="EN" />
}
