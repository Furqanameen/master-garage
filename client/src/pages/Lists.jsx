import { useState } from 'react';
import { Link } from '../components/Link.jsx';
import { useApi } from '../api.js';
import { useSite } from '../SiteContext.jsx';
import { PageHero, Faq, Article, RelatedStrip, ContactDetails } from '../components/Content.jsx';
import LeadForm from '../components/LeadForm.jsx';

const enc = (p) => encodeURI(p);
const LOGO = '/images/master-mechanics-garage-logo.png';

export function ServicesIndex({ page }) {
  const { data: services = [] } = useApi('/pages?type=service');
  const { data: brands = [] } = useApi('/pages?type=brand');
  const { data: areas = [] } = useApi('/pages?type=location');
  const c = page.content;
  return (
    <>
      <PageHero h1={page.h1} subtitle={page.subtitle} />
      <div className="container">
        <p className="lead-p narrow">{c.intro?.[0]}</p>
        <div className="grid grid--3 mt">
          {(services || []).map((s) => (
            <Link className="tile" key={s.path} to={enc(s.path)}>
              <img src={s.card_image || LOGO} alt="" loading="lazy" className={s.card_image ? '' : 'tile__logo'} />
              <span>{(s.keywords || '').split(',')[0].trim() || s.nav_label || s.h1}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt">Also included</h2>
        <ul className="checks cols">{c.highlights?.map((h) => <li key={h}>{h}</li>)}</ul>
        <ul className="chips chips--left">{c.perks?.map((h) => <li key={h}>{h}</li>)}</ul>

        <h2 className="mt">Specializations</h2>
        <ul className="chips chips--left">{(brands || []).map((b) => <li key={b.path}><Link to={enc(b.path)}>{(b.keywords || '').split(',')[0].trim() || b.nav_label}</Link></li>)}</ul>
        <p className="mt"><Link to="/specializations/">car specialist DIP</Link></p>
        <h2 className="mt">Areas we serve</h2>
        <ul className="chips chips--left">{(areas || []).map((a) => <li key={a.path}><Link to={enc(a.path)}>{(a.keywords || '').split(',')[0].trim() || a.nav_label}</Link></li>)}</ul>
      </div>
      <LeadForm />
    </>
  );
}

export function BrandPage({ page }) {
  const related = page.content?.related_links || page.content?.related;
  const c = page.content || {};
  return (
    <>
      <PageHero
        h1={page.h1 || page.title}
        subtitle={page.subtitle}
        kicker="Specialize"
      />
      <div className="container narrow">
        <p className="kicker" style={{ color: 'inherit' }}>
          <Link to="/specializations/">All specialist makes</Link>
        </p>
        {page.card_image && (
          <img src={page.card_image} alt="" className="tile__logo" width="120" height="48" style={{ margin: '0 0 16px' }} />
        )}
        <Article content={{ ...c, sections: (c.sections || []).filter((s) => !/related/i.test(s.heading || '')) }} faq={page.faq} h1={page.h1 || page.title} bodyHtml={page.body_html} />
        <RelatedStrip links={related} title="More specialist makes" />
      </div>
      <LeadForm defaultService={page.nav_label || ''} />
    </>
  );
}

export function SpecializationsIndex({ page }) {
  const { data: brands = [] } = useApi('/pages?type=brand');
  const c = page.content || {};
  return (
    <>
      <PageHero h1={page.h1} subtitle={page.subtitle} kicker="Specialize" />
      <div className="container">
        <p className="lead-p narrow">{c.intro?.[0]}</p>
        <div className="grid grid--3 mt spec-grid">
          {(brands || []).map((b) => (
            <Link className="tile tile--brand" key={b.path} to={enc(b.path)}>
              <img src={b.card_image || LOGO} alt="" loading="lazy" className="tile__logo" />
              <span>{(b.keywords || '').split(',')[0].trim() || b.nav_label || b.h1}</span>
            </Link>
          ))}
        </div>
        <RelatedStrip links={c.related_links || c.related} title="Related in Dubai" />
        <p className="mt"><Link to="/blog/">BMW Mercedes Audi servicing Dubai</Link></p>
      </div>
      <LeadForm />
    </>
  );
}

const BRAND_HREF = {
  toyota: '/toyota-service-dubai/',
  suzuki: '/suzuki-service-dubai/',
  nissan: '/nissan-service-dubai/',
  mitsubishi: '/mitsubishi-service-dubai/',
  lexus: '/lexus-service-dubai/',
  honda: '/honda-service-dubai/',
  infiniti: '/infiniti-service-dubai/',
  mazda: '/mazda-service-dubai/',
  gmc: '/gmc-service-dubai/',
  chevrolet: '/chevrolet-service-dubai/',
  ford: '/ford-service-dubai/',
  'mercedes-benz': '/mercedes-service-dubai/',
  mercedes: '/mercedes-service-dubai/',
  audi: '/audi-service-dubai/',
  bmw: '/bmw-service-dubai/',
  mini: '/mini-service-dubai/',
};
const GROUP_HREF = {
  Japanese: '/japanese-car-service-dip/',
  American: '/american-car-repair-dip/',
  German: '/german-car-specialist-dip/',
  European: '/specializations/',
  Others: '/specializations/',
};
const PART_HREF = {
  Filters: '/oil-change-service/',
  'Brake shoes': '/car-brake-service/',
  'Brake disc / drum': '/car-brake-pad-replacement/',
  'Disc brake pads': '/car-brake-pad-replacement/',
  'Disc brakes': '/car-brake-service/',
  Tyres: '/car-tyre-replacement/',
  'AC compressors': '/ac-repair-service/',
  'Interior filter': '/ac-repair-service/',
  'Car battery': '/car-battery-replacement/',
  Alternator: '/alternator-repair/',
  Starter: '/starter-motor-repair/',
  'Spark plugs': '/spark-plug-replacement/',
  'Shock absorbers': '/shock-absorber-replacement/',
  'Injectors / carburettors': '/injector-cleaning-service/',
  'Automatic transmission components': '/car-gearbox-transmission-service/',
  'Manual transmission components': '/car-gearbox-transmission-service/',
};

function brandHref(alt = '', group = '') {
  const key = alt.replace(/ logo$/i, '').trim().toLowerCase();
  return BRAND_HREF[key] || GROUP_HREF[group] || '/specializations/';
}

export function SpareParts({ page }) {
  const { site } = useSite();
  const c = page.content || {};
  const related = c.related_links || c.related;
  return (
    <>
      <PageHero
        h1={page.h1}
        subtitle={page.subtitle || 'Genuine and OEM parts, ordered for your car and fitted in DIP 2.'}
        kicker="Spare parts"
      />
      <div className="container">
        {(c.intro || []).map((p, i) => <p key={i} className="lead-p narrow">{p}</p>)}
        {site && (
          <p className="narrow">
            WhatsApp <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">{site.mobileDisplay}</a>
            {' '}or call <a href={`tel:${site.mobile}`}>{site.mobileDisplay}</a>
            {' '}· <Link to="/booking/">book car service DIP</Link>
            {' '}· <Link to="/specializations/">car specialist DIP</Link>
          </p>
        )}
        {(c.groups || []).map((g) => (
          <section key={g.name} className="mt">
            <h2><Link to={GROUP_HREF[g.name] || '/specializations/'}>{g.name} car parts in DIP</Link></h2>
            <div className="logos logos--left">
              {g.logos.map((l, i) => (
                <Link key={i} to={enc(brandHref(l.alt, g.name))} className="logo-link" aria-label={l.alt}>
                  <img src={l.src} alt={l.alt} loading="lazy" height="56" />
                </Link>
              ))}
            </div>
          </section>
        ))}
        <h2 className="mt">Parts we source and fit</h2>
        <div className="grid grid--3 mt">
          {(c.categories || []).map((cat) => (
            <section key={cat.title} className="panel">
              <h3>{cat.title}</h3>
              <ul className="checks">
                {cat.items.map((item) => {
                  const label = typeof item === 'string' ? item : item.name;
                  const href = (typeof item === 'object' && item.href) || PART_HREF[label];
                  return (
                    <li key={label}>
                      {href ? <Link to={enc(href)}>{label}</Link> : label}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <ContactDetails />
      </div>
      <RelatedStrip links={related} title="Related in Dubai" />
      <div className="container narrow">
        <Faq items={page.faq} />
      </div>
      <LeadForm title="Ask about a spare part" />
    </>
  );
}

export function FaqPage({ page }) {
  const { data: faqs = [] } = useApi('/faqs');
  return (
    <>
      <PageHero h1={page.h1} subtitle="You’ve got questions? We’ve got answers." />
      <div className="container narrow"><Faq items={faqs || []} title="" /></div>
      <LeadForm title="Still have a question?" />
    </>
  );
}

export function GalleryPage({ page }) {
  const { data: images = [] } = useApi('/gallery');
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageHero h1={page.h1} />
      <div className="container">
        <div className="gallery">
          {(images || []).map((g, i) => (
            <button key={g.image} className="gallery__item" onClick={() => setOpen(g)} aria-label={`Open photo ${i + 1}`}>
              <img src={g.image} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <img src={open.image} alt={open.alt} />
        </div>
      )}
    </>
  );
}

export function BookingPage({ page }) {
  const related = page.content?.related_links || page.content?.related;
  const c = page.content || {};
  return (
    <>
      <PageHero
        h1={page.h1 || 'Book an appointment'}
        subtitle={page.subtitle || 'Tell us about your car and we will confirm a time.'}
        kicker="Booking"
      />
      <div className="container contact-page">
        {c.intro?.[0] ? <p className="lead-p">{c.intro[0]}</p> : null}
        <ContactDetails />
      </div>
      <LeadForm title="Schedule Your Appointment" />
      <RelatedStrip links={related} />
    </>
  );
}

export function ContactPage({ page }) {
  const related = page.content?.related_links || page.content?.related;
  return (
    <>
      <PageHero
        h1={page.h1 || 'Contact Us'}
        subtitle={page.subtitle || 'Call, WhatsApp or visit our workshop in Dubai Investment Park 2.'}
        kicker="Contact"
      />
      <div className="container contact-page">
        <p className="lead-p">{page.content?.intro?.[0]}</p>
        <div className="contact-page__grid">
          <div>
            <h2>Contact information</h2>
            <ContactDetails mapEmbed />
          </div>
        </div>
      </div>
      <RelatedStrip links={related} />
      <LeadForm title="Send us a message" />
    </>
  );
}

export function CareersIndex({ page }) {
  const { data: jobs = [] } = useApi('/jobs');
  const c = page.content || {};
  return (
    <>
      <PageHero h1={page.h1} subtitle={page.subtitle} kicker="Careers" />
      <div className="container">
        <p className="lead-p narrow">{c.intro?.[0]}</p>
        <div className="grid grid--3 mt">
          {(jobs || []).map((j) => (
            <Link className="tile tile--job" key={j.path} to={enc(j.path)}>
              <span>{j.title}</span>
              <small>{j.employment_type}{j.department ? ` · ${j.department}` : ''}</small>
            </Link>
          ))}
        </div>
        {!jobs?.length && <p className="mt">No open roles right now. Send a CV via the <Link to="/contact/">contact page</Link> or WhatsApp.</p>}
      </div>
      <LeadForm title="General application" apply defaultService="Job: general application" />
    </>
  );
}

export function BlogIndex({ page }) {
  const cat = page.content?.category_slug;
  const { data: posts = [] } = useApi(cat ? `/posts?category=${encodeURIComponent(cat)}` : '/posts');
  return (
    <>
      <PageHero
        h1={page.h1}
        subtitle={cat ? `${page.content?.category_name || page.h1} articles from Master Mechanics.` : 'Car care tips, servicing guides and brand advice for Dubai drivers.'}
      />
      <div className="container">
        <div className="grid grid--3">
          {(posts || []).map((p) => (
            <article className="card" key={p.path}>
              {p.image && <img src={p.image} alt="" loading="lazy" width="640" height="360" />}
              <div className="card__body">
                <p className="kicker">{p.category_name}</p>
                <h3><Link to={enc(p.path)}>{p.title}</Link></h3>
                <p>{p.excerpt}</p>
                <Link to={enc(p.path)}>Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export { Article };
