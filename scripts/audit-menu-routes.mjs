import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const navigationPath = join(root, 'src', 'lib', 'navigation.ts')
const navigation = readFileSync(navigationPath, 'utf8')
const hrefs = [...navigation.matchAll(/['"](\/(?:en\/|ja\/)?[^'"?#]*)['"]/g)]
  .map((match) => match[1])
  .filter((href) => !href.includes('${'))
const uniqueHrefs = [...new Set(hrefs)]
  .filter((href) => !/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(href))

function routeExists(href) {
  const clean = href.replace(/^\//, '').replace(/\/$/, '')
  if (!clean) return existsSync(join(root, 'src', 'app', 'page.tsx'))
  let current = join(root, 'src', 'app')
  for (const segment of clean.split('/')) {
    const exact = join(current, segment)
    if (existsSync(exact)) {
      current = exact
      continue
    }
    const dynamic = readdirSync(current, { withFileTypes: true })
      .find((entry) => entry.isDirectory() && entry.name.startsWith('[') && entry.name.endsWith(']'))
    if (!dynamic) return false
    current = join(current, dynamic.name)
  }
  return existsSync(join(current, 'page.tsx'))
}

const missing = uniqueHrefs.filter((href) => !routeExists(href))

if (missing.length > 0) {
  console.error(`[menu-routes] Missing route files (${missing.length}):`)
  for (const href of missing) console.error(`- ${href}`)
  process.exit(1)
}

console.log(`[menu-routes] PASS — ${uniqueHrefs.length} navigation destinations resolve to page.tsx files.`)
