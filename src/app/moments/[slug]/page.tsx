import { notFound } from 'next/navigation'
import { TravelerNoteDetailView } from '@/components/moments/TravelerNoteDetailView'
import { getTravelerNote } from '@/lib/moments'
import { travelerNoteMetadata, travelerNoteStaticParams } from '@/lib/momentMetadata'

export const dynamicParams = false
export const generateStaticParams = travelerNoteStaticParams

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return travelerNoteMetadata(slug, 'KO')
}

export default async function TravelerNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getTravelerNote(slug)
  if (!note) notFound()
  return <TravelerNoteDetailView note={note} />
}
