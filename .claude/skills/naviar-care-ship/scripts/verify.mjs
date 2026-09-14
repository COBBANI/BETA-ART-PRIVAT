// Yayın kapısı: axe WCAG 2.1 AA (0 ihlal), smoke, sıfır dış istek + ekran görüntüsü.
// Bağımlılıklar ÇALIŞTIRILDIĞIN dizinden çözülür (betiğin durduğu yerden değil):
//   npm i --no-save playwright axe-core   # bir kez, herhangi bir çalışma dizininde
// Chromium bu ortamda hazırdır: /opt/pw-browsers/chromium — "playwright install" yok.
import { createRequire } from 'module'
import { readFileSync } from 'fs'
import { join, dirname, resolve } from 'path'

const bundle = process.argv[2]
if (!bundle) { console.error('bruk: node verify.mjs <bundle.html-yolu>'); process.exit(2) }
const bundleAbs = resolve(bundle)

const require = createRequire(join(process.cwd(), 'noop.js'))
let chromium, axePath
try {
  ({ chromium } = require('playwright'))
  axePath = require.resolve('axe-core/axe.min.js')
} catch {
  console.error('HATA: playwright/axe-core bu dizinden çözülemedi. Çalıştır: npm i --no-save playwright axe-core')
  process.exit(2)
}
const axe = readFileSync(axePath, 'utf8')

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
// nb-NO: site språkdetekterer fra navigator.language — porten tester norsk primærversjon
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'nb-NO' })
const external = []
page.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:')) external.push(u) })
const errs = []
page.on('pageerror', e => errs.push(String(e).slice(0, 140)))

await page.goto('file://' + bundleAbs)
await page.waitForTimeout(1500)
await page.evaluate(() => document.fonts.ready)

let fail = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  [' + detail + ']' : ''}`)
  if (!ok) fail++
}

// smoke
check('h1 render', !!(await page.textContent('h1').catch(() => null)))
check('nav mevcut', await page.isVisible('header nav'))
check('chat düğmesi', await page.isVisible('text=Spør Navi'))
check('JS hatası yok', errs.length === 0, errs.join('|'))
check('dış istek sıfır', external.length === 0, external.slice(0, 3).join(', '))

// kanıt karesi (bundle'ın yanına)
const shot = join(dirname(bundleAbs), 'verify-shot.png')
await page.screenshot({ path: shot })

// axe: sayfa + açık modal
await page.evaluate(axe)
const runAxe = async label => {
  const r = await page.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }))
  check(`axe ${label}: 0 ihlal`, r.violations.length === 0,
    r.violations.map(v => v.id + '×' + v.nodes.length).join(', '))
}
await runAxe('sayfa')
await page.click('header button:has-text("Kom i gang")').catch(() => {})
await page.waitForTimeout(400)
await runAxe('modal')

await browser.close()
console.log(`ekran görüntüsü: ${shot}`)
console.log(fail === 0 ? '\nYayın kapısı: GEÇTİ' : `\nYayın kapısı: ${fail} hata — YAYINLAMA`)
process.exit(fail === 0 ? 0 : 1)
