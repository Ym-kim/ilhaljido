import type { Metadata } from 'next'
import { TERMS } from '@/lib/legal'
import { LegalView } from '@/components/legal/LegalView'

export const metadata: Metadata = {
  title: '이용약관',
  description: 'Wakation(주식회사 스테이포워드) 이용약관',
  alternates: { canonical: 'https://www.wakation.kr/terms' },
}

export default function TermsPage() {
  return <LegalView doc={TERMS} />
}
