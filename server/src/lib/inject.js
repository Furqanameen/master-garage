/**
 * Put the per-page <head> tags and crawlable fallback HTML into the built index.html.
 * Uses function replacers on purpose: a plain string replacement would treat "$$", "$&" etc.
 * inside the content (e.g. "priceRange":"$$" in JSON-LD) as special patterns and corrupt it.
 * Works even if the build removed the <!--SEO_HEAD--> / <!--SSR_FALLBACK--> placeholder comments.
 */
export function inject(html, head, fallback) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/i, '');

  out = out.includes('<!--SEO_HEAD-->')
    ? out.replace('<!--SEO_HEAD-->', () => head)
    : out.replace('</head>', () => `${head}\n</head>`);

  out = out.includes('<!--SSR_FALLBACK-->')
    ? out.replace('<!--SSR_FALLBACK-->', () => fallback)
    : out.replace(/<div id="root">\s*<\/div>/, () => `<div id="root">${fallback}</div>`);

  return out;
}
