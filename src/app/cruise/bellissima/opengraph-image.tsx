import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: '크루즈 워케이션',
    title: 'MSC 벨리시마',
    subtitle: '스타링크 탑재 대형 크루즈, 부산 승선',
  })
}
