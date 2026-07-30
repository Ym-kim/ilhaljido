import type { Metadata } from 'next'
import { SupportCalendarView } from '@/components/programs/SupportCalendarView'

export const metadata: Metadata = {
  title: '워케이션·여행지원금 모집 일정 캘린더',
  description: '공식 자료에서 정확한 날짜를 확인한 지역 체류·워케이션 지원사업의 접수 시작, 마감과 여행 기간을 월별로 확인하세요.',
  alternates: {
    canonical: 'https://www.wakation.kr/programs/support/calendar',
    languages: {
      ko: 'https://www.wakation.kr/programs/support/calendar',
      en: 'https://www.wakation.kr/en/programs/support/calendar',
      ja: 'https://www.wakation.kr/ja/programs/support/calendar',
      'x-default': 'https://www.wakation.kr/programs/support/calendar',
    },
  },
}

export default async function SupportCalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams
  return <SupportCalendarView lang="KO" requestedMonth={month} />
}
