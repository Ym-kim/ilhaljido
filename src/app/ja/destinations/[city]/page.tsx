import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITY_INSIGHTS, getCityById, cityLanguageAlternates } from '@/lib/cities'
import { CityInsightView } from '@/components/destinations/CityInsightView'

// /ja/destinations/{city} — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN와 상호 연결)

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
    title: `${city.name.JP} ワーケーションガイド — ビザ・生活費・ネット`,
    description: city.metaDesc.JP,
    alternates: {
      canonical: `https://www.wakation.kr/ja/destinations/${cityId}`,
      languages: cityLanguageAlternates(`/destinations/${cityId}`),
    },
    openGraph: {
      title: `${city.name.JP} ワーケーションガイド | Wakation`,
      description: city.metaDesc.JP,
      url: `https://www.wakation.kr/ja/destinations/${cityId}`,
      siteName: 'Wakation',
      images: [{ url: city.photo, width: 1200, height: 630, alt: `${city.name.JP} ワーケーション` }],
      locale: 'ja_JP',
      alternateLocale: ['ko_KR', 'en_US'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function CityPageJa({
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
    name: `${city.name.JP} ワーケーション`,
    description: city.metaDesc.JP,
    image: city.photo,
    url: `https://www.wakation.kr/ja/destinations/${cityId}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <CityInsightView city={city} forceLang="JP" />
    </>
  )
}
