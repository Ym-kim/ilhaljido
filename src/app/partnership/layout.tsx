import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '제휴·파트너십',
  description: '정부기관, 공간 운영사, 교육기관, 기업과 함께 Wakation 생태계를 만들어갑니다. 지자체 협력, 숙박 공간 제공, 기업 복지 연계, 교육 콘텐츠 파트너십 문의.',
  keywords: ['워케이션 제휴', '워케이션 파트너', '지자체 워케이션', '기업 워케이션', '공간 제휴', '숙박 파트너십'],
  openGraph: {
    title: '제휴·파트너십 | Wakation',
    description: '정부기관, 공간 운영사, 교육기관, 기업과 함께 Wakation 생태계를 만들어갑니다.',
    url: 'https://www.wakation.kr/partnership',
  },
  alternates: { canonical: 'https://www.wakation.kr/partnership' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
