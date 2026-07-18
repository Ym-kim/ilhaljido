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
}

export const THEME_PAGE_CONFIGS: Record<ThemePageKey, ThemePageConfig> = {
  golf: {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1800&q=85',
    eyebrow: { KO: '골프 네트워킹', EN: 'Golf & Networking', JP: 'ゴルフ＆ネットワーク' },
    titleKey: 'golf_hero_title',
    descKey: 'golf_hero_desc',
    themeIds: ['golf-jeju', 'golf-okinawa'],
    featuredExperienceIds: ['theme-golf-montgomerie', 'theme-golf-hoiana', 'theme-golf-alpine-chiangmai', 'theme-golf-pattaya-cc'],
    emailSubject: '골프 네트워킹 워케이션 사전 신청',
  },
  healing: {
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1800&q=85',
    eyebrow: { KO: '힐링·요가', EN: 'Healing & Yoga', JP: 'ヒーリング・ヨガ' },
    titleKey: 'healing_hero_title',
    descKey: 'healing_hero_desc',
    themeIds: ['healing-taean'],
    featuredExperienceIds: ['theme-heal-spa-ubud', 'theme-heal-yoga-bali', 'theme-heal-oasis-chiangmai', 'theme-heal-forest-danang'],
    emailSubject: '힐링 워케이션 사전 신청',
  },
  local: {
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85',
    eyebrow: { KO: '미식·로컬', EN: 'Gourmet & Local', JP: 'グルメ・ローカル' },
    titleKey: 'local_hero_title',
    descKey: 'local_hero_desc',
    themeIds: ['local-jeonju'],
    featuredExperienceIds: ['theme-local-kuromon', 'theme-local-nishiki', 'theme-local-gion-food', 'theme-local-izakaya-kyoto'],
    emailSubject: '미식 로컬 워케이션 사전 신청',
  },
  networking: {
    heroImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1800&q=85',
    eyebrow: { KO: '1인기업 네트워킹', EN: 'Solopreneur Networking', JP: '一人起業家ネットワーキング' },
    titleKey: 'networking_hero_title',
    descKey: 'networking_hero_desc',
    themeIds: ['network-chuncheon'],
    emailSubject: '네트워킹 캠프 사전 신청',
  },
  sports: {
    heroImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1800&q=85',
    eyebrow: { KO: '스포츠 관람', EN: 'Sports Watching', JP: 'スポーツ観戦' },
    titleKey: 'sports_hero_title',
    descKey: 'sports_hero_desc',
    themeIds: ['sports-busan'],
    featuredExperienceIds: ['theme-sports-tokyodome', 'theme-sports-sumo-osaka', 'theme-sports-seoul-baseball', 'theme-sports-tottenham'],
    emailSubject: '스포츠 관람 워케이션 사전 신청',
  },
}
