# Agent instructions

This is a generated {{FRAMEWORK_NAME}} browser extension project, not the builder repository.

1. Read `README.md`, `docs/ARCHITECTURE.md`, and `docs/SECURITY.md` before changing code.
2. Keep permissions and host permissions at the minimum required by the feature.
3. Never place provider secrets in extension code or public environment variables. Route privileged AI/API work through a server.
4. Put cross-context contracts in `{{CORE_DIR}}`; keep popup, content-script, options, side-panel, and background concerns separate.
5. Run `bash start.sh verify` after task-scoped changes. Run browser E2E tests when behavior crosses extension contexts.
6. Do not publish, submit to a store, or change signing credentials without explicit user authorization.
7. Never start a development watcher or browser unless the user asks; provide the exact `bash start.sh dev ...` command instead.

For the full workflow, read `.claude/skills/browser-extension-development/SKILL.md`.
