import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from './adminApi.js';
import Editor from './Editor.jsx';

function slugFrom(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function PostList() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const load = () => adminApi('/posts').then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function remove(row) {
    if (!window.confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    await adminApi(`/posts/${row.id}`, { method: 'DELETE' });
    load();
  }

  if (!rows) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>Blog posts</h1>
        <Link className="adm-btn" to="/admin/blogs/new">New post</Link>
      </div>
      <table className="adm-table">
        <thead><tr><th>Title</th><th>Category</th><th>Published</th><th /></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><Link to={`/admin/blogs/${r.id}`}>{r.title}</Link></td>
              <td>{r.category_name}</td>
              <td>{r.published ? new Date(r.published_at).toLocaleDateString() : 'Draft'}</td>
              <td className="adm-row-actions">
                <Link to={`/admin/blogs/${r.id}`}>View</Link>
                <Link to={`/admin/blogs/${r.id}/edit`}>Edit</Link>
                <button type="button" className="adm-link danger" onClick={() => remove(r)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !id ? { slug: slugFrom(e.target.value) } : {}) }));
  };

  useEffect(() => {
    adminApi('/categories').then(setCats).catch(() => {});
    if (!id) {
      setForm({
        title: '', slug: '', category_slug: 'care-tips', seo_title: '', meta_description: '',
        excerpt: '', image: '', body_html: '', published: true, published_at: new Date().toISOString().slice(0, 16),
      });
      return;
    }
    adminApi(`/posts/${id}`).then((r) => {
      const cat = (r.category_slug || '').replace(/а/g, 'a');
      setForm({
        ...r,
        category_slug: cat,
        body_html: r.body_html || '',
        published_at: r.published_at ? new Date(r.published_at).toISOString().slice(0, 16) : '',
      });
    }).catch((e) => setError(e.message));
  }, [id]);

  async function uploadCover(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    const { url } = await adminApi('/upload', { method: 'POST', body });
    setForm((f) => ({ ...f, image: url }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form, seo_title: form.seo_title || form.title, published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined };
      const saved = id
        ? await adminApi(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await adminApi('/posts', { method: 'POST', body: JSON.stringify(payload) });
      navigate(`/admin/blogs/${saved.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!form) return <p>{error || 'Loading…'}</p>;
  return (
    <form className="adm-form" onSubmit={submit}>
      <h1>{id ? 'Edit blog post' : 'New blog post'}</h1>
      <label>Title<input value={form.title} onChange={set('title')} required /></label>
      <label>URL slug<input value={form.slug} onChange={set('slug')} required /></label>
      <label>Category
        <select value={form.category_slug} onChange={set('category_slug')}>
          {cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </label>
      <label>SEO title<input value={form.seo_title || ''} onChange={set('seo_title')} /></label>
      <label>Excerpt<textarea rows="2" value={form.excerpt || ''} onChange={set('excerpt')} /></label>
      <label>Meta description<textarea rows="2" value={form.meta_description || ''} onChange={set('meta_description')} /></label>
      <label>Cover image
        {form.image && <img className="adm-thumb" src={form.image} alt="" />}
        <input value={form.image || ''} onChange={set('image')} placeholder="/images/… or /uploads/…" />
        <input type="file" accept="image/*" onChange={(e) => uploadCover(e).catch((err) => setError(err.message))} />
      </label>
      <label>Body
        <Editor key={id || 'new'} value={form.body_html} onChange={(html) => setForm((f) => ({ ...f, body_html: html }))} />
      </label>
      <div className="adm-checks">
        <label><input type="checkbox" checked={!!form.published} onChange={set('published')} /> Published</label>
        <label>Publish date<input type="datetime-local" value={form.published_at || ''} onChange={set('published_at')} /></label>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <div className="adm-actions">
        <button className="adm-btn" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <Link to={id ? `/admin/blogs/${id}` : '/admin/blogs'} className="adm-btn adm-btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}

export function PostShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    adminApi(`/posts/${id}`).then(setRow).catch((e) => setError(e.message));
  }, [id]);

  async function remove() {
    if (!window.confirm('Delete this post?')) return;
    await adminApi(`/posts/${id}`, { method: 'DELETE' });
    navigate('/admin/blogs');
  }

  if (!row) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>{row.title}</h1>
        <div className="adm-actions">
          <a className="adm-btn adm-btn--ghost" href={row.path} target="_blank" rel="noreferrer">Open on site</a>
          <Link className="adm-btn" to={`/admin/blogs/${id}/edit`}>Edit</Link>
          <button type="button" className="adm-btn adm-btn--danger" onClick={remove}>Delete</button>
        </div>
      </div>
      <p className="adm-muted">{row.category_name} · {row.published ? new Date(row.published_at).toLocaleString() : 'Draft'}</p>
      {row.image && <img className="adm-hero" src={row.image} alt="" />}
      <article className="prose adm-preview" dangerouslySetInnerHTML={{ __html: row.body_html || '<p>No body yet.</p>' }} />
    </>
  );
}
