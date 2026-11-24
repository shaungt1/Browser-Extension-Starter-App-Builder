# Plasmo advanced integrations

## APIs and AI

Use `src/services/api-client.ts` from the background worker and send typed messages from extension UI. `PLASMO_PUBLIC_*` values are visible to users; provider secrets must remain on a server.

## WebSockets

Instantiate `ResilientWebSocket` in the background only when the feature is enabled. Plasmo messaging ports connect extension contexts; they are not a replacement for a server WebSocket, and Plasmo labels its ports API public alpha.

## Rust/WASM

Compile a separate crate and expose the packaged output as a local asset. Plasmo supports bundled assets and web-accessible resource declarations. Verify CSP, paths, and both browser targets; never load executable code remotely.

## Analytics

Plasmo has no required analytics layer. Choose a privacy-respecting provider only after defining consent and store disclosures. Manifest V3 remote-code restrictions still apply to analytics SDKs.
