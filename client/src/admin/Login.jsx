import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from './adminApi.js';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const d = await adminApi('/login', { method: 'POST', body: JSON.stringify(form) });
      onLogin(d.user);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-card" onSubmit={submit}>
        <img src="/images/master-mechanics-garage-logo.png" alt="Master Mechanics Garage LLC" width="150" height="45" />
        <h1>Admin sign in</h1>
        <label>Username<input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoComplete="username" required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="current-password" required /></label>
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
