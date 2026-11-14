import crypto from 'node:crypto';
import { config } from './config.js';

const COOKIE = 'mm_admin';
const MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours
const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const lockout = new Map(); // ip -> { fails, until }

function sha(s) {
  return crypto.createHash('sha256').update(String(s)).digest();
}

function scrypt(password) {
  const salt = sha(`mm-admin:${config.sessionSecret}`);
  return crypto.scryptSync(String(password), salt, 64, SCRYPT);
}

const passwordHash = scrypt(config.adminPassword);
const userHash = sha(config.adminUser);

function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', config.sessionSecret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function unsign(token) {
  if (!token || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', config.sessionSecret).update(data).digest('base64url');
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload?.v !== 1 || !payload?.exp || payload.exp < Date.now() || !payload.u) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(req) {
  const out = {};
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function cookieFlags() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${Math.floor(MAX_AGE_MS / 1000)}${secure}`;
}

export function setSession(res, user) {
  const token = sign({ v: 1, u: user, exp: Date.now() + MAX_AGE_MS, n: crypto.randomBytes(16).toString('hex') });
  res.append('Set-Cookie', `${COOKIE}=${token}; ${cookieFlags()}`);
}

export function clearSession(res) {
  res.append('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0`);
}

export function readSession(req) {
  return unsign(parseCookies(req)[COOKIE]);
}

function clientIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xf || req.ip || req.socket?.remoteAddress || 'unknown';
}

export function loginAllowed(req) {
  const ip = clientIp(req);
  const row = lockout.get(ip);
  if (row?.until && row.until > Date.now()) {
    return { ok: false, wait: Math.ceil((row.until - Date.now()) / 1000) };
  }
  return { ok: true, ip };
}

export function recordLoginFail(ip) {
  const row = lockout.get(ip) || { fails: 0, until: 0 };
  row.fails += 1;
  if (row.fails >= 8) {
    row.until = Date.now() + 15 * 60 * 1000;
    row.fails = 0;
  }
  lockout.set(ip, row);
}

export function recordLoginOk(ip) {
  lockout.delete(ip);
}

export function checkCredentials(username, password) {
  // Always run scrypt so timing does not reveal whether the username exists.
  const passOk = crypto.timingSafeEqual(scrypt(password), passwordHash);
  const userOk = crypto.timingSafeEqual(sha(username), userHash);
  return userOk && passOk;
}

export function requireAdmin(req, res, next) {
  const session = readSession(req);
  if (!session?.u) return res.status(401).json({ error: 'Please sign in.' });
  req.admin = session.u;
  next();
}

/** Block cross-site POSTs so a planted form cannot use the admin cookie. */
export function requireSameOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowed = config.adminOrigins;
  const hostOf = (u) => {
    try { return new URL(u).host; } catch { return ''; }
  };
  if (origin) {
    if (!allowed.has(hostOf(origin))) return res.status(403).json({ error: 'Forbidden.' });
    return next();
  }
  if (referer) {
    if (!allowed.has(hostOf(referer))) return res.status(403).json({ error: 'Forbidden.' });
  }
  next();
}
