import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'artifacts', 'full-site-audit')
const audit = JSON.parse(await readFile(path.join(OUT, 'before-browser-audit.json'), 'utf8'))
const inventory = JSON.parse(await readFile(path.join(OUT, 'routes.json'), 'utf8'))

const routeMap = new Map(inventory.routes.map((record) => [record.route, record]))

function score(row) {
  let value = 100
  const issues = []
  if (!row.ok) return { score: 0, grade: 'F', issues: ['route failed to render'] }
  if (row.width > row.clientWidth + 1) {
    value -= 18
    issues.push('horizontal overflow')
  }
  if (row.brokenImages > 0) {
    value -= Math.min(30, row.brokenImages * 10)
    issues.push(`${row.brokenImages} broken images`)
  }
  if (row.missingAlt > 0) {
    value -= Math.min(20, row.missingAlt * 5)
    issues.push(`${row.missingAlt} images without alt attributes`)
  }
  if (row.externalImageCount > 0) {
    value -= 12
    issues.push(`${row.externalImageCount} remote image requests`)
  }
  if (row.infiniteAnimations > 1) {
    value -= Math.min(12, row.infiniteAnimations * 2)
    issues.push(`${row.infiniteAnimations} simultaneous infinite animations`)
  }
  if (row.height > 5200 && row.animationCount === 0) {
    value -= 7
    issues.push('long static journey without editorial pacing')
  }
  if (row.duplicateImageUses >= 4) {
    value -= Math.min(10, row.duplicateImageUses)
    issues.push(`${row.duplicateImageUses} repeated image placements`)
  }
  const finalScore = Math.max(0, value)
  const grade = finalScore >= 92 ? 'A' : finalScore >= 84 ? 'B' : finalScore >= 72 ? 'C' : 'D'
  return { score: finalScore, grade, issues }
}

const scored = audit.viewports.mobile.map((mobile) => {
  const desktop = audit.viewports.desktop.find((row) => row.route === mobile.route)
  const mobileScore = score(mobile)
  const desktopScore = score(desktop)
  return {
    route: mobile.route,
    template: routeMap.get(mobile.route)?.template ?? mobile.route,
    locale: routeMap.get(mobile.route)?.locale ?? 'ko',
    mobile: mobileScore,
    desktop: desktopScore,
    score: Math.round((mobileScore.score + desktopScore.score) / 2),
    issues: [...new Set([...mobileScore.issues, ...desktopScore.issues])],
  }
})

const templates = []
for (const template of [...new Set(scored.map((row) => row.template))].sort()) {
  const rows = scored.filter((row) => row.template === template)
  templates.push({
    template,
    routeCount: rows.length,
    score: Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length),
    lowestRoute: [...rows].sort((a, b) => a.score - b.score)[0].route,
    issues: [...new Set(rows.flatMap((row) => row.issues))],
  })
}

const summary = {
  generatedAt: new Date().toISOString(),
  routeCount: scored.length,
  templateCount: templates.length,
  averageScore: Math.round(scored.reduce((sum, row) => sum + row.score, 0) / scored.length),
  gradeCounts: Object.fromEntries(['A', 'B', 'C', 'D'].map((grade) => [grade, scored.filter((row) => (row.score >= 92 ? 'A' : row.score >= 84 ? 'B' : row.score >= 72 ? 'C' : 'D') === grade).length])),
  lowestRoutes: [...scored].sort((a, b) => a.score - b.score).slice(0, 30),
  templates,
  routes: scored,
}

await mkdir(OUT, { recursive: true })
await writeFile(path.join(OUT, 'route-motion-visual-scorecard.json'), `${JSON.stringify(summary, null, 2)}\n`)
const csv = [
  'route,template,locale,score,mobile_score,desktop_score,issues',
  ...scored.map((row) => [row.route, row.template, row.locale, row.score, row.mobile.score, row.desktop.score, row.issues.join(' | ')].map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')),
].join('\n')
await writeFile(path.join(OUT, 'route-motion-visual-scorecard.csv'), `${csv}\n`)
const docsAuditDir = path.join(ROOT, 'docs', 'audits')
await mkdir(docsAuditDir, { recursive: true })
await writeFile(path.join(docsAuditDir, 'full-site-route-scorecard-2026-08.csv'), `${csv}\n`)

console.log(`Motion/visual scorecard: ${summary.routeCount} routes, ${summary.templateCount} templates, average ${summary.averageScore}/100`)
console.log(`Grades: ${Object.entries(summary.gradeCounts).map(([grade, count]) => `${grade} ${count}`).join(' · ')}`)
