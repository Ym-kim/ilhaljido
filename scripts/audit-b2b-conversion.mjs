import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (file) => readFileSync(join(root, file), 'utf8')
const page = read('src/app/business/page.tsx')
const api = read('src/app/api/applications/route.ts')

const purposeOptions = [
  'team_offsite',
  'founder_retreat',
  'small_business',
  'subsidy_match',
  'custom',
]

function extractCalls(source, token) {
  const calls = []
  let cursor = 0
  while ((cursor = source.indexOf(token, cursor)) >= 0) {
    const start = source.indexOf('(', cursor + token.length)
    let depth = 0
    let quote = null
    let escaped = false
    for (let index = start; index < source.length; index += 1) {
      const char = source[index]
      if (quote) {
        if (escaped) escaped = false
        else if (char === '\\') escaped = true
        else if (char === quote) quote = null
        continue
      }
      if (char === "'" || char === '"' || char === '`') {
        quote = char
        continue
      }
      if (char === '(') depth += 1
      if (char === ')') depth -= 1
      if (depth === 0) {
        calls.push(source.slice(start, index + 1))
        cursor = index + 1
        break
      }
    }
  }
  return calls
}

const trackingCalls = extractCalls(page, 'trackEvent')
const sensitiveFormValue = /form\.(name|phone|email|company|location|size|region|when|message)/

const checks = [
  ['five structured inquiry purposes', purposeOptions.every((purpose) => page.includes(`v: '${purpose}'`))],
  ['purpose copy localized in KO/EN/JP', /f_purpose_legend:[\s\S]{0,220}KO:[\s\S]{0,220}EN:[\s\S]{0,220}JP:/.test(page)],
  ['purpose is included in the admin brief', page.includes('`문의 목적: ${purposeLabel}`')],
  ['purpose choice is keyboard-accessible', page.includes('type="button"') && page.includes('aria-pressed={selected}')],
  ['core contact fields retain backend requirements', ['business-name', 'business-company', 'business-email', 'business-phone'].every((id) => page.includes(`id="${id}"`))],
  ['mobile autocomplete hints', ['autoComplete="name"', 'autoComplete="organization"', 'autoComplete="email"', 'autoComplete="tel"'].every((hint) => page.includes(hint))],
  ['mobile inputs cannot force overflow', page.includes("'min-w-0 w-full bg-white")],
  ['optional details use progressive disclosure', page.includes('<details') && page.includes("f_optional_summary") && page.includes('onToggle=')],
  ['privacy consent is preserved', page.includes('<ConsentCheckbox checked={consent}')],
  ['existing applications API is reused', page.includes("fetch('/api/applications'") && page.includes("job_type: '기업 워케이션 문의'")],
  ['server validation remains in place', api.includes("const required = ['name', 'phone', 'email', 'job_type']")],
  ['rate-limit feedback is explicit', page.includes("res.status === 429") && page.includes("t('f_rate_limit')")],
  ['form status is announced accessibly', page.includes('role="alert"') && page.includes('aria-live="assertive"') && page.includes('aria-busy={sending}')],
  ['B2B intent event', page.includes("trackEvent('business_intent_select'")],
  ['B2B attempt event', page.includes("trackEvent('business_inquiry_attempt'")],
  ['B2B submit event', page.includes("trackEvent('business_inquiry_submit'")],
  ['B2B error event', page.includes("trackEvent('business_inquiry_error'")],
  ['B2B optional-details event', page.includes("trackEvent('business_optional_details_open'")],
  ['B2B success Kakao event', page.includes("trackEvent('business_kakao_click'")],
  ['analytics payloads do not include personal form values', trackingCalls.every((call) => !sensitiveFormValue.test(call))],
]

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name)
if (failures.length > 0) {
  console.error('[b2b-conversion] FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`[b2b-conversion] PASS — ${checks.length} intent, friction, accessibility, backend and analytics checks.`)
