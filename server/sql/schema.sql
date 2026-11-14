-- Master Mechanics Garage – PostgreSQL schema (idempotent)

CREATE TABLE IF NOT EXISTS pages (
  id               SERIAL PRIMARY KEY,
  path             TEXT        NOT NULL UNIQUE,            -- '/ac-repair-service/' (same as the live WordPress URL)
  type             TEXT        NOT NULL,                   -- home | static | service | brand | location | services_index | spare_parts | faq | gallery | blog_index
  nav_label        TEXT,                                   -- label used in menus / footer / cards
  in_menu          BOOLEAN     NOT NULL DEFAULT false,     -- show in header Services dropdown
  title            TEXT        NOT NULL,                   -- <title>
  meta_description TEXT,
  h1               TEXT,
  subtitle         TEXT,
  hero_image       TEXT,                                   -- '/wp-content/uploads/...'
  card_image       TEXT,
  excerpt          TEXT,
  content          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  body_html        TEXT,                                   -- exact HTML imported from WordPress (optional, wins over content.sections)
  faq              JSONB       NOT NULL DEFAULT '[]'::jsonb,
  noindex          BOOLEAN     NOT NULL DEFAULT false,
  published        BOOLEAN     NOT NULL DEFAULT true,
  sort_order       INT         NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS pages_type_idx ON pages (type, sort_order);

CREATE TABLE IF NOT EXISTS posts (
  id               SERIAL PRIMARY KEY,
  category_slug    TEXT        NOT NULL,                   -- may contain the original Cyrillic 'а' (see README)
  category_name    TEXT        NOT NULL,
  slug             TEXT        NOT NULL,
  title            TEXT        NOT NULL,                   -- headline
  seo_title        TEXT,                                   -- <title>
  meta_description TEXT,
  excerpt          TEXT,
  image            TEXT,
  content          JSONB       NOT NULL DEFAULT '{}'::jsonb,
  body_html        TEXT,
  faq              JSONB       NOT NULL DEFAULT '[]'::jsonb,
  published        BOOLEAN     NOT NULL DEFAULT true,
  published_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_slug, slug)
);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts (published, published_at DESC);

CREATE TABLE IF NOT EXISTS faqs (
  id          SERIAL PRIMARY KEY,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INT  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id          SERIAL PRIMARY KEY,
  image       TEXT NOT NULL UNIQUE,
  alt         TEXT NOT NULL DEFAULT '',
  sort_order  INT  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jobs (
  id               SERIAL PRIMARY KEY,
  slug             TEXT        NOT NULL UNIQUE,
  title            TEXT        NOT NULL,
  seo_title        TEXT,
  meta_description TEXT,
  excerpt          TEXT,
  department       TEXT,
  employment_type  TEXT        NOT NULL DEFAULT 'Full-time',
  location         TEXT        NOT NULL DEFAULT 'Dubai Investment Park 2, Dubai',
  body_html        TEXT,
  published        BOOLEAN     NOT NULL DEFAULT true,
  sort_order       INT         NOT NULL DEFAULT 0,
  published_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jobs_published_idx ON jobs (published, sort_order, id);

CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  email       TEXT,
  service     TEXT,
  vehicle     TEXT,
  message     TEXT,
  source_page TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS redirects (
  from_path TEXT PRIMARY KEY,
  to_path   TEXT NOT NULL,
  status    INT  NOT NULL DEFAULT 301
);

ALTER TABLE pages DROP COLUMN IF EXISTS raw_seo;
ALTER TABLE pages DROP COLUMN IF EXISTS raw_head;
ALTER TABLE pages DROP COLUMN IF EXISTS raw_body;
ALTER TABLE pages DROP COLUMN IF EXISTS body_attrs;
ALTER TABLE pages DROP COLUMN IF EXISTS html_lang;
ALTER TABLE pages DROP COLUMN IF EXISTS captured_at;
ALTER TABLE posts DROP COLUMN IF EXISTS raw_seo;
ALTER TABLE posts DROP COLUMN IF EXISTS raw_head;
ALTER TABLE posts DROP COLUMN IF EXISTS raw_body;
ALTER TABLE posts DROP COLUMN IF EXISTS body_attrs;
ALTER TABLE posts DROP COLUMN IF EXISTS html_lang;
ALTER TABLE posts DROP COLUMN IF EXISTS captured_at;
DROP TABLE IF EXISTS settings;
