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
    { id: 'teal', labelKey: 'home_cat_domestic_l', descKey: 'home_cat_domestic_d', href: '/programs/domestic' },
    { id: 'blue', labelKey: 'home_cat_global_l', descKey: 'home_cat_global_d', href: '/programs/global' },
    { id: 'orange', labelKey: 'home_cat_market_l', descKey: 'home_cat_market_d', href: '/programs/market' },
    { id: 'rose', labelKey: 'home_cat_language_l', descKey: 'home_cat_language_d', href: '/language' },
    { id: 'cyan', labelKey: 'home_cat_cruise_l', descKey: 'home_cat_cruise_d', href: '/cruise' },
    { id: 'green', labelKey: 'home_cat_growth_l', descKey: 'home_cat_growth_d', href: '/growth' },
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
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80',
      badgeKey: 'programs_badge_yangyang',
    },
    {
      id: 'global',
      titleKey: 'home_cat_global_l',
      descKey: 'home_cat_global_d',
      href: '/programs/global',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=80',
    },
    {
      id: 'market',
      titleKey: 'home_cat_market_l',
      descKey: 'home_cat_market_d',
      href: '/programs/market',
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=80',
    },
    {
      id: 'language',
      titleKey: 'home_cat_language_l',
      descKey: 'home_cat_language_d',
      href: '/language',
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80',
    },
    {
      id: 'cruise',
      titleKey: 'home_cat_cruise_l',
      descKey: 'home_cat_cruise_d',
      href: '/cruise',
      img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80',
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
    { href: '/programs/domestic', label: translate(lang, 'nav_prog_domestic') },
    { href: '/programs/global', label: translate(lang, 'nav_prog_global') },
    { href: '/programs/market', label: translate(lang, 'nav_prog_market') },
    { href: '/language', label: translate(lang, 'nav_prog_language') },
    { href: '/cruise', label: translate(lang, 'nav_prog_cruise') },
  ]
}

type VisaOption = { value: string; label: Record<Lang, string> }

export const VISA_COUNTRIES: VisaOption[] = [
  { value: 'japan', label: { KO: '일본', EN: 'Japan', JP: '日本' } },
  { value: 'thailand', label: { KO: '태국', EN: 'Thailand', JP: 'タイ' } },
  { value: 'indonesia', label: { KO: '인도네시아', EN: 'Indonesia', JP: 'インドネシア' } },
  { value: 'vietnam', label: { KO: '베트남', EN: 'Vietnam', JP: 'ベトナム' } },
  { value: 'australia', label: { KO: '호주', EN: 'Australia', JP: 'オーストラリア' } },
  { value: 'canada', label: { KO: '캐나다', EN: 'Canada', JP: 'カナダ' } },
  { value: 'portugal', label: { KO: '포르투갈', EN: 'Portugal', JP: 'ポルトガル' } },
  { value: 'other', label: { KO: '기타', EN: 'Other', JP: 'その他' } },
]

