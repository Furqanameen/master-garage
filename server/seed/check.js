// Sanity checks on the seed data – run with: npm --prefix server run test:data
import { buildAll } from './build.js';
import { cleanHtml } from '../src/lib/html.js';

const { pages, posts } = buildAll();
const errs = [];

const paths = new Set();
for (const p of pages) {
  if (paths.has(p.path)) errs.push(`duplicate path ${p.path}`);
  paths.add(p.path);
  if (!/^\/([\p{L}0-9-]+\/)*$/u.test(p.path)) errs.push(`bad path format ${p.path}`);
  if (!p.title) errs.push(`no title ${p.path}`);
  if (p.title.length > 60) errs.push(`title >60 chars (${p.title.length}) ${p.path}: ${p.title}`);
  if (p.meta_description && p.meta_description.length > 145) errs.push(`meta >145 chars (${p.meta_description.length}) ${p.path}`);
  if (!p.h1) errs.push(`no h1 ${p.path}`);
}
const seenTitle = new Map();
const seenKw = new Map();
for (const p of pages) {
  if (seenTitle.has(p.title)) errs.push(`duplicate <title> “${p.title}” ${seenTitle.get(p.title)} and ${p.path}`);
  else seenTitle.set(p.title, p.path);
  if (!p.meta_description) errs.push(`no meta ${p.path}`);
  else if (p.meta_description.length < 70) errs.push(`meta <70 chars (${p.meta_description.length}) ${p.path}`);
  const kw = String(p.content?.keywords || '').split(',')[0].trim();
  if (!kw) errs.push(`no keywords ${p.path}`);
  else if (seenKw.has(kw)) errs.push(`duplicate keyword “${kw}” ${seenKw.get(kw)} and ${p.path}`);
  else seenKw.set(kw, p.path);
}

const seenPostTitle = new Map();
for (const post of posts) {
  const t = post.seo_title || post.title;
  if (!post.seo_title) errs.push(`post missing seo_title ${post.slug}`);
  if (t.length > 60) errs.push(`post title >60 (${t.length}) ${post.slug}: ${t}`);
  if (!post.meta_description) errs.push(`post no meta ${post.slug}`);
  else if (post.meta_description.length > 145) errs.push(`post meta >145 ${post.slug}`);
  else if (post.meta_description.length < 70) errs.push(`post meta <70 ${post.slug}`);
  if (!post.content?.keywords) errs.push(`post no keywords ${post.slug}`);
  if (!post.content?.related_links?.length) errs.push(`post no related_links ${post.slug}`);
  if (seenPostTitle.has(t)) errs.push(`duplicate post title “${t}”`);
  else seenPostTitle.set(t, post.slug);
}

// every internal link must resolve
const postPaths = new Set(posts.map((p) => `/blog/${p.category_slug}/${p.slug}/`));
const decode = (s) => decodeURIComponent(s);
for (const p of pages) {
  const links = [
    ...(p.content?.related || []),
    ...(p.content?.related_links || []).map((l) => l.href || l),
    ...(p.content?.sections || []).flatMap((s) => s.links || []),
  ];
  for (const l of links) {
    const href = typeof l === 'object' ? l.href : l;
    const d = decode(href);
    if (!paths.has(d) && !postPaths.has(d)) errs.push(`broken internal link ${href} on ${p.path}`);
  }
}
for (const post of posts) {
  for (const l of post.content?.related || []) {
    const href = typeof l === 'object' ? l.href : l;
    const d = decode(href);
    if (!paths.has(d) && !postPaths.has(d)) errs.push(`broken post link ${href} on ${post.slug}`);
  }
}

// cleanHtml smoke test
const dirty = '<div class="elementor"><h2 style="x">Hi</h2><script>alert(1)</script><p><a href="https://mastermechanics.ae/faq/" onclick="x()">FAQ</a></p><img src="https://mastermechanics.ae/wp-content/uploads/a.jpg"></div>';
const cleaned = cleanHtml(dirty);
if (cleaned.includes('script') || cleaned.includes('onclick') || cleaned.includes('div')) errs.push('cleanHtml leaked markup: ' + cleaned);
if (!cleaned.includes('href="/faq/"') || !cleaned.includes('src="/wp-content/uploads/a.jpg"')) errs.push('cleanHtml did not relativise URLs: ' + cleaned);

const byType = pages.reduce((a, p) => ((a[p.type] = (a[p.type] || 0) + 1), a), {});
console.log('pages by type:', byType, '| posts:', posts.length);
if (errs.length) {
  console.error('\n✖ Problems:\n - ' + errs.join('\n - '));
  process.exit(1);
}
console.log('✔ seed data OK');
