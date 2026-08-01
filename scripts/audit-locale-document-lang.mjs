import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const pages = [
  { route: '/', file: '.next/server/app/index.html', lang: 'ko' },
  { route: '/en', file: '.next/server/app/en.html', lang: 'en' },
  { route: '/ja', file: '.next/server/app/ja.html', lang: 'ja' },
  { route: '/en/programs/support', file: '.next/server/app/en/programs/support.html', lang: 'en' },
  { route: '/ja/programs/support', file: '.next/server/app/ja/programs/support.html', lang: 'ja' },
]

const failures = []

for (const page of pages) {
  try {
    const html = await readFile(path.join(root, page.file), 'utf8')
    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0]

    if (!htmlTag) {
      failures.push(`${page.route}: missing <html> element in ${page.file}`)
      continue
    }

    const lang = htmlTag.match(/\blang=(?:"([^"]+)"|'([^']+)')/i)?.slice(1).find(Boolean)
    if (lang !== page.lang) {
      failures.push(`${page.route}: expected lang="${page.lang}", got ${lang ? `lang="${lang}"` : 'no lang attribute'}`)
    }
  } catch (error) {
    failures.push(`${page.route}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (failures.length) {
  console.error(`Locale document language audit failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Locale document language audit passed: ${pages.map(({ route, lang }) => `${route}=${lang}`).join(', ')}`)
