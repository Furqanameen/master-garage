// One-shot: copy leftover /wp-content/uploads files to SEO /images/ names,
// rewrite DB + seed files, and write server/src/mediaRedirects.json for 301s.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../src/db.js';
import { config } from '../src/config.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(config.serverRoot, 'seed', 'data');
const mapFile = path.join(config.serverRoot, 'src', 'mediaRedirects.json');
const PREFIX = 'master-mechanics-garage-';

const EXISTING = {
  '/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-15-at-19.41.05-2.jpeg': '/images/master-mechanics-garage-car-service-dubai-dip.jpg',
  '/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-01-at-12.06.29.jpeg': '/images/master-mechanics-garage-workshop-dubai-dip.jpg',
  '/wp-content/uploads/2025/05/mm-logo.png': '/images/master-mechanics-garage-logo.png',
  '/wp-content/uploads/2024/08/cropped-favicon-270x270.png': '/images/master-mechanics-garage-favicon.png',
};

const HINTS = {
  '2024/08/toyota-removebg-preview.png': 'toyota-service-dubai',
  '2024/08/suzuki-removebg-preview.png': 'suzuki-service-dubai',
  '2024/08/nissan-removebg-preview.png': 'nissan-service-dubai',
  '2024/08/mitsu-removebg-preview.png': 'mitsubishi-service-dubai',
  '2024/08/lexus-removebg-preview.png': 'lexus-service-dubai',
  '2025/05/honda.png': 'honda-service-dubai',
  '2024/08/infiniti-removebg-preview-300x162.png': 'infiniti-service-dubai',
  '2024/08/mazda-removebg-preview.png': 'mazda-service-dubai',
  '2024/08/5.png': 'ford-service-dubai',
  '2025/05/GMC-Logo.avif': 'gmc-service-dubai',
  '2024/09/z-1.jpeg': 'chevrolet-service-dubai',
  '2024/09/x.png': 'american-car-brand-service-dubai',
  '2024/09/z-300x144.jpeg': 'american-car-brand-service-dubai-2',
  '2024/08/1.png': 'american-car-brand-service-dubai-3',
  '2024/08/6.jpeg': 'bmw-service-dubai',
  '2024/08/5-1.png': 'german-car-brand-service-dubai',
  '2024/08/4.jpeg': 'german-car-brand-service-dubai-2',
  '2025/05/merc.jpg': 'mercedes-benz-service-dubai',
  '2024/08/1.jpeg': 'german-car-brand-service-dubai-3',
  '2025/05/audi-removebg-preview.png': 'audi-service-dubai',
  '2025/05/HS982_003ARkddtlvgsrpv1koogosqjbavf96__mid.jpg': 'european-car-brand-service-dubai',
  '2024/08/2-1.png': 'european-car-brand-service-dubai-2',
  '2024/08/3.png': 'european-car-brand-service-dubai-3',
  '2024/08/5-2.png': 'european-car-brand-service-dubai-4',
  '2024/08/6-1.jpeg': 'european-car-brand-service-dubai-5',
  '2024/08/7.jpeg': 'european-car-brand-service-dubai-6',
  '2024/08/8.jpeg': 'european-car-brand-service-dubai-7',
  '2024/09/download-removebg-preview.png': 'european-car-brand-service-dubai-8',
  '2024/10/vaux.jpeg': 'vauxhall-service-dubai',
  '2024/10/tvr.png': 'tvr-service-dubai',
  '2024/10/tri.png': 'triumph-service-dubai',
  '2024/10/morgan.png': 'morgan-service-dubai',
  '2024/10/minni.jpeg': 'mini-cooper-service-dubai',
  '2024/10/mac.png': 'car-brand-service-dubai',
  '2024/10/grin.png': 'car-brand-service-dubai-2',
  '2024/10/ac.png': 'ac-cars-service-dubai',
  '2025/06/technician.png': 'expert-technicians',
  '2025/06/spare-parts.png': 'advanced-equipment',
  '2025/06/toolbox.png': 'genuine-spare-parts',
  '2025/06/price-comparison.png': 'transparent-pricing',
  '2025/06/good-feedback.png': 'customer-satisfaction',
  '2025/06/car-AC-repair-work.jpg': 'car-ac-repair-dubai-dip',
  '2025/06/Car-electrical-work.png': 'car-electrical-repair-dubai-dip',
  '2025/06/car-engine-work.jpg': 'car-engine-repair-dubai-dip',
  '2025/06/Fuel-Injection-work.jpg': 'fuel-injector-service-dubai-dip',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.40.57-1.jpeg': 'car-maintenance-dubai-dip',
  '2025/01/Engine-sensor-repair-in-Dubai-1-scaled.jpg': 'engine-sensor-repair-dubai',
  '2025/06/car-dent-paint.jpg': 'car-denting-painting-dubai-dip',
  '2025/06/wheel-balancing.jpg': 'wheel-alignment-balancing-dubai-dip',
  '2021/07/th-31775804390-1344x966-1.jpg': 'spare-parts-dubai-dip',
  '2025/09/mercedes_service.jpg': 'mercedes-service-dubai-dip',
  '2024/11/best-auto-workshops.jpg': 'best-auto-workshop-dubai',
  '2025/05/Best-Car-wheel-balancing-in-DIP.jpeg': 'car-wheel-balancing-dubai-dip',
  '2025/05/Auto-parts-retailer-UAE.jpg': 'auto-parts-dubai',
  '2025/05/image_1162113364.webp': 'car-service-dubai-dip',
  '2025/03/maxresdefault.jpg': 'car-service-workshop-dubai',
  '2025/04/diploma.webp': 'technician-certificate',
  '2025/04/motor-1.jpg': 'car-engine-dubai',
  '2025/04/motor-1024x576.jpg': 'car-engine-dubai-2',
  '2025/04/oli-kompresor-ac-mobil-3.jpg': 'car-ac-compressor-dubai',
  '2025/04/z.png': 'car-brand-logo',
  '2025/05/i.webp': 'car-service-dubai',
  '2025/04/0_TuTRozReQtz-MW3-1.jpg': 'auto-repair-dubai',
  '2024/08/cropped-favicon.png': 'favicon',
};

