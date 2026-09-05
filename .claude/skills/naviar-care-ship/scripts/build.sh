#!/usr/bin/env bash
# Bundle üretir: font linklerini geçici söker (html-inline dış URL okuyamaz),
# web-artifacts-builder ile paketler, gömülü fontları enjekte eder.
set -euo pipefail

PROJ="${1:?bruk: build.sh <vite-proje-dizini>}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
FONTS="$REPO/naviar-care/assets/fonts-inline.html"
[ -f "$FONTS" ] || { echo "HATA: $FONTS yok"; exit 1; }

BUNDLE="$(find /root/.claude/skills -path '*web-artifacts-builder/scripts/bundle-artifact.sh' 2>/dev/null | head -1)"
[ -n "$BUNDLE" ] || { echo "HATA: bundle-artifact.sh bulunamadı"; exit 1; }

cd "$PROJ"
python3 - <<'EOF'
import re
c = open('index.html').read()
open('index.html.bak', 'w').write(c)
open('index.html', 'w').write(re.sub(r'\s*<link[^>]+(fonts\.googleapis|fonts\.gstatic)[^>]*>', '', c))
EOF
trap 'mv -f index.html.bak index.html 2>/dev/null || true' EXIT

bash "$BUNDLE"

FONTS="$FONTS" python3 - <<'EOF'
import os
fonts = open(os.environ['FONTS']).read()
c = open('bundle.html').read()
assert 'fonts.googleapis' not in c, 'bundle dış font referansı içeriyor'
open('bundle.html', 'w').write(c.replace('<style>', fonts + '<style>', 1))
print(f"OK: bundle.html {os.path.getsize('bundle.html')//1024} KB, fontlar gömülü")
EOF
