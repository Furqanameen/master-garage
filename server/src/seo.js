import { config } from './config.js';
import { site } from './site.js';
import { escapeHtml, encodePath } from './lib/html.js';
import { getPageByPath, getPost, listPagesByType, getNav, postPath, listPosts, listFaqs, listJobs, getJob, jobPath } from './data.js';
import { foldLookalikes } from './lib/html.js';

const abs = (p) => (/^https?:\/\//.test(p) ? p : config.siteUrl + p);
const absPath = (p) => config.siteUrl + encodePath(p);
const trunc = (s = '', n = 300) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const stripTags = (h = '') => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/* ---------- JSON-LD ---------- */

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: site.streetAddress,
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  };
}

function geoLd() {
  return {
    '@type': 'GeoCoordinates',
    latitude: config.geoLat,
    longitude: config.geoLng,
  };
}

export function businessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${config.siteUrl}/#business`,
    name: site.name,
    alternateName: site.shortName,
    url: config.siteUrl + '/',
    logo: abs(site.logo),
    image: abs(site.defaultOgImage),
    telephone: [site.mobile, site.landline],
    email: site.email,
    priceRange: '$$',
    address: postalAddress(),
    geo: geoLd(),
    hasMap: site.mapUrl,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.mobile,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'AE',
        availableLanguage: ['en', 'ar'],
        url: `https://wa.me/${site.whatsapp}`,
      },
      {
        '@type': 'ContactPoint',
        telephone: site.landline,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'AE',
        availableLanguage: ['en', 'ar'],
      },
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    }],
    areaServed: ['Dubai Investment Park', 'DIP 2', 'South Dubai', 'Jebel Ali', 'Dubai South', 'Dubai'],
    sameAs: [...Object.values(site.social), site.mapUrl],
  };
}

function providerRef() {
  return {
    '@type': 'AutoRepair',
    '@id': `${config.siteUrl}/#business`,
    name: site.name,
    telephone: site.mobile,
    email: site.email,
    address: postalAddress(),
    geo: geoLd(),
    url: config.siteUrl + '/',
  };
}

const faqLd = (faq) =>
  faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q || f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.a || f.answer },
        })),
      }
    : null;

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.path ? absPath(it.path) : undefined,
  })),
});

function pageLd(page) {
  const out = [];
  const crumbs = [{ name: 'Home', path: '/' }];
  if (page.type === 'service') crumbs.push({ name: 'Services', path: '/services/' });
  if ((page.type === 'brand' || page.type === 'specialization' || page.type === 'specializations_index') && page.path !== '/specializations/') {
    crumbs.push({ name: 'Specialize', path: '/specializations/' });
  }
  if (page.type === 'location') crumbs.push({ name: 'Areas we serve', path: '/services/' });
  if (page.path !== '/') crumbs.push({ name: page.nav_label || page.h1 || page.title, path: page.path });
  if (page.path !== '/') out.push(breadcrumbLd(crumbs));

  if (page.type === 'service' || page.type === 'brand' || page.type === 'specialization') {
    const isSpec = page.type === 'brand' || page.type === 'specialization';
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1 || page.title,
      description: page.meta_description || undefined,
      url: absPath(page.path),
      serviceType: isSpec ? `${page.nav_label || page.h1} specialist` : (page.nav_label || page.h1),
      category: isSpec ? 'Specialize' : 'Services',
      areaServed: {
        '@type': 'Place',
        name: 'Dubai Investment Park 2, Dubai',
        address: postalAddress(),
        geo: geoLd(),
      },
      provider: providerRef(),
      ...(isSpec ? { brand: { '@type': 'Brand', name: page.nav_label || page.h1 } } : {}),
    });
  }
  if (page.path === '/booking/' || page.type === 'booking') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.h1 || page.title,
      url: absPath(page.path),
      mainEntity: providerRef(),
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Book car service',
        target: absPath(page.path),
      },
    });
  }
  if (page.type === 'spare_parts') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1 || page.title,
      description: page.meta_description || undefined,
      url: absPath(page.path),
      serviceType: 'Automotive spare parts supply and fitting',
      category: 'Spare Parts',
      areaServed: {
        '@type': 'Place',
        name: 'Dubai Investment Park 2, Dubai',
        address: postalAddress(),
        geo: geoLd(),
      },
      provider: providerRef(),
    });
  }
  if (page.path === '/contact/' || page.type === 'contact') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: page.h1 || page.title,
      url: absPath(page.path),
      mainEntity: providerRef(),
      significantLink: [site.mapUrl, `https://wa.me/${site.whatsapp}`, `tel:${site.mobile}`, `mailto:${site.email}`],
    });
  }
  const f = faqLd(page.faq);
  if (f) out.push(f);
  return out;
}

