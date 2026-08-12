import { MetadataRoute } from 'next'
import { CITY_GUIDES } from '@/lib/guides'
import { COLLECTIONS } from '@/lib/affiliate/collections'
import { CITY_INSIGHTS } from '@/lib/cities'
import { getSupportCatalog } from '@/lib/support/catalog'
import { EXPERIENCE_EDITORIALS } from '@/lib/experiences/editorials'
import { TRAVELER_NOTES } from '@/lib/moments'

const BASE = 'https://www.wakation.kr'

// 라우트를 우선순위별로 관리 — 신규 공개 페이지 추가 시 여기에 등록
const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                          priority: 1.0, freq: 'weekly' },
  { path: '/en',                       priority: 0.9, freq: 'weekly' },
  { path: '/ja',                       priority: 0.9, freq: 'weekly' },
  { path: '/ja/campaign/korea-weekend', priority: 0.8, freq: 'weekly' },
  // 커머스·수익 허브 (높은 우선순위)
  { path: '/select',                   priority: 0.9, freq: 'weekly' },
  { path: '/select/hotel',             priority: 0.9, freq: 'weekly' },
  { path: '/select/activity',          priority: 0.8, freq: 'weekly' },
  { path: '/select/esim',              priority: 0.8, freq: 'weekly' },
  { path: '/select/learn',             priority: 0.8, freq: 'weekly' },
  { path: '/cruise',                   priority: 0.7, freq: 'monthly' },
  { path: '/cruise/miracle',           priority: 0.7, freq: 'monthly' },
  { path: '/cruise/bellissima',        priority: 0.7, freq: 'monthly' },
  { path: '/cruise/serena',            priority: 0.7, freq: 'monthly' },
  { path: '/cruise/world-europa',      priority: 0.7, freq: 'monthly' },
  { path: '/campaign/chuseok-4days',   priority: 0.7, freq: 'weekly' },
  { path: '/stories',                  priority: 0.7, freq: 'weekly' },
  { path: '/collections',              priority: 0.8, freq: 'weekly' },
  // 목적지 가이드
  { path: '/destinations',             priority: 0.9, freq: 'weekly' },
  { path: '/destinations/compare',     priority: 0.7, freq: 'monthly' },
  // 프로그램
  { path: '/programs',                 priority: 0.9, freq: 'weekly' },
  { path: '/hosted',                   priority: 0.9, freq: 'weekly' },
  { path: '/programs/domestic',        priority: 0.9, freq: 'weekly' },
  { path: '/programs/domestic/jeongseon-train', priority: 0.7, freq: 'monthly' },
  { path: '/programs/global',          priority: 0.9, freq: 'weekly' },
  { path: '/programs/global/manado',   priority: 0.7, freq: 'monthly' },
  { path: '/programs/market',          priority: 0.8, freq: 'weekly' },
  { path: '/programs/golf',            priority: 0.7, freq: 'monthly' },
  { path: '/programs/healing',         priority: 0.7, freq: 'monthly' },
  { path: '/programs/onsen',           priority: 0.7, freq: 'monthly' },
  { path: '/programs/local',           priority: 0.7, freq: 'monthly' },
  { path: '/programs/networking',      priority: 0.7, freq: 'monthly' },
  { path: '/programs/sports',          priority: 0.7, freq: 'monthly' },
  { path: '/programs/support',         priority: 0.8, freq: 'weekly' },
  { path: '/programs/support/calendar', priority: 0.75, freq: 'weekly' },
  { path: '/programs/support/half-price-travel', priority: 0.75, freq: 'weekly' },
  { path: '/programs/support/register', priority: 0.5, freq: 'monthly' },
  { path: '/report/yangyang',          priority: 0.7, freq: 'monthly' },
  { path: '/language',                 priority: 0.7, freq: 'monthly' },
  { path: '/learn',                    priority: 0.7, freq: 'monthly' },
  { path: '/growth',                   priority: 0.6, freq: 'monthly' },
  // AI·정보·도구
  { path: '/visa-ai',                  priority: 0.8, freq: 'monthly' },
  { path: '/tools/diagnosis',          priority: 0.7, freq: 'monthly' },
  { path: '/about',                    priority: 0.7, freq: 'monthly' },
  { path: '/infrastructure',           priority: 0.6, freq: 'monthly' },
  { path: '/moments',                   priority: 0.7, freq: 'weekly' },
  // 문의·정책
  { path: '/apply',                    priority: 0.8, freq: 'monthly' },
  { path: '/business',                 priority: 0.8, freq: 'monthly' },
  { path: '/contact',                  priority: 0.7, freq: 'monthly' },
  { path: '/partnership',              priority: 0.7, freq: 'monthly' },
  { path: '/privacy',                  priority: 0.3, freq: 'yearly' },
  { path: '/terms',                    priority: 0.3, freq: 'yearly' },
  { path: '/media-credits',            priority: 0.2, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const supportPrograms = getSupportCatalog('KO', now).filter((program) => program.status !== 'ended')

  return [
    ...ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...['en', 'ja'].map((locale) => ({
      url: `${BASE}/${locale}/media-credits`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
    // 2026-08-04 i18n-routes-v1 — stories·moments·진단 EN/JA 라우트 신설분
    ...['en', 'ja'].flatMap((locale) => [
      { url: `${BASE}/${locale}/stories`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 },
      { url: `${BASE}/${locale}/moments`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 },
      { url: `${BASE}/${locale}/tools/diagnosis`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    ]),
    // 2026-08-13 cruise-articles-i18n-v1 — 크루즈 허브·아티클 4편 EN/JA 라우트 신설분
    ...['en', 'ja'].flatMap((locale) =>
      ['/cruise', '/cruise/miracle', '/cruise/bellissima', '/cruise/serena', '/cruise/world-europa'].map((p) => ({
        url: `${BASE}/${locale}${p}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
    // 여행자 노트 상세 — 에디터 소개와 검수 완료 회원 후기만 색인
    ...['', '/en', '/ja'].flatMap((localePrefix) => TRAVELER_NOTES.map((note) => ({
      url: `${BASE}${localePrefix}/moments/${note.slug}`,
      lastModified: new Date(`${note.publishedAt}T00:00:00+09:00`),
      changeFrequency: 'monthly' as const,
      priority: localePrefix ? 0.55 : 0.7,
    }))),
    // 목적지 인사이트 카드 (cities.ts에 추가 시 자동 반영)
    ...CITY_INSIGHTS.map((c) => ({
      url: `${BASE}/destinations/${c.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // EN·JA 로케일 목적지 (hreflang 상호 연결)
    ...['en', 'ja'].flatMap((loc) => [
      { url: `${BASE}/${loc}/destinations`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.75 },
      ...CITY_INSIGHTS.map((c) => ({
        url: `${BASE}/${loc}/destinations/${c.id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ]),
    // 지원 프로그램 상세 — 검증일을 lastModified로 사용하고 운영 종료 항목은 제외
    ...['', '/en', '/ja'].flatMap((localePrefix) => [
      ...(localePrefix ? [{
        url: `${BASE}${localePrefix}/programs/support/half-price-travel`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      }, {
        url: `${BASE}${localePrefix}/programs/support/calendar`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      }] : []),
      ...supportPrograms.map((program) => ({
        url: `${BASE}${localePrefix}/programs/support/${program.slug}`,
        lastModified: new Date(`${program.verifiedAt}T00:00:00+09:00`),
        changeFrequency: 'weekly' as const,
        priority: localePrefix ? 0.55 : 0.7,
      })),
    ]),
    // EN·JA 로케일 select·programs (forceLang 2차, hreflang 상호 연결)
    ...['en', 'ja'].flatMap((loc) =>
      ['/select', '/select/hotel', '/select/activity', '/select/esim', '/select/learn', '/programs', '/hosted', '/programs/global', '/programs/domestic', '/programs/market'].map((p) => ({
        url: `${BASE}/${loc}${p}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ),
    // EN·JA 로케일 테마·컬렉션·비교·지원사업 (forceLang 3차)
    ...['en', 'ja'].flatMap((loc) => [
      ...['/programs/golf', '/programs/healing', '/programs/local', '/programs/networking', '/programs/sports', '/programs/onsen', '/programs/support', '/collections', '/destinations/compare'].map((p) => ({
        url: `${BASE}/${loc}${p}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...COLLECTIONS.map((c) => ({
        url: `${BASE}/${loc}/collections/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]),
    // 테마 기획전 상세 (collections.ts에 추가 시 자동 반영)
    ...COLLECTIONS.map((c) => ({
      url: `${BASE}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
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
    // 편집형 체험 상세 — 상품 카탈로그가 아닌 독자적 정보 콘텐츠
    ...['', '/en', '/ja'].flatMap((localePrefix) => EXPERIENCE_EDITORIALS.map((experience) => ({
      url: `${BASE}${localePrefix}/experiences/${experience.slug}`,
      lastModified: new Date(`${experience.verifiedAt}T00:00:00+09:00`),
      changeFrequency: 'weekly' as const,
      priority: localePrefix ? 0.65 : 0.8,
    }))),
  ]
}
