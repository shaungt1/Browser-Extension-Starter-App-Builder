# Extension architecture

Browser extensions run in separate security and lifecycle contexts:

- The background service worker coordinates privileged browser operations and network services. It can be suspended between events.
- Content scripts see the host page DOM but run in an isolated JavaScript world by default.
- Popup, options, and side-panel pages are short-lived extension pages.
- `{{CORE_DIR}}` owns serializable messages, domain types, validation, and logic shared across those contexts.
- Privileged AI or business APIs belong behind your server. The extension receives only public configuration and user-scoped tokens.

## Recommended request path

`UI/content script -> typed extension message -> background -> HTTPS/WebSocket API -> background -> response/event -> UI`

Keep DOM values untrusted, validate all inbound messages, and request only the permissions needed by the current feature.

## WebSockets

The standard profile includes a transport helper with reconnect and a 20-second heartbeat. Chrome 116+ treats WebSocket traffic within each 30-second service-worker window as activity, but a socket cannot wake a suspended extension. Use Web Push when the server must wake an inactive installation.

## Rust and WebAssembly

Keep Rust in a separate crate and compile with `wasm-pack` or `wasm-bindgen`. Commit neither Rust build caches nor generated secrets. MV3 forbids remotely hosted executable code; ship the `.wasm` and JavaScript glue in the extension package. Add CSP capability only after the actual WASM loader requires it and verify every browser target.
