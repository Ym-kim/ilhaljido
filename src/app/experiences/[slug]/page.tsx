import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExperienceEditorialView } from '@/components/experiences/ExperienceEditorialView'
import { EXPERIENCE_EDITORIALS, getExperienceEditorial } from '@/lib/experiences/editorials'
import { cityLanguageAlternates } from '@/lib/cities'
import { getMediaAsset } from '@/lib/media/assets'

export const dynamicParams = false

export function generateStaticParams() {
  return EXPERIENCE_EDITORIALS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const experience = getExperienceEditorial(slug)
  if (!experience) return {}
  const media = getMediaAsset(experience.mediaAssetIds[0])
  const canonical = `https://www.wakation.kr/experiences/${slug}`
  return {
    title: `${experience.title.KO} — 체험 가이드`,
    description: experience.metaDescription.KO,
    alternates: { canonical, languages: cityLanguageAlternates(`/experiences/${slug}`) },
    openGraph: {
      title: experience.title.KO,
      description: experience.metaDescription.KO,
      url: canonical,
      type: 'article',
      images: media ? [{ url: media.src, width: 1920, height: 1280, alt: media.alt.KO }] : undefined,
    },
    robots: { index: true, follow: true },
  }
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = getExperienceEditorial(slug)
  if (!experience) notFound()
  const canonical = `https://www.wakation.kr/experiences/${slug}`
  const media = getMediaAsset(experience.mediaAssetIds[0])
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.wakation.kr/' },
        { '@type': 'ListItem', position: 2, name: '현지 체험', item: 'https://www.wakation.kr/select/activity' },
        { '@type': 'ListItem', position: 3, name: experience.title.KO, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: experience.title.KO,
      description: experience.metaDescription.KO,
      image: media ? `https://www.wakation.kr${media.src}` : undefined,
      dateModified: experience.verifiedAt,
      author: { '@type': 'Organization', name: 'Wakation' },
      publisher: { '@type': 'Organization', name: 'Wakation', url: 'https://www.wakation.kr' },
      mainEntityOfPage: canonical,
    },
  ]
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ExperienceEditorialView experience={experience} forceLang="KO" /></>
}
