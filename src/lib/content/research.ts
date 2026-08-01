import type { Lang } from '@/lib/i18n/types'

export type ResearchSource = {
  id: string
  title: Record<Lang, string>
  sourceName: string
  sourceUrl: string
  sourceType: 'official' | 'tourism_board' | 'local_government' | 'provider' | 'editorial'
  verifiedAt: string
  note?: Record<Lang, string>
}

export const VISA_OFFICIAL_SOURCES: Record<string, ResearchSource[]> = {
  japan: [
    {
      id: 'japan-mofa-digital-nomad',
      title: {
        KO: '일본 디지털 노마드 체류자격 안내',
        EN: 'Japan digital nomad visa guidance',
        JP: 'デジタルノマド向け在留資格案内',
      },
      sourceName: 'Ministry of Foreign Affairs of Japan',
      sourceUrl: 'https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
      note: {
        KO: '공식 안내는 체류기간과 소득·보험 등 신청 요건을 함께 설명합니다.',
        EN: 'The official guidance covers the period of stay and application conditions, including income and insurance.',
        JP: '滞在期間に加え、収入・保険などの申請条件が案内されています。',
      },
    },
  ],
  thailand: [
    {
      id: 'thailand-evisa',
      title: { KO: '태국 전자비자 공식 포털', EN: 'Thailand official e-Visa portal', JP: 'タイ電子ビザ公式ポータル' },
      sourceName: 'Thai e-Visa',
      sourceUrl: 'https://www.thaievisa.go.th/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
    },
  ],
  indonesia: [
    {
      id: 'indonesia-evisa',
      title: { KO: '인도네시아 전자비자 공식 포털', EN: 'Indonesia official e-Visa portal', JP: 'インドネシア電子ビザ公式ポータル' },
      sourceName: 'Directorate General of Immigration Indonesia',
      sourceUrl: 'https://evisa.imigrasi.go.id/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
    },
  ],
  vietnam: [
    {
      id: 'vietnam-evisa',
      title: { KO: '베트남 전자비자 공식 포털', EN: 'Vietnam official e-Visa portal', JP: 'ベトナム電子ビザ公式ポータル' },
      sourceName: 'Vietnam Immigration Department',
      sourceUrl: 'https://evisa.gov.vn/',
      sourceType: 'official',
      verifiedAt: '2026-08-01',
      note: {
        KO: '공식 포털은 전자비자의 체류 가능 기간과 단수·복수 입국 조건을 안내합니다.',
        EN: 'The official portal explains the permitted e-Visa period and single- or multiple-entry options.',
        JP: '電子ビザの滞在可能期間と、一次・数次入国の条件が案内されています。',
      },
    },
  ],
}

