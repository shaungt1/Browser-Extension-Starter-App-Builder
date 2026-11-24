# Plasmo tools and testing

- Unit testing: Vitest, configured by this starter; Plasmo does not provide WXT's equivalent first-party Vitest environment plugin.
- Browser E2E: Playwright loading `build/chrome-mv3-prod`.
- Storage: `@plasmohq/storage` with local/sync areas, watchers, React hooks, and optional secure-at-rest helpers.
- Messaging: the starter uses typed native runtime messages. `@plasmohq/messaging` is documented but omitted until its pinned vulnerable runtime dependency is resolved; relays and ports also carry alpha caveats in current docs.
- Styling: stable Tailwind 3 PostCSS path for Plasmo/Parcel plus a local shadcn-style component pattern.
- Packaging: `plasmo package` for selected targets.
- Publishing: Browser Platform Publisher (BPP) automates store uploads through CI.
- Beta distribution: Itero TestBed is Plasmo's distinct hosted testing/distribution product.

The normal generated-target gate is `bash start.sh verify`. Install Playwright Chromium separately for E2E.

Plasmo's current compiler tree carries upstream audit debt in development-only Parcel packages. This is a concrete reason WXT remains the default. Do not hide or auto-force-fix those findings; re-evaluate them whenever Plasmo releases or the toolchain changes.
