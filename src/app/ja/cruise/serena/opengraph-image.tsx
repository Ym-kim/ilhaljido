import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: 'クルーズワーケーション',
    title: 'コスタ・セレーナ',
    subtitle: 'スターリンク船団リフィット、韓国発着を最初に再開した船社',
  })
}
