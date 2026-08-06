import type { Metadata } from 'next'
import { DiagnosisView } from '@/components/tools/DiagnosisView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/tools/diagnosis',
  en: 'https://www.wakation.kr/en/tools/diagnosis',
  ja: 'https://www.wakation.kr/ja/tools/diagnosis',
  'x-default': 'https://www.wakation.kr/tools/diagnosis',
}

export const metadata: Metadata = {
  title: 'Workation Self-Check & Action Report (Beta)',
  description:
    'Five questions to find your workation type, with before / during / after checklists. Free, no sign-up.',
  alternates: { canonical: languages.en, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'Workation Self-Check | Wakation',
    description: 'Find your workation type in five questions — with practical checklists.',
    url: languages.en,
    siteName: 'Wakation',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
  robots: { index: true, follow: true },
}

export default function DiagnosisPageEn() {
  return <DiagnosisView forceLang="EN" />
}
