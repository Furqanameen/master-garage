import fs from 'node:fs';
import path from 'node:path';
import { config } from '../src/config.js';
import { pool } from '../src/db.js';

const sql = fs.readFileSync(path.join(config.serverRoot, 'sql', 'schema.sql'), 'utf8');
await pool.query(sql);
console.log('✔ Database schema is ready.');
await pool.end();
