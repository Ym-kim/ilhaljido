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

  return (
    <html lang={documentLang(pathname)} className="scroll-smooth" data-scroll-behavior="smooth">
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
