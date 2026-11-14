import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import BlogPost from './pages/BlogPost.jsx';
import JobPost from './pages/JobPost.jsx';
import AdminApp from './admin/AdminApp.jsx';

const GA_ID = 'G-DCLB1EGJLW';

function Analytics() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, { page_path: pathname + search });
  }, [pathname, search]);
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
