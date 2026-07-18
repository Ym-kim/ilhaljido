import type { Metadata } from 'next'
import { EsimSelectView } from '@/components/select/EsimSelectView'
import { cityLanguageAlternates } from '@/lib/cities'

// /ja/select/esim — 일본어 정적 로케일 라우트 (hreflang으로 KO/EN과 상호 연결)

export const metadata: Metadata = {
  title: 'eSIM | Wakation Select',
  description:
    '日本・ベトナム・バリ・ポルトガルのeSIM。出発前にインストールして、空港ですぐ接続。Airaloパートナー商品。',
  keywords: ['eSIM', 'Airalo', '日本 eSIM', 'ベトナム eSIM', 'バリ eSIM', 'ポルトガル eSIM', '海外インターネット'],
  alternates: {
    canonical: 'https://www.wakation.kr/ja/select/esim',
    languages: cityLanguageAlternates('/select/esim'),
  },
  openGraph: {
    title: 'eSIM | Wakation Select',
    description: '空港のSIM行列なし。出発前にインストール、到着後すぐ接続 — AiraloのeSIM。',
    url: 'https://www.wakation.kr/ja/select/esim',
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function EsimSelectPageJa() {
  return <EsimSelectView forceLang="JP" />
}
