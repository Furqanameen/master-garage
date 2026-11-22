import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { buildLeadEmail } from '../src/mail.js';

const lead = {
  name: 'Test Driver',
  email: 'visitor@example.com',
  phone: '+971501234567',
  vehicle: 'BMW, X5, 2025',
  message: 'Need a service booking.',
  source_page: '/booking/',
};

const mail = buildLeadEmail(lead);
assert.match(String(mail.to), /carcare@mastermechanics\.ae/);
assert.match(String(mail.to), /furqanbinameen@gmail.com/);
assert.match(mail.subject, /Test Driver/);
assert.equal(mail.replyTo, 'visitor@example.com');
assert.match(mail.text, /visitor@example.com/);
assert.match(mail.text, /\+971501234567/);
assert.match(mail.html, /BMW, X5, 2025/);

const tx = nodemailer.createTransport({ jsonTransport: true });
const info = await tx.sendMail(mail);
const payload = JSON.parse(info.message);
const addrs = payload.to.map((x) => x.address);
assert.ok(addrs.includes('carcare@mastermechanics.ae'));
assert.ok(addrs.includes('furqanbinameen@gmail.com'));
assert.equal(payload.replyTo[0].address, 'visitor@example.com');

console.log('lead email builds and addresses carcare@mastermechanics.ae');
