import type { Lang } from '@/lib/i18n/types'

export type MediaAsset = {
  id: string
  src: string
  alt: Record<Lang, string>
  sourceType: 'owned' | 'licensed' | 'generated' | 'partner'
  usage: 'hero' | 'editorial' | 'destination' | 'product' | 'story' | 'social'
  illustrative: boolean
  focalPoint?: { x: number; y: number }
  source?: string
  license?: string
  createdAt?: string
}

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'programs-editorial-coastal-work-v1',
    src: '/campaign/programs-editorial-coastal-work-v1.webp',
    alt: {
      KO: '바다를 바라보며 다음 일정을 정리하는 여행자의 편집 이미지',
      EN: 'Editorial image of a traveler planning the next day by the sea',
      JP: '海を眺めながら次の日程を整理する旅人のイメージ写真',
    },
    sourceType: 'generated',
    usage: 'hero',
    illustrative: true,
    focalPoint: { x: 0.62, y: 0.48 },
    source: 'OpenAI image generation; Wakation art direction prompt archived in docs/ui-polish-audit-2026-07-30.md',
    license: 'Wakation-owned generated editorial asset',
    createdAt: '2026-07-30',
  },
]

export function getMediaAsset(id: string): MediaAsset | undefined {
  return MEDIA_ASSETS.find((asset) => asset.id === id)
}
