# Browser Extension Starter App Builder

This repository generates production-oriented WXT or Plasmo browser-extension projects. It is not an extension workspace. Dependencies, browser bundles, tests, source code, and build artifacts belong only in the separate generated target.

WXT is the recommended default. Plasmo is supported for React-first teams, existing Plasmo projects, and Plasmo-specific ecosystem needs.

## Manual quick start

From this builder:

```bash
bash start.sh doctor
bash start.sh new --framework wxt --target ../my-extension --name "My Extension"
```

Then change into the generated target:

```bash
cd ../my-extension
bash start.sh setup
bash start.sh verify
```

Use `--framework plasmo` for Plasmo. Run `bash start.sh` with no arguments for the guided menu.

## Agent quick start

1. Read [`AGENT_START.md`](AGENT_START.md) in full.
2. Generate into a separate target with `bash start.sh new`.
3. Change into the target before setup, verification, development, builds, or packaging.

> **Hard boundary:** Never install dependencies, start a watcher, build an extension, or create browser artifacts in this builder. Root commands are limited to `doctor`, `frameworks`, and `new`. The generator never deletes target contents and refuses occupied targets.

## What is generated

Both starters provide:

- TypeScript + React with a popup, content script, and background service worker.
- Tailwind CSS and a local shadcn-style component foundation.
- Typed messaging and browser storage helpers appropriate to the framework.
- Framework-neutral API, server-side AI, and resilient WebSocket service scaffolding in the standard profile.
- Vitest unit tests and Playwright extension E2E configuration.
- Chrome and Firefox development, build, verification, and packaging commands.
- Security, architecture, testing, publishing, and agent workflow documentation.

The generated starter does not embed secrets, assume an API vendor, publish to a store, or silently request broad browser permissions.

## Framework selection

| Choice | Best use | Important tradeoff |
| --- | --- | --- |
| [WXT](docs/wxt/README.md) | Default for new TypeScript extensions, Vite control, multi-browser builds, Vitest, and modular UI choices. | Uses WXT's entry-point and project conventions. |
| [Plasmo](docs/plasmo/README.md) | Existing Plasmo work, React-first teams, declarative messaging/storage, or Itero/BPP ecosystem needs. | Older Parcel/Tailwind integration path and weaker current default for greenfield work. |
| [Other frameworks](docs/other-frameworks/README.md) | Safari-first, Vue multi-platform, all-Rust, or build-your-own constraints. | Documentation only; not generated in this release. |

## Repository map

| Path | Purpose |
| --- | --- |
| `start.sh` | Safe root menu and command dispatcher. |
| `scripts/` | Read-only doctor and separate-target generator. |
| `_shared/template/` | Framework-neutral files copied into every generated target. |
| `_wxt/template/` | WXT-specific project template. |
| `_plasmo/template/` | Plasmo-specific project template. |
| `docs/wxt/` | WXT setup, tools, testing, advanced integrations, and resources. |
| `docs/plasmo/` | Plasmo setup, tools, testing, advanced integrations, and resources. |
| `docs/other-frameworks/` | Extension.js, CRXJS, Bedframe, Quasar BEX, Rust, and no-framework routes. |
| `.claude/skills/` | Repository-specific agent workflow. |
| `tests/` | Builder boundary and generation tests. |

See [`QUICKSTART.md`](QUICKSTART.md) for command options and [`docs/GAP_ANALYSIS.md`](docs/GAP_ANALYSIS.md) for delivered scope and external gates.
