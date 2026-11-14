import fs from 'node:fs/promises';
import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { query } from '../db.js';
import { config } from '../config.js';
import {
  requireAdmin, requireSameOrigin, checkCredentials, setSession, clearSession, readSession,
  loginAllowed, recordLoginFail, recordLoginOk,
} from '../auth.js';
import { cleanHtml } from '../lib/html.js';
import { contentToHtml, slugify, servicePath } from '../lib/contentHtml.js';
import { postPath } from '../data.js';
import { intId, publicError, redact, safeMediaUrl, stripCaptureFields, RESERVED_SLUGS } from '../lib/safe.js';

export const admin = Router();
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false });
const writeLimit = rateLimit({ windowMs: 60 * 1000, limit: 40, standardHeaders: true, legacyHeaders: false });
const HTML_MAX = 400_000;

admin.use(requireSameOrigin);

admin.post('/login', loginLimit, (req, res) => {
  const gate = loginAllowed(req);
  if (!gate.ok) {
    return res.status(429).json({ error: `Too many attempts. Try again in ${gate.wait} seconds.` });
  }
  const username = String(req.body?.username || '').slice(0, 80);
  const password = String(req.body?.password || '').slice(0, 200);
  if (!checkCredentials(username, password)) {
    recordLoginFail(gate.ip);
    return res.status(401).json({ error: 'Wrong username or password.' });
  }
  recordLoginOk(gate.ip);
  setSession(res, config.adminUser);
  res.json({ ok: true, user: config.adminUser });
});

admin.post('/logout', (req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

admin.get('/me', (req, res) => {
  const session = readSession(req);
  if (!session?.u) return res.status(401).json({ error: 'Please sign in.' });
  res.json({ user: session.u });
});

admin.use(requireAdmin);
admin.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') return next();
  return writeLimit(req, res, next);
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024, files: 1, fields: 5 },
  fileFilter: (_req, file, cb) => {
    if (!/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
      return cb(Object.assign(new Error('Please upload a JPEG, PNG, GIF or WebP image.'), { status: 400 }));
    }
    cb(null, true);
  },
});

function sniffImage(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return '.jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return '.png';
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return '.gif';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return '.webp';
  return null;
}

admin.post('/upload', upload.single('file'), wrap(async (req, res) => {
  if (!req.file?.buffer) return res.status(400).json({ error: 'Choose an image to upload.' });
  const ext = sniffImage(req.file.buffer);
  if (!ext) return res.status(400).json({ error: 'That file is not a valid image.' });
  const now = new Date();
  const ym = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const name = `${Date.now()}-${slugify(path.parse(req.file.originalname || 'image').name) || 'image'}${ext}`;
  const rel = `/uploads/${ym}/${name}`;
  const dest = path.resolve(config.publicDir, rel.slice(1));
  const root = path.resolve(config.publicDir) + path.sep;
  if (!dest.startsWith(root)) return res.status(400).json({ error: 'Invalid upload path.' });
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, req.file.buffer, { flag: 'wx' }).catch(async (e) => {
    if (e.code === 'EEXIST') await fs.writeFile(dest, req.file.buffer);
    else throw e;
  });
  res.status(201).json({ url: rel });
}));

const serviceBody = (row) => ({
  ...stripCaptureFields(row),
  body_html: row.body_html || contentToHtml(row.content),
});

admin.get('/services', wrap(async (_req, res) => {
  const { rows } = await query(
    `SELECT id, path, nav_label, title, h1, subtitle, card_image, published, in_menu, sort_order, updated_at
       FROM pages WHERE type = 'service' ORDER BY sort_order, id`,
  );
  res.json(rows);
}));

admin.get('/services/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rows } = await query(
    `SELECT id, path, type, nav_label, in_menu, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at
       FROM pages WHERE id = $1 AND type = 'service'`,
    [id],
  );
  if (!rows[0]) return res.status(404).json({ error: 'Service not found.' });
  res.json(serviceBody(rows[0]));
}));

function cleanBody(html) {
  const raw = String(html || '');
  if (raw.length > HTML_MAX) throw Object.assign(new Error('The page content is too large.'), { status: 400 });
  return cleanHtml(raw) || null;
}

