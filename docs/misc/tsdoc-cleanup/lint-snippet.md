# Header Order Check — Snippets

Use these local checks to verify required header blocks and order. No CI wiring is required.

## ripgrep (rg) quick check

```bash
# Shows files whose top TSDoc block contains all required blocks in order
rg -nU --glob 'src/**/*.ts' \
  '/\*\*[\s\S]*?@module[\s\S]*?@description[\s\S]*?@functions[\s\S]*?@input[\s\S]*?@output[\s\S]*?@baseType[\s\S]*?@cli[\s\S]*?@exampleResponse' | cat
```

## Minimal Node.js checker (run with `node`)

```javascript
// Save as scripts/check-header-order.mjs and run: node scripts/check-header-order.mjs
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const required = ['@module','@description','@functions','@input','@output','@baseType','@cli','@exampleResponse']

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(d => {
  const p = join(dir, d.name)
  return d.isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : []
})

const files = walk('src')
let failures = 0

for (const f of files) {
  const text = readFileSync(f, 'utf8')
  const match = text.match(/\/\*\*[\s\S]*?\*\//)
  if (!match) { console.log(`Missing top header: ${f}`); failures++; continue }
  const header = match[0]
  let idx = -1
  let ok = true
  for (const token of required) {
    const next = header.indexOf(token, idx + 1)
    if (next === -1 || next < idx) { ok = false; break }
    idx = next
  }
  if (!ok) { console.log(`Order/blocks issue: ${f}`); failures++ }
}

if (failures) process.exit(1)
console.log('All headers OK')
```
