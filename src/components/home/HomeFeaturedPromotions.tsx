'use client'

import type { Lang } from '@/lib/i18n/types'
import { CampaignPlacement, type CampaignPlacementItem } from '@/components/campaign/CampaignPlacement'

const COPY = {
  eyebrow: { KO: 'THIS WEEK', EN: 'THIS WEEK', JP: 'THIS WEEK' },
  title: { KO: '이번 여행에 필요한 네 가지', EN: 'Four useful choices for your next stay', JP: '次の滞在に役立つ4つの選択' },
  description: {
    KO: '지원·체험·통신·시즌 가이드 중 지금 준비하기 좋은 네 가지만 골랐습니다.',
    EN: 'Four timely picks across local support, experiences, connectivity and seasonal planning.',
    JP: '支援・体験・通信・季節ガイドから、今準備しやすい4つを厳選しました。',
  },
} satisfies Record<string, Record<Lang, string>>

const ITEMS: CampaignPlacementItem[] = [
  {
    id: 'home-featured-support',
    eyebrow: { KO: '지역 지원', EN: 'LOCAL SUPPORT', JP: '地域支援' },
    title: { KO: '지원받고 조금 더 오래 머물기', EN: 'Stay longer with local support', JP: '地域の支援で、もう少し長く滞在' },
    description: { KO: '최근 확인한 워케이션·체류 지원사업을 한 곳에서 비교합니다.', EN: 'Compare recently checked workation and stay-support programs.', JP: '最近確認したワーケーション・滞在支援を比較できます。' },
    cta: { KO: '지원사업 보기', EN: 'View support', JP: '支援を見る' },
    href: '/programs/support',
    tone: 'ocean',
  },
  {
    id: 'home-featured-teamlab',
    eyebrow: { KO: '도쿄 · 체험', EN: 'TOKYO · EXPERIENCE', JP: '東京・体験' },
    title: { KO: '퇴근 후 팀랩 플래닛', EN: 'teamLab after work', JP: '仕事帰りのチームラボ' },
    description: { KO: '도쿄 체류의 저녁 두 시간을 채우는 전시 동선을 확인하세요.', EN: 'A visual evening plan that fits around a Tokyo workday.', JP: '東京で働く日の夜に組み込みやすい体験です。' },
    cta: { KO: '현재 조건 확인', EN: 'Check current terms', JP: '現在の条件を確認' },
    href: 'https://affiliate.klook.com/redirect?aid=126848&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F25300-teamlab-planets-toyosu-tokyo-ticket%2F',
    external: true,
    sponsored: true,
    provider: 'Klook',
    category: 'activity',
    destination: 'tokyo',
    tone: 'ink',
  },
  {
    id: 'home-featured-japan-esim',
    eyebrow: { KO: '일본 · 연결', EN: 'JAPAN · CONNECT', JP: '日本・通信' },
    title: { KO: '도착 전에 eSIM 준비하기', EN: 'Set up your eSIM before landing', JP: '到着前にeSIMを準備' },
    description: { KO: '현지 도착 직후 지도와 업무 연락을 이어갈 수 있게 준비합니다.', EN: 'Keep maps and work messages available from arrival.', JP: '到着直後から地図や仕事の連絡を使えるよう準備します。' },
    cta: { KO: '일본 eSIM 보기', EN: 'View Japan eSIM', JP: '日本eSIMを見る' },
    href: 'https://airalo.pxf.io/c/7451946/1268485/15608?u=https%3A%2F%2Fwww.airalo.com%2Fjapan-esim',
    external: true,
    sponsored: true,
    provider: 'Airalo',
    category: 'esim',
    destination: 'japan',
    tone: 'sand',
  },
  {
    id: 'home-featured-chuseok',
    eyebrow: { KO: '시즌 에디트', EN: 'SEASONAL EDIT', JP: '季節のエディット' },
    title: { KO: '연차 없이 나흘, 추석 여행 구성', EN: 'A four-day Chuseok travel plan', JP: '休暇を足さない4日間の秋夕プラン' },
    description: { KO: '숙소·이동·체험을 실제 일정 순서로 정리한 준비 가이드입니다.', EN: 'A practical sequence for stays, transport and experiences.', JP: '宿・移動・体験を日程順に整理した準備ガイドです。' },
    cta: { KO: '기획전 보기', EN: 'Open the guide', JP: 'ガイドを見る' },
    href: '/campaign/chuseok-4days',
    tone: 'coral',
  },
]

export function HomeFeaturedPromotions({ lang }: { lang: Lang }) {
  return (
    <section className="border-y border-[#d8e4e7] bg-[#f7faf9] px-4 py-12 sm:px-6 md:py-16" data-home-monetization-after-intent="true">
      <div className="mx-auto max-w-6xl">
        <p className="wak-overline text-[#34748b]">{COPY.eyebrow[lang]}</p>
        <div className="mt-3 mb-7 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] md:items-end">
          <h2 className="wak-section-title text-[#17242b]">{COPY.title[lang]}</h2>
          <p className="text-sm font-medium leading-6 text-[#64757b] md:text-right">{COPY.description[lang]}</p>
        </div>
        <CampaignPlacement items={ITEMS} lang={lang} sectionId="home-featured-promotions" variant="featured" />
      </div>
    </section>
  )
}
