'use client'

import { usePathname } from 'next/navigation'

function documentLang(pathname: string) {
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return 'ja'
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'ko'
}

export function LocaleDocument({
  children,
  organizationJsonLd,
}: {
  children: React.ReactNode
  /** JSON-LD 문자열 — 단일 객체 또는 배열([Organization, WebSite]) 직렬화 모두 유효 */
  organizationJsonLd: string
}) {
  const pathname = usePathname()

  // 2026-09-01: html에 있던 부드러운-스크롤 유틸리티 클래스와 Next의 스크롤 오버라이드
  // 속성을 함께 제거했다. 전역 부드러운 스크롤을 걷어냈으므로 둘 다 무의미하다.
  // (그 속성은 CSS가 부드러운 스크롤일 때만 Next가 전환 중 즉시이동으로 덮어주는 옵션이다.)
  // ⚠️ 주석에 유틸리티 클래스명을 그대로 적으면 Tailwind가 스캔해 쓰지도 않는 CSS를 만든다.
  return (
    <html lang={documentLang(pathname)}>
      <body className="min-h-full bg-[#0f0f0f] text-[#141414] antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        {children}
      </body>
    </html>
  )
}
