import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import BlogPost from './pages/BlogPost.jsx';
import JobPost from './pages/JobPost.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { useSite } from './SiteContext.jsx';

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

function waitForGtag() {
  return new Promise((resolve) => {
    if (window.__MM_GTAG_READY) return resolve();
    const t = setTimeout(resolve, 4000);
    window.__MM_GTAG_READY_CB = () => {
      clearTimeout(t);
      resolve();
    };
  });
}

function waitForWindowLoad() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', resolve, { once: true });
    setTimeout(resolve, 8000);
  });
}

function hideBoot() {
  const el = document.getElementById('mm-boot');
  if (!el) return;
  el.classList.add('mm-boot--done');
  setTimeout(() => el.remove(), 320);
}

function Analytics() {
  const { ready } = useSite();
  const { pathname, search } = useLocation();
  const [booted, setBooted] = useState(false);
  const path = pathname + search;

  useEffect(() => {
    const failsafe = setTimeout(() => { hideBoot(); setBooted(true); }, 12000);
    return () => clearTimeout(failsafe);
  }, []);

  useEffect(() => {
    if (!ready || booted) return;
    let cancelled = false;
    Promise.all([waitForGtag(), waitForWindowLoad()]).then(() => {
      if (cancelled) return;
      trackPageview(path);
      hideBoot();
      setBooted(true);
    });
    return () => { cancelled = true; };
  }, [ready, booted, path]);

  useEffect(() => {
    if (!booted) return;
    trackPageview(path);
  }, [booted, path]);

  return null;
}

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
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
