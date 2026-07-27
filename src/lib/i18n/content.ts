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

export const VISA_COUNTRIES: VisaOption[] = [
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

export function getVisaMockResult(
  lang: Lang,
  country: string,
  purpose: string,
  duration: string
): { visaType: string; requirement: string; program: string; official: string } {
  const countryLabel = VISA_COUNTRIES.find((c) => c.value === country)?.label[lang] ?? country

  // 2026-07 리서치 검증 — 한국 여권 기준. 분기별 갱신 권장 (memory: 비자 데이터 갱신 룰)
  const visaByCountry: Record<string, Record<Lang, string>> = {
    japan: {
      KO: '무비자 90일 · 디지털노마드 비자(특정활동, 연소득 1,000만엔↑, 6개월)',
      EN: 'Visa-free 90d · Digital Nomad visa (¥10M+ income, 6 months)',
      JP: 'ビザ免除90日 · デジタルノマド（年収1,000万円↑、6カ月）',
    },
    thailand: {
      KO: '무비자 30일(축소 확정) · DTV 비자(5년 복수, 회당 180일, 잔고 50만밧)',
      EN: 'Visa-free 30d (reduced) · DTV (5-yr multi, 180d/entry, ฿500K funds)',
      JP: 'ビザ免除30日（短縮）· DTV（5年数次、180日、50万バーツ）',
    },
    indonesia: {
      KO: '무비자 30일 / e-VOA 30+30일 · E33G 원격근무 KITAS(1년, 연소득 $60,000)',
      EN: 'Visa-free 30d / e-VOA · E33G Remote Worker KITAS (1yr, $60K income)',
      JP: 'ビザ免除30日 · E33Gリモートワーク（1年、年収$60,000）',
    },
    vietnam: {
      KO: '무비자 45일(2028.3까지 한시) · e-Visa 90일($25)',
      EN: 'Visa-free 45d (until Mar 2028) · e-Visa 90d ($25)',
      JP: 'ビザ免除45日（2028.3まで）· 電子ビザ90日',
    },
    australia: {
      KO: 'ETA(601) 회당 3개월 · 노마드비자 없음 → 워킹홀리데이(417, 18-30세)',
      EN: 'ETA 3mo/entry · no nomad visa → Working Holiday (417)',
      JP: 'ETA 3カ月 · ノマドビザなし → ワーホリ（417）',
    },
    canada: {
      KO: 'eTA 최대 6개월 · 노마드비자 없음 → 워킹홀리데이(IEC)',
      EN: 'eTA up to 6mo · no nomad visa → IEC Working Holiday',
      JP: 'eTA 最大6カ月 · ワーホリ（IEC）',
    },
    portugal: {
      KO: '셰겐 90/180 · D8 노마드비자(월 €3,680, 2026 기준)',
      EN: 'Schengen 90/180 · D8 nomad visa (€3,680/mo, 2026)',
      JP: 'シェンゲン90/180 · D8ノマドビザ（月€3,680）',
    },
    taiwan: {
      KO: '무비자 90일 · 디지털노마드 비자(연소득 $40K/30세↑, $20K/20대) 최대 2년',
      EN: 'Visa-free 90d · Nomad visa ($40K or $20K income) up to 2 yrs',
      JP: 'ビザ免除90日 · ノマドビザ 最大2年',
    },
    philippines: {
      KO: '무비자 30일 · DNV 노마드비자(연소득 $24,000, 1+1년) — 한국인 대상 여부 대사관 확인',
      EN: 'Visa-free 30d · DNV ($24K income, 1+1yr) — confirm eligibility',
      JP: 'ビザ免除30日 · DNV（年収$24,000）— 対象要確認',
    },
    singapore: {
      KO: '무비자 90일 · 전용 노마드비자 없음 (단기 워케이션은 무비자로 충분)',
      EN: 'Visa-free 90d · no nomad visa (visa-free covers short stays)',
      JP: 'ビザ免除90日 · ノマドビザなし',
    },
    malaysia: {
      KO: '무비자 90일 · DE Rantau 노마드패스(IT 연 $24K / 비IT $60K, 3-12개월)',
      EN: 'Visa-free 90d · DE Rantau Nomad Pass (3-12mo)',
      JP: 'ビザ免除90日 · DE Rantauノマドパス',
    },
    usa: {
      KO: 'ESTA 90일 · 노마드비자 없음 (B1/B2도 원격근무는 회색지대 — 주의)',
      EN: 'ESTA 90d · no nomad visa (remote work is a gray area)',
      JP: 'ESTA 90日 · ノマドビザなし（リモートはグレー）',
    },
    spain: {
      KO: '셰겐 90/180 · DNV 노마드비자(월 €2,850, 최대 5년, 베컴법 24% 세율)',
      EN: 'Schengen 90/180 · DNV (€2,850/mo, up to 5 yrs, 24% tax option)',
      JP: 'シェンゲン90/180 · DNV（月€2,850、最大5年）',
    },
    france: {
      KO: '셰겐 90/180 · 노마드비자 없음 — 2025.6부터 방문비자 원격근무 공식 금지',
      EN: 'Schengen 90/180 · no nomad visa — remote work banned on visitor visa (2025)',
      JP: 'シェンゲン90/180 · 訪問ビザでのリモート禁止（2025.6〜）',
    },
    italy: {
      KO: '셰겐 90/180 · 디지털노마드 비자(연 €28,000, 해외 소득원)',
      EN: 'Schengen 90/180 · Digital Nomad visa (€28K/yr income)',
      JP: 'シェンゲン90/180 · ノマドビザ（年€28,000）',
    },
    germany: {
      KO: '셰겐 90/180 · 전용 없음 → Freiberufler 프리랜서 비자(독일 내 고객 필요)',
      EN: 'Schengen 90/180 · Freiberufler freelance visa (needs German clients)',
      JP: 'シェンゲン90/180 · フリーランスビザ',
    },
    czech: {
      KO: '셰겐 90/180 · Zivno/노마드 프로그램(월 약 CZK 60,530) — 대상국 확인 권장',
      EN: 'Schengen 90/180 · Zivno / nomad program (~CZK 60,530/mo)',
      JP: 'シェンゲン90/180 · Zivno（月約CZK 60,530）',
    },
    hungary: {
      KO: '셰겐 90/180 · White Card(월 €3,000+저축 €10,000, 최대 2년, 가족 동반 불가)',
      EN: 'Schengen 90/180 · White Card (€3,000/mo, max 2 yrs, no family)',
      JP: 'シェンゲン90/180 · ホワイトカード（月€3,000）',
    },
    croatia: {
      KO: '셰겐 90/180 · 노마드 체류허가(월 €2,540, 최대 12개월, 외국소득 비과세)',
      EN: 'Schengen 90/180 · DN permit (€2,540/mo, 12mo, foreign income untaxed)',
      JP: 'シェンゲン90/180 · ノマド滞在許可（月€2,540）',
    },
    georgia: {
      KO: '무비자 360일(약 1년!) · 전용비자 불필요 — 무비자만으로 장기 체류',
      EN: 'Visa-free 360 days — long stays possible with no visa at all',
      JP: 'ビザ免除360日 — ビザなしで長期滞在可',
    },
    uae: {
      KO: '무비자 90일 · Virtual Working Programme(월 $3,500, 1년 거주허가)',
      EN: 'Visa-free 90d · Virtual Working Programme ($3,500/mo, 1-yr permit)',
      JP: 'ビザ免除90日 · バーチャルワーキング（月$3,500）',
    },
    other: {
      KO: '목적지별 개별 확인 필요',
      EN: 'Check requirements per destination',
      JP: '目的地ごとに個別確認',
    },
  }

  // 국가별 최신 변동·주의사항 (있는 국가만)
  const noteByCountry: Record<string, Record<Lang, string>> = {
    thailand: {
      KO: '⚠️ 무비자 60→30일 축소 확정(시행 임박). 장기 체류는 DTV 권장.',
      EN: '⚠️ Visa-free cut 60→30 days. Consider DTV for longer stays.',
      JP: '⚠️ ビザ免除60→30日に短縮。長期はDTV推奨。',
    },
    indonesia: {
      KO: '⚠️ 2025.6부터 비자 연장 온라인 중단 — 대면 신청만 가능.',
      EN: '⚠️ Visa extensions are in-person only since Jun 2025.',
      JP: '⚠️ 延長はオンライン不可（対面のみ）。',
    },
    vietnam: {
      KO: '45일 면제는 2028.3까지 한시 조치입니다.',
      EN: '45-day exemption is temporary (until Mar 2028).',
      JP: '45日免除は2028.3までの限定措置。',
    },
    taiwan: {
      KO: '✨ 2026.1부터 노마드비자 최대 2년으로 확대.',
      EN: '✨ Nomad visa extended to 2 years max (Jan 2026).',
      JP: '✨ 2026.1からノマドビザ最大2年に拡大。',
    },
    france: {
      KO: '⚠️ 방문비자(VLS-TS) 원격근무 공식 금지(2025.6~).',
      EN: '⚠️ Remote work officially banned on visitor visas (since Jun 2025).',
      JP: '⚠️ 訪問ビザでのリモートワーク禁止。',
    },
    japan: {
      KO: '노마드비자는 민간 의료보험(1천만엔 보장) 필수, 연장 불가.',
      EN: 'Nomad visa needs private insurance; non-renewable.',
      JP: 'ノマドビザは民間保険必須、延長不可。',
    },
    georgia: {
      KO: '183일 이상 체류 시 세법상 거주자 — 개인사업자 1% 과세 활용 가능.',
      EN: 'Tax resident after 183 days — 1% small-business tax available.',
      JP: '183日超で税務上の居住者に。',
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
    requirement: [noteByCountry[country]?.[lang], reqByDuration[duration]?.[lang] ?? reqByDuration.short[lang]].filter(Boolean).join(' '),
    program: progByPurpose[purpose]?.[lang] ?? translate(lang, 'nav_programs'),
    official: official[lang],
  }
}
