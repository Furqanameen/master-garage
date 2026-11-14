import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import BlogPost from './pages/BlogPost.jsx';
import JobPost from './pages/JobPost.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { useSite } from './SiteContext.jsx';

const GA_ID = 'G-DCLB1EGJLW';

function waitForGtag() {
  return new Promise((resolve) => {
    if (window.__MM_GTAG_READY) return resolve();
    const t = setTimeout(resolve, 4000);
    const prev = window.__MM_GTAG_READY_CB;
    window.__MM_GTAG_READY_CB = () => {
      clearTimeout(t);
      resolve();
      if (typeof prev === 'function') prev();
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
  const first = useRef(true);
  const startPath = useRef(pathname + search);

  useEffect(() => {
    const failsafe = setTimeout(() => { hideBoot(); setBooted(true); }, 12000);
    return () => clearTimeout(failsafe);
  }, []);

  useEffect(() => {
    if (!ready || booted) return;
    let cancelled = false;
    Promise.all([waitForGtag(), waitForWindowLoad()]).then(() => {
      if (cancelled) return;
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_ID, { page_path: startPath.current });
      }
      hideBoot();
      setBooted(true);
    });
    return () => { cancelled = true; };
  }, [ready, booted]);

  useEffect(() => {
    if (!booted) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, { page_path: pathname + search });
  }, [booted, pathname, search]);

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
