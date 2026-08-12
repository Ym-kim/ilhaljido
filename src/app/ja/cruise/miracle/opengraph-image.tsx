import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: 'クルーズワーケーション',
    title: '釜山–大阪クルーズワーケーション',
    subtitle: '海の上の17時間、ビュッフェ2食と衛星Wi-Fi',
  })
}
