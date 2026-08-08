import type { Metadata } from 'next'
import { MediaCreditsView } from '@/components/legal/MediaCreditsView'

export const metadata: Metadata = {
  title: 'Media sources and usage',
  description: 'Sources and usage terms for licensed photographs and in-house visuals used by Wakation.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/media-credits',
    languages: { ko: '/media-credits', en: '/en/media-credits', ja: '/ja/media-credits', 'x-default': '/media-credits' },
  },
}

export default function EnglishMediaCreditsPage() {
  return <MediaCreditsView lang="EN" />
}
