# {{NAME}}

Generated {{FRAMEWORK_NAME}} browser-extension starter using the `{{PROFILE}}` profile.

## Manual quick start

```bash
bash start.sh setup
bash start.sh verify
bash start.sh dev chrome
```

The first two commands install and statically verify the project. The last command starts the framework development process and opens or prepares a browser; run it only when you want a watcher.

To install Playwright's managed Chromium for E2E tests:

```bash
bash start.sh install-browser
```

## Agent quick start

Read `AGENTS.md`, then `.claude/skills/browser-extension-development/SKILL.md`. Do not start a watcher unless requested. Use `bash start.sh verify` for the normal non-listening quality gate.

## Commands

| Command | Purpose |
| --- | --- |
| `bash start.sh setup` | Install the pinned dependency set with {{PACKAGE_MANAGER}}. |
| `bash start.sh verify` | Type-check, unit-test, and build supported browser targets. |
| `bash start.sh test unit` | Run unit tests once. |
| `bash start.sh test e2e` | Run Playwright extension tests; managed Chromium must be installed. |
| `bash start.sh dev chrome` | Start Chrome development mode. |
| `bash start.sh dev firefox` | Start Firefox development mode. |
| `bash start.sh build all` | Build Chrome and Firefox production bundles. |
| `bash start.sh package all` | Create store-uploadable archives. |

## Project map

| Path | Purpose |
| --- | --- |
| `{{CORE_DIR}}/` | Framework-neutral contracts and shared logic. |
| `{{ENTRYPOINTS_DIR}}` | Framework entry points and extension contexts. |
| `src/services/` | Standard-profile API, AI, and resilient WebSocket clients. |
| `docs/` | Architecture, security, testing, publishing, and framework notes. |
| `tests/` | Unit and browser E2E tests. |
| `start.sh` | Project lifecycle entry point. |

See `docs/ARCHITECTURE.md` before adding permissions or moving logic between extension contexts.
