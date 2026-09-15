#!/usr/bin/env bash
# Vercel build step for QBLOGG.
#
# This used to be inlined as vercel.json's buildCommand, but that string
# grew past Vercel's 256-character limit on buildCommand and started
# failing schema validation (surfaced once GitHub-linked projects began
# validating this file — see PR #16). Moved here so buildCommand can stay
# a short one-liner regardless of how long the actual recipe gets.
#
# Git-linked and CLI deployments must supply the reviewed source checkout.
# A vercel.json-only upload cannot provide this external build script.
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

if [ ! -f index.html ]; then
  echo "QBLOGG source is missing. Deploy the full BETA-ART-PRIVAT repository root." >&2
  exit 1
fi

# Only this generated directory is published by vercel.json. Rebuild it from
# the current checkout so deleted assets do not survive a previous build.
rm -rf -- dist
mkdir -p dist/.well-known dist/demo
cp index.html work.html blog.html post.html \
   gizlilik.html kosullar.html kalite.html ornek.html \
   404.html sitemap.xml robots.txt feed.xml dist/
cp .well-known/security.txt dist/.well-known/
cp demo/cv-action-page.html demo/cv-action-page.js \
   demo/q-work-audit.html demo/q-work-audit.js dist/demo/
cp -r assets dist/assets
