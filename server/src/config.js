import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(here, '..');
dotenv.config({ path: path.join(serverRoot, '.env') });
const prod = process.env.NODE_ENV === 'production';

function assertAdminSecrets() {
  const pass = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.SESSION_SECRET || '';
  const weakPass = !pass || pass.length < 12 || /^(admin123|admin|password|12345678|change-me)$/i.test(pass);
  if (prod) {
    if (!process.env.ADMIN_USER) {
      throw new Error('Refusing to start: set ADMIN_USER in the environment.');
    }
    if (weakPass) {
      throw new Error('Refusing to start: set ADMIN_PASSWORD to a strong password (at least 12 characters).');
    }
    if (!secret || secret.length < 32 || /change-me|dev-session/i.test(secret)) {
      throw new Error('Refusing to start: set SESSION_SECRET to a long random string (32+ characters).');
    }
  }
}
assertAdminSecrets();

function originHosts() {
  const hosts = new Set();
  for (const raw of [
    process.env.SITE_URL,
    'http://localhost:5173',
    'http://localhost:4000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4000',
  ]) {
    try { hosts.add(new URL(raw).host); } catch { /* skip */ }
  }
  return hosts;
}

export const config = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/mastermechanics',
  databaseSsl: process.env.DATABASE_SSL === 'true',
  siteUrl: (process.env.SITE_URL || 'https://mastermechanics.ae').replace(/\/+$/, ''),
  mediaFallbackBase: (process.env.MEDIA_FALLBACK_BASE || 'https://mastermechanics.ae').replace(/\/+$/, ''),
  geoLat: Number(process.env.GEO_LAT || '24.9685316'),
  geoLng: Number(process.env.GEO_LNG || '55.1922678'),
  leadWebhookUrl: process.env.LEAD_WEBHOOK_URL || '',
  leadEmailTo: (process.env.LEAD_EMAIL_TO || 'carcare@mastermechanics.ae')
    .split(/[,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .join(', '),
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || 'Master Mechanics <carcare@mastermechanics.ae>',
  smtpTlsServername: process.env.SMTP_TLS_SERVERNAME || '',
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || crypto.randomBytes(24).toString('base64url'),
  sessionSecret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  adminOrigins: originHosts(),
  serverRoot,
  publicDir: path.join(serverRoot, 'public'),
  clientDist: path.resolve(serverRoot, '..', 'client', 'dist'),
};
