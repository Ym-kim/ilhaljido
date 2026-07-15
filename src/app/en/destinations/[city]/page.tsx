import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_INSIGHTS, getCityById, cityLanguageAlternates } from '@/lib/cities'
import { CityInsightView } from '@/components/destinations/CityInsightView'

// /en/destinations/{city} — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export function generateStaticParams() {
  return CITY_INSIGHTS.map((c) => ({ city: c.id }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: cityId } = await params
  const city = getCityById(cityId)
  if (!city) return {}
  return {
    title: `${city.name.EN} Workation Guide — Visa, Cost & Internet`,
    description: city.metaDesc.EN,
    alternates: {
      canonical: `https://www.wakation.kr/en/destinations/${cityId}`,
      languages: cityLanguageAlternates(`/destinations/${cityId}`),
    },
    openGraph: {
      title: `${city.name.EN} Workation Guide | Wakation`,
      description: city.metaDesc.EN,
      url: `https://www.wakation.kr/en/destinations/${cityId}`,
      siteName: 'Wakation',
      images: [{ url: city.photo, width: 1200, height: 630, alt: `${city.name.EN} workation` }],
      locale: 'en_US',
      alternateLocale: ['ko_KR', 'ja_JP'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function CityPageEn({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: cityId } = await params
  const city = getCityById(cityId)
  if (!city) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: `${city.name.EN} Workation`,
    description: city.metaDesc.EN,
    image: city.photo,
    url: `https://www.wakation.kr/en/destinations/${cityId}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <CityInsightView city={city} forceLang="EN" />
    </>
  )
}
