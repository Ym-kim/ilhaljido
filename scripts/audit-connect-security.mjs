import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'
import * as partnerHelpers from '../src/lib/connect/securityPartners.ts'
import { connectSecurityPartner, businessSecurityPartner, isSecurityPartnerReady, securityEventProperties, securityPartnerHref } from '../src/lib/connect/securityPartners.ts'
import { SECURITY_GUIDE_COPY, SECURITY_GUIDE_LANGUAGES } from '../src/lib/connect/securityGuide.ts'
import { localizeHref } from '../src/lib/i18n/localePath.ts'

const context = { placement: 'esim_connect', locale: 'en', audience_type: 'individual' }
for (const partner of [connectSecurityPartner, businessSecurityPartner]) {
  assert.equal(partner.enabled, false)
  for (const key of ['partnerId', 'title', 'description', 'url', 'offerText', 'disclosure']) assert.equal(partner[key], null)
  assert.equal(isSecurityPartnerReady(partner), false)
  assert.equal(securityPartnerHref(partner, context, () => { throw Error('Inactive adapter must not run') }), null)
}
const fixture = { enabled: true, audience: 'individual', partnerId: 'qa-partner', title: 'QA', description: 'QA only', url: 'https://example.com/approved?cid=unchanged', disclosure: 'QA disclosure', offerText: null }
assert.equal(securityPartnerHref(fixture, context), fixture.url)
assert.equal(securityPartnerHref(fixture, context, (url, props) => `${url}&placement=${props.placement}`), `${fixture.url}&placement=esim_connect`)
for (const url of ['http://example.com', 'javascript:alert(1)', 'https://user:pass@example.com']) assert.equal(isSecurityPartnerReady({ ...fixture, url }), false)
assert.equal(isSecurityPartnerReady({ ...fixture, disclosure: '' }), false)
assert.equal(securityPartnerHref(fixture, { ...context, audience_type: 'business' }), null)
assert.equal(securityPartnerHref(fixture, context, () => 'https://other.example/path'), null)
assert.equal(securityPartnerHref(fixture, context, () => { throw Error('QA') }), null)
assert.equal(securityEventProperties({ ...context, placement: 'constructor' }), null)
assert.equal(securityEventProperties({ ...context, locale: 'bad@example.com' }), null)
const props = securityEventProperties({ ...context, email: 'not-collected@example.com', destination: 'free text', query: '?token=not-collected' })
assert.deepEqual(Object.keys(props).sort(), ['audience_type', 'locale', 'page', 'partner', 'placement', 'source_page'])
assert.equal(props.source_page, '/en/select/esim')
assert.equal(securityEventProperties({ placement: 'business_readiness', locale: 'ja', audience_type: 'business' }).source_page, '/business')
for (const lang of ['KO', 'EN', 'JP']) {
  assert.equal(SECURITY_GUIDE_COPY[lang].steps.length, 7)
  assert.equal(SECURITY_GUIDE_COPY[lang].businessItems.length, 5)
  const locale = lang === 'JP' ? 'ja' : lang === 'EN' ? 'en' : 'ko'
  assert.equal(`https://www.wakation.kr${localizeHref('/select/esim/work-safely', lang)}`, SECURITY_GUIDE_LANGUAGES[locale])
}
const content = readFileSync('src/lib/connect/securityGuide.ts', 'utf8')
assert.equal(/nordvpn|nordlayer|추천 VPN 보기|100% safe/i.test(content), false)
const tracking = readFileSync('src/lib/connect/securityTracking.ts', 'utf8')
assert.ok(tracking.includes('isSecurityPartnerReady(config)'))
assert.ok(tracking.includes("from '@/lib/track'"))
// Execute the real tracking helper with a local recorder; never send QA events.
const events = []
const module = { exports: {} }
runInNewContext(ts.transpileModule(tracking, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
  exports: module.exports,
  require: (name) => {
    if (name === '@/lib/track') return { trackEvent: (event, payload) => events.push({ event, payload }) }
    if (name === './securityPartners') return partnerHelpers
    throw Error(`Unexpected import: ${name}`)
  },
})
const helpers = module.exports
for (const partner of [connectSecurityPartner, businessSecurityPartner]) {
  for (const event of ['security_partner_view', 'security_partner_click']) {
    helpers.trackSecurityPartner(event, partner, { ...context, audience_type: partner.audience })
  }
}
helpers.trackBusinessSecurityInterest(context)
helpers.trackBusinessSecurityInterest({ ...context, placement: 'business_readiness' })
helpers.trackBusinessSecurityInterest({ placement: 'business_readiness', audience_type: 'business', locale: 'invalid' })
assert.equal(events.length, 0)
for (const locale of ['ko', 'en', 'ja']) {
  helpers.trackBusinessSecurityInterest({ placement: 'business_readiness', audience_type: 'business', locale, email: 'not-collected@example.com' })
  assert.deepEqual(events.at(-1), { event: 'business_security_interest', payload: securityEventProperties({ placement: 'business_readiness', audience_type: 'business', locale }) })
}
assert.equal(events.length, 3)
const card = readFileSync('src/components/connect/ConnectSecurityCard.tsx', 'utf8')
assert.ok(card.includes('if (business) trackBusinessSecurityInterest(context)'))
for (const [lang, phrase] of [['KO', '출국 전에 eSIM'], ['EN', 'Before departure'], ['JP', '出発前にeSIM']]) assert.ok(SECURITY_GUIDE_COPY[lang].dataBody.includes(phrase))
for (const route of ['src/app/select/esim/work-safely/page.tsx', 'src/app/en/select/esim/work-safely/page.tsx', 'src/app/ja/select/esim/work-safely/page.tsx']) assert.ok(readFileSync(route, 'utf8').includes('workSafelyMetadata'))
console.log('PASS: disabled configs/events, fail-closed partner links, bounded Business interest events, departure preparation and KO/EN/JA routes')
