const SECRET_RE = /(postgres(ql)?:\/\/[^\s"'\\]+)|(password\s*=\s*\S+)|(ADMIN_PASSWORD|DATABASE_URL|SESSION_SECRET)\s*=\s*\S+/gi;

export function redact(value) {
  return String(value ?? '').replace(SECRET_RE, '[redacted]');
}

export function publicError(err, fallback = 'Something went wrong. Please try again.') {
  if (err?.status && err.message && err.status < 500) return err.message;
  if (err instanceof Error && err.status && err.status < 500) return err.message;
  return fallback;
}

export function intId(raw) {
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isInteger(n) || n < 1 || n > 2_147_483_647) return null;
  return n;
}

/** Only allow local media paths the editor/upload flow produces. */
export function safeMediaUrl(u) {
  const s = String(u || '').trim();
  if (!s) return null;
  if (s.includes('..') || s.includes('\\') || s.includes('\0')) return null;
  if (s.startsWith('/uploads/') || s.startsWith('/wp-content/uploads/')) return s.slice(0, 500);
  return null;
}

export function stripCaptureFields(row) {
  if (!row) return row;
  const {
    raw_seo, raw_head, raw_body, body_attrs, html_lang, captured_at, content, ...rest
  } = row;
  return rest;
}

export const RESERVED_SLUGS = new Set([
  'admin', 'api', 'blog', 'login', 'logout', 'wp-admin', 'wp-content',
  'uploads', 'healthz', 'sitemap.xml', 'robots.txt', 'favicon.ico',
  'specializations', 'careers',
]);
