# WXT guide

WXT is this builder's default because it combines TypeScript, Vite, manifest generation, multi-browser builds, packaging, Vitest integration, and active framework tooling without locking the UI to React.

## Key locations

- `wxt.config.ts`: manifest, WXT modules, browser-specific configuration, and Vite plugins.
- `src/entrypoints/`: background, content, popup, options, side-panel, and other discoverable entry points.
- `src/core/`: cross-context contracts and shared logic.
- `.output/`: generated browser bundles and ZIP archives; never edit them.

## Official capabilities

- Storage is built into WXT. Add the `storage` permission before use.
- Messaging uses `@webext-core/messaging`; WXT also supports webext-bridge, tRPC, and Comctx.
- React is enabled through `@wxt-dev/module-react`; WXT also has official Vue, Svelte, and Solid modules.
- Vitest uses `WxtVitest()` for aliases, auto-imports, environment flags, and an in-memory browser API.
- `wxt zip` packages store archives. `wxt submit` can automate Chrome, Firefox, and Edge submission after first-time store setup.

Official docs: <https://wxt.dev/guide/installation>, <https://wxt.dev/guide/essentials/unit-testing>, <https://wxt.dev/guide/essentials/messaging>, <https://wxt.dev/guide/essentials/config/manifest>.
