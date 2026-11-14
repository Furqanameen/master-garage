import { useParams } from 'react-router-dom';
import { Link } from '../components/Link.jsx';
import { useApi } from '../api.js';
import { useSeo } from '../seo.js';
import { PageHero, Article, RelatedStrip } from '../components/Content.jsx';
import LeadForm from '../components/LeadForm.jsx';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { category, slug } = useParams();
  const { data: post, error, loading } = useApi(
    `/post?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`,
  );

  useSeo({
    title: post?.seo_title || post?.title,
    description: post?.meta_description || post?.excerpt,
    canonicalPath: post?.path,
    image: post?.image,
    noindex: !!error,
    keywords: post?.content?.keywords,
  });

  if (loading) return <div className="container loading" aria-busy="true">Loading…</div>;
  if (error || !post) return <NotFound />;

  return (
    <>
      <PageHero h1={post.title} kicker={post.category_name} />
      <div className="container narrow">
        <p className="meta">
          <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          {' · '}<Link to="/blog/">All articles</Link>
        </p>
        {post.image && <img className="post__img" src={post.image} alt={post.title} width="960" height="540" />}
        <Article content={post.content} bodyHtml={post.body_html} faq={post.faq} />
      </div>
      <RelatedStrip links={post.content?.related_links || post.content?.related} title="Related in Dubai" />
      <LeadForm title="Book a service" />
    </>
  );
}
