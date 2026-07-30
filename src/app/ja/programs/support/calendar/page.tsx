import type { Metadata } from 'next'
import { SupportCalendarView } from '@/components/programs/SupportCalendarView'

export const metadata: Metadata = {
  title: '韓国の地域旅行支援・募集日程カレンダー',
  description: '韓国の地域滞在・ワーケーション支援について、公式資料で正確に確認できた受付開始・締切・旅行期間だけを月別に掲載します。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/support/calendar',
    languages: {
      ko: 'https://www.wakation.kr/programs/support/calendar',
      en: 'https://www.wakation.kr/en/programs/support/calendar',
      ja: 'https://www.wakation.kr/ja/programs/support/calendar',
      'x-default': 'https://www.wakation.kr/programs/support/calendar',
    },
  },
}

export default async function SupportCalendarPageJa({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams
  return <SupportCalendarView lang="JP" requestedMonth={month} />
}
