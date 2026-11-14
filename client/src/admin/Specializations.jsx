import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from './adminApi.js';
import Editor from './Editor.jsx';

function slugFrom(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function SpecList() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const load = () => adminApi('/specializations').then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function remove(row) {
    if (!window.confirm(`Delete “${row.nav_label || row.h1}”? This cannot be undone.`)) return;
    await adminApi(`/specializations/${row.id}`, { method: 'DELETE' });
    load();
  }

  if (!rows) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>Specializations</h1>
        <Link className="adm-btn" to="/admin/specializations/new">New specialist make</Link>
      </div>
      <p className="adm-lead">One page per car make. Logo shows in the Specialize menu. Keep the SEO title under 60 characters and the meta description under 145.</p>
      <table className="adm-table">
        <thead><tr><th>Make</th><th>URL</th><th>Published</th><th /></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <Link to={`/admin/specializations/${r.id}`} className="adm-make">
                  {r.card_image ? <img src={r.card_image} alt="" /> : null}
                  {r.nav_label || r.h1}
                </Link>
              </td>
              <td><code>{r.path}</code></td>
              <td>{r.published ? 'Yes' : 'Draft'}</td>
              <td className="adm-row-actions">
                <Link to={`/admin/specializations/${r.id}`}>View</Link>
                <Link to={`/admin/specializations/${r.id}/edit`}>Edit</Link>
                <button type="button" className="adm-link danger" onClick={() => remove(r)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function SpecForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v, ...(k === 'h1' && !id ? { slug: slugFrom(e.target.value) } : {}) }));
  };

  useEffect(() => {
    if (!id) {
      setForm({
        h1: '', title: '', slug: '', nav_label: '', subtitle: '', meta_description: '',
        card_image: '', body_html: '', keywords: '', related_text: '', published: true, sort_order: 50,
      });
      return;
    }
    adminApi(`/specializations/${id}`).then((r) => {
      setForm({
        ...r,
        slug: r.path.replace(/^\/|\/$/g, ''),
        body_html: r.body_html || '',
        keywords: r.keywords || '',
        related_text: r.related_text || '',
      });
    }).catch((e) => setError(e.message));
  }, [id]);

  async function uploadCard(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    const { url } = await adminApi('/upload', { method: 'POST', body });
    setForm((f) => ({ ...f, card_image: url }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form, title: form.title || form.h1, nav_label: form.nav_label || form.h1 };
      const saved = id
        ? await adminApi(`/specializations/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await adminApi('/specializations', { method: 'POST', body: JSON.stringify(payload) });
      navigate(`/admin/specializations/${saved.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!form) return <p>{error || 'Loading…'}</p>;
  return (
    <form className="adm-form" onSubmit={submit}>
      <h1>{id ? 'Edit specialization' : 'New specialization'}</h1>
      <label>Headline (H1)<input value={form.h1} onChange={set('h1')} required /></label>
      <label>Menu label (make name)<input value={form.nav_label} onChange={set('nav_label')} placeholder="BMW" /></label>
      <label>SEO title ({(form.title || '').length}/60)<input value={form.title} onChange={set('title')} maxLength={60} /></label>
      <label>URL slug<code>/{form.slug || '…'}/</code><input value={form.slug} onChange={set('slug')} required /></label>
      <label>Subtitle<input value={form.subtitle || ''} onChange={set('subtitle')} /></label>
      <label>Meta description ({(form.meta_description || '').length}/145)
        <textarea rows="2" maxLength={145} value={form.meta_description || ''} onChange={set('meta_description')} />
      </label>
      <label>Keywords (4–6 short phrases)
        <input value={form.keywords || ''} onChange={set('keywords')} placeholder="BMW specialist DIP, BMW service Dubai" maxLength={160} />
      </label>
      <label>Related URLs (one per line: services, other makes, blogs)
        <textarea rows="4" value={form.related_text || ''} onChange={set('related_text')} placeholder="/ac-repair-service/&#10;/bmw-service-dubai/" />
      </label>
      <label>Make logo
        {form.card_image && <img className="adm-thumb" src={form.card_image} alt="" />}
        <input value={form.card_image || ''} onChange={set('card_image')} placeholder="/uploads/…" />
        <input type="file" accept="image/*" onChange={(e) => uploadCard(e).catch((err) => setError(err.message))} />
      </label>
      <label>Body
        <Editor key={id || 'new'} value={form.body_html} onChange={(html) => setForm((f) => ({ ...f, body_html: html }))} />
      </label>
      <div className="adm-checks">
        <label><input type="checkbox" checked={!!form.published} onChange={set('published')} /> Published</label>
        <label>Order<input type="number" value={form.sort_order} onChange={set('sort_order')} /></label>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <div className="adm-actions">
        <button className="adm-btn" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <Link to={id ? `/admin/specializations/${id}` : '/admin/specializations'} className="adm-btn adm-btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}

export function SpecShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    adminApi(`/specializations/${id}`).then(setRow).catch((e) => setError(e.message));
  }, [id]);

  async function remove() {
    if (!window.confirm('Delete this specialization?')) return;
    await adminApi(`/specializations/${id}`, { method: 'DELETE' });
    navigate('/admin/specializations');
  }

  if (!row) return <p>{error || 'Loading…'}</p>;
  return (
    <>
      <div className="adm-head">
        <h1>{row.h1}</h1>
        <div className="adm-actions">
          <a className="adm-btn adm-btn--ghost" href={row.path} target="_blank" rel="noreferrer">Open on site</a>
          <Link className="adm-btn" to={`/admin/specializations/${id}/edit`}>Edit</Link>
          <button type="button" className="adm-btn adm-btn--danger" onClick={remove}>Delete</button>
        </div>
      </div>
      <p className="adm-muted">{row.path} · {row.published ? 'Published' : 'Draft'}</p>
      {row.card_image && <img className="adm-hero" src={row.card_image} alt="" />}
      <article className="prose adm-preview" dangerouslySetInnerHTML={{ __html: row.body_html || '<p>No body yet.</p>' }} />
    </>
  );
}
