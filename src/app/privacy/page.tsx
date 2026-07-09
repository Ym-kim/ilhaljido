import type { Metadata } from 'next'
import { PRIVACY } from '@/lib/legal'
import { LegalView } from '@/components/legal/LegalView'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Wakation',
  description: 'Wakation(주식회사 스테이포워드) 개인정보처리방침',
  alternates: { canonical: 'https://www.wakation.kr/privacy' },
}

export default function PrivacyPage() {
  return <LegalView doc={PRIVACY} />
}
