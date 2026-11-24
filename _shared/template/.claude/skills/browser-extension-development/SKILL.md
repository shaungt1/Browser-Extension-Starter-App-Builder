---
name: browser-extension-development
description: Implement and verify features in this generated {{FRAMEWORK_NAME}} browser extension.
---

# Browser extension development

1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/SECURITY.md`.
2. Identify every affected execution context: background, content script, popup, options, side panel, and server.
3. Define serializable contracts in `{{CORE_DIR}}` before wiring contexts together.
4. Add the narrowest permissions possible and explain each new permission.
5. Keep secrets and privileged AI calls on the server.
6. Add unit tests for pure logic and E2E coverage for cross-context behavior.
7. Run `bash start.sh verify`. Do not start development watchers unless explicitly requested.
8. Report local proof separately from remaining browser/store/live-service gates.
