import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_GUIDES, getGuide, guideLanguageAlternates } from '@/lib/guides'
import { GuideView } from '@/components/guide/GuideView'

// /en/guide/{city} — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

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
    title: `${guide.name.EN} Workation Guide`,
    description: guide.tagline.EN,
    alternates: {
      canonical: `https://www.wakation.kr/en/guide/${guide.slug}`,
      languages: guideLanguageAlternates(`/guide/${guide.slug}`),
    },
    openGraph: {
      title: `${guide.name.EN} Workation Guide`,
      description: guide.tagline.EN,
      images: [guide.heroPhoto],
      locale: 'en_US',
      alternateLocale: ['ko_KR', 'ja_JP'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function GuidePageEn({
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
        name: `${guide.name.EN} Workation`,
        description: guide.tagline.EN,
        image: guide.heroPhoto,
        url: `https://www.wakation.kr/en/guide/${guide.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.facts.map((f) => ({
          '@type': 'Question',
          name: `${guide.name.EN} — ${f.label.EN}`,
          acceptedAnswer: { '@type': 'Answer', text: f.value.EN },
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
      <GuideView guide={guide} forceLang="EN" />
    </>
  )
}
