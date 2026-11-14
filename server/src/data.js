import { query } from './db.js';
import { foldLookalikes } from './lib/html.js';

const PAGE_COLS = `id, path, type, nav_label, in_menu, title, meta_description, h1, subtitle,
  hero_image, card_image, excerpt, content, body_html, faq, noindex, sort_order, updated_at`;

export async function getPageByPath(path) {
  const { rows } = await query(
    `SELECT ${PAGE_COLS} FROM pages WHERE path = $1 AND published`,
    [path],
  );
  return rows[0] || null;
}

export async function listPagesByType(type) {
  const { rows } = await query(
    `SELECT path, nav_label, title, h1, excerpt, card_image, hero_image, in_menu,
            content->>'keywords' AS keywords
       FROM pages WHERE type = $1 AND published ORDER BY sort_order, id`,
    [type],
  );
  return rows;
}

export async function getNav() {
  const [service, brand, location] = await Promise.all([
    listPagesByType('service'),
    listPagesByType('brand'),
    listPagesByType('location'),
  ]);
  const pick = (r) => ({
    label: r.nav_label || r.h1 || r.title,
    path: r.path,
    logo: r.card_image || null,
    keyword: String(r.keywords || '').split(',')[0].trim() || r.nav_label || r.h1 || r.title,
  });
  return {
    menuServices: service.filter((s) => s.in_menu).map(pick),
    services: service.map(pick),
    brands: brand.map(pick),
    locations: location.map(pick),
  };
}

const POST_COLS = `id, category_slug, category_name, slug, title, seo_title, meta_description, excerpt,
  image, content, body_html, faq, published_at, updated_at`;

export const postPath = (p) => `/blog/${p.category_slug}/${p.slug}/`;

export async function getPost(category, slug) {
  const { rows } = await query(
    `SELECT ${POST_COLS} FROM posts
      WHERE published AND slug = $2
        AND translate(category_slug, U&'\\0430', 'a') = $1`,
    [foldLookalikes(category), slug],
  );
  return rows[0] || null;
}

export async function listPosts(category) {
  const params = [];
  let sql = `SELECT category_slug, category_name, slug, title, excerpt, image, published_at
               FROM posts WHERE published`;
  if (category) {
    params.push(foldLookalikes(category));
    sql += ` AND translate(category_slug, U&'\\0430', 'a') = $1`;
  }
  sql += ' ORDER BY published_at DESC, id DESC';
  const { rows } = await query(sql, params);
  return rows.map((r) => ({ ...r, path: postPath(r) }));
}

export async function listFaqs() {
  const { rows } = await query('SELECT question, answer FROM faqs ORDER BY sort_order, id');
  return rows;
}

export async function listGallery() {
  const { rows } = await query('SELECT image, alt FROM gallery_images ORDER BY sort_order, id');
  return rows;
}

export const jobPath = (j) => `/careers/${j.slug}/`;

const JOB_COLS = `id, slug, title, seo_title, meta_description, excerpt, department, employment_type,
  location, body_html, published, sort_order, published_at, updated_at`;

export async function listJobs({ includeInactive = false } = {}) {
  const { rows } = await query(
    `SELECT ${JOB_COLS} FROM jobs ${includeInactive ? '' : 'WHERE published'} ORDER BY sort_order, published_at DESC, id`,
  );
  return rows.map((r) => ({ ...r, path: jobPath(r) }));
}

export async function getJob(slug, { includeInactive = false } = {}) {
  const { rows } = await query(
    `SELECT ${JOB_COLS} FROM jobs WHERE slug = $1 ${includeInactive ? '' : 'AND published'}`,
    [slug],
  );
  return rows[0] ? { ...rows[0], path: jobPath(rows[0]) } : null;
}

export async function sitemapEntries() {
  const [pages, posts, jobs] = await Promise.all([
    query(`SELECT path, type, updated_at FROM pages WHERE published AND NOT noindex ORDER BY sort_order, id`),
    query(`SELECT category_slug, slug, updated_at FROM posts WHERE published ORDER BY published_at DESC`),
    query(`SELECT slug, updated_at FROM jobs WHERE published ORDER BY sort_order, id`),
  ]);
  return [
    ...pages.rows.map((r) => ({ path: r.path, type: r.type, lastmod: r.updated_at })),
    ...posts.rows.map((r) => ({ path: postPath(r), type: 'post', lastmod: r.updated_at })),
    ...jobs.rows.map((r) => ({ path: jobPath(r), type: 'job', lastmod: r.updated_at })),
  ];
}

export async function findRedirect(path) {
  const { rows } = await query('SELECT to_path, status FROM redirects WHERE from_path = $1', [path]);
  return rows[0] || null;
}

export async function insertLead(l) {
  const { rows } = await query(
    `INSERT INTO leads (name, phone, email, service, vehicle, message, source_page)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [l.name, l.phone, l.email, l.service, l.vehicle, l.message, l.source_page],
  );
  return rows[0].id;
}

