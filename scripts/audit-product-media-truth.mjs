import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import sharp from 'sharp'

const root = process.cwd()
const sourceFiles = [
  'src/lib/affiliate/featured.ts',
  'src/lib/affiliate/items.ts',
  'src/lib/i18n/data.ts',
]

const strict = process.argv.includes('--strict')
const summaryOnly = process.argv.includes('--summary')
const inventoryPath = path.join(root, 'artifacts', 'product-media-truth-inventory.json')
const provenanceFiles = new Set([
  'src/lib/media/assets.ts',
  'src/lib/media/productEditorial.ts',
  'src/lib/media/verifiedRemoteSources.ts',
])
const expectedEditorialAssets = [
  ['accommodation-urban-studio-editorial-v1.webp', 1200, 900],
  ['tropical-coliving-editorial-v1.webp', 1200, 900],
  ['social-stay-lounge-editorial-v1.webp', 1200, 900],
  ['coastal-apartment-editorial-v1.webp', 1200, 900],
  ['serviced-apartment-editorial-v1.webp', 1200, 900],
  ['design-hotel-lobby-editorial-v1.webp', 1200, 900],
  ['japanese-apartment-editorial-v1.webp', 1200, 900],
  ['city-highrise-apartment-editorial-v1.webp', 1200, 900],
  ['coastal-residence-editorial-v1.webp', 1200, 900],
  ['tropical-boutique-room-editorial-v1.webp', 1200, 900],
  ['program-jeonju-hanok-licensed-v1.webp', 1200, 900],
  ['program-yeosu-harbor-licensed-v1.webp', 1200, 675],
]

function property(object, name) {
  return object.properties.find((node) => {
    if (!ts.isPropertyAssignment(node)) return false
    if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text === name
    return false
  })
}

function staticString(node) {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isCallExpression(node) && node.arguments.length > 0) return staticString(node.arguments[0])
  return undefined
}

function staticBoolean(node) {
  if (node?.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node?.kind === ts.SyntaxKind.FalseKeyword) return false
  return undefined
}

function parentDeclarationName(node) {
  let current = node.parent
  while (current) {
    if (ts.isVariableDeclaration(current) && ts.isIdentifier(current.name)) return current.name.text
    current = current.parent
  }
  return 'unknown'
}

function classify(file, container, id) {
  if (file.includes('/affiliate/')) return 'product'
  if (container.includes('SUPPORT')) return 'support-program'
  if (container.includes('DOMESTIC')) return 'hosted-program'
  if (container.includes('CRUISE')) return 'cruise-content'
  if (container.includes('STAY')) return 'stay-content'
  if (container.includes('ACTIVIT')) return 'activity-content'
  if (container.includes('LANG')) return 'language-content'
  if (container.includes('MARKET')) return 'market-content'
  if (container.includes('GLOBAL')) return 'global-content'
  return id.startsWith('stay-') ? 'product' : 'content'
}

