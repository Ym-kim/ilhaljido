import HomePage from '@/components/home/HomePage'
import { isChinaHomeCampaignActive } from '@/lib/campaigns/chinaMarketResearch'

export const revalidate = 3600

type PageProps = { searchParams: Promise<{ hero?: string | string[] }> }

export default async function KoreanHomePage({ searchParams }: PageProps) {
  const hero = (await searchParams).hero
  const homeHeroVariant = hero === 'control-static' ? 'control-static' : 'video-story'
  return <HomePage chinaCampaignActive={isChinaHomeCampaignActive()} homeHeroVariant={homeHeroVariant} />
}
