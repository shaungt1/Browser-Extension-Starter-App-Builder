# Agent start

## Mission

Generate a browser-extension starter into a separate target, then perform all application work from that target. WXT is the default unless the user selects Plasmo or a project constraint supports another choice.

## Required sequence

1. Read `README.md`, `docs/FRAMEWORK_DECISION.md`, and the selected framework guide.
2. Run `bash start.sh doctor` only if the host tool state matters.
3. Preview with `bash start.sh new ... --dry-run` when the target or selections need confirmation.
4. Generate with `bash start.sh new --framework ... --target ...`.
5. Change into the printed target path. Confirm `.browser-extension-target.json` exists.
6. Run the target's `bash start.sh setup` and `bash start.sh verify` only when dependency installation/verification is in scope.
7. Never start a long-running development watcher unless explicitly requested.
8. Report local proof separately from browser, live API, store credential, signing, and release gates.

## Safety

- The target must be outside this builder and new, empty, or a fresh repository containing only Git/README/license/ignore metadata.
- Never delete files to make a target acceptable.
- Never pass secrets through generator arguments or commit `.env`.
- Never publish or submit an extension without explicit authorization.
- Do not edit generated build output.
