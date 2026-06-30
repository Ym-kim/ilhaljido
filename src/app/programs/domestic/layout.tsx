import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '국내 워케이션',
  description: '양양 파일럿을 시작으로 국내 지역에서 일과 휴식, 네트워킹, 성장을 연결하는 워케이션 프로그램. 프리랜서·창업자·리모트워커를 위한 국내 체류형 프로그램.',
  keywords: ['국내 워케이션', '양양 워케이션', '강원 워케이션', '프리랜서 워케이션', '창업자 워케이션', '리모트워크 국내'],
  openGraph: {
    title: '국내 워케이션 | Wakation',
    description: '양양 파일럿을 시작으로 국내 지역에서 일과 휴식, 네트워킹, 성장을 연결하는 워케이션 프로그램.',
    url: 'https://www.wakation.kr/programs/domestic',
  },
  alternates: { canonical: 'https://www.wakation.kr/programs/domestic' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
