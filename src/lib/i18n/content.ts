import type { Lang } from './types'
import type { CategoryColor, PartnerIconKey } from '@/lib/icons'
import { translate } from './strings'

export type HomeCategory = {
  id: CategoryColor
  labelKey: string
  descKey: string
  href: string
}

export type PartnerType = {
  id: PartnerIconKey
  titleKey: string
  descKey: string
}

export type ProgramCard = {
  id: string
  titleKey: string
  descKey: string
  href: string
  img: string
  badgeKey?: string
}

export function getHomeCategories(): HomeCategory[] {
  return [
    { id: 'teal', labelKey: 'home_cat_workation_l', descKey: 'home_cat_workation_d', href: '/programs' },
    { id: 'blue', labelKey: 'home_cat_theme_l', descKey: 'home_cat_theme_d', href: '/programs/domestic' },
    { id: 'green', labelKey: 'home_cat_learn_l', descKey: 'home_cat_learn_d', href: '/learn' },
    { id: 'orange', labelKey: 'home_cat_bizglobal_l', descKey: 'home_cat_bizglobal_d', href: '/programs/market' },
    { id: 'cyan', labelKey: 'home_cat_globalstay_l', descKey: 'home_cat_globalstay_d', href: '/programs/global' },
  ]
}

export function getPartnerTypes(): PartnerType[] {
  return [
    { id: 'government', titleKey: 'partner_gov_t', descKey: 'partner_gov_d' },
    { id: 'space', titleKey: 'partner_space_t', descKey: 'partner_space_d' },
    { id: 'education', titleKey: 'partner_edu_t', descKey: 'partner_edu_d' },
    { id: 'language', titleKey: 'partner_lang_t', descKey: 'partner_lang_d' },
    { id: 'host', titleKey: 'partner_host_t', descKey: 'partner_host_d' },
    { id: 'corporate', titleKey: 'partner_corp_t', descKey: 'partner_corp_d' },
    { id: 'b2g', titleKey: 'partner_b2g_t', descKey: 'partner_b2g_d' },
    { id: 'global', titleKey: 'partner_global_t', descKey: 'partner_global_d' },
  ]
}

export function getProgramsList(): ProgramCard[] {
  return [
    {
      id: 'domestic',
      titleKey: 'home_cat_domestic_l',
      descKey: 'home_cat_domestic_d',
      href: '/programs/domestic',
      img: '/media/destinations/jeju-editorial-v1.webp',
      badgeKey: 'programs_badge_yangyang',
    },
    {
      id: 'global',
      titleKey: 'home_cat_global_l',
      descKey: 'home_cat_global_d',
      href: '/programs/global',
      img: '/media/destinations/bali-editorial-v1.webp',
    },
    {
      id: 'market',
      titleKey: 'home_cat_market_l',
      descKey: 'home_cat_market_d',
      href: '/programs/market',
      img: '/media/destinations/osaka-editorial-v1.webp',
    },
    {
      id: 'language',
      titleKey: 'home_cat_language_l',
      descKey: 'home_cat_language_d',
      href: '/language',
      img: '/media/brand-models/domestic-seoul-model-d-urban-work-v1.webp',
    },
    {
      id: 'cruise',
      titleKey: 'home_cat_cruise_l',
      descKey: 'home_cat_cruise_d',
      href: '/cruise',
      img: '/covers/cruise-panstar-real-v2.jpeg',
    },
  ]
}

export function getGrowthCamps() {
  return ['01', '02', '03', '04', '05', '06'].map((n) => ({
    num: n,
    titleKey: `growth_camp_${n}_t`,
    descKey: `growth_camp_${n}_d`,
  }))
}

export function getNavPrograms(lang: Lang) {
  return [
    { href: '/programs/domestic', label: translate(lang, 'nav_prog_recruiting'), isHighlight: true },
    { href: '/programs/domestic', label: translate(lang, 'nav_prog_domestic') },
    { href: '/programs/global', label: translate(lang, 'nav_prog_global') },
    { href: '/programs/domestic', label: translate(lang, 'nav_prog_theme_wak') },
    { href: '/learn', label: translate(lang, 'nav_learn') },
    { href: '/programs/market', label: translate(lang, 'nav_prog_bizglobal') },
    { href: '/programs/global', label: translate(lang, 'nav_prog_globalstay') },
  ]
}

type VisaOption = { value: string; label: Record<Lang, string> }

export type VisaPassportOption = VisaOption & { countryCode?: string }

