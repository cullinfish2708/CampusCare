let tickets = [
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

let notifications = [
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

export function getTickets() { return tickets; }
export function getNotifications() { return notifications; }

export function getSummary() {
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
}

export function createTicket(body) {
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
  notifications.unshift({
    id: notifications.length + 1,
    subject: `Ticket Created: ${newTicket.ticketCode}`,
    message: `${newTicket.title} submitted by ${newTicket.requesterName}.`,
    recipient: newTicket.requesterEmail,
    relatedTicketId: newTicket.id,
    eventType: 'TICKET_CREATED',
    createdAt: now
  });
  return newTicket;
}

export function updateTicket(id, body) {
  const index = tickets.findIndex(t => String(t.id) === String(id));
  if (index === -1) return null;
  const now = new Date().toISOString();
  const updated = { ...tickets[index], ...body, updatedAt: now };
  if (body.status === 'RESOLVED' && !updated.resolvedAt) {
    updated.resolvedAt = now;
  }
  tickets[index] = updated;
  if (body.status) {
    notifications.unshift({
      id: notifications.length + 1,
      subject: `Status Changed: ${updated.ticketCode}`,
      message: `${updated.title} is now ${updated.status}.`,
      recipient: updated.requesterEmail,
      relatedTicketId: updated.id,
      eventType: body.status === 'RESOLVED' ? 'TICKET_RESOLVED' : 'STATUS_CHANGED',
      createdAt: now
    });
  }
  return updated;
}

export function deleteTicket(id) {
  const before = tickets.length;
  tickets = tickets.filter(t => String(t.id) !== String(id));
  return tickets.length < before;
}

export function addComment(ticketId, body) {
  const ticket = tickets.find(t => String(t.id) === String(ticketId));
  if (!ticket) return null;
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
  return newComment;
}
