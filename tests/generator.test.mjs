import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const targets = []
test.after(async () => Promise.all(targets.map((target) => rm(target, { recursive: true, force: true }))))

function generate(args) {
  return spawnSync(process.execPath, ['scripts/new-extension.mjs', ...args], { encoding: 'utf8' })
}

for (const framework of ['wxt', 'plasmo']) {
  test(`generates a self-contained ${framework} target`, async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), `extension-builder-${framework}-`))
    targets.push(parent)
    const target = path.join(parent, 'sample-extension')
    const result = generate(['--framework', framework, '--target', target, '--name', 'Sample Extension'])
    assert.equal(result.status, 0, result.stderr)
    assert.match(await readFile(path.join(target, 'README.md'), 'utf8'), new RegExp(framework, 'i'))
    assert.equal(JSON.parse(await readFile(path.join(target, '.browser-extension-target.json'), 'utf8')).framework, framework)
    assert.match(await readFile(path.join(target, 'package.json'), 'utf8'), /sample-extension/)
  })
}

test('dry run writes nothing', async () => {
  const parent = await mkdtemp(path.join(os.tmpdir(), 'extension-builder-dry-'))
  targets.push(parent)
  const target = path.join(parent, 'dry-target')
  const result = generate(['--framework', 'wxt', '--target', target, '--dry-run'])
  assert.equal(result.status, 0, result.stderr)
  const probe = spawnSync(process.execPath, ['-e', `process.exit(require('fs').existsSync(${JSON.stringify(target)}) ? 1 : 0)`])
  assert.equal(probe.status, 0)
})

test('occupied target is preserved and rejected', async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), 'extension-builder-occupied-'))
  targets.push(target)
  await writeFile(path.join(target, 'important.txt'), 'keep me')
  const result = generate(['--framework', 'wxt', '--target', target])
  assert.equal(result.status, 2)
  assert.match(result.stderr, /nothing will be deleted/)
  assert.equal(await readFile(path.join(target, 'important.txt'), 'utf8'), 'keep me')
})

test('builder repository cannot be a target', () => {
  const result = generate(['--framework', 'wxt', '--target', '.'])
  assert.equal(result.status, 2)
  assert.match(result.stderr, /outside the builder repository/)
})

test('minimal profile omits standard service scaffolding', async () => {
  const parent = await mkdtemp(path.join(os.tmpdir(), 'extension-builder-minimal-'))
  targets.push(parent)
  const target = path.join(parent, 'minimal-extension')
  const result = generate(['--framework', 'wxt', '--target', target, '--profile', 'minimal'])
  assert.equal(result.status, 0, result.stderr)
  const servicePath = path.join(target, 'src', 'services', 'api-client.ts')
  const probe = spawnSync(process.execPath, ['-e', `process.exit(require('fs').existsSync(${JSON.stringify(servicePath)}) ? 1 : 0)`])
  assert.equal(probe.status, 0)
})

test('fresh repository metadata is preserved', async () => {
  const target = await mkdtemp(path.join(os.tmpdir(), 'extension-builder-fresh-repo-'))
  targets.push(target)
  await writeFile(path.join(target, 'README.md'), '# Existing repository\n')
  await writeFile(path.join(target, '.gitignore'), 'private-notes/\n')
  const result = generate(['--framework', 'wxt', '--target', target])
  assert.equal(result.status, 0, result.stderr)
  assert.equal(await readFile(path.join(target, 'README.md'), 'utf8'), '# Existing repository\n')
  assert.match(await readFile(path.join(target, '.gitignore'), 'utf8'), /private-notes\/\nnode_modules\//)
})
