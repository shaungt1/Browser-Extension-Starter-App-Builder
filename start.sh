#!/usr/bin/env bash
# Browser Extension Starter App Builder - generator entry point.
set -Eeuo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'USAGE'
Usage: bash start.sh [command] [options]

Generate into a separate target
  new --framework wxt|plasmo --target PATH [options]
      --name NAME                 Extension display name
      --package-manager npm|pnpm|yarn|bun
      --profile standard|minimal  Generated feature set (default: standard)
      --dry-run                   Validate and show the plan without writing

Builder utilities
  doctor                          Read-only tool report
  frameworks                      Show supported framework choices
  help                            Show this help

After generation, change into the target and run `bash start.sh setup` there.
App setup, development, testing, builds, and packaging are blocked in this builder.
USAGE
}

refuse_lifecycle() {
  printf 'error: `%s` belongs in a generated extension, not in this builder.\n' "$1" >&2
  printf 'Generate with `bash start.sh new`, cd into the target, then run that target command.\n' >&2
  return 2
}

frameworks() {
  cat <<'TEXT'
WXT     Recommended default: strongest TypeScript/Vite workflow and cross-browser tooling.
Plasmo  React-first alternative: useful for existing Plasmo teams and its hosted ecosystem.
Other   Documentation only: see docs/other-frameworks/README.md.
TEXT
}

dispatch() {
  local command="${1:-help}"
  if (($#)); then shift; fi
  case "$command" in
    new) node "$ROOT/scripts/new-extension.mjs" "$@" ;;
    doctor) node "$ROOT/scripts/doctor.mjs" ;;
    frameworks) frameworks ;;
    setup | install | install-browser | verify | test | dev | run | build | package | zip | publish)
      refuse_lifecycle "$command"
      ;;
    help | -h | --help) usage ;;
    *) usage; printf '\nerror: unknown command: %s\n' "$command" >&2; return 2 ;;
  esac
}

if (($#)); then
  dispatch "$@"
  exit $?
fi

while true; do
  cat <<'MENU'

Browser Extension Starter App Builder
  1) Generate WXT extension (recommended)
  2) Generate Plasmo extension
  3) Check this machine
  4) Compare frameworks
  0) Exit
MENU
  read -r -p "Choose: " choice
  case "$choice" in
    1) dispatch new --framework wxt ;;
    2) dispatch new --framework plasmo ;;
    3) dispatch doctor ;;
    4) dispatch frameworks ;;
    0) exit 0 ;;
    *) echo "Unknown option: $choice" ;;
  esac || true
done
