import type { Metadata } from 'next'
import { JapanTownsView } from '@/components/programs/JapanTownsView'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/programs/onsen — 일본어 정적 로케일 라우트. 콘텐츠는 일본 소도시 료칸·온천 뷰(JapanTownsView).

export const metadata: Metadata = {
  title: '旅館・温泉ワーケーション — 日本の小都市',
  description:
    '河口湖・金沢・湯布院。富士山の湖畔や伝統の街並みで働き、温泉で一日を締めくくる旅館・温泉ワーケーション — 宿の予約とプログラム案内。',
  alternates: {
    canonical: 'https://www.wakation.kr/ja/programs/onsen',
    languages: cityLanguageAlternates('/programs/onsen'),
  },
  openGraph: {
    title: '旅館・温泉ワーケーション | Wakation',
    description: '日本の小都市で働き、温泉で一日を締める — 河口湖・金沢・湯布院。',
    url: 'https://www.wakation.kr/ja/programs/onsen',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function OnsenThemePageJa() {
  return <JapanTownsView forceLang="JP" />
}
