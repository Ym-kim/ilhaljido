import fs from 'node:fs/promises'
import process from 'node:process'

const [endpoint = 'http://127.0.0.1:9223', url, widthText = '390', heightText = '844', output] = process.argv.slice(2)

if (!url || !output) {
  console.error('Usage: node scripts/cdp-page-qa.mjs <endpoint> <url> <width> <height> <output.png>')
  process.exit(1)
}

const page = await fetch(`${endpoint}/json/new?about:blank`, { method: 'PUT' }).then((response) => response.json())
const socket = new WebSocket(page.webSocketDebuggerUrl)
const pending = new Map()
let sequence = 0

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (!message.id) return
  const callback = pending.get(message.id)
  if (!callback) return
  pending.delete(message.id)
  if (message.error) callback.reject(new Error(message.error.message))
  else callback.resolve(message.result)
})

function send(method, params = {}) {
  const id = ++sequence
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
}

const width = Number(widthText)
const height = Number(heightText)
await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 768,
  screenWidth: width,
  screenHeight: height,
})
await send('Page.navigate', { url })

for (let attempt = 0; attempt < 30; attempt += 1) {
  const result = await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true })
  if (result.result.value === 'complete') break
  await new Promise((resolve) => setTimeout(resolve, 200))
}
await new Promise((resolve) => setTimeout(resolve, 1200))

const metricsResult = await send('Runtime.evaluate', {
  expression: `JSON.stringify({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelector('h1')?.textContent?.trim() ?? null,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
    destinationImages: [...document.images].map((image) => decodeURIComponent(image.currentSrc || image.src)).filter((src) => src.includes('/media/destinations/')),
    remoteUnsplashImages: [...document.images].map((image) => decodeURIComponent(image.currentSrc || image.src)).filter((src) => src.includes('images.unsplash.com'))
  })`,
  returnByValue: true,
})
const metrics = JSON.parse(metricsResult.result.value)

const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
await fs.writeFile(output, Buffer.from(screenshot.data, 'base64'))

console.log(JSON.stringify(metrics, null, 2))
socket.close()
await fetch(`${endpoint}/json/close/${page.id}`)
