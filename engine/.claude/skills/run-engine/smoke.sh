#!/usr/bin/env bash
# run-engine smoke harness — drive the Curiosity Engine pipeline end-to-end
# without network or an API key. This is the primary agent path: most changes
# here touch the scoring/feature/billing internals (score.mjs, features.mjs,
# cluster.mjs, billing.mjs), and the demo pipeline + unit tests exercise
# exactly that layer deterministically off engine/demo-data.json.
#
# Usage: bash engine/.claude/skills/run-engine/smoke.sh
# Exit 0 iff every stage succeeds. Runs from anywhere (resolves the engine
# root from its own location).
set -uo pipefail

ENGINE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ENGINE" || exit 1
fail=0
step() { echo; echo "=== $1 ==="; }
ok() { echo "  ✓ $1"; }
bad() { echo "  ✗ $1"; fail=1; }

# node:sqlite is experimental → prints a warning to stderr on every run; it is
# noise, not an error. Silence it so real errors stand out.
export NODE_OPTIONS="--no-warnings"

step "1. Demo pipeline (fikstür, ağsız)"
if node run.mjs --demo >/tmp/engine-run.txt 2>&1; then
  ok "run.mjs --demo geçti"
  grep -q "panel verisi: engine/data/board.json" /tmp/engine-run.txt && ok "board.json üretildi" || bad "board.json satırı yok"
  [ -f data/board.json ] && ok "data/board.json diskte" || bad "data/board.json yok"
else
  bad "run.mjs --demo çıkış kodu $?"; cat /tmp/engine-run.txt
fi

step "2. Son tabloyu yazdır"
node run.mjs --board 2>/dev/null | grep -q "KARAR" && ok "--board tabloyu bastı" || bad "--board başlık yok"

step "3. Yazı zinciri kuru çalıştırma (API çağırmaz)"
node write.mjs --next --dry 2>/dev/null | grep -q "KURU ÇALIŞTIRMA" && ok "write.mjs --next --dry zinciri anlattı" || bad "--dry beklenen çıktı yok"

step "4. Birim testleri"
if node --test ./*.test.mjs >/tmp/engine-test.txt 2>&1; then
  ok "$(grep -m1 '# pass' /tmp/engine-test.txt | tr -d '#') "
else
  bad "testler kırmızı"; tail -20 /tmp/engine-test.txt
fi

echo
if [ "$fail" -eq 0 ]; then echo "SMOKE: PASS"; else echo "SMOKE: FAIL"; fi
exit $fail
