import type { Lang } from '@/lib/i18n/types'

type VisaGuidance = {
  visaType: string
  requirement: string
  program: string
  official: string
}

const PURPOSE_PROGRAM: Record<string, Record<Lang, string>> = {
  workation: { KO: '해외 워케이션·체류', EN: 'Global workation stays', JP: '海外ワーケーション・滞在' },
  language: { KO: '어학·학습 프로그램', EN: 'Language and learning programs', JP: '語学・学習プログラム' },
  study: { KO: '어학·학습 프로그램', EN: 'Study and learning programs', JP: '留学・学習プログラム' },
  workingholiday: { KO: '해외 장기체류 준비', EN: 'Long-stay preparation', JP: '海外長期滞在の準備' },
  market: { KO: '시장조사·박람회', EN: 'Market research and events', JP: '市場調査・展示会' },
  business: { KO: '시장조사·박람회', EN: 'Business and market research', JP: 'ビジネス・市場調査' },
  nomad: { KO: '해외 워케이션·체류', EN: 'Global workation stays', JP: '海外ワーケーション・滞在' },
}

const GENERIC: Record<Lang, Omit<VisaGuidance, 'program'>> = {
  KO: {
    visaType: '공식 체류자격 확인이 필요합니다',
    requirement: '여권 국적, 체류 목적, 현지에서의 유급 업무 여부에 따라 필요한 자격이 달라집니다. 방문·관광 자격이 원격근무를 허용한다는 뜻은 아니므로 출국 전 대사관 또는 이민국에 확인하세요.',
    official: '아래 공식 출처가 있는 목적지는 원문을 확인하고, 그 외 목적지는 해당국 대사관·이민국 공식 사이트에서 다시 확인하세요.',
  },
  EN: {
    visaType: 'Official immigration status must be confirmed',
    requirement: 'Requirements vary by passport, purpose of stay and whether you will perform paid work locally. Visitor status does not automatically permit remote work, so confirm with the embassy or immigration authority before departure.',
    official: 'Use the official source below when available. For other destinations, recheck the relevant embassy or immigration authority.',
  },
  JP: {
    visaType: '公式の在留資格を確認してください',
    requirement: '旅券国籍、滞在目的、現地での有償業務の有無によって必要な資格が変わります。観光・訪問資格がリモートワークを許可するとは限らないため、出発前に大使館または入国管理当局へ確認してください。',
    official: '下記に公式情報がある場合は原文を確認し、それ以外は各国の大使館・入国管理当局で再確認してください。',
  },
}

