---
name: browser-extension-generate
description: Select WXT or Plasmo and safely generate a browser-extension project into a separate target.
---

# Generate a browser extension

1. Read `AGENT_START.md` and `docs/FRAMEWORK_DECISION.md`.
2. Default to WXT. Use Plasmo only when selected or justified by existing Plasmo/React ecosystem constraints.
3. Run `bash start.sh new --framework <choice> --target <separate-path> --dry-run`.
4. Confirm the target is outside the builder and contains no project work.
5. Run the same command without `--dry-run`.
6. Change into the target and confirm `.browser-extension-target.json`.
7. If installation is authorized, run `bash start.sh setup`, then `bash start.sh verify`.
8. Do not start `dev` or publish unless explicitly requested.
9. Report the generated path, framework/profile, verification evidence, and remaining external gates.
