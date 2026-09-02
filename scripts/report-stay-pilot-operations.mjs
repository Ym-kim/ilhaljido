import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const moduleUrl = pathToFileURL(join(root, 'src/lib/stays/pilotOperationsReport.ts')).href
const safetyEvidenceUrl = pathToFileURL(join(root, 'src/lib/stays/pilotSafetyEvidence.ts')).href
const {
  buildStayPilotOperationalReport,
  parseStayPilotBookingClickJsonLines,
  parseStayPilotOperationalJsonLines,
} = await import(moduleUrl)
const { parseStayPilotSafetyEvidence } = await import(safetyEvidenceUrl)

function argValue(name) {
  const prefix = `--${name}=`
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length)
}

function optionalInteger(name) {
  const value = argValue(name)
  if (value === undefined) return undefined
  if (!/^\d+$/.test(value)) throw new Error(`${name} must be a non-negative integer`)
  return Number(value)
}

async function loadSafetyEvidence(urlValue) {
  let url
  try {
    url = new URL(urlValue)
  } catch {
    throw new Error('safety-url must be a valid URL')
  }
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname))) {
    throw new Error('safety-url must use HTTPS, except for localhost')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetch(url, { headers: { accept: 'application/json' }, signal: controller.signal })
    if (!response.ok) return null
    return parseStayPilotSafetyEvidence(await response.json())
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

const since = argValue('since') ?? '24h'
if (!/^\d+[mhd]$/.test(since)) throw new Error('since must use a bounded relative duration such as 24h or 7d')
const limit = optionalInteger('limit') ?? 1_000
if (limit < 1 || limit > 1_000) throw new Error('limit must be between 1 and 1000')

const durationMatch = /^(\d+)([mhd])$/.exec(since)
const durationAmount = Number(durationMatch[1])
const observationDays = argValue('observation-days') === undefined
  ? durationMatch[2] === 'd'
    ? durationAmount
    : durationMatch[2] === 'h'
      ? durationAmount / 24
      : durationAmount / 1_440
  : Number(argValue('observation-days'))
if (!Number.isFinite(observationDays) || observationDays < 0 || observationDays > 365) {
  throw new Error('observation-days must be between 0 and 365')
}

const command = spawnSync('npx', [
  'vercel',
  'logs',
  '--environment', 'production',
  '--no-branch',
  '--since', since,
  '--limit', String(limit),
  '--query', 'stay-pilot',
  '--json',
], {
  cwd: root,
  encoding: 'utf8',
  // Windows resolves npm command shims through cmd.exe. Every variable argument
  // above is bounded before reaching this call; Unix remains shell-free.
  shell: process.platform === 'win32',
  maxBuffer: 12 * 1024 * 1024,
})

if (command.error) throw command.error
if (command.status !== 0) {
  const safeMessage = (command.stderr || command.stdout || 'Vercel log query failed')
    .split(/\r?\n/)
    .filter((line) => !/token|authorization|secret|api[_ -]?key/i.test(line))
    .slice(-4)
    .join('\n')
  throw new Error(safeMessage || 'Vercel log query failed')
}

const records = parseStayPilotOperationalJsonLines(command.stdout)
const bookingClickRecords = parseStayPilotBookingClickJsonLines(command.stdout)
const countedBookingClicks = {
  japan: bookingClickRecords.filter((record) => record.cohort === 'japan').length,
  korea: bookingClickRecords.filter((record) => record.cohort === 'korea').length,
}
const japanBookingClickOverride = optionalInteger('japan-booking-clicks')
const koreaBookingClickOverride = optionalInteger('korea-booking-clicks')
const affiliateSafetyOverride = optionalInteger('affiliate-safety-failures')
const brokenImagesOverride = optionalInteger('broken-images')
const safetyEvidence = affiliateSafetyOverride === undefined || brokenImagesOverride === undefined
  ? await loadSafetyEvidence(argValue('safety-url') ?? 'https://www.wakation.kr/api/health/stay-pilot')
  : null
const report = buildStayPilotOperationalReport(records, {
  observationDays,
  bookingClicks: {
    japan: japanBookingClickOverride ?? countedBookingClicks.japan,
    korea: koreaBookingClickOverride ?? countedBookingClicks.korea,
  },
  affiliateSafetyFailures: affiliateSafetyOverride ?? safetyEvidence?.affiliateSafetyFailures,
  brokenImages: brokenImagesOverride ?? safetyEvidence?.brokenImages,
})

console.log(JSON.stringify(report, null, 2))
