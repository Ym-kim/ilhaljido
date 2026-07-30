import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SupportProgramDetailView } from '@/components/programs/SupportProgramDetailView'
import { getSupportProgram, SUPPORT_PROFILES } from '@/lib/support/catalog'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SUPPORT_PROFILES.map(({ id }) => ({ slug: id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = getSupportProgram(slug, 'EN')
  if (!program) return {}
  const path = `/programs/support/${slug}`
  return {
    title: `${program.name}: eligibility, benefits and official notice`,
    description: `Check the benefits, eligibility, dates and official source for ${program.name} in ${program.region}.`,
    alternates: { canonical: `https://www.wakation.kr/en${path}`, languages: { ko: `https://www.wakation.kr${path}`, en: `https://www.wakation.kr/en${path}`, ja: `https://www.wakation.kr/ja${path}`, 'x-default': `https://www.wakation.kr${path}` } },
    robots: { index: !['ended'].includes(program.status), follow: true },
    openGraph: { title: program.name, description: program.benefit, url: `https://www.wakation.kr/en${path}`, images: [{ url: program.photo }] },
  }
}

export default async function SupportProgramPageEn({ params }: Props) {
  const { slug } = await params
  const program = getSupportProgram(slug, 'EN')
  if (!program) notFound()
  return <SupportProgramDetailView program={program} lang="EN" />
}

