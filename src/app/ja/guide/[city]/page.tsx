import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_GUIDES, getGuide, guideLanguageAlternates } from '@/lib/guides'
import { GuideView } from '@/components/guide/GuideView'

// /ja/guide/{city} — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

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
    title: `${guide.name.JP}ワーケーションガイド`,
    description: guide.tagline.JP,
    alternates: {
      canonical: `https://www.wakation.kr/ja/guide/${guide.slug}`,
      languages: guideLanguageAlternates(`/guide/${guide.slug}`),
    },
    openGraph: {
      title: `${guide.name.JP}ワーケーションガイド`,
      description: guide.tagline.JP,
      images: [guide.heroPhoto],
      locale: 'ja_JP',
      alternateLocale: ['ko_KR', 'en_US'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function GuidePageJa({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const guide = getGuide(city)
  if (!guide) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristDestination',
        name: `${guide.name.JP}ワーケーション`,
        description: guide.tagline.JP,
        image: guide.heroPhoto,
        url: `https://www.wakation.kr/ja/guide/${guide.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.facts.map((f) => ({
          '@type': 'Question',
          name: `${guide.name.JP} — ${f.label.JP}`,
          acceptedAnswer: { '@type': 'Answer', text: f.value.JP },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <GuideView guide={guide} forceLang="JP" />
    </>
  )
}
