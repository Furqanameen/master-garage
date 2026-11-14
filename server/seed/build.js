// Pure data assembly (no DB) – used by the seeder and by seed/check.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages as originalPages, faqs, gallery } from './data/original.js';
import { posts as handwrittenPosts } from './data/posts.js';
import { buildSeoPages } from './data/seoPages.js';
import { specializationPages } from './data/specializations.js';
import { careersPage, jobs } from './data/careers.js';
import { applyPageSeo, applyPostSeo } from './data/seoOverlay.js';

const dumpFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'wp-dump.json');
const dump = fs.existsSync(dumpFile) ? JSON.parse(fs.readFileSync(dumpFile, 'utf8')) : { posts: [] };
const fold = (s = '') => s.replace(/а/g, 'a');

function mergePosts() {
  const byKey = new Map();
  for (const p of handwrittenPosts) byKey.set(`${fold(p.category_slug)}/${p.slug}`, p);
  for (const d of dump.posts || []) {
    const key = `${fold(d.category_slug)}/${d.slug}`;
    const existing = byKey.get(key);
    if (existing) {
      byKey.set(key, {
        ...existing,
        title: d.title || existing.title,
        seo_title: d.seo_title || existing.seo_title,
        meta_description: d.meta_description || existing.meta_description,
        excerpt: d.excerpt || existing.excerpt,
        image: d.image || existing.image,
        body_html: d.body_html || existing.body_html,
        published_at: d.published_at || existing.published_at,
      });
    } else {
      byKey.set(key, {
        category_slug: d.category_slug,
        category_name: d.category_name,
        slug: d.slug,
        title: d.title,
        seo_title: d.seo_title,
        meta_description: d.meta_description,
        excerpt: d.excerpt,
        image: d.image,
        content: {},
        body_html: d.body_html,
        published_at: d.published_at,
      });
    }
  }
  return [...byKey.values()];
}

export function buildAll() {
  const pages = [...originalPages, ...buildSeoPages(), ...specializationPages(), careersPage].map((p) => applyPageSeo({
    nav_label: null, in_menu: false, subtitle: null, hero_image: null, card_image: null, excerpt: null,
    meta_description: null, h1: null, content: {}, faq: [], noindex: false, sort_order: 0, ...p,
  }));
  return { pages, posts: mergePosts().map(applyPostSeo), faqs, gallery, jobs };
}
