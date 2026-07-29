import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CollectionView } from '@/components/affiliate/CollectionView'
import { COLLECTIONS, getCollection } from '@/lib/affiliate/collections'
import { cityLanguageAlternates } from '@/lib/cities'

// 정적 생성 — 컬렉션 슬러그만 (미확정 슬러그는 404)
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
  if (!col) return { title: '기획전' }
  return {
    title: `${col.title.KO} — 워케이션 기획전`,
    description: col.desc.KO,
    alternates: {
      canonical: `https://www.wakation.kr/collections/${slug}`,
      languages: cityLanguageAlternates(`/collections/${slug}`),
    },
    // og:image는 라우트 opengraph-image.tsx(1200×630 동적 카드)가 자동 공급 (2026-07-28 v2)
    openGraph: {
      title: `${col.title.KO} — 워케이션 기획전`,
      description: col.desc.KO,
    },
    robots: { index: true, follow: true },
  }
}

export default async function CollectionSlugPage({
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
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.wakation.kr/' },
      { '@type': 'ListItem', position: 2, name: '기획전', item: 'https://www.wakation.kr/collections' },
      { '@type': 'ListItem', position: 3, name: col.title.KO, item: `https://www.wakation.kr/collections/${slug}` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CollectionView slug={slug} />
    </>
  )
}
