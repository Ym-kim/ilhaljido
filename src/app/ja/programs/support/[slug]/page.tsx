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
  const program = getSupportProgram(slug, 'JP')
  if (!program) return {}
  const path = `/programs/support/${slug}`
  return {
    title: `${program.name}｜対象条件・支援内容・公式公告`,
    description: `${program.region}の${program.name}について、対象条件・支援内容・募集状況・公式情報を確認できます。`,
    alternates: { canonical: `https://www.wakation.kr/ja${path}`, languages: { ko: `https://www.wakation.kr${path}`, en: `https://www.wakation.kr/en${path}`, ja: `https://www.wakation.kr/ja${path}`, 'x-default': `https://www.wakation.kr${path}` } },
    robots: { index: !['ended'].includes(program.status), follow: true },
    openGraph: { title: program.name, description: program.benefit, url: `https://www.wakation.kr/ja${path}`, images: [{ url: program.photo }] },
  }
}

export default async function SupportProgramPageJa({ params }: Props) {
  const { slug } = await params
  const program = getSupportProgram(slug, 'JP')
  if (!program) notFound()
  return <SupportProgramDetailView program={program} lang="JP" />
}

