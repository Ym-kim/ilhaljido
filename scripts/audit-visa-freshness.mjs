// 한시성 비자 제도 만료 감시 — src/lib/content/visaExpiries.ts 레지스트리 기반.
// 만료 90일 전 경고, 만료 경과 시 실패(exit 1). 마커 문자열 실존도 교차 검증
// (표기를 지우고 레지스트리를 안 고치면 감사가 잡는다). 선례: audit-support-freshness.mjs
import fs from 'node:fs'
import path from 'node:path'

const WARN_DAYS = 90

const registry = fs.readFileSync(path.join(process.cwd(), 'src/lib/content/visaExpiries.ts'), 'utf8')
const asOfArg = process.argv.find((arg) => arg.startsWith('--as-of='))?.slice('--as-of='.length)
const asOf = asOfArg ?? new Date().toISOString().slice(0, 10)

if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || Number.isNaN(Date.parse(`${asOf}T00:00:00Z`))) {
  console.error(`invalid --as-of date: ${asOf}`)
  process.exit(1)
}

// 엔트리 파싱 — id·expires·markers({file, contains})
const entryBlocks = registry.split(/\r?\n  \{\r?\n/).slice(1)
const entries = entryBlocks.map((block) => {
  const id = block.match(/id: '([^']+)'/)?.[1]
  const expires = block.match(/expires: '(\d{4}-\d{2}-\d{2})'/)?.[1]
  const markers = [...block.matchAll(/\{ file: '([^']+)', contains: '([^']+)' \}/g)].map((m) => ({
    file: m[1],
    contains: m[2],
  }))
  return { id, expires, markers }
}).filter((e) => e.id && e.expires)

if (entries.length === 0) {
  console.error('error: no entries parsed from visaExpiries.ts — parser/format drift')
  process.exit(1)
}

const now = Date.parse(`${asOf}T23:59:59+09:00`)
let failed = false

for (const entry of entries) {
  const remainDays = Math.floor((Date.parse(`${entry.expires}T23:59:59+09:00`) - now) / 86_400_000)

  for (const marker of entry.markers) {
    const filePath = path.join(process.cwd(), marker.file)
    if (!fs.existsSync(filePath) || !fs.readFileSync(filePath, 'utf8').includes(marker.contains)) {
      console.error(`error: ${entry.id} — marker missing in ${marker.file}: "${marker.contains}"`)
      failed = true
    }
  }

  if (remainDays < 0) {
    console.error(`error: ${entry.id} EXPIRED ${-remainDays}d ago (${entry.expires}) — action required, see visaExpiries.ts`)
    failed = true
  } else if (remainDays <= WARN_DAYS) {
    console.warn(`warning: ${entry.id} expires in ${remainDays}d (${entry.expires}) — prepare copy updates`)
  } else {
    console.log(`ok: ${entry.id} — ${remainDays}d until ${entry.expires}`)
  }
}

if (failed) process.exit(1)
console.log(`visa freshness audit passed (${entries.length} entries as of ${asOf})`)
