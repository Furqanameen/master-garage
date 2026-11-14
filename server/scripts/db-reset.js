// DESTRUCTIVE: drops all site tables (pages, posts, faqs, gallery_images, leads, redirects).
// Refuses to run when NODE_ENV=production unless CONFIRM_RESET=yes.
import { pool } from '../src/db.js';

if (process.env.NODE_ENV === 'production' && process.env.CONFIRM_RESET !== 'yes') {
  console.error('Refusing to reset a production database. Set CONFIRM_RESET=yes to override.');
  process.exit(1);
}
await pool.query('DROP TABLE IF EXISTS pages, posts, faqs, gallery_images, jobs, leads, redirects CASCADE');
console.log('✔ Tables dropped.');
await pool.end();
