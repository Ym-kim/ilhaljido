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
  const canonical = `https://www.wakation.kr/ja/experiences/${slug}`
  return {
    title: `${experience.title.JP} — 体験ガイド`,
    description: experience.metaDescription.JP,
    alternates: { canonical, languages: cityLanguageAlternates(`/experiences/${slug}`) },
    openGraph: { title: experience.title.JP, description: experience.metaDescription.JP, url: canonical, type: 'article', locale: 'ja_JP', images: media ? [{ url: media.src, width: media.width ?? 1200, height: media.height ?? 800, alt: media.alt.JP }] : undefined },
    robots: { index: true, follow: true },
  }
}

export default async function ExperiencePageJa({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = getExperienceEditorial(slug)
  if (!experience) notFound()
  const canonical = `https://www.wakation.kr/ja/experiences/${slug}`
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.wakation.kr/ja' },
    { '@type': 'ListItem', position: 2, name: '現地体験', item: 'https://www.wakation.kr/ja/select/activity' },
    { '@type': 'ListItem', position: 3, name: experience.title.JP, item: canonical },
  ] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><ExperienceEditorialView experience={experience} forceLang="JP" /></>
}

