import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_INSIGHTS, getCityById, cityLanguageAlternates, buildCityFaq } from '@/lib/cities'
import { CityInsightView } from '@/components/destinations/CityInsightView'

// /destinations/{city} — 도시 인사이트 (빌드 타임 정적 생성, SEO 메타는 KO 기준)

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
    title: `${city.name.KO} 워케이션 가이드 — 비자·생활비·인터넷 완전 정리`,
    description: city.metaDesc.KO,
    alternates: {
      canonical: `https://www.wakation.kr/destinations/${cityId}`,
      languages: cityLanguageAlternates(`/destinations/${cityId}`),
    },
    openGraph: {
      title: `${city.name.KO} 워케이션 가이드 | Wakation`,
      description: city.metaDesc.KO,
      url: `https://www.wakation.kr/destinations/${cityId}`,
      siteName: 'Wakation',
      images: [{ url: city.photo, width: 1200, height: 630, alt: `${city.name.KO} 워케이션` }],
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: cityId } = await params
  const city = getCityById(cityId)
  if (!city) notFound()

  // 구조화데이터 — TouristDestination + FAQPage (KO 기준, 국내 SEO 리치결과)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristDestination',
        name: `${city.name.KO} 워케이션`,
        description: city.metaDesc.KO,
        image: city.photo,
        url: `https://www.wakation.kr/destinations/${cityId}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: buildCityFaq(city, 'KO').map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
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
      <CityInsightView city={city} />
    </>
  )
}
