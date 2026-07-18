import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CollectionView } from '@/components/affiliate/CollectionView'
import { COLLECTIONS, getCollection } from '@/lib/affiliate/collections'
import { cityLanguageAlternates } from '@/lib/cities'

// /en/collections/{slug} — 영어 정적 로케일 라우트 (hreflang으로 KO/JA와 상호 연결)

export const dynamicParams = false

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const col = getCollection(slug)
  if (!col) return {}
  return {
    title: `${col.title.EN} — Workation Collection`,
    description: col.desc.EN,
    alternates: {
      canonical: `https://www.wakation.kr/en/collections/${slug}`,
      languages: cityLanguageAlternates(`/collections/${slug}`),
    },
    openGraph: {
      title: `${col.title.EN} | Wakation`,
      description: col.desc.EN,
      url: `https://www.wakation.kr/en/collections/${slug}`,
      siteName: 'Wakation',
      locale: 'en_US',
      alternateLocale: ['ko_KR', 'ja_JP'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function CollectionSlugPageEn({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const col = getCollection(slug)
  if (!col) notFound()
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wakation.kr/en' },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://www.wakation.kr/en/collections' },
      { '@type': 'ListItem', position: 3, name: col.title.EN, item: `https://www.wakation.kr/en/collections/${slug}` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CollectionView slug={slug} forceLang="EN" />
    </>
  )
}
