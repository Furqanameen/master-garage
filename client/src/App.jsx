import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import BlogPost from './pages/BlogPost.jsx';
import JobPost from './pages/JobPost.jsx';
import AdminApp from './admin/AdminApp.jsx';

export default function App() {
  return (
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
  );
}