export const VISA_PASSPORTS: VisaPassportOption[] = [
  { value: 'KR', countryCode: 'KR', label: { KO: '대한민국', EN: 'Republic of Korea', JP: '韓国' } },
  { value: 'JP', countryCode: 'JP', label: { KO: '일본', EN: 'Japan', JP: '日本' } },
  { value: 'US', countryCode: 'US', label: { KO: '미국', EN: 'United States', JP: 'アメリカ' } },
  { value: 'CA', countryCode: 'CA', label: { KO: '캐나다', EN: 'Canada', JP: 'カナダ' } },
  { value: 'AU', countryCode: 'AU', label: { KO: '호주', EN: 'Australia', JP: 'オーストラリア' } },
  { value: 'GB', countryCode: 'GB', label: { KO: '영국', EN: 'United Kingdom', JP: 'イギリス' } },
  { value: 'TW', countryCode: 'TW', label: { KO: '대만', EN: 'Taiwan', JP: '台湾' } },
  { value: 'SG', countryCode: 'SG', label: { KO: '싱가포르', EN: 'Singapore', JP: 'シンガポール' } },
  { value: 'TH', countryCode: 'TH', label: { KO: '태국', EN: 'Thailand', JP: 'タイ' } },
  { value: 'VN', countryCode: 'VN', label: { KO: '베트남', EN: 'Vietnam', JP: 'ベトナム' } },
  { value: 'ID', countryCode: 'ID', label: { KO: '인도네시아', EN: 'Indonesia', JP: 'インドネシア' } },
  { value: 'PH', countryCode: 'PH', label: { KO: '필리핀', EN: 'Philippines', JP: 'フィリピン' } },
  { value: 'MY', countryCode: 'MY', label: { KO: '말레이시아', EN: 'Malaysia', JP: 'マレーシア' } },
  { value: 'DE', countryCode: 'DE', label: { KO: '독일', EN: 'Germany', JP: 'ドイツ' } },
  { value: 'FR', countryCode: 'FR', label: { KO: '프랑스', EN: 'France', JP: 'フランス' } },
  { value: 'IT', countryCode: 'IT', label: { KO: '이탈리아', EN: 'Italy', JP: 'イタリア' } },
  { value: 'ES', countryCode: 'ES', label: { KO: '스페인', EN: 'Spain', JP: 'スペイン' } },
  { value: 'PT', countryCode: 'PT', label: { KO: '포르투갈', EN: 'Portugal', JP: 'ポルトガル' } },
  { value: 'OTHER', label: { KO: '그 외 여권', EN: 'Other passport', JP: 'その他の旅券' } },
]

export const VISA_COUNTRIES: VisaOption[] = [
  { value: 'korea', label: { KO: '대한민국', EN: 'Republic of Korea', JP: '韓国' } },
  { value: 'japan', label: { KO: '일본', EN: 'Japan', JP: '日本' } },
  { value: 'thailand', label: { KO: '태국', EN: 'Thailand', JP: 'タイ' } },
  { value: 'indonesia', label: { KO: '인도네시아', EN: 'Indonesia', JP: 'インドネシア' } },
  { value: 'vietnam', label: { KO: '베트남', EN: 'Vietnam', JP: 'ベトナム' } },
  { value: 'australia', label: { KO: '호주', EN: 'Australia', JP: 'オーストラリア' } },
  { value: 'canada', label: { KO: '캐나다', EN: 'Canada', JP: 'カナダ' } },
  { value: 'portugal', label: { KO: '포르투갈', EN: 'Portugal', JP: 'ポルトガル' } },
  { value: 'taiwan', label: { KO: '대만', EN: 'Taiwan', JP: '台湾' } },
  { value: 'philippines', label: { KO: '필리핀', EN: 'Philippines', JP: 'フィリピン' } },
  { value: 'singapore', label: { KO: '싱가포르', EN: 'Singapore', JP: 'シンガポール' } },
  { value: 'malaysia', label: { KO: '말레이시아', EN: 'Malaysia', JP: 'マレーシア' } },
  { value: 'usa', label: { KO: '미국', EN: 'United States', JP: 'アメリカ' } },
  { value: 'spain', label: { KO: '스페인', EN: 'Spain', JP: 'スペイン' } },
  { value: 'france', label: { KO: '프랑스', EN: 'France', JP: 'フランス' } },
  { value: 'italy', label: { KO: '이탈리아', EN: 'Italy', JP: 'イタリア' } },
  { value: 'germany', label: { KO: '독일', EN: 'Germany', JP: 'ドイツ' } },
  { value: 'czech', label: { KO: '체코', EN: 'Czechia', JP: 'チェコ' } },
  { value: 'hungary', label: { KO: '헝가리', EN: 'Hungary', JP: 'ハンガリー' } },
  { value: 'croatia', label: { KO: '크로아티아', EN: 'Croatia', JP: 'クロアチア' } },
  { value: 'georgia', label: { KO: '조지아', EN: 'Georgia', JP: 'ジョージア' } },
  { value: 'uae', label: { KO: 'UAE 두바이', EN: 'UAE (Dubai)', JP: 'UAE（ドバイ）' } },
  { value: 'other', label: { KO: '기타', EN: 'Other', JP: 'その他' } },
]

export const VISA_PURPOSES: VisaOption[] = [
  { value: 'workation', label: { KO: '워케이션', EN: 'Workation', JP: 'ワーケーション' } },
  { value: 'language', label: { KO: '어학연수', EN: 'Language study', JP: '語学留学' } },
  { value: 'study', label: { KO: '유학', EN: 'Study abroad', JP: '留学' } },
  { value: 'workingholiday', label: { KO: '워킹홀리데이', EN: 'Working holiday', JP: 'ワーキングホリデー' } },
  { value: 'market', label: { KO: '시장조사', EN: 'Market research', JP: '市場調査' } },
  { value: 'business', label: { KO: '비즈니스', EN: 'Business', JP: 'ビジネス' } },
  { value: 'nomad', label: { KO: '디지털 노마드', EN: 'Digital nomad', JP: 'デジタルノマド' } },
]

export const VISA_DURATIONS: VisaOption[] = [
  { value: 'short', label: { KO: '1개월 이하', EN: 'Up to 1 month', JP: '1ヶ月以下' } },
  { value: 'mid', label: { KO: '1-3개월', EN: '1–3 months', JP: '1〜3ヶ月' } },
  { value: 'long', label: { KO: '3-6개월', EN: '3–6 months', JP: '3〜6ヶ月' } },
  { value: 'extended', label: { KO: '6개월 이상', EN: '6+ months', JP: '6ヶ月以上' } },
]
