import { escapeHtml } from './html.js';

/** Turn stored JSON `content` into HTML so the editor can open older seed pages/posts. */
export function contentToHtml(content = {}) {
  const intro = Array.isArray(content.intro) ? content.intro : content.intro ? [content.intro] : [];
  const parts = intro.map((p) => `<p>${escapeHtml(p)}</p>`);
  for (const s of content.sections || []) {
    if (s.heading) parts.push(`<h2>${escapeHtml(s.heading)}</h2>`);
    for (const p of s.paragraphs || []) parts.push(`<p>${escapeHtml(p)}</p>`);
    if (s.bullets?.length) {
      const items = s.bullets.map((b) =>
        typeof b === 'string'
          ? `<li>${escapeHtml(b)}</li>`
          : `<li><strong>${escapeHtml(b.title || '')}</strong>${b.text ? ` – ${escapeHtml(b.text)}` : ''}</li>`,
      );
      parts.push(`<ul>${items.join('')}</ul>`);
    }
  }
  return parts.join('\n');
}

export function slugify(s = '') {
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export function servicePath(slug) {
  const s = slugify(slug);
  return s ? `/${s}/` : '';
}
