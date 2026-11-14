import pg from 'pg';
import { config } from './config.js';

export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: config.databaseSsl ? { rejectUnauthorized: false } : undefined,
  max: 10,
});

export const query = (text, params) => pool.query(text, params);

pool.on('error', (err) => {
  console.error('Database pool error');
  if (process.env.NODE_ENV !== 'production') console.error(err.code || err.message);
});
