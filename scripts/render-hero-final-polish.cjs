/* Reproducible local-only media edit. Usage: node scripts/render-hero-final-polish.cjs <source-directory> */
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const sharp = require('sharp')
const edl = require('./hero-final-polish.edl.json')

const root = process.cwd()
const sourceDirectory = process.argv[2]
if (!sourceDirectory) throw new Error('Pass the directory containing the user-provided source videos.')
const ffmpeg = path.join(root, 'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe')
const scratch = path.join(root, 'artifacts/hero-final-polish-render')
const output = path.join(root, 'public/media/campaigns')
fs.mkdirSync(scratch, { recursive: true })
fs.mkdirSync(output, { recursive: true })
sharp.concurrency(2)
sharp.cache({ memory: 64, files: 0, items: 20 })
const frameName = (frame) => String(frame).padStart(4, '0') + '.jpg'
const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })

for (const [id, file] of Object.entries(edl.sources)) {
  const directory = path.join(scratch, id)
  fs.mkdirSync(directory, { recursive: true })
  if (!fs.existsSync(path.join(directory, frameName(192)))) {
    run(['-i', path.join(sourceDirectory, file), '-an', '-vf', 'scale=1280:720', '-q:v', '2',
      '-start_number', '0', path.join(directory, '%04d.jpg')])
  }
}

const frameCache = new Map()
async function rawFrame(source, frame) {
  const key = source + ':' + frame
  if (!frameCache.has(key)) {
    const pixels = await sharp(path.join(scratch, source, frameName(frame))).removeAlpha().raw().toBuffer()
    frameCache.set(key, pixels)
    if (frameCache.size > 8) frameCache.delete(frameCache.keys().next().value)
  }
  return frameCache.get(key)
}
function blend(a, b, amount) {
  if (amount <= 0) return a
  if (amount >= 1) return b
  const result = Buffer.allocUnsafe(a.length)
  for (let i = 0; i < a.length; i++) result[i] = Math.round(a[i] * (1 - amount) + b[i] * amount)
  return result
}
const rawOptions = { raw: { width: edl.width, height: edl.height, channels: 3 } }

async function main() {
  const first = await rawFrame('city', edl.shots.start.startFrame)
  for (const [variant, shotIds] of Object.entries(edl.variants)) {
    const directory = path.join(scratch, variant)
    fs.mkdirSync(directory, { recursive: true })
    const total = shotIds.reduce((sum, id) => sum + edl.shots[id].outputFrames, 0)
    let index = 0
    for (const id of shotIds) {
      const shot = edl.shots[id]
      for (let n = 0; n < shot.outputFrames; n++, index++) {
        const sourcePosition = shot.startFrame + n * (shot.endFrame - shot.startFrame - 1) / (shot.outputFrames - 1)
        const low = Math.floor(sourcePosition)
        const high = Math.min(Math.ceil(sourcePosition), shot.endFrame - 1)
        let pixels = blend(await rawFrame(shot.source, low), await rawFrame(shot.source, high), sourcePosition - low)
        if (shot.mirror) pixels = await sharp(pixels, rawOptions).flop().raw().toBuffer()
        const tail = index - (total - edl.loopDissolveFrames)
        if (tail >= 0) {
          const linear = (tail + 1) / edl.loopDissolveFrames
          const eased = linear * linear * (3 - 2 * linear)
          pixels = blend(pixels, first, eased)
        }
        await sharp(pixels, rawOptions).jpeg({ quality: 96, chromaSubsampling: '4:4:4' }).toFile(path.join(directory, frameName(index)))
      }
      console.log(variant + ': ' + id + ' ' + shot.outputFrames + ' frames')
    }
    const input = ['-framerate', String(edl.fps), '-start_number', '0', '-i', path.join(directory, '%04d.jpg'),
      '-frames:v', String(total), '-an']
    const prefix = path.join(output, 'home-hero-' + variant + '-v3')
    run([...input, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', prefix + '.mp4'])
    run([...input, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '32', '-row-mt', '1', '-cpu-used', '2',
      '-pix_fmt', 'yuv420p', prefix + '.webm'])
    console.log(variant + ': ' + total / edl.fps + 's; WebM ' + fs.statSync(prefix + '.webm').size + '; MP4 ' + fs.statSync(prefix + '.mp4').size)
  }
  // The opening medium-wide frame gives the poster and film the same composition.
  for (const format of ['webp', 'avif']) {
    const desktop = sharp(first, rawOptions)
    const mobile = sharp(first, rawOptions).extract({ left: 516, top: 0, width: 540, height: 720 }).resize(900, 1200)
    const options = format === 'webp' ? { quality: 88, effort: 6 } : { quality: 64, effort: 6 }
    await desktop[format](options).toFile(path.join(output, 'home-hero-polish-poster-desktop-v3.' + format))
    await mobile[format](options).toFile(path.join(output, 'home-hero-polish-poster-mobile-v3.' + format))
  }
}
main().catch((error) => { console.error(error.message); process.exitCode = 1 })
