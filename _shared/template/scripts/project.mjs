import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const markerPath = path.join(ROOT, '.browser-extension-target.json')
let marker
try {
  marker = JSON.parse(readFileSync(markerPath, 'utf8'))
} catch {
  console.error('error: generated-target marker is missing or invalid')
  process.exit(2)
}

const packageManager = marker.packageManager

function usage() {
  console.log(`Usage: bash start.sh <command> [choice]

  setup                    Install project dependencies
  install-browser          Install Playwright Chromium for E2E tests
  verify                   Type-check, unit-test, and build Chrome + Firefox
  test unit|e2e            Run one test layer
  dev chrome|firefox       Start framework development mode (long-running)
  build chrome|firefox|all Build production extension bundle(s)
  package chrome|firefox|all  Create store archive(s)
  help                     Show this help`)
}

function run(command, args) {
  console.log(`> ${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function install() {
  const encodedIcon = path.join(ROOT, 'assets', 'icon.png.base64')
  const icon = path.join(ROOT, 'assets', 'icon.png')
  if (existsSync(encodedIcon) && !existsSync(icon)) {
    writeFileSync(icon, Buffer.from(readFileSync(encodedIcon, 'utf8').trim(), 'base64'))
  }
  const args = packageManager === 'yarn' || packageManager === 'bun' ? [] : ['install']
  run(packageManager, args)
}

function runScript(script, extra = []) {
  if (packageManager === 'npm') run('npm', ['run', script, ...(extra.length ? ['--', ...extra] : [])])
  else if (packageManager === 'pnpm') run('pnpm', [script, ...extra])
  else if (packageManager === 'yarn') run('yarn', [script, ...extra])
  else run('bun', ['run', script, ...extra])
}

function installBrowser() {
  if (packageManager === 'npm') run('npx', ['playwright', 'install', 'chromium'])
  else if (packageManager === 'pnpm') run('pnpm', ['exec', 'playwright', 'install', 'chromium'])
  else if (packageManager === 'yarn') run('yarn', ['exec', 'playwright', 'install', 'chromium'])
  else run('bunx', ['playwright', 'install', 'chromium'])
}

const [command = 'help', choice] = process.argv.slice(2)
switch (command) {
  case 'setup': install(); break
  case 'install-browser': installBrowser(); break
  case 'verify': runScript('verify'); break
  case 'test':
    if (choice === 'unit') runScript('test:unit')
    else if (choice === 'e2e') runScript('test:e2e')
    else throw new Error('test choice must be unit or e2e')
    break
  case 'dev':
    if (choice === 'chrome') runScript('dev')
    else if (choice === 'firefox') runScript('dev:firefox')
    else throw new Error('dev choice must be chrome or firefox')
    break
  case 'build':
  case 'package': {
    if (!['chrome', 'firefox', 'all'].includes(choice)) throw new Error(`${command} choice must be chrome, firefox, or all`)
    if (choice === 'chrome' || choice === 'all') runScript(command)
    if (choice === 'firefox' || choice === 'all') runScript(`${command}:firefox`)
    break
  }
  case 'help': case '-h': case '--help': usage(); break
  default: usage(); throw new Error(`unknown command: ${command}`)
}
