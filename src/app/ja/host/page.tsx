import type { Metadata } from 'next'
import { HostApplyView } from '@/components/host/HostApplyView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

const languages = {
  ko: 'https://www.wakation.kr/host',
  en: 'https://www.wakation.kr/en/host',
  ja: 'https://www.wakation.kr/ja/host',
  'x-default': 'https://www.wakation.kr/host',
}

export const metadata: Metadata = {
  title: 'ホスト登録 — あなたの宿を働く旅行者へ',
  description:
    'エアビーアンドビーで活動中のホストなら、リスティングのリンクひとつで申請完了。審査後、Wakationにワーケーション視点の個別紹介ページを作成します。バリ・大阪を優先募集。',
  alternates: { canonical: languages.ja, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: 'ホスト登録 | Wakation',
    description: 'リンクひとつで申請 — あなたの宿を働く旅行者に紹介しましょう。',
    url: languages.ja,
    siteName: 'Wakation',
    locale: 'ja_JP',
    alternateLocale: ['ko_KR', 'en_US'],
  },
  robots: { index: true, follow: true },
}

export default function HostPageJa() {
  return <HostApplyView forceLang="JP" />
}
