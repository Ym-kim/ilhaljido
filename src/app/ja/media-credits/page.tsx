import type { Metadata } from 'next'
import { MediaCreditsView } from '@/components/legal/MediaCreditsView'

export const metadata: Metadata = {
  title: 'メディアの出典と利用範囲',
  description: 'Wakationで使用するライセンス写真と自社制作画像の出典・利用範囲です。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/media-credits',
    languages: { ko: '/media-credits', en: '/en/media-credits', ja: '/ja/media-credits', 'x-default': '/media-credits' },
  },
}

export default function JapaneseMediaCreditsPage() {
  return <MediaCreditsView lang="JP" />
}
