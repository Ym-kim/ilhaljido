import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const NEXT_DIR = path.join(ROOT, '.next')
const OUT_DIR = path.join(ROOT, 'artifacts', 'full-site-audit')

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))

const prerender = readJson(path.join(NEXT_DIR, 'prerender-manifest.json'))
const appPaths = readJson(path.join(NEXT_DIR, 'app-path-routes-manifest.json'))

const excluded = (route) =>
  route.startsWith('/_') ||
  route.startsWith('/api/') ||
  route.startsWith('/admin') ||
  route.startsWith('/auth/') ||
  route.endsWith('/opengraph-image') ||
  ['/apple-icon.png', '/favicon.ico', '/icon.svg', '/manifest.webmanifest', '/robots.txt', '/sitemap.xml'].includes(route)

const prerenderedRoutes = Object.keys(prerender.routes).filter((route) => !excluded(route))
const runtimeRoutes = Object.values(appPaths)
  .filter((route) => !route.includes('[') && !excluded(route))
  .filter((route) => !prerenderedRoutes.includes(route))

const routes = [...new Set([...prerenderedRoutes, ...runtimeRoutes])].sort()

const stripLocale = (route) => route.replace(/^\/(en|ja)(?=\/|$)/, '/:locale')

function templateFor(route) {
  const localized = stripLocale(route)
  if (/^\/(?:\:locale\/)?collections\/[^/]+$/.test(localized)) return localized.replace(/\/[^/]+$/, '/[slug]')
  if (/^\/(?:\:locale\/)?destinations\/[^/]+$/.test(localized) && !localized.endsWith('/compare')) return localized.replace(/\/[^/]+$/, '/[city]')
  if (/^\/(?:\:locale\/)?guide\/[^/]+$/.test(localized)) return localized.replace(/\/[^/]+$/, '/[city]')
  if (/^\/(?:\:locale\/)?experiences\/[^/]+$/.test(localized)) return localized.replace(/\/[^/]+$/, '/[slug]')
  if (/^\/(?:\:locale\/)?programs\/support\/[^/]+$/.test(localized) && !/\/(calendar|half-price-travel|register)$/.test(localized)) {
    return localized.replace(/\/[^/]+$/, '/[slug]')
  }
  return localized
}

function localeFor(route) {
  if (route === '/en' || route.startsWith('/en/')) return 'en'
  if (route === '/ja' || route.startsWith('/ja/')) return 'ja'
  return 'ko'
}

const routeRecords = routes.map((route) => ({
  route,
  locale: localeFor(route),
  template: templateFor(route),
  source: prerenderedRoutes.includes(route) ? 'prerender' : 'runtime',
  audit: 'pending',
}))

const uniqueTemplates = [...new Set(routeRecords.map((record) => record.template))].sort()

const dataVariant = (route) =>
  /^\/(collections|destinations|guide)\/[^/]+$/.test(route) ||
  /^\/experiences\/[^/]+$/.test(route) ||
  /^\/programs\/support\/[^/]+$/.test(route) && !/\/(calendar|half-price-travel|register)$/.test(route)

const templateSamples = []
for (const template of uniqueTemplates) {
  const records = routeRecords.filter((record) => record.template === template)
  const ko = records.find((record) => record.locale === 'ko')
  templateSamples.push((ko ?? records[0]).route)

  const en = records.find((record) => record.locale === 'en')
  const ja = records.find((record) => record.locale === 'ja')
  if (en) templateSamples.push(en.route)
  if (ja) templateSamples.push(ja.route)
}

const screenshotRoutes = [...new Set([
  ...templateSamples,
  ...routeRecords.filter((record) => record.locale === 'ko' && dataVariant(record.route)).map((record) => record.route),
])].sort()

const inventory = {
  generatedAt: new Date().toISOString(),
  buildId: fs.readFileSync(path.join(NEXT_DIR, 'BUILD_ID'), 'utf8').trim(),
  publicRouteCount: routeRecords.length,
  prerenderedRouteCount: prerenderedRoutes.length,
  runtimeRouteCount: runtimeRoutes.length,
  uniqueTemplateCount: uniqueTemplates.length,
  screenshotRouteCount: screenshotRoutes.length,
  unresolvedDynamicPatterns: Object.values(appPaths).filter((route) => route.includes('[') && !excluded(route)).sort(),
  screenshotRoutes,
  routes: routeRecords,
}

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'routes.json'), `${JSON.stringify(inventory, null, 2)}\n`)

console.log(`Full-site route inventory: ${inventory.publicRouteCount} public routes, ${inventory.uniqueTemplateCount} templates, ${inventory.screenshotRouteCount} screenshot routes`)
if (inventory.unresolvedDynamicPatterns.length) {
  console.log(`Unresolved dynamic patterns: ${inventory.unresolvedDynamicPatterns.join(', ')}`)
}
