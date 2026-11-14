import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LeadForm from '../components/LeadForm.jsx';

const Stars = ({ n }) => <span className="stars" aria-label={`${n} out of 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;

function BrandTabs({ groups }) {
  const [active, setActive] = useState(groups?.[0]?.name || '');
  if (!groups?.length) return null;
  const current = groups.find((g) => g.name === active) || groups[0];
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Car brands we serve">
        {groups.map((g) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            aria-selected={g.name === current.name}
            className={g.name === current.name ? 'tabs__btn tabs__btn--on' : 'tabs__btn'}
            onClick={() => setActive(g.name)}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="logos" role="tabpanel">
        {current.logos.map((l, i) => (
          <img key={`${l.src}-${i}`} src={l.src} alt={l.alt} loading="lazy" height="56" />
        ))}
      </div>
    </>
  );
}

export default function Home({ page }) {
  const c = page.content;
  const { hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (hash === '#booking') navigate('/booking/', { replace: true });
  }, [hash, navigate]);
  return (
    <>
      <section className="hero hero--photo" style={{ '--hero': `url(${c.hero.image})` }}>
        <div className="container hero__copy">
          <h1>{page.h1}</h1>
          <p className="hero__sub">{c.hero.sub}</p>
          <a className="btn" href="#services">{c.hero.cta}</a>
        </div>
      </section>

      <section className="section" id="booking">
        <div className="container enquire">
          <img
            className="enquire__img"
            src={c.workshopImage || c.hero.image}
            alt="Master Mechanics Garage workshop in Dubai Investment Park"
            width="640"
            height="400"
          />
          <div>
            <h2 className="enquire__badge">{c.badge}</h2>
            <LeadForm compact defaultService="AC Repair Service" title="" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="center">{c.brandsTitle}</h2>
          {c.brandGroups?.length ? (
            <BrandTabs groups={c.brandGroups} />
          ) : (
            <div className="logos">
              {c.brandStrip.map((src) => <img key={src} src={src} alt="Car brand logo" loading="lazy" height="56" />)}
            </div>
          )}
          <p className="center"><Link to="/specializations/">Specialist makes we service →</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="center">{c.why.title}</h2>
          <p className="center lead-p">{c.why.intro}</p>
          <div className="grid grid--5">
            {c.why.items.map((i) => (
              <div className="why" key={i.title}>
                <img src={i.icon} alt="" width="64" height="64" loading="lazy" />
                <h3>{i.title}</h3>
                <p>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="services">
        <div className="container">
          <h2 className="center">{c.servicesTitle}</h2>
          <div className="grid grid--2">
            {c.services.map((s) => (
              <article className="card" key={s.path}>
                <img src={s.image} alt={s.title} loading="lazy" width="640" height="360" />
                <div className="card__body">
                  <h3><Link to={s.path}>{s.title}</Link></h3>
                  <p>{s.text}</p>
                  <Link className="btn btn--sm" to="/booking/">Book Now</Link>{' '}
                  <Link className="btn btn--sm btn--ghost" to={s.path}>Learn more</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="center">{c.testimonialsTitle}</h2>
          <div className="grid grid--3">
            {c.testimonials.map((t) => (
              <blockquote className="quote" key={t.name}>
                <Stars n={t.rating} />
                <p>“{t.text}”</p>
                <footer>{t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
