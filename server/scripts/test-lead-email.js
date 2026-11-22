import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { buildLeadEmail, buildCustomerEmail } from '../src/mail.js';

const lead = {
  name: 'Test Driver',
  email: 'visitor@example.com',
  phone: '+971501234567',
  vehicle: 'BMW, X5, 2025',
  message: 'Need a service booking.',
  source_page: '/booking/',
};

const staff = buildLeadEmail(lead);
assert.match(String(staff.to), /carcare@mastermechanics\.ae/);
assert.match(staff.subject, /Test Driver/);
assert.match(staff.subject, /contact them shortly/i);
assert.equal(staff.replyTo, 'visitor@example.com');
assert.match(staff.html, /cid:mm-logo@mastermechanics/);
assert.match(staff.html, /Please contact this customer shortly/);
assert.match(staff.html, /visitor@example.com/);
assert.match(staff.html, /\+971501234567/);
assert.equal(staff.attachments?.[0]?.cid, 'mm-logo@mastermechanics');

const customer = buildCustomerEmail(lead);
assert.equal(customer.to, 'visitor@example.com');
assert.equal(customer.subject, 'Hi thanks Test Driver, Our Team member will connect you soon:');
assert.match(customer.html, /Welcome, Test Driver/);
assert.match(customer.html, /advisor will contact you soon/);
assert.match(customer.html, /cid:mm-logo@mastermechanics/);
assert.match(customer.html, /BMW, X5, 2025/);
assert.match(customer.text, /advisor will contact you soon/i);
assert.equal(customer.attachments?.[0]?.cid, 'mm-logo@mastermechanics');

const tx = nodemailer.createTransport({ jsonTransport: true });
const staffInfo = await tx.sendMail(staff);
const custInfo = await tx.sendMail(customer);
assert.ok(JSON.parse(staffInfo.message).to.some((x) => x.address === 'carcare@mastermechanics.ae'));
assert.equal(JSON.parse(custInfo.message).to[0].address, 'visitor@example.com');

console.log('staff + customer thank-you emails build correctly');
