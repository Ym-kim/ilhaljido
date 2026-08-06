import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: '크루즈 워케이션',
    title: 'MSC 월드 유로파',
    subtitle: 'MSC 함대 최대·첫 LNG 선박, 겨울 카리브',
  })
}
