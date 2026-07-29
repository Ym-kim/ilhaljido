import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CollectionView } from '@/components/affiliate/CollectionView'
import { COLLECTIONS, getCollection } from '@/lib/affiliate/collections'
import { cityLanguageAlternates } from '@/lib/cities'
import { getTripSetSocialAsset } from '@/lib/tripSetCampaign'

// /ja/collections/{slug} — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN와 상호 연결)

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
  const socialOg = getTripSetSocialAsset(slug, 'og', 'JP')
  return {
    title: `${col.title.JP} — ワーケーション特集`,
    description: col.desc.JP,
    alternates: {
      canonical: `https://www.wakation.kr/ja/collections/${slug}`,
      languages: cityLanguageAlternates(`/collections/${slug}`),
    },
    openGraph: {
      title: `${col.title.JP} | Wakation`,
      description: col.desc.JP,
      url: `https://www.wakation.kr/ja/collections/${slug}`,
      siteName: 'Wakation',
      locale: 'ja_JP',
      alternateLocale: ['ko_KR', 'en_US'],
      images: socialOg ? [{ url: socialOg, width: 1200, height: 630, alt: col.photoAlt?.JP ?? col.title.JP }] : undefined,
    },
    twitter: socialOg ? {
      card: 'summary_large_image',
      title: col.title.JP,
      description: col.tagline.JP,
      images: [socialOg],
    } : undefined,
    robots: { index: true, follow: true },
  }
}

export default async function CollectionSlugPageJa({
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
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.wakation.kr/ja' },
      { '@type': 'ListItem', position: 2, name: '特集', item: 'https://www.wakation.kr/ja/collections' },
      { '@type': 'ListItem', position: 3, name: col.title.JP, item: `https://www.wakation.kr/ja/collections/${slug}` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CollectionView slug={slug} forceLang="JP" />
    </>
  )
}
