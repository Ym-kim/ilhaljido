import { MetadataRoute } from 'next'
import { CITY_GUIDES } from '@/lib/guides'

const BASE = 'https://www.wakation.kr'

// 라우트를 우선순위별로 관리 — 신규 공개 페이지 추가 시 여기에 등록
const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                          priority: 1.0, freq: 'weekly' },
  // 커머스·수익 허브 (높은 우선순위)
  { path: '/select',                   priority: 0.9, freq: 'weekly' },
  { path: '/select/hotel',             priority: 0.9, freq: 'weekly' },
  { path: '/stay',                     priority: 0.9, freq: 'weekly' },
  { path: '/select/activity',          priority: 0.8, freq: 'weekly' },
  { path: '/select/esim',              priority: 0.8, freq: 'weekly' },
  { path: '/select/learn',             priority: 0.8, freq: 'weekly' },
  { path: '/activities',               priority: 0.7, freq: 'weekly' },
  { path: '/cruise',                   priority: 0.7, freq: 'monthly' },
  // 프로그램
  { path: '/programs',                 priority: 0.9, freq: 'weekly' },
  { path: '/programs/domestic',        priority: 0.9, freq: 'weekly' },
  { path: '/programs/global',          priority: 0.9, freq: 'weekly' },
  { path: '/programs/market',          priority: 0.8, freq: 'weekly' },
  { path: '/programs/golf',            priority: 0.7, freq: 'monthly' },
  { path: '/programs/healing',         priority: 0.7, freq: 'monthly' },
  { path: '/programs/onsen',           priority: 0.7, freq: 'monthly' },
  { path: '/programs/local',           priority: 0.7, freq: 'monthly' },
  { path: '/programs/networking',      priority: 0.7, freq: 'monthly' },
  { path: '/programs/sports',          priority: 0.7, freq: 'monthly' },
  { path: '/programs/support',         priority: 0.8, freq: 'weekly' },
  { path: '/programs/support/register', priority: 0.5, freq: 'monthly' },
  { path: '/language',                 priority: 0.7, freq: 'monthly' },
  { path: '/learn',                    priority: 0.7, freq: 'monthly' },
  { path: '/growth',                   priority: 0.6, freq: 'monthly' },
  // AI·정보·도구
  { path: '/visa-ai',                  priority: 0.8, freq: 'monthly' },
  { path: '/tools/diagnosis',          priority: 0.7, freq: 'monthly' },
  { path: '/about',                    priority: 0.7, freq: 'monthly' },
  { path: '/infrastructure',           priority: 0.6, freq: 'monthly' },
  { path: '/workspace',                priority: 0.6, freq: 'monthly' },
  { path: '/spaces',                   priority: 0.6, freq: 'monthly' },
  { path: '/moments/submit',           priority: 0.5, freq: 'monthly' },
  // 문의·정책
  { path: '/apply',                    priority: 0.8, freq: 'monthly' },
  { path: '/contact',                  priority: 0.7, freq: 'monthly' },
  { path: '/partnership',              priority: 0.7, freq: 'monthly' },
  { path: '/privacy',                  priority: 0.3, freq: 'yearly' },
  { path: '/terms',                    priority: 0.3, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    ...ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    // 도시 가이드 (guides.ts에 추가 시 자동 반영)
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 },
    ...CITY_GUIDES.map((g) => ({
      url: `${BASE}/guide/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // EN·JA 로케일 가이드 (hreflang 상호 연결)
    ...['en', 'ja'].flatMap((loc) => [
      { url: `${BASE}/${loc}/guide`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
      ...CITY_GUIDES.map((g) => ({
        url: `${BASE}/${loc}/guide/${g.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      })),
    ]),
  ]
}
