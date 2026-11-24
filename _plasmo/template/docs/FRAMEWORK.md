# Plasmo guide

Plasmo is the supported React-first alternative. Choose it for an existing Plasmo codebase/team, its declarative file conventions, Plasmo's storage/messaging packages, or the broader Plasmo testing and publishing ecosystem. For a new general-purpose extension, this builder still recommends WXT.

## Key locations

- `package.json`: application metadata, manifest overrides, scripts, and dependency versions.
- `background.ts`: typed background service worker.
- `contents/`: content scripts and content-script UIs.
- `popup.tsx`, `options.tsx`: extension page entry points.
- `src/services/`: framework-neutral standard-profile API and transport helpers.
- `build/`: generated bundles and archives; never edit it.

## Official capabilities

- `@plasmohq/storage` provides cross-context storage helpers and React hooks.
- Plasmo offers `@plasmohq/messaging` for declarative handlers, messages, relays, and experimental ports. This starter uses the native runtime API because the current messaging release pins a vulnerable `nanoid`; re-evaluate before installing it.
- Plasmo targets Chrome MV3 by default; Firefox MV2 is the stable Firefox target and Firefox MV3 remains experimental in Plasmo's documentation.
- Plasmo BPP provides automated store publishing; Itero TestBed is the distinct hosted beta-distribution option.

This starter intentionally uses Tailwind CSS 3 for Plasmo's established PostCSS/Parcel path. Upgrade the styling toolchain only after a generated-target build proves compatibility.

The local `parcel-resolver.cjs` is a narrow Windows compatibility fallback for Plasmo 0.90.5 generated relative imports. Remove it only after an upgraded Plasmo build passes Chrome and Firefox verification without it.

Official docs: <https://docs.plasmo.com/framework>, <https://docs.plasmo.com/framework/messaging>, <https://docs.plasmo.com/framework/storage>, <https://docs.plasmo.com/framework/workflows/faq>.
