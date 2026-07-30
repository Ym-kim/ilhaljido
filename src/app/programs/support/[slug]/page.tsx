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
  const program = getSupportProgram(slug, 'KO')
  if (!program) return {}
  const path = `/programs/support/${slug}`
  return {
    title: `${program.name} 조건·혜택·공식 공고`,
    description: `${program.region} ${program.name}의 지원 내용, 대상 조건, 모집 상태와 공식 공고를 확인하세요.`,
    alternates: { canonical: `https://www.wakation.kr${path}`, languages: { ko: `https://www.wakation.kr${path}`, en: `https://www.wakation.kr/en${path}`, ja: `https://www.wakation.kr/ja${path}`, 'x-default': `https://www.wakation.kr${path}` } },
    robots: { index: !['ended'].includes(program.status), follow: true },
    openGraph: { title: program.name, description: program.benefit, url: `https://www.wakation.kr${path}`, images: [{ url: program.photo }] },
  }
}

export default async function SupportProgramPage({ params }: Props) {
  const { slug } = await params
  const program = getSupportProgram(slug, 'KO')
  if (!program) notFound()
  return <SupportProgramDetailView program={program} lang="KO" />
}

