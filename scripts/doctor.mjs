import { spawnSync } from 'node:child_process'

const tools = [
  ['Node.js', 'node', ['--version'], true],
  ['npm', 'npm', ['--version'], true],
  ['pnpm', 'pnpm', ['--version'], false],
  ['Yarn', 'yarn', ['--version'], false],
  ['Bun', 'bun', ['--version'], false],
  ['Git', 'git', ['--version'], true],
  ['Bash', 'bash', ['--version'], true]
]

let missingRequired = false
for (const [label, command, args, required] of tools) {
  const result = spawnSync(command, args, { encoding: 'utf8', shell: process.platform === 'win32' })
  const firstLine = result.status === 0 ? result.stdout.trim().split(/\r?\n/, 1)[0] : 'not found'
  console.log(`${result.status === 0 ? 'ok' : required ? 'missing' : 'optional'}  ${label}: ${firstLine}`)
  if (required && result.status !== 0) missingRequired = true
}

console.log('\nChrome/Edge/Firefox are runtime choices; this report does not install or launch them.')
if (missingRequired) process.exitCode = 1
