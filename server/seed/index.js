import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../src/db.js';
import { buildAll } from './build.js';

const { pages, posts, faqs, gallery, jobs } = buildAll();
const dumpFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'wp-dump.json');
const dump = fs.existsSync(dumpFile) ? JSON.parse(fs.readFileSync(dumpFile, 'utf8')) : { pages: [], posts: [] };
const client = await pool.connect();

try {
  await client.query('BEGIN');

  for (const p of pages) {
    await client.query(
      `INSERT INTO pages (path, type, nav_label, in_menu, title, meta_description, h1, subtitle,
                          hero_image, card_image, excerpt, content, faq, noindex, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (path) DO UPDATE SET
         type=EXCLUDED.type, nav_label=EXCLUDED.nav_label, in_menu=EXCLUDED.in_menu, title=EXCLUDED.title,
         meta_description=EXCLUDED.meta_description, h1=EXCLUDED.h1, subtitle=EXCLUDED.subtitle,
         hero_image=EXCLUDED.hero_image, card_image=EXCLUDED.card_image, excerpt=EXCLUDED.excerpt,
         content=EXCLUDED.content, faq=EXCLUDED.faq, noindex=EXCLUDED.noindex, sort_order=EXCLUDED.sort_order,
         updated_at=now()`,
      [p.path, p.type, p.nav_label, p.in_menu, p.title, p.meta_description, p.h1, p.subtitle,
        p.hero_image, p.card_image, p.excerpt, JSON.stringify(p.content), JSON.stringify(p.faq), p.noindex, p.sort_order],
    );
  }

  for (const p of posts) {
    await client.query(
      `INSERT INTO posts (category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, content, faq, published_at, body_html)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (category_slug, slug) DO UPDATE SET
         category_name=EXCLUDED.category_name, title=EXCLUDED.title, seo_title=EXCLUDED.seo_title,
         meta_description=EXCLUDED.meta_description, excerpt=EXCLUDED.excerpt, image=EXCLUDED.image,
         content=EXCLUDED.content, faq=EXCLUDED.faq, body_html=COALESCE(EXCLUDED.body_html, posts.body_html),
         published_at=EXCLUDED.published_at, updated_at=now()`,
      [p.category_slug, p.category_name, p.slug, p.title, p.seo_title, p.meta_description, p.excerpt, p.image,
        JSON.stringify(p.content || {}), JSON.stringify(p.faq || []), p.published_at, p.body_html || null],
    );
  }

  // Page/post HTML copied into seed/data/wp-dump.json (home/contact/about/booking skip this).
  let wpPages = 0, wpPosts = 0;
  const skipWpBody = new Set(['/', '/workshop/', '/appointment/', '/booking/', '/spare-parts/', '/services/', '/blog/', '/faq/', '/gallery/', '/contact/', '/about/']);
  for (const p of dump.pages || []) {
    if (!p.body_html || skipWpBody.has(p.path)) continue;
    const { rowCount } = await client.query(
      `UPDATE pages SET body_html = $2, updated_at = now()
        WHERE path = $1 AND type IN ('static','service')`,
      [p.path, p.body_html],
    );
    if (rowCount) { wpPages++; continue; }
    const { rows } = await client.query('SELECT 1 FROM pages WHERE path = $1', [p.path]);
    if (rows.length) continue;
    await client.query(
      `INSERT INTO pages (path, type, title, meta_description, h1, body_html, content)
       VALUES ($1,'static',$2,$3,$4,$5,'{}'::jsonb)
       ON CONFLICT (path) DO NOTHING`,
      [p.path, p.title || p.wpTitle || 'Master Mechanics', p.description, p.wpTitle, p.body_html],
    );
    wpPages++;
  }
  for (const p of dump.posts || []) {
    const { rowCount } = await client.query(
      `UPDATE posts SET body_html=$3, published_at=COALESCE($4, published_at),
              image=COALESCE($5, image), updated_at=now()
        WHERE slug=$2 AND translate(category_slug, U&'\\0430', 'a') = translate($1, U&'\\0430', 'a')`,
      [p.category_slug, p.slug, p.body_html, p.published_at, p.image],
    );
    if (rowCount) { wpPosts++; continue; }
    await client.query(
      `INSERT INTO posts (category_slug, category_name, slug, title, seo_title, meta_description, excerpt, image, body_html, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (category_slug, slug) DO NOTHING`,
      [p.category_slug, p.category_name, p.slug, p.title, p.seo_title, p.meta_description, p.excerpt, p.image, p.body_html, p.published_at],
    );
    wpPosts++;
  }

  for (const j of jobs || []) {
    await client.query(
      `INSERT INTO jobs (slug, title, seo_title, meta_description, excerpt, department, employment_type, location, body_html, published, sort_order, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now())
       ON CONFLICT (slug) DO UPDATE SET
         title=EXCLUDED.title, seo_title=EXCLUDED.seo_title, meta_description=EXCLUDED.meta_description,
         excerpt=EXCLUDED.excerpt, department=EXCLUDED.department, employment_type=EXCLUDED.employment_type,
         location=EXCLUDED.location, body_html=EXCLUDED.body_html, published=EXCLUDED.published,
         sort_order=EXCLUDED.sort_order, updated_at=now()`,
      [j.slug, j.title, j.seo_title, j.meta_description, j.excerpt, j.department, j.employment_type, j.location,
        j.body_html, j.published !== false, j.sort_order || 0],
    );
  }

  await client.query('DELETE FROM faqs');
  for (const [i, f] of faqs.entries()) {
    await client.query('INSERT INTO faqs (question, answer, sort_order) VALUES ($1,$2,$3)', [f.question, f.answer, i]);
  }

  for (const g of gallery) {
    await client.query(
      `INSERT INTO gallery_images (image, alt, sort_order) VALUES ($1,$2,$3)
       ON CONFLICT (image) DO UPDATE SET alt=EXCLUDED.alt, sort_order=EXCLUDED.sort_order`,
      [g.image, g.alt, g.sort_order],
    );
  }

  // /blog/auto-service/... (latin "a") -> the live URL that uses the Cyrillic "а"
  for (const p of posts.filter((x) => x.category_slug.startsWith('а'))) {
    await client.query(
      `INSERT INTO redirects (from_path, to_path, status) VALUES ($1,$2,301)
       ON CONFLICT (from_path) DO UPDATE SET to_path=EXCLUDED.to_path`,
      [`/blog/auto-service/${p.slug}/`, `/blog/${p.category_slug}/${p.slug}/`],
    );
  }
  await client.query(
    `INSERT INTO redirects (from_path, to_path, status) VALUES ($1,$2,301)
     ON CONFLICT (from_path) DO UPDATE SET to_path=EXCLUDED.to_path`,
    ['/blog/category/auto-service/', '/blog/category/аuto-service/'],
  );
  await client.query(`DELETE FROM pages WHERE path = '/appointment/'`);
  await client.query(
    `INSERT INTO redirects (from_path, to_path, status) VALUES ($1,$2,301)
     ON CONFLICT (from_path) DO UPDATE SET to_path=EXCLUDED.to_path, status=EXCLUDED.status`,
    ['/appointment/', '/booking/'],
  );
  await client.query(
    `INSERT INTO redirects (from_path, to_path, status) VALUES ($1,$2,301)
     ON CONFLICT (from_path) DO UPDATE SET to_path=EXCLUDED.to_path, status=EXCLUDED.status`,
    ['/car-service-centre-in-dubai-investment-park-dip-auto-workshop/', '/car-service-dubai-investment-park/'],
  );

  await client.query('COMMIT');
  console.log(`✔ Seeded ${pages.length} pages, ${posts.length} posts, ${(jobs || []).length} jobs, ${faqs.length} FAQs, ${gallery.length} gallery images.`);
  console.log(`✔ Applied HTML copy to ${wpPages} pages and ${wpPosts} posts.`);
} catch (e) {
  await client.query('ROLLBACK');
  console.error('Seed failed:', e);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
