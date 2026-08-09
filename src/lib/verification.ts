import type { Lang } from '@/lib/i18n/types'

export type VerificationLevel = 'research' | 'partner' | 'field' | 'editorial'

export type VerificationRecord = {
  level: VerificationLevel
  verifiedAt?: string
  source?: string
}

type LocalizedText = Record<Lang, string>

export const VERIFICATION_LEVEL_COPY: Record<VerificationLevel, {
  label: LocalizedText
  description: LocalizedText
}> = {
  research: {
    label: { KO: '공개 정보 확인', EN: 'Public information checked', JP: '公開情報を確認' },
    description: {
      KO: '공식 페이지·제휴사 상품 정보와 공개 자료를 확인했습니다. 현장 방문을 뜻하지 않습니다.',
      EN: 'Checked against official pages, partner listings and public sources. This does not imply an on-site visit.',
      JP: '公式ページ・提携先の商品情報・公開資料を確認しています。現地訪問を意味するものではありません。',
    },
  },
  partner: {
    label: { KO: '파트너 정보 확인', EN: 'Partner information checked', JP: 'パートナー情報を確認' },
    description: {
      KO: '운영사·숙소·기관이 제공한 내용을 Wakation이 확인해 정리했습니다.',
      EN: 'Information supplied by an operator, stay or institution and reviewed by Wakation.',
      JP: '運営会社・宿泊施設・機関から提供された情報をWakationが確認・整理しています。',
    },
  },
  field: {
    label: { KO: '현장 확인', EN: 'Checked on site', JP: '現地で確認' },
    description: {
      KO: 'Wakation이 실제 방문하거나 운영 과정에서 확인한 기록입니다.',
      EN: 'Recorded during a Wakation visit or an operation run by Wakation.',
      JP: 'Wakationの現地訪問または実際の運営を通じて確認した記録です。',
    },
  },
  editorial: {
    label: { KO: '에디터 선정', EN: 'Editor selected', JP: 'エディター選定' },
    description: {
      KO: '여행 동선과 목적에 맞춰 고른 편집 제안입니다. 직접 이용 후기나 품질 보장을 뜻하지 않습니다.',
      EN: 'An editorial choice for the journey and its purpose, not a first-hand review or a quality guarantee.',
      JP: '旅の動線と目的に合わせた編集提案です。実体験レビューや品質保証を意味しません。',
    },
  },
}

export function verificationLabel(level: VerificationLevel, lang: Lang) {
  return VERIFICATION_LEVEL_COPY[level].label[lang]
}

export function formatVerificationDate(value: string) {
  return value.replaceAll('-', '.')
}
