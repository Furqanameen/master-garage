import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { adminApi } from './adminApi.js';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import { ServiceForm, ServiceList, ServiceShow } from './Services.jsx';
import { SpecForm, SpecList, SpecShow } from './Specializations.jsx';
import { PostForm, PostList, PostShow } from './Posts.jsx';
import { JobForm, JobList, JobShow } from './Jobs.jsx';
import './admin.css';

function Shell({ user, onLogout, children }) {
  return (
    <div className="adm">
      <aside className="adm-side">
        <Link to="/admin" className="adm-brand">Master Mechanics</Link>
        <p className="adm-muted">Admin</p>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/services">Services</NavLink>
          <NavLink to="/admin/specializations">Specializations</NavLink>
          <NavLink to="/admin/blogs">Blogs</NavLink>
          <NavLink to="/admin/careers">Careers</NavLink>
        </nav>
        <div className="adm-side__foot">
          <span>{user}</span>
          <button type="button" className="adm-link" onClick={onLogout}>Sign out</button>
          <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
        </div>
      </aside>
      <div className="adm-main">{children}</div>
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    adminApi('/me')
      .then((d) => { setUser(d.user); setReady(true); })
      .catch(() => { setUser(null); setReady(true); });
  }, []);

  async function logout() {
    await adminApi('/logout', { method: 'POST' });
    setUser(null);
    navigate('/admin/login');
  }

  if (!ready) return <div className="adm-boot">Loading admin…</div>;

  return (
    <Routes>
      <Route path="login" element={user ? <Navigate to="/admin" replace /> : <Login onLogin={setUser} />} />
      <Route
        path="*"
        element={
          !user ? (
            <Navigate to="/admin/login" replace />
          ) : (
            <Shell user={user} onLogout={logout}>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServiceList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/:id" element={<ServiceShow />} />
                <Route path="services/:id/edit" element={<ServiceForm />} />
                <Route path="specializations" element={<SpecList />} />
                <Route path="specializations/new" element={<SpecForm />} />
                <Route path="specializations/:id" element={<SpecShow />} />
                <Route path="specializations/:id/edit" element={<SpecForm />} />
                <Route path="blogs" element={<PostList />} />
                <Route path="blogs/new" element={<PostForm />} />
                <Route path="blogs/:id" element={<PostShow />} />
                <Route path="blogs/:id/edit" element={<PostForm />} />
                <Route path="careers" element={<JobList />} />
                <Route path="careers/new" element={<JobForm />} />
                <Route path="careers/:id" element={<JobShow />} />
                <Route path="careers/:id/edit" element={<JobForm />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Shell>
          )
        }
      />
    </Routes>
  );
}
