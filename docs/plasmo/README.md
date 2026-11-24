# Plasmo: supported alternative

## Generate

```bash
bash start.sh new --framework plasmo --target ../my-extension --name "My Extension"
cd ../my-extension
bash start.sh setup
bash start.sh verify
```

The generated target pins Plasmo, React/TypeScript, Plasmo messaging/storage, Tailwind 3 through PostCSS/Parcel, Vitest, and Playwright. The standard profile includes the same framework-neutral service scaffolding as WXT.

## Development flow

1. Define shared types in `core/`.
2. Add typed native message handlers in `background.ts`. Re-evaluate `@plasmohq/messaging` before adopting its declarative handler folders.
3. Add page/content entry points at the project root using Plasmo conventions; reusable service helpers remain under `src/services/`.
4. Keep manifest overrides narrow in `package.json`.
5. Run `bash start.sh verify` before interactive development.

Firefox MV2 is used because Plasmo's official documentation still labels Firefox MV3 experimental.

## Dependency-security note

As of November 23, 2026, Plasmo 0.90.5 installs a legacy Parcel-based development tree with unresolved npm audit findings. The starter keeps the Plasmo compiler in `devDependencies` and does not install the currently vulnerable Plasmo messaging package or force incompatible Parcel upgrades. Run both `npm audit --omit=dev` and the full `npm audit` in generated Plasmo projects; treat new production findings as release blockers and review build-tool findings against their actual exposure.
