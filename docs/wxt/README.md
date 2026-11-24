# WXT: primary generator

## Generate

```bash
bash start.sh new --framework wxt --target ../my-extension --name "My Extension"
cd ../my-extension
bash start.sh setup
bash start.sh verify
```

The generated target pins WXT, the official React module, React/TypeScript, Tailwind 4 through Vite, typed messaging, Vitest, and Playwright. The standard profile also includes API, server-side AI, and WebSocket service scaffolding.

## Development flow

1. Define serializable contracts in `src/core`.
2. Implement privileged browser/network work in `src/entrypoints/background.ts`.
3. Keep DOM access in content scripts and presentation in extension pages.
4. Add only required permissions in `wxt.config.ts`.
5. Run `bash start.sh verify` before interactive browser work.
6. Use `bash start.sh dev chrome` or `firefox` when a watcher is intentionally needed.

See the generated target's `docs/FRAMEWORK.md` and `docs/ADVANCED.md` for file-level guidance.
