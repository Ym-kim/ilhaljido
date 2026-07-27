import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProgramDetailClient } from '@/components/programs/ProgramDetailClient'
import { withEffectiveStatus, programPhoto } from '@/lib/programs'
import type { Program } from '@/types/database'

async function getProgram(id: string): Promise<Program | null> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any).from('programs').select('*').eq('id', id).single()
  return data
}

// DB 프로그램 상세 — 프로그램별 고유 메타 (2026-07-21 SEO 감사: 기존 홈 기본 타이틀 공유 해소)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const p = await getProgram(id)
  if (!p) return { title: '프로그램을 찾을 수 없습니다', robots: { index: false } }
  const url = `https://www.wakation.kr/programs/${id}`
  // description: subtitle 우선, 없으면 description 앞부분 (150자 캡)
  const desc = (p.subtitle || p.description || '').replace(/\s+/g, ' ').trim().slice(0, 150)
  const photo = programPhoto(p)
  return {
    title: `${p.title} — ${p.region} 워케이션`,
    description: desc || `${p.region}에서 진행되는 Wakation ${p.title} 프로그램. 일정·포함사항·신청 안내.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${p.title} | Wakation`,
      description: desc,
      url,
      siteName: 'Wakation',
      ...(photo ? { images: [{ url: photo }] } : {}),
    },
  }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const raw = await getProgram(id)
  if (!raw) notFound()

  // 지난 회차 자동 closed + picsum 플레이스홀더 사진 교체
  const program = withEffectiveStatus({ ...raw, image_url: programPhoto(raw) })

  return <ProgramDetailClient program={program} />
}
