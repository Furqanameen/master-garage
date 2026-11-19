import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { site } from '../site.js';
import { config } from '../config.js';
import {
  getPageByPath, getNav, getPost, listPosts, listFaqs, listGallery,
  listPagesByType, insertLead, postPath, listJobs, getJob,
} from '../data.js';
import { normalisePath } from '../lib/html.js';

export const api = Router();

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

api.get('/site', (_req, res) => res.json(site));
api.get('/nav', wrap(async (_req, res) => res.json(await getNav())));

api.get('/page', wrap(async (req, res) => {
  const page = await getPageByPath(normalisePath(String(req.query.path || '/')));
  if (!page) return res.status(404).json({ error: 'not_found' });
  res.json(page);
}));

api.get('/pages', wrap(async (req, res) => {
  const type = String(req.query.type || 'service');
  res.json(await listPagesByType(type));
}));

api.get('/posts', wrap(async (req, res) => res.json(await listPosts(req.query.category))));

api.get('/post', wrap(async (req, res) => {
  const post = await getPost(String(req.query.category || ''), String(req.query.slug || ''));
  if (!post) return res.status(404).json({ error: 'not_found' });
  res.json({ ...post, path: postPath(post) });
}));

api.get('/jobs', wrap(async (_req, res) => res.json(await listJobs())));

api.get('/job', wrap(async (req, res) => {
  const job = await getJob(String(req.query.slug || ''));
  if (!job) return res.status(404).json({ error: 'not_found' });
  res.json(job);
}));

api.get('/faqs', wrap(async (_req, res) => res.json(await listFaqs())));
api.get('/gallery', wrap(async (_req, res) => res.json(await listGallery())));

const leadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

api.post('/leads', leadLimiter, wrap(async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot – bots fill hidden fields
  const lead = {
    name: clean(b.name, 120),
    phone: clean(b.phone, 40),
    email: clean(b.email, 160) || null,
    service: clean(b.service, 120) || null,
    vehicle: clean(b.vehicle, 120) || null,
    message: clean(b.message, 2000) || null,
    source_page: clean(b.source_page, 300) || null,
  };
  if (lead.name.length < 2) return res.status(400).json({ error: 'Name is required.' });
  if (!lead.email) return res.status(400).json({ error: 'Email is required.' });
  if (!lead.phone) return res.status(400).json({ error: 'Phone is required.' });
  if (!/^[+\d][\d\s()-]{6,}$/.test(lead.phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' });
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) return res.status(400).json({ error: 'Please enter a valid email.' });

  const id = await insertLead(lead);
  if (config.leadWebhookUrl) {
    fetch(config.leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...lead }),
    }).catch(() => {});
  }
  res.status(201).json({ ok: true, id });
}));

api.use((_req, res) => res.status(404).json({ error: 'not_found' }));
