import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const sourceRoot = join(root, 'src')
const appRoot = join(sourceRoot, 'app')
const sourceExtensions = new Set(['.ts', '.tsx'])
const assetExtensions = new Set(['.avif', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webm', '.webp'])

function collectSourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(absolute)
    return sourceExtensions.has(extname(entry.name)) ? [absolute] : []
  })
}

function routeExists(pathname) {
  const clean = pathname.replace(/^\//, '').replace(/\/$/, '')
  if (!clean) return existsSync(join(appRoot, 'page.tsx'))

  let current = appRoot
  for (const segment of clean.split('/')) {
    const exact = join(current, segment)
    if (existsSync(exact)) {
      current = exact
      continue
    }

    if (!existsSync(current)) return false
    const dynamic = readdirSync(current, { withFileTypes: true })
      .find((entry) => entry.isDirectory() && /^\[.+\]$/.test(entry.name))
    if (!dynamic) return false
    current = join(current, dynamic.name)
  }

  return existsSync(join(current, 'page.tsx'))
}

const sourceFiles = collectSourceFiles(sourceRoot)
const sourceContents = new Map(sourceFiles.map((file) => [file, readFileSync(file, 'utf8')]))
const findings = []

for (const [file, source] of sourceContents) {
  const patterns = [
    /\bhref\s*=\s*["'`]([^"'`]+)["'`]/g,
    /\bhref\s*:\s*["'`]([^"'`]+)["'`]/g,
  ]

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const href = match[1].trim()
      if (!href.startsWith('/') || href.startsWith('//') || href.includes('${')) continue

      const [pathnameWithQuery, fragment] = href.split('#', 2)
      const pathname = pathnameWithQuery.split('?', 1)[0]
      if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || assetExtensions.has(extname(pathname))) continue

      findings.push({ file, fragment, href, pathname })
    }
  }
}

const uniqueRoutes = new Map()
for (const finding of findings) {
  const key = `${finding.pathname}#${finding.fragment ?? ''}`
  if (!uniqueRoutes.has(key)) uniqueRoutes.set(key, finding)
}

const missingRoutes = [...uniqueRoutes.values()].filter(({ pathname }) => !routeExists(pathname))
const allSource = [...sourceContents.values()].join('\n')
const missingFragments = [...uniqueRoutes.values()].filter(({ fragment }) => {
  if (!fragment) return false
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const staticDomId = new RegExp(`\\bid\\s*=\\s*["']${escaped}["']`).test(allSource)
  const renderedDataId = new RegExp(`\\bid\\s*:\\s*["']${escaped}["']`).test(allSource)
  return !staticDomId && !renderedDataId
})

if (missingRoutes.length || missingFragments.length) {
  if (missingRoutes.length) {
    console.error(`[cta-routes] Missing internal landing routes (${missingRoutes.length}):`)
    for (const item of missingRoutes) console.error(`- ${item.href} in ${relative(root, item.file)}`)
  }
  if (missingFragments.length) {
    console.error(`[cta-routes] Missing hash targets (${missingFragments.length}):`)
    for (const item of missingFragments) console.error(`- ${item.href} in ${relative(root, item.file)}`)
  }
  process.exit(1)
}

console.log(`[cta-routes] PASS — ${findings.length} literal CTA references resolve to ${uniqueRoutes.size} internal route and hash targets.`)

if (process.argv.includes('--live')) {
  const baseArgument = process.argv.find((argument) => argument.startsWith('--base='))
  const baseUrl = baseArgument?.slice('--base='.length) || 'https://www.wakation.kr'
  const paths = [...new Set([...uniqueRoutes.values()].map(({ pathname }) => pathname))]
  const failures = []

  for (let index = 0; index < paths.length; index += 8) {
    const batch = paths.slice(index, index + 8)
    const results = await Promise.all(batch.map(async (pathname) => {
      try {
        const response = await fetch(new URL(pathname, baseUrl), {
          redirect: 'follow',
          headers: { 'user-agent': 'Wakation-CTA-Audit/1.0' },
        })
        return { pathname, status: response.status, url: response.url }
      } catch (error) {
        return { pathname, status: 0, url: error instanceof Error ? error.message : String(error) }
      }
    }))

    failures.push(...results.filter(({ status }) => status < 200 || status >= 400))
  }

  if (failures.length) {
    console.error(`[cta-routes:live] Failed landings (${failures.length}):`)
    for (const failure of failures) console.error(`- ${failure.pathname} -> ${failure.status} ${failure.url}`)
    process.exit(1)
  }

  console.log(`[cta-routes:live] PASS — ${paths.length} internal landings responded successfully at ${baseUrl}.`)
}
