import nodemailer from 'nodemailer';
import { config } from './config.js';
import { site } from './site.js';

const TO = config.leadEmailTo || site.email || 'carcare@mastermechanics.ae';

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

  const text = [
    'New enquiry from the Master Mechanics website.',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  const html = `
    <p>New enquiry from the Master Mechanics website.</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font:14px/1.5 sans-serif">
      ${rows.map(([k, v]) => `<tr><td style="border:1px solid #e2e8f0;color:#64748b">${esc(k)}</td><td style="border:1px solid #e2e8f0">${esc(v)}</td></tr>`).join('')}
    </table>
  `;

  const who = lead.name || 'Website visitor';
  return {
    to: TO,
    from: config.smtpFrom,
    replyTo: lead.email || undefined,
    subject: `New enquiry from ${who}`,
    text,
    html,
  };
}

function transporter() {
  if (!config.smtpHost) return null;
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
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
}

/** Sends the lead to carcare@… . Returns false if mail is not configured or send failed. */
export async function sendLeadEmail(lead) {
  const mail = buildLeadEmail(lead);
  const tx = transporter();
  if (!tx) {
    console.warn(`[leads] SMTP not configured — enquiry ${lead.email || ''} saved but not emailed to ${mail.to}`);
    return false;
  }
  const info = await tx.sendMail(mail);
  console.log('[leads] emailed', {
    to: mail.to,
    accepted: info.accepted,
    rejected: info.rejected,
    id: info.messageId,
    response: info.response,
  });
  return true;
}