export const VISA_PURPOSES: VisaOption[] = [
  { value: 'workation', label: { KO: '워케이션', EN: 'Workation', JP: 'ワーケーション' } },
  { value: 'language', label: { KO: '어학연수', EN: 'Language study', JP: '語学留学' } },
  { value: 'study', label: { KO: '유학', EN: 'Study abroad', JP: '留学' } },
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

export function getVisaMockResult(
  lang: Lang,
  country: string,
  purpose: string,
  duration: string
): { visaType: string; requirement: string; program: string; official: string } {
  const countryLabel = VISA_COUNTRIES.find((c) => c.value === country)?.label[lang] ?? country
  const purposeLabel = VISA_PURPOSES.find((p) => p.value === purpose)?.label[lang] ?? purpose

  const visaByCountry: Record<string, Record<Lang, string>> = {
    japan: {
      KO: '관광 비자(단기체류 90일 무비자) / 취업·연수 비자',
      EN: 'Tourist (90-day visa-free) / work & training visas',
      JP: '観光（90日ビザ免除）/ 就労・研修ビザ',
    },
    thailand: {
      KO: '관광 비자(30일) / TR-O 비자 / METV 복수비자',
      EN: 'Tourist (30 days) / TR-O / METV multi-entry',
      JP: '観光（30日）/ TR-O / METV',
    },
    indonesia: {
      KO: '소셜·문화 비자(B211A) / 비즈니스 비자',
      EN: 'Social-cultural (B211A) / business visa',
      JP: '社交・文化（B211A）/ ビジネスビザ',
    },
    vietnam: {
      KO: '전자 비자(E-Visa 90일) / 비즈니스 비자',
      EN: 'E-Visa (90 days) / business visa',
      JP: '電子ビザ（90日）/ ビジネスビザ',
    },
    australia: {
      KO: '워킹홀리데이 / 학생 비자(500)',
      EN: 'Working holiday / student visa (500)',
      JP: 'ワーホリ / 学生ビザ（500）',
    },
    canada: {
      KO: '워킹홀리데이(IEC) / 학생 비자',
      EN: 'Working holiday (IEC) / student visa',
      JP: 'ワーホリ（IEC）/ 学生ビザ',
    },
    portugal: {
      KO: '디지털 노마드 비자 / D7 패시브 인컴 비자',
      EN: 'Digital nomad visa / D7 passive income visa',
      JP: 'デジタルノマド / D7',
    },
    other: {
      KO: '목적지별 개별 확인 필요',
      EN: 'Check requirements per destination',
      JP: '目的地ごとに個別確認',
    },
  }

  const reqByDuration: Record<string, Record<Lang, string>> = {
    short: {
      KO: '대부분의 국가에서 무비자 또는 도착비자로 입국 가능합니다.',
      EN: 'Many countries allow visa-free or visa-on-arrival entry for short stays.',
      JP: '多くの国で短期滞在はビザ免除または到着ビザが可能です。',
    },
    mid: {
      KO: '복수비자 또는 비즈니스 비자를 권장합니다. 체류 연장 가능 여부를 확인하세요.',
      EN: 'Multi-entry or business visas are recommended. Check extension options.',
      JP: '複数回ビザまたはビジネスビザを推奨。延長可否を確認してください。',
    },
    long: {
      KO: '장기 체류 비자(학생·취업·노마드 비자) 신청을 권장합니다.',
      EN: 'Apply for a long-stay visa (student, work, or nomad).',
      JP: '長期滞在ビザ（学生・就労・ノマド）の申請を推奨します。',
    },
    extended: {
      KO: '장기 거주 허가 또는 특화 비자(D7, 디지털 노마드 등) 신청이 필요합니다.',
      EN: 'Residence permit or specialized visas (D7, digital nomad, etc.) may be required.',
      JP: '居住許可または特化ビザ（D7、デジタルノマド等）が必要な場合があります。',
    },
  }

  const progByPurpose: Record<string, Record<Lang, string>> = {
    workation: {
      KO: '글로벌 워케이션 프로그램',
      EN: 'Global workation program',
      JP: 'グローバルワーケーションプログラム',
    },
    language: {
      KO: '어학·유학 프로그램',
      EN: 'Language study program',
      JP: '語学・留学プログラム',
    },
    study: {
      KO: '어학·유학 프로그램',
      EN: 'Study abroad program',
      JP: '留学プログラム',
    },
    market: {
      KO: '시장조사단·박람회 프로그램',
      EN: 'Market research program',
      JP: '市場調査プログラム',
    },
    business: {
      KO: '시장조사단·박람회 프로그램',
      EN: 'Business & market program',
      JP: 'ビジネス・市場調査プログラム',
    },
    nomad: {
      KO: '글로벌 워케이션 프로그램',
      EN: 'Global workation program',
      JP: 'グローバルワーケーションプログラム',
    },
  }

  const official: Record<Lang, string> = {
    KO: `${countryLabel} 주한 대사관 또는 이민국 공식 홈페이지`,
    EN: `Official embassy or immigration site for ${countryLabel}`,
    JP: `${countryLabel}の大使館・入国管理局公式サイト`,
  }

  return {
    visaType: visaByCountry[country]?.[lang] ?? visaByCountry.other[lang],
    requirement: reqByDuration[duration]?.[lang] ?? reqByDuration.short[lang],
    program: progByPurpose[purpose]?.[lang] ?? translate(lang, 'nav_programs'),
    official: official[lang],
  }
}
