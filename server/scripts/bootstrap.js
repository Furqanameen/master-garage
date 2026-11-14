// Production-safe start-up step:  creates tables (idempotent) and seeds ONLY if the database is empty.
// Never overwrites content you've edited. Run automatically by Docker; or manually: npm run bootstrap
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../src/config.js';
import { pool } from '../src/db.js';

async function waitForDb(tries = 30) {
  for (let i = 1; i <= tries; i++) {
    try { await pool.query('SELECT 1'); return; } catch (e) {
      if (i === tries) throw e;
      console.log(`Waiting for PostgreSQL… (${i}/${tries})`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

await waitForDb();
await pool.query(fs.readFileSync(path.join(config.serverRoot, 'sql', 'schema.sql'), 'utf8'));
const { rows } = await pool.query('SELECT count(*)::int AS n FROM pages');
await pool.end();

if (rows[0].n === 0) {
  console.log('Empty database – seeding…');
  const r = spawnSync(process.execPath, [path.join(config.serverRoot, 'seed', 'index.js')], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
} else {
  console.log(`Database already has ${rows[0].n} pages – skipping seed.`);
}
