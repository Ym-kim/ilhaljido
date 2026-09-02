import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const source = {
  home: read('src/app/page.tsx'),
  featured: read('src/components/home/HomeFeaturedPromotions.tsx'),
  campaign: read('src/components/campaign/CampaignPlacement.tsx'),
  select: read('src/components/select/SelectHubView.tsx'),
  hotel: read('src/components/select/HotelSelectView.tsx'),
  card: read('src/components/affiliate/AffiliateCard.tsx'),
  yangyang: read('src/components/home/YangyangProof.tsx'),
  data: read('src/lib/i18n/data.ts'),
  rotation: read('src/lib/media/modelRotation.ts'),
  legal: read('src/lib/legal.ts'),
}

const checks = [
  ['Home renders the static featured campaign placement', source.home.includes('<HomeFeaturedPromotions lang={lang} />')],
  ['Home no longer renders the moving ticker', !source.home.includes('<PromoTicker />')],
  ['Home removes redundant mood, duration, moment and more-explore surfaces', ['<MoodExplorer', '<DurationExplorer', '<MomentRail', '<MoreExplore'].every((marker) => !source.home.includes(marker))],
  ['Featured placement is capped at four choices', source.campaign.includes("variant === 'featured' ? 4")],
  ['Campaign component supports announcement, featured and context', ['announcement', 'featured', 'context'].every((variant) => source.campaign.includes(`'${variant}'`))],
  ['Affiliate tracking and sponsored rel remain explicit', source.campaign.includes('trackAffiliateClick') && source.campaign.includes('sponsored noopener noreferrer')],
  ['BigPie and NordVPN are not promoted', !/bigpie|nordvpn/i.test(source.featured)],
  ['Select exposes six preparation stages', ['stay', 'move', 'connect', 'experience', 'work', 'learn'].every((id) => source.select.includes(`id: '${id}'`))],
  ['Hotel page exposes a controlled Pilot entry', source.hotel.includes('data-stay-pilot-entry="controlled"') && source.hotel.includes("'/select/hotel/pilot'")],
  ['Booking search remains the established hotel flow', source.hotel.includes('<DestinationSearch mode="hotel" />')],
  ['Hotel review score is labelled on a ten-point scale without a star glyph', source.card.includes("RATING_TEXT[lang].hotel") && source.card.includes("item.category === 'hotel' ? '10' : '5'") && !source.card.includes('>★<')],
  ['Yangyang proof links to the single Hosted signup', !source.yangyang.includes('<NotifySignup') && source.yangyang.includes('/hosted#hosted-updates')],
  ['Expired August placeholder and removed AI/Sokcho concept are absent', !/AI 크리에이터|AI Creator|AIクリエイター|강원 속초|Sokcho, Gangwon|江原・束草|8월 예정|Aug \(TBD\)|8月予定/.test(source.data)],
  ['September monthly slot registry covers all required placements', ['home.hero', 'home.editorial.primary', 'home.editorial.secondary', 'hosted.hero', 'business.hero', 'growth.hero', 'campaign.global'].every((slot) => source.rotation.includes(`slot: '${slot}'`))],
  ['Monthly slots record season, month, mood, active, priority and expiration', ['season:', 'month:', 'mood:', 'active:', 'priority:', 'expiration:'].every((field) => source.rotation.includes(field))],
  ['Public contact remains the approved Gmail address', source.legal.includes('wakation.sf@gmail.com') && !source.legal.includes('ymkim0711@gmail.com')],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length) {
  console.error('[design-refresh-finish] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[design-refresh-finish] PASS — ${checks.length} completion checks.`)
