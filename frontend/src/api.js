const API = import.meta.env.VITE_API_BASE || '/api';

// Fallback seed data for standalone/cloud deployments (e.g. Vercel)
const SEED_TICKETS = [
  {
    id: 1,
    ticketCode: 'CC-DEMO-101',
    title: 'Wi-Fi drops near the central library',
    description: 'Connectivity issue affects access to course materials. Please inspect the access point on the second floor.',
    category: 'IT_SUPPORT',
    priority: 'HIGH',
    status: 'OPEN',
    location: 'Central Library - Floor 2',
    requesterName: 'Aarav Kumar',
    requesterEmail: 'aarav.demo@example.test',
    assignedTeam: 'Facilities & IT Desk',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    resolvedAt: null,
    commentCount: 1,
    comments: [
      {
        id: 1,
        authorName: 'Helpdesk Team',
        content: 'Demo update: request received and added to the work queue.',
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      }
    ]
  },
  {
    id: 2,
    ticketCode: 'CC-DEMO-102',
    title: 'Projector not starting in Lab 204',
    description: 'The projector power indicator is on but no display is produced.',
    category: 'CLASSROOM',
    priority: 'NORMAL',
    status: 'IN_PROGRESS',
    location: 'CSE Block - Lab 204',
    requesterName: 'Meera S',
    requesterEmail: 'meera.demo@example.test',
    assignedTeam: 'Facilities & IT Desk',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    resolvedAt: null,
    commentCount: 1,
    comments: [
      {
        id: 2,
        authorName: 'Helpdesk Team',
        content: 'Demo update: technician dispatched to inspect the video cable and bulb.',
        createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      }
    ]
  },
  {
    id: 3,
    ticketCode: 'CC-DEMO-103',
    title: 'Water leakage outside Room B-12',
    description: 'Water is collecting near the corridor and needs inspection.',
    category: 'PLUMBING',
    priority: 'URGENT',
    status: 'OPEN',
    location: 'Hostel Block B - Corridor',
    requesterName: 'Rohan P',
    requesterEmail: 'rohan.demo@example.test',
    assignedTeam: 'Facilities & IT Desk',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    resolvedAt: null,
    commentCount: 1,
    comments: [
      {
        id: 3,
        authorName: 'Helpdesk Team',
        content: 'Demo update: request received and added to the work queue.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ]
  },
  {
    id: 4,
    ticketCode: 'CC-DEMO-104',
    title: 'Tube light flickering in Seminar Hall',
    description: 'Two lights flicker during presentations.',
    category: 'ELECTRICAL',
    priority: 'LOW',
    status: 'RESOLVED',
    location: 'Main Block - Seminar Hall',
    requesterName: 'Diya R',
    requesterEmail: 'diya.demo@example.test',
    assignedTeam: 'Facilities & IT Desk',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    resolvedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    commentCount: 1,
    comments: [
      {
        id: 4,
        authorName: 'Helpdesk Team',
        content: 'Demo update: issue checked and marked resolved.',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      }
    ]
  }
];

const SEED_NOTIFICATIONS = [
  {
    id: 1,
    subject: 'Ticket Created: CC-DEMO-101',
    message: 'New IT support request logged for Central Library - Floor 2.',
    recipient: 'aarav.demo@example.test',
    relatedTicketId: 1,
    eventType: 'TICKET_CREATED',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 2,
    subject: 'Status Changed: CC-DEMO-102',
    message: 'Projector not starting in Lab 204 is now IN_PROGRESS.',
    recipient: 'meera.demo@example.test',
    relatedTicketId: 2,
    eventType: 'STATUS_CHANGED',
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString()
  },
  {
    id: 3,
    subject: 'Ticket Resolved: CC-DEMO-104',
    message: 'Tube light flickering in Seminar Hall has been marked as RESOLVED.',
    recipient: 'diya.demo@example.test',
    relatedTicketId: 4,
    eventType: 'TICKET_RESOLVED',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

function getStoredTickets() {
  try {
    const raw = localStorage.getItem('campuscare_tickets');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return SEED_TICKETS;
}

function saveStoredTickets(tickets) {
  try {
    localStorage.setItem('campuscare_tickets', JSON.stringify(tickets));
  } catch (_) {}
}

function getStoredNotifications() {
  try {
    const raw = localStorage.getItem('campuscare_notifications');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return SEED_NOTIFICATIONS;
}

function saveStoredNotifications(items) {
  try {
    localStorage.setItem('campuscare_notifications', JSON.stringify(items));
  } catch (_) {}
}

const mockApi = {
  health: async () => ({ status: 'UP', service: 'campuscare-api (cloud demo mode)' }),
  summary: async () => {
    const tickets = getStoredTickets();
    const categories = ['IT_SUPPORT', 'ELECTRICAL', 'PLUMBING', 'CLASSROOM', 'HOSTEL', 'CLEANLINESS', 'OTHER'];
    const byCategory = {};
    categories.forEach(c => { byCategory[c] = 0; });
    tickets.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'OPEN').length,
      inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
      resolved: tickets.filter(t => t.status === 'RESOLVED').length,
      urgent: tickets.filter(t => t.priority === 'URGENT' && t.status !== 'RESOLVED' && t.status !== 'CLOSED').length,
      byCategory,
    };
  },
  tickets: async (params = {}) => {
    let tickets = getStoredTickets();
    if (params.status) {
      tickets = tickets.filter(t => t.status === params.status);
    }
    if (params.category) {
      tickets = tickets.filter(t => t.category === params.category);
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      tickets = tickets.filter(t =>
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.ticketCode && t.ticketCode.toLowerCase().includes(q)) ||
        (t.location && t.location.toLowerCase().includes(q))
      );
    }
    return tickets;
  },
  ticket: async (id) => {
    const tickets = getStoredTickets();
    const found = tickets.find(t => String(t.id) === String(id));
    if (!found) throw new Error('Ticket not found');
    return found;
  },
  createTicket: async (body) => {
    const tickets = getStoredTickets();
    const newId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
    const now = new Date().toISOString();
    const newTicket = {
      id: newId,
      ticketCode: `CC-DEMO-${100 + newId}`,
      title: body.title,
      description: body.description,
      category: body.category || 'OTHER',
      priority: body.priority || 'NORMAL',
      status: 'OPEN',
      location: body.location || '',
      requesterName: body.requesterName || 'Anonymous',
      requesterEmail: body.requesterEmail || 'user@campus.test',
      assignedTeam: 'Facilities & IT Desk',
      createdAt: now,
      updatedAt: now,
      resolvedAt: null,
      commentCount: 0,
      comments: []
    };
    tickets.unshift(newTicket);
    saveStoredTickets(tickets);

    const notifs = getStoredNotifications();
    notifs.unshift({
      id: notifs.length + 1,
      subject: `Ticket Created: ${newTicket.ticketCode}`,
      message: `${newTicket.title} submitted by ${newTicket.requesterName}.`,
      recipient: newTicket.requesterEmail,
      relatedTicketId: newTicket.id,
      eventType: 'TICKET_CREATED',
      createdAt: now
    });
    saveStoredNotifications(notifs);
    return newTicket;
  },
  updateTicket: async (id, body) => {
    const tickets = getStoredTickets();
    const index = tickets.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error('Ticket not found');
    const now = new Date().toISOString();
    const updated = { ...tickets[index], ...body, updatedAt: now };
    if (body.status === 'RESOLVED' && !updated.resolvedAt) {
      updated.resolvedAt = now;
    }
    tickets[index] = updated;
    saveStoredTickets(tickets);

    if (body.status) {
      const notifs = getStoredNotifications();
      notifs.unshift({
        id: notifs.length + 1,
        subject: `Status Changed: ${updated.ticketCode}`,
        message: `${updated.title} is now ${updated.status}.`,
        recipient: updated.requesterEmail,
        relatedTicketId: updated.id,
        eventType: body.status === 'RESOLVED' ? 'TICKET_RESOLVED' : 'STATUS_CHANGED',
        createdAt: now
      });
      saveStoredNotifications(notifs);
    }
    return updated;
  },
  deleteTicket: async (id) => {
    let tickets = getStoredTickets();
    tickets = tickets.filter(t => String(t.id) !== String(id));
    saveStoredTickets(tickets);
    return null;
  },
  addComment: async (id, body) => {
    const tickets = getStoredTickets();
    const ticket = tickets.find(t => String(t.id) === String(id));
    if (!ticket) throw new Error('Ticket not found');
    const now = new Date().toISOString();
    const commentId = (ticket.comments?.length || 0) + 1;
    const newComment = {
      id: commentId,
      authorName: body.authorName || 'Helpdesk Team',
      content: body.content,
      createdAt: now,
      updatedAt: now
    };
    ticket.comments = [...(ticket.comments || []), newComment];
    ticket.commentCount = ticket.comments.length;
    ticket.updatedAt = now;
    saveStoredTickets(tickets);
    return newComment;
  },
  updateComment: async (id, body) => {
    const tickets = getStoredTickets();
    for (const t of tickets) {
      const c = t.comments?.find(item => String(item.id) === String(id));
      if (c) {
        c.content = body.content || c.content;
        c.updatedAt = new Date().toISOString();
        saveStoredTickets(tickets);
        return c;
      }
    }
    return { id, content: body.content, updatedAt: new Date().toISOString() };
  },
  deleteComment: async (id) => {
    const tickets = getStoredTickets();
    for (const t of tickets) {
      if (t.comments) {
        t.comments = t.comments.filter(item => String(item.id) !== String(id));
        t.commentCount = t.comments.length;
      }
    }
    saveStoredTickets(tickets);
    return null;
  },
  notifications: async () => {
    return getStoredNotifications();
  }
};

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`Non-JSON response from server (${response.status})`);
    }
    const payload = await response.json();
    if (!response.ok) {
      const error = new Error(payload.message || `Request failed (${response.status})`);
      error.status = response.status;
      error.fields = payload.fields || {};
      throw error;
    }
    return payload;
  } catch (err) {
    // Fall back to built-in reactive store if API server is not available (e.g. standalone Vercel host)
    return handleFallback(path, options, err);
  }
}

