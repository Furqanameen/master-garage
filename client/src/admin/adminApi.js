export async function adminApi(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const res = await fetch('/api/admin' + path, {
    credentials: 'include',
    headers: isForm ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (res.status === 401 && path !== '/me' && path !== '/login') {
    window.location.assign('/admin/login');
    throw new Error('Please sign in.');
  }
  if (!res.ok) {
    let msg = res.statusText;
    try { msg = (await res.json()).error || msg; } catch { /* ignore */ }
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}
