import type { Metadata } from 'next'
import { TravelerNoteSubmitView } from '@/components/moments/TravelerNoteSubmitView'

export const metadata: Metadata = {
  title: '旅のノートを書く',
  description: '実際に滞在した街の仕事環境、日々の動線、役立ったヒントをWakationに共有してください。',
  robots: { index: false, follow: true },
}

export default function TravelerNoteSubmitPage() {
  return <TravelerNoteSubmitView forceLang="JP" />
}
