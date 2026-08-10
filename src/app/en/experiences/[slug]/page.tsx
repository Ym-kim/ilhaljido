import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExperienceEditorialView } from '@/components/experiences/ExperienceEditorialView'
import { EXPERIENCE_EDITORIALS, getExperienceEditorial } from '@/lib/experiences/editorials'
import { cityLanguageAlternates } from '@/lib/cities'
import { getMediaAsset } from '@/lib/media/assets'

export const dynamicParams = false
export function generateStaticParams() { return EXPERIENCE_EDITORIALS.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const experience = getExperienceEditorial(slug)
  if (!experience) return {}
  const media = getMediaAsset(experience.mediaAssetIds[0])
  const canonical = `https://www.wakation.kr/en/experiences/${slug}`
  return {
    title: `${experience.title.EN} — Experience guide`,
    description: experience.metaDescription.EN,
    alternates: { canonical, languages: cityLanguageAlternates(`/experiences/${slug}`) },
    openGraph: { title: experience.title.EN, description: experience.metaDescription.EN, url: canonical, type: 'article', locale: 'en_US', images: media ? [{ url: media.src, width: media.width ?? 1200, height: media.height ?? 800, alt: media.alt.EN }] : undefined },
    robots: { index: true, follow: true },
  }
}

export default async function ExperiencePageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = getExperienceEditorial(slug)
  if (!experience) notFound()
  const canonical = `https://www.wakation.kr/en/experiences/${slug}`
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wakation.kr/en' },
    { '@type': 'ListItem', position: 2, name: 'Local experiences', item: 'https://www.wakation.kr/en/select/activity' },
    { '@type': 'ListItem', position: 3, name: experience.title.EN, item: canonical },
  ] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ExperienceEditorialView experience={experience} forceLang="EN" /></>
}

