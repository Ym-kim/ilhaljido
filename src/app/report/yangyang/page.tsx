import type { Metadata } from 'next'
import { YangyangReportView } from '@/components/programs/YangyangReportView'

export const metadata: Metadata = {
  title: '양양 워케이션 결과 리포트',
  description:
    '양양 워케이션(2026.6.17–19) 참가자 설문 결과 — 종합 만족도 4.7/5, 추천 의향(NPS) 9.1/10, 재참여 의향 100%. 일정·포함사항·참가자 반응을 그대로 공개합니다.',
  keywords: ['양양 워케이션', '워케이션 후기', '워케이션 만족도', '양양 워케이션 결과', '워케이션 운영 기록'],
  // 구조 결정 ⑥ — EN/JA 로케일은 만들지 않는다(실적 기록물이고 Real Voices 확장이
  // 운영자 자료 대기 중 → 번역보다 콘텐츠 확보가 선행). 대신 KO 단일 라우트의 정합만 맞춘다:
  // alternates 미정의라 루트 canonical(홈)을 상속해 리포트가 홈의 중복으로 선언되고 있었다
  // (2026-08-07 프로덕션 실측: canonical=https://www.wakation.kr).
  alternates: { canonical: 'https://www.wakation.kr/report/yangyang' },
  robots: { index: true, follow: true },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.wakation.kr/' },
    { '@type': 'ListItem', position: 2, name: '양양 워케이션 결과 리포트', item: 'https://www.wakation.kr/report/yangyang' },
  ],
}

export default function YangyangReportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <YangyangReportView />
    </>
  )
}
