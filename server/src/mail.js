import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';
import { site } from './site.js';

const STAFF_TO = config.leadEmailTo || site.email || 'carcare@mastermechanics.ae';
const LOGO_CID = 'mm-logo@mastermechanics';
const LOGO_FILE = path.join(config.publicDir, 'images', 'master-mechanics-garage-logo.png');
const ORIGIN = (() => {
  try {
    const h = new URL(config.siteUrl).hostname;
    if (h && h !== 'localhost' && h !== '127.0.0.1') return config.siteUrl.replace(/\/+$/, '');
  } catch { /* fall through */ }
  return 'https://mastermechanics.ae';
})();

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function logoAttachment() {
  if (!fs.existsSync(LOGO_FILE)) return [];
  return [{
    filename: 'master-mechanics-garage-logo.png',
    path: LOGO_FILE,
    cid: LOGO_CID,
    contentType: 'image/png',
  }];
}

function logoSrc() {
  if (fs.existsSync(LOGO_FILE)) return `cid:${LOGO_CID}`;
  return `${ORIGIN}${site.logo}`;
}

function layout({ title, preheader, inner }) {
  const wa = `https://wa.me/${site.whatsapp}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Segoe UI,Arial,sans-serif;color:#334155;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(15,23,42,.08);">
          <tr>
            <td style="background:#0f172a;padding:22px 28px;text-align:center;">
              <img src="${esc(logoSrc())}" alt="Master Mechanics Garage LLC" width="180" style="display:inline-block;max-width:180px;height:auto;background:#fff;padding:10px 14px;border-radius:8px;" />
              <p style="margin:14px 0 0;color:#fb923c;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">${esc(site.tagline)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px 8px;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;text-align:center;">
              <a href="${esc(wa)}" style="display:inline-block;margin:6px;padding:12px 20px;border-radius:999px;background:#25d366;color:#fff;text-decoration:none;font-weight:700;font-size:14px;">WhatsApp us</a>
              <a href="tel:${esc(site.mobile)}" style="display:inline-block;margin:6px;padding:12px 20px;border-radius:999px;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;font-size:14px;">Call ${esc(site.mobileDisplay)}</a>
            </td>
          </tr>
          <tr>
            <td style="background:#0f172a;color:#94a3b8;padding:20px 28px;font-size:12px;line-height:1.6;text-align:center;">
              <strong style="color:#fff;">${esc(site.name)}</strong><br />
              ${esc(site.streetAddress)}, ${esc(site.addressLocality)}, Dubai<br />
              ${esc(site.hours)}<br />
              <a href="mailto:${esc(site.email)}" style="color:#fdba74;">${esc(site.email)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildCustomerEmail(lead) {
  const name = (lead.name || '').trim() || 'there';
  const subject = `Hi thanks ${name}, Our Team member will connect you soon:`;
  const text = [
    `Welcome ${name},`,
    '',
    'Thank you for contacting Master Mechanics Garage.',
    'Our advisor will contact you soon.',
    '',
    lead.vehicle ? `Vehicle: ${lead.vehicle}` : null,
    lead.message ? `Your message: ${lead.message}` : null,
    '',
    `WhatsApp: +${site.whatsapp.replace(/^\+/, '')}`,
    `Call: ${site.mobileDisplay}`,
    site.email,
  ].filter((l) => l !== null).join('\n');

  const html = layout({
    title: subject,
    preheader: 'Welcome — our advisor will contact you soon.',
    inner: `
      <h1 style="margin:0 0 12px;font:700 26px/1.2 'Barlow Condensed',Arial Narrow,sans-serif;color:#0f172a;">Welcome, ${esc(name)}</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65;">Thank you for reaching out to Master Mechanics. <strong>Our advisor will contact you soon</strong> to help with your enquiry.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;">
        <tr>
          <td style="padding:16px 18px;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 8px;color:#9a3412;font-weight:700;text-transform:uppercase;font-size:11px;letter-spacing:.08em;">Your request</p>
            <p style="margin:0;"><strong>Name:</strong> ${esc(lead.name)}</p>
            <p style="margin:6px 0 0;"><strong>Email:</strong> ${esc(lead.email)}</p>
            <p style="margin:6px 0 0;"><strong>Phone:</strong> ${esc(lead.phone)}</p>
            ${lead.vehicle ? `<p style="margin:6px 0 0;"><strong>Vehicle:</strong> ${esc(lead.vehicle)}</p>` : ''}
            ${lead.service ? `<p style="margin:6px 0 0;"><strong>Service:</strong> ${esc(lead.service)}</p>` : ''}
            ${lead.message ? `<p style="margin:6px 0 0;"><strong>Message:</strong> ${esc(lead.message)}</p>` : ''}
          </td>
        </tr>
      </table>
      <p style="margin:18px 0 0;font-size:14px;color:#64748b;">If you need us sooner, tap WhatsApp or Call below. This email is from ${esc(site.email)}.</p>
    `,
  });

  return {
    to: lead.email,
    from: config.smtpFrom,
    replyTo: site.email,
    subject,
    text,
    html,
    attachments: logoAttachment(),
  };
}

export function buildLeadEmail(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Vehicle', lead.vehicle],
    ['Service', lead.service],
    ['Page', lead.source_page],
    ['Message', lead.message],
  ].filter(([, v]) => v);

  const who = lead.name || 'Website visitor';
  const subject = `New enquiry from ${who} — please contact them shortly`;
  const text = [
    'New website enquiry. Please contact this customer shortly.',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    lead.email ? `Reply directly to ${lead.email} or call ${lead.phone || ''}.` : `Call ${lead.phone || ''}.`,
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: `Please contact ${who} shortly`,
    inner: `
      <h1 style="margin:0 0 12px;font:700 26px/1.2 'Barlow Condensed',Arial Narrow,sans-serif;color:#0f172a;">New website enquiry</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65;"><strong>Please contact this customer shortly.</strong> Their details from the booking / contact form:</p>
      <table cellpadding="8" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;">
        ${rows.map(([k, v]) => `<tr><td style="border:1px solid #e2e8f0;color:#64748b;width:120px;">${esc(k)}</td><td style="border:1px solid #e2e8f0;color:#0f172a;">${esc(v)}</td></tr>`).join('')}
      </table>
      <p style="margin:18px 0 0;font-size:14px;color:#64748b;">Reply to this email to reach the customer, or use WhatsApp / Call below.</p>
    `,
  });

  return {
    to: STAFF_TO,
    from: config.smtpFrom,
    replyTo: lead.email || site.email,
    subject,
    text,
    html,
    attachments: logoAttachment(),
  };
}

async function transporter() {
  if (!config.smtpHost) return null;
  let nodemailer;
  try {
    nodemailer = (await import('nodemailer')).default;
  } catch {
    console.error('[leads] nodemailer missing — run: npm --prefix server install');
    return null;
  }
  let helo = 'mastermechanics.ae';
  try {
    const h = new URL(config.siteUrl).hostname;
    if (h && h !== 'localhost' && h !== '127.0.0.1') helo = h;
  } catch { /* keep default */ }
  return nodemailer.createTransport({
    name: helo,
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPass } : undefined,
    tls: config.smtpTlsServername ? { servername: config.smtpTlsServername } : undefined,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

async function sendOne(tx, mail) {
  const info = await tx.sendMail(mail);
  console.log('[leads] emailed', {
    to: mail.to,
    accepted: info.accepted,
    rejected: info.rejected,
    id: info.messageId,
    response: info.response,
  });
}

/** Staff copy (carcare) + welcome email to the customer from carcare. */
export async function sendLeadEmail(lead) {
  const staff = buildLeadEmail(lead);
  const tx = await transporter();
  if (!tx) {
    console.warn(`[leads] SMTP not configured — enquiry ${lead.email || ''} saved but not emailed`);
    return false;
  }
  await sendOne(tx, staff);
  if (lead.email) await sendOne(tx, buildCustomerEmail(lead));
  return true;
}
