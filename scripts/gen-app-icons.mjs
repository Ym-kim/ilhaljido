// 앱 아이콘 생성기 — src/app/icon.svg(브랜드 마크 원본)를 파비콘·애플 아이콘으로 렌더
//
// 배경: favicon.ico·apple-icon.png가 2026-07 마크 리프레시 이전 버전으로 남아 있었음
// (모던 브라우저는 icon.svg를 우선하므로 영향은 적었으나, 구형 브라우저·북마크·
//  iOS 홈화면 추가에서는 구 마크가 노출됨).
//
// 브라우저 캔버스 → base64 수동 전사 방식은 데이터 손상 위험으로 금지(디자인 룰).
// sharp 절차적 렌더만 사용하며, 이 스크립트를 다시 실행하면 언제든 재현 가능.
//
// 실행: node scripts/gen-app-icons.mjs
//   (sharp 해석을 위해 반드시 프로젝트 루트에서 실행할 것)

import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'

const SVG = 'src/app/icon.svg'
const APPLE_ICON = 'src/app/apple-icon.png'
const FAVICON = 'src/app/favicon.ico'

// 벡터를 큰 밀도로 래스터화한 뒤 축소 — 작은 사이즈에서 스트로크가 뭉개지는 것 방지
const DENSITY = 1200

async function renderPng(size) {
  return sharp(readFileSync(SVG), { density: DENSITY })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** PNG 버퍼들을 ICO 컨테이너로 포장 (PNG-in-ICO — Vista 이후 전 브라우저 지원) */
function buildIco(entries) {
  const HEADER = 6
  const DIR_ENTRY = 16
  const header = Buffer.alloc(HEADER)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(entries.length, 4)

  let offset = HEADER + DIR_ENTRY * entries.length
  const dir = []
  for (const { size, data } of entries) {
    const e = Buffer.alloc(DIR_ENTRY)
    e.writeUInt8(size >= 256 ? 0 : size, 0) // 256은 0으로 표기하는 규약
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt8(0, 2) // 팔레트 색 수 (트루컬러=0)
    e.writeUInt8(0, 3) // reserved
    e.writeUInt16LE(1, 4) // color planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    dir.push(e)
    offset += data.length
  }

  return Buffer.concat([header, ...dir, ...entries.map((x) => x.data)])
}

const apple = await renderPng(180)
writeFileSync(APPLE_ICON, apple)

const icoSizes = [16, 32, 48]
const icoEntries = []
for (const size of icoSizes) {
  icoEntries.push({ size, data: await renderPng(size) })
}
writeFileSync(FAVICON, buildIco(icoEntries))

console.log(`${APPLE_ICON} 180x180 ${apple.length}B`)
console.log(`${FAVICON} ${icoSizes.join('/')} ${readFileSync(FAVICON).length}B`)
