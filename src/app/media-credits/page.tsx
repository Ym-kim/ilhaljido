import type { Metadata } from 'next'
import { MediaCreditsView } from '@/components/legal/MediaCreditsView'

export const metadata: Metadata = {
  title: '미디어 출처와 사용 범위',
  description: 'Wakation에서 사용하는 라이선스 사진과 자체 제작 편집 이미지의 출처 및 사용 범위입니다.',
  alternates: {
    canonical: 'https://www.wakation.kr/media-credits',
    languages: { ko: '/media-credits', en: '/en/media-credits', ja: '/ja/media-credits', 'x-default': '/media-credits' },
  },
}

export default function MediaCreditsPage() {
  return <MediaCreditsView lang="KO" />
}
