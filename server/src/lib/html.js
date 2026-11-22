const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (s = '') => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

/** Drop leading WP hero headings so SSR does not emit a second H1. */
export function stripDuplicateHero(html = '') {
  let out = String(html);
  for (let i = 0; i < 6; i += 1) {
    const m = out.match(/^\s*<(h[1-6])\b[^>]*>[\s\S]*?<\/\1>/i);
    if (!m) break;
    out = out.slice(m[0].length);
  }
  return out.trim();
}

/** Percent-encode a path the same way WordPress does (lower-case hex), e.g. /blog/%d0%b0uto-service/ */
export const encodePath = (p) =>
  encodeURI(p).replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());

/** Cyrillic 'а' (U+0430) -> latin 'a'. The live site has this typo in the category slug. */
export const foldLookalikes = (s) => s.replace(/а/g, 'a');

/** Normalise a request path: decode, collapse duplicate slashes, ensure trailing slash. */
export function normalisePath(raw) {
  let p = raw.split('?')[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep raw */
  }
  p = p.replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p += '/';
  return p;
}

const ALLOWED = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'b', 'em', 'i', 'u',
  'br', 'hr', 'img', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption',
]);

/**
 * Dependency-free HTML cleaner for imported WordPress/Elementor markup.
 * Drops script/style/iframe/form blocks, unwraps unknown tags (div/span/section...),
 * and keeps only href/src/alt/title attributes. Content comes from your own WordPress
 * site, so this is a tidy-up step rather than a security boundary.
 */
export function cleanHtml(html = '') {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|iframe|form|svg|noscript|button|select|textarea)[\s\S]*?<\/\1>/gi, '');

  out = out.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (full, tag, attrs) => {
    const t = tag.toLowerCase();
    if (!ALLOWED.has(t)) return '';
    if (full.startsWith('</')) return `</${t}>`;
    const keep = [];
    for (const name of ['href', 'src', 'alt', 'title']) {
      const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
      if (!m) continue;
      let v = m[2] ?? m[3] ?? '';
      if (/^\s*(javascript|vbscript|data|file):/i.test(v)) continue;
      v = v.replace(/^https?:\/\/(www\.)?mastermechanics\.ae/i, '');
      const okHref = name === 'href' && (/^(mailto:|tel:)/i.test(v) || v.startsWith('#') || v.startsWith('/') || /^https?:\/\//i.test(v));
      const okSrc = name === 'src' && (v.startsWith('/') || /^https?:\/\//i.test(v));
      if (name === 'href' && !okHref) continue;
      if (name === 'src' && !okSrc) continue;
      if ((name === 'src' || name === 'href') && v.includes('..')) continue;
      keep.push(`${name}="${escapeHtml(v).replace(/&amp;/g, '&')}"`);
    }
    if (t === 'img' && !keep.some((k) => k.startsWith('alt='))) keep.push('alt=""');
    if (t === 'img') keep.push('loading="lazy"');
    return `<${t}${keep.length ? ' ' + keep.join(' ') : ''}>`;
  });

  return out
    .replace(/<(p|h[1-6]|li|a|strong|em|b|i)>\s*<\/\1>/gi, '')
    .replace(/\n\s*\n+/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
