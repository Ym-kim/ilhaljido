import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const rules = [
  {
    file: 'src/app/learn/page.tsx',
    required: ['FEATURED_COURSES', "status === 'active_affiliate'", '/select/learn'],
    forbidden: ['images.unsplash.com', 'Coming Soon', '준비중', '準備中'],
  },
  {
    file: 'src/app/about/page.tsx',
    required: ['/hosted', '/select', '/report/yangyang'],
    forbidden: ['images.unsplash.com', '360만+', '3.6M+', '20+'],
  },
  {
    file: 'src/app/visa-ai/page.tsx',
    required: ['getVisaVerifiedGuidance', 'OfficialSourceList', 'VISA_OFFICIAL_SOURCES'],
    forbidden: ['getVisaMockResult'],
  },
  {
    file: 'src/app/contact/page.tsx',
    required: ['<h1', 'wakation.sf@gmail.com'],
    forbidden: ['SectionTitle className="mb-4 text-center"'],
  },
  {
    file: 'src/components/editorial/StoriesHubView.tsx',
    required: ['next/image', '/destinations', '/collections'],
    forbidden: [],
  },
  {
    file: 'src/components/affiliate/WishlistView.tsx',
    required: ['useSavedTripMatches', '/programs/support', 'discoveryLinks'],
    forbidden: [],
  },
]

const failures = []
for (const rule of rules) {
  const source = readFileSync(join(root, rule.file), 'utf8')
  for (const token of rule.required) {
    if (!source.includes(token)) failures.push(`${rule.file}: missing ${token}`)
  }
  for (const token of rule.forbidden) {
    if (source.includes(token)) failures.push(`${rule.file}: forbidden ${token}`)
  }
}

if (failures.length > 0) {
  console.error('[content-depth] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[content-depth] PASS — ${rules.length} priority route families satisfy trust and depth rules.`)

