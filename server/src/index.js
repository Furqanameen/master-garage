import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config.js';
import { api } from './routes/api.js';
import { admin } from './routes/admin.js';
import { resolveRoute, buildSitemap, robotsTxt } from './seo.js';
import { findRedirect } from './data.js';
import { pool } from './db.js';
import { normalisePath, encodePath } from './lib/html.js';
import { inject } from './lib/inject.js';
import { redact } from './lib/safe.js';
import mediaRedirects from './mediaRedirects.json' with { type: 'json' };

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const canonicalHost = (() => {
  try { return new URL(config.siteUrl).hostname.toLowerCase(); }
  catch { return 'mastermechanics.ae'; }
})();

app.use((req, res, next) => {
  const host = (req.hostname || '').toLowerCase();
  if (!host || host === 'localhost' || host === '127.0.0.1' || host === canonicalHost) return next();
  if (host === `www.${canonicalHost}`) {
    const pathq = req.originalUrl || '/';
    return res.redirect(301, `${config.siteUrl}${pathq.startsWith('/') ? pathq : `/${pathq}`}`);
  }
  next();
});

// CSP is left to the reverse proxy/CDN because the page injects inline JSON-LD.
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'same-site' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'sameorigin' },
}));
app.use(compression());
app.use(cors({ origin: false }));
app.use('/api/admin', express.json({ limit: '500kb' }));
app.use(express.json({ limit: '50kb' }));

/* ---- health check (load balancers, Docker, uptime monitors) ---- */
app.get('/healthz', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});

/* ---- API ---- */
app.use('/api/admin', admin);
app.use('/api', api);

/* ---- robots + sitemap ---- */
app.get('/robots.txt', (_req, res) => res.type('text/plain').send(robotsTxt()));
app.get('/sitemap.xml', async (_req, res, next) => {
  try {
    res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(await buildSitemap());
  } catch (e) { next(e); }
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/wp-content/')) return next();
  const to = mediaRedirects[req.path] || mediaRedirects[decodeURIComponent(req.path)];
  if (to) return res.redirect(301, to);
  next();
});

/* ---- local images under /images (legacy /wp-content URLs 301 above) ---- */
app.use(express.static(config.publicDir, {
  index: false, maxAge: '30d', fallthrough: true,
  setHeaders: (res, file) => { if (!/[\\/]wp-content[\\/]/.test(file)) res.setHeader('Cache-Control', 'public, max-age=3600'); },
}));
const fallbackHost = new URL(config.mediaFallbackBase).host.replace(/^www\./, '');
const ownHost = new URL(config.siteUrl).host.replace(/^www\./, '');
app.use('/wp-content', (req, res) => {
  if (fallbackHost === ownHost) return res.status(404).type('text/plain').send('Not found');
  res.redirect(302, config.mediaFallbackBase + '/wp-content' + req.url);
});

/* Bare SPA shell must not compete with the injected homepage. */
app.get(['/index.html', '/index.htm'], (_req, res) => res.redirect(301, '/'));
app.get('/', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.query, 's')) return res.redirect(301, '/');
  next();
});

/* ---- built React app (hashed assets) ---- */
app.use(express.static(config.clientDist, { index: false, maxAge: '365d', immutable: true, setHeaders: (res, file) => {
  if (!file.includes(`${path.sep}assets${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=3600');
} }));

/* ---- HTML pages: redirects, trailing slash, SEO head injection ---- */
let template = null;
function getTemplate() {
  if (template && process.env.NODE_ENV === 'production') return template;
  const file = path.join(config.clientDist, 'index.html');
  if (!fs.existsSync(file)) return null;
  template = fs.readFileSync(file, 'utf8');
  return template;
}

app.get('*', async (req, res, next) => {
  try {
    if (/\.[a-z0-9]{2,5}$/i.test(req.path)) return res.status(404).type('text/plain').send('Not found');

    if (req.path === '/admin' || req.path.startsWith('/admin/')) {
      const html = getTemplate();
      if (!html) return res.status(503).type('text/plain').send('Client not built. Run: npm run build');
      res.set('X-Frame-Options', 'DENY');
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.set('Referrer-Policy', 'no-referrer');
      return res.status(200).type('html').send(html);
    }

    const normal = normalisePath(req.path);

    const redirect = await findRedirect(normal);
    if (redirect) return res.redirect(redirect.status, encodePath(redirect.to_path));

    const route = await resolveRoute(normal);

    if (route.status === 200 && route.canonicalPath) {
      const wanted = encodePath(route.canonicalPath);
      const asked = req.path.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());
      if (asked !== wanted) return res.redirect(301, wanted);
    }

    const html = getTemplate();
    if (!html) {
      return res.status(503).type('text/plain').send('Client not built. Run: npm run build');
    }
    const out = inject(html, route.head, route.fallback);
    res.status(route.status).set('Cache-Control', 'public, max-age=300').type('html').send(out);
  } catch (e) { next(e); }
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({ error: 'request too large' });
  }
  console.error(redact(err?.stack || err?.message || 'server_error'));
  res.status(500).json({ error: 'server_error' });
});

const server = app.listen(config.port, () => {
  console.log(`Master Mechanics server on http://localhost:${config.port}`);
});

// graceful shutdown (pm2 / Docker send SIGTERM)
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => server.close(async () => { await pool.end().catch(() => {}); process.exit(0); }));
}
