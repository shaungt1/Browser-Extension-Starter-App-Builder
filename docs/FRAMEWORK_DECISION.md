# Framework decision

## Default: WXT

Use WXT for new work unless a concrete constraint says otherwise. It currently offers the cleanest combination of TypeScript, Vite configuration, React/Vue/Svelte/Solid modules, generated manifests, Chrome/Firefox builds, Vitest integration, packaging, and store submission tooling.

## Choose Plasmo when

- The project or team already uses Plasmo.
- React-first file conventions and Plasmo's declarative APIs reduce migration cost.
- Itero TestBed beta distribution or Plasmo BPP is a deciding workflow requirement.
- A known Plasmo example materially accelerates the specific integration.

Do not choose it merely because it feels like Next.js. For greenfield work, verify current maintenance, dependency compatibility, and Firefox target status first.

## Choose something else when

- Extension.js or Bedframe: Safari from one codebase is the dominant constraint.
- CRXJS: the team wants to own a custom Vite configuration and supply all extension helpers itself.
- Quasar BEX: the client already uses Vue/Quasar across web, mobile, desktop, and extension surfaces.
- oxichrome/all-Rust: experimental all-Rust research is the actual objective and ecosystem risk is acceptable.
- Plain TypeScript + Vite + web-ext: avoiding framework ownership outweighs the cost of building manifests, reload, messaging, and packaging.

Frameworks do not provide privileged AI APIs or mobile connectivity. Those are application/server architecture decisions. Browser permissions, storage, messaging, and service-worker constraints remain browser-platform concerns.
