import type { Metadata } from 'next'
import { ReviewSubmitView } from '@/components/reviews/ReviewSubmitView'

// 참가자 전용 링크로 전달되는 후기 제출 폼 — moments/submit 선례에 따라 noindex
export const metadata: Metadata = {
  title: '참가 후기 남기기',
  description: 'Wakation 프로그램·스테이 참가 후기를 남겨주세요. 게재 동의 확인 후 실후기로 소개됩니다.',
  robots: { index: false, follow: true },
}

export default function ReviewSubmitPage() {
  return <ReviewSubmitView />
}
