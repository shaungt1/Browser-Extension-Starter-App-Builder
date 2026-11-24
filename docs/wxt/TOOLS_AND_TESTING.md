# WXT tools and testing

- Unit testing: Vitest with WXT's `WxtVitest()` plugin and in-memory fake browser APIs.
- Browser E2E: Playwright loading `.output/chrome-mv3` as an unpacked extension.
- Storage: WXT's built-in typed storage wrapper.
- Messaging: this starter uses `@webext-core/messaging`; WXT also documents webext-bridge, tRPC, proxy-service, and Comctx.
- UI: official WXT modules exist for React, Vue, Svelte, and Solid.
- Styling: Tailwind CSS 4 through WXT's Vite configuration; the starter contains a local shadcn-style component pattern.
- Packaging: `wxt zip` for Chrome and Firefox archives.
- Publishing: `wxt submit` supports Chrome Web Store, Firefox Add-ons, and Edge Add-ons after first-time listings and credentials exist.
- Analytics: `@wxt-dev/analytics` is optional; add only after consent, provider, and privacy decisions.
- Icons/i18n: optional official WXT modules exist; install only when the product needs them.

The normal generated-target gate is `bash start.sh verify`. E2E additionally needs `bash start.sh install-browser` once per machine.
