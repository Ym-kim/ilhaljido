import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/mypage', '/login', '/signup', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://www.wakation.kr/sitemap.xml',
    host: 'https://www.wakation.kr',
  }
}
