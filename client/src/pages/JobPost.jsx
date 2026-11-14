import { useParams } from 'react-router-dom';
import { Link } from '../components/Link.jsx';
import { useApi } from '../api.js';
import { useSeo } from '../seo.js';
import { PageHero } from '../components/Content.jsx';
import LeadForm from '../components/LeadForm.jsx';
import NotFound from './NotFound.jsx';

export default function JobPost() {
  const { slug } = useParams();
  const { data: job, error, loading } = useApi(`/job?slug=${encodeURIComponent(slug)}`);

  useSeo({
    title: job?.seo_title || job?.title,
    description: job?.meta_description || job?.excerpt,
    canonicalPath: job?.path,
    noindex: !!error,
    keywords: job ? `${job.title} DIP, garage jobs Dubai` : undefined,
  });

  if (loading) return <div className="container loading" aria-busy="true">Loading…</div>;
  if (error || !job) return <NotFound />;

  return (
    <>
      <PageHero h1={job.title} kicker="Careers" subtitle={`${job.employment_type}${job.department ? ` · ${job.department}` : ''} · ${job.location}`} />
      <div className="container narrow">
        <p className="meta"><Link to="/careers/">All open roles</Link></p>
        <article className="prose" dangerouslySetInnerHTML={{ __html: job.body_html || `<p>${job.excerpt || ''}</p>` }} />
      </div>
      <LeadForm apply title="Apply for this role" defaultService={`Job: ${job.title}`} />
    </>
  );
}
