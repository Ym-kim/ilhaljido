import type { Metadata } from 'next'
import { DiagnosisView } from '@/components/tools/DiagnosisView'

export const metadata: Metadata = {
  title: '참가자 진단 & 실행 리포트 (Beta)',
  description:
    '다섯 가지 질문으로 나의 워케이션 유형을 진단하고, 떠나기 전·체류 중·돌아온 후 실행 체크리스트를 받아보세요. 회원가입 없이 무료.',
  keywords: ['워케이션 진단', '워케이션 준비', '워케이션 체크리스트', '워케이션 유형', 'Wakation Tools'],
  alternates: {
    canonical: 'https://www.wakation.kr/tools/diagnosis',
    // 2026-08-04 i18n-routes-v1 — EN/JA 라우트 신설과 함께 hreflang 상호 연결
    languages: {
      ko: 'https://www.wakation.kr/tools/diagnosis',
      en: 'https://www.wakation.kr/en/tools/diagnosis',
      ja: 'https://www.wakation.kr/ja/tools/diagnosis',
      'x-default': 'https://www.wakation.kr/tools/diagnosis',
    },
  },
  robots: { index: true, follow: true },
}

export default function DiagnosisPage() {
  return <DiagnosisView />
}
