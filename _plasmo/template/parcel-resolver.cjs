const { existsSync, statSync } = require('fs')
const path = require('path')
const plasmoEntry = require.resolve('plasmo')
const parcelCoreEntry = require.resolve('@parcel/core', { paths: [path.dirname(plasmoEntry)] })
const parcelPluginEntry = require.resolve('@parcel/plugin', { paths: [path.dirname(parcelCoreEntry)] })
const { Resolver } = require(parcelPluginEntry)

const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json']

function firstFile(basePath) {
  for (const extension of extensions) {
    const candidate = `${basePath}${extension}`
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  for (const extension of extensions.slice(1)) {
    const candidate = path.join(basePath, `index${extension}`)
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
}

module.exports = new Resolver({
  async resolve({ specifier, dependency }) {
    if (!specifier.startsWith('.') || !dependency.resolveFrom) return null
    const resolved = firstFile(path.resolve(path.dirname(dependency.resolveFrom), specifier))
    return resolved ? { filePath: resolved } : null
  }
})
