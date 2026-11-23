import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import BlogPost from './pages/BlogPost.jsx';
import JobPost from './pages/JobPost.jsx';

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

const GA_ID = 'G-DCLB1EGJLW';

let lastPagePath = '';

function trackPageview(path) {
  if (typeof window.gtag !== 'function') return;
  if (lastPagePath === path) return;
  lastPagePath = path;
  window.gtag('event', 'page_view', {
    send_to: GA_ID,
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

function hideBoot() {
  const el = document.getElementById('mm-boot');
  if (!el) return;
  el.classList.add('mm-boot--done');
  setTimeout(() => el.remove(), 220);
}

function Analytics() {
  const { pathname, search } = useLocation();
  const [booted, setBooted] = useState(false);
  const path = pathname + search;

  useLayoutEffect(() => {
    hideBoot();
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return;
    if (window.__MM_GTAG_READY) {
      trackPageview(path);
      return;
    }
    const prev = window.__MM_GTAG_READY_CB;
    window.__MM_GTAG_READY_CB = () => {
      if (typeof prev === 'function') prev();
      trackPageview(path);
    };
    const t = setTimeout(() => trackPageview(path), 4000);
    return () => clearTimeout(t);
  }, [booted, path]);

  return null;
}

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
      <Route
        path="/admin/*"
        element={(
          <Suspense fallback={<div className="container loading">Loading admin…</div>}>
            <AdminApp />
          </Suspense>
        )}
      />
      <Route
        path="*"
        element={(
          <Layout>
            <Routes>
              <Route path="/blog/category/:slug" element={<DynamicPage />} />
              <Route path="/blog/:category/:slug" element={<BlogPost />} />
              <Route path="/careers/:slug" element={<JobPost />} />
              <Route path="/appointment" element={<Navigate to="/booking/" replace />} />
              <Route path="/appointment/" element={<Navigate to="/booking/" replace />} />
              <Route path="*" element={<DynamicPage />} />
            </Routes>
          </Layout>
        )}
      />
      </Routes>
    </>
  );
}
