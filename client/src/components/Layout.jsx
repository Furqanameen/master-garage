import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink, inShell } from './Link.jsx';
import { useSite } from '../SiteContext.jsx';
import ContactActions, { PhoneIcon, WhatsAppIcon } from './SocialLinks.jsx';

const enc = (p) => encodeURI(p);

function Header() {
  const { site, nav } = useSite();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const [shut, setShut] = useState(false);
  const { pathname } = useLocation();
  const closeMenus = () => {
    setOpen(false);
    setDrop(null);
    setShut(true);
    const el = document.activeElement;
    if (el instanceof HTMLElement) el.blur();
  };
  useEffect(() => { setOpen(false); setDrop(null); }, [pathname]);

  return (
    <header className="header">
      <div className="container header__row">
        <Link to="/" className="logo" aria-label="Master Mechanics – home">
          <img src={site?.logo || '/images/master-mechanics-garage-logo.png'} alt="Master Mechanics Garage LLC" width="160" height="48" />
        </Link>

        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>

        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/spare-parts/">Spare Parts</NavLink>
          <div
            className={`dropdown ${drop === 'services' ? 'dropdown--open' : ''} ${shut ? 'dropdown--shut' : ''}`}
            onMouseLeave={() => { setDrop(null); setShut(false); }}
          >
            <NavLink to="/services/" onClick={(e) => { if (open) { e.preventDefault(); setDrop(drop === 'services' ? null : 'services'); setShut(false); } }}>Services ▾</NavLink>
            <div className="dropdown__menu" onClick={closeMenus}>
              {nav?.menuServices.map((s) => (
                <Link key={s.path} to={enc(s.path)}>{s.label}</Link>
              ))}
              <Link to="/services/" className="nav-brand--all">All services</Link>
            </div>
          </div>
          <div
            className={`dropdown ${drop === 'spec' ? 'dropdown--open' : ''} ${shut ? 'dropdown--shut' : ''}`}
            onMouseLeave={() => { setDrop(null); setShut(false); }}
          >
            <NavLink to="/specializations/" onClick={(e) => { if (open) { e.preventDefault(); setDrop(drop === 'spec' ? null : 'spec'); setShut(false); } }}>Specialize ▾</NavLink>
            <div className="dropdown__menu dropdown__menu--brands" onClick={closeMenus}>
              {nav?.brands.map((b) => (
                <Link key={b.path} to={enc(b.path)} className="nav-brand">
                  {b.logo ? <img src={b.logo} alt="" width="36" height="22" /> : null}
                  {b.label}
                </Link>
              ))}
              <Link to="/specializations/" className="nav-brand nav-brand--all">All makes</Link>
            </div>
          </div>
          <NavLink to="/about/">About</NavLink>
          <NavLink to="/contact/">Contact</NavLink>
          <NavLink to="/booking/">Book</NavLink>
          <NavLink to="/blog/">Blog</NavLink>
        </nav>

        {site && (
          <div className="header__cta">
            <a className="btn btn--sm btn--wa header__wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a className="btn btn--sm header__phone" href={`tel:${site.mobile}`} aria-label={`Call ${site.mobile}`}>
              <PhoneIcon />
              <span className="header__num">{site.mobile.replace('+971', '+971 ').replace(/(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3')}</span>
              <span className="header__call">Call</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const { site, nav } = useSite();
  if (!site) return <footer className="footer" />;
  const list = (items) => items?.map((i) => (
    <li key={i.path}><Link to={enc(i.path)}>{i.keyword || i.label}</Link></li>
  ));
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={site.logo} alt={site.name} width="150" height="45" className="footer__logo" />
          <p>Keep your car running smoothly and safely with expert servicing. From oil changes to full inspections, we’ve got you covered.</p>
          <ContactActions site={site} variant="social" />
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li><li><Link to="/spare-parts/">Spare Parts</Link></li>
            <li><Link to="/services/">Services</Link></li>
            <li><Link to="/specializations/">Specialize</Link></li>
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
            <li><Link to="/booking/">Book</Link></li>
            <li><Link to="/careers/">Careers</Link></li>
            <li><Link to="/faq/">FAQ</Link></li><li><Link to="/blog/">Blog</Link></li><li><Link to="/gallery/">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{list(nav?.services)}</ul>
        </div>
        <div>
          <h4>Specialize</h4>
          <ul>{list(nav?.brands)}</ul>
          <h4 className="mt">Areas</h4>
          <ul>{list(nav?.locations)}</ul>
        </div>
        <div>
          <h4>Contact Information</h4>
          <ContactActions site={site} className="contact-actions--stack" />
          <ul className="contact nap__list">
            <li><a href={site.mapUrl} target="_blank" rel="noopener noreferrer">{site.addressLine}</a></li>
            <li><a href={`tel:${site.landline}`}>{site.landlineDisplay}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}

export default function Layout({ children }) {
  const { site } = useSite();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  // Inside the captured site shell the original header, footer and floating buttons already exist.
  if (inShell()) return <main id="main">{children}</main>;
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      {site && (
        <a className="float-wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">WhatsApp</a>
      )}
    </>
  );
}
