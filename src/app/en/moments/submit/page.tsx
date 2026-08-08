import type { Metadata } from 'next'
import { TravelerNoteSubmitView } from '@/components/moments/TravelerNoteSubmitView'

export const metadata: Metadata = {
  title: 'Write a Traveler Note',
  description: 'Share practical context, routes and work-friendly tips from a destination where you actually stayed.',
  robots: { index: false, follow: true },
}

export default function TravelerNoteSubmitPage() {
  return <TravelerNoteSubmitView forceLang="EN" />
}
