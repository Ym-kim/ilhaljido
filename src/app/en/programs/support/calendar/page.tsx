import type { Metadata } from 'next'
import { SupportCalendarView } from '@/components/programs/SupportCalendarView'

export const metadata: Metadata = {
  title: 'Korea travel-support application calendar',
  description: 'Browse only the application, deadline and stay dates verified in official Korean regional support-program material.',
  alternates: {
    canonical: 'https://www.wakation.kr/en/programs/support/calendar',
    languages: {
      ko: 'https://www.wakation.kr/programs/support/calendar',
      en: 'https://www.wakation.kr/en/programs/support/calendar',
      ja: 'https://www.wakation.kr/ja/programs/support/calendar',
      'x-default': 'https://www.wakation.kr/programs/support/calendar',
    },
  },
}

export default async function SupportCalendarPageEn({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams
  return <SupportCalendarView lang="EN" requestedMonth={month} />
}
