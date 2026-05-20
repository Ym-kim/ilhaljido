const fs = require('fs')
const path = require('path')

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8')
      const o = c
      c = c.replace(/import Navbar from '@\/components\/Navbar'\r?\n/g, '')
      c = c.replace(/\s*<Navbar[^/]*\/>\r?\n/g, '\n')
      if (c !== o) {
        fs.writeFileSync(p, c)
        console.log(p)
      }
    }
  }
}

walk(path.join(__dirname, '../src/app'))
