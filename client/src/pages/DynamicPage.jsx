import { useLocation } from 'react-router-dom';
import { useApi } from '../api.js';
import { useSeo } from '../seo.js';
import { PageHero, Article, RelatedStrip, ContactDetails } from '../components/Content.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Home from './Home.jsx';
import { ServicesIndex, SpareParts, FaqPage, GalleryPage, BlogIndex, SpecializationsIndex, CareersIndex, BrandPage, ContactPage, BookingPage } from './Lists.jsx';
import NotFound from './NotFound.jsx';

const withSlash = (p) => (p.endsWith('/') ? p : p + '/');

export default function DynamicPage() {
  const { pathname } = useLocation();
  const path = withSlash(pathname);
  const { data: page, error, loading } = useApi(`/page?path=${encodeURIComponent(path)}`);

  useSeo({
    title: page?.title || (error ? 'Page not found – Master Mechanics' : undefined),
    description: page?.meta_description,
    canonicalPath: page?.path,
    image: page?.hero_image || page?.card_image,
    noindex: !!error || page?.noindex,
    keywords: page?.content?.keywords,
  });

  if (loading) return <div className="container loading" aria-busy="true">Loading…</div>;
  if (error?.status === 404 || !page) return <NotFound />;

  switch (page.type) {
    case 'home': return <Home page={page} />;
    case 'services_index': return <ServicesIndex page={page} />;
    case 'spare_parts': return <SpareParts page={page} />;
    case 'faq': return <FaqPage page={page} />;
    case 'gallery': return <GalleryPage page={page} />;
    case 'specializations_index': return <SpecializationsIndex page={page} />;
    case 'brand':
    case 'specialization': return <BrandPage page={page} />;
    case 'careers_index': return <CareersIndex page={page} />;
    case 'contact': return <ContactPage page={page} />;
    case 'booking': return <BookingPage page={page} />;
    case 'blog_index':
    case 'blog_category': return <BlogIndex page={page} />;
    default: { // static | service | location
      const related = page.content?.related_links || page.content?.related;
      const kicker = {
        service: 'Our services',
        location: 'Areas we serve',
      }[page.type];
      if (page.path === '/contact/') return <ContactPage page={page} />;
      if (page.path === '/booking/') return <BookingPage page={page} />;
      const about = page.path === '/about/';
      const aboutContent = about
        ? { ...page.content, sections: (page.content?.sections || []).filter((s) => !/contact/i.test(s.heading || '')) }
        : page.content;
      return (
        <>
          <PageHero
            h1={page.h1 || page.title}
            subtitle={page.subtitle}
            image={page.type === 'static' ? page.hero_image : null}
            kicker={kicker}
          />
          <div className="container narrow">
            <Article content={aboutContent} bodyHtml={about ? null : page.body_html} faq={page.faq} h1={page.h1 || page.title} />
            {about ? <><h2>Contact us</h2><ContactDetails /></> : null}
          </div>
          {page.body_html && page.path !== '/about/' ? <RelatedStrip links={related} /> : null}
          {page.path !== '/thank-you/' && (
            <LeadForm defaultService={page.type === 'service' || page.type === 'brand' ? page.nav_label : ''} />
          )}
        </>
      );
    }
  }
}
