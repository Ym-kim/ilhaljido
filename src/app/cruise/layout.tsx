import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '크루즈 워케이션',
  description: '부산 출발 한일 크루즈부터 싱가포르 크루즈까지. 선상 Wi-Fi로 일하며 떠나는 크루즈 워케이션 루트를 안내합니다.',
  keywords: ['크루즈 워케이션', '부산 크루즈', '크루즈 여행', '선상 워케이션'],
  robots: { index: true, follow: true },
}

export default function CruiseLayout({ children }: { children: React.ReactNode }) {
  return children
}
