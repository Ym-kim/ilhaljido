const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const sharp = require('sharp')
const edl = require('./hero-final-polish.edl.json')
const root = process.cwd()
const bin = path.join(root, 'node_modules/@remotion/compositor-win32-x64-msvc')
const report = {}
async function main() {
  for (const [variant, shotIds] of Object.entries(edl.variants)) {
    const prefix = path.join(root, 'public/media/campaigns/home-hero-' + variant + '-v3')
    const directory = path.join(root, 'artifacts/hero-final-polish-qa/' + variant)
    fs.mkdirSync(directory, { recursive: true })
    const expected = shotIds.reduce((n, id) => n + edl.shots[id].outputFrames, 0)
    const expectedCuts = []
    shotIds.reduce((n, id, i) => { if (i) expectedCuts.push(n); return n + edl.shots[id].outputFrames }, 0)
    const formats = {}
    for (const extension of ['webm', 'mp4']) {
      const file = prefix + '.' + extension
      const probe = JSON.parse(execFileSync(path.join(bin, 'ffprobe.exe'), ['-v', 'error', '-count_frames', '-show_entries', 'stream=codec_type,codec_name,nb_read_frames,width,height,color_space,color_range,color_transfer,color_primaries:format=duration', '-of', 'json', file], { encoding: 'utf8' }))
      const video = probe.streams.find((stream) => stream.codec_type === 'video')
      if (Number(video.nb_read_frames) !== expected || probe.streams.some((stream) => stream.codec_type === 'audio')) throw new Error(variant + ': frame count or audio mismatch')
      if (video.color_range !== 'tv' || video.color_space !== 'bt709' || video.color_transfer !== 'bt709' || video.color_primaries !== 'bt709') throw new Error(variant + ': SDR BT.709 browser delivery is required')
      formats[extension] = { bytes: fs.statSync(file).size, codec: video.codec_name, frames: Number(video.nb_read_frames), duration: Number(probe.format.duration), audio: false }
    }
    execFileSync(path.join(bin, 'ffmpeg.exe'), ['-hide_banner', '-loglevel', 'error', '-y', '-i', prefix + '.webm', '-an', '-vf', 'scale=160:90', '-start_number', '0', path.join(directory, '%04d.png')])
    const buffers = []
    for (let n = 0; n < expected; n++) buffers.push(await sharp(path.join(directory, String(n).padStart(4, '0') + '.png')).removeAlpha().raw().toBuffer())
    const diff = (a, b) => { let total = 0; for (let i = 0; i < a.length; i++) total += Math.abs(a[i] - b[i]); return total / a.length }
    const detectedCuts = []
    const unexpectedCuts = []
    for (let n = 1; n < buffers.length; n++) {
      const delta = diff(buffers[n - 1], buffers[n])
      if (delta > 18) {
        detectedCuts.push({ frame: n, seconds: n / edl.fps, delta: +delta.toFixed(2) })
        if (!expectedCuts.includes(n) && n < expected - edl.loopDissolveFrames) unexpectedCuts.push(n)
      }
    }
    if (unexpectedCuts.length) throw new Error(variant + ': unexpected native-frame cuts ' + unexpectedCuts.join(','))
    const seam = diff(buffers[0], buffers.at(-1))
    if (seam > 2) throw new Error(variant + ': loop seam is not matched')
    const selected = Array.from({ length: Math.ceil(expected / 12) }, (_, i) => Math.min(i * 12, expected - 1))
    selected.push(expected - 1)
    const columns = 4, w = 320, h = 202
    const composites = []
    for (let i = 0; i < selected.length; i++) {
      const frame = selected[i]
      const image = await sharp(path.join(root, 'artifacts/hero-final-polish-render/' + variant, String(frame).padStart(4, '0') + '.jpg')).resize(w, 180).toBuffer()
      const label = Buffer.from('<svg width="320" height="22"><rect width="320" height="22" fill="#071722"/><text x="8" y="16" fill="white" font-family="sans-serif" font-size="13">' + variant + ' | ' + (frame / 24).toFixed(2) + 's | frame ' + frame + '</text></svg>')
      composites.push({ input: image, left: i % columns * w, top: Math.floor(i / columns) * h })
      composites.push({ input: label, left: i % columns * w, top: Math.floor(i / columns) * h + 180 })
    }
    await sharp({ create: { width: columns * w, height: Math.ceil(selected.length / columns) * h, channels: 3, background: '#071722' } }).composite(composites).jpeg({ quality: 90 }).toFile(path.join(directory, 'contact-sheet.jpg'))
    report[variant] = { formats, expectedCuts, detectedCuts, unexpectedCuts, loopSeamMeanDifference: +seam.toFixed(3) }
  }
  fs.writeFileSync(path.join(root, 'artifacts/hero-final-polish-qa/frame-audit.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
}
main().catch((error) => { console.error(error.message); process.exitCode = 1 })
