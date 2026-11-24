# Repository agent rules

This is a generator, not a browser extension. Read `AGENT_START.md` before generation work.

- Keep setup/build/run/test dependencies out of this repository.
- Generate only into a separate target and never delete target contents.
- Root lifecycle commands must remain blocked.
- Preserve WXT as the default and Plasmo as the supported second choice.
- Use official framework/browser sources for version-sensitive changes.
- Add or update tests for generator behavior and safety boundaries.
- Do not start watchers or browsers during static verification.
- Do not publish without explicit user authorization.
