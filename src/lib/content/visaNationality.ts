import type { ResearchSource } from '@/lib/content/research'
import type { Lang } from '@/lib/i18n/types'

type LocalizedText = Record<Lang, string>

type VisaNationalityProfile = {
  visaType: LocalizedText
  requirement: LocalizedText
  verifiedAt: string
}

const VERIFIED_AT = '2026-08-08'
const SCHENGEN_DESTINATIONS = new Set(['portugal', 'spain', 'france', 'italy', 'germany', 'czech', 'hungary', 'croatia'])

const KR_PROFILES: Partial<Record<string, VisaNationalityProfile>> = {
  japan: {
    visaType: { KO: '한국 여권: 단기 방문 최대 90일 비자 면제', EN: 'Korean passport: visa-exempt short stay for up to 90 days', JP: '韓国旅券：短期滞在は最長90日まで査証免除' },
    requirement: {
      KO: '관광·단기 상용 등 비영리 단기체류 기준입니다. 일본에서 보수를 받는 활동이나 장기 체류는 목적에 맞는 재류자격을 확인해야 합니다.',
      EN: 'This applies to non-remunerated short stays such as tourism and qualifying business visits. Paid activity in Japan and longer stays require the appropriate status of residence.',
      JP: '観光・短期商用など報酬を伴わない短期滞在が対象です。日本で報酬を受ける活動や長期滞在は目的に合う在留資格が必要です。',
    },
    verifiedAt: VERIFIED_AT,
  },
  taiwan: {
    visaType: { KO: '한국 여권: 최대 90일 무비자', EN: 'Korean passport: visa-exempt for up to 90 days', JP: '韓国旅券：最長90日まで査証免除' },
    requirement: {
      KO: '입국일 기준 여권 잔여 유효기간 6개월과 확정된 출국 항공권이 필요합니다. 무비자 체류는 원칙적으로 연장되지 않으며 취업은 허용되지 않습니다.',
      EN: 'Six months of passport validity on arrival and a confirmed onward ticket are required. Visa-exempt stays are generally not extendable and do not permit employment.',
      JP: '入国時点で旅券残存6カ月と出国便の予約確認が必要です。査証免除滞在は原則延長できず、就労は認められません。',
    },
    verifiedAt: VERIFIED_AT,
  },
  usa: {
    visaType: { KO: '한국 여권: VWP 최대 90일 + ESTA', EN: 'Korean passport: VWP up to 90 days with ESTA', JP: '韓国旅券：VWPで最長90日、ESTA必須' },
    requirement: {
      KO: '관광·단기 상용 목적은 비자면제프로그램을 이용할 수 있지만 출발 전 ESTA 승인과 전자여권이 필요합니다. ESTA는 입국을 보장하지 않으며 현지 취업은 허용하지 않습니다.',
      EN: 'Tourism and qualifying short business visits can use the Visa Waiver Program, but an e-Passport and ESTA approval are required. ESTA does not guarantee admission or permit local employment.',
      JP: '観光・短期商用はビザ免除プログラムを利用できますが、電子旅券とESTA承認が必要です。ESTAは入国を保証せず、現地就労は認められません。',
    },
    verifiedAt: VERIFIED_AT,
  },
  canada: {
    visaType: { KO: '한국 여권: 단기 방문 비자 면제 + 항공편 eTA', EN: 'Korean passport: visa-exempt visitor; eTA for air travel', JP: '韓国旅券：短期訪問は査証免除、空路はeTA' },
    requirement: {
      KO: '항공편으로 입국할 때 eTA가 필요하며 방문 체류는 통상 최대 6개월입니다. 실제 기간은 입국 심사에서 결정되고 현지 취업은 별도 허가가 필요합니다.',
      EN: 'An eTA is required when arriving by air and visitor stays are normally up to six months. The actual period is set at the border; local work requires separate authorization.',
      JP: '空路で入国する場合はeTAが必要で、訪問滞在は通常最長6カ月です。実際の期間は入国審査で決まり、現地就労には別の許可が必要です。',
    },
    verifiedAt: VERIFIED_AT,
  },
  australia: {
    visaType: { KO: '한국 여권: ETA로 1회 최대 3개월', EN: 'Korean passport: ETA stay up to three months per entry', JP: '韓国旅券：ETAで1回最長3カ月' },
    requirement: {
      KO: '관광·친지방문·단기 상용 목적은 ETA(601)를 검토할 수 있습니다. 취업·장기 체류는 다른 비자가 필요합니다.',
      EN: 'Tourism, family visits and qualifying short business visits can use ETA (601). Employment and longer stays require a different visa.',
      JP: '観光・親族訪問・短期商用はETA（601）を利用できます。就労・長期滞在には別の査証が必要です。',
    },
    verifiedAt: VERIFIED_AT,
  },
  vietnam: {
    visaType: { KO: '한국 여권: 최대 45일 무비자', EN: 'Korean passport: visa-exempt for up to 45 days', JP: '韓国旅券：最長45日まで査証免除' },
    requirement: {
      KO: '현재 45일 면제는 2028년 3월까지의 한시 조치로 관리 중입니다. 더 긴 체류나 취업·유학은 목적에 맞는 전자비자 또는 별도 비자를 확인하세요.',
      EN: 'The current 45-day exemption is tracked as a temporary measure through March 2028. Longer stays, work or study require the appropriate e-Visa or other visa.',
      JP: '現在の45日免除は2028年3月までの時限措置として管理しています。より長い滞在・就労・留学は目的に合う電子査証または別の査証を確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
}

const JP_PROFILES: Record<string, VisaNationalityProfile> = {
  korea: {
    visaType: {
      KO: '일본 여권: 단기 방문 최대 90일 비자 면제',
      EN: 'Japanese passport: visa-exempt short stay for up to 90 days',
      JP: '日本旅券：短期滞在は最長90日まで査証免除',
    },
    requirement: {
      KO: '관광·상용·어학연수 목적의 단기 체류 기준입니다. K-ETA 한시 면제는 2026년 12월 31일까지 연장됐지만, 현지 취업·보수 활동이나 장기 체류는 별도 자격을 확인해야 합니다.',
      EN: 'This covers short stays for tourism, business or language training. The temporary K-ETA exemption runs through 31 December 2026; local paid work and longer stays require a separate status check.',
      JP: '観光・商用・語学研修を目的とする短期滞在の基準です。K-ETAの一時免除は2026年12月31日まで延長されていますが、韓国での就労・報酬活動や長期滞在は別の在留資格を確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
  taiwan: {
    visaType: { KO: '일본 여권: 최대 90일 무비자', EN: 'Japanese passport: visa-exempt for up to 90 days', JP: '日本旅券：最長90日まで査証免除' },
    requirement: {
      KO: '일본 여권은 예정 체류기간 이상 유효해야 하며 확정된 출국 항공권이 필요합니다. 무비자 체류는 원칙적으로 연장되지 않고 취업은 허용되지 않습니다.',
      EN: 'A Japanese passport must remain valid for the intended stay and a confirmed onward ticket is required. Visa-exempt stays are generally not extendable and do not permit employment.',
      JP: '日本旅券は予定滞在期間以上の残存有効期間が必要で、出国便の予約確認も求められます。査証免除滞在は原則延長できず、就労は認められません。',
    },
    verifiedAt: VERIFIED_AT,
  },
  usa: {
    visaType: { KO: '일본 여권: VWP 최대 90일 + ESTA', EN: 'Japanese passport: VWP up to 90 days with ESTA', JP: '日本旅券：VWPで最長90日、ESTA必須' },
    requirement: {
      KO: '관광·단기 상용 목적은 비자면제프로그램을 이용할 수 있지만 출발 전 ESTA 승인이 필요합니다. ESTA는 입국을 보장하지 않으며 현지 취업은 허용하지 않습니다.',
      EN: 'Tourism and qualifying short business trips can use the Visa Waiver Program, but ESTA approval is required before departure. ESTA does not guarantee admission and does not permit local employment.',
      JP: '観光・短期商用はビザ免除プログラムを利用できますが、出発前にESTAの承認が必要です。ESTAは入国を保証せず、現地就労は認められません。',
    },
    verifiedAt: VERIFIED_AT,
  },
  canada: {
    visaType: { KO: '일본 여권: 단기 방문 비자 면제 + 항공편 eTA', EN: 'Japanese passport: visa-exempt visitor; eTA for air travel', JP: '日本旅券：短期訪問は査証免除、空路はeTA' },
    requirement: {
      KO: '방문 체류는 통상 최대 6개월이며 항공편으로 입국할 때 eTA가 필요합니다. 실제 체류기간은 입국 심사에서 결정되고 현지 취업은 별도 허가가 필요합니다.',
      EN: 'Visitors are normally admitted for up to six months and need an eTA when arriving by air. The actual period is set at the border, and local work requires separate authorization.',
      JP: '訪問滞在は通常最長6カ月で、空路で入国する場合はeTAが必要です。実際の滞在期間は入国審査で決まり、現地就労には別の許可が必要です。',
    },
    verifiedAt: VERIFIED_AT,
  },
  australia: {
    visaType: { KO: '일본 여권: ETA로 최대 3개월', EN: 'Japanese passport: ETA stay for up to three months', JP: '日本旅券：ETAで最長3カ月' },
    requirement: {
      KO: '관광·단기 상용 방문은 출발 전에 ETA를 받아야 합니다. 유효한 여권과 입국 목적을 확인하고, 취업·장기 체류는 다른 비자를 검토하세요.',
      EN: 'Tourism and qualifying short business visits require an ETA before departure. Confirm passport and purpose requirements; work and longer stays need a different visa.',
      JP: '観光・短期商用は出発前にETAの取得が必要です。旅券と入国目的の条件を確認し、就労・長期滞在は別の査証を検討してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
  vietnam: {
    visaType: { KO: '일본 여권: 최대 45일 무비자', EN: 'Japanese passport: visa-exempt for up to 45 days', JP: '日本旅券：最長45日まで査証免除' },
    requirement: {
      KO: '여권 잔여 유효기간 6개월과 출국 항공권이 요구됩니다. 무비자 범위를 넘는 체류·취업·유학은 목적에 맞는 비자를 확인하세요.',
      EN: 'Six months of passport validity and an onward ticket are required. Longer stays, work or study require the appropriate visa.',
      JP: '旅券残存6カ月と出国便の予約が必要です。免除期間を超える滞在・就労・留学は目的に合う査証を確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
  thailand: {
    visaType: { KO: '일본 여권: 관광 목적 최대 60일 무비자', EN: 'Japanese passport: tourism visa exemption for up to 60 days', JP: '日本旅券：観光目的は最長60日まで査証免除' },
    requirement: {
      KO: '입국 전 TDAC 제출이 필요합니다. 체류 연장, 취업 또는 관광 외 활동은 태국 이민국·대사관에서 별도 요건을 확인하세요.',
      EN: 'A Thailand Digital Arrival Card is required before arrival. Extensions, employment and non-tourism activities have separate requirements.',
      JP: '入国前にTDACの提出が必要です。延長・就労・観光以外の活動はタイ入国管理局または大使館で別途確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
  indonesia: {
    visaType: { KO: '일본 여권: 도착비자·e-VOA 30일', EN: 'Japanese passport: 30-day VOA or e-VOA', JP: '日本旅券：到着査証・e-VOAで30日' },
    requirement: {
      KO: '현재 일본 여권의 무비자 입국은 정지돼 있으며 VOA/e-VOA가 필요합니다. 1회 30일 연장이 가능하고 여권 잔여 유효기간 6개월을 확인해야 합니다.',
      EN: 'Visa-free entry for Japanese passports is currently suspended; a VOA or e-VOA is required. One 30-day extension is possible, and six months of passport validity is required.',
      JP: '現在、日本旅券の査証免除は停止されており、VOAまたはe-VOAが必要です。30日の延長が1回可能で、旅券残存6カ月が必要です。',
    },
    verifiedAt: VERIFIED_AT,
  },
  philippines: {
    visaType: { KO: '일본 여권: 최대 30일 무비자', EN: 'Japanese passport: visa-exempt for up to 30 days', JP: '日本旅券：最長30日まで査証免除' },
    requirement: {
      KO: '관광·단기 상용 기준이며 eTravel 등록과 출국 항공권이 필요합니다. 연장·취업은 필리핀 이민국의 별도 절차를 확인하세요.',
      EN: 'This applies to tourism and qualifying short business visits; eTravel registration and an onward ticket are required. Extensions and work have separate procedures.',
      JP: '観光・短期商用が対象で、eTravel登録と出国便の予約が必要です。延長・就労はフィリピン入国管理局の別手続きを確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
  malaysia: {
    visaType: { KO: '일본 여권: 최대 3개월 무비자', EN: 'Japanese passport: visa-exempt for up to three months', JP: '日本旅券：最長3カ月まで査証免除' },
    requirement: {
      KO: '관광·방문 기준이며 입국 전 MDAC 등록이 필요합니다. 현지 유급 활동은 허용되지 않으므로 원격근무·취업 목적은 별도 자격을 확인하세요.',
      EN: 'This covers tourism and visits and requires an MDAC before arrival. Local paid activity is not permitted, so confirm the correct status for remote work or employment.',
      JP: '観光・訪問が対象で、入国前にMDAC登録が必要です。現地での有償活動は認められないため、リモート勤務・就労目的は別の資格を確認してください。',
    },
    verifiedAt: VERIFIED_AT,
  },
}

const SCHENGEN_JP_PROFILE: VisaNationalityProfile = {
  visaType: { KO: '일본 여권: 솅겐 180일 중 최대 90일 무비자', EN: 'Japanese passport: Schengen visa exemption, 90 days in any 180', JP: '日本旅券：シェンゲン圏は180日中90日まで査証免除' },
  requirement: {
    KO: '관광·단기 상용 기준이며 취업은 허용되지 않습니다. EES는 운영 중이고 ETIAS는 2026년 4분기 도입 예정이므로 출발 시점의 시행 상태를 다시 확인하세요.',
    EN: 'This covers tourism and qualifying short business visits and does not permit employment. EES is operating; ETIAS is scheduled for Q4 2026, so recheck its status before departure.',
    JP: '観光・短期商用が対象で、就労は認められません。EESは運用中で、ETIASは2026年第4四半期の開始予定のため、出発時点の運用状況を再確認してください。',
  },
  verifiedAt: VERIFIED_AT,
}

const PAIR_SOURCES: Record<string, ResearchSource[]> = {
  'KR:japan': [
    {
      id: 'kr-japan-mofa-visa-exemption',
      title: { KO: '일본 단기체류 비자 면제 공식 목록', EN: 'Japan short-stay visa exemption list', JP: '日本の短期滞在査証免除国一覧' },
      sourceName: 'Ministry of Foreign Affairs of Japan',
      sourceUrl: 'https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html',
      sourceType: 'official', verifiedAt: '2026-08-08',
      note: { KO: '대한민국 여권의 단기체류 비자 면제 여부와 기본 체류기간을 확인합니다.', EN: 'Confirms short-stay visa exemption and the standard period for Korean passports.', JP: '韓国旅券の短期滞在査証免除と基本滞在期間を確認できます。' },
    },
  ],
  'JP:korea': [
    {
      id: 'jp-korea-mofa-entry',
      title: { KO: '일본 여권의 한국 입국 안내', EN: 'Korea entry guidance for Japanese passports', JP: '日本旅券での韓国入国案内' },
      sourceName: 'Ministry of Foreign Affairs of Japan',
      sourceUrl: 'https://www.anzen.mofa.go.jp/m/mbimmigration_003.html',
      sourceType: 'official', verifiedAt: '2026-08-08',
    },
    {
      id: 'k-eta-temporary-exemption-2026',
      title: { KO: 'K-ETA 한시 면제 연장 공식 공지', EN: 'Official K-ETA temporary exemption extension', JP: 'K-ETA一時免除延長の公式公告' },
      sourceName: 'Korea Electronic Travel Authorization',
      sourceUrl: 'https://k-eta.go.kr/portal/board/viewboarddetail.do?bbsSn=299706&esntlPnotiMtYn=Y',
      sourceType: 'official', verifiedAt: '2026-08-08',
    },
  ],
  'JP:taiwan': [
    {
      id: 'jp-taiwan-boca-exempt',
      title: { KO: '대만 무비자 입국 공식 안내', EN: 'Taiwan visa-exempt entry rules', JP: '台湾の査証免除入国案内' },
      sourceName: 'Bureau of Consular Affairs, Taiwan MOFA',
      sourceUrl: 'https://www.boca.gov.tw/fp-149-4486-7785a-1.html',
      sourceType: 'official', verifiedAt: '2026-08-08',
    },
  ],
  'JP:usa': [
    {
      id: 'jp-usa-esta',
      title: { KO: '일본 외무성 미국 ESTA 안내', EN: 'Japan MOFA guidance on U.S. ESTA', JP: '外務省 米国ESTA案内' },
      sourceName: 'Ministry of Foreign Affairs of Japan',
      sourceUrl: 'https://www.anzen.mofa.go.jp/c_info/ESTA.html',
      sourceType: 'official', verifiedAt: '2026-08-08',
    },
  ],
  'JP:canada': [travelSource('jp-canada-entry', 'カナダ', 'Canada', 'https://www.anzen.mofa.go.jp/c_info/visa.html?mediacd=G02')],
  'JP:australia': [travelSource('jp-australia-entry', 'オーストラリア', 'Australia', 'https://www.anzen.mofa.go.jp/c_info/visa.html?mediacd=G02')],
  'JP:vietnam': [travelSource('jp-vietnam-entry', 'ベトナム', 'Vietnam', 'https://www.anzen.mofa.go.jp/m/mbimmigration_015.html')],
  'JP:thailand': [travelSource('jp-thailand-entry', 'タイ', 'Thailand', 'https://www.anzen.mofa.go.jp/m/mbimmigration_007.html')],
  'JP:indonesia': [travelSource('jp-indonesia-entry', 'インドネシア', 'Indonesia', 'https://www.anzen.mofa.go.jp/m/mbimmigration_002.html')],
  'JP:philippines': [travelSource('jp-philippines-entry', 'フィリピン', 'Philippines', 'https://www.anzen.mofa.go.jp/m/mbimmigration_013.html')],
  'JP:malaysia': [travelSource('jp-malaysia-entry', 'マレーシア', 'Malaysia', 'https://www.anzen.mofa.go.jp/m/mbimmigration_017.html')],
  'JP:schengen': [
    {
      id: 'jp-schengen-eu-rules',
      title: { KO: 'EU 단기체류·EES·ETIAS 공식 안내', EN: 'EU official short-stay, EES and ETIAS guidance', JP: 'EU短期滞在・EES・ETIAS公式案内' },
      sourceName: 'European Commission',
      sourceUrl: 'https://home-affairs.ec.europa.eu/news/main-differences-between-ees-and-etias-what-travellers-need-know-2026-04-28_en',
      sourceType: 'official', verifiedAt: '2026-08-08',
    },
  ],
}

function travelSource(id: string, japaneseDestination: string, englishDestination: string, sourceUrl: string): ResearchSource {
  return {
    id,
    title: {
      KO: `일본 외무성 ${englishDestination} 입국 안내`,
      EN: `Japan MOFA entry guidance for ${englishDestination}`,
      JP: `外務省 ${japaneseDestination}入国案内`,
    },
    sourceName: 'Ministry of Foreign Affairs of Japan',
    sourceUrl,
    sourceType: 'official',
    verifiedAt: VERIFIED_AT,
  }
}

function ownCountryProfile(lang: Lang): { visaType: string; requirement: string; verifiedAt: string } {
  const visaType: LocalizedText = { KO: '자국민 입국: 비자 대상이 아닙니다', EN: 'Citizen entry: no visa required', JP: '自国民の入国：査証の対象外です' }
  const requirement: LocalizedText = {
    KO: '여권 유효기간과 항공사·출입국기관의 신분 확인 요건은 별도로 확인하세요.',
    EN: 'Check passport validity and any identity requirements set by the carrier or border authority.',
    JP: '旅券の有効期間と、航空会社・出入国当局による本人確認要件は別途確認してください。',
  }
  return { visaType: visaType[lang], requirement: requirement[lang], verifiedAt: VERIFIED_AT }
}

export function getSuggestedPassportFromGeo(geoCountry: string): string {
  const supported = new Set(['KR', 'JP', 'US', 'CA', 'AU', 'GB', 'TW', 'SG', 'TH', 'VN', 'ID', 'PH', 'MY', 'DE', 'FR', 'IT', 'ES', 'PT'])
  return supported.has(geoCountry.toUpperCase()) ? geoCountry.toUpperCase() : 'OTHER'
}

export function getNationalityVisaProfile(passport: string, destination: string, lang: Lang) {
  if ((passport === 'KR' && destination === 'korea') || (passport === 'JP' && destination === 'japan')) {
    return ownCountryProfile(lang)
  }
  const profile = passport === 'JP'
    ? (SCHENGEN_DESTINATIONS.has(destination) ? SCHENGEN_JP_PROFILE : JP_PROFILES[destination])
    : passport === 'KR' ? KR_PROFILES[destination] : undefined
  if (!profile) return undefined
  return { visaType: profile.visaType[lang], requirement: profile.requirement[lang], verifiedAt: profile.verifiedAt }
}

export function getNationalityVisaSources(passport: string, destination: string): ResearchSource[] {
  if (passport === 'JP' && SCHENGEN_DESTINATIONS.has(destination)) return PAIR_SOURCES['JP:schengen'] ?? []
  return PAIR_SOURCES[`${passport}:${destination}`] ?? []
}
