import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: '시즌 에디토리얼',
    title: '추석 연휴 4일, 어디로',
    subtitle: '연휴 일정에 맞춘 Trip Set 5종',
  })
}
