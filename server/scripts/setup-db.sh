#!/usr/bin/env bash
# Creates the PostgreSQL role + database used by the app. Safe to run repeatedly.
#   npm run db:create
# Defaults: user furqan / password furqan / database mastermechanics
# Override:  DB_NAME=x DB_USER=y DB_PASS=z npm run db:create
# Linux default runs psql as the postgres OS user (sudo). Override the command with PSQL, e.g.
#   PSQL="psql -h localhost -U postgres" npm run db:create        (macOS / Windows Git-Bash / Docker)
set -euo pipefail

DB_NAME="${DB_NAME:-mastermechanics}"
DB_USER="${DB_USER:-furqan}"
DB_PASS="${DB_PASS:-furqan}"
PSQL="${PSQL:-sudo -u postgres psql}"

run() { $PSQL -v ON_ERROR_STOP=1 -qAt "$@"; }

if [ "$(run -d postgres -c "SELECT 1 FROM pg_roles WHERE rolname = '${DB_USER}'")" != "1" ]; then
  run -d postgres -c "CREATE ROLE \"${DB_USER}\" WITH LOGIN PASSWORD '${DB_PASS}'"
  echo "✔ created role ${DB_USER}"
else
  run -d postgres -c "ALTER ROLE \"${DB_USER}\" WITH LOGIN PASSWORD '${DB_PASS}'"
  echo "✔ role ${DB_USER} exists (password reset)"
fi

if [ "$(run -d postgres -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'")" != "1" ]; then
  run -d postgres -c "CREATE DATABASE \"${DB_NAME}\" OWNER \"${DB_USER}\" ENCODING 'UTF8'"
  echo "✔ created database ${DB_NAME}"
else
  echo "✔ database ${DB_NAME} already exists"
fi
run -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"${DB_NAME}\" TO \"${DB_USER}\""
echo "Ready: postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"