function serviceFields(b) {
  const slug = slugify(b.slug || b.path || b.h1 || b.title || '');
  if (RESERVED_SLUGS.has(slug)) throw Object.assign(new Error('That URL is reserved.'), { status: 400 });
  const pth = servicePath(slug);
  if (!pth) throw Object.assign(new Error('Please enter a URL slug.'), { status: 400 });
  return {
    path: pth,
    nav_label: String(b.nav_label || b.h1 || b.title || '').trim().slice(0, 120) || 'Service',
    title: String(b.title || b.h1 || '').trim().slice(0, 160) || 'Service',
    meta_description: String(b.meta_description || '').trim().slice(0, 320) || null,
    h1: String(b.h1 || b.title || '').trim().slice(0, 160) || 'Service',
    subtitle: String(b.subtitle || '').trim().slice(0, 240) || null,
    card_image: safeMediaUrl(b.card_image),
    body_html: cleanBody(b.body_html),
    in_menu: b.in_menu !== false,
    published: b.published !== false,
    sort_order: Number.isFinite(+b.sort_order) ? Math.max(0, Math.min(9999, +b.sort_order)) : 50,
  };
}

admin.post('/services', wrap(async (req, res) => {
  const f = serviceFields(req.body || {});
  try {
    const { rows } = await query(
      `INSERT INTO pages (path, type, nav_label, in_menu, title, meta_description, h1, subtitle, card_image, body_html, published, sort_order)
       VALUES ($1,'service',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, path, type, nav_label, in_menu, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at`,
      [f.path, f.nav_label, f.in_menu, f.title, f.meta_description, f.h1, f.subtitle, f.card_image, f.body_html, f.published, f.sort_order],
    );
    res.status(201).json(serviceBody(rows[0]));
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A page already exists at that URL.' });
    throw e;
  }
}));

admin.put('/services/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const f = serviceFields(req.body || {});
  try {
    const { rows } = await query(
      `UPDATE pages SET path=$2, nav_label=$3, in_menu=$4, title=$5, meta_description=$6, h1=$7, subtitle=$8,
              card_image=$9, body_html=$10, published=$11, sort_order=$12, updated_at=now()
        WHERE id=$1 AND type='service'
        RETURNING id, path, type, nav_label, in_menu, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at`,
      [id, f.path, f.nav_label, f.in_menu, f.title, f.meta_description, f.h1, f.subtitle, f.card_image, f.body_html, f.published, f.sort_order],
    );
    if (!rows[0]) return res.status(404).json({ error: 'Service not found.' });
    res.json(serviceBody(rows[0]));
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A page already exists at that URL.' });
    throw e;
  }
}));

admin.delete('/services/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rowCount } = await query(`DELETE FROM pages WHERE id = $1 AND type = 'service'`, [id]);
  if (!rowCount) return res.status(404).json({ error: 'Service not found.' });
  res.json({ ok: true });
}));

function parseRelated(s) {
  return String(s || '')
    .split(/[\n,]+/)
    .map((x) => x.trim())
    .filter((x) => x.startsWith('/') && x.length < 400)
    .slice(0, 12);
}

function specFields(b) {
  const slug = slugify(b.slug || b.path || b.h1 || b.title || '');
  if (RESERVED_SLUGS.has(slug)) throw Object.assign(new Error('That URL is reserved.'), { status: 400 });
  const pth = servicePath(slug);
  if (!pth) throw Object.assign(new Error('Please enter a URL slug.'), { status: 400 });
  const related = Array.isArray(b.related) ? b.related.filter((x) => String(x).startsWith('/')).slice(0, 12) : parseRelated(b.related_text);
  const keywords = String(b.keywords || '').trim().slice(0, 160) || null;
  return {
    path: pth,
    nav_label: String(b.nav_label || b.h1 || b.title || '').trim().slice(0, 120) || 'Specialist',
    title: String(b.title || b.h1 || '').trim().slice(0, 60) || 'Specialist',
    meta_description: String(b.meta_description || '').trim().slice(0, 145) || null,
    h1: String(b.h1 || b.title || '').trim().slice(0, 160) || 'Specialist',
    subtitle: String(b.subtitle || '').trim().slice(0, 240) || null,
    card_image: safeMediaUrl(b.card_image),
    body_html: cleanBody(b.body_html),
    in_menu: false,
    published: b.published !== false,
    sort_order: Number.isFinite(+b.sort_order) ? Math.max(0, Math.min(9999, +b.sort_order)) : 50,
    keywords,
    related,
  };
}

