import { Link } from './Link.jsx';
import { useSite } from '../SiteContext.jsx';

/** Clickable NAP used in the footer, Contact page and About. */
export function ContactDetails({ hours = true, mapEmbed = false }) {
  const { site } = useSite();
  if (!site) return null;
  const wa = `https://wa.me/${site.whatsapp}`;
  return (
    <div className="nap">
      <ul className="nap__list">
        <li>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
            📍 {site.addressLine}
          </a>
        </li>
        <li><a href={`tel:${site.landline}`}>📞 {site.landlineDisplay}</a></li>
        <li><a href={`tel:${site.mobile}`}>📱 {site.mobileDisplay || site.mobile}</a></li>
        <li><a href={wa} target="_blank" rel="noopener noreferrer">💬 WhatsApp {site.mobileDisplay}</a></li>
        <li><a href={`mailto:${site.email}`}>✉️ {site.email}</a></li>
        {site.social?.facebook ? (
          <li>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
        ) : null}
        {hours ? <li>🕘 {site.hours}</li> : null}
      </ul>
      {mapEmbed ? (
        <div className="nap__map">
          <a
            className="nap__map-link"
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Master Mechanics Garage LLC on Google Maps"
          >
            <iframe
              title="Master Mechanics Garage LLC on Google Maps"
              src={`https://www.google.com/maps?q=${site.geoLat || 24.9685316},${site.geoLng || 55.1922678}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
          </a>
          <p>
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              Open garage location on Google Maps
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export const PageHero = ({ h1, subtitle, image, kicker }) => (
  <section className="pagehero" style={image ? { '--hero': `url(${encodeURI(image)})` } : undefined}>
    <div className="container">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1>{h1}</h1>
      {subtitle && <p className="pagehero__sub">{subtitle}</p>}
    </div>
  </section>
);

function Bullets({ items }) {
  return (
    <ul className="checks">
      {items.map((b, i) => (
        <li key={i}>{typeof b === 'string' ? b : <><strong>{b.title}</strong> – {b.text}</>}</li>
      ))}
    </ul>
  );
}

/** Anchor text is the target page’s Dubai search phrase, not the menu label. */
function relatedItems(links, nav) {
  const all = [...(nav?.services || []), ...(nav?.brands || []), ...(nav?.locations || [])];
  return (links || []).map((l) => {
    if (l && typeof l === 'object' && l.href) {
      return { href: l.href, text: l.text || l.href };
    }
    const href = String(l);
    const decoded = decodeURIComponent(href);
    const hit = all.find((x) => x.path === decoded || x.path === href);
    const text = hit?.keyword || hit?.label || decoded.replace(/\/$/, '').split('/').pop().replace(/-/g, ' ');
    return { href, text };
  });
}

function RelatedLinks({ links }) {
  const { nav } = useSite();
  const items = relatedItems(links, nav);
  if (!items.length) return null;
  return (
    <ul className="related">
      {items.map((l) => <li key={l.href}><Link to={l.href}>{l.text}</Link></li>)}
    </ul>
  );
}

export function RelatedStrip({ links, title = 'Related in Dubai' }) {
  if (!links?.length) return null;
  return (
    <section className="container narrow related-block">
      <h2>{title}</h2>
      <RelatedLinks links={links} />
    </section>
  );
}

export function Faq({ items = [], title = 'Frequently asked questions' }) {
  if (!items.length) return null;
  return (
    <section className="faq">
      <h2>{title}</h2>
      {items.map((f, i) => (
        <details key={i}>
          <summary>{f.q || f.question}</summary>
          <p>{f.a || f.answer}</p>
        </details>
      ))}
    </section>
  );
}

/** Drop WP hero headings so they do not repeat the page banner h1. */
export function stripDuplicateHero(html = '') {
  let out = String(html);
  for (let i = 0; i < 6; i += 1) {
    const m = out.match(/^\s*<(h[1-6])\b[^>]*>[\s\S]*?<\/\1>/i);
    if (!m) break;
    out = out.slice(m[0].length);
  }
  return out.trim();
}

/** Renders `content` JSON (intro + sections) or imported `body_html`. */
export function Article({ content = {}, bodyHtml, faq, h1 }) {
  const intro = Array.isArray(content.intro) ? content.intro : content.intro ? [content.intro] : [];
  const html = bodyHtml ? stripDuplicateHero(bodyHtml) : '';
  return (
    <article className="article">
      {html ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <>
          {intro.map((p, i) => <p key={i} className="lead-p">{p}</p>)}
          {(content.sections || []).map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
              {s.bullets && <Bullets items={s.bullets} />}
              {(s.related_links || s.links) && <RelatedLinks links={s.related_links || s.links} />}
            </section>
          ))}
        </>
      )}
      <Faq items={faq} />
    </article>
  );
}
