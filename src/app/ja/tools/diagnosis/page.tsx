import type { Metadata } from 'next'
import { DiagnosisView } from '@/components/tools/DiagnosisView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/tools/diagnosis',
  en: 'https://www.wakation.kr/en/tools/diagnosis',
  ja: 'https://www.wakation.kr/ja/tools/diagnosis',
  'x-default': 'https://www.wakation.kr/tools/diagnosis',
}

export const metadata: Metadata = {
  title: 'ワーケーション診断＆実行レポート（Beta）',
  description:
    '5つの質問で自分のワーケーションタイプを診断。出発前・滞在中・帰国後のチェックリスト付き。登録不要・無料。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'ワーケーション診断 | Wakation',
    description: '5つの質問で自分に合うワーケーションを — 実行チェックリスト付き。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function DiagnosisPageJa() {
  return <DiagnosisView forceLang="JP" />
}
