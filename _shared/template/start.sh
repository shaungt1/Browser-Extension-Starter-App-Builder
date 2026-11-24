#!/usr/bin/env bash
# Generated extension lifecycle entry point.
set -Eeuo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
node "$ROOT/scripts/project.mjs" "$@"