const WHATSAPP = [
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.05.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.02-1-1.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.01-2.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.04-1-1.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.00.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.04.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.03.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.40.59-2.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.40.59-1.jpeg',
  '2024/09/WhatsApp-Image-2024-09-15-at-19.41.00-1.jpeg',
];
WHATSAPP.forEach((rel, i) => { HINTS[rel] = `workshop-dubai-dip-${i + 2}`; });

const re = /\/wp-content\/uploads\/[A-Za-z0-9_\-./%()+]+\.(?:png|jpe?g|webp|avif|gif|svg|ico)/gi;
const found = new Set(Object.keys(EXISTING));
const scan = (v) => { for (const m of String(v ?? '').matchAll(re)) found.add(m[0].replace(/\\/g, '')); };

function slugify(name) {
  return name
    .replace(/WhatsApp-Image-\d{4}-\d{2}-\d{2}-at-[\d.]+/gi, 'workshop-dubai-dip')
    .replace(/removebg-preview/gi, '')
    .replace(/-scaled\b/gi, '')
    .replace(/-\d{3,4}x\d{3,4}\b/g, '')
    .replace(/cropped-/gi, '')
    .replace(/elementor\/thumbs\/mm-logo.*/i, 'logo')
    .replace(/\.[a-z0-9]+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    || 'image';
}

const takenBy = new Map(Object.entries(EXISTING).map(([from, to]) => [to, from]));

function destFor(oldUrl) {
  if (EXISTING[oldUrl]) return EXISTING[oldUrl];
  if (/elementor\/thumbs\/mm-logo/i.test(oldUrl)) return '/images/master-mechanics-garage-logo.png';
  const rel = oldUrl.replace(/^\/wp-content\/uploads\//, '');
  let extNorm = (path.extname(oldUrl) || '.jpg').toLowerCase();
  if (extNorm === '.jpeg') extNorm = '.jpg';
  let stem = HINTS[rel] || slugify(path.basename(oldUrl));
  if (!stem.startsWith('master-mechanics-garage')) stem = PREFIX + stem;
  let dest = `/images/${stem}${extNorm}`;
  let n = 2;
  while (takenBy.has(dest) && takenBy.get(dest) !== oldUrl) {
    dest = `/images/${stem}-${n}${extNorm}`;
    n += 1;
  }
  takenBy.set(dest, oldUrl);
  return dest;
}

for (const r of (await pool.query('SELECT hero_image, card_image, content, body_html, excerpt FROM pages')).rows) scan(JSON.stringify(r));
for (const r of (await pool.query('SELECT image, content, body_html, excerpt FROM posts')).rows) scan(JSON.stringify(r));
for (const r of (await pool.query('SELECT image FROM gallery_images')).rows) scan(JSON.stringify(r));
try { for (const r of (await pool.query('SELECT body_html FROM jobs')).rows) scan(JSON.stringify(r)); } catch { /* optional */ }

for (const name of ['wp-dump.json', 'original.js', 'posts.js', 'seoOverlay.js', 'seoPages.js']) {
  try { scan(await fs.readFile(path.join(seedDir, name), 'utf8')); } catch { /* missing */ }
}

const mapping = { ...EXISTING };
const urls = [...found].sort();
for (const oldUrl of urls) mapping[oldUrl] = destFor(oldUrl);

await fs.mkdir(path.join(config.publicDir, 'images'), { recursive: true });
let copied = 0; let missing = 0;
for (const [from, to] of Object.entries(mapping)) {
  const src = path.join(config.publicDir, decodeURIComponent(from));
  const dest = path.join(config.publicDir, to);
  try {
    await fs.access(src);
  } catch {
    missing += 1;
    continue;
  }
  try {
    await fs.access(dest);
    continue;
  } catch { /* copy */ }
  await fs.copyFile(src, dest);
  copied += 1;
}

await fs.writeFile(mapFile, JSON.stringify(mapping, null, 2) + '\n');

const pairs = Object.entries(mapping).sort((a, b) => b[0].length - a[0].length);
function rewrite(text) {
  let out = text.replace(/\$\{U\}\/([^`'"\s,)]+)/g, (_, rel) => {
    const to = mapping[`/wp-content/uploads/${rel}`];
    return to ? `'${to}'` : `\${U}/${rel}`;
  });
  for (const [from, to] of pairs) {
    if (from === to) continue;
    out = out.split(from).join(to);
  }
  return out;
}

const client = await pool.connect();
try {
  await client.query('BEGIN');
  for (const [from, to] of pairs) {
    await client.query('UPDATE pages SET hero_image = $2 WHERE hero_image = $1', [from, to]);
    await client.query('UPDATE pages SET card_image = $2 WHERE card_image = $1', [from, to]);
    await client.query(`UPDATE pages SET body_html = REPLACE(body_html, $1, $2) WHERE body_html LIKE $3`, [from, to, `%${from}%`]);
    await client.query(`UPDATE pages SET content = REPLACE(content::text, $1, $2)::jsonb WHERE content::text LIKE $3`, [from, to, `%${from}%`]);
    await client.query('UPDATE posts SET image = $2 WHERE image = $1', [from, to]);
    await client.query(`UPDATE posts SET body_html = REPLACE(body_html, $1, $2) WHERE body_html LIKE $3`, [from, to, `%${from}%`]);
    await client.query(`UPDATE posts SET content = REPLACE(content::text, $1, $2)::jsonb WHERE content::text LIKE $3`, [from, to, `%${from}%`]);
    await client.query('UPDATE gallery_images SET image = $2 WHERE image = $1', [from, to]);
    try { await client.query(`UPDATE jobs SET body_html = REPLACE(body_html, $1, $2) WHERE body_html LIKE $3`, [from, to, `%${from}%`]); } catch { /* optional */ }
  }
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}

for (const name of ['wp-dump.json', 'original.js', 'posts.js', 'seoOverlay.js', 'seoPages.js']) {
  const file = path.join(seedDir, name);
  try {
    const before = await fs.readFile(file, 'utf8');
    const after = rewrite(before);
    if (after !== before) await fs.writeFile(file, after);
  } catch { /* missing */ }
}

const leftover = [];
scan('');
const check = await pool.query(`
  SELECT 'pages' AS t, count(*)::int AS n FROM pages
   WHERE coalesce(hero_image,'') LIKE '%/wp-content/%' OR coalesce(card_image,'') LIKE '%/wp-content/%'
      OR coalesce(body_html,'') LIKE '%/wp-content/%' OR content::text LIKE '%/wp-content/%'
  UNION ALL
  SELECT 'posts', count(*)::int FROM posts
   WHERE coalesce(image,'') LIKE '%/wp-content/%' OR coalesce(body_html,'') LIKE '%/wp-content/%'
  UNION ALL
  SELECT 'gallery', count(*)::int FROM gallery_images WHERE image LIKE '%/wp-content/%'
`);
console.log(JSON.stringify({ urls: urls.length, copied, missing, mapFile, db: check.rows }, null, 2));
await pool.end();