const EMPLOYMENT_SCHEMA = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Temporary: 'TEMPORARY',
};

function jobLd(job) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.meta_description || job.excerpt || stripTags(job.body_html || ''),
    datePosted: new Date(job.published_at).toISOString().slice(0, 10),
    employmentType: EMPLOYMENT_SCHEMA[job.employment_type] || 'FULL_TIME',
    hiringOrganization: providerRef(),
    jobLocation: {
      '@type': 'Place',
      address: postalAddress(),
      geo: geoLd(),
      name: job.location || site.addressLocality,
    },
    identifier: { '@type': 'PropertyValue', name: site.name, value: job.slug },
    url: absPath(jobPath(job)),
  };
}

function postLd(post) {
  const out = [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: post.title, path: postPath(post) },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      image: post.image ? abs(post.image) : undefined,
      datePublished: new Date(post.published_at).toISOString(),
      dateModified: new Date(post.updated_at).toISOString(),
      mainEntityOfPage: absPath(postPath(post)),
      author: { '@type': 'Organization', name: site.name },
      publisher: {
        '@type': 'Organization',
        '@id': `${config.siteUrl}/#business`,
        name: site.name,
        logo: { '@type': 'ImageObject', url: abs(site.logo) },
        telephone: site.mobile,
        address: postalAddress(),
      },
    },
  ];
  const f = faqLd(post.faq);
  if (f) out.push(f);
  return out;
}

/* ---------- <head> injection ---------- */

function headHtml({ title, description, canonicalPath, image, type = 'website', noindex = false, jsonLd = [], keywords }) {
  const url = absPath(canonicalPath);
  const img = abs(image || site.defaultOgImage);
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    description ? `<meta name="description" content="${escapeHtml(description)}">` : '',
    keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}">` : '',
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${escapeHtml(site.shortName)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    description ? `<meta property="og:description" content="${escapeHtml(description)}">` : '',
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:image" content="${escapeHtml(img)}">`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    description ? `<meta name="twitter:description" content="${escapeHtml(description)}">` : '',
    `<link rel="icon" href="${escapeHtml(site.favicon)}">`,
    `<meta name="geo.region" content="AE-DU">`,
    `<meta name="geo.placename" content="${escapeHtml(site.addressLocality)}">`,
    `<meta name="geo.position" content="${config.geoLat};${config.geoLng}">`,
    `<meta name="ICBM" content="${config.geoLat}, ${config.geoLng}">`,
  ];
  for (const ld of [businessLd(), ...jsonLd].filter(Boolean)) {
    // escape "<" so a stray "</script>" in content can never break out of the tag
    lines.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  return lines.filter(Boolean).join('\n    ');
}

/* ---------- crawlable fallback HTML (replaced by React on load) ---------- */

const li = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

function sectionsHtml(content = {}) {
  const parts = [];
  const intro = Array.isArray(content.intro) ? content.intro : content.intro ? [content.intro] : [];
  intro.forEach((p) => parts.push(`<p>${escapeHtml(p)}</p>`));
  for (const s of content.sections || []) {
    if (s.heading) parts.push(`<h2>${escapeHtml(s.heading)}</h2>`);
    (s.paragraphs || []).forEach((p) => parts.push(`<p>${escapeHtml(p)}</p>`));
    if (s.bullets?.length) parts.push(li(s.bullets.map((b) => escapeHtml(b.title ? `${b.title}: ${b.text}` : b))));
    const rel = s.related_links || (s.links || []).map((l) => (typeof l === 'object' ? l : { href: l, text: decodeURIComponent(l) }));
    if (rel.length) {
      parts.push(li(rel.map((l) => {
        const href = typeof l === 'object' ? l.href : l;
        const text = typeof l === 'object' ? (l.text || href) : href;
        return `<a href="${escapeHtml(encodePath(href))}">${escapeHtml(text)}</a>`;
      })));
    }
  }
  return parts.join('');
}

function napFallbackHtml() {
  return `<h2>Contact information</h2><ul>
    <li><a href="${escapeHtml(site.mapUrl)}" rel="noopener noreferrer" target="_blank">${escapeHtml(site.addressLine)}</a></li>
    <li><a href="tel:${escapeHtml(site.landline)}">${escapeHtml(site.landlineDisplay)}</a></li>
    <li><a href="tel:${escapeHtml(site.mobile)}">${escapeHtml(site.mobileDisplay)}</a></li>
    <li><a href="https://wa.me/${escapeHtml(site.whatsapp)}" rel="noopener noreferrer" target="_blank">WhatsApp ${escapeHtml(site.mobileDisplay)}</a></li>
    <li><a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></li>
    <li>${escapeHtml(site.hours)}</li>
  </ul>`;
}

