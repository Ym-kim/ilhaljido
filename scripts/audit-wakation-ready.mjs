import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')

const collectionView = read('src/components/affiliate/CollectionView.tsx')
const readyPanel = read('src/components/affiliate/WakationReadyPanel.tsx')
const preparationCard = read('src/components/affiliate/TripSetPreparationCard.tsx')
const collections = read('src/lib/affiliate/collections.ts')

const checks = [
  ['ready panel rendered in Trip Sets', collectionView.includes('<WakationReadyPanel')],
  ['active affiliate catalogue remains the source', collectionView.includes("item?.status === 'active_affiliate'")],
  ['trip-specific local progress', collectionView.includes("READY_CATEGORY_STORAGE_PREFIX") && collectionView.includes('window.localStorage')],
  ['ready view event', collectionView.includes("trackEvent('ready_view'")],
  ['ready category click event', collectionView.includes("trackEvent('ready_category_click'")],
  ['ready complete signal', collectionView.includes("trackEvent('ready_complete_signal'")],
  ['category count attached to events', collectionView.includes('categories_clicked: String(next.length)')],
  ['card callback updates ready progress', preparationCard.includes('onReadyCategoryClick?.(item.category, item.id)')],
  ['affiliate rel preserved', preparationCard.includes('rel="sponsored noopener noreferrer"')],
  ['affiliate tracking preserved', preparationCard.includes('trackAffiliateClick({')],
  ['accessible progress status', readyPanel.includes('aria-live="polite"')],
  ['localized KO EN JP copy', readyPanel.includes("KO: '필요한 준비를 하나씩 확인하세요'") && readyPanel.includes("EN: 'Get this trip ready") && readyPanel.includes("JP: '必要な準備を一つずつ確認しましょう'")],
  ['booking transparency copy', readyPanel.includes('예약 완료를 의미하지 않습니다')],
  ['four monetizable Trip Sets configured', (collections.match(/conversionItems:\s*\[/g) ?? []).length >= 4],
  ['no PII analytics fields', !/ready_(?:view|category_click|complete_signal)[\s\S]{0,400}\b(?:email|phone|name|kakao)\s*:/i.test(collectionView)],
]

let failed = false
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`)
  if (!ok) failed = true
}

if (failed) process.exit(1)
console.log(`\nWakation Ready audit passed (${checks.length} checks).`)
