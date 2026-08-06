import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: '크루즈 워케이션',
    title: '부산–오사카 크루즈 워케이션',
    subtitle: '바다 위 17시간, 뷔페 2식과 위성 와이파이',
  })
}
