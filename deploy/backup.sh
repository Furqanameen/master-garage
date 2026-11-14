#!/usr/bin/env bash
# Nightly database backup. Add to cron:   0 3 * * * /path/to/mastermechanics-pern/deploy/backup.sh
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . server/.env; set +a
mkdir -p backups
pg_dump "$DATABASE_URL" | gzip > "backups/mastermechanics-$(date +%F).sql.gz"
find backups -name '*.sql.gz' -mtime +14 -delete        # keep 14 days
echo "✔ backup written to backups/"
