const fs = require('fs')
const path = require('path')

const targets = []
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) {
      if (f === 'ui' || f === 'api') continue
      walk(p)
    } else if (p.endsWith('.tsx')) targets.push(p)
  }
}
walk(path.join(__dirname, '../src/app'))
targets.push(path.join(__dirname, '../src/components/Navbar.tsx'))
targets.push(path.join(__dirname, '../src/components/Footer.tsx'))

const reps = [
  [/text-teal-400 text-xs font-bold tracking-widest uppercase/g, 'text-teal-400 text-badge'],
  [/text-teal-600 text-xs font-bold tracking-widest uppercase/g, 'text-teal-600 text-badge'],
  [/text-white\/60 text-xs/g, 'text-white/70 text-caption'],
  [/text-white\/70 text-xs/g, 'text-white/70 text-caption'],
  [/text-white\/50 text-xs/g, 'text-white/60 text-caption'],
  [/text-white\/60 text-xs/g, 'text-white/70 text-caption'],
  [/text-readable-muted text-xs/g, 'text-readable-muted text-caption'],
  [/text-gray-400 text-xs/g, 'text-gray-500 text-caption'],
  [/text-xs text-readable-muted/g, 'text-caption text-readable-muted'],
  [/text-xs font-bold px-3/g, 'text-caption font-bold px-3.5'],
  [/text-xs font-bold px-2/g, 'text-caption font-bold px-2.5'],
  [/text-xs font-semibold/g, 'text-caption font-semibold'],
  [/text-xs font-black/g, 'text-caption font-black'],
  [/text-xs font-medium/g, 'text-caption font-medium'],
  [/text-xs font-bold/g, 'text-caption font-bold'],
  [/text-xs tracking-widest/g, 'text-sm tracking-widest'],
  [/text-readable-muted leading-relaxed mb-6 text-sm/g, 'text-readable-muted text-body leading-relaxed mb-6'],
  [/text-readable-muted text-sm/g, 'text-readable-muted text-body'],
  [/text-gray-500 text-sm/g, 'text-gray-600 text-body'],
  [/text-gray-900 text-sm/g, 'text-gray-900 text-body'],
  [/text-gray-600 text-sm/g, 'text-gray-600 text-body'],
  [/text-sm text-gray-300/g, 'text-base text-gray-300'],
  [/text-sm text-readable-muted/g, 'text-body text-readable-muted'],
  [/text-white\/70 text-sm/g, 'text-white/80 text-body'],
  [/text-white\/50 text-sm/g, 'text-white/60 text-body'],
  [/text-sm font-semibold/g, 'text-label font-semibold'],
  [/text-sm font-medium/g, 'text-body font-medium'],
  [/text-sm font-bold/g, 'text-label font-bold'],
  [/text-sm leading-relaxed/g, 'text-body leading-relaxed'],
  [/text-white font-black text-sm/g, 'text-white font-black text-base'],
  [/text-teal-400 text-sm font-semibold/g, 'text-teal-400 text-label font-semibold'],
  [/text-white\/80 text-sm/g, 'text-white/80 text-body'],
  [/block text-gray-700 text-sm/g, 'block text-gray-700 text-body'],
  [/text-center font-bold py-3 rounded-full text-sm/g, 'text-center font-bold py-3 rounded-full text-label'],
  [/text-white\/60 text-xs font-bold uppercase tracking-widest/g, 'text-white/70 text-badge'],
  [/border-t border-white\/5 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs/g, 'border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-caption'],
  [/ul className="space-y-2 text-sm"/g, 'ul className="space-y-2 text-body"'],
  [/text-sm leading-relaxed text-white/g, 'text-body leading-relaxed text-white'],
]

for (const p of targets) {
  let c = fs.readFileSync(p, 'utf8')
  const orig = c
  for (const [a, b] of reps) c = c.replace(a, b)
  if (c !== orig) {
    fs.writeFileSync(p, c)
    console.log(path.relative(path.join(__dirname, '..'), p))
  }
}
