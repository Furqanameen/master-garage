import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from './adminApi.js';
import Editor from './Editor.jsx';

function slugFrom(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Temporary'];

export function JobList() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const load = () => adminApi('/jobs').then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function toggle(row) {
    await adminApi(`/jobs/${row.id}/toggle`, { method: 'POST' });
    load();
  }

  async function remove(row) {
    if (!window.confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    await adminApi(`/jobs/${row.id}`, { method: 'DELETE' });
    load();
  }

  if (!rows) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>Careers</h1>
        <Link className="adm-btn" to="/admin/careers/new">New job</Link>
      </div>
      <p className="adm-muted">Active jobs appear on /careers/. Inactive jobs stay in this list only.</p>
      <table className="adm-table">
        <thead><tr><th>Title</th><th>Type</th><th>Status</th><th /></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><Link to={`/admin/careers/${r.id}`}>{r.title}</Link></td>
              <td>{r.employment_type}{r.department ? ` · ${r.department}` : ''}</td>
              <td>{r.published ? 'Active' : 'Inactive'}</td>
              <td className="adm-row-actions">
                <button type="button" className="adm-link" onClick={() => toggle(r)}>{r.published ? 'Set inactive' : 'Set active'}</button>
                <Link to={`/admin/careers/${r.id}/edit`}>Edit</Link>
                <button type="button" className="adm-link danger" onClick={() => remove(r)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p className="adm-muted">No jobs yet. Create one with the rich-text editor.</p>}
    </>
  );
}

export function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !id ? { slug: slugFrom(e.target.value) } : {}) }));
  };

  useEffect(() => {
    if (!id) {
      setForm({
        title: '', slug: '', seo_title: '', meta_description: '', excerpt: '',
        department: 'Workshop', employment_type: 'Full-time',
        location: 'Dubai Investment Park 2, Dubai', body_html: '', published: true, sort_order: 50,
      });
      return;
    }
    adminApi(`/jobs/${id}`).then(setForm).catch((e) => setError(e.message));
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form, seo_title: form.seo_title || form.title };
      const saved = id
        ? await adminApi(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await adminApi('/jobs', { method: 'POST', body: JSON.stringify(payload) });
      navigate(`/admin/careers/${saved.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!form) return <p>{error || 'Loading…'}</p>;
  return (
    <form className="adm-form" onSubmit={submit}>
      <h1>{id ? 'Edit job' : 'New job'}</h1>
      <label>Job title<input value={form.title} onChange={set('title')} required /></label>
      <label>URL slug (/careers/…/)<input value={form.slug} onChange={set('slug')} required /></label>
      <label>Department<input value={form.department || ''} onChange={set('department')} placeholder="Workshop, Admin…" /></label>
      <label>Employment type
        <select value={form.employment_type} onChange={set('employment_type')}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label>Location<input value={form.location || ''} onChange={set('location')} /></label>
      <label>SEO title (≤60)<input value={form.seo_title || ''} onChange={set('seo_title')} maxLength={60} /></label>
      <label>Short listing text<textarea rows="2" value={form.excerpt || ''} onChange={set('excerpt')} /></label>
      <label>Meta description (≤145)<textarea rows="2" value={form.meta_description || ''} onChange={set('meta_description')} maxLength={145} /></label>
      <label>Job description
        <Editor key={id || 'new'} value={form.body_html || ''} onChange={(html) => setForm((f) => ({ ...f, body_html: html }))} />
      </label>
      <div className="adm-checks">
        <label><input type="checkbox" checked={!!form.published} onChange={set('published')} /> Active (show on /careers/)</label>
        <label>Sort order<input type="number" min="0" max="9999" value={form.sort_order ?? 50} onChange={set('sort_order')} /></label>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <div className="adm-actions">
        <button className="adm-btn" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <Link to={id ? `/admin/careers/${id}` : '/admin/careers'} className="adm-btn adm-btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}

export function JobShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    adminApi(`/jobs/${id}`).then(setRow).catch((e) => setError(e.message));
  }, [id]);

  async function toggle() {
    const next = await adminApi(`/jobs/${id}/toggle`, { method: 'POST' });
    setRow(next);
  }

  async function remove() {
    if (!window.confirm('Delete this job?')) return;
    await adminApi(`/jobs/${id}`, { method: 'DELETE' });
    navigate('/admin/careers');
  }

  if (!row) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>{row.title}</h1>
        <div className="adm-actions">
          {row.published && <a className="adm-btn adm-btn--ghost" href={row.path} target="_blank" rel="noreferrer">Open on site</a>}
          <button type="button" className="adm-btn adm-btn--ghost" onClick={toggle}>{row.published ? 'Set inactive' : 'Set active'}</button>
          <Link className="adm-btn" to={`/admin/careers/${id}/edit`}>Edit</Link>
          <button type="button" className="adm-btn adm-btn--danger" onClick={remove}>Delete</button>
        </div>
      </div>
      <p className="adm-muted">{row.published ? 'Active' : 'Inactive'} · {row.employment_type} · {row.location}</p>
      <article className="prose adm-preview" dangerouslySetInnerHTML={{ __html: row.body_html || '<p>No description yet.</p>' }} />
    </>
  );
}
