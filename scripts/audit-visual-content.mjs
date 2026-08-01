import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const requiredModules = new Map([
  ['src/app/page.tsx', ['service-ecosystem-map']],
  ['src/components/programs/ProgramsHubView.tsx', ['program-portfolio', 'program-status-roadmap']],
  ['src/components/select/SelectHubView.tsx', ['preparation-timeline']],
  ['src/components/affiliate/CollectionsHub.tsx', ['featured-trip-set', 'trip-set-comparison', 'editorial-theme-index']],
  ['src/components/guide/GuideView.tsx', ['neighborhood-rail']],
  ['src/components/affiliate/WishlistView.tsx', ['first-save-journey']],
])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else files.push(full)
  }
  return files
}

const failures = []
let visualModuleCount = 0

for (const [relative, modules] of requiredModules) {
  const source = await readFile(path.join(root, relative), 'utf8')
  for (const moduleId of modules) {
    if (!source.includes(`data-visual-module="${moduleId}"`)) {
      failures.push(`${relative}: missing visual module ${moduleId}`)
    } else {
      visualModuleCount += 1
    }
  }
}

const programSource = await readFile(path.join(root, 'src/lib/i18n/content.ts'), 'utf8')
const programBlock = programSource.match(/export function getProgramsList\(\)[\s\S]*?\n}\n\nexport function getGrowthCamps/)?.[0] ?? ''
if (/https?:\/\//.test(programBlock)) failures.push('getProgramsList: remote image hotlink remains')

const sourceFiles = (await walk(path.join(root, 'src'))).filter((file) => /\.(tsx|ts)$/.test(file))
let sectionCount = 0
for (const file of sourceFiles) {
  const source = await readFile(file, 'utf8')
  sectionCount += (source.match(/<section\b/g) ?? []).length
}

const pageFiles = (await walk(path.join(root, 'src/app')))
  .filter((file) => file.endsWith(`${path.sep}page.tsx`))
  .filter((file) => !file.includes(`${path.sep}admin${path.sep}`) && !file.endsWith(`${path.sep}admin${path.sep}page.tsx`))

if (failures.length > 0) {
  console.error(`Visual content audit failed (${failures.length})`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Visual content audit passed: ${visualModuleCount} modules, ${pageFiles.length} customer route templates, ${sectionCount} source sections`)
