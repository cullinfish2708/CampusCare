import { getTickets, updateTicket, deleteTicket, addComment } from '../store.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  const tickets = getTickets();
  const ticket = tickets.find(t => String(t.id) === String(id));

  if (req.method === 'GET') {
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    return res.status(200).json(ticket);
  }

  if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const updated = updateTicket(id, body);
    if (!updated) return res.status(404).json({ message: 'Ticket not found' });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const success = deleteTicket(id);
    if (!success) return res.status(404).json({ message: 'Ticket not found' });
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    // Add comment
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const comment = addComment(id, body);
    if (!comment) return res.status(404).json({ message: 'Ticket not found' });
    return res.status(201).json(comment);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
