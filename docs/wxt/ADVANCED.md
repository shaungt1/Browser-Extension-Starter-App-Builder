# WXT advanced direction

## WebSockets

Run active-session sockets from the background service worker. Chrome 116+ keeps it active when messages occur within each 30-second window; the starter uses a 20-second heartbeat. A WebSocket cannot wake a suspended extension, so use Web Push for true server-initiated wakeups.

## AI and APIs

Treat the extension as an untrusted public client. Send user-scoped requests to your backend and keep provider keys there. Use typed background messages to centralize auth, retries, and CORS-sensitive calls.

## Rust/WASM

Use a separate Rust crate and package compiled artifacts locally. WXT's Vite layer can integrate a build plugin or explicit prebuild script. Validate the emitted extension CSP instead of adding `wasm-unsafe-eval` by assumption.

## Multi-application products

Share schemas and generated clients through a versioned package or monorepo workspace. Connect web/mobile/extension products through server APIs; WXT does not make them a single runtime.
