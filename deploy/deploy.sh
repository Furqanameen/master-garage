#!/usr/bin/env bash
# Update a running production install:  bash deploy/deploy.sh
# NOTE: NODE_ENV=production is NOT exported for install/build – that would skip Vite (a dev dependency) and break the build.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -d .git ] && git pull --ff-only || echo "(not a git checkout – skipping git pull)"
npm run install:all
npm run db:init                                  # idempotent: only creates missing tables
if [ "${SEED:-}" = "1" ]; then
  npm run db:seed                                # refresh all pages/posts (does not drop leads)
fi
npm run build
NODE_ENV=production npm --prefix server run preflight
pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
pm2 save
echo "✔ deployed"