function specContent(existing, f) {
  const content = { ...(existing || {}) };
  content.keywords = f.keywords;
  content.related = f.related;
  const sections = [...(content.sections || [])].filter((s) => !/related/i.test(s.heading || ''));
  if (f.related.length) sections.push({ heading: 'Related', links: f.related });
  content.sections = sections;
  return content;
}

admin.get('/specializations', wrap(async (_req, res) => {
  const { rows } = await query(
    `SELECT id, path, nav_label, title, h1, subtitle, card_image, published, sort_order, updated_at
       FROM pages WHERE type = 'brand' ORDER BY sort_order, id`,
  );
  res.json(rows);
}));

admin.get('/specializations/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rows } = await query(
    `SELECT id, path, type, nav_label, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at
       FROM pages WHERE id = $1 AND type = 'brand'`,
    [id],
  );
  if (!rows[0]) return res.status(404).json({ error: 'Specialization not found.' });
  const r = rows[0];
  res.json({
    ...stripCaptureFields(r),
    body_html: r.body_html || contentToHtml(r.content),
    keywords: r.content?.keywords || '',
    related_text: (r.content?.related || []).join('\n'),
  });
}));

admin.post('/specializations', wrap(async (req, res) => {
  const f = specFields(req.body || {});
  const content = specContent({}, f);
  try {
    const { rows } = await query(
      `INSERT INTO pages (path, type, nav_label, in_menu, title, meta_description, h1, subtitle, card_image, body_html, content, published, sort_order)
       VALUES ($1,'brand',$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,$12)
       RETURNING id, path, type, nav_label, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at`,
      [f.path, f.nav_label, f.in_menu, f.title, f.meta_description, f.h1, f.subtitle, f.card_image, f.body_html, JSON.stringify(content), f.published, f.sort_order],
    );
    res.status(201).json(serviceBody(rows[0]));
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A page already exists at that URL.' });
    throw e;
  }
}));

admin.put('/specializations/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const f = specFields(req.body || {});
  const cur = await query(`SELECT content FROM pages WHERE id=$1 AND type='brand'`, [id]);
  if (!cur.rows[0]) return res.status(404).json({ error: 'Specialization not found.' });
  const content = specContent(cur.rows[0].content, f);
  try {
    const { rows } = await query(
      `UPDATE pages SET path=$2, nav_label=$3, title=$4, meta_description=$5, h1=$6, subtitle=$7,
              card_image=$8, body_html=$9, content=$10::jsonb, published=$11, sort_order=$12, updated_at=now()
        WHERE id=$1 AND type='brand'
        RETURNING id, path, type, nav_label, title, meta_description, h1, subtitle, card_image, content, body_html, published, sort_order, updated_at`,
      [id, f.path, f.nav_label, f.title, f.meta_description, f.h1, f.subtitle, f.card_image, f.body_html, JSON.stringify(content), f.published, f.sort_order],
    );
    res.json(serviceBody(rows[0]));
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A page already exists at that URL.' });
    throw e;
  }
}));

admin.delete('/specializations/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rowCount } = await query(`DELETE FROM pages WHERE id = $1 AND type = 'brand'`, [id]);
  if (!rowCount) return res.status(404).json({ error: 'Specialization not found.' });
  res.json({ ok: true });
}));

const CATEGORIES = [
  { slug: 'care-tips', name: 'Care Tips' },
  { slug: 'maintenance', name: 'Maintenance' },
  { slug: 'uncategorized', name: 'Uncategorized' },
  { slug: 'auto-service', name: 'Auto Service' },
];

admin.get('/categories', (_req, res) => res.json(CATEGORIES));

