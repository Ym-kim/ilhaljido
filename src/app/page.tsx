import HomePage from '@/components/home/HomePage'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'

export const revalidate = 3600

export default function KoreanHomePage() {
  return <HomePage chinaCampaignActive={isChinaHomeCampaignActive()} />
}
