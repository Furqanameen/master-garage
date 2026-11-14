import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { adminApi } from './adminApi.js';

export default function Dashboard() {
  const [counts, setCounts] = useState({ services: 0, specs: 0, posts: 0, jobs: 0 });
  useEffect(() => {
    Promise.all([adminApi('/services'), adminApi('/specializations'), adminApi('/posts'), adminApi('/jobs')]).then(([s, b, p, j]) => {
      setCounts({ services: s.length, specs: b.length, posts: p.length, jobs: j.length });
    }).catch(() => {});
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <p className="adm-lead">Create, edit, preview and delete services, specialist makes, blog posts and job listings. Keep each page’s title and keywords unique and short.</p>
      <div className="adm-stats">
        <Link to="/admin/services" className="adm-stat">
          <strong>{counts.services}</strong>
          <span>Services</span>
        </Link>
        <Link to="/admin/specializations" className="adm-stat">
          <strong>{counts.specs}</strong>
          <span>Specializations</span>
        </Link>
        <Link to="/admin/blogs" className="adm-stat">
          <strong>{counts.posts}</strong>
          <span>Blog posts</span>
        </Link>
        <Link to="/admin/careers" className="adm-stat">
          <strong>{counts.jobs}</strong>
          <span>Jobs</span>
        </Link>
      </div>
      <div className="adm-actions">
        <Link className="adm-btn" to="/admin/services/new">New service</Link>
        <Link className="adm-btn" to="/admin/specializations/new">New specialist make</Link>
        <Link className="adm-btn adm-btn--ghost" to="/admin/blogs/new">New blog post</Link>
        <Link className="adm-btn adm-btn--ghost" to="/admin/careers/new">New job</Link>
      </div>
    </>
  );
}
