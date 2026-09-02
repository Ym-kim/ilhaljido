import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const moduleUrl = pathToFileURL(join(root, 'src/lib/stays/pilotOperationsReport.ts')).href
const { buildStayPilotOperationalReport, parseStayPilotOperationalJsonLines } = await import(moduleUrl)

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
  '--query', 'stay_search_execution',
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
const report = buildStayPilotOperationalReport(records, {
  observationDays,
  bookingClicks: {
    japan: optionalInteger('japan-booking-clicks'),
    korea: optionalInteger('korea-booking-clicks'),
  },
  affiliateSafetyFailures: optionalInteger('affiliate-safety-failures'),
  brokenImages: optionalInteger('broken-images'),
})

console.log(JSON.stringify(report, null, 2))
