import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useSite } from '../SiteContext.jsx';

export default function LeadForm({
  title = 'Schedule Your Appointment',
  compact = false,
  apply = false,
}) {
  const { site } = useSite();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState({
    name: '', email: '', phone: '', vehicle: '', message: '', website: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    try {
      await api('/leads', { method: 'POST', body: JSON.stringify({ ...form, source_page: pathname }) });
      setStatus({ state: 'ok', message: 'Thank you! We have your request and will contact you shortly.' });
      setForm({ name: '', email: '', phone: '', vehicle: '', message: '', website: '' });
      if (compact) navigate('/thank-you/');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please call or WhatsApp us.' });
    }
  }

  const fields = (
    <>
      <label>Name<input value={form.name} onChange={set('name')} required autoComplete="name" placeholder="Name" /></label>
      <label>Email<input type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="Email" /></label>
      <label>Phone<input value={form.phone} onChange={set('phone')} required inputMode="tel" autoComplete="tel" placeholder="Phone" /></label>
      <label>{apply ? 'Years of experience' : 'Vehicle details'}
        <input
          value={form.vehicle}
          onChange={set('vehicle')}
          placeholder={apply ? 'e.g. 5 years' : 'BMW, X5, 2025'}
        />
      </label>
      <label>{apply ? 'About you / CV notes' : 'Message'}
        <textarea rows="4" value={form.message} onChange={set('message')} placeholder={apply ? '' : 'How can we help?'} />
      </label>
    </>
  );

  const formEl = (
    <form onSubmit={submit} className={compact ? 'lead__form lead__form--light' : 'lead__form'} noValidate>
      {fields}
      <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} name="website" />
      <button className="btn" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : compact ? 'Enquire Now' : 'Send'}
      </button>
      {status.message && <p className={`form-msg form-msg--${status.state}`} role="status">{status.message}</p>}
    </form>
  );

  if (compact) return formEl;

  return (
    <section className="lead" id="booking">
      <div className="container lead__inner">
        <div>
          <h2>{title}</h2>
          <p>{apply
            ? 'Send your details and we will contact you on WhatsApp or phone. No need to attach a file here.'
            : 'Tell us about your car and we’ll confirm a time and an estimate. Prefer chat? Message us on WhatsApp.'}</p>
          {site && <a className="btn btn--wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
        </div>
        {formEl}
      </div>
    </section>
  );
}
