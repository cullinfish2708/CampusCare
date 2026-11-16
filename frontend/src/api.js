const API = import.meta.env.VITE_API_BASE || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.fields = payload.fields || {};
    throw error;
  }
  return payload;
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
    const response = await fetch('/notifications/api/notifications');
    const payload = await response.json().catch(() => []);
    if (!response.ok) throw new Error('Unable to load notification activity');
    return payload;
  },
};

export function formatDate(value, options = {}) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', ...options }).format(new Date(value));
}
export function label(value = '') { return value.toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, x => x.toUpperCase()); }
