import type { Metadata } from 'next'
import { HostApplyView } from '@/components/host/HostApplyView'
import { OG_DEFAULT_IMAGES } from '@/lib/og/defaults'

// 호스트 온보딩 P0 — 본문·법적 가드레일 주석은 src/components/host/HostApplyView.tsx

const languages = {
  ko: 'https://www.wakation.kr/host',
  en: 'https://www.wakation.kr/en/host',
  ja: 'https://www.wakation.kr/ja/host',
  'x-default': 'https://www.wakation.kr/host',
}

export const metadata: Metadata = {
  title: '호스트 등록 — 내 숙소를 일하는 여행자에게',
  description:
    '에어비앤비에서 활동 중인 호스트라면 리스팅 링크 하나로 신청 끝. 검토 후 Wakation에 워케이션 관점의 개별 소개 페이지를 만들어 드립니다. 발리·오사카 우선 모집.',
  alternates: { canonical: languages.ko, languages },
  openGraph: {
    images: OG_DEFAULT_IMAGES,
    title: '호스트 등록 | Wakation',
    description: '리스팅 링크 하나로 신청 — 내 숙소를 일하는 여행자에게 소개하세요.',
    url: languages.ko,
    siteName: 'Wakation',
  },
  robots: { index: true, follow: true },
}

export default function HostPage() {
  return <HostApplyView />
}