function handleFallback(path, options, err) {
  const method = (options.method || 'GET').toUpperCase();
  const [basePath, queryString] = path.split('?');
  const params = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};
  const body = options.body ? JSON.parse(options.body) : {};

  if (basePath === '/health') return mockApi.health();
  if (basePath === '/dashboard/summary') return mockApi.summary();
  if (basePath === '/tickets') {
    if (method === 'POST') return mockApi.createTicket(body);
    return mockApi.tickets(params);
  }
  const ticketMatch = basePath.match(/^\/tickets\/(\w+)(\/comments)?$/);
  if (ticketMatch) {
    const ticketId = ticketMatch[1];
    const isComments = Boolean(ticketMatch[2]);
    if (isComments && method === 'POST') return mockApi.addComment(ticketId, body);
    if (method === 'GET') return mockApi.ticket(ticketId);
    if (method === 'PUT') return mockApi.updateTicket(ticketId, body);
    if (method === 'DELETE') return mockApi.deleteTicket(ticketId);
  }
  const commentMatch = basePath.match(/^\/comments\/(\w+)$/);
  if (commentMatch) {
    const commentId = commentMatch[1];
    if (method === 'PUT') return mockApi.updateComment(commentId, body);
    if (method === 'DELETE') return mockApi.deleteComment(commentId);
  }

  throw err;
}

export const api = {
  health: () => request('/health'),
  summary: () => request('/dashboard/summary'),
  tickets: (params = {}) => request(`/tickets?${new URLSearchParams(params)}`),
  ticket: (id) => request(`/tickets/${id}`),
  createTicket: (body) => request('/tickets', { method: 'POST', body: JSON.stringify(body) }),
  updateTicket: (id, body) => request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteTicket: (id) => request(`/tickets/${id}`, { method: 'DELETE' }),
  addComment: (id, body) => request(`/tickets/${id}/comments`, { method: 'POST', body: JSON.stringify(body) }),
  updateComment: (id, body) => request(`/comments/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteComment: (id) => request(`/comments/${id}`, { method: 'DELETE' }),
  notifications: async () => {
    try {
      const response = await fetch('/notifications/api/notifications');
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('application/json')) {
        return mockApi.notifications();
      }
      return await response.json();
    } catch (_) {
      return mockApi.notifications();
    }
  },
};

export function formatDate(value, options = {}) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', ...options }).format(new Date(value));
}

export function label(value = '') {
  return value.toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, x => x.toUpperCase());
}
