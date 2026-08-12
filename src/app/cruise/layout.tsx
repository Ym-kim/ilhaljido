import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '크루즈 워케이션',
  description: '부산 출발 한일 크루즈부터 싱가포르 크루즈까지. 선상 Wi-Fi로 일하며 떠나는 크루즈 워케이션 루트를 안내합니다.',
  keywords: ['크루즈 워케이션', '부산 크루즈', '크루즈 여행', '선상 워케이션'],
  // ⚠️ alternates를 정의하지 않으면 루트 layout의 canonical(홈)을 상속한다 — 이 페이지가
  // 스스로를 홈의 중복으로 선언하게 돼 색인에서 빠진다(2026-08-07 프로덕션 실측 후 수정).
  // 2026-08-13: /en·/ja 크루즈 라우트 신설로 languages 선언 추가.
  // ⚠️ 이 layout의 alternates는 하위 아티클에도 상속되지만, 각 아티클 page가
  // 자체 alternates로 통째 override하므로 허브 URL이 누출되지 않는다.
  alternates: {
    canonical: 'https://www.wakation.kr/cruise',
    languages: {
      ko: 'https://www.wakation.kr/cruise',
      en: 'https://www.wakation.kr/en/cruise',
      ja: 'https://www.wakation.kr/ja/cruise',
      'x-default': 'https://www.wakation.kr/cruise',
    },
  },
  robots: { index: true, follow: true },
}

export default function CruiseLayout({ children }: { children: React.ReactNode }) {
  return children
}
