import { renderArticleOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og/articleCard'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return renderArticleOg({
    eyebrow: 'Cruise Workation',
    title: 'Busan–Osaka Cruise Workation',
    subtitle: '17 hours at sea, two buffets and satellite Wi-Fi',
  })
}
