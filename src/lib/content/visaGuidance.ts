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

