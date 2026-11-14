import { Link } from '../components/Link.jsx';

export default function NotFound() {
  return (
    <div className="container narrow notfound">
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist or has moved.</p>
      <p><Link className="btn" to="/">Back to the homepage</Link> <Link className="btn btn--ghost" to="/services/">Our services</Link></p>
    </div>
  );
}
