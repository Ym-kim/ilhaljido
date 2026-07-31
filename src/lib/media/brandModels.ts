import type { Lang } from '@/lib/i18n/types'

export const BRAND_MODEL_IDS = ['WAK-MODEL-A', 'WAK-MODEL-B', 'WAK-MODEL-C', 'WAK-MODEL-D'] as const

export type BrandModelId = (typeof BRAND_MODEL_IDS)[number]

export type BrandModelProfile = {
  id: BrandModelId
  role: Record<Lang, string>
  referenceAssetIds: string[]
  productionUse: 'generated_derivatives_only' | 'reference_only'
  guardrails: Record<Lang, string>
}

export const BRAND_MODELS: BrandModelProfile[] = [
  {
    id: 'WAK-MODEL-A',
    role: {
      KO: '차분한 카페 업무, 섬 체류, 바다 전환 장면',
      EN: 'Calm café work, island stays and coastal transitions',
      JP: '落ち着いたカフェワーク、島の滞在、海辺への切り替え',
    },
    referenceAssetIds: [
      'model_a_close_portrait',
      'model_a_lifestyle_reference_grid_01',
      'model_a_lifestyle_reference_grid_02',
    ],
    productionUse: 'generated_derivatives_only',
    guardrails: {
      KO: '실제 참가자·고객·직원 또는 특정 장소 방문자로 표현하지 않는다.',
      EN: 'Never present as a real participant, customer, employee or visitor to a named venue.',
      JP: '実在の参加者・顧客・スタッフ、または特定施設の利用者として表現しない。',
    },
  },
  {
    id: 'WAK-MODEL-B',
    role: {
      KO: '밝은 여름 도시 이동 장면의 정체성 참고',
      EN: 'Identity reference for bright summer city movement',
      JP: '明るい夏の街歩きシーン向けの人物参考',
    },
    referenceAssetIds: ['model_b_fullbody_summer_city'],
    productionUse: 'reference_only',
    guardrails: {
      KO: '원본의 신체 중심 패션 포즈와 배경 가짜 문자는 사용하지 않는다.',
      EN: 'Do not reuse the body-led fashion pose or synthetic background lettering.',
      JP: '身体を強調したポーズや背景の不自然な文字は使用しない。',
    },
  },
  {
    id: 'WAK-MODEL-C',
    role: {
      KO: '국내 해안 이동, 가벼운 주말 여행, 자연스러운 산책 장면',
      EN: 'Domestic coastal movement, light weekends and candid walks',
      JP: '国内の海辺への移動、短い週末旅、自然な散歩シーン',
    },
    referenceAssetIds: ['model_c_fullbody_light_travel'],
    productionUse: 'generated_derivatives_only',
    guardrails: {
      KO: '원본 전신 화보를 직접 게시하지 않고 행동 중심 파생 이미지만 사용한다.',
      EN: 'Do not publish the full-body source; use only action-led derivatives.',
      JP: '全身の元画像は公開せず、行動を中心にした派生画像のみ使用する。',
    },
  },
  {
    id: 'WAK-MODEL-D',
    role: {
      KO: '도시형 워케이션, Trip Match, 전시·카페·이동 장면',
      EN: 'Urban workations, Trip Match, galleries, cafés and departures',
      JP: '都市型ワーケーション、Trip Match、展示・カフェ・移動シーン',
    },
    referenceAssetIds: ['model_d_fullbody_cafe_city', 'model_f_lifestyle_reference_grid'],
    productionUse: 'generated_derivatives_only',
    guardrails: {
      KO: '인플루언서 화보처럼 보이지 않게 업무·이동 행동과 장소를 우선한다.',
      EN: 'Prioritize work, movement and place so the model does not read as an influencer ad.',
      JP: 'インフルエンサー広告に見えないよう、仕事・移動・場所を優先する。',
    },
  },
]

export function getBrandModel(id: BrandModelId): BrandModelProfile {
  const model = BRAND_MODELS.find((item) => item.id === id)
  if (!model) throw new Error(`Unknown brand model: ${id}`)
  return model
}
