import assert from 'node:assert/strict'

import { buildAgodaAuthorization } from '../src/lib/affiliate/agodaAuthCore.ts'

const siteId = '1968994'

assert.deepEqual(buildAgodaAuthorization(`  ${siteId}  `, '  raw-api-key  '), {
  ok: true,
  authorization: `${siteId}:raw-api-key`,
})

assert.deepEqual(buildAgodaAuthorization(siteId, `  ${siteId}:complete-api-key  `), {
  ok: true,
  authorization: `${siteId}:complete-api-key`,
})

assert.deepEqual(buildAgodaAuthorization(siteId, 'different-site:api-key'), {
  ok: false,
  reason: 'configuration_error',
})

assert.deepEqual(buildAgodaAuthorization(' ', 'raw-api-key'), {
  ok: false,
  reason: 'missing_site_id',
})

assert.deepEqual(buildAgodaAuthorization(siteId, ' '), {
  ok: false,
  reason: 'missing_key',
})

console.log('Agoda Authorization normalization audit passed.')