// 국가별 검증 안내 — 각 국가 공식 페이지 원문을 직접 읽어 확인한 사실만 기재한다.
// 공식 페이지에 없는 수치는 2차 출처에 널리 퍼져 있어도 적지 않는다.
// (2026-08-06 실사 사례: 대만 노마드비자 '최대 2년'은 BOCA 공식 페이지에
//  기간 명시가 없어 제외. 헝가리 '저축 €10,000'도 팩트시트에 근거 없어 제외.)
// 각 항목의 출처·검증일은 research.ts VISA_OFFICIAL_SOURCES와 짝을 이룬다.
const VERIFIED_DESTINATION_NOTE: Partial<Record<string, Record<Lang, string>>> = {
  japan: {
    KO: '일본 외무성은 디지털 노마드 체류자격의 체류기간을 6개월로 안내하며, 소득·보험 등 별도 요건을 두고 있습니다.',
    EN: 'Japan’s Ministry of Foreign Affairs describes a six-month digital nomad status with separate income and insurance conditions.',
    JP: '外務省はデジタルノマド向け在留資格を6カ月とし、収入・保険などの条件を案内しています。',
  },
  vietnam: {
    KO: '베트남 이민국 공식 포털은 전자비자의 체류 가능 기간을 최대 90일로 안내합니다. 실제 적용 여부는 국적과 신청 조건을 확인하세요.',
    EN: 'Vietnam’s official immigration portal states that an e-Visa may be valid for up to 90 days. Check nationality and application conditions.',
    JP: 'ベトナム入国管理局の公式ポータルでは、電子ビザの滞在可能期間を最長90日と案内しています。国籍と申請条件を確認してください。',
  },
  // 2026-08-06 확충 — 아래 3개국은 공식 원문 판독에 성공한 범위만 기재
  taiwan: {
    KO: '대만 영사국은 한국 국적자의 무비자 체류를 최대 90일로 안내하며, 입국일 기준 여권 잔여 유효기간 6개월과 확약된 출국 항공권을 요구합니다. 무비자 체류는 원칙적으로 연장되지 않습니다. 디지털 노마드 방문비자는 무비자 대상국 국적자만 신청할 수 있고, 연소득 요건은 20~29세 미화 2만 달러·30세 이상 미화 4만 달러이며 최근 6개월 평균 잔고 미화 1만 달러를 함께 봅니다.',
    EN: 'Taiwan’s consular bureau allows visa-exempt stays of up to 90 days for Korean nationals, requiring six months of passport validity on entry and a confirmed onward ticket; visa-exempt stays are generally not extendable. The digital nomad visitor visa is open only to nationals of visa-exempt countries and requires annual income of US$20,000 (ages 20–29) or US$40,000 (30+), plus an average bank balance of US$10,000 over six months.',
    JP: '台湾領事事務局は韓国籍のビザ免除滞在を最長90日と案内し、入国時点で旅券残存6カ月と出国便の予約確約を求めます。ビザ免除滞在は原則延長できません。デジタルノマド訪問査証はビザ免除対象国の国籍者のみ申請でき、年収要件は20〜29歳が米ドル2万・30歳以上が米ドル4万、直近6カ月の平均残高1万米ドルも必要です。',
  },
  hungary: {
    KO: '헝가리 이민청은 화이트카드(디지털 노마드 체류허가)를 최대 1년으로 발급하며 1회에 한해 1년 연장할 수 있다고 안내합니다. 입국 전 6개월 이상 월 순소득 €3,000을 충족하고 체류 중에도 유지해야 하며, 헝가리 고용주를 위한 근로나 헝가리 기업 지분 보유는 불가합니다. 가족 동반(가족결합 체류허가)은 허용되지 않습니다.',
    EN: 'Hungary’s immigration authority issues the White Card for up to one year, extendable once for another year. Applicants must have net monthly income of €3,000 for at least six months before entry and maintain it during the stay; working for Hungarian employers or holding shares in Hungarian companies is not allowed, and family reunification permits are not granted.',
    JP: 'ハンガリー入国管理当局はホワイトカード（デジタルノマド滞在許可）を最長1年で発給し、1回に限り1年の延長が可能と案内しています。入国前6カ月以上、月の純収入€3,000を満たし滞在中も維持する必要があり、ハンガリーの雇用主のための就労や同国企業の持分保有は不可で、家族帯同の在留許可は認められません。',
  },
  malaysia: {
    KO: '말레이시아 디지털경제공사(MDEC)의 DE Rantau 노마드 패스는 3~12개월 전문방문패스로 발급되며 12개월 추가 갱신이 가능합니다. 연소득 요건은 기술 직군 미화 2만 4천 달러 초과, 비기술 직군 미화 6만 달러 초과입니다.',
    EN: 'The DE Rantau Nomad Pass from Malaysia’s MDEC is issued as a Professional Visit Pass valid for 3–12 months, renewable for a further 12 months. Annual income must exceed US$24,000 for tech talent and US$60,000 for non-tech professionals.',
    JP: 'マレーシアMDECのDE Rantauノマドパスは3〜12カ月の専門訪問パスとして発給され、さらに12カ月の更新が可能です。年収要件は技術職が米ドル2万4千超、非技術職が米ドル6万超です。',
  },
}

export function getVisaVerifiedGuidance(lang: Lang, country: string, purpose: string): VisaGuidance {
  const base = GENERIC[lang]
  const verifiedNote = VERIFIED_DESTINATION_NOTE[country]?.[lang]

  return {
    ...base,
    requirement: verifiedNote ? `${verifiedNote} ${base.requirement}` : base.requirement,
    program: PURPOSE_PROGRAM[purpose]?.[lang] ?? PURPOSE_PROGRAM.workation[lang],
  }
}

