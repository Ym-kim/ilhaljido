import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '비자·체류 정보',
  description: '국가별 체류와 비자 정보를 참고용으로 확인하고, 공식 기관 확인과 전문가 검토로 이어질 수 있는 안내 서비스. 워케이션·어학연수·장기체류를 준비하는 분을 위한 비자 가이드.',
  keywords: ['비자 정보', '체류 정보', '워케이션 비자', '디지털 노마드 비자', '어학연수 비자', '장기체류 비자', '해외 취업 비자'],
  openGraph: {
    title: '비자·체류 정보 | Wakation',
    description: '국가별 체류와 비자 정보를 참고용으로 확인하고, 공식 기관 확인과 전문가 검토로 이어질 수 있는 안내 서비스.',
    url: 'https://www.wakation.kr/visa-ai',
  },
  alternates: { canonical: 'https://www.wakation.kr/visa-ai' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
