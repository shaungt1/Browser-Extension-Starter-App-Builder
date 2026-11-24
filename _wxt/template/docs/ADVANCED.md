# WXT advanced integrations

## APIs and AI

Use `src/services/api-client.ts` from the background worker and send typed messages from UI/content scripts. Public endpoint URLs may use `WXT_PUBLIC_*`; provider secrets must remain on the server.

## WebSockets

Instantiate `ResilientWebSocket` in the background only when the user enables the feature. Handle auth renewal and server-side heartbeats. A WebSocket is for active two-way sessions, not guaranteed push wakeups.

## Rust/WASM

Build a separate Rust crate into a package-local directory, then import its JavaScript glue from an entry point. Add the build as an explicit script before WXT build. Verify MV3 CSP and Firefox behavior; do not enable `wasm-unsafe-eval` unless the chosen loader actually requires it.

## Analytics

Prefer privacy-preserving, opt-in telemetry. WXT offers `@wxt-dev/analytics`; install it only after choosing a provider, defining consent, retention, and a store disclosure.
