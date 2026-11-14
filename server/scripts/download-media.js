// Downloads every /wp-content/uploads/... image this app references into server/public/.
//   npm run media:download
// Safe to re-run (skips files already on disk).
import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from '../src/db.js';
import { config } from '../src/config.js';
import { site } from '../src/site.js';

const ORIGIN = config.mediaFallbackBase;
const found = new Set();
const re = /\/wp-content\/uploads\/[A-Za-z0-9_\-./%()+]+\.(?:png|jpe?g|webp|avif|gif|svg|ico)/gi;
const scan = (v) => { for (const m of JSON.stringify(v ?? '').matchAll(re)) found.add(m[0].replace(/\\/g, '')); };

scan(site);
for (const r of (await pool.query('SELECT hero_image, card_image, content, body_html, excerpt FROM pages')).rows) scan(r);
for (const r of (await pool.query('SELECT image, content, body_html, excerpt FROM posts')).rows) scan(r);
for (const r of (await pool.query('SELECT image FROM gallery_images')).rows) scan(r);
try {
  for (const r of (await pool.query('SELECT body_html FROM jobs')).rows) scan(r);
} catch { /* jobs optional */ }

const seedDir = path.join(config.serverRoot, 'seed', 'data');
for (const name of ['wp-dump.json', 'original.js', 'posts.js', 'seoOverlay.js', 'seoPages.js', 'specializations.js']) {
  try { scan(await fs.readFile(path.join(seedDir, name), 'utf8')); } catch { /* missing */ }
}

console.log(`Found ${found.size} image URLs.`);
let ok = 0, skipped = 0;
const failed = [];
const queue = [...found];

await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const url = queue.pop();
    const dest = path.join(config.publicDir, decodeURIComponent(url));
    try { await fs.access(dest); skipped++; continue; } catch { /* needs download */ }
    try {
      const res = await fetch(ORIGIN + url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const ctype = (res.headers.get('content-type') || '').toLowerCase();
      if (ctype.includes('text/html')) throw new Error('HTML not an image');
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 20) throw new Error('empty file');
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, buf);
      ok++;
    } catch (e) { failed.push(`${url} (${e.message})`); }
  }
}));

console.log(`✔ downloaded ${ok}, already present ${skipped}, failed ${failed.length}`);
failed.forEach((f) => console.log('  ✖', f));
await pool.end();
