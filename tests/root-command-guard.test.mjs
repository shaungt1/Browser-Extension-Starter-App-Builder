import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const forbidden = ['setup', 'install', 'install-browser', 'verify', 'test', 'dev', 'run', 'build', 'package', 'publish']

for (const command of forbidden) {
  test(`builder refuses ${command}`, () => {
    const result = spawnSync('bash', ['start.sh', command], { encoding: 'utf8' })
    assert.equal(result.status, 2)
    assert.match(result.stderr, /belongs in a generated extension/)
  })
}

test('generator refuses generation-time install', () => {
  const result = spawnSync(process.execPath, ['scripts/new-extension.mjs', '--install'], { encoding: 'utf8' })
  assert.equal(result.status, 2)
  assert.match(result.stderr, /intentionally unavailable/)
})