admin.get('/posts', wrap(async (_req, res) => {
  const { rows } = await query(
    `SELECT id, category_slug, category_name, slug, title, excerpt, image, published, published_at, updated_at
       FROM posts ORDER BY published_at DESC, id DESC`,
  );
  res.json(rows.map((r) => ({ ...r, path: postPath(r) })));
}));

admin.get('/posts/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rows } = await query(
    `SELECT id, category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, content, body_html, published, published_at, updated_at
       FROM posts WHERE id = $1`,
    [id],
  );
  if (!rows[0]) return res.status(404).json({ error: 'Post not found.' });
  const r = rows[0];
  res.json({ ...stripCaptureFields(r), path: postPath(r), body_html: r.body_html || contentToHtml(r.content) });
}));

function postFields(b) {
  const cat = CATEGORIES.find((c) => c.slug === b.category_slug) || CATEGORIES[0];
  const slug = slugify(b.slug || b.title || '');
  if (!slug) throw Object.assign(new Error('Please enter a slug.'), { status: 400 });
  return {
    category_slug: cat.slug,
    category_name: cat.name,
    slug,
    title: String(b.title || '').trim().slice(0, 200) || 'Untitled',
    seo_title: String(b.seo_title || b.title || '').trim().slice(0, 160) || null,
    meta_description: String(b.meta_description || '').trim().slice(0, 320) || null,
    excerpt: String(b.excerpt || '').trim().slice(0, 400) || null,
    image: safeMediaUrl(b.image),
    body_html: cleanBody(b.body_html),
    published: b.published !== false,
    published_at: b.published_at ? new Date(b.published_at) : new Date(),
  };
}

admin.post('/posts', wrap(async (req, res) => {
  const f = postFields(req.body || {});
  if (Number.isNaN(f.published_at.getTime())) return res.status(400).json({ error: 'Invalid publish date.' });
  try {
    const { rows } = await query(
      `INSERT INTO posts (category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, body_html, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, content, body_html, published, published_at, updated_at`,
      [f.category_slug, f.category_name, f.slug, f.title, f.seo_title, f.meta_description, f.excerpt, f.image, f.body_html, f.published, f.published_at],
    );
    res.status(201).json({ ...stripCaptureFields(rows[0]), path: postPath(rows[0]) });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A post already exists with that category and slug.' });
    throw e;
  }
}));

admin.put('/posts/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const f = postFields(req.body || {});
  if (Number.isNaN(f.published_at.getTime())) return res.status(400).json({ error: 'Invalid publish date.' });
  const cur = await query('SELECT category_slug, category_name FROM posts WHERE id = $1', [id]);
  if (cur.rows[0]?.category_slug?.startsWith('а') && f.category_slug === 'auto-service') {
    f.category_slug = cur.rows[0].category_slug;
    f.category_name = cur.rows[0].category_name;
  }
  try {
    const { rows } = await query(
      `UPDATE posts SET category_slug=$2, category_name=$3, slug=$4, title=$5, seo_title=$6, meta_description=$7,
              excerpt=$8, image=$9, body_html=$10, published=$11, published_at=$12, updated_at=now()
        WHERE id=$1
        RETURNING id, category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, content, body_html, published, published_at, updated_at`,
      [id, f.category_slug, f.category_name, f.slug, f.title, f.seo_title, f.meta_description, f.excerpt, f.image, f.body_html, f.published, f.published_at],
    );
    if (!rows[0]) return res.status(404).json({ error: 'Post not found.' });
    res.json({ ...stripCaptureFields(rows[0]), path: postPath(rows[0]) });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A post already exists with that category and slug.' });
    throw e;
  }
}));

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary'];

