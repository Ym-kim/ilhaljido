import type { Metadata } from 'next'
import { YangyangReportView } from '@/components/programs/YangyangReportView'

export const metadata: Metadata = {
  title: '양양 1기 워케이션 결과 리포트',
  description:
    '양양 워케이션 1기(2026.6.17–19) 참가자 설문 결과 — 종합 만족도 4.7/5, 추천 의향(NPS) 9.1/10, 재참여 의향 100%. 일정·포함사항·참가자 반응을 그대로 공개합니다.',
  keywords: ['양양 워케이션', '워케이션 후기', '워케이션 만족도', '양양 워케이션 1기', '워케이션 결과'],
  robots: { index: true, follow: true },
}

export default function YangyangReportPage() {
  return <YangyangReportView />
}
