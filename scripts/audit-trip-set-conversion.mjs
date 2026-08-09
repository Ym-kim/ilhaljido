import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const collections = read('src/lib/affiliate/collections.ts')
const catalogSources = [
  read('src/lib/affiliate/items.ts'),
  read('src/lib/affiliate/featured.ts'),
]
const expectedTripSets = ['fukuoka-3n4d', 'osaka-friends', 'seoul-3n4d', 'busan-weekend']
const errors = []

function extractBalanced(source, start, open, close) {
  let depth = 0
  let quote = null
  let escaped = false

  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (quote) {
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === quote) quote = null
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      continue
    }
    if (char === open) depth += 1
    if (char === close) depth -= 1
    if (depth === 0) return source.slice(start, index + 1)
  }
  return ''
}

function findObjectContaining(source, needle) {
  const needleIndex = source.indexOf(needle)
  if (needleIndex < 0) return ''
  const objectStart = source.lastIndexOf('\n  {', needleIndex)
  return objectStart < 0 ? '' : extractBalanced(source, objectStart + 3, '{', '}')
}

function findCatalogItem(id) {
  const needle = `id: '${id}'`
  for (const source of catalogSources) {
    const block = findObjectContaining(source, needle)
    if (block) return block
  }
  return ''
}

for (const slug of expectedTripSets) {
  const collectionBlock = findObjectContaining(collections, `slug: '${slug}'`)
  if (!collectionBlock) {
    errors.push(`${slug}: collection not found`)
    continue
  }

  const conversionStart = collectionBlock.indexOf('conversionItems: [')
  if (conversionStart < 0) {
    errors.push(`${slug}: conversionItems missing`)
    continue
  }
  const arrayStart = collectionBlock.indexOf('[', conversionStart)
  const conversionBlock = extractBalanced(collectionBlock, arrayStart, '[', ']')
  const references = [...conversionBlock.matchAll(/affiliateItemId:\s*'([^']+)'/g)]

  if (references.length < 1 || references.length > 4) {
    errors.push(`${slug}: expected 1-4 conversion items, found ${references.length}`)
  }

  const seen = new Set()
  const preparationOrders = []
  for (const match of references) {
    const id = match[1]
    if (seen.has(id)) errors.push(`${slug}: duplicate conversion item ${id}`)
    seen.add(id)

    const entryStart = conversionBlock.lastIndexOf('{', match.index)
    const entryBlock = extractBalanced(conversionBlock, entryStart, '{', '}')
    const reasonMatch = entryBlock.match(/reason:\s*({[\s\S]*?})\s*,\s*verifiedAt:/)
    if (!reasonMatch) errors.push(`${slug}/${id}: localized reason missing`)
    else {
      for (const locale of ['KO', 'EN', 'JP']) {
        if (!new RegExp(`\\b${locale}:\\s*'[^']+'`).test(reasonMatch[1])) {
          errors.push(`${slug}/${id}: ${locale} reason missing`)
        }
      }
    }

    const verifiedAt = entryBlock.match(/verifiedAt:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1]
    if (!verifiedAt || Number.isNaN(Date.parse(`${verifiedAt}T00:00:00Z`))) {
      errors.push(`${slug}/${id}: valid verifiedAt missing`)
    }

    const preparationOrder = Number(entryBlock.match(/preparationOrder:\s*(\d+)/)?.[1])
    if (!Number.isInteger(preparationOrder) || preparationOrder < 1 || preparationOrder > 4) {
      errors.push(`${slug}/${id}: preparationOrder must be 1-4`)
    } else {
      preparationOrders.push(preparationOrder)
    }

    const itemBlock = findCatalogItem(id)
    if (!itemBlock) {
      errors.push(`${slug}/${id}: affiliate catalog item not found`)
      continue
    }
    if (!/status:\s*'active_affiliate'/.test(itemBlock)) {
      errors.push(`${slug}/${id}: status must be active_affiliate`)
    }
    if (!/href:\s*/.test(itemBlock)) errors.push(`${slug}/${id}: href missing`)
    if (!/trackingId:\s*'[^']+'/.test(itemBlock)) errors.push(`${slug}/${id}: trackingId missing`)
    if (!/coverPhoto:\s*'[^']+'/.test(itemBlock)) errors.push(`${slug}/${id}: coverPhoto missing`)
  }

  const expectedOrder = Array.from({ length: references.length }, (_, index) => index + 1).join(',')
  const actualOrder = [...preparationOrders].sort((a, b) => a - b).join(',')
  if (actualOrder !== expectedOrder) {
    errors.push(`${slug}: preparationOrder must be unique and contiguous (${expectedOrder}), found ${actualOrder || 'none'}`)
  }
}

if (errors.length > 0) {
  console.error('Trip Set conversion audit failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Trip Set conversion audit passed (${expectedTripSets.length} trip sets, active affiliate references only).`)
