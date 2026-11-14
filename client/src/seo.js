import { useEffect } from 'react';

function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (!value) { el?.remove(); return; }
  if (!el) { el = document.createElement(create.tag); Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el); }
  el.setAttribute(create.valueAttr, value);
}

/**
 * Keeps <title>/description/canonical/og tags in sync on client-side navigation.
 * (On first load the server has already injected them, so crawlers see them without running JS.)
 */
export function useSeo({ title, description, canonicalPath, image, noindex, keywords }) {
  useEffect(() => {
    if (title) document.title = title;
    const origin = window.location.origin;
    setMeta('meta[name="description"]', { tag: 'meta', attrs: { name: 'description' }, valueAttr: 'content' }, description);
    setMeta('meta[name="keywords"]', { tag: 'meta', attrs: { name: 'keywords' }, valueAttr: 'content' }, keywords);
    setMeta('meta[property="og:title"]', { tag: 'meta', attrs: { property: 'og:title' }, valueAttr: 'content' }, title);
    setMeta('meta[property="og:description"]', { tag: 'meta', attrs: { property: 'og:description' }, valueAttr: 'content' }, description);
    setMeta('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' }, valueAttr: 'href' }, canonicalPath ? origin + canonicalPath : null);
    setMeta('meta[property="og:url"]', { tag: 'meta', attrs: { property: 'og:url' }, valueAttr: 'content' }, canonicalPath ? origin + canonicalPath : null);
    if (image) setMeta('meta[property="og:image"]', { tag: 'meta', attrs: { property: 'og:image' }, valueAttr: 'content' }, image.startsWith('http') ? image : origin + image);
    setMeta('meta[name="twitter:title"]', { tag: 'meta', attrs: { name: 'twitter:title' }, valueAttr: 'content' }, title);
    setMeta('meta[name="twitter:description"]', { tag: 'meta', attrs: { name: 'twitter:description' }, valueAttr: 'content' }, description);
    setMeta('meta[name="robots"]', { tag: 'meta', attrs: { name: 'robots' }, valueAttr: 'content' },
      noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  }, [title, description, canonicalPath, image, noindex, keywords]);
}
