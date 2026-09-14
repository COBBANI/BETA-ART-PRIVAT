#!/usr/bin/env bash
# Vercel build step for QBLOGG.
#
# This used to be inlined as vercel.json's buildCommand, but that string
# grew past Vercel's 256-character limit on buildCommand and started
# failing schema validation (surfaced once GitHub-linked projects began
# validating this file — see PR #16). Moved here so buildCommand can stay
# a short one-liner regardless of how long the actual recipe gets.
#
# Handles two deployment shapes:
# - Git-linked Vercel projects already have the full repo checked out in
#   the build environment, so we build straight from the working tree.
# - The single vercel.json-only "recipe" deployment (no git link — only
#   this repo's vercel.json is pushed there) has nothing else present, so
#   it self-clones the public repo first.
set -euo pipefail

SRC="."
if [ ! -f index.html ]; then
  git clone --depth 1 --filter=blob:none --sparse --branch main \
    https://github.com/andersenbetul-alt/BETA-ART.git _src
  git -C _src sparse-checkout set assets demo .well-known
  SRC="_src"
fi

mkdir -p dist/.well-known dist/demo
cp "$SRC"/index.html "$SRC"/work.html "$SRC"/blog.html "$SRC"/post.html \
   "$SRC"/gizlilik.html "$SRC"/kosullar.html "$SRC"/kalite.html "$SRC"/ornek.html \
   "$SRC"/404.html "$SRC"/sitemap.xml "$SRC"/robots.txt "$SRC"/feed.xml dist/
cp "$SRC"/.well-known/security.txt dist/.well-known/
cp "$SRC"/demo/cv-action-page.html "$SRC"/demo/cv-action-page.js \
   "$SRC"/demo/q-work-audit.html "$SRC"/demo/q-work-audit.js dist/demo/
cp -r "$SRC"/assets dist/assets
