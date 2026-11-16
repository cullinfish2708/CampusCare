import { getTickets, createTicket } from './store.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const created = createTicket(body);
    return res.status(201).json(created);
  }

  let list = getTickets();
  const { status, category, q } = req.query || {};
  if (status) list = list.filter(t => t.status === status);
  if (category) list = list.filter(t => t.category === category);
  if (q) {
    const query = q.toLowerCase();
    list = list.filter(t =>
      (t.title && t.title.toLowerCase().includes(query)) ||
      (t.description && t.description.toLowerCase().includes(query)) ||
      (t.location && t.location.toLowerCase().includes(query)) ||
      (t.ticketCode && t.ticketCode.toLowerCase().includes(query))
    );
  }
  return res.status(200).json(list);
}
