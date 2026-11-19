import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useSite } from '../SiteContext.jsx';
import { WhatsAppIcon } from './SocialLinks.jsx';

const empty = { name: '', email: '', phone: '', vehicle: '', message: '', website: '' };
const EMAIL_OK = /^\S+@\S+\.\S+$/;
const PHONE_OK = /^[+\d][\d\s()-]{6,}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  else if (form.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_OK.test(form.email.trim())) errors.email = 'Please enter a valid email.';
  if (!form.phone.trim()) errors.phone = 'Phone is required.';
  else if (!PHONE_OK.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className={error ? 'lead__field lead__field--err' : 'lead__field'}>
      {label}
      {children}
      {error ? <span className="lead__err" role="alert">{error}</span> : null}
    </label>
  );
}

export default function LeadForm({
  title = 'Schedule Your Appointment',
  compact = false,
  apply = false,
  centered = false,
}) {
  const { site } = useSite();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
  };

  async function submit(e) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus({ state: 'error', message: 'Please fill in the required fields.' });
      return;
    }
    setStatus({ state: 'sending', message: '' });
    try {
      await api('/leads', { method: 'POST', body: JSON.stringify({ ...form, source_page: pathname }) });
      setStatus({ state: 'ok', message: 'Thank you! We have your request and will contact you shortly.' });
      setForm(empty);
      setErrors({});
      if (compact) navigate('/thank-you/');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please call or WhatsApp us.' });
    }
  }

  const fields = (
    <>
      <Field label="Name" error={errors.name}>
        <input value={form.name} onChange={set('name')} required autoComplete="name" placeholder="Name" aria-invalid={!!errors.name} />
      </Field>
      <Field label="Email" error={errors.email}>
        <input type="email" value={form.email} onChange={set('email')} required autoComplete="email" placeholder="Email" aria-invalid={!!errors.email} />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input value={form.phone} onChange={set('phone')} required inputMode="tel" autoComplete="tel" placeholder="Phone" aria-invalid={!!errors.phone} />
      </Field>
      <Field label={apply ? 'Years of experience' : 'Vehicle details'}>
        <input
          value={form.vehicle}
          onChange={set('vehicle')}
          placeholder={apply ? 'e.g. 5 years' : 'BMW, X5, 2025'}
        />
      </Field>
      <Field label={apply ? 'About you / CV notes' : 'Message'}>
        <textarea rows="4" value={form.message} onChange={set('message')} placeholder={apply ? '' : 'How can we help?'} />
      </Field>
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

  if (centered) {
    return (
      <section className="lead lead--centered" id="booking">
        <div className="lead__center">
          <h2>{title}</h2>
          <p>Name, email and phone are required. We’ll confirm your appointment shortly.</p>
          {formEl}
        </div>
      </section>
    );
  }

  return (
    <section className="lead" id="booking">
      <div className="container lead__inner">
        <div>
          <h2>{title}</h2>
          <p>{apply
            ? 'Send your details and we will contact you on WhatsApp or phone. No need to attach a file here.'
            : 'Tell us about your car and we’ll confirm a time and an estimate. Prefer chat? Message us on WhatsApp.'}</p>
          {site && (
            <a className="btn btn--wa lead__wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>WhatsApp us</span>
            </a>
          )}
        </div>
        {formEl}
      </div>
    </section>
  );
}
