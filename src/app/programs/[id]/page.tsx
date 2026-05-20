import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProgramDetailClient } from '@/components/programs/ProgramDetailClient'
import type { Program } from '@/types/database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProgram(id: string): Promise<Program | null> {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any).from('programs').select('*').eq('id', id).single()
  return data
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const program = await getProgram(id)
  if (!program) notFound()

  return <ProgramDetailClient program={program} />
}
