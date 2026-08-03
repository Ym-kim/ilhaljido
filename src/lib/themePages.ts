// ─────────────────────────────────────────────────────────────────────────────
// 테마 프로그램 페이지 공유 설정 — KO(/programs/*)·EN(/en/programs/*)·JA(/ja/programs/*)
// 3로케일 라우트가 동일한 ThemeProgramPage props를 spread해 사용한다.
// emailSubject는 메일 수신자가 한국인 운영자이므로 3로케일 모두 KO 유지.
// (onsen은 ThemeProgramPage가 아닌 JapanTownsView를 쓰므로 여기 포함하지 않음)
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '@/lib/i18n/types'

export type ThemePageKey = 'golf' | 'healing' | 'local' | 'networking' | 'sports'

export type ThemePageConfig = {
  heroImage: string
  /** 로케일별 eyebrow — KO는 기존 카피 그대로, EN/JP는 strings.ts 테마 라벨 카피 기준 */
  eyebrow: Record<Lang, string>
  titleKey: string
  descKey: string
  themeIds: string[]
  featuredExperienceIds?: string[]
  emailSubject: string
  /** Hosted 관심 등록 섹션 — 지정한 테마에만 노출 (feat/hosted-lead-v1) */
  leadVariant?: 'networking'
  /** 테마 ↔ 가이드·Trip Set 크로스링크 (2026-08-04) — 실존 라우트·정확 매칭만 (억지 매핑 금지) */
  crossLinks?: { href: string; label: Record<Lang, string> }[]
}

export const THEME_PAGE_CONFIGS: Record<ThemePageKey, ThemePageConfig> = {
  golf: {
    heroImage: '/media/verified/unsplash/1535131749006-b7f58c99034b.webp',
    eyebrow: { KO: '골프 네트워킹', EN: 'Golf & Networking', JP: 'ゴルフ＆ネットワーク' },
    titleKey: 'golf_hero_title',
    descKey: 'golf_hero_desc',
    themeIds: ['golf-jeju', 'golf-okinawa'],
    featuredExperienceIds: ['theme-golf-montgomerie', 'theme-golf-hoiana', 'theme-golf-alpine-chiangmai', 'theme-golf-pattaya-cc'],
    emailSubject: '골프 네트워킹 워케이션 사전 신청',
    crossLinks: [
      { href: '/guide/jeju', label: { KO: '제주 워케이션 가이드', EN: 'Jeju workation guide', JP: '済州ワーケーションガイド' } },
      { href: '/guide/chiangmai', label: { KO: '치앙마이 워케이션 가이드', EN: 'Chiang Mai workation guide', JP: 'チェンマイワーケーションガイド' } },
    ],
  },
  healing: {
    heroImage: '/media/verified/unsplash/1506126613408-eca07ce68773.webp',
    eyebrow: { KO: '힐링·요가', EN: 'Healing & Yoga', JP: 'ヒーリング・ヨガ' },
    titleKey: 'healing_hero_title',
    descKey: 'healing_hero_desc',
    themeIds: ['healing-taean'],
    featuredExperienceIds: ['theme-heal-spa-ubud', 'theme-heal-yoga-bali', 'theme-heal-oasis-chiangmai', 'theme-heal-forest-danang'],
    emailSubject: '힐링 워케이션 사전 신청',
    crossLinks: [
      { href: '/guide/bali', label: { KO: '발리 워케이션 가이드', EN: 'Bali workation guide', JP: 'バリワーケーションガイド' } },
      { href: '/collections/jeju-solo-reset', label: { KO: '제주 혼자 회복 세트', EN: 'Jeju solo-reset trip set', JP: '済州ひとりリセットセット' } },
    ],
  },
  local: {
    heroImage: '/media/product-editorial/program-jeonju-hanok-licensed-v1.webp',
    eyebrow: { KO: '미식·로컬', EN: 'Gourmet & Local', JP: 'グルメ・ローカル' },
    titleKey: 'local_hero_title',
    descKey: 'local_hero_desc',
    themeIds: ['local-jeonju'],
    featuredExperienceIds: ['theme-local-kuromon', 'theme-local-nishiki', 'theme-local-gion-food', 'theme-local-izakaya-kyoto'],
    emailSubject: '미식 로컬 워케이션 사전 신청',
    crossLinks: [
      { href: '/guide/jeonju', label: { KO: '전주 워케이션 가이드 — 유네스코 미식 도시', EN: 'Jeonju guide — UNESCO gastronomy city', JP: '全州ガイド — ユネスコ美食都市' } },
      { href: '/collections/osaka-foodie', label: { KO: '오사카 미식 워케이션 기획전', EN: 'Osaka foodie collection', JP: '大阪グルメ特集' } },
    ],
  },
  networking: {
    heroImage: '/media/verified/unsplash/1515187029135-18ee286d815b.webp',
    eyebrow: { KO: '1인기업 네트워킹', EN: 'Solopreneur Networking', JP: '一人起業家ネットワーキング' },
    titleKey: 'networking_hero_title',
    descKey: 'networking_hero_desc',
    themeIds: ['network-chuncheon'],
    emailSubject: '네트워킹 캠프 사전 신청',
    leadVariant: 'networking',
  },
  sports: {
    heroImage: '/media/destinations/busan-editorial-v1.webp',
    eyebrow: { KO: '스포츠 관람', EN: 'Sports Watching', JP: 'スポーツ観戦' },
    titleKey: 'sports_hero_title',
    descKey: 'sports_hero_desc',
    themeIds: ['sports-busan'],
    featuredExperienceIds: ['theme-sports-tokyodome', 'theme-sports-sumo-osaka', 'theme-sports-seoul-baseball', 'theme-sports-tottenham'],
    emailSubject: '스포츠 관람 워케이션 사전 신청',
    crossLinks: [
      { href: '/guide/busan', label: { KO: '부산 워케이션 가이드', EN: 'Busan workation guide', JP: '釜山ワーケーションガイド' } },
      { href: '/collections/busan-weekend', label: { KO: '부산 주말 2박 3일 세트', EN: 'Busan weekend trip set', JP: '釜山週末セット' } },
    ],
  },
}
