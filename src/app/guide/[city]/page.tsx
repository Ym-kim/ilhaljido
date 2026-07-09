import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_GUIDES, getGuide } from '@/lib/guides'
import { GuideView } from '@/components/guide/GuideView'

// ─────────────────────────────────────────────────────────────────────────────
// /guide/{city} — 목적지 가이드 (빌드 타임 정적 생성, SEO 메타는 KO 기준)
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CITY_GUIDES.map((g) => ({ city: g.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const guide = getGuide(city)
  if (!guide) return {}
  return {
    title: `${guide.name.KO} 워케이션 가이드 | Wakation`,
    description: guide.tagline.KO,
    alternates: { canonical: `https://www.wakation.kr/guide/${guide.slug}` },
    openGraph: {
      title: `${guide.name.KO} 워케이션 가이드 | Wakation`,
      description: guide.tagline.KO,
      images: [guide.heroPhoto],
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const guide = getGuide(city)
  if (!guide) notFound()
  return <GuideView guide={guide} />
}
