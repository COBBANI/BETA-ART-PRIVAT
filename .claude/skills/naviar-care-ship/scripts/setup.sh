#!/usr/bin/env bash
# Taze vite projesi kurar ve repodaki naviar-care kaynaklarını üstüne bindirir.
# Vite iskeleti repoda tutulmaz (node_modules/kilit dosyası kiri); tek kaynak
# repo dosyalarıdır, proje her derlemede buradan yeniden doğar.
set -euo pipefail

DEST="${1:?bruk: setup.sh <hedef-dizin (yoksa oluşturulur)>}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
SRC="$REPO/naviar-care"

INIT="$(find /root/.claude/skills -path '*web-artifacts-builder/scripts/init-artifact.sh' 2>/dev/null | head -1)"
[ -n "$INIT" ] || { echo "HATA: web-artifacts-builder/init-artifact.sh bulunamadı"; exit 1; }

PARENT="$(dirname "$DEST")"; NAME="$(basename "$DEST")"
mkdir -p "$PARENT"
if [ ! -f "$DEST/package.json" ]; then
  (cd "$PARENT" && bash "$INIT" "$NAME")
fi

cp "$SRC/src/"*.tsx "$SRC/src/"*.ts "$SRC/src/"*.css "$DEST/src/" 2>/dev/null || cp "$SRC/src/App.tsx" "$SRC/src/index.css" "$SRC/src/main.tsx" "$DEST/src/"
cp "$SRC/index.dev.html" "$DEST/index.html"
cp "$SRC/tailwind.config.js" "$DEST/tailwind.config.js"

echo "OK: $DEST hazır (kaynak: $SRC)"