function relatedHtml(content = {}) {
  const rel = content.related_links || [];
  if (!rel.length) return '';
  return `<h2>Related in Dubai</h2>${li(rel.map((l) => {
    const href = typeof l === 'object' ? l.href : l;
    const text = typeof l === 'object' ? (l.text || href) : href;
    return `<a href="${escapeHtml(encodePath(href))}">${escapeHtml(text)}</a>`;
  }))}`;
}

function faqHtml(faq = []) {
  if (!faq.length) return '';
  return `<h2>Frequently asked questions</h2>${faq
    .map((f) => `<h3>${escapeHtml(f.q || f.question)}</h3><p>${escapeHtml(f.a || f.answer)}</p>`)
    .join('')}`;
}

async function navLinksHtml() {
  const nav = await getNav();
  const a = (x) => `<a href="${escapeHtml(encodePath(x.path))}">${escapeHtml(x.keyword || x.label)}</a>`;
  return `<nav aria-label="Site">${li([
    '<a href="/">Home</a>', '<a href="/services/">Services</a>', '<a href="/specializations/">Specialize</a>', '<a href="/spare-parts/">Spare Parts</a>',
    '<a href="/about/">About</a>', '<a href="/contact/">Contact</a>', '<a href="/booking/">Book</a>', '<a href="/careers/">Careers</a>', '<a href="/faq/">FAQ</a>', '<a href="/gallery/">Gallery</a>', '<a href="/blog/">Blog</a>',
    ...nav.services.map(a), ...nav.brands.map(a), ...nav.locations.map(a),
  ])}</nav>`;
}