function mediaKind(src) {
  if (/^https:\/\/images\.unsplash\.com\//.test(src)) return 'remote-unsplash'
  if (/^https?:\/\//.test(src)) return 'remote-other'
  if (/-ai\.(?:jpe?g|png|webp)$/i.test(src)) return 'generated-legacy'
  if (/\/(?:media\/destinations|media\/verified\/unsplash)\//.test(src)) return 'verified-local'
  if (/-photo-v\d+\.webp$/i.test(src)) return 'generated-editorial'
  return 'local-unclassified'
}

function risksFor(record) {
  const risks = []
  if (record.kind.startsWith('remote-')) risks.push('remote-hotlink')
  if (record.classification === 'product' && record.kind === 'generated-legacy' && !record.illustrative) {
    risks.push('undisclosed-generated-product')
  }
  if (record.classification === 'product' && record.kind === 'local-unclassified' && !record.illustrative) {
    risks.push('unproven-product-photo')
  }
  if (record.classification === 'product' && record.kind === 'verified-local' && !record.illustrative) {
    risks.push('destination-photo-presented-as-product')
  }
  return risks
}

const records = []

for (const relativeFile of sourceFiles) {
  const absoluteFile = path.join(root, relativeFile)
  const sourceText = await fs.readFile(absoluteFile, 'utf8')
  const sourceFile = ts.createSourceFile(relativeFile, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const id = staticString(property(node, 'id')?.initializer)
      const mediaProperty = ['coverPhoto', 'photo', 'img']
        .map((name) => [name, property(node, name)])
        .find(([, value]) => value)
      if (id && mediaProperty) {
        const [field, mediaNode] = mediaProperty
        const src = staticString(mediaNode.initializer)
        if (src) {
          const container = parentDeclarationName(node)
          const illustrative = staticBoolean(property(node, 'illustrative')?.initializer) ?? false
          const title = staticString(property(node, 'productTitle')?.initializer)
            ?? staticString(property(node, 'displayTitle')?.initializer)
            ?? staticString(property(node, 'name')?.initializer)
            ?? staticString(property(node, 'title')?.initializer)
            ?? ''
          const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
          const record = {
            file: relativeFile.replaceAll('\\', '/'),
            line: location.line + 1,
            container,
            id,
            title,
            field,
            src,
            illustrative,
            classification: classify(relativeFile.replaceAll('\\', '/'), container, id),
            kind: mediaKind(src),
          }
          record.risks = risksFor(record)
          records.push(record)
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
}

for (const record of records) {
  if (!record.src.startsWith('/')) continue
  const filePath = path.join(root, 'public', record.src.replace(/^\/+/, ''))
  try {
    await fs.access(filePath)
  } catch {
    record.risks.push('missing-local-file')
  }
}

async function collectSourceHotlinks(directory) {
  const findings = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      findings.push(...await collectSourceHotlinks(absolutePath))
      continue
    }
    if (!/\.(?:ts|tsx)$/.test(entry.name)) continue
    const relativePath = path.relative(root, absolutePath).replaceAll('\\', '/')
    if (provenanceFiles.has(relativePath)) continue
    const source = await fs.readFile(absolutePath, 'utf8')
    source.split(/\r?\n/).forEach((line, index) => {
      if (line.includes('https://images.unsplash.com/')) {
        findings.push({ file: relativePath, line: index + 1 })
      }
    })
  }
  return findings
}

const sourceHotlinks = await collectSourceHotlinks(path.join(root, 'src'))
const productEditorialUse = records
  .filter((record) => record.classification === 'product' && record.src.startsWith('/media/product-editorial/'))
  .reduce((counts, record) => counts.set(record.src, (counts.get(record.src) ?? 0) + 1), new Map())
const duplicateProductAssets = [...productEditorialUse.entries()]
  .filter(([, count]) => count > 4)
  .map(([src, count]) => ({ src, count }))
const assetFailures = []
for (const [filename, expectedWidth, expectedHeight] of expectedEditorialAssets) {
  const assetPath = path.join(root, 'public', 'media', 'product-editorial', filename)
  try {
    const metadata = await sharp(assetPath).metadata()
    if (metadata.format !== 'webp') assetFailures.push(`${filename}: expected WebP`)
    if (metadata.width !== expectedWidth || metadata.height !== expectedHeight) {
      assetFailures.push(`${filename}: expected ${expectedWidth}x${expectedHeight}, got ${metadata.width}x${metadata.height}`)
    }
  } catch (error) {
    assetFailures.push(`${filename}: ${error instanceof Error ? error.message : 'unreadable asset'}`)
  }
}

const risky = records.filter((record) => record.risks.length > 0)
const remoteSources = new Set(records.filter((record) => record.kind.startsWith('remote-')).map((record) => record.src))
const summary = records.reduce((result, record) => {
  result[record.kind] = (result[record.kind] ?? 0) + 1
  return result
}, {})

await fs.mkdir(path.dirname(inventoryPath), { recursive: true })
await fs.writeFile(inventoryPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  records,
  summary,
  riskCount: risky.length,
  sourceHotlinks,
  assetFailures,
  duplicateProductAssets,
  uniqueRemoteSources: remoteSources.size,
}, null, 2)}\n`)

console.log(`Product media inventory: ${records.length} records`)
for (const [kind, count] of Object.entries(summary).sort()) console.log(`- ${kind}: ${count}`)
console.log(`Unique remote sources: ${remoteSources.size}`)
console.log(`Risk findings: ${risky.length}`)
console.log(`Source hotlinks: ${sourceHotlinks.length}`)
console.log(`Editorial asset failures: ${assetFailures.length}`)
console.log(`Overused product editorial assets: ${duplicateProductAssets.length}`)
if (!summaryOnly) {
  for (const record of risky) {
    console.log([
      record.file,
      record.line,
      record.container,
      record.id,
      record.kind,
      record.illustrative ? 'illustrative' : 'unlabeled',
      record.risks.join(','),
      record.src,
    ].join('\t'))
  }
}

for (const finding of sourceHotlinks) {
  console.log(`${finding.file}:${finding.line}\tremote-unsplash-source`)
}
for (const failure of assetFailures) console.log(`product-editorial\t${failure}`)
for (const duplicate of duplicateProductAssets) console.log(`product-editorial\toverused ${duplicate.count}x\t${duplicate.src}`)

if (strict && (risky.length > 0 || sourceHotlinks.length > 0 || assetFailures.length > 0 || duplicateProductAssets.length > 0)) process.exit(1)
