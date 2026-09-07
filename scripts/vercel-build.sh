#!/usr/bin/env bash
# Compatibility entry point; build only the checked-out repository.
set -euo pipefail
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/build-static.mjs"
