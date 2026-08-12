import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: 'クルーズワーケーション',
    title: 'MSCワールド・エウローパ',
    subtitle: 'MSC船団最大・初のLNG船、冬のカリブ',
  })
}
