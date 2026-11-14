# Deploying mastermechanics.ae

Copy env files — every key is already listed. You only replace passwords.

| File | Use |
|---|---|
| `server/.env.example` | Local. `cp server/.env.example server/.env` |
| `server/.env.production.example` | VPS. `cp server/.env.production.example server/.env` then change `CHANGE_ME` |
| `docker-compose.yml` `environment:` | Docker. Change admin/session secrets before public use |
| `ecosystem.config.cjs` `env:` | pm2. `SITE_URL` / geo already set; DB + admin still come from `server/.env` |

Live origin used in canonicals and media fallback: `SITE_URL` / `MEDIA_FALLBACK_BASE` = `https://mastermechanics.ae`.

Workshop pin (Google Maps place for Master Mechanics Garage LLC, DIP 2): `GEO_LAT=24.9685316` `GEO_LNG=55.1922678` from [maps.app.goo.gl/Rscweto6HRnh3fKL6](https://maps.app.goo.gl/Rscweto6HRnh3fKL6).

This project has **no numbered migration files**. Schema = `npm run db:init` (`server/sql/schema.sql`, idempotent — includes `jobs` for Careers). Content = `npm run db:seed`. **Never** `npm run db:reset` on production (drops `leads`).

Admin **Careers** (`/admin/careers`): create job posts with the same rich-text editor as services, set **Active / Inactive**. Only active jobs appear on `/careers/` and in `sitemap.xml`.

---

## Required environment variables

All of these are in the env files above. Do not add them one by one.

| Variable | Production value |
|---|---|
| `PORT` | `4000` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `postgres://furqan:STRONG_PASSWORD@localhost:5432/mastermechanics` |
| `DATABASE_SSL` | `false` on a local VPS Postgres; `true` on Render/Neon/RDS |
| `SITE_URL` | `https://mastermechanics.ae` |
| `MEDIA_FALLBACK_BASE` | `https://mastermechanics.ae` |
| `LEAD_WEBHOOK_URL` | blank, or your Slack/Make URL |
| `GEO_LAT` | `24.9685316` |
| `GEO_LNG` | `55.1922678` |
| `ADMIN_USER` | your username |
| `ADMIN_PASSWORD` | 12+ characters, not `admin123` |
| `SESSION_SECRET` | `openssl rand -hex 32` |

`npm run preflight` with `NODE_ENV=production` refuses default DB/admin secrets and a localhost `SITE_URL`.

---

## 1. Server prerequisites (once)

```bash
sudo apt update && sudo apt install -y postgresql nginx certbot python3-certbot-nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm i -g pm2
```

Needs **Node 20+** and **PostgreSQL 14+**.

---

## 2. Upload the project and create the database

```bash
cd ~/mastermechanics-pern
DB_PASS='a-long-random-password' npm run db:create
cp server/.env.production.example server/.env
nano server/.env   # only DATABASE_URL password, ADMIN_PASSWORD, SESSION_SECRET
```

`SITE_URL`, media fallback, and geo are already filled.

---

## 3. First-time schema + **all content**

```bash
npm run install:all
npm run db:init          # tables + columns (safe to re-run)
npm run db:seed          # pages, posts, FAQs, gallery, SEO, related links, HTML from seed/data/wp-dump.json
npm run media:download   # only if images are missing from server/public/wp-content
npm run build
NODE_ENV=production npm run preflight   # must print "Ready."
```

---

## 4. Run it permanently

```bash
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
curl -s localhost:4000/healthz          # {"ok":true}
curl -s localhost:4000/robots.txt
curl -s localhost:4000/sitemap.xml | grep -c '<loc>'   # 134
```

---

## 5. HTTPS with Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/mastermechanics.ae
sudo ln -s /etc/nginx/sites-available/mastermechanics.ae /etc/nginx/sites-enabled/
sudo certbot --nginx -d mastermechanics.ae -d www.mastermechanics.ae
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 'Nginx Full' && sudo ufw allow OpenSSH && sudo ufw enable
```

Port 4000 and PostgreSQL stay private.

---

## 6. Test before pointing DNS

Check: `/`, `/contact/`, `/services/`, `/bmw-service-dubai/`, a blog post, `/sitemap.xml`, `/robots.txt`, booking form (`leads` table), phone layout.

View-source a page: one `<title>`, one `rel="canonical"` on `https://mastermechanics.ae…`, `application/ld+json` AutoRepair with DIP 2 address, phones, email, and `geo` 24.9685316 / 55.1922678.

---

## 7. Go live without losing rankings

1. Lower DNS TTL a day before.
2. Point `mastermechanics.ae` and `www` at this server (images are already in `server/public/wp-content`).
3. Search Console: submit `https://mastermechanics.ae/sitemap.xml`, inspect `/`.

URLs keep the old trailing slashes. No redirect map needed except latin `auto-service` → Cyrillic `аuto-service` (seeded).

---

## 8. Later deploys (schema + refreshed seed)

`deploy/deploy.sh` only runs `db:init` + build. To also refresh pages/posts:

```bash
git pull --ff-only
npm run install:all
npm run db:init
npm run db:seed          # upserts content; does not wipe leads
npm run media:download   # if new images
npm run build
NODE_ENV=production npm run preflight
pm2 reload ecosystem.config.cjs --update-env
```

Seed overwrites pages/posts that also exist in seed (including admin edits to those rows). **Leads stay.**

```bash
bash deploy/deploy.sh           # code-only update (init + build + pm2)
SEED=1 bash deploy/deploy.sh    # also re-seed all content
crontab -e                # 0 3 * * * /home/YOU/mastermechanics-pern/deploy/backup.sh
```

---

## 9. Never on production

```bash
npm run db:reset
CONFIRM_RESET=yes npm --prefix server run db:reset
```

---

## Docker

```bash
# change ADMIN_PASSWORD and SESSION_SECRET in docker-compose.yml first
docker compose up -d --build
docker compose run --rm web sh -c "npm --prefix server run db:init && npm --prefix server run db:seed"
```

## Render / Railway / Fly

Create Postgres. Set the full variable table above (`DATABASE_SSL=true`, `SITE_URL=https://mastermechanics.ae`). Build: `npm run install:all && npm run build`. Start: `npm start`. Once in the shell:

```bash
npm run db:init && npm run db:seed
```

Ephemeral disks: attach a volume at `server/public/wp-content` so images survive restarts.

---

## NAP used in JSON-LD / robots / footer

Copied from [mastermechanics.ae](https://mastermechanics.ae/) footer and [contact](https://mastermechanics.ae/contact/):

- **Name:** Master Mechanics Garage LLC
- **Address:** Master Mechanics Garage LLC Warehouse No. 49, Building No. 3, Span Precast Compound 71 Street, Dubai Investment Park 2 (DIP 2) Dubai, United Arab Emirates
- **Mobile / WhatsApp:** +971 58 621 9014
- **Landline:** +971 455 491 81
- **Email:** carcare@mastermechanics.ae
- **Hours:** Monday–Saturday 9:00–19:00 (Sunday closed)
- **Map:** https://rb.gy/g6j5r0
- **Geo:** 24.9685316, 55.1922678
