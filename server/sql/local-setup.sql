-- Alternative to `npm run db:create` – run once as the PostgreSQL superuser, from psql:
--   sudo -u postgres psql -f /path/to/server/sql/local-setup.sql      (Linux; file must be readable by "postgres")
--   psql -U postgres -f server/sql/local-setup.sql                    (macOS / Windows)
-- Creates user "furqan" (password "furqan") and database "mastermechanics".

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'furqan') THEN
    CREATE ROLE furqan WITH LOGIN PASSWORD 'furqan';
  ELSE
    ALTER ROLE furqan WITH LOGIN PASSWORD 'furqan';
  END IF;
END
$$;

SELECT 'CREATE DATABASE mastermechanics OWNER furqan ENCODING ''UTF8'''
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mastermechanics')\gexec

GRANT ALL PRIVILEGES ON DATABASE mastermechanics TO furqan;
