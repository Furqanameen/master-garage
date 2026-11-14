// Checks that the app is correctly configured and ready to serve.   npm run preflight
// Exit code 1 if anything blocking is wrong, so it can gate a deploy.
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../src/config.js';
import { pool } from '../src/db.js';

const prod = process.env.NODE_ENV === 'production';
let blocking = 0;
const ok = (m) => console.log('  \x1b[32m✔\x1b[0m', m);
const warn = (m) => console.log('  \x1b[33m!\x1b[0m', m);
const bad = (m) => { blocking++; console.log('  \x1b[31m✖\x1b[0m', m); };

console.log(`\nPreflight (${prod ? 'production' : 'development'})\n`);

// --- environment
const u = (() => { try { return new URL(config.databaseUrl); } catch { return null; } })();
if (!u) bad('DATABASE_URL is not a valid URL');
else {
  ok(`database: ${decodeURIComponent(u.username)}@${u.hostname}:${u.port || 5432}/${u.pathname.slice(1)}`);
  if (prod && (u.password === 'furqan' || u.password === 'postgres' || u.password === 'CHANGE_ME')) bad('production database password is a default – change it');
}
try { new URL(config.siteUrl); ok(`SITE_URL = ${config.siteUrl}`); } catch { bad('SITE_URL is not a valid URL'); }
if (prod && !/^https:\/\//.test(config.siteUrl)) bad('SITE_URL must be https:// in production (canonical tags and sitemap use it)');
if (prod && /localhost|127\.0\.0\.1/.test(config.siteUrl)) bad('SITE_URL points to localhost in production');
if (prod && (config.adminPassword === 'admin123' || config.sessionSecret === 'dev-session-secret-change-me')) {
  bad('production still uses the default ADMIN_PASSWORD / SESSION_SECRET – change them in .env');
}
if (prod && !config.databaseSsl && u && !['localhost', '127.0.0.1', 'db'].includes(u.hostname)) warn('remote database without DATABASE_SSL=true');

// --- database
try {
  const { rows: [{ now }] } = await pool.query('SELECT now()');
  ok(`database reachable (${new Date(now).toISOString()})`);
  const tables = (await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`)).rows.map((r) => r.table_name);
  const need = ['pages', 'posts', 'faqs', 'gallery_images', 'jobs', 'leads', 'redirects'];
  const missing = need.filter((t) => !tables.includes(t));
  if (missing.length) bad(`missing tables: ${missing.join(', ')}  → npm run db:init`);
  else {
    ok('all required tables exist');
    const n = async (sql) => Number((await pool.query(sql)).rows[0].n);
    const pages = await n('SELECT count(*) n FROM pages WHERE published');
    const posts = await n('SELECT count(*) n FROM posts WHERE published');
    if (pages < 10) bad(`only ${pages} pages in the database  → npm run db:seed`); else ok(`${pages} pages, ${posts} posts, ${await n('SELECT count(*) n FROM faqs')} FAQs, ${await n('SELECT count(*) n FROM gallery_images')} gallery images`);
    const home = await n(`SELECT count(*) n FROM pages WHERE path='/'`);
    if (!home) bad('no home page row (path "/")');
    const exact = await n(`SELECT count(*) n FROM pages WHERE body_html IS NOT NULL`);
    if (exact) ok(`${exact} pages have HTML body copy`);
  }
} catch (e) {
  const hint = /password authentication failed|ECONNREFUSED|database .* does not exist/i.test(e.message)
    ? e.message.replace(/postgres(ql)?:\/\/[^\s]+/gi, '[redacted]')
    : 'connection failed';
  bad(`cannot connect to the database (${hint})  → npm run db:create`);
}

// --- client build
const idx = path.join(config.clientDist, 'index.html');
if (!fs.existsSync(idx)) bad('client not built  → npm run build');
else {
  const html = fs.readFileSync(idx, 'utf8');
  ok('client build found');
  if (!/<div\s[^>]*id=["']root["']/.test(html)) bad('built index.html has no <div id="root">');
  if (!html.includes('<!--SEO_HEAD-->')) warn('placeholder comment stripped by the build – the server injects tags anyway (handled)');
}

// --- media
const up = path.join(config.publicDir, 'wp-content', 'uploads');
let files = 0;
const walk = (d) => { for (const e of fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }) : []) e.isDirectory() ? walk(path.join(d, e.name)) : e.name !== '.gitkeep' && files++; };
walk(up);
files ? ok(`${files} images stored locally`) : warn(`no local images yet – served from ${config.mediaFallbackBase} until  npm run media:download`);

console.log(blocking ? `\n\x1b[31m${blocking} blocking problem(s).\x1b[0m\n` : '\n\x1b[32mReady.\x1b[0m\n');
await pool.end().catch(() => {});
process.exit(blocking ? 1 : 0);
