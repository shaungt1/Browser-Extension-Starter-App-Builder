import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import readline from 'node:readline/promises'

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(SCRIPT_DIR, '..')
const FRAMEWORKS = new Set(['wxt', 'plasmo'])
const PACKAGE_MANAGERS = new Set(['npm', 'pnpm', 'yarn', 'bun'])
const PROFILES = new Set(['standard', 'minimal'])
const SAFE_EXISTING = new Set(['.git', '.github', '.gitignore', '.gitattributes', 'README.md', 'LICENSE', 'LICENSE.md'])

function usage() {
  console.log(`Usage: node scripts/new-extension.mjs --framework wxt|plasmo --target PATH [options]

Options:
  --name NAME                 Extension display name (defaults to target folder)
  --package-manager NAME      npm, pnpm, yarn, or bun (default: npm)
  --profile NAME              standard or minimal (default: standard)
  --dry-run                   Validate and print the generation plan
  -h, --help                  Show help

Generation copies a self-contained starter into a separate target. It never installs
dependencies or starts a browser. Run \"bash start.sh setup\" from the target afterward.`)
}

function parseArgs(argv) {
  const options = { packageManager: 'npm', profile: 'standard', dryRun: false }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--dry-run') options.dryRun = true
    else if (arg === '--help' || arg === '-h') options.help = true
    else if (arg === '--install') throw new Error('`--install` is intentionally unavailable. Generate first, cd into the target, then run `bash start.sh setup`.')
    else if (arg === '--framework') options.framework = argv[++index]
    else if (arg === '--target') options.target = argv[++index]
    else if (arg === '--name') options.name = argv[++index]
    else if (arg === '--package-manager') options.packageManager = argv[++index]
    else if (arg === '--profile') options.profile = argv[++index]
    else throw new Error(`unknown option: ${arg}`)
  }
  return options
}

function slugify(value) {
  const slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (!slug) throw new Error('name must contain at least one letter or number')
  return slug
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

async function validateTarget(target) {
  if (isInside(ROOT, target)) throw new Error('target must be outside the builder repository')
  try {
    const targetStat = await stat(target)
    if (!targetStat.isDirectory()) throw new Error('target exists and is not a directory')
    const entries = await readdir(target)
    const unsafe = entries.filter((entry) => !SAFE_EXISTING.has(entry))
    if (unsafe.length) {
      throw new Error(`target contains project files (${unsafe.join(', ')}). Choose a new or fresh target; nothing will be deleted.`)
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

async function listFiles(directory, prefix = '') {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name)
    if (entry.isDirectory()) files.push(...await listFiles(path.join(directory, entry.name), relative))
    else files.push(relative)
  }
  return files
}

function render(content, values) {
  return content.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => key in values ? values[key] : match)
}

async function copyTemplate(source, target, values, written) {
  for (const relative of await listFiles(source)) {
    const parts = relative.split(path.sep)
    if (parts[0] === 'standard' && values.PROFILE !== 'standard') continue
    const normalized = parts[0] === 'standard' ? parts.slice(1).join(path.sep) : relative
    const destination = path.join(target, normalized)
    if (written.has(destination)) throw new Error(`template collision: ${normalized}`)
    await mkdir(path.dirname(destination), { recursive: true })
    const buffer = await readFile(path.join(source, relative))
    const isText = !buffer.includes(0)
    const content = isText ? render(buffer.toString('utf8'), values) : buffer
    try {
      await writeFile(destination, content, { flag: 'wx' })
    } catch (error) {
      if (error.code !== 'EEXIST' || path.dirname(normalized) !== '.') throw error
      if (normalized === '.gitignore' || normalized === '.gitattributes') {
        const existing = await readFile(destination, 'utf8')
        const currentLines = new Set(existing.split(/\r?\n/))
        const missing = String(content).split(/\r?\n/).filter((line) => line && !currentLines.has(line))
        if (missing.length) await writeFile(destination, `${existing.replace(/\s*$/, '')}\n${missing.join('\n')}\n`)
      } else if (!SAFE_EXISTING.has(normalized)) {
        throw error
      }
    }
    written.add(destination)
  }
}

async function promptForMissing(options) {
  if (options.framework && options.target) return
  if (!process.stdin.isTTY) throw new Error('--framework and --target are required in non-interactive mode')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  try {
    options.framework ||= (await rl.question('Framework (wxt/plasmo) [wxt]: ')).trim() || 'wxt'
    options.target ||= (await rl.question('Target directory: ')).trim()
    options.name ||= (await rl.question('Extension name (optional): ')).trim() || undefined
  } finally {
    rl.close()
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) return usage()
  await promptForMissing(options)
  if (!FRAMEWORKS.has(options.framework)) throw new Error(`framework must be one of: ${[...FRAMEWORKS].join(', ')}`)
  if (!PACKAGE_MANAGERS.has(options.packageManager)) throw new Error(`package manager must be one of: ${[...PACKAGE_MANAGERS].join(', ')}`)
  if (!PROFILES.has(options.profile)) throw new Error(`profile must be one of: ${[...PROFILES].join(', ')}`)
  if (!options.target) throw new Error('--target is required')

  const target = path.resolve(process.cwd(), options.target)
  await validateTarget(target)
  const name = options.name || path.basename(target)
  const slug = slugify(name)
  const values = {
    FRAMEWORK: options.framework,
    FRAMEWORK_NAME: options.framework === 'wxt' ? 'WXT' : 'Plasmo',
    NAME: name,
    PACKAGE_NAME: slug,
    PACKAGE_MANAGER: options.packageManager,
    PROFILE: options.profile,
    CORE_DIR: options.framework === 'wxt' ? 'src/core' : 'core',
    ENTRYPOINTS_DIR: options.framework === 'wxt' ? 'src/entrypoints' : 'project root and contents/'
  }

  console.log(`Framework: ${values.FRAMEWORK_NAME}`)
  console.log(`Target:    ${target}`)
  console.log(`Name:      ${name}`)
  console.log(`Profile:   ${options.profile}`)
  console.log(`Packages:  ${options.packageManager}`)
  if (options.dryRun) return console.log('Dry run complete; no files were written.')

  await mkdir(target, { recursive: true })
  const written = new Set()
  await copyTemplate(path.join(ROOT, '_shared', 'template'), target, values, written)
  await copyTemplate(path.join(ROOT, `_${options.framework}`, 'template'), target, values, written)
  console.log(`\nGenerated ${written.size} files.`)
  console.log(`Next:\n  cd "${target}"\n  bash start.sh setup\n  bash start.sh verify`)
}

main().catch((error) => {
  console.error(`error: ${error.message}`)
  process.exitCode = 2
})
