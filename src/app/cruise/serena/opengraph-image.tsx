import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: '크루즈 워케이션',
    title: '코스타 세레나',
    subtitle: '스타링크 함대 리핏, 한국 아웃바운드 재개 선사',
  })
}