function jobFields(b) {
  const slug = slugify(b.slug || b.title || '');
  if (!slug) throw Object.assign(new Error('Please enter a URL slug.'), { status: 400 });
  if (RESERVED_SLUGS.has(slug) || slug === 'careers') throw Object.assign(new Error('That URL is reserved.'), { status: 400 });
  const type = JOB_TYPES.includes(b.employment_type) ? b.employment_type : 'Full-time';
  return {
    slug,
    title: String(b.title || '').trim().slice(0, 160) || 'Untitled role',
    seo_title: String(b.seo_title || b.title || '').trim().slice(0, 60) || null,
    meta_description: String(b.meta_description || '').trim().slice(0, 145) || null,
    excerpt: String(b.excerpt || '').trim().slice(0, 400) || null,
    department: String(b.department || '').trim().slice(0, 80) || null,
    employment_type: type,
    location: String(b.location || 'Dubai Investment Park 2, Dubai').trim().slice(0, 160),
    body_html: cleanBody(b.body_html),
    published: b.published !== false && b.published !== 'false',
    sort_order: Number.isFinite(+b.sort_order) ? Math.max(0, Math.min(9999, +b.sort_order)) : 50,
  };
}

const JOB_OUT = `id, slug, title, seo_title, meta_description, excerpt, department, employment_type, location, body_html, published, sort_order, published_at, updated_at`;

admin.get('/jobs', wrap(async (_req, res) => {
  const { rows } = await query(`SELECT ${JOB_OUT} FROM jobs ORDER BY sort_order, id`);
  res.json(rows.map((r) => ({ ...r, path: `/careers/${r.slug}/` })));
}));

admin.get('/jobs/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rows } = await query(`SELECT ${JOB_OUT} FROM jobs WHERE id = $1`, [id]);
  if (!rows[0]) return res.status(404).json({ error: 'Job not found.' });
  res.json({ ...rows[0], path: `/careers/${rows[0].slug}/` });
}));

admin.post('/jobs', wrap(async (req, res) => {
  const f = jobFields(req.body || {});
  try {
    const { rows } = await query(
      `INSERT INTO jobs (slug, title, seo_title, meta_description, excerpt, department, employment_type, location, body_html, published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING ${JOB_OUT}`,
      [f.slug, f.title, f.seo_title, f.meta_description, f.excerpt, f.department, f.employment_type, f.location, f.body_html, f.published, f.sort_order],
    );
    res.status(201).json({ ...rows[0], path: `/careers/${rows[0].slug}/` });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A job already exists with that URL slug.' });
    throw e;
  }
}));

admin.put('/jobs/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const f = jobFields(req.body || {});
  try {
    const { rows } = await query(
      `UPDATE jobs SET slug=$2, title=$3, seo_title=$4, meta_description=$5, excerpt=$6, department=$7,
              employment_type=$8, location=$9, body_html=$10, published=$11, sort_order=$12, updated_at=now()
        WHERE id=$1
        RETURNING ${JOB_OUT}`,
      [id, f.slug, f.title, f.seo_title, f.meta_description, f.excerpt, f.department, f.employment_type, f.location, f.body_html, f.published, f.sort_order],
    );
    if (!rows[0]) return res.status(404).json({ error: 'Job not found.' });
    res.json({ ...rows[0], path: `/careers/${rows[0].slug}/` });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'A job already exists with that URL slug.' });
    throw e;
  }
}));

admin.post('/jobs/:id/toggle', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rows } = await query(
    `UPDATE jobs SET published = NOT published, updated_at=now() WHERE id=$1 RETURNING ${JOB_OUT}`,
    [id],
  );
  if (!rows[0]) return res.status(404).json({ error: 'Job not found.' });
  res.json({ ...rows[0], path: `/careers/${rows[0].slug}/` });
}));

admin.delete('/jobs/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rowCount } = await query(`DELETE FROM jobs WHERE id = $1`, [id]);
  if (!rowCount) return res.status(404).json({ error: 'Job not found.' });
  res.json({ ok: true });
}));

admin.delete('/posts/:id', wrap(async (req, res) => {
  const id = intId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id.' });
  const { rowCount } = await query(`DELETE FROM posts WHERE id = $1`, [id]);
  if (!rowCount) return res.status(404).json({ error: 'Post not found.' });
  res.json({ ok: true });
}));

admin.use((err, _req, res, _next) => {
  if (err.status && err.status < 500) return res.status(err.status).json({ error: publicError(err) });
  if (err instanceof multer.MulterError) return res.status(400).json({ error: 'Upload failed. Use a smaller image file.' });
  console.error(redact(err?.stack || err?.message || err));
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});
