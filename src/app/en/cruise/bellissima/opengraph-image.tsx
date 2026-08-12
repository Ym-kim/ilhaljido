import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: 'Cruise Workation',
    title: 'MSC Bellissima',
    subtitle: 'A Starlink-equipped mega cruise, boarding in Busan',
  })
}