async function pageFallback(page) {
  const c = page.content || {};
  let body = '';
  if (page.type === 'home') {
    body += `<p>${escapeHtml(c.hero?.sub || '')}</p>`;
    body += (c.services || []).map((s) => `<h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.text)}</p>`).join('');
  } else if (page.type === 'services_index') {
    const all = await listPagesByType('service');
    body += li(all.map((s) => {
      const label = String(s.keywords || '').split(',')[0].trim() || s.nav_label || s.h1;
      return `<a href="${escapeHtml(encodePath(s.path))}">${escapeHtml(label)}</a>`;
    }));
  } else if (page.type === 'specializations_index') {
    const all = await listPagesByType('brand');
    body += li(all.map((s) => {
      const label = String(s.keywords || '').split(',')[0].trim() || s.nav_label || s.h1;
      return `<a href="${escapeHtml(encodePath(s.path))}">${escapeHtml(label)}</a>`;
    }));
  } else if (page.type === 'blog_index') {
    const posts = await listPosts();
    body += li(posts.map((p) => `<a href="${escapeHtml(encodePath(p.path))}">${escapeHtml(p.title)}</a>`));
  } else if (page.type === 'careers_index') {
    const jobs = await listJobs();
    body += page.body_html || sectionsHtml(c);
    body += jobs.length
      ? `<h2>Open roles</h2>${li(jobs.map((j) => `<a href="${escapeHtml(encodePath(j.path))}">${escapeHtml(j.title)}</a>`))}`
      : '<p>No open roles right now. Check back or send a CV via the contact page.</p>';
  } else if (page.type === 'spare_parts') {
    const brands = await listPagesByType('brand');
    body += (c.intro || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
    body += `<p><a href="${escapeHtml(site.mapUrl)}">${escapeHtml(site.addressLine)}</a></p>`;
    body += li(brands.map((s) => {
      const label = String(s.keywords || '').split(',')[0].trim() || s.nav_label || s.h1;
      return `<a href="${escapeHtml(encodePath(s.path))}">${escapeHtml(label)}</a>`;
    }));
    body += relatedHtml(c);
    body += faqHtml(page.faq);
  } else if (page.type === 'faq') {
    body += faqHtml(await listFaqs());
  } else if (page.path === '/contact/' || page.type === 'contact') {
    body += napFallbackHtml();
    body += relatedHtml(c);
  } else if (page.path === '/booking/' || page.type === 'booking') {
    body += sectionsHtml(c) + napFallbackHtml();
    body += relatedHtml(c);
  } else if (page.path === '/about/') {
    const about = { ...c, sections: (c.sections || []).filter((s) => !/contact/i.test(s.heading || '')) };
    body += sectionsHtml(about) + napFallbackHtml();
  } else {
    body += page.body_html || sectionsHtml(c);
    if (page.body_html) body += relatedHtml(c);
    body += faqHtml(page.faq);
  }
  return `<main><h1>${escapeHtml(page.h1 || page.title)}</h1>${body}</main>${await navLinksHtml()}`;
}

/* ---------- public API: resolve a URL to head + fallback + status ---------- */

export async function resolveRoute(path) {
  // Live Yoast archives: /blog/category/<slug>/
  const cat = path.match(/^\/blog\/category\/([^/]+)\/$/);
  if (cat) return resolvePage(path);

  const jobMatch = path.match(/^\/careers\/([^/]+)\/$/);
  if (jobMatch && jobMatch[1] !== '') {
    const job = await getJob(jobMatch[1]);
    if (job) {
      const canonical = jobPath(job);
      return {
        status: 200,
        canonicalPath: canonical,
        head: headHtml({
          title: job.seo_title || job.title,
          description: trunc(job.meta_description || job.excerpt || stripTags(job.body_html || ''), 145),
          canonicalPath: canonical,
          type: 'article',
          jsonLd: [jobLd(job)],
          keywords: `${job.title} DIP, garage jobs Dubai`,
        }),
        fallback: `<main><article><h1>${escapeHtml(job.title)}</h1><p>${escapeHtml(job.employment_type || '')} · ${escapeHtml(job.location || '')}</p>${job.body_html || ''}</article></main>${await navLinksHtml()}`,
      };
    }
  }

  // /blog/<category>/<slug>/
  const m = path.match(/^\/blog\/([^/]+)\/([^/]+)\/$/);
  if (m) {
    const post = await getPost(foldLookalikes(m[1]), m[2]);
    if (!post) return resolvePage(path);
    const canonical = postPath(post);
    return {
      status: 200,
      canonicalPath: canonical,
      head: headHtml({
        title: post.seo_title || `${post.title}`.slice(0, 60),
        description: trunc(post.meta_description || post.excerpt || stripTags(post.body_html || ''), 145),
        canonicalPath: canonical,
        image: post.image,
        type: 'article',
        jsonLd: postLd(post),
        keywords: post.content?.keywords,
      }),
      fallback: `<main><article><h1>${escapeHtml(post.title)}</h1>${post.body_html || sectionsHtml(post.content)}${relatedHtml(post.content)}${faqHtml(post.faq)}</article></main>${await navLinksHtml()}`,
    };
  }

  return resolvePage(path);
}

async function resolvePage(path) {
  const page = await getPageByPath(path);
  if (!page) return notFound(path);
  return {
    status: 200,
    canonicalPath: page.path,
    head: headHtml({
      title: page.title,
      description: page.meta_description,
      canonicalPath: page.path,
      image: page.hero_image || page.card_image,
      noindex: page.noindex,
      jsonLd: pageLd(page),
      keywords: page.content?.keywords,
    }),
    fallback: await pageFallback(page),
  };
}

function notFound(path = '/404/') {
  return {
    status: 404,
    canonicalPath: path,
    head: headHtml({ title: `Page not found - ${site.shortName}`, description: '', canonicalPath: path, noindex: true }),
    fallback: '<main><h1>Page not found</h1><p><a href="/">Back to the homepage</a></p></main>',
  };
}

/* ---------- sitemap.xml / robots.txt ---------- */

export async function buildSitemap() {
  const { sitemapEntries } = await import('./data.js');
  const entries = await sitemapEntries();
  const prio = {
    home: '1.0', service: '0.9', services_index: '0.9', specializations_index: '0.9', spare_parts: '0.85',
    careers_index: '0.7', brand: '0.85', specialization: '0.8', location: '0.7', post: '0.6', job: '0.6',
    contact: '0.8', booking: '0.85',
  };
  const freq = { home: 'weekly', post: 'monthly' };
  const urls = entries.map((e) => {
    const priority = e.path === '/contact/' ? '0.8' : (prio[e.type] || '0.7');
    return `  <url>
    <loc>${escapeHtml(absPath(e.path))}</loc>
    <lastmod>${new Date(e.lastmod).toISOString()}</lastmod>
    <changefreq>${freq[e.type] || 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export const robotsTxt = () => `# Master Mechanics Garage LLC
# ${site.addressLine}
# ${site.mobileDisplay} · ${site.landlineDisplay} · ${site.email}
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /admin/
Disallow: /thank-you/

Sitemap: ${config.siteUrl}/sitemap.xml
`;
