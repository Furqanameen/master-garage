# Master Mechanics Garage – PERN rebuild

**P**ostgreSQL · **E**xpress · **R**eact · **N**ode. You asked for MERN with PostgreSQL – MERN's "M" is MongoDB, so with PostgreSQL this is the PERN variant. Express, React and Node are identical.

- Same URLs as mastermechanics.ae (including trailing slashes) and the same `/wp-content/uploads/...` image paths
- Same pages as the live site, plus extra service, brand and area pages
- Every page lives in PostgreSQL; Express injects the right `<title>`, description, canonical, Open Graph tags, JSON-LD and crawlable HTML into each page before it leaves the server
- Dynamic `/sitemap.xml` and `/robots.txt`, booking/lead form saved to the database

## Run it locally (user `furqan`, password `furqan`, database `mastermechanics`)

Needs **Node 20+** and **PostgreSQL 14+** running. This stack is Express + React + Node with PostgreSQL (PERN). MongoDB is not used.

`server/.env` is already set to
`DATABASE_URL=postgres://furqan:furqan@localhost:5432/mastermechanics`

```bash
cd /home/farqan/projects/mastermechanics--web

# 1. Create the database user + database (Linux)
npm run db:create

# 2. Install packages, create tables, load all content, build React
npm run setup

# 3. Start API + Vite together (best for local testing)
npm run dev
```

Then open **http://localhost:5173** (Vite, hot reload). The API is **http://localhost:4000**.

### Admin dashboard

Open **http://localhost:5173/admin**

Default **local** login (set in `server/.env` — never commit this file):

- Username: `admin`
- Password: `admin123`

Change `ADMIN_PASSWORD` and `SESSION_SECRET` before going live. Production **will not start** with these defaults. The login cookie is HttpOnly, SameSite=Strict, and only sent to `/api/admin`. Failed logins lock out after several tries. Database errors are never sent to the browser.

From there you can **create, view, edit and delete** services and blog posts. The body field is a free TipTap rich-text editor (MIT licence): headings, bold, lists, links, and **image upload** (saved under `server/public/uploads/`). Existing WordPress posts open in the same editor.

Production-style (single process, needs `npm run setup` first):

```bash
npm start                 # http://localhost:4000
```

Images that are not yet saved under `server/public/wp-content/uploads/` are redirected to https://mastermechanics.ae so the site still looks complete. To keep copies locally:

```bash
npm run media:download
```

If PostgreSQL is not using `sudo -u postgres` (macOS/Windows):
`PSQL="psql -h localhost -U postgres" npm run db:create`.

On macOS/Windows (no `sudo -u postgres`): `PSQL="psql -h localhost -U postgres" npm run db:create`.
Manual alternative to step 1: `sudo -u postgres psql -c "CREATE USER furqan WITH PASSWORD 'furqan';"` then
`sudo -u postgres psql -c "CREATE DATABASE mastermechanics OWNER furqan;"`.

Other commands: `npm run db:reset` (drop and reload tables) · `npm run test:data` (content checks) · `/healthz` (health check).

Images work immediately, before step 3: any `/wp-content/uploads/...` file not stored locally redirects to the same file on mastermechanics.ae.

## Deploying

See **DEPLOY.md** for the full production load (schema + all content), env files, sitemap/robots/JSON-LD NAP, Nginx, pm2, Docker, and Render.

Copy env in one step — every variable is already listed:

```bash
cp server/.env.example server/.env                      # local
cp server/.env.production.example server/.env           # VPS; then only change CHANGE_ME passwords
```

`SITE_URL` and `MEDIA_FALLBACK_BASE` are `https://mastermechanics.ae`. Geo is the DIP 2 Maps pin.

## Things I changed or want you to check

1. **Typos fixed on the home page:** "Canter" → "Center", "Transparant" → "Transparent", "Advanced equipments" → "Advanced Equipment". The duplicate "Customer Satisfaction" card is shown once.
2. **About page meta description** on the live site is placeholder text (`jjggjgkgkgk`). I wrote a real one.
3. **Blog category `аuto-service` uses a Cyrillic "а"** (that is how WordPress stored it). Kept as-is so existing URLs and rankings survive; `/blog/auto-service/...` (normal "a") 301-redirects to it.
4. **WhatsApp number:** I assumed the header number +971 58 621 9014 is your WhatsApp line. The footer landline is +971 4 554 9181. Change both in `server/src/site.js`.
5. **Claims on the live pages that you should be able to prove:** "free pick-up and drop-off", "24/7 emergency response", "same-day AC service", "warranty on repairs", and the maintenance/wheel-balancing percentage claims. They are copied from your site; the new pages avoid inventing any new ones, and pick-up wording says "confirm availability".
6. **Testimonials** are copied from your home page. I did not add star-rating structured data, because self-published review markup can get a site penalised.
7. Admin is at `/admin`. Leads are in the `leads` table; set `LEAD_WEBHOOK_URL` to push them to Slack/Make/Zapier.

## Going live without losing rankings

Follow **DEPLOY.md** section 3 (init + seed + media + build). Submit `https://mastermechanics.ae/sitemap.xml` in Search Console after DNS.

## What I tested, and what I couldn't

Tested here: the PostgreSQL schema (applied twice, idempotent); the seed script against a real PostgreSQL 16; page resolution, `<head>` injection, JSON-LD, sitemap, robots, the 404 path, and the Cyrillic blog URL handling; seed data checks (`npm --prefix server run test:data`: unique paths and titles, title/description lengths, no broken internal links); syntax of every server and React file.

**Not tested:** `npm install`, the Vite build, and the running Express server. This workspace has no package-install access, so those first run on your machine. If anything fails on first run, send me the error and I'll fix it.
# master-garage
# master-garage
