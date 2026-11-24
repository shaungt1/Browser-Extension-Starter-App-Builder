# Plasmo advanced direction

## WebSockets and APIs

The browser lifecycle rules are the same as WXT: active background sockets need traffic within the service-worker window and cannot provide guaranteed wakeups. Keep provider secrets on a backend and expose user-scoped APIs.

## Rust/WASM

Plasmo supports packaged assets and web-accessible resources. Compile Rust separately, copy the local output into the project, declare only required resources, and verify Chrome/Firefox CSP and loading paths.

## Web and mobile reuse

Plasmo's Next.js compatibility can help share React packages, schemas, and Tailwind/PostCSS configuration. It still does not turn browser, web, and mobile targets into one runtime; use shared packages and APIs deliberately.
