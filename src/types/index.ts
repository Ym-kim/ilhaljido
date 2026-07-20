// /spaces·/api/ai-recommend 삭제(2026-07)로 Space·SpaceType·AIRecommend* 타입 제거(소비처 0)
export type WorkStyle = 'focused' | 'collaborative' | 'flexible'
export type Region = 'jeju' | 'gangwon' | 'jeonnam' | 'gyeongnam' | 'busan' | 'other'

export interface UserProfile {
  id: string
  email: string
  name: string
  jobType: string
  workStyle: WorkStyle
  preferredRegions: Region[]
  budget: number
  createdAt: string
}

export interface Review {
  id: string
  spaceId: string
  userId: string
  userName: string
  rating: number
  content: string
  productivityScore: number // 1-5
  createdAt: string
}

